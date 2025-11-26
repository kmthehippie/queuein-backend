// const allowedOrigins = require("./config/allowedOrigins");
// const { Server } = require("socket.io");
// const {
//   findAllQueueItemsByQueueId,
//   checkStaffValidity,
//   createAuditLog,
// } = require("./db/authQueries");
// const { encrypt } = require("./utils/encryption");
// const {
//   getProcessedQueueData,
//   sendQueueUpdate,
//   sendQueueUpdateForHost,
//   sendKioskUpdate,
// } = require("./helper/socketHelper");
// const { decrypt } = require("./utils/encryption");

// // ✅ Session management
// const staffSessions = new Map();
// const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes (consistent)

// // ✅ Helper: Check if session is expired (lazy cleanup)
// function isSessionExpired(session) {
//   return Date.now() - session.lastActivity > SESSION_TIMEOUT;
// }

// // ✅ Helper: Get session with automatic cleanup on access
// function getSession(sessionKey) {
//   const session = staffSessions.get(sessionKey);
//   if (session && isSessionExpired(session)) {
//     staffSessions.delete(sessionKey);
//     return null;
//   }
//   return session;
// }

// const setupSocket = (server) => {
//   const io = new Server(server, {
//     cors: {
//       origin: allowedOrigins,
//       credentials: true,
//     },
//   });

//   // ✅ Track connection metrics (optional)
//   let connectionCount = 0;

//   io.on("connect", (socket) => {
//     connectionCount++;
//     console.log(
//       `${socket.id} connected | Total: ${connectionCount} | ${new Date()}`
//     );

//     socket.on("disconnect", () => {
//       connectionCount--;
//       console.log(`${socket.id} disconnected | Total: ${connectionCount}`);

//       // ✅ Clean up staff session tracking
//       if (
//         socket.staff?.staffId &&
//         socket.staff?.accountId &&
//         socket.hostQueueId
//       ) {
//         const sessionKey = `${socket.staff.accountId}_${socket.staff.staffId}_${socket.hostQueueId}`;
//         staffSessions.delete(sessionKey);
//         console.log(`🗑️ Session removed: ${sessionKey}`);
//       }

//       // ✅ Socket.IO handles room cleanup automatically
//       // You don't need to manually clean up rooms on disconnect
//     });

//     //CUSTOMER'S SOCKETS
//     socket.on("join_queue", (queueId) => {
//       console.log(`${socket.id} joined queue room: ${queueId}`);
//       socket.join(queueId);
//     });

//     socket.on("join_queue_item_id", (queueItemId) => {
//       console.log(`${socket.id} joined queue item room: ${queueItemId}`);
//       socket.queueItemId = queueItemId;
//       socket.join(queueItemId);
//     });

//     //KIOSK'S SOCKETS
//     socket.on("join_max_queue_items", (kioskQueueId) => {
//       socket.join(kioskQueueId);
//       console.log(`Kiosk joined room: ${kioskQueueId}`);
//     });

//     socket.on("join_outlet_landing", (outletQueueId) => {
//       socket.join(outletQueueId);
//       console.log(`Outlet landing joined room: ${outletQueueId}`);
//     });

//     //STAFF'S SOCKETS
//     socket.on("join_host", (hostQueueId) => {
//       console.log(`Staff joined host room: ${hostQueueId}`);
//       socket.join(hostQueueId);
//       socket.hostQueueId = hostQueueId;
//     });

//     socket.on("set_staff_info", async (info) => {
//       console.log(
//         `${socket.id} set staff info: ${info.staffName} (${info.staffRole})`
//       );
//       info.staffName = encrypt(info.staffName);

//       const staffValid = await checkStaffValidity(info);

//       if (staffValid) {
//         staffValid.name = decrypt(staffValid.name);
//         staffValid.email = decrypt(staffValid.email);
//         console.log(
//           `✅ Staff validated: ${staffValid.name} (${staffValid.role})`
//         );

//         socket.staff = info;

//         if (socket.hostQueueId) {
//           // ✅ Include accountId for proper isolation
//           const sessionKey = `${info.accountId}_${info.staffId}_${socket.hostQueueId}`;

//           // ✅ Use lazy cleanup helper
//           const existingSession = getSession(sessionKey);
//           const now = Date.now();

//           if (!existingSession) {
//             // ✅ New session - log it
//             try {
//               await createAuditLog({
//                 staffId: info.staffId,
//                 actionType: "STAFF_QUEUE_ACCESS",
//                 accountId: info.accountId,
//                 outletId: info.outletId,
//                 actionDetails: JSON.stringify({
//                   queueId: socket.hostQueueId,
//                   staffId: info.staffId,
//                   staffName: info.staffName,
//                   staffRole: info.staffRole,
//                   sessionStart: new Date(),
//                 }),
//               });

//               console.log(
//                 `✅ New session logged: ${info.staffName} → queue ${socket.hostQueueId}`
//               );
//             } catch (error) {
//               console.error("❌ Failed to log audit:", error);
//             }
//           } else {
//             console.log(`♻️ Reconnect: ${info.staffName} (no audit log)`);
//           }

//           // ✅ Update session with full context
//           staffSessions.set(sessionKey, {
//             accountId: info.accountId,
//             outletId: info.outletId,
//             staffId: info.staffId,
//             staffName: info.staffName,
//             staffRole: info.staffRole,
//             queueId: socket.hostQueueId,
//             lastActivity: now,
//             socketId: socket.id,
//           });

//           console.log(`📊 Active sessions: ${staffSessions.size}`);
//         }
//       } else {
//         console.warn(`⚠️ Invalid staff: ${info.staffName}`);
//         socket.emit("staff_invalid", {
//           message: "Staff credentials invalid",
//         });
//       }
//     });

//     //RECEIVE CUSTOMER REQUESTS
//     socket.on("queue_update", (queueId) => {
//       console.log(`Queue update requested: ${queueId}`);
//       sendQueueUpdate(io, `${queueId}`);
//     });

//     socket.on("leave_queue", async (queueId) => {
//       console.log(`${socket.id} leaving queue: ${queueId}`);
//       sendQueueUpdate(io, `${queueId}`);
//       socket.leave(queueId);
//     });

//     socket.on(
//       "cust_req_queue_refresh",
//       async (queueId, queueItemIdFromWaiting) => {
//         console.log(
//           `Customer ${socket.id} requesting refresh: queue=${queueId}, item=${queueItemIdFromWaiting}`
//         );

//         try {
//           const processedData = await getProcessedQueueData(
//             `queue_${queueId}`,
//             socket,
//             queueItemIdFromWaiting
//           );

//           if (processedData) {
//             socket.emit("res_queue_refresh", processedData);
//           } else {
//             socket.emit("res_queue_refresh", {
//               error: "Failed to refresh queue data",
//             });
//           }
//         } catch (error) {
//           console.error("Error in cust_req_queue_refresh:", error);
//           socket.emit("res_queue_refresh", {
//             error: "Failed to refresh queue data",
//           });
//         }
//       }
//     );

//     socket.on("customer_in_waiting", async (data) => {
//       console.log(`Customer in waiting page: ${data.queueItemId}`);
//       sendKioskUpdate(io, data.queueItemId);
//     });

//     //RECEIVE STAFF REQUEST
//     socket.on("host_update", (hostQueueId) => {
//       console.log(`Host update requested: ${hostQueueId}`);
//       sendQueueUpdateForHost(io, `${hostQueueId}`);

//       // ✅ Update session activity
//       if (socket.staff?.staffId && socket.staff?.accountId) {
//         const sessionKey = `${socket.staff.accountId}_${socket.staff.staffId}_${hostQueueId}`;
//         const session = staffSessions.get(sessionKey);
//         if (session) {
//           session.lastActivity = Date.now();
//         }
//       }
//     });
//   });

//   // ✅ OPTIMIZED: Batched cleanup with limits
//   setInterval(() => {
//     const now = Date.now();
//     const startTime = Date.now();
//     let cleanedCount = 0;
//     const MAX_CLEANUP_PER_RUN = 200; // Limit iterations per cleanup

//     for (const [key, session] of staffSessions.entries()) {
//       // Check if expired
//       if (now - session.lastActivity > SESSION_TIMEOUT) {
//         staffSessions.delete(key);
//         cleanedCount++;

//         // ✅ Stop after cleaning 200 to avoid blocking
//         if (cleanedCount >= MAX_CLEANUP_PER_RUN) {
//           console.log(`⚠️ Cleanup limit reached, will continue next cycle`);
//           break;
//         }
//       }
//     }

//     const cleanupTime = Date.now() - startTime;

//     if (cleanedCount > 0) {
//       console.log(
//         `🧹 Cleaned ${cleanedCount} expired sessions in ${cleanupTime}ms | ` +
//           `Active: ${staffSessions.size}`
//       );
//     }

//     // ✅ Alert if cleanup is taking too long
//     if (cleanupTime > 100) {
//       console.warn(
//         `⚠️ Slow cleanup: ${cleanupTime}ms for ${cleanedCount} sessions`
//       );
//     }
//   }, 5 * 60 * 1000); // Run every 5 minutes

//   // ✅ Expose metrics for monitoring
//   io.staffSessions = staffSessions;

//   return io;
// };

// module.exports = setupSocket;

const allowedOrigins = require("./config/allowedOrigins");
const { Server } = require("socket.io");
const { checkStaffValidity, createAuditLog } = require("./db/authQueries");
const {
  getProcessedQueueData,
  sendQueueUpdate,
  sendQueueUpdateForHost,
  sendKioskUpdate,
  invalidateQueueCache, // ✅ Import cache invalidation
} = require("./helper/socketHelper");
const { decrypt, encrypt } = require("./utils/encryption");

// ✅ Session management
const staffSessions = new Map();
const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes

// ✅ Helper: Check if session is expired
function isSessionExpired(session) {
  return Date.now() - session.lastActivity > SESSION_TIMEOUT;
}

// ✅ Helper: Get session with automatic cleanup
function getSession(sessionKey) {
  const session = staffSessions.get(sessionKey);
  if (session && isSessionExpired(session)) {
    staffSessions.delete(sessionKey);
    return null;
  }
  return session;
}

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
    // ✅ Add connection limits and timeouts
    pingTimeout: 60000,
    pingInterval: 25000,
    maxHttpBufferSize: 1e6, // 1MB max message size
  });

  let connectionCount = 0;

  io.on("connect", (socket) => {
    connectionCount++;
    console.log(
      `${
        socket.id
      } connected | Total: ${connectionCount} | ${new Date().toISOString()}`
    );

    socket.on("disconnect", (reason) => {
      connectionCount--;
      console.log(
        `${socket.id} disconnected (${reason}) | Total: ${connectionCount}`
      );

      // ✅ Clean up staff session
      if (
        socket.staff?.staffId &&
        socket.staff?.accountId &&
        socket.hostQueueId
      ) {
        const sessionKey = `${socket.staff.accountId}_${socket.staff.staffId}_${socket.hostQueueId}`;
        staffSessions.delete(sessionKey);
      }

      // ✅ Clear socket properties to prevent memory leaks
      socket.staff = null;
      socket.hostQueueId = null;
      socket.queueItemId = null;
    });

    // ✅ Handle connection errors
    socket.on("error", (error) => {
      console.error(`Socket ${socket.id} error:`, error);
    });

    //CUSTOMER'S SOCKETS
    socket.on("join_queue", (queueId) => {
      if (!queueId || typeof queueId !== "string") {
        socket.emit("error", { message: "Invalid queue ID" });
        return;
      }
      console.log(`${socket.id} joined queue: ${queueId}`);
      socket.join(queueId);
    });

    socket.on("join_queue_item_id", (queueItemId) => {
      if (!queueItemId || typeof queueItemId !== "string") {
        socket.emit("error", { message: "Invalid queue item ID" });
        return;
      }
      console.log(`${socket.id} joined queue item: ${queueItemId}`);
      socket.queueItemId = queueItemId;
      socket.join(queueItemId);
    });

    //KIOSK'S SOCKETS
    socket.on("join_max_queue_items", (kioskQueueId) => {
      if (!kioskQueueId) return;
      socket.join(kioskQueueId);
      console.log(`Kiosk joined: ${kioskQueueId}`);
    });

    socket.on("join_outlet_landing", (outletQueueId) => {
      if (!outletQueueId) return;
      socket.join(outletQueueId);
      console.log(`Outlet landing joined: ${outletQueueId}`);
    });

    //STAFF'S SOCKETS
    socket.on("join_host", (hostQueueId) => {
      if (!hostQueueId) return;
      console.log(`Staff joined host: ${hostQueueId}`);
      socket.join(hostQueueId);
      socket.hostQueueId = hostQueueId;
    });

    socket.on("set_staff_info", async (info) => {
      if (!info || !info.staffId || !info.accountId) {
        socket.emit("staff_invalid", { message: "Invalid staff info" });
        return;
      }

      console.log(
        `${socket.id} set staff: ${info.staffName} (${info.staffRole})`
      );

      // ✅ Don't encrypt staffName here - checkStaffValidity expects plain text
      const staffValid = await checkStaffValidity(info);

      if (staffValid) {
        staffValid.name = decrypt(staffValid.name);
        staffValid.email = decrypt(staffValid.email);
        console.log(`✅ Staff validated: ${staffValid.name}`);

        socket.staff = info;

        if (socket.hostQueueId) {
          const sessionKey = `${info.accountId}_${info.staffId}_${socket.hostQueueId}`;
          const existingSession = getSession(sessionKey);
          const now = Date.now();

          if (!existingSession) {
            try {
              await createAuditLog({
                staffId: info.staffId,
                actionType: "STAFF_QUEUE_ACCESS",
                accountId: info.accountId,
                outletId: info.outletId,
                actionDetails: JSON.stringify({
                  queueId: socket.hostQueueId,
                  staffId: info.staffId,
                  staffName: info.staffName,
                  staffRole: info.staffRole,
                  sessionStart: new Date(),
                }),
              });

              console.log(
                `✅ Session logged: ${info.staffName} → ${socket.hostQueueId}`
              );
            } catch (error) {
              console.error("❌ Audit log failed:", error);
            }
          } else {
            console.log(`♻️ Reconnect: ${info.staffName}`);
          }

          staffSessions.set(sessionKey, {
            accountId: info.accountId,
            outletId: info.outletId,
            staffId: info.staffId,
            staffName: info.staffName,
            staffRole: info.staffRole,
            queueId: socket.hostQueueId,
            lastActivity: now,
            socketId: socket.id,
          });

          console.log(`📊 Active sessions: ${staffSessions.size}`);
        }
      } else {
        console.warn(`⚠️ Invalid staff: ${info.staffName}`);
        socket.emit("staff_invalid", {
          message: "Staff credentials invalid",
        });
      }
    });

    //RECEIVE CUSTOMER REQUESTS
    socket.on("queue_update", (queueId) => {
      if (!queueId) return;
      console.log(`Queue update: ${queueId}`);
      sendQueueUpdate(io, `${queueId}`);
    });

    socket.on("leave_queue", async (queueId) => {
      if (!queueId) return;
      console.log(`${socket.id} leaving: ${queueId}`);

      // ✅ Leave room first, then update
      socket.leave(queueId);
      sendQueueUpdate(io, `${queueId}`);

      // ✅ Clear queue item reference
      socket.queueItemId = null;
    });

    socket.on(
      "cust_req_queue_refresh",
      async (queueId, queueItemIdFromWaiting) => {
        if (!queueId) return;

        console.log(
          `Refresh request: queue=${queueId}, item=${queueItemIdFromWaiting}`
        );

        try {
          const processedData = await getProcessedQueueData(
            `queue_${queueId}`,
            socket,
            queueItemIdFromWaiting
          );

          if (processedData) {
            socket.emit("res_queue_refresh", processedData);
          } else {
            socket.emit("res_queue_refresh", {
              error: "Failed to refresh queue data",
            });
          }
        } catch (error) {
          console.error("Refresh error:", error);
          socket.emit("res_queue_refresh", {
            error: "Failed to refresh queue data",
          });
        }
      }
    );

    socket.on("customer_in_waiting", async (data) => {
      if (!data?.queueItemId) return;
      console.log(`Customer waiting: ${data.queueItemId}`);
      sendKioskUpdate(io, data.queueItemId);
    });

    //RECEIVE STAFF REQUEST
    socket.on("host_update", (hostQueueId) => {
      if (!hostQueueId) return;
      console.log(`Host update: ${hostQueueId}`);

      // ✅ Invalidate cache when staff makes updates
      invalidateQueueCache(hostQueueId.replace("queue_", ""));

      sendQueueUpdateForHost(io, `${hostQueueId}`);

      // Update session activity
      if (socket.staff?.staffId && socket.staff?.accountId) {
        const sessionKey = `${socket.staff.accountId}_${socket.staff.staffId}_${hostQueueId}`;
        const session = staffSessions.get(sessionKey);
        if (session) {
          session.lastActivity = Date.now();
        }
      }
    });
  });

  // ✅ Optimized cleanup
  setInterval(() => {
    const now = Date.now();
    const startTime = Date.now();
    let cleanedCount = 0;
    const MAX_CLEANUP = 200;

    for (const [key, session] of staffSessions.entries()) {
      if (now - session.lastActivity > SESSION_TIMEOUT) {
        staffSessions.delete(key);
        cleanedCount++;

        if (cleanedCount >= MAX_CLEANUP) {
          break;
        }
      }
    }

    const cleanupTime = Date.now() - startTime;

    if (cleanedCount > 0) {
      console.log(
        `🧹 Cleaned ${cleanedCount} sessions in ${cleanupTime}ms | Active: ${staffSessions.size}`
      );
    }

    if (cleanupTime > 100) {
      console.warn(`⚠️ Slow cleanup: ${cleanupTime}ms`);
    }
  }, 5 * 60 * 1000);

  // ✅ Monitor memory usage
  setInterval(() => {
    const memUsage = process.memoryUsage();
    console.log(`
📊 Socket Metrics (${new Date().toISOString()}):
- Connections: ${connectionCount}
- Staff Sessions: ${staffSessions.size}
- Memory Heap: ${Math.round(memUsage.heapUsed / 1024 / 1024)}MB
- Memory RSS: ${Math.round(memUsage.rss / 1024 / 1024)}MB
    `);
  }, 10 * 60 * 1000); // Every 10 minutes

  io.staffSessions = staffSessions;

  return io;
};

module.exports = setupSocket;
