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
      sendQueueUpdate(io, queueId);
    });

    //Update queueId -- everyone in the room with this queueid
    socket.on("queue_update", (queueId) => {
      console.log("Update the queue info from here ", queueId);
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
      queueId,
      queueLength: "N/A",
      currentlyServing: "N/A",
      yourPosition: "N/A",
    });
  }
};
const getProcessedQueueData = async (queueId, socket) => {
  try {
    const actualQueueId = queueId.slice(6);
    console.log("getProcessedQueueData queueid ", actualQueueId);
    const queue = await findAllQueueItemsByQueueId(actualQueueId);

    if (queue && queue.queueItems) {
      const queueItems = queue.queueItems;
      console.log("Queue Items", queue.queueItems);
      const currentlyServingItem = queueItems.find(
        (item) => item.active && !item.quit && !item.seated
      );
      const currentlyServingPosition = currentlyServingItem
        ? queueItems.findIndex((item) => item.id === currentlyServingItem.id) +
          1
        : "N/A";

      const customerId = socket?.handshake?.query.queueItem;
      const customerItem = queueItems.find((item) => item.id === customerId);
      const customerPosition = customerItem
        ? queueItems.findIndex((item) => item.id === customerId) + 1
        : "N/A";

      if (currentlyServingPosition === "N/A" || customerPosition === "N/A") {
        return {
          queueId,
          queueLength: "N/A",
          yourPosition: "N/A",
          currentlyServing: "N/A",
          queueList: [],
          trailingDots: false,
          moreThanFiveAhead: 0,
        };
      }

      const activeAheadCount = queueItems.filter(
        (item) =>
          item.active &&
          !item.quit &&
          !item.seated &&
          queueItems.findIndex((q) => q.id === item.id) + 1 < customerPosition
      ).length;

      const queueList = [];
      const maxVisibleItems = 8;
      let trailingDots = false;

      if (activeAheadCount > 5) {
        return {
          queueId,
          queueLength: queueItems.filter(
            (item) => item.active && !item.quit && !item.seated
          ).length,
          yourPosition: customerPosition,
          currentlyServing: currentlyServingPosition,
          queueList: [
            { type: "large-bar" },
            { type: "you", position: customerPosition },
          ],
          trailingDots: false,
          moreThanFiveAhead: activeAheadCount,
        };
      } else {
        // Add currently serving
        queueList.push({
          position: currentlyServingPosition,
          status: "serving",
        });

        // Add items ahead (up to 3)
        for (
          let i = currentlyServingPosition + 1;
          i < customerPosition && queueList.length < 4;
          i++
        ) {
          const itemAhead = queueItems.find(
            (item) => queueItems.findIndex((q) => q.id === item.id) + 1 === i
          );
          if (
            itemAhead &&
            itemAhead.active &&
            !itemAhead.quit &&
            !itemAhead.seated
          ) {
            queueList.push({ position: i, status: "active" });
          } else if (itemAhead) {
            queueList.push({ position: i, status: "inactive" });
          }
        }

        // Add customer
        queueList.push({ position: customerPosition, status: "you" });

        let behindCount = 0;
        for (
          let i = customerPosition + 1;
          queueList.length < maxVisibleItems;
          i++
        ) {
          const itemBehind = queueItems.find(
            (item) => queueItems.findIndex((q) => q.id === item.id) + 1 === i
          );
          if (
            itemBehind &&
            itemBehind.active &&
            !itemBehind.quit &&
            !itemBehind.seated
          ) {
            queueList.push({ position: i, status: "active" });
            behindCount++;
          } else if (itemBehind) {
            queueList.push({ position: i, status: "inactive" });
          }
        }
        if (queueItems.length > customerPosition + behindCount) {
          trailingDots = true;
        }
        console.log("Less than 5 ahead: ", {
          queueLength: activeQueueLength,
          yourPosition: customerPosition,
          currentlyServing: currentlyServingPosition,
          queueList: queueList,
          trailingDots: trailingDots, // Corrected trailingDots
          moreThanFiveAhead: activeAheadCount,
        });
        return {
          queueId,
          queueLength: activeQueueLength,
          yourPosition: customerPosition,
          currentlyServing: currentlyServingPosition,
          queueList: queueList,
          trailingDots: trailingDots, // Corrected trailingDots
          moreThanFiveAhead: activeAheadCount,
        };
      }
    } else {
      return {
        queueId,
        queueLength: "N/A",
        yourPosition: "N/A",
        currentlyServing: "N/A",
        queueList: [],
        trailingDots: false,
        moreThanFiveAhead: "N/A",
      };
    }
  } catch (err) {
    console.error(err);
  }
};
