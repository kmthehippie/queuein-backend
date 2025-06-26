const asyncHandler = require("express-async-handler");
const { header, body, param, check } = require("express-validator");
const handleValidationResult = require("../middleware/validationResult");
const { sendQueueUpdateForHost } = require("../helper/socketHelper");
const {
  findOutletsByAcctId,
  createOutlet,
  updateOutletByOutletAndAcctId,
  findActiveQueuesByOutletAndAccountId,
  findAllQueueItemsByQueueId,
  findOutletByIdAndAccountId,
  createQueue,
  findDuplicateCustomerByNumberAndAcctId,
  findQueueItemsLengthByQueueId,
  createAQueueItem,
  createACustomer,
  findOutletByQueueId,
  findDupeActiveCustomerInQueueItem,
  updateSeatQueueItem,
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
  findActiveQueueItemsInInactiveQueues,
  findQueueItemByQueueItemId,
  findRelevantQueueForOutlet,
  updateCallQueueItemNull,
  findQueueItemByContactNumberAndQueueId,
  createAQueueItemVIP,
  findQueueItemsByQueueId,
  updateSeatQueueItemNull,
} = require("../db/authQueries");
const e = require("express");
const { generatePw, validatePw } = require("../config/passwordUtils");
const {
  PrismaClientKnownRequestError,
} = require("@prisma/client/runtime/library");

//* OUTLET RELATED CONTROLLERS *//

exports.sidenav_outlet_get = [
  param("accountId").notEmpty().withMessage("Params cannot be empty"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    console.log(req.params);
    const accountId = req.params.accountId;
    const outlets = await findOutletsByAcctId(accountId);
    const arrToReturn = outlets.map((outlet) => ({
      name: outlet.name,
      id: outlet.id,
    }));
    console.log(arrToReturn);
    if (!outlets) {
      return res
        .status(404)
        .json({ message: "No outlets associated with this account id" });
    } else {
      return res.status(200).json(arrToReturn);
    }
  }),
];

exports.all_outlets_get = [
  param("accountId").notEmpty().withMessage("Params cannot be empty"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const accountId = req.params.accountId;
    const outlets = await findOutletsByAcctId(accountId);
    console.log("Here are all outlets data", outlets);
    if (!outlets) {
      return res
        .status(404)
        .json({ message: "No outlets associated with this account id" });
    } else {
      return res.status(200).json(outlets);
    }
  }),
];

exports.update_outlet_patch = [
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
  body("imgUrl")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Image URL must be a valid URL.")
    .notEmpty()
    .withMessage("Image URL cannot be empty if provided.")
    .trim(),
  body("defaultEstWaitTime")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Estimated wait time must be a non-negative integer.")
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
    console.log("These are the params: ", params);
    console.log("This is the body: ", req.body);

    const dataToUpdate = {
      outletId: parseInt(params.outletId),
      accountId: params.accountId,
      ...req.body,
    };
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
    console.log("Inside controller's delete outlet");
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
  body("imgUrl")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("Image URL must be a valid URL."),
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
    console.log("We are in the new outlet post", req.params);
    console.log(req.body);
    const data = {
      accountId: req.params.accountId,
      ...req.body,
    };
    const createNewOutlet = await createOutlet(data);
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
    console.log("Inside active queue get");
    console.log(req.params);
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
    const queue = await findRelevantQueueForOutlet(data);

    if (queue !== null) {
      return res.status(200).json({ queue, outlet });
    } else {
      return res
        .status(404)
        .json({ message: "No active queues. No active queue items." });
    }
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
    console.log("We are trying to create new queue ", data);
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
    console.log("Inside end queue post");

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

    const getUpdatedQueueItems = async (currQueueId) => {
      const updatedQueueData = await findQueueItemsByQueueId(currQueueId);
      return updatedQueueData;
    };

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
        const updatedQueueItems = await getUpdatedQueueItems(queueId);
        console.log("Updated queue items: ", updatedQueueItems);
        if (io) {
          io.to(`queue_${queueId}`).emit(
            "host_queue_update",
            updatedQueueItems
          );
        }
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
    const dataToUpdate = {
      queueItemId: queueItemId,
      seated: seated,
      active: false,
    };

    const existingQueueItem = await findQueueItemByQueueItemId(queueItemId);
    let updatedSeated = null;
    try {
      if (existingQueueItem.inactiveAt === null && seated) {
        updatedSeated = await updateSeatQueueItemNull(dataToUpdate);
      } else {
        updatedSeated = await updateSeatQueueItem(dataToUpdate);
      }
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        console.warn(
          "Race condition. 2 hosts are triggering seated at the same time"
        );
        try {
          const checkExistingQueueItem = await findQueueItemByQueueItemId(
            queueItemId
          );
          if (!checkExistingQueueItem) {
            return res.status(404).json({
              message:
                "Existing queue item not found and race condition happened.",
            });
          }
          if (checkExistingQueueItem.inactiveAt === null) {
            updateCalled = await updateCallQueueItemNull(dataToUpdate);
          } else {
            updateCalled = await updateCallQueueItem(dataToUpdate);
          }
        } catch (fallbackErr) {
          console.warn("Something went wrong");
          return res
            .status(500)
            .json({ message: "Failure to update customer's seated status" });
        }
      } else {
        return res
          .status(500)
          .json({ message: "Failure to update customer's seated status" });
      }
    }

    if (!existingQueueItem) {
      return res
        .status(404)
        .json({ message: "Error updating queue item. Not found." });
    }
    const queueId = updatedSeated.queueId;
    const position = updatedSeated.position;

    if (updatedSeated !== null) {
      const io = req.app.get("io");
      if (queueId) {
        await sendQueueUpdateForHost(io, `queue_${queueId}`);
      }
      io.to(`queueitem_${queueItemId}`).emit("host_called_cust", {
        alert: true,
        queueItemId: queueItemId,
        position: position,
        message: "You have been seated! Please enjoy your meal!",
      });
      res
        .status(201)
        .json(
          { message: "Successfully updated seat of customer" },
          updatedSeated
        );
    } else {
      res.status(404).json({ message: "Error updating seating of customer" });
    }
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
    const dataToUpdate = {
      queueItemId: queueItemId,
      called: calledStatus,
    };

    const existingQueueItem = await findQueueItemByQueueItemId(queueItemId);
    let updateCalled = null;
    try {
      if (existingQueueItem.calledAt === null && calledStatus) {
        updateCalled = await updateCallQueueItemNull(dataToUpdate);
      } else {
        updateCalled = await updateCallQueueItem(dataToUpdate);
      }
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        console.warn(
          "Race condition. 2 hosts are triggering called at same time."
        );
        try {
          const checkExistingQueueItem = await findQueueItemByQueueItemId(
            queueItemId
          );
          if (!checkExistingQueueItem) {
            return res.status(404).json({
              message:
                "Existing queue item not found and race condition happened.",
            });
          }
          if (checkExistingQueueItem.calledAt === null) {
            updateCalled = await updateCallQueueItemNull(dataToUpdate);
          } else {
            updateCalled = await updateCallQueueItem(dataToUpdate);
          }
        } catch (fallbackErr) {
          console.warn("Something went wrong");
          return res
            .status(500)
            .json({ message: "Failure to update customer's call status" });
        }
      } else {
        return res
          .status(500)
          .json({ message: "Failure to update customer's call status" });
      }
    }

    const queueId = updateCalled.queueId;
    const position = updateCalled.position;

    if (!existingQueueItem) {
      return res
        .status(404)
        .json({ message: "Error updating queue item. Not Found." });
    }

    if (calledStatus) {
      const io = req.app.get("io");
      if (queueId) {
        await sendQueueUpdateForHost(io, `queue_${queueId}`);
      }
      io.to(`queueitem_${queueItemId}`).emit("host_called_cust", {
        alert: true,
        queueItemId: queueItemId,
        position: position,
        message: "It's your turn!",
      });
    }
    res.status(201).json(updateCalled);

    //Notes:
    //We pull the socket into the controller here because we want to ensure that there is only ONE source of truth and prevent race conditions. If we put the emit separate from here (meaning use the socket), we will likely run in to bugs.
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
    console.log("We got into the new staff post", req.body);
    const accountId = req.params.accountId;
    const body = { ...req.body };
    console.log("Body: ", body);
    //need to generate password
    const pw = await generatePw(body.password);
    console.log("New password ", pw);
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
      console.log("Found the staff info: ", staffResponse);
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
    console.log("Trying to update staff info");
    const params = req.params;
    const bodyData = req.body;
    console.log(params, bodyData);
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
        console.log("password post hash", hashedPW);
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
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const data = { ...req.body };

    const dataToFindStaff = {
      name: req.body.name,
      accountId: req.params.accountId,
    };

    const ROLE_HIERARCHY = {
      OWNER: 4,
      MANAGER: 3,
      ASSISTANT_MANAGER: 2,
      HOST: 1,
      SERVER: 0,
      CASHIER: 0,
      BARISTA: 0,
    };

    const staff = await getStaffByNameAndAccount(dataToFindStaff);
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    const pwValid = await validatePw(staff.password, data.password);
    if (!pwValid) {
      return res
        .status(403)
        .json({ message: "Forbidden: Verification Failed." });
    }

    const staffRoleValue = ROLE_HIERARCHY[staff.role];
    const minimumRoleValue = ROLE_HIERARCHY[data.minimumRole];

    if (staffRoleValue >= minimumRoleValue) {
      const dataForAuditLog = {
        staffId: staff.id,
        actionType: req.body.actionPurpose,
      };

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
