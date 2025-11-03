const admin = require("../config/firebaseAdminConfig");
const { findTopActiveQueueItems } = require("../db/authQueries");

const sendPushNotification = async (
  fcmToken,
  title,
  body,
  additionalData = {}
) => {
  if (!fcmToken) {
    console.log("No FCM token provided");
    return;
  }

  const message = {
    token: fcmToken,
    data: {
      title: title,
      body: body,
      ...additionalData,
    },
    android: {
      priority: "high",
      notification: {
        sound: "default",
        vibrateTimingsMillis: [0, 250, 250, 250],
        priority: "high",
      },
    },
    apns: {
      payload: {
        aps: {
          alert: {
            title: title,
            body: body,
          },
          sound: "default",
          badge: 1,
        },
      },
    },
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("✅ Push notification sent Send Push Notification:", response);
    return response;
  } catch (error) {
    console.error("❌ FCM send error:", error);
    throw error;
  }
};

const notifyTopQueuePos = async (queueId) => {
  console.log(`Checking top positions for queue: ${queueId}`);
  // Fetch the top 3 active items
  const topItems = await findTopActiveQueueItems(queueId, 3);

  if (!topItems || topItems.length === 0) {
    console.log("No active items found to notify.");
    return;
  }

  const outletName = topItems[0].queue.outlet.name;
  const accountSlug = topItems[0].queue.account.slug;

  // Use Promise.all to send notifications concurrently
  await Promise.all(
    topItems.map(async (item) => {
      if (item.fcmToken) {
        let title = "";
        let body = `You are getting close at ${outletName}!`;

        switch (item.position) {
          case 1:
            title = "You're next in line!";
            body = `Please prepare to approach at ${outletName}.`;
            break;
          case 2:
            title = "You are 2nd in line!";
            body = `Get ready! Only one person ahead of you at ${outletName}.`;
            break;
          case 3:
            title = "You are 3rd in line!";
            body = `You're almost there! Two people ahead of you at ${outletName}.`;
            break;
          default:
            // Don't send a notification if their position is > 3
            return;
        }

        const data = {
          url: `/${accountSlug}/queue/${queueId}/${item.id}`,
        };

        console.log(`Notifying ${item.name} at position ${item.position}`);
        await sendPushNotification(item.fcmToken, title, body, data);
      }
    })
  );
};

module.exports = {
  sendPushNotification,
  notifyTopQueuePos,
};
