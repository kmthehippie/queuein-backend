// //These are the functions that we use within io
// const { findAllQueueItemsByQueueId } = require("../db/authQueries");
// const { decrypt } = require("../utils/encryption");

// const sendQueueUpdateForHost = async (io, queueIdRoom, notice) => {
//   const room = io.sockets.adapter.rooms.get(queueIdRoom);
//   console.log("queueIdRoom", queueIdRoom, "room", room);
//   if (room) {
//     const actualQueueId = queueIdRoom.slice(5);
//     let dataToEmit = {};
//     try {
//       const queue = await findAllQueueItemsByQueueId(actualQueueId);
//       if (queue && queue.queueItems.length > 0) {
//         dataToEmit.queueItems = queue.queueItems;
//         queue.queueItems.forEach((item) => {
//           if (item.name) {
//             item.name = decrypt(item.name);
//           }
//           if (item.contactNumber) {
//             item.contactNumber = decrypt(item.contactNumber);
//           }
//           if (item.customer && item.customer.name) {
//             item.customer.name = decrypt(item.customer.name);
//           }
//           if (item.customer && item.customer.number) {
//             item.customer.number = decrypt(item.customer.number);
//           }
//         });
//         if (notice) {
//           dataToEmit.notice = notice;
//         }
//       }
//     } catch (err) {
//       console.error("Error fetching queue items in socket ", err);
//       return;
//     }
//     if (!dataToEmit) {
//       console.log("No active queue items found for queue room: ", queueIdRoom);
//       dataToEmit = {};
//     }

//     await Promise.all(
//       Array.from(room).map(async (socketId) => {
//         const socket = io.sockets.sockets.get(socketId);
//         if (socket && socket.staff) {
//           console.log(
//             `Emitting host_queue_update to staff socket ${socketId} in room ${queueIdRoom}`
//           );
//           socket.emit("host_queue_update", dataToEmit);
//         } else if (socket) {
//           console.log(
//             `Socket ${socketId} in room ${queueIdRoom} is not a valid staff (or doesn't have staff property)`
//           );
//         }
//       })
//     );
//   } else {
//     console.log(`Room ${queueIdRoom} is not found for staff update`);
//   }
// };

// const getProcessedQueueData = async (
//   queueId,
//   socket,
//   queueItemIdFromWaiting
// ) => {
//   try {
//     console.log("This is the room for queue: ", queueId);
//     if (!!queueId) {
//       const actualQueueId = queueId.slice(6);
//       let queueItemId;
//       if (socket.queueItemId) {
//         console.log("socket has queue item id", socket.queueItemId);
//         const socketQID = socket.queueItemId;
//         queueItemId = socketQID.slice(10);
//       } else {
//         queueItemId = queueItemIdFromWaiting;
//       }

//       console.log(
//         "actual queue id",
//         actualQueueId,
//         "queue item id",
//         queueItemId
//       );

//       //Find all queueItems position in an array.
//       const queue = await findAllQueueItemsByQueueId(actualQueueId);
//       const allQueueItems = queue.queueItems;

//       const actualQueueItem = allQueueItems.find(
//         (item) => item.id === queueItemId
//       );
//       queue.queueItems.forEach((item) => {
//         if (item.name) {
//           item.name = decrypt(item.name);
//         }
//         if (item.contactNumber) {
//           item.contactNumber = decrypt(item.contactNumber);
//         }
//         if (item.customer && item.customer.name) {
//           item.customer.name = decrypt(item.customer.name);
//         }
//         if (item.customer && item.customer.number) {
//           item.customer.number = decrypt(item.customer.number);
//         }
//       });
//       actualQueueItem.name = decrypt(actualQueueItem.name);
//       actualQueueItem.contactNumber = decrypt(actualQueueItem.contactNumber);
//       if (actualQueueItem.customer) {
//         actualQueueItem.customer.name = decrypt(actualQueueItem.customer.name);
//         actualQueueItem.customer.number = decrypt(
//           actualQueueItem.customer.number
//         );
//       }
//       console.log("Actual queue item for this socket: ", actualQueueItem.id);

//       //If queue item id does not exist or there is no actual queue item
//       if (!queueItemId || !actualQueueItem) {
//         const queueItemPos = allQueueItems
//           .filter((item) => item.active && !item.quit && !item.seated)
//           .map((item) => item.position);
//         const currentlyServingPos = queueItemPos[0] || null;
//         return {
//           yourPosition: "N/A",
//           currentlyServing: currentlyServingPos,
//           pax: "N/A",
//           queueList: {
//             type: "long-bar",
//             partiesAhead: "N/A",
//             arr: queueItemPos.slice(0, 7),
//           },
//           queueEmpty: queueItemPos.length === 0,
//         };
//       }

//       //If queue item is NOT active
//       if (!actualQueueItem.active) {
//         const toReturn = {
//           inactive: true,
//           seated: !!actualQueueItem.seated,
//           quit: !!actualQueueItem.quit,
//           noShow: !!actualQueueItem.noShow,
//           name: actualQueueItem.name || actualQueueItem?.customer.name,
//           pax: actualQueueItem.pax,
//         };

//         return toReturn;
//       }

//       //If queue item is active and normal
//       const queueItemPos = allQueueItems
//         .filter((item) => item.active && !item.quit && !item.seated)
//         .map((item) => item.position);
//       const currentlyServingPos = queueItemPos[0];
//       const customerPosition = actualQueueItem.position;
//       const customerPax = actualQueueItem.pax;
//       const customerCalled = actualQueueItem.called;
//       const customerCalledAt = actualQueueItem.calledAt;

//       let queueItemsAheadOfCustomer = 0;
//       if (customerPosition !== undefined) {
//         queueItemsAheadOfCustomer = queueItemPos.filter(
//           (pos) => pos < customerPosition
//         ).length;
//       }
//       let queueListType;
//       let arrToSend = null;

//       if (queueItemsAheadOfCustomer >= 5) {
//         queueListType = "large-bar";
//       } else if (
//         queueItemsAheadOfCustomer < 5 &&
//         queueItemsAheadOfCustomer >= 1
//       ) {
//         queueListType = "short-bar";
//         arrToSend = queueItemPos.slice(0, 7);
//       } else {
//         queueListType = "serving-you-bar";
//         arrToSend = queueItemPos.slice(0, 7);
//       }

//       const toReturn = {
//         yourPosition: customerPosition,
//         currentlyServing: currentlyServingPos,
//         pax: customerPax,
//         called: customerCalled,
//         calledAt: customerCalledAt,
//         queueList: {
//           type: queueListType,
//           partiesAhead: queueItemsAheadOfCustomer,
//           arr: arrToSend,
//         },
//       };
//       return toReturn;
//     }
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// };

// const sendQueueUpdate = async (io, queueId, queueItemId) => {
//   const room = io.sockets.adapter.rooms.get(queueId);
//   console.log("Send queue Update: ", queueId);
//   if (queueItemId) {
//     console.log("With queue item id: ", queueItemId);
//   }
//   if (room) {
//     await Promise.all(
//       Array.from(room).map(async (socketId) => {
//         const socket = io.sockets.sockets.get(socketId);
//         if (socket && socket.queueItemId) {
//           const individualData = await getProcessedQueueData(queueId, socket);
//           if (individualData) {
//             console.log(
//               `Emitting personalized queue update to socket ${socketId}`
//             );
//             socket.emit("queue_update", individualData);
//           }
//         } else if (socket && !socket.queueItemId) {
//           // Handle cases where a socket is in the room but doesn't have a customerId set yet
//           console.log(
//             `Socket ${socketId} in room ${queueId} has no queueitemId.`
//           );
//           socket.emit("queue_update", {
//             yourPosition: "N/A",
//             currentlyServing: "N/A",
//             queueList: {
//               type: "N/A",
//               partiesAhead: "N/A",
//               arr: null,
//             },
//           });
//         }
//       })
//     );
//   } else {
//     console.log(`Room ${queueId} is not found`);
//   }
// };

// const sendKioskUpdate = async (io, queueItemId) => {
//   const roomName = `queueitem_${queueItemId}`;
//   console.log("This is the room name", roomName);
//   const room = io.sockets.adapter.rooms.get(roomName);
//   if (room) {
//     io.to(roomName).emit("customer_waiting", { queueItemId: queueItemId });
//   } else {
//     console.log(`Error, room not found in socket: ${roomName}`);
//   }
// };

// const sendMaxQueueItemsUpdate = async (io, kioskRoom, maxQueueItems) => {
//   console.log("This is the room name", kioskRoom);
//   const room = io.sockets.adapter.rooms.get(kioskRoom);
//   if (room) {
//     io.to(kioskRoom).emit("max_queue_items", { maxQueueItems: maxQueueItems });
//     if (maxQueueItems === 0) {
//       io.to(kioskRoom).emit("queue_ended", { message: "The queue has ended." });
//     }
//   } else {
//     console.log(`Error, room not found in socket: ${kioskRoom}`);
//   }
// };

// const sendOutletUpdate = async (io, outletRoom, notice) => {
//   console.log("We are updating the outlet page", outletRoom);
//   const room = io.sockets.adapter.rooms.get(outletRoom);
//   if (room) {
//     io.to(outletRoom).emit("outlet_queue_update", notice);
//     console.log("Emitting to outlet room:", outletRoom);
//   } else {
//     console.log(`Room ${outletRoom} is not found for outlet update`);
//   }
// };
// module.exports = {
//   sendQueueUpdateForHost,
//   getProcessedQueueData,
//   sendQueueUpdate,
//   sendKioskUpdate,
//   sendOutletUpdate,
//   sendMaxQueueItemsUpdate,
//   // sendCustomerJoined,
// };

// ...existing code...

const { findAllQueueItemsByQueueId } = require("../db/authQueries");
const { decrypt } = require("../utils/encryption");

// ---- Normalization helpers ----
function stripQueuePrefixes(input) {
  if (!input) return "";
  return input.replace(/^(host_|queue_)/, "");
}

function buildRooms(rawQueueId) {
  return {
    rawQueueId,
    hostRoom: `host_${rawQueueId}`,
    queueRoom: `queue_${rawQueueId}`,
  };
}

// ---- Simple cache keyed ONLY by raw queue id ----
const queueCache = new Map();
const CACHE_TTL_MS = 2000;

function getCachedQueue(rawQueueId) {
  const cached = queueCache.get(rawQueueId);
  console.log("Here's what's cached: ", cached);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }
  return null;
}
function setCachedQueue(rawQueueId, data) {
  queueCache.set(rawQueueId, { data, timestamp: Date.now() });
}
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of queueCache.entries()) {
    if (now - v.timestamp > CACHE_TTL_MS * 2) queueCache.delete(k);
  }
}, 10000);

// Fetch + decrypt once; expects RAW queue id
async function fetchAndDecryptQueue(rawQueueId) {
  const cached = getCachedQueue(rawQueueId);
  if (cached) return cached;

  try {
    const queue = await findAllQueueItemsByQueueId(rawQueueId);
    if (
      !queue ||
      !Array.isArray(queue.queueItems) ||
      queue.queueItems.length === 0
    ) {
      const empty = { queueItems: [] };
      setCachedQueue(rawQueueId, empty);
      return empty;
    }

    const decryptedItems = queue.queueItems.map((item) => ({
      ...item,
      name: item.name ? decrypt(item.name) : null,
      contactNumber: item.contactNumber ? decrypt(item.contactNumber) : null,
      customer: item.customer
        ? {
            ...item.customer,
            name: item.customer.name ? decrypt(item.customer.name) : null,
            number: item.customer.number ? decrypt(item.customer.number) : null,
          }
        : null,
    }));

    const result = { ...queue, queueItems: decryptedItems };
    setCachedQueue(rawQueueId, result);
    return result;
  } catch (err) {
    console.error("fetchAndDecryptQueue error:", err);
    const fallback = { queueItems: [] };
    setCachedQueue(rawQueueId, fallback);
    return fallback;
  }
}

// Staff (host) update
const sendQueueUpdateForHost = async (io, queueRoomName, notice) => {
  const rawQueueId = stripQueuePrefixes(queueRoomName);
  const { hostRoom } = buildRooms(rawQueueId);

  // Accept either host_<id> or raw id
  const room =
    io.sockets.adapter.rooms.get(hostRoom) ||
    io.sockets.adapter.rooms.get(queueRoomName);
  if (!room) {
    console.log(`Room ${queueRoomName} not found for staff update`);
    return;
  }

  try {
    const queue = await fetchAndDecryptQueue(rawQueueId);
    const dataToEmit = {
      queueItems: queue.queueItems,
      notice: notice || null,
    };

    let count = 0;
    for (const socketId of room) {
      const sock = io.sockets.sockets.get(socketId);
      if (sock?.staff) {
        sock.emit("host_queue_update", dataToEmit);
        count++;
      }
    }
    console.log(
      `✅ Emitted host_queue_update to ${count} staff in room ${hostRoom}`
    );
  } catch (err) {
    console.error("sendQueueUpdateForHost error:", err);
  }
};

// Calculate per-customer view
function buildCustomerView(queue, queueItemId) {
  const allItems = queue.queueItems || [];
  const activeItems = allItems.filter((i) => i.active && !i.quit && !i.seated);
  const positions = activeItems.map((i) => i.position);
  const servingPos = positions[0] || null;

  if (!queueItemId) {
    return {
      yourPosition: "N/A",
      currentlyServing: servingPos,
      pax: "N/A",
      queueList: {
        type: "long-bar",
        partiesAhead: "N/A",
        arr: positions.slice(0, 7),
      },
      queueEmpty: positions.length === 0,
    };
  }

  const target = allItems.find((i) => i.id === queueItemId);
  if (!target) {
    return {
      yourPosition: "N/A",
      currentlyServing: servingPos,
      pax: "N/A",
      queueList: {
        type: "long-bar",
        partiesAhead: "N/A",
        arr: positions.slice(0, 7),
      },
      queueEmpty: positions.length === 0,
    };
  }

  if (!target.active) {
    return {
      inactive: true,
      seated: !!target.seated,
      quit: !!target.quit,
      noShow: !!target.noShow,
      name: target.name || target.customer?.name || "N/A",
      pax: target.pax,
    };
  }

  const customerPos = target.position;
  const ahead = positions.filter((p) => p < customerPos).length;

  let type;
  let arrSubset = positions.slice(0, 7);
  if (ahead >= 5) type = "large-bar";
  else if (ahead >= 1) type = "short-bar";
  else type = "serving-you-bar";

  return {
    yourPosition: customerPos,
    currentlyServing: servingPos,
    pax: target.pax,
    called: target.called,
    calledAt: target.calledAt,
    queueList: {
      type,
      partiesAhead: ahead,
      arr: arrSubset,
    },
  };
}

// Public API for customer updates (room: queue_<id> or raw id)
const sendQueueUpdate = async (io, queueRoomName) => {
  const rawQueueId = stripQueuePrefixes(queueRoomName);
  const { queueRoom } = buildRooms(rawQueueId);

  const room =
    io.sockets.adapter.rooms.get(queueRoom) ||
    io.sockets.adapter.rooms.get(queueRoomName);
  if (!room) {
    console.log(`Room ${queueRoomName} not found`);
    return;
  }

  const queue = await fetchAndDecryptQueue(rawQueueId);

  const promises = Array.from(room).map(async (socketId) => {
    const sock = io.sockets.sockets.get(socketId);
    if (!sock) return;
    const queueItemIdRaw = sock.queueItemId
      ? sock.queueItemId.replace(/^queueitem_/, "")
      : null;

    const view = buildCustomerView(queue, queueItemIdRaw);
    sock.emit("queue_update", view);
  });

  await Promise.all(promises);
  console.log(`✅ Updated ${room.size} sockets in room ${queueRoom}`);
};

// Individual kiosk / queue item room
const sendKioskUpdate = async (io, queueItemId) => {
  const roomName = `queueitem_${queueItemId}`;
  if (io.sockets.adapter.rooms.get(roomName)) {
    io.to(roomName).emit("customer_waiting", { queueItemId });
    console.log(`✅ Kiosk update sent to ${roomName}`);
  } else {
    console.log(`Room not found: ${roomName}`);
  }
};

const sendMaxQueueItemsUpdate = async (io, kioskRoom, maxQueueItems) => {
  if (io.sockets.adapter.rooms.get(kioskRoom)) {
    io.to(kioskRoom).emit("max_queue_items", { maxQueueItems });
    if (maxQueueItems === 0) {
      io.to(kioskRoom).emit("queue_ended", { message: "The queue has ended." });
    }
    console.log(`✅ Max queue items update sent to ${kioskRoom}`);
  } else {
    console.log(`Room not found: ${kioskRoom}`);
  }
};

const sendOutletUpdate = async (io, outletRoom, notice) => {
  if (io.sockets.adapter.rooms.get(outletRoom)) {
    io.to(outletRoom).emit("outlet_queue_update", notice);
    console.log(`✅ Outlet update sent to ${outletRoom}`);
  } else {
    console.log(`Room not found: ${outletRoom}`);
  }
};

module.exports = {
  sendQueueUpdateForHost,
  sendQueueUpdate,
  sendKioskUpdate,
  sendOutletUpdate,
  sendMaxQueueItemsUpdate,
  invalidateQueueCache: (queueId) =>
    queueCache.delete(stripQueuePrefixes(queueId)),
};
