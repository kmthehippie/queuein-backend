const { use } = require("passport");
const prisma = require("../script");

exports.getAccountEmail = async (email) => {
  const emailExist = prisma.account.findUnique({
    where: { companyEmail: email },
  });
  return emailExist;
};

exports.getAccountById = async (id) => {
  const accountIdExist = prisma.account.findUnique({
    where: { id: id },
  });
  return accountIdExist;
};

exports.createAccount = async (data) => {
  const account = await prisma.account.create({
    data: {
      companyName: data.companyName,
      companyEmail: data.companyEmail,
      password: data.password,
      hasPassword: data.hasPassword,
      slug: data.slug,
    },
  });
  return account;
};

exports.createStaff = async (data) => {
  try {
    const staff = await prisma.staff.create({
      data: {
        ...data,
      },
    });
    return staff;
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("A staff member with this email already exists");
    }
    throw error;
  }
};

exports.createOAuthToken = async (data) => {
  const OAuthToken = await prisma.oAuthToken.create({
    data: {
      provider: data.provider,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      accountId: data.accountId,
      userAgent: data.userAgent,
      lastLoggedIn: data.lastLoggedIn,
    },
  });
  return OAuthToken;
};

exports.updateAccount = async (data) => {
  const account = await prisma.account.update({
    companyName: data.companyName,
  });

  return account;
};

exports.getStaffByNameAndAccount = async (data) => {
  const staff = await prisma.staff.findFirst({
    where: {
      name: data.name,
      accountId: data.accountId,
    },
  });
  return staff;
};

exports.updateOAuthToken = async (data) => {
  const updatedToken = await prisma.oAuthToken.update({
    where: {
      id: data.id,
    },
    data: {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    },
  });
  return updatedToken;
};

exports.deleteAllOAuthToken = async () => {
  const deleteAll = await prisma.oAuthToken.deleteMany({});
  return deleteAll;
};

exports.findOAuthTokenByRefreshToken = async (refreshToken) => {
  const token = await prisma.oAuthToken.findFirst({
    where: {
      refreshToken: refreshToken,
    },
    include: {
      account: true,
    },
  });
  console.log("Finding oauthtoken by refreshtoken. The OID: ", token.id);
  return token;
};
exports.findOAuthTokenByAccountIdAndUserAgent = async (
  accountId,
  userAgent
) => {
  const token = await prisma.oAuthToken.findFirst({
    where: {
      accountId: accountId,
      userAgent: userAgent,
    },
  });

  return token;
};

exports.deleteOAuthTokenByRefreshToken = async (refreshToken) => {
  const deletedToken = await prisma.oAuthToken.deleteMany({
    where: {
      refreshToken: refreshToken,
    },
  });
  return deletedToken;
};

exports.findOAuthTokenByOID = async (oid) => {
  const OAuthToken = await prisma.oAuthToken.findUnique({
    where: {
      id: oid,
    },
  });
  return OAuthToken;
};

exports.deleteOAuthTokenByOID = async (oid) => {
  const deletedToken = await prisma.oAuthToken.deleteMany({
    where: {
      id: oid,
    },
  });
  return deletedToken;
};

exports.createOutlet = async (data) => {
  console.log("Creating new outlet ");
  const newOutlet = await prisma.outlet.create({
    data: {
      name: data.name,
      accountId: data.accountId,
      location: data.location || null,
      googleMaps: data.googleMaps || null,
      wazeMaps: data.wazeMaps || null,
      imgUrl: data.imgUrl || null,
      defaultEstWaitTime: data.defaultEstWaitTime,
      phone: data.phone || null,
      hours: data.hours || null,
    },
  });
  return newOutlet;
};

exports.findAccountByAccountId = async (data) => {
  const account = await prisma.account.findUnique({
    where: {
      id: data,
    },
  });
  return account;
};

exports.updateAccount = async (data) => {
  const updateAcct = await prisma.account.update({
    where: {
      id: data.accountId,
    },
    data: {
      companyName: data.companyName,
      logo: data.logo,
    },
  });
  return updateAcct;
};

exports.findAccountByName = async (data) => {
  const account = await prisma.account.findUnique({
    where: {
      companyName: data,
    },
  });
  return account;
};

exports.findOutletsByAcctId = async (data) => {
  const outlets = await prisma.outlet.findMany({
    where: {
      accountId: data,
    },
    include: {
      account: {
        select: {
          companyName: true,
        },
      },
      queues: {
        where: {
          active: true,
        },
        select: {
          id: true,
          active: true,
        },
      },
    },
  });
  return outlets;
};

exports.createQueue = async (data) => {
  const queue = await prisma.queue.create({
    data: {
      outletId: data.outletId,
      name: data.name,
      accountId: data.accountId,
    },
  });
  return queue;
};

exports.findQueueByAccountId = async (data) => {
  const queue = await prisma.queue.findMany({
    where: {
      accountId: data.accountId,
    },
  });

  console.log("Found queues by account id");
  return queue;
};

exports.findActiveQueuesByOutletAndAccountId = async (data) => {
  const activeQueue = await prisma.queue.findMany({
    where: {
      accountId: data.accountId,
      outletId: data.outletId,
      active: true,
    },
    select: {
      id: true,
      name: true,
      active: true,
      queueItems: true,
    },
    orderBy: {
      startTime: "desc",
    },
  });
  return activeQueue;
};

exports.findOutletByIdAndAccountId = async (data) => {
  const outlet = await prisma.outlet.findFirst({
    where: {
      id: data.id,
      accountId: data.accountId,
    },
    include: {
      account: {
        select: {
          companyName: true, // Account name
          logo: true, // Account logo
        },
      },
      queues: {
        where: {
          active: true, // Filter for active queues
        },
        select: {
          id: true, // Just need an identifier to check if any active queue exists
        },
      },
    },
  });
  console.log("This is the outlet: ", outlet);
  return outlet;
};

exports.findRecentlyInactiveQueue = async (data) => {
  const queue = await prisma.queue.findFirst({
    where: {
      accountId: data.accountId,
      outletId: data.outletId,
      active: false,
      endTime: {
        gte: data.fortyEightHoursAgo,
        lt: data.now,
      },
    },
    select: {
      id: true,
      name: true,
      active: true,
    },
    orderBy: {
      startTime: "desc",
    },
  });
  return queue;
};

exports.countActiveQueueItemsByQueueId = async (data) => {
  const queueItemsCount = await prisma.queueItem.count({
    where: {
      queueId: data.queueId,
      active: true,
      seated: false,
      quit: false,
      noShow: false,
    },
  });
  return queueItemsCount;
};

exports.findLatestInactiveQueueStats = async (data) => {
  const queues = await prisma.queue.findMany({
    where: {
      accountId: data.accountId,
      outletId: data.outletId,
      active: false,
    },
    orderBy: {
      endTime: "desc",
    },
    take: data.limit,
    skip: data.skip,
    include: {
      queueItems: {
        select: {
          active: true,
          seated: true,
          quit: true,
          noShow: true,
        },
      },
    },
  });
  return queues;
};

exports.countInactiveQueues = async ({ accountId, outletId }) => {
  return await prisma.queue.count({
    where: {
      accountId: accountId,
      outletId: outletId,
      active: false,
    },
  });
};
exports.createACustomer = async (data) => {
  const customer = await prisma.customer.create({
    data: {
      name: data.name,
      number: data.number,
      VIP: data.VIP,
      accountId: data.accountId,
    },
  });
  console.log("Creating a customer, ", customer);
  return customer;
};

exports.createAQueueItemVIP = async (data) => {
  console.log("Trying to create queue item: ", data);
  const queueItem = await prisma.queueItem.create({
    data: {
      pax: data.pax,
      name: data.name,
      contactNumber: data.contactNumber,
      position: data.position,
      inactiveAt: null,
      queue: {
        connect: {
          id: data.queueId,
        },
      },
      customer: {
        connect: { id: data.customerId },
      },
    },
  });
  return queueItem;
};
exports.createAQueueItem = async (data) => {
  console.log("Trying to create queue item: ", data);
  const queueItem = await prisma.queueItem.create({
    data: {
      pax: data.pax,
      position: data.position,
      name: data.name,
      contactNumber: data.contactNumber,
      inactiveAt: null,
      queue: {
        connect: {
          id: data.queueId,
        },
      },
    },
  });
  return queueItem;
};

exports.findExistingSlug = async (slug) => {
  const existingSlug = await prisma.account.findUnique({
    where: { slug: slug },
  });
  return existingSlug;
};

exports.findAccountBySlug = async (slug) => {
  const account = await prisma.account.findUnique({
    where: { slug: slug },
  });
  if (account) {
    return {
      id: account.id,
      companyName: account.companyName,
      logo: account.logo,
      slug: account.slug,
    };
  } else {
    return null;
  }
};

exports.findDuplicateCustomerByNumberAndAcctId = async (data) => {
  console.log("Find duplicate customer by number and account id", data);
  const customer = await prisma.customer.findMany({
    where: {
      number: data.number,
      accountId: data.accountId,
    },
  });
  console.log("Customer: ", customer);
  return customer;
};

// exports.findQueueByQueueId = async (queueId) => {
//   console.log("Finding Queue by QueueID", queueId);
//   const queue = await prisma.queue.findUnique({
//     where: {
//       id: queueId,
//     },
//   });
//   return queue;
// };

exports.findDuplicateCustomerInQueue = async (data) => {
  console.log(
    "Finding duplicate customers in queue ",
    data.queueId,
    data.customerId
  );
  const existing = await prisma.queueItem.findMany({
    where: {
      queueId: data.queueId,
      customerId: data.customerId,
    },
  });
  return existing;
};

// exports.findDupeActiveCustomerInQueueItem = async (data) => {
//   const queueItem = await prisma.queueItem.findMany({
//     where: {
//       customerId: data.customerId,
//       active: true,
//       quit: false,
//       seated: false,
//     },
//   });
//   console.log("Queue item with active being true ", queueItem);
//   return queueItem;
// };

exports.findOutletByQueueId = async (queueId) => {
  const queueOutlet = await prisma.queue.findFirst({
    where: {
      id: queueId,
    },
    include: {
      outlet: true,
    },
  });

  return queueOutlet;
};

exports.findQueueItemsLengthByQueueId = async (queueId) => {
  const queueItemsCount = await prisma.queueItem.count({
    where: {
      queueId: queueId,
    },
  });
  console.log(queueId, " has ", queueItemsCount);
  if (queueItemsCount === null) {
    return parseInt(0);
  }
  return parseInt(queueItemsCount);
};

exports.findActiveQueueItemsLengthByQueueId = async (queueId) => {
  const queueItemsCount = await prisma.queueItem.count({
    where: {
      queueId: queueId,
      active: true,
    },
  });
  console.log(queueId, " has active queue items: ", queueItemsCount);
  if (queueItemsCount === null) {
    return parseInt(0);
  }
  return parseInt(queueItemsCount);
};

exports.findCustomerByAcctIdAndNumber = async (data) => {
  const customer = await prisma.customer.findUnique({
    where: {
      accountId: data.accountId,
      number: data.number,
    },
  });
  return customer;
};

exports.findAllQueueItemsByQueueId = async (queueId) => {
  const queue = await prisma.queue.findMany({
    where: { id: queueId },
    include: {
      queueItems: {
        orderBy: { createdAt: "asc" },
        include: { customer: true },
      },
    },
  });
  let queueToReturn;
  if (Array.isArray(queue)) {
    queueToReturn = queue[0];
  } else {
    queueToReturn = queue;
  }
  return queueToReturn;
};
exports.findQueueItemsByQueueId = async (data) => {
  const queueItems = await prisma.queueItem.findMany({
    where: {
      queueId: data.queueId,
    },
  });
  return queueItems;
};
exports.findCustomerByCustomerID = async (customerId) => {
  const cust = await prisma.customer.findUnique({
    where: { id: customerId },
    include: {
      queueItems: true,
    },
  });
  return cust;
};

exports.findQueueItemByQueueItemId = async (queueItemId) => {
  console.log("Find queue item by queue item id ", queueItemId);
  const queueItem = await prisma.queueItem.findUnique({
    where: {
      id: queueItemId,
    },
    include: {
      customer: true,
    },
  });
  return queueItem;
};

exports.updateQueueItemByQueueItemId = async (data) => {
  const updatedQueueItem = await prisma.queueItem.update({
    where: {
      id: data.queueItemId,
    },
    data: {
      active: data.active,
      quit: data.quit,
    },
  });
  console.log("Previous queue item is being updated ", updatedQueueItem.id);
  return updatedQueueItem;
};

exports.updatePaxByQueueItemId = async (data) => {
  const updatedQueueItem = await prisma.queueItem.update({
    where: {
      id: data.queueItemId,
    },
    data: {
      pax: parseInt(data.pax),
    },
    include: {
      customer: true,
    },
  });
  return updatedQueueItem;
};

exports.updateOutletByOutletAndAcctId = async (data) => {
  const { outletId, accountId, ...updatePayload } = data;
  const updatedOutlet = await prisma.outlet.update({
    where: {
      id: outletId,
      accountId: accountId,
    },
    data: updatePayload,
  });

  console.log("Post update of outlet: ", updatedOutlet.id);
  return updatedOutlet;
};

exports.updateQueueItem = async ({
  queueItemId,
  prevVersion,
  dataToUpdate,
}) => {
  const updateSeated = await prisma.queueItem.update({
    where: {
      id: queueItemId,
      version: prevVersion,
    },
    data: {
      ...dataToUpdate,
      version: { increment: 1 },
    },
  });
  console.log("Update the queue item ", updateSeated.id);
  return updateSeated;
};

exports.updateCallQueueItem = async ({
  queueItemId,
  prevVersion,
  dataToUpdate,
}) => {
  const updateCalled = await prisma.queueItem.update({
    where: {
      id: queueItemId,
      version: prevVersion,
    },
    data: dataToUpdate,
  });
  console.log("This is the updated called queue item : ", updateCalled.id);
  return updateCalled;
};

exports.findAllStaffByAcctId = async (data) => {
  const findAllStaff = await prisma.staff.findMany({
    where: {
      accountId: data,
    },
    select: {
      id: true,
      name: true,
      role: true,
      createdAt: true,
      accountId: true,
      email: true,
      pfp: true,
      googleId: true,
      facebookId: true,
      auditLogs: true,
      password: false,
    },
  });
  return findAllStaff;
};

exports.createAuditLog = async (data) => {
  console.log("Create an Audit log ", data);
  const createLog = await prisma.auditLog.create({
    data: {
      staff: {
        connect: {
          id: data.staffId,
        },
      },
      account: {
        connect: {
          id: data.accountId,
        },
      },
      outlet: data.outletId
        ? { connect: { id: parseInt(data.outletId) } }
        : undefined,

      actionType: data.actionType,
    },
  });

  return createLog;
};

exports.deleteStaff = async (data) => {
  console.log("Delete staff data ", data);
  const deleteStaff = await prisma.staff.delete({
    where: {
      id: data.staffId,
      accountId: data.accountId,
    },
  });
  return deleteStaff;
};

exports.getStaffByIdAndAccountId = async (data) => {
  console.log("Getting data for this staff ", data);
  const getStaff = await prisma.staff.findFirst({
    where: {
      id: data.staffId,
      accountId: data.accountId,
    },
  });

  return getStaff;
};

exports.updateStaffByIdAndAcctId = async (data) => {
  const updateStaff = await prisma.staff.update({
    where: {
      accountId: data.accountId,
      id: data.staffId,
    },
    data: data.updateFields,
  });
  console.log("Data has been updated: ", updateStaff.name);
  return updateStaff;
};

exports.deleteOutletByIdAndAcctId = async (data) => {
  console.log("Trying to delete outlet by Id and acct id", data);
  const deleteOutlet = await prisma.outlet.delete({
    where: {
      id: data.outletId,
      accountId: data.accountId,
    },
  });
  return deleteOutlet;
};

exports.endQueueByQueueId = async (data) => {
  const endQueue = await prisma.queue.update({
    where: {
      id: data.queueId,
    },
    data: {
      active: false,
      endTime: new Date(),
    },
  });
  return endQueue;
};

exports.checkStaffValidity = async (data) => {
  const checkValid = await prisma.staff.findFirst({
    where: {
      id: data.staffId,
      role: data.role,
      accountId: data.accountId,
      name: data.name,
    },
  });
  delete checkValid.password;
  delete checkValid.pfp;
  delete checkValid.googleId;
  delete checkValid.facebookId;
  return checkValid;
};

exports.findQueueItemByContactNumberAndQueueId = async (data) => {
  const queueItem = await prisma.queueItem.findMany({
    where: {
      queueId: data.queueId,
      contactNumber: data.contactNumber,
    },
  });

  return queueItem;
};

exports.deleteOAuthToken = async (data) => {
  return prisma.oAuthToken.delete({
    where: {
      id: data.oid,
      refreshToken: data.refreshToken,
      accountId: data.accountId,
    },
  });
};

exports.updateQRCodeForOutletId = async (data) => {
  const outlet = await prisma.outlet.update({
    where: {
      id: data.outletId,
      accountId: data.accountId,
    },
    data: { qrCode: data.qrCode },
  });
  console.log("Outlet updated: ", outlet);
  return outlet;
};

exports.findAuditLogsByOutletId = async (data) => {
  console.log("Data for audit logs: ", data);
  const auditLog = await prisma.auditLog.findMany({
    where: {
      outletId: data.outletId,
      accountId: data.accountId,
    },
    include: {
      staff: {
        select: {
          name: true,
          id: true,
          role: true,
        },
      },
    },
    orderBy: {
      timestamp: "desc",
    },
  });

  return auditLog;
};
