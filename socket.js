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
  sendCustomerJoined,
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

    socket.on("join_queue", (data) => {
      console.log(
        `Socket ${socket.id} joined the 1:many room: ${data.queueId}`
      );
      socket.join(data.queueId);
      console.log(data);
      sendCustomerJoined(io, data);
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
      console.log(
        `Socket ${socket.id} has a staff info: ${info.staffName} ${info.staffRole}`
      );
      //validate the host
      const staffValid = await checkStaffValidity(info);
      console.log("Staff valid from db", staffValid);
      if (staffValid) {
        console.log("Staff is valid ", staffValid.name, staffValid.role);
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

    // socket.on("cust_update_host", async (queueId) => {
    //   console.log("Trying to update the host from customer");
    //   sendQueueUpdateForHost(io, `queue_${queueId}`);
    // });
  });
  return io;
};

const updatePax = async () => {};

module.exports = setupSocket;
