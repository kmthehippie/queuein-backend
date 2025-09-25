const asyncHandler = require("express-async-handler");
const { header, body, param, check } = require("express-validator");
const handleValidationResult = require("../middleware/validationResult");
const {
  sendQueueUpdateForHost,
  sendQueueUpdate,
} = require("../helper/socketHelper");
const {
  findOutletsByAcctId,
  createOutlet,
  updateOutletByOutletAndAcctId,
  findExistingSlug,
  findActiveQueuesByOutletAndAccountId,
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
} = require("../db/authQueries");
const { getInactiveQueueStatsPaginated } = require("../services/queueServices");
const jwt = require("../config/jwt");
const { generatePw, validatePw } = require("../config/passwordUtils");
const {
  PrismaClientKnownRequestError,
} = require("@prisma/client/runtime/library");
const upload = require("../config/multerConfig");
const { generateQRCode } = require("../helper/generateQRCode");

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
        name: outlet.name,
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
    const accountId = req.params.accountId;
    const data = {
      accountId: accountId,
    };
    const returned = await findOutletsByAcctId(data);
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
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const imgUrl = req.file ? req.file.path : null;
    const data = {
      accountId: req.params.accountId,
      ...req.body,
      qrCode: null,
      imgUrl: imgUrl,
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
    const genQR = await generateQRCode(dataForQRCode);
    if (!createNewOutlet) {
      return res.status(404).json({ message: "Error creating a new outlet" });
    } else {
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
    const data = {
      accountId: req.params.accountId,
      outletId: parseInt(req.params.outletId),
    };
    const outlet = await findOutletByIdAndAccountId({
      accountId: req.params.accountId,
      id: parseInt(req.params.outletId),
    });

    if (!outlet) {
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
        ...data,
        fortyEightHoursAgo,
        now,
      });

      if (potentialInactiveQueue) {
        const activeQueueItemCount = await countActiveQueueItemsByQueueId(
          potentialInactiveQueue.id
        );

        if (activeQueueItemCount > 0) {
          relevantQueue = potentialInactiveQueue[0];
        }
      }
    }

    if (relevantQueue) {
      return res.status(200).json({ outlet: outlet, queue: relevantQueue });
    } else {
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

    return res.status(200).json(result); // The service returns the full object
  }),
];

exports.active_queue_get = [
  asyncHandler(async (req, res, next) => {
    const queueItems = await findAllQueueItemsByQueueId(req.params.queueId);
    if (queueItems.length !== 0) {
      return res.status(201).json(queueItems);
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
    if (endQueue) {
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
    const { customerName, customerNumber, VIP, pax, accountId } = req.body;

    const io = req.app.get("io");

    const dataToFindQueueItem = {
      queueId: queueId,
      contactNumber: customerNumber,
    };
    const existingQueueItem = await findQueueItemByContactNumberAndQueueId(
      dataToFindQueueItem
    );
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
        return res.status(200).json({
          message: `${customerName} has an existing active queue item at ${activeExistingQueueItem.position} position`,
          queueItem: activeExistingQueueItem,
        });
      }
    }

    if (VIP === false) {
      const dataForNewQueueItem = {
        queueId: queueId,
        pax: parseInt(pax),
        name: customerName,
        contactNumber: customerNumber,
        position: newPosition,
      };
      const newQueueItem = await createAQueueItem(dataForNewQueueItem);
      if (!newQueueItem) {
        return res
          .status(400)
          .json({ message: "Error creating a new queue item" });
      }
      const notice = {
        action: "join",
        queueItemId: newQueueItem.id,
      };
      await sendQueueUpdateForHost(io, `host_${queueId}`, notice);
      return res.status(201).json({
        message: `Success! You have created a queue item for ${customerName}.`,
        queueItem: newQueueItem,
      });
    } else {
      let customerToLink = null;
      const existingCustomer = await findDuplicateCustomerByNumberAndAcctId({
        number: customerNumber,
        accountId: accountId,
      });

      if (existingCustomer.length === 0) {
        const dataForNewCustomer = {
          name: customerName,
          number: customerNumber,
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

      const dataForNewQueueItem = {
        queueId: queueId,
        pax: parseInt(pax),
        name: customerName,
        contactNumber: customerNumber,
        position: newPosition,
        customerId: customerToLink.id,
      };
      const newQueueItem = await createAQueueItemVIP(dataForNewQueueItem);
      if (!newQueueItem) {
        return res
          .status(400)
          .json({ message: "Error creating a new queue item for VIP" });
      }
      const notice = {
        action: "join",
        queueItemId: newQueueItem.id,
      };
      await sendQueueUpdateForHost(io, `host_${queueId}`, notice);
      return res.status(201).json({
        message: `Success. ${customerName} has entered the queue.`,
        queueItem: newQueueItem,
        customer: customerToLink,
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

    //! MY FIRST WORKING SOCKET FROM HOST -> CUST AND HOST
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

    let updateCalled = null;

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

      updateCalled = await updateCallQueueItem({
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

    if (!updateCalled) {
      return res.status(500).json({ message: "Failed to update item." });
    }

    const queueId = updateCalled.queueId;
    const position = updateCalled.position;

    const io = req.app.get("io");

    if (calledStatus) {
      if (queueId) {
        const notice = {
          action: "called",
          queueItemId: updateCalled.id,
        };
        await sendQueueUpdateForHost(io, `host_${queueId}`, notice);
      }
      io.to(`queueitem_${queueItemId}`).emit("queueitem_update", {
        alert: true,
        queueItemId: queueItemId,
        position: position,
        action: "called",
        message: "It's your turn!",
        calledAt: updateCalled.calledAt,
      });
    } else {
      if (queueId) {
        const notice = {
          action: "called",
          queueItemId: updateCalled.id,
        };
        await sendQueueUpdateForHost(io, `host_${queueId}`, notice);
      }
      io.to(`queueitem_${queueItemId}`).emit("queueitem_update", {
        alert: false,
        queueItemId: queueItemId,
        position: position,
        action: "called",
        message: "Sorry, it's NOT your turn!",
        calledAt: updateCalled.calledAt || null,
      });
    }
    res.status(201).json(updateCalled);

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

    res.status(201).json({
      message: "Queue item has been successfully updated",
      updatedQueueItem,
    });
  }),
];

//* STAFF RELATED CONTROLLERS *//
exports.staff_list_get = [
  param("accountId").notEmpty().withMessage("Params cannot be empty"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const accountId = req.params.accountId;
    const staffList = await findAllStaffByAcctId(accountId);
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
      name: body.name,
      email: body.email,
      role: body.role,
      password: pw,
    };
    const staff = await createStaff(data);
    const staffResponse = { ...staff };
    delete staff.password;

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
        updateFields.name = bodyData.name;
      }
      if (bodyData.role !== undefined) {
        updateFields.role = bodyData.role;
      }
      if (bodyData.email !== undefined) {
        updateFields.email = bodyData.email;
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
      name: name,
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
      delete updateAccount.password;
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
      return res.status(200).json(auditLogs);
    } catch (error) {
      console.error("Error, no audit logs found: ", error);
      return res.status(404).json({
        message: "Could not find audit logs for this outlet and account id",
      });
    }
  }),
];

//TODO: CUSTOMERS LIST WITHIN ACCOUNT PAGE
