//These are the functions that we use within io
const { findAllQueueItemsByQueueId } = require("../db/authQueries");

exports.sendQueueUpdateForHost = async (io, queueIdRoom) => {
  const room = io.sockets.adapter.rooms.get(queueIdRoom);
  if (room) {
    const actualQueueId = queueIdRoom.slice(6);
    let dataToEmit = null;
    try {
      const queueItems = await findAllQueueItemsByQueueId(actualQueueId);
      if (queueItems && queueItems.length > 0) {
        dataToEmit = queueItems;
      }
    } catch (err) {
      console.error("Error fetching queue items in socket ", err);
      return;
    }
    if (!dataToEmit) {
      console.log("No active queue items found for queue room: ", queueIdRoom);
      dataToEmit = [];
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
exports.sendQueueUpdate = async (io, queueId) => {
  const room = io.sockets.adapter.rooms.get(queueId);
  console.log("Send queue Update: ", queueId);
  if (room) {
    await Promise.all(
      Array.from(room).map(async (socketId) => {
        const socket = io.sockets.sockets.get(socketId);
        console.log("Is this a real socket?", !!socket);
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
exports.getProcessedQueueData = async (queueId, socket) => {
  try {
    console.log("This is the room: ", queueId);
    if (!!queueId) {
      const actualQueueId = queueId.slice(6);
      const customerId = socket.customerId;
      //Find all queueItems position in an array.
      const queue = await findAllQueueItemsByQueueId(actualQueueId);
      const queueItems = queue.queueItems;

      //Create a positions array
      const queueItemsPos = queueItems
        .filter((item) => item.active && !item.quit && !item.seated)
        .map((item) => item.position);

      //Find currently serving position
      const currentlyServingPos = queueItemsPos[0];

      //Must have customer id to start working
      if (customerId !== undefined) {
        //Find customer's position
        const customerQueueItem = queueItems.find(
          (item) =>
            item.customerId === customerId &&
            item.active &&
            !item.quit &&
            !item.seated
        );
        //Is the customer in this queue item list inactive?
        const customerInactiveQueueItem = queueItems.find(
          (item) => item.customer.id === customerId && !item.active
        );

        if (customerQueueItem) {
          //If the customer is inactive:
          if (customerInactiveQueueItem) {
            let toReturn = {
              inactive: true,
            };
            if (customerInactiveQueueItem) {
              if (customerInactiveQueueItem.seated) {
                toReturn.seated = true;
              } else if (customerInactiveQueueItem.quit) {
                toReturn.quit = true;
              } else if (customerInactiveQueueItem.noShow) {
                toReturn.noShow = true;
              }
              return toReturn;
            }
          }

          //If the customer NOT inactive:
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
            console.log("To return: ", toReturn);
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
            console.log("To return: ", toReturn);
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
            console.log("To return: ", toReturn);
            return toReturn;
          }
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
