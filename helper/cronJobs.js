const cron = require("node-cron");
const moment = require("moment");
const prisma = require("../script");
const startCleanup = require("../services/startupServices");

const startCronJobs = () => {
  startCleanup();
  //* 1. DELETE AUDIT LOGS OLDER THAN 30 DAYS AT 2 AM
  cron.schedule("00 2 * * *", async () => {
    console.log("Running daily audit log cleanup job");
    const thirtyDaysAgo = moment().subtract(30, "days").toDate();
    try {
      const result = await prisma.auditLog.deleteMany({
        where: {
          timestamp: {
            lt: thirtyDaysAgo,
          },
        },
      });
      console.log(`Successfully deleted ${result.count} from audit logs.`);
    } catch (error) {
      console.error("Error deleting audit logs! ", error);
    }
  });

  //* 2. DELETE NON-VIP PHONE NUMBER EVERY DAY AT 2.30 AM
  cron.schedule("30 2 * * *", async () => {
    console.log("Running daily non-vip phone number cleanup job");
    const twentyFourHoursAgo = moment().subtract(24, "hours").toDate();
    try {
      const result = await prisma.queueItem.updateMany({
        where: {
          customer: null,
          contactNumber: {
            not: "",
          },
          createdAt: {
            lt: twentyFourHoursAgo,
          },
        },
        data: {
          contactNumber: "",
        },
      });
      console.log(
        `Successfully deleted ${result.count} phone numbers from non-vip customers`
      );
    } catch (error) {
      console.error("Error deleting non-vip phone numbers! ", error);
    }
  });

  console.log("Scheduled cron jobs are running");
};

module.exports = startCronJobs;
