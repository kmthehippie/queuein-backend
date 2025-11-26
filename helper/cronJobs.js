// const cron = require("node-cron");
// const moment = require("moment");
// const prisma = require("../script");
// const startCleanup = require("../services/startupServices");

// const startCronJobs = () => {
//   startCleanup();
//   //* 1. DELETE AUDIT LOGS OLDER THAN 30 DAYS AT 2 AM
//   cron.schedule("00 2 * * *", async () => {
//     console.log("Running daily audit log cleanup job");
//     const thirtyDaysAgo = moment().subtract(30, "days").toDate();
//     try {
//       const result = await prisma.auditLog.deleteMany({
//         where: {
//           timestamp: {
//             lt: thirtyDaysAgo,
//           },
//         },
//       });
//       console.log(`Successfully deleted ${result.count} from audit logs.`);
//     } catch (error) {
//       console.error("Error deleting audit logs! ", error);
//     }
//   });

//   //* 2. DELETE NON-VIP PHONE NUMBER EVERY DAY AT 2.30 AM
//   cron.schedule("30 2 * * *", async () => {
//     console.log("Running daily non-vip phone number cleanup job");
//     const twentyFourHoursAgo = moment().subtract(24, "hours").toDate();
//     try {
//       const result = await prisma.queueItem.updateMany({
//         where: {
//           customer: null,
//           contactNumber: {
//             not: "",
//           },
//           createdAt: {
//             lt: twentyFourHoursAgo,
//           },
//         },
//         data: {
//           contactNumber: "",
//         },
//       });
//       console.log(
//         `Successfully deleted ${result.count} phone numbers from non-vip customers`
//       );
//     } catch (error) {
//       console.error("Error deleting non-vip phone numbers! ", error);
//     }
//   });

//   console.log("Scheduled cron jobs are running");
// };

// module.exports = startCronJobs;

const cron = require("node-cron");
const moment = require("moment");
const prisma = require("../script");
const startCleanup = require("../services/startupServices");
const { createAuditLog } = require("../db/authQueries");

const preservedActionTypes = [
  // Account lifecycle
  "ACCOUNT_CREATED",
  "ACCOUNT_DELETED",
  "PRIVACY_POLICY_ACCEPTED",

  // Staff lifecycle
  "STAFF_CREATED",
  "STAFF_DELETED",

  // Payment history (keep forever)
  "PAYMENT_SUCCEEDED",
  "PAYMENT_FAILED",
  "SUBSCRIPTION_CREATED",
  "SUBSCRIPTION_UPDATED",
  "SUBSCRIPTION_CANCELED",
  "INVOICE_CREATED",
  "INVOICE_PAID",

  // System audits (compliance)
  "AUDIT_LOG_CLEANUP",
  "GDPR_DATA_CLEANUP",
  "INACTIVE_QUEUE_CLEANUP",
  "MONTHLY_USAGE_RESET",
];

const startCronJobs = () => {
  startCleanup();

  //* 1. DELETE AUDIT LOGS OLDER THAN 30 DAYS AT 2 AM (PER ACCOUNT)
  cron.schedule("00 2 * * *", async () => {
    console.log("🕐 Running daily audit log cleanup job");
    const thirtyDaysAgo = moment().subtract(30, "days").toDate();

    try {
      // ✅ Get all accounts
      const accounts = await prisma.account.findMany({
        select: { id: true, companyName: true },
      });

      let totalDeleted = 0;

      // ✅ Process each account separately
      for (const account of accounts) {
        try {
          const result = await prisma.auditLog.deleteMany({
            where: {
              accountId: account.id,
              timestamp: {
                lt: thirtyDaysAgo,
              },
              // ✅ Don't delete critical audit logs
              actionType: {
                notIn: preservedActionTypes,
              },
            },
          });

          if (result.count > 0) {
            totalDeleted += result.count;
            console.log(
              `✅ Account ${account.id}: Deleted ${result.count} old audit logs`
            );

            // ✅ Create audit log for the cleanup action
            await createAuditLog({
              staffId: null, // System action
              accountId: account.id,
              outletId: null,
              actionType: "AUDIT_LOG_CLEANUP",
              entityType: "AuditLog",
              entityId: null,
              actionDetails: JSON.stringify({
                deletedCount: result.count,
                olderThan: thirtyDaysAgo.toISOString(),
                performedBy: "SYSTEM_CRON",
              }),
              isCronJob: true,
            });
          }
        } catch (accountError) {
          console.error(
            `❌ Error cleaning audit logs for account ${account.id}:`,
            accountError
          );

          // ✅ Log the error as an audit event
          try {
            await createAuditLog({
              staffId: null,
              accountId: account.id,
              outletId: null,
              actionType: "AUDIT_LOG_CLEANUP_FAILED",
              entityType: "AuditLog",
              entityId: null,
              actionDetails: JSON.stringify({
                error: accountError.message,
                performedBy: "SYSTEM_CRON",
              }),
              isCronJob: true,
            });
          } catch (logError) {
            console.error("Failed to log cleanup error:", logError);
          }
        }
      }

      console.log(
        `✅ Audit log cleanup completed. Total deleted: ${totalDeleted} across ${accounts.length} accounts`
      );
    } catch (error) {
      console.error("❌ Fatal error in audit log cleanup job:", error);
    }
  });

  //* 2. DELETE NON-VIP PHONE NUMBERS EVERY DAY AT 2:30 AM (PER ACCOUNT)
  cron.schedule("30 2 * * *", async () => {
    console.log("🕐 Running daily non-VIP phone number cleanup job");
    const twentyFourHoursAgo = moment().subtract(24, "hours").toDate();

    try {
      // ✅ Get all accounts
      const accounts = await prisma.account.findMany({
        select: { id: true, companyName: true },
      });

      let totalCleaned = 0;

      // ✅ Process each account separately
      for (const account of accounts) {
        try {
          // Find queue items to clean for this account
          const queueItemsToClean = await prisma.queueItem.findMany({
            where: {
              customerId: null, // Non-VIP (no linked customer)
              contactNumber: {
                not: "",
              },
              createdAt: {
                lt: twentyFourHoursAgo,
              },
              queue: {
                accountId: account.id,
              },
            },
            select: {
              id: true,
              contactNumber: true,
              queueId: true,
              outletId: true,
            },
          });

          if (queueItemsToClean.length > 0) {
            // Clear phone numbers
            const result = await prisma.queueItem.updateMany({
              where: {
                id: {
                  in: queueItemsToClean.map((item) => item.id),
                },
              },
              data: {
                contactNumber: "",
              },
            });

            totalCleaned += result.count;

            console.log(
              `✅ Account ${account.id}: Cleaned ${result.count} phone numbers`
            );

            // ✅ Create audit log for GDPR compliance
            await createAuditLog({
              staffId: null,
              accountId: account.id,
              outletId: null,
              actionType: "GDPR_DATA_CLEANUP",
              entityType: "QueueItem",
              entityId: null,
              actionDetails: JSON.stringify({
                cleanedCount: result.count,
                dataType: "contactNumber",
                retentionPeriod: "24 hours",
                queueIds: [
                  ...new Set(queueItemsToClean.map((item) => item.queueId)),
                ],
                performedBy: "SYSTEM_CRON",
                gdprCompliance: true,
              }),
              isCronJob: true,
            });
          }
        } catch (accountError) {
          console.error(
            `❌ Error cleaning phone numbers for account ${account.id}:`,
            accountError
          );

          // ✅ Log the error
          try {
            await createAuditLog({
              staffId: null,
              accountId: account.id,
              outletId: null,
              actionType: "GDPR_DATA_CLEANUP_FAILED",
              entityType: "QueueItem",
              entityId: null,
              actionDetails: JSON.stringify({
                error: accountError.message,
                performedBy: "SYSTEM_CRON",
              }),
              isCronJob: true,
            });
          } catch (logError) {
            console.error("Failed to log cleanup error:", logError);
          }
        }
      }

      console.log(
        `✅ Phone number cleanup completed. Total cleaned: ${totalCleaned} across ${accounts.length} accounts`
      );
    } catch (error) {
      console.error("❌ Fatal error in phone number cleanup job:", error);
    }
  });

  //* 3. DELETE INACTIVE QUEUES OLDER THAN 6 MONTHS AT 3 AM (NEW)
  cron.schedule("00 3 * * *", async () => {
    console.log("🕐 Running daily inactive queue cleanup job");
    const sixMonthsAgo = moment().subtract(6, "months").toDate();

    try {
      // ✅ Get all accounts
      const accounts = await prisma.account.findMany({
        select: { id: true, companyName: true },
      });

      let totalQueuesDeleted = 0;
      let totalQueueItemsDeleted = 0;

      // ✅ Process each account separately
      for (const account of accounts) {
        try {
          // Find inactive queues older than 6 months for this account
          const inactiveQueues = await prisma.queue.findMany({
            where: {
              accountId: account.id,
              active: false,
              endTime: {
                lt: sixMonthsAgo,
              },
            },
            include: {
              outlet: {
                select: {
                  id: true,
                  name: true,
                },
              },
              _count: {
                select: {
                  queueItems: true,
                },
              },
            },
          });

          if (inactiveQueues.length > 0) {
            const queueIds = inactiveQueues.map((q) => q.id);
            const queueNames = inactiveQueues.map((q) => q.name);
            const totalItems = inactiveQueues.reduce(
              (sum, q) => sum + q._count.queueItems,
              0
            );

            // Delete associated queue items first (cascade should handle this, but being explicit)
            const queueItemsResult = await prisma.queueItem.deleteMany({
              where: {
                queueId: {
                  in: queueIds,
                },
              },
            });

            // Delete the queues
            const queuesResult = await prisma.queue.deleteMany({
              where: {
                id: {
                  in: queueIds,
                },
              },
            });

            totalQueuesDeleted += queuesResult.count;
            totalQueueItemsDeleted += queueItemsResult.count;

            console.log(
              `✅ Account ${account.id}: Deleted ${queuesResult.count} inactive queues and ${queueItemsResult.count} queue items`
            );

            // ✅ Create audit log for queue cleanup
            await createAuditLog({
              staffId: null,
              accountId: account.id,
              outletId: null,
              actionType: "INACTIVE_QUEUE_CLEANUP",
              entityType: "Queue",
              entityId: null,
              actionDetails: JSON.stringify({
                queuesDeleted: queuesResult.count,
                queueItemsDeleted: queueItemsResult.count,
                queueIds: queueIds,
                queueNames: queueNames,
                olderThan: sixMonthsAgo.toISOString(),
                retentionPeriod: "6 months",
                performedBy: "SYSTEM_CRON",
                outlets: inactiveQueues.map((q) => ({
                  outletId: q.outletId,
                  outletName: q.outlet?.name,
                  queueName: q.name,
                })),
              }),
              isCronJob: true,
            });
          }
        } catch (accountError) {
          console.error(
            `❌ Error cleaning inactive queues for account ${account.id}:`,
            accountError
          );

          // ✅ Log the error
          try {
            await createAuditLog({
              staffId: null,
              accountId: account.id,
              outletId: null,
              actionType: "INACTIVE_QUEUE_CLEANUP_FAILED",
              entityType: "Queue",
              entityId: null,
              actionDetails: JSON.stringify({
                error: accountError.message,
                performedBy: "SYSTEM_CRON",
              }),
              isCronJob: true,
            });
          } catch (logError) {
            console.error("Failed to log cleanup error:", logError);
          }
        }
      }

      console.log(
        `✅ Inactive queue cleanup completed. Deleted ${totalQueuesDeleted} queues and ${totalQueueItemsDeleted} queue items across ${accounts.length} accounts`
      );
    } catch (error) {
      console.error("❌ Fatal error in inactive queue cleanup job:", error);
    }
  });

  //* 4. RESET MONTHLY USAGE COUNTERS (FIRST DAY OF EACH MONTH AT 3:30 AM)
  cron.schedule("30 3 1 * *", async () => {
    console.log("🕐 Running monthly usage counter reset job");

    try {
      const accounts = await prisma.account.findMany({
        select: {
          id: true,
          companyName: true,
          queuesCreatedThisMonth: true,
          queueItemsCreatedThisMonth: true,
          smsSentThisMonth: true,
        },
      });

      let totalReset = 0;

      for (const account of accounts) {
        try {
          // Store previous month's stats before resetting
          const previousMonthStats = {
            queuesCreated: account.queuesCreatedThisMonth,
            queueItemsCreated: account.queueItemsCreatedThisMonth,
            smsSent: account.smsSentThisMonth,
            month: moment().subtract(1, "month").format("YYYY-MM"),
          };

          // Reset counters
          await prisma.account.update({
            where: { id: account.id },
            data: {
              queuesCreatedThisMonth: 0,
              queueItemsCreatedThisMonth: 0,
              smsSentThisMonth: 0,
            },
          });

          totalReset++;

          // ✅ Audit log with previous month's stats
          await createAuditLog({
            staffId: null,
            accountId: account.id,
            outletId: null,
            actionType: "MONTHLY_USAGE_RESET",
            entityType: "Account",
            entityId: account.id,
            actionDetails: JSON.stringify({
              previousMonthStats,
              performedBy: "SYSTEM_CRON",
            }),
            isCronJob: true,
          });

          console.log(`✅ Account ${account.id}: Usage counters reset`);
        } catch (accountError) {
          console.error(
            `❌ Error resetting usage for account ${account.id}:`,
            accountError
          );
        }
      }

      console.log(
        `✅ Monthly usage reset completed for ${totalReset} accounts`
      );
    } catch (error) {
      console.error("❌ Fatal error in usage reset job:", error);
    }
  });

  console.log("✅ Scheduled cron jobs are running");
};

module.exports = startCronJobs;
