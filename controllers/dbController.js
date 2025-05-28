const asyncHandler = require("express-async-handler");
const { header, body, param } = require("express-validator");
const handleValidationResult = require("../middleware/validationResult");
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
} = require("../db/authQueries");
const e = require("express");
const { generatePw, validatePw } = require("../config/passwordUtils");

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
    .withMessage("Location cannot be empty if provided.")
    .trim()
    .escape(),
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
    .escape()
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
    const activeQueue = await findActiveQueuesByOutletAndAccountId(data);
    const outlet = await findOutletByIdAndAccountId({
      accountId: req.params.accountId,
      id: parseInt(req.params.outletId),
    });

    if (activeQueue.length !== 0) {
      return res.status(201).json({ queue: activeQueue[0], outlet });
    } else {
      return res
        .status(404)
        .json({ message: "There are no active queues", outlet });
    }
  }),
];

exports.active_queue_get = [
  asyncHandler(async (req, res, next) => {
    console.log(req.params);
    const queueItems = await findAllQueueItemsByQueueId(req.params.queueId);
    console.log(
      "Here are the queue items for this queue id:",
      req.params.queueId,
      queueItems
    );
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

exports.new_customer_post = [
  param("queueId").notEmpty().withMessage("Queue must have an id"),
  body("customerName", "Name must be a string").trim().isString().escape(),
  body("customerNumber", "Number must be valid").trim().isString().escape(),
  body("VIP", "VIP must be boolean").isBoolean(),
  body("pax", "Pax must be an integer").trim().isInt().escape(),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const queueId = req.params.queueId;
    const customer = {
      queueId: queueId,
      ...req.body,
    };
    console.log("THis is the data from new customer post", customer);
    //1. Check if customer number is in system for this account?
    const customerExist = await findDuplicateCustomerByNumberAndAcctId({
      number: customer.customerNumber,
      accountId: customer.accountId,
    });
    console.log("Does customer exist? ", customerExist);
    //2. False -> create new customer and new queue item
    if (customerExist.length === 0) {
      const dataForNewCustomer = {
        name: customer.customerName,
        number: customer.customerNumber,
        VIP: customer.VIP,
        accountId: customer.accountId,
      };
      const newCustomer = await createACustomer(dataForNewCustomer);
      if (!newCustomer) {
        return res
          .status(400)
          .json({ message: "Error creating a new customer!" });
      }
      const existingQueueItemsLength = await findQueueItemsLengthByQueueId(
        queueId
      );
      const dataForNewQueueItem = {
        queueId: queueId,
        customerId: newCustomer.id,
        pax: parseInt(customer.pax),
        position: existingQueueItemsLength + 1,
      };
      const newQueueItem = await createAQueueItem(dataForNewQueueItem);
      if (!newQueueItem) {
        return res
          .status(400)
          .json({ message: "Error creating a new queue item!" });
      }
      res.status(201).json({
        message: `Success! New customer, ${newCustomer.name} has been added to queue`,
        queueItem: newQueueItem,
        customer: newCustomer[0],
      });
    } else {
      //3. True -> Does queueItem.active exist for this customer?
      const dataForActiveQueueItem = {
        queueId: queueId,
        customerId: customerExist[0].id,
      };
      const queueItemActive = await findDupeActiveCustomerInQueueItem(
        dataForActiveQueueItem
      );
      if (queueItemActive.length === 0 || queueItemActive[0] === undefined) {
        //FALSE: create a new queue item. return existingCust, newQueueItem, acctId, msg
        // return EXISTINGcust, newQueueItem, acctId, msg
        const existingQueueItemsLength = await findQueueItemsLengthByQueueId(
          queueId
        );
        const dataForNewQueueItem = {
          queueId: queueId,
          customerId: customerExist[0].id,
          pax: parseInt(customer.pax),
          position: existingQueueItemsLength + 1,
        };
        const newQueueItem = await createAQueueItem(dataForNewQueueItem);
        if (!newQueueItem) {
          return res
            .status(400)
            .json({ message: "Error creating a new queue item!" });
        }
        console.log(
          "Customer name when customer exist and enters a new queue: ",
          customerExist
        );
        res.status(201).json({
          message: `Success! Returning customer, ${customerExist[0].name} has been added to queue.`,
          queueItem: newQueueItem,
          customer: customerExist[0],
        });
      } else {
        if (queueItemActive[0].queueId === queueId) {
          res.status(201).json({
            message: `This customer is already in queue. ${customerExist[0].name} at ${queueItemActive[0].position} position`,
            queueItem: queueItemActive[0],
            customer: customerExist[0],
          });
        } else {
          const prevQueueLocation = await findOutletByQueueId(
            queueItemActive[0].queueId
          );
          console.log("Previous queue details, ", prevQueueLocation);
          //FALSE: PROMPT CUSTOMER: Do you wish to leave your previous queue at queue.location?
          res.status(406).json({
            message: `This customer (${customerExist[0].name}) is in a queue at ${prevQueueLocation.outlet.name}.`,
            previousQueueId: prevQueueLocation.id,
            currentQueueId: queueId,
            previousQueueItemId: queueItemActive[0].id,
            customerId: queueItemActive[0].customerId,
            previousOutlet: prevQueueLocation.outlet.name,
          });
        }
      }
    }
  }),
];

exports.new_customer_repost = [
  param("queueId").notEmpty().withMessage("Queue must have an id"),
];

exports.seat_queue_item_patch = [
  param("queueItemId")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("Queue item ID cannot be empty"),
  body("seat").isBoolean().withMessage("Seated must be a boolean"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const queueItemId = req.params.queueItemId;
    console.log(req.body);
    const seated = req.body.seat;
    const dataToUpdate = {
      queueItemId: queueItemId,
      seated: seated,
      active: !seated,
    };
    const updateSeated = await updateSeatQueueItem(dataToUpdate);
    if (updateSeated) {
      res
        .status(201)
        .json(
          { message: "Successfully updated seat of customer" },
          updateSeated
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
  body("call").isBoolean().withMessage("Seated must be a boolean"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const queueItemId = req.params.queueItemId;
    const called = req.body.call;
    const dataToUpdate = {
      queueItemId: queueItemId,
      called: called,
    };
    const updateCalled = await updateCallQueueItem(dataToUpdate);
    if (updateCalled) {
      res.status(201).json(updateCalled);
    } else {
      res
        .status(404)
        .json({ message: "Error trying to update called for queue item" });
    }
    console.log("Pass validation, inside asyncHandler: ", updateCalled);
  }),
];

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
    console.log(staff);
    if (staff.length !== 0) {
      return res.status(200).json(staff);
    } else {
      return res.status(404).json({ message: "Error getting staff list" });
    }
  }),
];

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

    console.log("Data: ", data, "Staff: ", staff);
    console.log("Data pw", data.password, "Staff pw", staff.password);
    const pwValid = await validatePw(staff.password, data.password);
    console.log("Is the password valid: ", pwValid);

    const staffRoleValue = ROLE_HIERARCHY[staff.role];
    const minimumRoleValue = ROLE_HIERARCHY[data.minimumRole];

    if (staffRoleValue >= minimumRoleValue) {
      const dataForAuditLog = {
        staffId: staff.id,
        actionType: req.body.actionPurpose,
      };

      await createAuditLog(dataForAuditLog);
      return res.status(200).json({ message: "Verification successful." });
    } else {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient role for this action." });
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
    console.log("Trying to get staff info");
    const params = req.params;
    const data = {
      accountId: params.accountId,
      staffId: parseInt(staffId),
    };
    const staffInfo = await getStaffByIdAndAccountId(data);
    if (staffInfo) {
      return res.status(200).json(staffInfo);
    } else {
      return res.status(404).json({ message: "Error, could not find staff." });
    }
  }),
];
