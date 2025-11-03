//These are the functions that we use within io
const { findAllQueueItemsByQueueId } = require("../db/authQueries");

const sendQueueUpdateForHost = async (io, queueIdRoom, notice) => {
  const room = io.sockets.adapter.rooms.get(queueIdRoom);
  console.log("queueIdRoom", queueIdRoom, "room", room);
  if (room) {
    const actualQueueId = queueIdRoom.slice(5);
    let dataToEmit = {};
    try {
      const queue = await findAllQueueItemsByQueueId(actualQueueId);
      if (queue && queue.queueItems.length > 0) {
        dataToEmit.queueItems = queue.queueItems;
        if (notice) {
          dataToEmit.notice = notice;
        }
      }
    } catch (err) {
      console.error("Error fetching queue items in socket ", err);
      return;
    }
    if (!dataToEmit) {
      console.log("No active queue items found for queue room: ", queueIdRoom);
      dataToEmit = {};
    }

    await Promise.all(
      Array.from(room).map(async (socketId) => {
        const socket = io.sockets.sockets.get(socketId);
        if (socket && socket.staff) {
          console.log(
            `Emitting host_queue_update to staff socket ${socketId} in room ${queueIdRoom}`
          );
          socket.emit("host_queue_update", dataToEmit);
        } else if (socket) {
          console.log(
            `Socket ${socketId} in room ${queueIdRoom} is not a valid staff (or doesn't have staff property)`
          );
        }
      })
    );
  } else {
    console.log(`Room ${queueIdRoom} is not found for staff update`);
  }
};

const getProcessedQueueData = async (
  queueId,
  socket,
  queueItemIdFromWaiting
) => {
  try {
    console.log("This is the room for queue: ", queueId);
    if (!!queueId) {
      const actualQueueId = queueId.slice(6);
      let queueItemId;
      if (socket.queueItemId) {
        console.log("socket has queue item id", socket.queueItemId);
        const socketQID = socket.queueItemId;
        queueItemId = socketQID.slice(10);
      } else {
        queueItemId = queueItemIdFromWaiting;
      }

      console.log(
        "actual queue id",
        actualQueueId,
        "queue item id",
        queueItemId
      );

      //Find all queueItems position in an array.
      const queue = await findAllQueueItemsByQueueId(actualQueueId);
      const allQueueItems = queue.queueItems;

      const actualQueueItem = allQueueItems.find(
        (item) => item.id === queueItemId
      );
      console.log("Actual queue item for this socket: ", actualQueueItem.id);

      //If queue item id does not exist or there is no actual queue item
      if (!queueItemId || !actualQueueItem) {
        const queueItemPos = allQueueItems
          .filter((item) => item.active && !item.quit && !item.seated)
          .map((item) => item.position);
        const currentlyServingPos = queueItemPos[0] || null;
        return {
          yourPosition: "N/A",
          currentlyServing: currentlyServingPos,
          pax: "N/A",
          queueList: {
            type: "long-bar",
            partiesAhead: "N/A",
            arr: queueItemPos.slice(0, 7),
          },
          queueEmpty: queueItemPos.length === 0,
        };
      }

      //If queue item is NOT active
      if (!actualQueueItem.active) {
        const toReturn = {
          inactive: true,
          seated: !!actualQueueItem.seated,
          quit: !!actualQueueItem.quit,
          noShow: !!actualQueueItem.noShow,
          name: actualQueueItem.name || actualQueueItem?.customer.name,
          pax: actualQueueItem.pax,
        };

        return toReturn;
      }

      //If queue item is active and normal
      const queueItemPos = allQueueItems
        .filter((item) => item.active && !item.quit && !item.seated)
        .map((item) => item.position);
      const currentlyServingPos = queueItemPos[0];
      const customerPosition = actualQueueItem.position;
      const customerPax = actualQueueItem.pax;
      const customerCalled = actualQueueItem.called;
      const customerCalledAt = actualQueueItem.calledAt;

      let queueItemsAheadOfCustomer = 0;
      if (customerPosition !== undefined) {
        queueItemsAheadOfCustomer = queueItemPos.filter(
          (pos) => pos < customerPosition
        ).length;
      }
      let queueListType;
      let arrToSend = null;

      if (queueItemsAheadOfCustomer >= 5) {
        queueListType = "large-bar";
      } else if (
        queueItemsAheadOfCustomer < 5 &&
        queueItemsAheadOfCustomer >= 1
      ) {
        queueListType = "short-bar";
        arrToSend = queueItemPos.slice(0, 7);
      } else {
        queueListType = "serving-you-bar";
        arrToSend = queueItemPos.slice(0, 7);
      }

      const toReturn = {
        yourPosition: customerPosition,
        currentlyServing: currentlyServingPos,
        pax: customerPax,
        called: customerCalled,
        calledAt: customerCalledAt,
        queueList: {
          type: queueListType,
          partiesAhead: queueItemsAheadOfCustomer,
          arr: arrToSend,
        },
      };
      return toReturn;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

const sendQueueUpdate = async (io, queueId, queueItemId) => {
  const room = io.sockets.adapter.rooms.get(queueId);
  console.log("Send queue Update: ", queueId);
  if (queueItemId) {
    console.log("With queue item id: ", queueItemId);
  }
  if (room) {
    await Promise.all(
      Array.from(room).map(async (socketId) => {
        const socket = io.sockets.sockets.get(socketId);
        if (socket && socket.queueItemId) {
          const individualData = await getProcessedQueueData(queueId, socket);
          if (individualData) {
            console.log(
              `Emitting personalized queue update to socket ${socketId}`
            );
            socket.emit("queue_update", individualData);
          }
        } else if (socket && !socket.queueItemId) {
          // Handle cases where a socket is in the room but doesn't have a customerId set yet
          console.log(
            `Socket ${socketId} in room ${queueId} has no queueitemId.`
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

const sendKioskUpdate = async (io, queueItemId) => {
  const roomName = `queueitem_${queueItemId}`;
  console.log("This is the room name", roomName);
  const room = io.sockets.adapter.rooms.get(roomName);
  if (room) {
    io.to(roomName).emit("customer_waiting", { queueItemId: queueItemId });
  } else {
    console.log(`Error, room not found in socket: ${roomName}`);
  }
};

const sendMaxQueueItemsUpdate = async (io, kioskRoom, maxQueueItems) => {
  console.log("This is the room name", kioskRoom);
  const room = io.sockets.adapter.rooms.get(kioskRoom);
  if (room) {
    io.to(kioskRoom).emit("max_queue_items", { maxQueueItems: maxQueueItems });
    if (maxQueueItems === 0) {
      io.to(kioskRoom).emit("queue_ended", { message: "The queue has ended." });
    }
  } else {
    console.log(`Error, room not found in socket: ${kioskRoom}`);
  }
};

const sendOutletUpdate = async (io, outletRoom, notice) => {
  console.log("We are updating the outlet page", outletRoom);
  const room = io.sockets.adapter.rooms.get(outletRoom);
  if (room) {
    io.to(outletRoom).emit("outlet_queue_update", notice);
    console.log("Emitting to outlet room:", outletRoom);
  } else {
    console.log(`Room ${outletRoom} is not found for outlet update`);
  }
};
module.exports = {
  sendQueueUpdateForHost,
  getProcessedQueueData,
  sendQueueUpdate,
  sendKioskUpdate,
  sendOutletUpdate,
  sendMaxQueueItemsUpdate,
  // sendCustomerJoined,
};
