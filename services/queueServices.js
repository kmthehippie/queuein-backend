const {
  findLatestInactiveQueueStats,
  countInactiveQueues,
} = require("../db/authQueries"); // Adjust path

exports.getInactiveQueueStatsPaginated = async ({
  accountId,
  outletId,
  limit,
  skip,
}) => {
  // Fetch raw data from the data access layer
  const latestInactiveQueues = await findLatestInactiveQueueStats({
    accountId,
    outletId,
    limit,
    skip,
  });

  // Perform business logic / data transformation
  const queuesWithStats = latestInactiveQueues.map((queue) => {
    const queueItems = queue.queueItems; // Get the included array

    const totalQueueItems = queueItems.length;
    const seatedCount = queueItems.filter((item) => item.seated).length;
    const quitCount = queueItems.filter((item) => item.quit).length;
    const noShowCount = queueItems.filter((item) => item.noShow).length;
    const activeCount = queueItems.filter((item) => item.active).length;

    return {
      id: queue.id,
      name: queue.name,
      startTime: queue.startTime,
      endTime: queue.endTime,
      queueItemsCount: totalQueueItems, // Use a consistent naming
      seatedCount: seatedCount,
      quitCount: quitCount,
      noShowCount: noShowCount,
      activeCount: activeCount,
      // You can add more derived properties or omit raw queueItems if not needed
    };
  });

  const totalCount = await countInactiveQueues({ accountId, outletId });
  const totalPages = Math.ceil(totalCount / limit);

  console.log("This is the queuesWithStats: ", queuesWithStats);
  return {
    inactiveQueueStats: queuesWithStats,
    currentPage: Math.floor(skip / limit) + 1, // Calculate current page from skip/limit
    totalPages: totalPages,
    totalCount: totalCount,
  };
};
