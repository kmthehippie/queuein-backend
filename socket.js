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

  io.on("connect", (socket) => {
    //event handler that listens for new client connections
    console.log(`${socket.id} has connected to socket ${new Date()}`);

    socket.on("disconnect", () => {
      console.log(`${socket.id} has disconnected from socket`);
      //If customer disconnects, and there's noone in the queueId room, we need to remove the queueId
      for (const queueId in queues) {
        queues[queueId] = queues[queueId].filter((id) => id !== socket.id);
        //remove queueId from queues if there are no more sockets connected to the queueid
        if (queues[queueId].length === 0) {
          delete queues[queueId];
        }
      }
    });

    //This should be called after customer has joined queue page.
    //We need to check if the queueId is already in the rooms list. If not, we cre
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

    //Update queueId -- everyone in the room with this queueid
    socket.on("queue_update", (queueId) => {
      console.log("Update the queue info from here ", queueId);
      sendQueueUpdate(io, queueId);
    });

    socket.on("leave_queue", async (queueId) => {
      console.log("Trying to leave queue", queueId);
      sendQueueUpdate(io, queueId);
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
  const processedData = await getProcessedQueueData(queueId, null);
  if (processedData) {
    const room = io.sockets.adapter.rooms.get(queueId);

    if (room) {
      await Promise.all(
        Array.from(room).map(async (socketId) => {
          const socket = io.sockets.sockets.get(socketId);
          if (socket) {
            const individualData = await getProcessedQueueData(queueId, socket);
            if (individualData) {
              socket.emit("queue_update", individualData);
            }
          }
        })
      );
    } else {
      console.log(`Room ${queueId} is not found`);
    }
  } else {
    io.to(queueId).emit("queue_update", {
      yourPosition: "N/A",
      currentlyServing: "N/A",
      queueList: {
        type: "N/A",
        partiesAhead: "N/A",
        arr: null,
      },
    });
  }
};
const getProcessedQueueData = async (queueId, socket) => {
  try {
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
        (item) => item.id === customerId
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
      console.log(
        "How many queueItems ahead of customer? ",
        queueItemsAheadOfCustomer
      );

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
  } catch (err) {
    console.error(err);
  }
};

const updatePax = async () => {};
