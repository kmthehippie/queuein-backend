const asyncHandler = require("express-async-handler");
const moment = require("moment");
const prisma = require("../script");
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

// ⚠️ ONLY FOR DEVELOPMENT - Remove in production!
exports.test_audit_log_cleanup = [
  asyncHandler(async (req, res, next) => {
    if (process.env.NODE_ENV === "production") {
      return res.status(403).json({ error: "Not available in production" });
    }

    console.log("🧪 Testing audit log cleanup job");
    const thirtyDaysAgo = moment().subtract(30, "days").toDate();

    const accounts = await prisma.account.findMany({
      select: { id: true, companyName: true },
    });

    let totalDeleted = 0;
    const results = [];

    for (const account of accounts) {
      const result = await prisma.auditLog.deleteMany({
        where: {
          accountId: account.id,
          timestamp: { lt: thirtyDaysAgo },
          actionType: {
            notIn: preservedActionTypes,
          },
        },
      });

      if (result.count > 0) {
        totalDeleted += result.count;
        results.push({
          accountId: account.id,
          deleted: result.count,
        });

        await createAuditLog({
          staffId: null,
          accountId: account.id,
          outletId: null,
          actionType: "AUDIT_LOG_CLEANUP",
          entityType: "AuditLog",
          entityId: null,
          actionDetails: JSON.stringify({
            deletedCount: result.count,
            olderThan: thirtyDaysAgo.toISOString(),
            performedBy: "MANUAL_TEST",
          }),
          isCronJob: false,
        });
      }
    }

    return res.status(200).json({
      message: "Audit log cleanup test completed",
      totalDeleted,
      accountsProcessed: accounts.length,
      results,
    });
  }),
];

exports.test_phone_cleanup = [
  asyncHandler(async (req, res, next) => {
    if (process.env.NODE_ENV === "production") {
      return res.status(403).json({ error: "Not available in production" });
    }

    console.log("🧪 Testing phone number cleanup job");
    const twentyFourHoursAgo = moment().subtract(24, "hours").toDate();

    const accounts = await prisma.account.findMany({
      select: { id: true },
    });

    let totalCleaned = 0;
    const results = [];

    for (const account of accounts) {
      const queueItemsToClean = await prisma.queueItem.findMany({
        where: {
          customerId: null,
          contactNumber: { not: "" },
          createdAt: { lt: twentyFourHoursAgo },
          queue: { accountId: account.id },
        },
        select: { id: true, queueId: true },
      });

      if (queueItemsToClean.length > 0) {
        const result = await prisma.queueItem.updateMany({
          where: { id: { in: queueItemsToClean.map((i) => i.id) } },
          data: { contactNumber: "" },
        });

        totalCleaned += result.count;
        results.push({
          accountId: account.id,
          cleaned: result.count,
        });

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
            performedBy: "MANUAL_TEST",
            gdprCompliance: true,
          }),
          isCronJob: false,
        });
      }
    }

    return res.status(200).json({
      message: "Phone cleanup test completed",
      totalCleaned,
      accountsProcessed: accounts.length,
      results,
    });
  }),
];

exports.test_inactive_queue_cleanup = [
  asyncHandler(async (req, res, next) => {
    if (process.env.NODE_ENV === "production") {
      return res.status(403).json({ error: "Not available in production" });
    }

    console.log("🧪 Testing inactive queue cleanup job");
    const sixMonthsAgo = moment().subtract(6, "months").toDate();

    const accounts = await prisma.account.findMany({
      select: { id: true },
    });

    let totalQueuesDeleted = 0;
    let totalQueueItemsDeleted = 0;
    const results = [];

    for (const account of accounts) {
      const inactiveQueues = await prisma.queue.findMany({
        where: {
          accountId: account.id,
          active: false,
          endTime: { lt: sixMonthsAgo },
        },
        select: { id: true, name: true },
      });

      if (inactiveQueues.length > 0) {
        const queueIds = inactiveQueues.map((q) => q.id);

        const queueItemsResult = await prisma.queueItem.deleteMany({
          where: { queueId: { in: queueIds } },
        });

        const queuesResult = await prisma.queue.deleteMany({
          where: { id: { in: queueIds } },
        });

        totalQueuesDeleted += queuesResult.count;
        totalQueueItemsDeleted += queueItemsResult.count;

        results.push({
          accountId: account.id,
          queuesDeleted: queuesResult.count,
          queueItemsDeleted: queueItemsResult.count,
        });

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
            queueIds,
            performedBy: "MANUAL_TEST",
          }),
          isCronJob: false,
        });
      }
    }

    return res.status(200).json({
      message: "Inactive queue cleanup test completed",
      totalQueuesDeleted,
      totalQueueItemsDeleted,
      accountsProcessed: accounts.length,
      results,
    });
  }),
];

exports.test_usage_reset = [
  asyncHandler(async (req, res, next) => {
    if (process.env.NODE_ENV === "production") {
      return res.status(403).json({ error: "Not available in production" });
    }

    console.log("🧪 Testing monthly usage reset job");

    const accounts = await prisma.account.findMany({
      select: {
        id: true,
        queuesCreatedThisMonth: true,
        queueItemsCreatedThisMonth: true,
        smsSentThisMonth: true,
      },
    });

    const results = [];

    for (const account of accounts) {
      const previousStats = {
        queuesCreated: account.queuesCreatedThisMonth,
        queueItemsCreated: account.queueItemsCreatedThisMonth,
        smsSent: account.smsSentThisMonth,
      };

      await prisma.account.update({
        where: { id: account.id },
        data: {
          queuesCreatedThisMonth: 0,
          queueItemsCreatedThisMonth: 0,
          smsSentThisMonth: 0,
        },
      });

      results.push({
        accountId: account.id,
        previousStats,
      });

      await createAuditLog({
        staffId: null,
        accountId: account.id,
        outletId: null,
        actionType: "MONTHLY_USAGE_RESET",
        entityType: "Account",
        entityId: account.id,
        actionDetails: JSON.stringify({
          previousMonthStats: previousStats,
          performedBy: "MANUAL_TEST",
        }),
        isCronJob: false,
      });
    }

    return res.status(200).json({
      message: "Usage reset test completed",
      accountsProcessed: accounts.length,
      results,
    });
  }),
];
