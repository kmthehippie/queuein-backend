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
  sendKioskUpdate,
  // sendCustomerJoined,
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

    //CUSTOMER'S SOCKETS
    socket.on("join_queue", (queueId) => {
      console.log(`Socket ${socket.id} joined the 1:many room: ${queueId}`);
      socket.join(queueId);
    });

    socket.on("join_queue_item_id", (queueItemId) => {
      console.log(`Socket ${socket.id} is joining the 1:1 room ${queueItemId}`);
      socket.queueItemId = queueItemId;
      socket.join(queueItemId);
    });

    //KIOSK'S SOCKETS
    socket.on("join_max_queue_items", (kioskQueueId) => {
      socket.join(kioskQueueId);
      console.log(`Kiosk joined the room: ${kioskQueueId}`);
    });

    socket.on("join_outlet_landing", (outletQueueId) => {
      socket.join(outletQueueId);
      console.log(`Outlet landing page joined the room: ${outletQueueId}`);
    });

    //STAFF'S SOCKETS
    socket.on("join_host", (hostQueueId) => {
      console.log("Staff that joined this queue: ", hostQueueId);
      socket.join(hostQueueId);
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

    //RECEIVE CUSTOMER REQUESTS
    socket.on("queue_update", (queueId) => {
      console.log("Update the queue info from here ", queueId);
      sendQueueUpdate(io, `${queueId}`);
    });

    socket.on("leave_queue", async (queueId) => {
      console.log("Trying to leave queue", queueId);
      sendQueueUpdate(io, `${queueId}`);
      socket.leave(queueId);
    });

    socket.on(
      "cust_req_queue_refresh",
      async (queueId, queueItemIdFromWaiting) => {
        console.log(
          `Customer on ${socket.id} socket requested for an refresh for queue: ${queueId} with queue item id: ${queueItemIdFromWaiting}`
        );
        console.log("This is a real socket?", !!socket);

        try {
          const processedData = await getProcessedQueueData(
            `queue_${queueId}`,
            socket,
            queueItemIdFromWaiting
          );
          console.log("Processed data to emit:", processedData);

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
      }
    );

    socket.on("customer_in_waiting", async (data) => {
      console.log("This is the data sent from waiting page: ", data);
      //now we need to send to the kiosk success page
      sendKioskUpdate(io, data.queueItemId);
    });

    //RECEIVE STAFF REQUEST
    socket.on("host_update", (hostQueueId) => {
      console.log("Trying to update host using hostQueue Id", hostQueueId);
      sendQueueUpdateForHost(io, `${hostQueueId}`);
    });
  });
  return io;
};

const updatePax = async () => {};

module.exports = setupSocket;
