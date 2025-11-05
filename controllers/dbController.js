const asyncHandler = require("express-async-handler");
const { header, body, param, query } = require("express-validator");
const handleValidationResult = require("../middleware/validationResult");
const {
  sendQueueUpdateForHost,
  sendQueueUpdate,
  sendMaxQueueItemsUpdate,
  sendOutletUpdate,
} = require("../helper/socketHelper");
const {
  findOutletsByAcctId,
  createOutlet,
  updateOutletByOutletAndAcctId,
  findExistingSlug,
  findActiveQueuesByOutletAndAccountId,
  updateSecretTokenByQueueItemId,
  findAllQueueItemsByQueueId,
  findOutletByIdAndAccountId,
  createQueue,
  findDuplicateCustomerByNumberAndAcctId,
  findQueueItemsLengthByQueueId,
  createAQueueItem,
  createACustomer,
  updateQueueItem,
  updateCallQueueItem,
  findAllStaffByAcctId,
  createStaff,
  getStaffByNameAndAccount,
  createAuditLog,
  deleteStaff,
  getStaffByIdAndAccountId,
  updateStaffByIdAndAcctId,
  deleteOutletByIdAndAcctId,
  endQueueByQueueId,
  findQueueItemByQueueItemId,
  findQueueItemByContactNumberAndQueueId,
  createAQueueItemVIP,
  findQueueItemsByQueueId,
  findRecentlyInactiveQueue,
  countActiveQueueItemsByQueueId,
  findAccountByAccountId,
  updateAccount,
  findAuditLogsByOutletId,
  findQueueByQueueId,
  updateMaxQueuers,
  findOutletsByAcctIdLandingPage,
  findAllCustomersByAccountId,
} = require("../db/authQueries");
const { getInactiveQueueStatsPaginated } = require("../services/queueServices");

const { generatePw, validatePw } = require("../config/passwordUtils");
const {
  PrismaClientKnownRequestError,
} = require("@prisma/client/runtime/library");
const upload = require("../config/multerConfig");
const { generateQRCode } = require("../helper/generateQRCode");
const {
  sendPushNotification,
  notifyTopQueuePos,
} = require("../services/notificationService");
const { encrypt, decrypt } = require("../utils/encryption");

//* OUTLET RELATED CONTROLLERS *//
exports.sidenav_outlet_get = [
  param("accountId").notEmpty().withMessage("Params cannot be empty"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const accountId = req.params.accountId;
    const data = { accountId: accountId };
    const returned = await findOutletsByAcctId(data);
    const outlets = returned.outlets;
    if (returned) {
      const arrToReturn = outlets.map((outlet) => ({
        name: decrypt(outlet.name),
        id: outlet.id,
      }));
      return res.status(200).json(arrToReturn);
    } else {
      return res
        .status(404)
        .json({ message: "No outlets associated with this account id" });
    }
  }),
];

exports.all_outlets_get = [
  param("accountId").notEmpty().withMessage("Params cannot be empty"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const { accountId } = req.params;
    const data = {
      accountId: accountId,
    };
    const returned = await findOutletsByAcctId(data);
    const allOutlets = await findOutletsByAcctIdLandingPage(accountId);

    // Decrypt outlet fields
    returned.outlets.forEach((outlet) => {
      outlet.name = decrypt(outlet.name);
      outlet.location = decrypt(outlet.location);
      outlet.phone = decrypt(outlet.phone);
    });

    // Decrypt account fields if account is included in response and fields exist
    if (returned.accountInfo) {
      if (returned.accountInfo.companyName) {
        returned.accountInfo.companyName = decrypt(
          returned.accountInfo.companyName
        );
      }
      if (returned.accountInfo.companyEmail) {
        returned.accountInfo.companyEmail = decrypt(
          returned.accountInfo.companyEmail
        );
      }
    }

    console.log(returned);
    if (returned) {
      return res.status(200).json(returned);
    } else {
      return res
        .status(404)
        .json({ message: "No outlets associated with this account id" });
    }
  }),
];

exports.update_outlet_patch = [
  upload.single("outletImage"),
  param("accountId").notEmpty().withMessage("Params cannot be empty"),
  param("outletId").notEmpty().withMessage("Outlet params cannot be empty"),
  body("name")
    .optional() // This makes the field optional
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long.")
    .trim()
    .escape(),
  body("location")
    .optional({ checkFalsy: true })
    .notEmpty()
    .withMessage("Location cannot be empty if provided."),
  body("googleMaps")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Google Maps URL must be a valid URL.")
    .notEmpty()
    .withMessage("Google Maps URL cannot be empty if provided.")
    .trim(),
  body("wazeMaps")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Waze Maps URL must be a valid URL.")
    .notEmpty()
    .withMessage("Waze Maps URL cannot be empty if provided.")
    .trim(),
  body("defaultEstWaitTime")
    .optional()
    .notEmpty()
    .withMessage("Estimated wait time cannot be empty if provided."),
  body("phone")
    .optional({ checkFalsy: true })
    .isLength({ min: 10 })
    .withMessage("Contact number must be at least 10 numbers long.")
    .notEmpty()
    .withMessage("Contact number cannot be empty if provided.")
    .trim()
    .escape(),
  body("hours")
    .optional({ checkFalsy: true })
    .notEmpty()
    .withMessage("Hours cannot be empty if provided.")
    .trim()
    .escape(),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const params = req.params;

    const imgUrl = req.file ? req.file.path : null;
    const defaultEstWaitTime = req.body.defaultEstWaitTime;
    let parsedEstWaitTime = null;
    const dataToUpdate = {
      outletId: parseInt(params.outletId),
      accountId: params.accountId,
      ...req.body,
    };

    if (defaultEstWaitTime) {
      parsedEstWaitTime = parseInt(defaultEstWaitTime, 10);
      dataToUpdate.defaultEstWaitTime = parsedEstWaitTime;
    }

    if (imgUrl) {
      dataToUpdate.imgUrl = imgUrl;
    }

    const updatedOutlet = await updateOutletByOutletAndAcctId(dataToUpdate);
    if (!updatedOutlet) {
      return res
        .status(404)
        .json({ message: "Error. Was not able to update the outlet data." });
    } else {
      // Decrypt for response
      updatedOutlet.name = decrypt(updatedOutlet.name);
      updatedOutlet.location = decrypt(updatedOutlet.location);
      updatedOutlet.phone = decrypt(updatedOutlet.phone);

      return res.status(201).json(updatedOutlet);
    }
  }),
];

exports.outlet_delete = [
  param("accountId").notEmpty().withMessage("Params cannot be empty"),
  param("outletId").notEmpty().withMessage("Outlet params cannot be empty"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const data = {
      outletId: parseInt(req.params.outletId),
      accountId: req.params.accountId,
    };
    const deletedOutlet = await deleteOutletByIdAndAcctId(data);
    if (deletedOutlet) {
      res.status(201).json(deletedOutlet);
    } else {
      res.status(404).json({ message: "Error deleting outlet" });
    }
  }),
];

exports.new_outlet_post = [
  upload.single("outletImage"),
  param("accountId")
    .notEmpty()
    .withMessage("Account ID cannot be empty.")
    .trim()
    .escape(),
  body("name")
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long.")
    .trim()
    .escape(),
  body("location")
    .optional({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage("Location cannot be an empty string if provided."),
  body("googleMaps")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("Google Maps URL must be a valid URL."),
  body("wazeMaps")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("Waze Maps URL must be a valid URL."),
  body("defaultEstWaitTime")
    .notEmpty()
    .withMessage("Estimated wait time is required.")
    .isInt({ min: 0 })
    .withMessage("Estimated wait time must be a non-negative integer.")
    .toFloat(),
  body("phone")
    .optional({ checkFalsy: true })
    .trim()
    .escape()
    .isLength({ min: 10 })
    .withMessage(
      "Contact number must be at least 10 numbers long if provided."
    ),
  body("hours")
    .optional({ checkFalsy: true })
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Hours cannot be an empty string if provided."),
  body("showPax")
    .optional({ checkFalsy: true })
    .isBoolean()
    .withMessage("Show Pax must be a boolean value."),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const imgUrl = req.file ? req.file.path : null;
    console.log("Show pax: ", req.body.showPax);
    const data = {
      accountId: req.params.accountId,
      name: encrypt(req.body.name),
      location: encrypt(req.body.location),
      phone: encrypt(req.body.phone),
      ...req.body,
      qrCode: null,
      imgUrl: imgUrl,
      showPax: req.body.showPax === "true" ? true : false,
    };
    const createNewOutlet = await createOutlet(data);
    const findAcctSlug = await findAccountByAccountId(req.params.accountId);
    delete findAcctSlug.password;
    delete findAcctSlug.companyEmail;

    const dataForQRCode = {
      outletId: createNewOutlet.id,
      accountId: req.params.accountId,
      acctSlug: findAcctSlug.slug,
    };
    await generateQRCode(dataForQRCode);
    if (!createNewOutlet) {
      return res.status(404).json({ message: "Error creating a new outlet" });
    } else {
      // Decrypt for response
      createNewOutlet.name = decrypt(createNewOutlet.name);
      createNewOutlet.location = decrypt(createNewOutlet.location);
      createNewOutlet.phone = decrypt(createNewOutlet.phone);

      return res.status(201).json(createNewOutlet);
    }
  }),
];

//* QUEUE RELATED CONTROLLERS *//
exports.queue_activity_get = [
  param("accountId").notEmpty().withMessage("Params cannot be empty"),
  param("outletId").notEmpty().withMessage("Outlet params cannot be empty"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const { accountId, outletId } = req.params;
    console.log("Queue activity get: ", accountId, outletId);
    const outlet = await findOutletByIdAndAccountId({
      accountId: accountId,
      id: parseInt(outletId),
    });

    if (!outlet) {
      console.log("No outlet");
      return res.status(404).json({ message: "Error, outlet not found" });
    }

    const activeQueue = outlet.queues;
    let relevantQueue = null;

    if (activeQueue.length > 0) {
      relevantQueue = activeQueue[0];
    } else {
      const now = new Date();
      const fortyEightHoursInMilliseconds = 48 * 60 * 60 * 1000;
      const fortyEightHoursAgo = new Date(
        now.getTime() - fortyEightHoursInMilliseconds
      );

      //Queue is inactive but is a recent queue
      const potentialInactiveQueue = await findRecentlyInactiveQueue({
        accountId: accountId,
        id: outletId,
        fortyEightHoursAgo,
        now,
      });

      if (potentialInactiveQueue) {
        console.log("potential inactive queue");
        const activeQueueItemCount = await countActiveQueueItemsByQueueId(
          potentialInactiveQueue.id
        );

        if (activeQueueItemCount > 0) {
          relevantQueue = potentialInactiveQueue[0];
        }
      }
    }

    if (relevantQueue) {
      // Decrypt outlet fields
      outlet.name = decrypt(outlet.name);
      outlet.location = decrypt(outlet.location);
      outlet.phone = decrypt(outlet.phone);
      return res.status(200).json({ outlet: outlet, queue: relevantQueue });
    } else {
      // Decrypt outlet fields
      outlet.name = decrypt(outlet.name);
      outlet.location = decrypt(outlet.location);
      outlet.phone = decrypt(outlet.phone);
      return res.status(200).json({ outlet: outlet, queue: null });
    }
  }),
];

exports.inactive_queues_get = [
  param("accountId").notEmpty().withMessage("Params cannot be empty"),
  param("outletId").notEmpty().withMessage("Outlet params cannot be empty"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const { accountId, outletId } = req.params;
    const parsedOutletId = parseInt(outletId);

    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    // Call the service layer, which handles both data retrieval and transformation
    const result = await getInactiveQueueStatsPaginated({
      accountId,
      outletId: parsedOutletId,
      limit,
      skip,
    });

    console.log(
      "Got queue service to find inactive queue stats: ",
      result.inactiveQueueStats.length
    );

    return res.status(200).json(result); // The service returns the full object
  }),
];

exports.active_queue_get = [
  asyncHandler(async (req, res, next) => {
    const { queueId, outletId, accountId } = req.params;

    console.log("Active queue get: ", queueId, outletId, accountId);
    const queue = await findAllQueueItemsByQueueId(queueId);
    // Decrypt queueItems fields if it's an array
    const decryptQueueItems = queue.queueItems;
    if (decryptQueueItems && Array.isArray(decryptQueueItems)) {
      decryptQueueItems.forEach((item) => {
        item.name = decrypt(item.name);
        item.contactNumber = decrypt(item.contactNumber);
        if (item.customer) {
          item.customer.name = decrypt(item.customer.name);
          item.customer.number = decrypt(item.customer.number);
        }
        console.log("Decrypted item: ", item);
      });
    }
    queue.queueItems = decryptQueueItems;
    const outlet = await findOutletByIdAndAccountId({
      id: parseInt(outletId),
      accountId: accountId,
    });
    // Decrypt outlet fields
    outlet.name = decrypt(outlet.name);
    outlet.location = decrypt(outlet.location);
    outlet.phone = decrypt(outlet.phone);
    const dataToReturn = {
      queue: queue,
      showPax: outlet.showPax,
    };
    console.log("Data to return: ", dataToReturn);
    if (queue.queueItems.length !== 0) {
      return res.status(201).json(dataToReturn);
    } else {
      return res.status(404).json({ message: "No queue items yet" });
    }
  }),
];

exports.new_queue_post = [
  param("accountId").notEmpty().withMessage("Params cannot be empty"),
  param("outletId").notEmpty().withMessage("Outlet params cannot be empty"),
  body("name")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("Name of queue cannot be empty"),
  body("maxQueueItems").notEmpty().isInt(),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const data = {
      accountId: req.params.accountId,
      outletId: parseInt(req.params.outletId),
      ...req.body,
    };
    const startQueue = await createQueue(data);
    if (startQueue) {
      return res.status(201).json(startQueue);
    } else {
      return res.status(404).json({ message: "Error. Can't create queue" });
    }
  }),
];

exports.end_queue_post = [
  param("accountId")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("Params cannot be empty"),
  param("outletId")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("Outlet params cannot be empty"),
  param("queueId")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("Queue params cannot be empty"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const data = req.params;
    const endQueue = await endQueueByQueueId(data);
    const notice = {
      action: "queueEnded",
      queueId: data.queueId,
    };
    const io = req.app.get("io");
    if (endQueue) {
      console.log("End queue is happening: ", endQueue);
      await sendQueueUpdateForHost(io, `host_${data.queueId}`, notice);
      //set max queue items to 0 to indicate queue has ended
      await sendMaxQueueItemsUpdate(io, `kiosk_${data.queueId}`, 0);
      return res.status(201).json(endQueue);
    } else {
      return res
        .status(404)
        .json({ message: "Error trying to end queue. Queue is still active." });
    }
  }),
];

//* QUEUEITEM/CUSTOMER RELATED CONTROLLERS *//
exports.new_customer_post = [
  param("queueId").notEmpty().withMessage("Queue must have an id"),
  body("customerName", "Name must be a string").trim().isString().escape(),
  body("customerNumber", "Number must be valid").trim().isString().escape(),
  body("VIP", "VIP must be boolean").isBoolean(),
  body("pax", "Pax must be an integer").trim().isInt().escape(),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const { queueId } = req.params;
    console.log("Queue ID: ", queueId);
    const { customerName, customerNumber, VIP, pax, accountId } = req.body;
    const io = req.app.get("io");

    const dataToFindQueueItem = {
      queueId: queueId,
      contactNumber: encrypt(customerNumber), // Encrypt for query
    };

    //Check for existing queue item
    const existingQueueItem = await findQueueItemByContactNumberAndQueueId(
      dataToFindQueueItem
    );
    console.log("Existing queue item found: ", existingQueueItem);
    const existingQueueItemsLength = await findQueueItemsLengthByQueueId(
      queueId
    );
    const newPosition = existingQueueItemsLength + 1;

    const activeExistingQueueItem = existingQueueItem.find(
      (item) => item.active
    );

    if (activeExistingQueueItem) {
      if (customerName === activeExistingQueueItem.name) {
        const notice = {
          action: "join",
          queueItemId: activeExistingQueueItem.id,
        };
        await sendQueueUpdateForHost(io, `host_${queueId}`, notice);
        await sendOutletUpdate(io, `outlet_${queueId}`, notice);

        return res.status(200).json({
          message: `${customerName} has an existing active queue item at ${activeExistingQueueItem.position} position`,
          queueItem: activeExistingQueueItem,
        });
      }
    }

    //Check if queue is full!
    const queue = await findQueueByQueueId(queueId);
    console.log(queue.maxQueueItems, existingQueueItemsLength);
    if (queue.maxQueueItems === existingQueueItemsLength) {
      return res
        .status(406)
        .json({ message: "Maximum number of queuers has been reached." });
    }

    if (VIP === false) {
      const dataForNewQueueItem = {
        queueId: queueId,
        pax: parseInt(pax),
        name: encrypt(customerName),
        contactNumber: encrypt(customerNumber),
        position: newPosition,
      };
      const newQueueItem = await createAQueueItem(dataForNewQueueItem);
      if (!newQueueItem) {
        return res
          .status(400)
          .json({ message: "Error creating a new queue item" });
      }
      const queueItemSecretToken = generateQueueItemToken(newQueueItem.id);
      const queueItemToReturn = await updateSecretTokenByQueueItemId({
        queueItemId: newQueueItem.id,
        secretToken: queueItemSecretToken,
      });

      // Decrypt for response
      queueItemToReturn.name = decrypt(queueItemToReturn.name);
      queueItemToReturn.contactNumber = decrypt(
        queueItemToReturn.contactNumber
      );

      const notice = {
        action: "join",
        queueItemId: newQueueItem.id,
      };
      await sendQueueUpdateForHost(io, `host_${queueId}`, notice);
      await sendOutletUpdate(io, `outlet_${queueId}`, notice);
      await sendQueueUpdate(io, `queue_${queueId}`, notice);

      return res.status(201).json({
        message: `Success! You have created a queue item for ${customerName}.`,
        queueItem: queueItemToReturn,
        secretToken: queueItemSecretToken,
      });
    } else {
      let customerToLink = null;
      const existingCustomer = await findDuplicateCustomerByNumberAndAcctId({
        number: customerNumber,
        accountId: accountId,
      });

      //Looking for an existing VIP Customer
      if (existingCustomer.length === 0) {
        const dataForNewCustomer = {
          name: encrypt(customerName),
          number: encrypt(customerNumber),
          VIP: VIP,
          accountId: accountId,
        };
        customerToLink = await createACustomer(dataForNewCustomer);
        if (!customerToLink) {
          return res
            .status(400)
            .json({ message: "Error creating a new customer." });
        }
      } else if (existingCustomer.length === 1) {
        customerToLink = existingCustomer[0];
      } else {
        return res.status(500).json({
          message:
            "Database inconsistency. Multiple VIP customers with the same number found.",
        });
      }

      //Now if we have the customer, create the queue item
      const dataForNewQueueItem = {
        queueId: queueId,
        pax: parseInt(pax),
        name: encrypt(customerName),
        contactNumber: encrypt(customerNumber),
        position: newPosition,
        customerId: customerToLink.id,
      };
      const newQueueItem = await createAQueueItemVIP(dataForNewQueueItem);
      if (!newQueueItem) {
        return res
          .status(400)
          .json({ message: "Error creating a new queue item for VIP" });
      }
      const queueItemSecretToken = generateQueueItemToken(newQueueItem.id);
      const queueItemToReturn = await updateSecretTokenByQueueItemId({
        queueItemId: newQueueItem.id,
        secretToken: queueItemSecretToken,
      });

      // Decrypt for response
      queueItemToReturn.name = decrypt(queueItemToReturn.name);
      queueItemToReturn.contactNumber = decrypt(
        queueItemToReturn.contactNumber
      );
      customerToLink.name = decrypt(customerToLink.name);
      customerToLink.number = decrypt(customerToLink.number);

      const notice = {
        action: "join",
        queueItemId: newQueueItem.id,
      };
      await sendQueueUpdateForHost(io, `host_${queueId}`, notice);
      await sendOutletUpdate(io, `outlet_${queueId}`, notice);
      await sendQueueUpdate(io, `queue_${queueId}`);
      return res.status(201).json({
        message: `Success. ${customerName} has entered the queue.`,
        queueItem: queueItemToReturn,
        customer: customerToLink,
        secretToken: queueItemSecretToken,
      });
    }
  }),
];

exports.seat_queue_item_patch = [
  param("queueItemId")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("Queue item ID cannot be empty"),
  body("seated").isBoolean().withMessage("Seated must be a boolean"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const { queueItemId } = req.params;
    const { seated } = req.body;

    const queueItem = await findQueueItemByQueueItemId(queueItemId);

    const prevVersion = queueItem.version;
    if (!queueItem) {
      return res.status(404).json({ message: "Error, queue item not found" });
    }
    let dataToUpdate;

    if (seated) {
      if (queueItem.quit) {
        return res.status(400).json({
          message: "Cannot seat a customer that has already quit the queue.",
        });
      }
      if (queueItem.noShow) {
        return res.status(400).json({
          message:
            "Cannot seat a customer that has already been marked no show. Please undo no show before seating this customer.",
        });
      }
      if (queueItem.seatedAt === null) {
        dataToUpdate = {
          seated: true,
          active: false,
          inactiveAt: new Date(),
          seatedAt: new Date(),
        };
      } else {
        dataToUpdate = {
          seated: true,
          active: false,
          inactiveAt: new Date(),
        };
      }
    } else if (!seated) {
      dataToUpdate = {
        seated: false,
        active: true,
        inactiveAt: null,
      };
    }

    let updatedQueueItem;
    try {
      updatedQueueItem = await updateQueueItem({
        queueItemId,
        prevVersion,
        dataToUpdate,
      });
    } catch (error) {
      console.error("There was an error updating queue item! ", error);
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        console.warn(
          "Race condition. 2 hosts are triggering seated at same time."
        );
        return res.status(409).json({
          message:
            "This item has been updated by another host. Please refresh your page.",
        });
      }
      return res.status(500).json({
        message: `Database error: ${
          error.message || "Unexpected database error"
        }`,
      });
    }

    const io = req.app.get("io");
    const notice = {
      action: "seated",
      queueItemId: updatedQueueItem.id,
    };
    if (updatedQueueItem.queueId) {
      await sendQueueUpdate(io, `queue_${updatedQueueItem.queueId}`);
      await sendQueueUpdateForHost(
        io,
        `host_${updatedQueueItem.queueId}`,
        notice
      );
      await sendOutletUpdate(io, `outlet_${updatedQueueItem.queueId}`, notice);
      await notifyTopQueuePos(updatedQueueItem.queueId);
    }
    if (seated) {
      io.to(`queueitem_${queueItemId}`).emit("queueitem_update", {
        alert: true,
        queueItemId: queueItemId,
        position: queueItem.position,
        action: "seated",
        message: "You have been seated! Enjoy your meal!",
      });
    } else {
      io.to(`queueitem_${queueItemId}`).emit("queueitem_update", {
        alert: false,
        queueItemId: queueItemId,
        position: queueItem.position,
        action: "seated",
        message: "You have NOT been seated! Updating your waiting page.",
      });
    }

    updatedQueueItem.name = decrypt(updatedQueueItem.name);
    updatedQueueItem.contactNumber = decrypt(updatedQueueItem.contactNumber);

    console.log("Decrypted updated queue item: ", updatedQueueItem);

    res.status(201).json({
      message: "Queue item has been successfully updated",
      updatedQueueItem,
    });
  }),
];

exports.call_queue_item_patch = [
  param("queueItemId")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("Queue item ID cannot be empty"),
  body("called").isBoolean().withMessage("Seated must be a boolean"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const queueItemId = req.params.queueItemId;
    const calledStatus = req.body.called;

    let updatedQueueItem = null;

    try {
      const existingQueueItem = await findQueueItemByQueueItemId(queueItemId);
      if (!existingQueueItem) {
        return res
          .status(404)
          .json({ message: "Error updating queue item. Not Found." });
      }

      const prevVersion = existingQueueItem.version;

      const dataToUpdate = {
        called: calledStatus,
      };

      if (existingQueueItem.calledAt === null && calledStatus) {
        dataToUpdate.calledAt = new Date();
      }

      updatedQueueItem = await updateCallQueueItem({
        queueItemId,
        prevVersion,
        dataToUpdate,
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        console.warn(
          "Race condition. 2 hosts are triggering called at same time."
        );
        return res.status(409).json({
          message:
            "This item has been updated by another host. Please refresh your page.",
        });
      }
      return res.status(500).json({
        message: `Database error: ${
          error.message || "Unexpected database error"
        }`,
      });
    }

    if (!updatedQueueItem) {
      return res.status(500).json({ message: "Failed to update item." });
    }

    console.log("Updated queue item: ", updatedQueueItem);
    updatedQueueItem.name = decrypt(updatedQueueItem.name);
    updatedQueueItem.contactNumber = decrypt(updatedQueueItem.contactNumber);

    console.log("Decrypted updated queue item: ", updatedQueueItem);
    const io = req.app.get("io");

    if (calledStatus) {
      // Send socket updates
      const notice = { action: "called", queueItemId: updatedQueueItem.id };
      await sendQueueUpdateForHost(
        io,
        `host_${updatedQueueItem.queueId}`,
        notice
      );
      io.to(`queueitem_${queueItemId}`).emit("queueitem_update", {
        alert: true,
        action: "called",
        message: "It's your turn!",
        calledAt: updatedQueueItem.calledAt,
      });

      console.log("Updated queue item fcm token: ", updatedQueueItem.fcmToken);

      if (updatedQueueItem.fcmToken) {
        const queue = await findQueueByQueueId(updatedQueueItem.queueId);
        const outlet = await findOutletByIdAndAccountId({
          id: queue.outletId,
          accountId: queue.accountId,
        });
        const account = await findAccountByAccountId(queue.accountId);

        const title = `It's Your Turn, ${decrypt(updatedQueueItem.name)}!`;
        const body = `Please approach our staff at ${outlet.name}.`;
        const data = {
          url: `/${account.slug}/queue/${updatedQueueItem.queueId}/${queueItemId}`,
        };

        try {
          await sendPushNotification(
            updatedQueueItem.fcmToken,
            title,
            body,
            data
          );

          console.log(
            `Sending push notification to token: ${updatedQueueItem.fcmToken}`
          );
        } catch (error) {
          console.error("!!! FAILED TO SEND PUSH NOTIFICATION !!!");
          console.error("FCM Token Used:", updatedQueueItem.fcmToken);
          console.error("Error Code:", error.code);
          console.error("Error Message:", error.message);
        }
      }
    } else {
      const notice = { action: "called", queueItemId: updatedQueueItem.id };
      await sendQueueUpdateForHost(
        io,
        `host_${updatedQueueItem.queueId}`,
        notice
      );
      io.to(`queueitem_${queueItemId}`).emit("queueitem_update", {
        alert: false,
        action: "called",
        message: "Sorry, it's NOT your turn!",
        calledAt: null,
      });
    }

    res.status(201).json(updatedQueueItem);

    //Notes:
    //We pull the socket into the controller here because we want to ensure that there is only ONE source of truth and prevent race conditions. If we put the emit separate from here (meaning use the socket), we will likely run in to bugs.
  }),
];

exports.no_show_queue_item_patch = [
  param("queueItemId")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("Queue item ID cannot be empty"),
  body("noShow").isBoolean().withMessage("No show must be a boolean"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const { queueItemId } = req.params;
    const { noShow } = req.body;

    const existingQueueItem = await findQueueItemByQueueItemId(queueItemId);

    const prevVersion = existingQueueItem.version;

    if (!existingQueueItem) {
      return res.status(404).json({ message: "Queue Item is not found" });
    }

    let dataToUpdate;

    if (noShow) {
      if (existingQueueItem.quit) {
        return res.status(400).json({
          message: "Cannot seat a customer that has already quit the queue.",
        });
      }
      if (existingQueueItem.seated) {
        return res.status(400).json({
          message: "Cannot seat a customer that has already been seated",
        });
      }

      if (existingQueueItem.noShowAt === null) {
        dataToUpdate = {
          noShow: true,
          active: false,
          inactiveAt: new Date(),
          noShowAt: new Date(),
        };
      } else {
        dataToUpdate = {
          noShow: true,
          active: false,
          inactiveAt: new Date(),
        };
      }
    } else {
      dataToUpdate = {
        noShow: false,
        active: true,
        inactiveAt: null,
      };
    }

    let updatedQueueItem;

    try {
      updatedQueueItem = await updateQueueItem({
        queueItemId,
        prevVersion,
        dataToUpdate,
      });
    } catch (error) {
      console.error("There was an error updating queue item! ", error);
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        console.warn(
          "Race condition. 2 hosts are triggering no show at same time."
        );
        return res.status(409).json({
          message:
            "This item has been updated by another host. Please refresh your page.",
        });
      }
      return res.status(500).json({
        message: `Database error: ${
          error.message || "Unexpected database error"
        }`,
      });
    }

    const notice = {
      action: "noShow",
      queueItemId: queueItemId,
    };
    const io = req.app.get("io");
    if (updatedQueueItem.queueId) {
      await sendQueueUpdate(io, `queue_${updatedQueueItem.queueId}`);
      await sendQueueUpdateForHost(
        io,
        `host_${updatedQueueItem.queueId}`,
        notice
      );
      await sendOutletUpdate(io, `outlet_${updatedQueueItem.queueId}`, notice);
      await notifyTopQueuePos(updatedQueueItem.queueId);
    }
    if (noShow) {
      io.to(`queueitem_${queueItemId}`).emit("queueitem_update", {
        alert: true,
        queueItemId: queueItemId,
        position: null,
        action: "noShow",
        message:
          "You have been marked as no show. If you are still at the store, please go to the host immediately to rectify the situation.",
      });
    } else {
      io.to(`queueitem_${queueItemId}`).emit("queueitem_update", {
        alert: false,
        queueItemId: queueItemId,
        position: null,
        action: "noShow",
        message:
          "We have reverted your no show status. Please wait for your turn.",
      });
    }

    console.log("Updated queue item no show status: ", updatedQueueItem);
    updatedQueueItem.name = decrypt(updatedQueueItem.name);
    updatedQueueItem.contactNumber = decrypt(updatedQueueItem.contactNumber);
    console.log("Decrypted updated queue item: ", updatedQueueItem);
    res.status(201).json({
      message: "Queue item has been successfully updated",
      updatedQueueItem,
    });
  }),
];

exports.max_queue_items_patch = [
  param("queueId")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("Queue item ID cannot be empty"),
  body("maxQueueItems").isInt().withMessage("Maximum queuers must be a number"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const { queueId } = req.params;
    const { maxQueueItems } = req.body;

    console.log("We are in max queue items patch: ", queueId, maxQueueItems);

    const existingQueue = await findQueueByQueueId(queueId);
    console.log("This is the existing queue: ", existingQueue);

    if (!existingQueue) {
      return res.status(404).json({
        message: `Error. No existing queue with this queue id ${queueId}`,
      });
    }
    const updateQueue = await updateMaxQueuers({
      queueId: queueId,
      maxQueueItems: maxQueueItems,
    });

    if (!updateQueue) {
      return res.status(404).json({
        message: `Error. Could not update queue ${queueId} max queuers`,
      });
    }

    const notice = {
      action: "updateMaxQueueItems",
      queueId: queueId,
      maxQueueItems: maxQueueItems,
    };
    const io = req.app.get("io");
    console.log("update queue: ", updateQueue);

    await sendQueueUpdateForHost(io, `host_${queueId}`, notice);
    await sendMaxQueueItemsUpdate(io, `kiosk_${queueId}`, maxQueueItems);

    return res.status(201).json(updateQueue);
  }),
];

//* STAFF RELATED CONTROLLERS *//
exports.staff_list_get = [
  param("accountId").notEmpty().withMessage("Params cannot be empty"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const accountId = req.params.accountId;
    const staffList = await findAllStaffByAcctId(accountId);
    // Decrypt for response
    staffList.forEach((staff) => {
      staff.name = decrypt(staff.name);
      staff.email = decrypt(staff.email);
    });
    if (staffList.length !== 0) {
      return res.status(200).json(staffList);
    } else {
      return res.status(404).json({ message: "Error getting staff list" });
    }
  }),
];

exports.new_staff_post = [
  param("accountId").notEmpty().withMessage("Params cannot be empty"),
  body("name").notEmpty().trim().escape().withMessage("Name cannot be empty"),
  body("role").trim().escape(),
  body("email").isEmail().trim().escape(),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const accountId = req.params.accountId;
    const body = { ...req.body };
    //need to generate password
    const pw = await generatePw(body.password);
    const data = {
      accountId: accountId,
      name: encrypt(body.name),
      email: encrypt(body.email),
      role: body.role,
      password: pw,
    };
    const staff = await createStaff(data);
    const staffResponse = { ...staff };
    delete staff.password;
    // Decrypt for response
    staffResponse.name = decrypt(staffResponse.name);
    staffResponse.email = decrypt(staffResponse.email);

    if (staffResponse.length !== 0) {
      return res.status(200).json(staffResponse);
    } else {
      return res.status(404).json({ message: "Error getting staff list" });
    }
  }),
];

exports.staff_delete = [
  param("accountId").notEmpty().withMessage("Params cannot be empty"),
  param("staffId").notEmpty().withMessage("Params cannot be empty"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const accountId = req.params.accountId;
    const staffId = req.params.staffId;
    const data = {
      accountId: accountId,
      staffId: parseInt(staffId),
    };
    const del = await deleteStaff(data);
    if (del) {
      return res.status(200).json(del);
    } else {
      return res.status(404).json({ message: "Error deleting staff" });
    }
  }),
];

exports.staff_get = [
  param("accountId").notEmpty().withMessage("Params cannot be empty"),
  param("staffId").notEmpty().withMessage("Params cannot be empty"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const params = req.params;
    const data = {
      accountId: params.accountId,
      staffId: parseInt(params.staffId),
    };
    const staffInfo = await getStaffByIdAndAccountId(data);
    const staffResponse = { ...staffInfo };
    delete staffInfo.password;
    // Decrypt for response
    staffResponse.name = decrypt(staffResponse.name);
    staffResponse.email = decrypt(staffResponse.email);

    if (staffResponse) {
      return res.status(200).json(staffResponse);
    } else {
      return res.status(404).json({ message: "Error, could not find staff." });
    }
  }),
];

exports.staff_patch = [
  param("accountId").notEmpty().withMessage("Params cannot be empty"),
  param("staffId").notEmpty().withMessage("Params cannot be empty"),
  body("name")
    .optional({ checkFalsy: true })
    .isString()
    .trim()
    .escape()
    .withMessage("Name cannot be empty"),
  body("role").optional({ checkFalsy: true }).isString().trim().escape(),
  body("email").optional({ checkFalsy: true }).isEmail().trim().escape(),
  body("password")
    .optional({ checkFalsy: true })
    .isLength({ min: 6 })
    .trim()
    .escape(),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const params = req.params;
    const bodyData = req.body;
    //1. FIND EXISTING STAFF
    const dataToFindStaff = {
      accountId: params.accountId,
      staffId: parseInt(params.staffId),
    };
    const staff = await getStaffByIdAndAccountId(dataToFindStaff);
    if (staff) {
      //2. Build the update object conditionally
      const updateFields = {};
      if (bodyData.name !== undefined) {
        updateFields.name = encrypt(bodyData.name);
      }
      if (bodyData.role !== undefined) {
        updateFields.role = bodyData.role;
      }
      if (bodyData.email !== undefined) {
        updateFields.email = encrypt(bodyData.email);
      }
      if (bodyData.password !== undefined && bodyData.password !== "") {
        const hashedPW = await generatePw(bodyData.password);
        updateFields.password = hashedPW;
      }

      //3. Perform update
      const dataToUpdateStaff = {
        accountId: params.accountId,
        staffId: parseInt(params.staffId),
        updateFields,
      };
      const updateStaff = await updateStaffByIdAndAcctId(dataToUpdateStaff);
      const staffResponse = { ...updateStaff };
      delete updateStaff.password;
      // Decrypt for response
      staffResponse.name = decrypt(staffResponse.name);
      staffResponse.email = decrypt(staffResponse.email);

      if (updateStaff) {
        return res.status(201).json(staffResponse);
      } else {
        return res.status(404).json({ message: "Error updating staff" });
      }
    } else {
      return res.status(404).json({ message: "Staff not found" });
    }
  }),
];

//*DOUBLE VERIFICATION CONTROLLER *//
exports.check_role_post = [
  param("accountId").notEmpty().withMessage("Param cannot be empty"),
  body("name").notEmpty().withMessage("Name cannot be empty"),
  body("password").notEmpty().withMessage("Password cannot be empty"),
  body("actionPurpose")
    .notEmpty()
    .escape()
    .trim()
    .withMessage("Action purpose cannot be empty"),
  body("minimumRole")
    .notEmpty()
    .escape()
    .trim()
    .withMessage("Minimum role for this action"),
  body("outletId").escape().trim(),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const { name, password, actionPurpose, minimumRole, outletId } = req.body;
    const { accountId } = req.params;
    const dataToFindStaff = {
      name: encrypt(name),
      accountId: accountId,
    };

    const ROLE_HIERARCHY = {
      TIER_1: 4,
      TIER_2: 3,
      TIER_3: 1,
      TIER_4: 0,
    };

    const staff = await getStaffByNameAndAccount(dataToFindStaff);

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    const pwValid = await validatePw(staff.password, password);
    console.log("Is the password for staff valid? ", pwValid);
    if (!pwValid) {
      return res.status(403).json({
        message: "Forbidden: Verification Failed. Password is incorrect.",
      });
    }

    const staffRoleValue = ROLE_HIERARCHY[staff.role];
    const minimumRoleValue = ROLE_HIERARCHY[minimumRole];

    if (staffRoleValue >= minimumRoleValue) {
      const dataForAuditLog = {
        staffId: staff.id,
        actionType: actionPurpose,
        accountId: accountId,
      };
      if (outletId) {
        dataForAuditLog.outletId = parseInt(outletId);
      }

      await createAuditLog(dataForAuditLog);

      const dataForFront = {
        staffId: staff.id,
        staffRole: staff.role,
        staffName: staff.name,
      };

      // Decrypt for response
      dataForFront.staffName = decrypt(dataForFront.staffName);

      return res.status(200).json(dataForFront);
    } else {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient role for this action." });
    }
  }),
];

//*SETTINGS*//
exports.account_details_get = [
  param("accountId").notEmpty().withMessage("Params cannot be empty"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    try {
      const { accountId } = req.params;
      const account = await findAccountByAccountId(accountId);
      if (account) {
        delete account.password;
        // Decrypt for response
        account.companyName = decrypt(account.companyName);
        account.companyEmail = decrypt(account.companyEmail);

        return res.status(200).json(account);
      }
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: "Could not find account" });
    }
  }),
];

const businessType = {
  BASIC: "BASIC",
  CLINIC: "CLINIC",
  RESTAURANT: "RESTAURANT",
};
exports.account_details_patch = [
  upload.single("outletImage"),
  param("accountId").notEmpty().withMessage("Params cannot be empty"),
  body("companyName")
    .optional() // This makes the field optional
    .isLength({ min: 6 })
    .withMessage("Name must be at least 6 characters long.")
    .trim()
    .escape(),
  body("businessType")
    .optional() // This makes the field optional
    .isIn(Object.values(businessType))
    .withMessage("Invalid Business Type"),
  body("slug")
    .optional()
    .isLength({ min: 5 })
    .withMessage("Name must be at least 5 characters long.")
    .trim()
    .escape(),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const { accountId } = req.params;
    const logo = req.file ? req.file.path : null;
    const newSlug = req.body.slug ? req.body.slug : null;
    const dataToUpdate = {
      accountId: accountId,
      ...req.body,
    };
    if (newSlug) {
      const existingAccountWithSlug = await findExistingSlug(newSlug);
      if (existingAccountWithSlug) {
        return res
          .status(404)
          .json({ message: "Error slug is already in use" });
      } else {
        dataToUpdate.slug = newSlug;
      }
    }

    if (logo) {
      dataToUpdate.logo = logo;
    }
    const updatedAccount = await updateAccount(dataToUpdate);
    if (!updatedAccount) {
      return res
        .status(404)
        .json({ message: "Error. Was not able to update the account data." });
    } else {
      updatedAccount.companyName = decrypt(updatedAccount.companyName);
      updatedAccount.companyEmail = decrypt(updatedAccount.companyEmail);

      return res.status(201).json(updatedAccount);
    }
  }),
];

//*QR CODE*//
exports.qrcode_outlet_get = [
  param("accountId").notEmpty().withMessage("Params cannot be empty"),
  param("outletId").notEmpty().withMessage("Outlet params cannot be empty"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    try {
      const outlet = await findOutletByIdAndAccountId({
        accountId: req.params.accountId,
        id: parseInt(req.params.outletId),
      });
      outlet.name = decrypt(outlet.name);
      outlet.location = decrypt(outlet.location);
      outlet.phone = decrypt(outlet.phone);
      outlet.account.companyName = decrypt(outlet.account.companyName);
      return res.status(200).json(outlet);
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: "Could not find outlet" });
    }
  }),
];
exports.qrcode_outlet_post = [
  param("accountId").notEmpty().withMessage("Params cannot be empty"),
  param("outletId").notEmpty().withMessage("Outlet params cannot be empty"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const { accountId, outletId } = req.params;
    const accountSlug = await findAccountByAccountId(accountId);
    delete accountSlug.password;
    delete accountSlug.companyEmail;
    const genQR = generateQRCode({
      outletId,
      accountId,
      acctSlug: accountSlug.slug,
    });
  }),
];
exports.audit_logs_outlet_get = [
  param("accountId").notEmpty().withMessage("Params cannot be empty"),
  param("outletId").notEmpty().withMessage("Outlet params cannot be empty"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const { accountId, outletId } = req.params;
    const data = {
      accountId: accountId,
      outletId: parseInt(outletId),
    };
    try {
      const auditLogs = await findAuditLogsByOutletId(data);
      auditLogs.forEach((log) => {
        if (log.staff) {
          log.staff.name = decrypt(log.staff.name);
        }
      });
      return res.status(200).json(auditLogs);
    } catch (error) {
      console.error("Error, no audit logs found: ", error);
      return res.status(404).json({
        message: "Could not find audit logs for this outlet and account id",
      });
    }
  }),
];

//*CUSTOMER INFO*//
exports.customer_info_get = [
  param("accountId").notEmpty().withMessage("Params cannot be empty"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .toInt()
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .toInt()
    .withMessage("Limit must be between 1 and 100"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const { accountId } = req.params;
    console.log("Fetching customer info for account id: ", accountId);
    const page = parseInt(req.query.page) || 1;
    console.log("Req query limit: ", req.query.limit);
    const limit = parseInt(req.query.limit) || 10;

    try {
      const result = await findAllCustomersByAccountId(accountId, page, limit);
      // Decrypt for response
      result.customers.forEach((customer) => {
        customer.name = decrypt(customer.name);
        customer.number = decrypt(customer.number);
      });
      console.log("Total pages: ", Math.ceil(result.pagination.totalPages));
      return res.status(200).json({
        customers: result.customers,
        currentPage: page,
        totalPages: Math.ceil(result.pagination.totalPages),
        totalCustomers: result.pagination.totalCustomers,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(404)
        .json({ message: "Could not find customers for this account" });
    }
  }),
];
