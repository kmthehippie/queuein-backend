//! To be run on every start of server.

const moment = require("moment");
const prisma = require("../script");

// Function is to clean up any cronjobs missed when server was down.

const startCleanup = async () => {
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
      `Successfully updated ${result.count} phone numbers from queue items to null for non-vip customers`
    );
  } catch (error) {
    console.error("Error deleting non-vip phone numbers! ", error);
  }
};

module.exports = startCleanup;
