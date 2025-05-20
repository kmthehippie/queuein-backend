const allowedOrigins = require("./config/allowedOrigins");
const { Server } = require("socket.io");
const { findAllQueueItemsByQueueId } = require("./db/authQueries");

const setupSocket = (server) => {
  //main function that takes your http server instance as an argument
  const io = new Server(server, {
    //creates a new server instance, attaching it on provided server
    //set cors config here too.
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
  });

  //This is basically the rooms that have open connection
  const queues = {};
  //! connect is working
  io.on("connect", (socket) => {
    //event handler that listens for new client connections
    console.log(`${socket.id} has connected to socket ${new Date()}`);

    socket.on("disconnect", () => {
      console.log(`${socket.id} has disconnected from socket`);
      const roomsLeft = Array.from(socket.rooms).filter(
        (room) => room !== socket.id
      ); // Exclude the socket's own ID

      for (const roomLeft of roomsLeft) {
        if (queues[roomLeft]) {
          queues[roomLeft] = queues[roomLeft].filter((id) => id !== socket.id);
          if (queues[roomLeft].length === 0) {
            delete queues[roomLeft];
          } else {
            sendQueueUpdate(io, roomLeft); // Send update to the room the socket left
          }
        }
      }
    });
    //! JOIN QUEUE NOT BEING CALLED FROM SOCKET FRONT END??
    socket.on("join_queue", (queueId) => {
      socket.join(queueId);
      console.log(`Socket ${socket.id} joined room: ${queueId}`);
      if (!queues[queueId]) {
        queues[queueId] = [];
      }
      queues[queueId].push(socket.id);
    });

    socket.on("set_customer_id", (customerId) => {
      console.log(`Socket ${socket.id} setting customerId: ${customerId}`);
      socket.customerId = customerId;
    });

    //! Update queueId -- everyone in the room with this queueid
    //! NEED TO FIX THIS PART OF THE CODE. SHOULD BE SENDQUEUEUPDATE IS BUGGED. TRY RUNNING IT HERE?
    socket.on("queue_update", (queueId) => {
      console.log("Update the queue info from here ", queueId);
      sendQueueUpdate(io, `queue_${queueId}`);
    });

    socket.on("leave_queue", async (queueId) => {
      console.log("Trying to leave queue", queueId);
      sendQueueUpdate(io, `queue_${queueId}`);
    });

    //Customer requests for a queue refresh
    socket.on("cust_req_queue_refresh", async (queueId) => {
      console.log(
        `Customer on ${socket.id} socket requested for an refresh for queue: ${queueId}`
      );
      try {
        const processedData = await getProcessedQueueData(
          `queue_${queueId}`,
          socket
        );

        if (processedData) {
          socket.emit("res_queue_refresh", processedData);
          console.log("Data being emitted", processedData);
        } else {
          // Handle the case where fetching processed data failed
          socket.emit("res_queue_refresh", {
            error: "Failed to refresh queue data",
          });
        }
      } catch (error) {
        console.error("Error handling cust_req_queue_refresh:", error);
        socket.emit("res_queue_refresh", {
          error: "Failed to refresh queue data",
        });
      }
    });
  });
};

module.exports = setupSocket;

const sendQueueUpdate = async (io, queueId) => {
  const room = io.sockets.adapter.rooms.get(queueId);
  console.log("Send queue Update: ", queueId);
  if (room) {
    await Promise.all(
      Array.from(room).map(async (socketId) => {
        const socket = io.sockets.sockets.get(socketId);
        if (socket && socket.customerId) {
          const individualData = await getProcessedQueueData(queueId, socket);
          if (individualData) {
            console.log(
              `Emitting personalized queue update to socket ${socketId}`
            );
            socket.emit("queue_update", individualData);
          }
        } else if (socket) {
          // Handle cases where a socket is in the room but doesn't have a customerId set yet
          console.log(
            `Socket ${socketId} in room ${queueId} has no customerId.`
          );
          socket.emit("queue_update", {
            yourPosition: "N/A",
            currentlyServing: "N/A",
            queueList: {
              type: "N/A",
              partiesAhead: "N/A",
              arr: null,
            },
          });
        }
      })
    );
  } else {
    console.log(`Room ${queueId} is not found`);
  }
};
const getProcessedQueueData = async (queueId, socket) => {
  try {
    console.log("This is the room: ", queueId);
    if (!!queueId) {
      const actualQueueId = queueId.slice(6);
      console.log("getProcessedQueueData queueid ", actualQueueId);

      const customerId = socket?.customerId;

      console.log("This is customer id? ", customerId);
      //Find all queueItems position in an array.
      const queue = await findAllQueueItemsByQueueId(actualQueueId);
      const queueItems = queue.queueItems;

      //Create a positions array
      const queueItemsPos = queueItems
        .filter((item) => item.active && !item.quit && !item.seated)
        .map((item) => item.position);
      console.log("Queue Items Position Arr: ", queueItemsPos);

      //Find currently serving position
      const currentlyServingPos = queueItemsPos[0];

      if (customerId !== undefined) {
        //Find customer's position
        const customerQueueItem = queueItems.find(
          (item) =>
            item.customerId === customerId &&
            item.active &&
            !item.quit &&
            !item.seated
        );
        console.log("This is the customer's queue item ", customerQueueItem);
        const customerPosition = customerQueueItem.position;
        const customerPax = customerQueueItem.pax;

        let queueItemsAheadOfCustomer = 0;
        if (customerPosition !== undefined) {
          queueItemsAheadOfCustomer = queueItemsPos.filter(
            (pos) => pos < customerPosition
          ).length;
        }

        //If More than 5 ahead:
        if (queueItemsAheadOfCustomer >= 5) {
          //create data containing what we need to know in the front end
          const toReturn = {
            yourPosition: customerPosition,
            currentlyServing: currentlyServingPos,
            pax: customerPax,
            queueList: {
              type: "large-bar",
              partiesAhead: queueItemsAheadOfCustomer,
              arr: null,
            },
          };
          return toReturn;
        } else if (
          queueItemsAheadOfCustomer < 5 &&
          queueItemsAheadOfCustomer >= 1
        ) {
          const arrToSend = queueItemsPos.slice(0, 7);
          const toReturn = {
            yourPosition: customerPosition,
            currentlyServing: currentlyServingPos,
            pax: customerPax,
            queueList: {
              type: "short-bar",
              partiesAhead: queueItemsAheadOfCustomer,
              arr: arrToSend,
            },
          };
          return toReturn;
        } else {
          const arrToSend = queueItemsPos.slice(0, 7);
          const toReturn = {
            yourPosition: customerPosition,
            currentlyServing: customerPosition,
            pax: customerPax,

            queueList: {
              type: "serving-you-bar",
              arr: arrToSend,
              partiesAhead: queueItemsAheadOfCustomer,
            },
          };
          return toReturn;
        }
      } else {
        const arrToSend = queueItemsPos.slice(0, 7);
        const toReturn = {
          yourPosition: "N/A",
          currentlyServing: currentlyServingPos,
          pax: "N/A",
          queueList: {
            type: "long-bar",
            partiesAhead: "N/A",
            arr: arrToSend,
          },
        };
        return toReturn;
      }
    }
  } catch (err) {
    console.error(err);
  }
};

const updatePax = async () => {};
