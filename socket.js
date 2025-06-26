const allowedOrigins = require("./config/allowedOrigins");
const { Server } = require("socket.io");
const {
  findAllQueueItemsByQueueId,
  checkStaffValidity,
} = require("./db/authQueries");
const {
  getProcessedQueueData,
  sendQueueUpdate,
  sendQueueUpdateForHost,
} = require("./helper/socketHelper");

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
  });

  //IO function
  io.on("connect", (socket) => {
    console.log(`${socket.id} has connected to socket ${new Date()}`);

    socket.on("disconnect", () => {
      console.log(`${socket.id} has disconnected from socket`);
      const roomsLeft = Array.from(socket.rooms).filter(
        (room) => room !== socket.id
      );

      for (const roomLeft of roomsLeft) {
        if (queues[roomLeft]) {
          queues[roomLeft] = queues[roomLeft].filter((id) => id !== socket.id);
          if (queues[roomLeft].length === 0) {
            delete queues[roomLeft];
          } else {
            sendQueueUpdate(io, roomLeft);
          }
        }
      }
    });

    socket.on("join_queue", (queueId) => {
      console.log(`Socket ${socket.id} joined the 1:many room: ${queueId}`);
      socket.join(queueId);
    });

    socket.on("set_queue_item_id", (queueItemId) => {
      console.log(
        `We are setting the ${queueItemId} for queue item id on ${socket.id} socket`
      );
      socket.queueItemId = queueItemId;
    });

    socket.on("join_queue_item_id", (queueItemId) => {
      console.log(`Socket ${socket.id} is joining the 1:1 room ${queueItemId}`);
      socket.join(queueItemId);
    });

    socket.on("set_staff_info", async (info) => {
      console.log("Setting staff info!");
      console.log(`Socket ${socket.id} has a staff info: ${info}`);
      //validate the host
      const staffValid = await checkStaffValidity(info);
      if (staffValid) {
        console.log("Staff is valid ", staffValid);
        socket.staff = info;
      }
    });

    socket.on("queue_update", (queueId) => {
      console.log("Update the queue info from here ", queueId);
      sendQueueUpdate(io, `queue_${queueId}`);
      sendQueueUpdateForHost(io, `queue_${queueId}`);
    });

    socket.on("leave_queue", async (queueId) => {
      console.log("Trying to leave queue", queueId);
      sendQueueUpdate(io, `queue_${queueId}`);
      socket.leave(queueId);
    });

    socket.on("cust_req_queue_refresh", async (queueId) => {
      console.log(
        `Customer on ${socket.id} socket requested for an refresh for queue: ${queueId}`
      );
      console.log("This is a real socket?", !!socket);

      try {
        const processedData = await getProcessedQueueData(
          `queue_${queueId}`,
          socket
        );

        if (processedData) {
          socket.emit("res_queue_refresh", processedData);
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
  return io;
};

const updatePax = async () => {};

module.exports = setupSocket;
