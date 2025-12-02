const prisma = require("../script");

exports.getAccountEmail = async (email) => {
  console.log("Searching for email, encrypted: ", email);
  const emailExist = await prisma.account.findUnique({
    where: { companyEmailHashed: email },
  });
  // const allEmails = await prisma.account.findMany({});
  // console.log("All accounts in DB: ", allEmails);
  // const deleteAll = await prisma.account.deleteMany({});
  // console.log("Deleted all accounts: ", deleteAll);
  return emailExist;
};

exports.getAccountById = async (id) => {
  const accountIdExist = await prisma.account.findUnique({
    where: { id: id },
  });
  return accountIdExist;
};

exports.createAccount = async (data) => {
  const account = await prisma.account.create({
    data: {
      companyName: data.companyName,
      companyEmail: data.companyEmail,
      companyEmailHashed: data.companyEmailHashed,
      primaryAuthProvider: data.provider,
      password: data.password,
      hasPassword: data.hasPassword,
      businessType: data.businessType,
      slug: data.slug,
    },
  });

  console.log("Created an account: ", account.id);
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
  console.log("Creating OAuth token: ", data);
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

exports.getStaffByNameAndAccount = async (data) => {
  console.log("Getting staff by name and account: ", data);
  const staff = await prisma.staff.findFirst({
    where: {
      nameHashed: data.nameHashed,
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

exports.updateStaffIdForOAuthToken = async (data) => {
  const updatedToken = await prisma.oAuthToken.update({
    where: {
      id: data.id,
      accountId: data.accountId,
    },
    data: {
      staffId: data.staffId,
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
  console.log("Creating new outlet with showPax: ", data.showPax);
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
      showPax: data.showPax ?? true,
    },
  });
  console.log("New outlet created: ", newOutlet.showPax);
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
      businessType: data.businessType,
      slug: data.slug,
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

exports.findOutletsByAcctIdLandingPage = async (data) => {
  const outlets = await prisma.outlet.findMany({
    where: {
      accountId: data,
    },
  });
  return outlets;
};

exports.findOutletsByAcctId = async (data) => {
  const outlets = await prisma.outlet.findMany({
    where: {
      accountId: data.accountId,
    },
    include: {
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

  const account = await prisma.account.findUnique({
    where: {
      id: data.accountId,
    },
    select: {
      companyName: true,
      logo: true,
      businessType: true,
    },
  });
  const toReturn = {
    accountInfo: account,
    outlets: outlets,
  };
  return toReturn;
};

exports.createQueue = async (data) => {
  const queue = await prisma.queue.create({
    data: {
      outletId: data.outletId,
      name: data.name,
      accountId: data.accountId,
      maxQueueItems: parseInt(data.maxQueueItems),
    },
  });
  console.log("Queue has been created: ", queue);
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
      maxQueueItems: true,
    },
    orderBy: {
      startTime: "desc",
    },
  });
  return activeQueue;
};

exports.findOutletByIdAndAccountId = async ({ accountId, id }) => {
  console.log("FInding outlet by id and acct id: ", accountId, id);
  const outlet = await prisma.outlet.findFirst({
    where: {
      id: id,
      accountId: accountId,
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
  console.log(data.queueId, " has active queue items: ", queueItemsCount);
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
      numberHashed: data.numberHashed,
      accountId: data.accountId,
      pdpaConsent: data.pdpaConsent,
      pdpaConsentAt: data.pdpaConsentAt,
      VIP: data.VIP,
    },
  });

  console.log("Created a customer: ", customer.id);
  return customer;
};

exports.createAQueueItem = async (data) => {
  const queueItem = await prisma.queueItem.create({
    data: {
      pax: data.pax,
      position: data.position,
      name: data.name,
      contactNumber: data.contactNumber,
      contactNumberHashed: data.contactNumberHashed,
      pdpaConsent: data.pdpaConsent,
      pdpaConsentAt: data.pdpaConsentAt,

      // ✅ Use nested relation object, not direct ID
      queue: {
        connect: {
          id: data.queueId,
        },
      },

      // ✅ Fix: Use relation name with connect
      ...(data.createdByStaffId && {
        createdByStaff: {
          connect: {
            id: data.createdByStaffId,
          },
        },
      }),

      // ✅ Optional: connect customer if VIP
      ...(data.customerId && {
        customer: {
          connect: {
            id: data.customerId,
          },
        },
      }),
    },
    include: {
      queue: true,
      customer: true,
      createdByStaff: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
    },
  });

  console.log("✅ Queue item created:", queueItem.id);
  return queueItem;
};

exports.createAQueueItemVIP = async (data) => {
  const queueItem = await prisma.queueItem.create({
    data: {
      pax: data.pax,
      position: data.position,
      name: data.name,
      contactNumber: data.contactNumber,
      contactNumberHashed: data.contactNumberHashed,
      pdpaConsent: data.pdpaConsent,
      pdpaConsentAt: data.pdpaConsentAt,

      queue: {
        connect: {
          id: data.queueId,
        },
      },

      // ✅ Connect VIP customer
      customer: {
        connect: {
          id: data.customerId,
        },
      },

      // ✅ Fix: Use relation name
      ...(data.createdByStaffId && {
        createdByStaff: {
          connect: {
            id: data.createdByStaffId,
          },
        },
      }),
    },
    include: {
      queue: true,
      customer: true,
      createdByStaff: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
    },
  });

  console.log("✅ VIP queue item created:", queueItem.id);
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
    include: {
      outlets: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  if (account) {
    return {
      id: account.id,
      companyName: account.companyName,
      logo: account.logo,
      slug: account.slug,
      businessType: account.businessType,
      allOutlets: account.outlets,
    };
  } else {
    return null;
  }
};

exports.findDuplicateCustomerByNumberAndAcctId = async (data) => {
  console.log("Finding duplicate customer for number and acct id: ", data);
  const customer = await prisma.customer.findMany({
    where: {
      numberHashed: data.numberHashed,
      accountId: data.accountId,
      VIP: true,
    },
  });

  console.log("Duplicate customer found: ", customer);
  return customer;
};

exports.findQueueItemByContactNumberHashedAndQueueId = async ({
  queueId,
  contactNumberHashed,
}) => {
  return prisma.queueItem.findMany({
    where: {
      queueId,
      contactNumberHashed,
    },
  });
};

exports.findQueueByQueueId = async (queueId) => {
  console.log("Finding Queue by QueueID", queueId);
  const queue = await prisma.queue.findUnique({
    where: {
      id: queueId,
    },
  });
  return queue;
};

exports.findDuplicateCustomerInQueue = async (data) => {
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
  const queue = await prisma.queue.findFirst({
    where: { id: queueId },
    include: {
      queueItems: {
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          queueId: true,
          customerId: true,
          createdAt: true,
          pax: true,
          name: true,
          contactNumber: true,
          called: true,
          calledAt: true,
          seated: true,
          seatedAt: true,
          quit: true,
          quitAt: true,
          noShow: true,
          noShowAt: true,
          active: true,
          position: true,
          inactiveAt: true,
          version: true,
          customer: true,
        },
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
    data: { ...dataToUpdate, version: { increment: 1 } },
    select: {
      id: true,
      queueId: true,
      name: true,
      contactNumber: true,
      called: true,
      calledAt: true,
      seated: true,
      quit: true,
      noShow: true,
      active: true,
      position: true,
      pax: true,
      version: true,
      fcmToken: true,
    },
  });
  console.log("This is the updated called queue item : ", updateCalled.id);
  console.log("With FCM token: ", updateCalled.fcmToken);
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
      auditLogs: false,
      createdQueueItems: false,
      pausedByStaff: false,
    },
  });
  return findAllStaff;
};

exports.createAuditLog = async (data) => {
  try {
    const createLog = await prisma.auditLog.create({
      data: {
        account: {
          connect: {
            id: data.accountId,
          },
        },
        staff: data.staffId
          ? {
              connect: {
                id: data.staffId,
              },
            }
          : undefined,
        outlet: data.outletId ? { connect: { id: data.outletId } } : undefined,
        actionType: data.actionType,

        entityType: data.entityType || null,
        entityId: data.entityId || null,
        actionDetails: data.actionDetails || null,
        ipAddress: data.ipAddress || null,
        userAgent: data.userAgent || null,
      },
    });

    console.log(
      `✅ Audit log created: ${createLog.actionType} by staff ${
        data.staffId || "system"
      }`
    );
    return createLog;
  } catch (error) {
    console.error("❌ Failed to create audit log:", error);
    return null;
  }
};

exports.deleteStaff = async (data) => {
  const deleteStaff = await prisma.staff.delete({
    where: {
      id: data.staffId,
      accountId: data.accountId,
    },
  });
  return deleteStaff;
};

exports.getStaffByIdAndAccountId = async (data) => {
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
  console.log("End queue: ", endQueue.id);
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
      contactNumberHashed: data.contactNumberHashed,
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
  return outlet;
};

exports.findAuditLogsByOutletId = async (data) => {
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

exports.findAuditLogsByAccountId = async (accountId) => {
  const auditLog = await prisma.auditLog.findMany({
    where: {
      accountId: accountId,
      outletId: null,
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
  console.log("Audit logs found: ", auditLog.length);
  return auditLog;
};
exports.updateMaxQueuers = async ({ queueId, maxQueueItems }) => {
  const updateMaxQueuers = await prisma.queue.update({
    where: {
      id: queueId,
    },
    data: { maxQueueItems: maxQueueItems },
  });

  return updateMaxQueuers;
};
exports.findAllCustomersByAccountId = async (
  accountId,
  page = 1,
  limit = 50
) => {
  const skip = (page - 1) * limit;

  // Get customers for current page
  const customers = await prisma.customer.findMany({
    where: {
      accountId: accountId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
    skip: skip,
  });

  // Get total count for pagination
  const totalCount = await prisma.customer.count({
    where: {
      accountId: accountId,
    },
  });

  return {
    customers,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalCustomers: totalCount,
      hasMore: skip + customers.length < totalCount,
    },
  };
};

exports.updateQueueItemFcmToken = async (queueItemId, token) => {
  try {
    const updatedQueueItem = await prisma.queueItem.update({
      where: {
        id: queueItemId,
      },
      data: {
        fcmToken: token,
      },
    });
    return updatedQueueItem;
  } catch (error) {
    // Prisma throws an error if the record is not found on update
    console.error(
      `Error updating FCM token for queue item ${queueItemId}:`,
      error
    );
    return null;
  }
};

exports.updateQueueItemSecretToken = async (queueItemId, secretToken) => {
  try {
    const updatedQueueItem = await prisma.queueItem.update({
      where: {
        id: queueItemId,
      },
      data: {
        secretToken: secretToken,
      },
    });
    return updatedQueueItem;
  } catch (error) {
    // Prisma throws an error if the record is not found on update
    console.error(
      `Error updating secret token for queue item ${queueItemId}:`,
      error
    );
    return null;
  }
};

exports.findTopActiveQueueItems = async (queueId, count) => {
  return await prisma.queueItem.findMany({
    where: {
      queueId: queueId,
      active: true,
    },
    orderBy: {
      position: "asc",
    },
    take: count,
    include: {
      queue: {
        include: {
          outlet: true,
          account: true,
        },
      },
    },
  });
};

exports.updateSecretTokenByQueueItemId = async (data) => {
  const updatedQueueItem = await prisma.queueItem.update({
    where: {
      id: data.queueItemId,
    },
    data: {
      secretToken: data.secretToken,
    },
  });
  return updatedQueueItem;
};

exports.findAllVIPCustomersByAccountId = async (
  accountId,
  page = 1,
  limit = 10
) => {
  const skip = (page - 1) * limit;

  const [customers, totalCustomers] = await Promise.all([
    prisma.customer.findMany({
      where: {
        accountId: accountId,
        VIP: true, // Filter only VIP customers
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: skip,
      take: limit,
    }),
    prisma.customer.count({
      where: {
        accountId: accountId,
        VIP: true,
      },
    }),
  ]);

  return {
    customers,
    pagination: {
      totalCustomers,
      totalPages: Math.ceil(totalCustomers / limit),
      currentPage: page,
      limit,
    },
  };
};
