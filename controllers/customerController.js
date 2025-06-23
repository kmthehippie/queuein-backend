const asyncHandler = require("express-async-handler");
const { header, body, param } = require("express-validator");
const handleValidationResult = require("../middleware/validationResult");
const { convertText } = require("../helper/convertText");
const {
  findAccountByName,
  findOutletsByAcctId,
  findActiveQueuesByOutletAndAccountId,
  findOutletByIdAndAccountId,
  findActiveQueueByOutletId,
  findQueueItemsByQueueId,
  findAccountBySlug,
  createACustomer,
  createAQueueItem,
  findQueueByQueueId,
  findDuplicateCustomerByNumberAndAcctId,
  findDuplicateCustomerInQueue,
  findDupeActiveCustomerInQueueItem,
  findOutletByQueueId,
  findQueueItemsLengthByQueueId,
  findQueueItemByQueueItemId,
  findCustomerByCustomerID,
  updateQueueItemByQueueItemId,
  updatePaxByQueueItemId,
} = require("../db/authQueries");
const prisma = require("../script");

//! LOCAL STORAGE CHECKING HERE
exports.check_local_storage = [
  body("queueItemId")
    .notEmpty()
    .withMessage("No queue item id")
    .isUUID()
    .withMessage("Invalid queue item id")
    .trim(),
  body("queueId")
    .notEmpty()
    .withMessage("No queue Id")
    .isUUID()
    .withMessage("Invalid queue id")
    .trim(),
  body("acctSlug").notEmpty().withMessage("No account slug").trim(),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const { queueItemId, queueId, acctSlug } = req.body;
    const validQueueItemId = await findQueueItemByQueueItemId(queueItemId);
    if (validQueueItemId === null) {
      return res.status(404).json({ message: "Error, queue item not found." });
    }
    if (
      validQueueItemId.quit === false &&
      validQueueItemId.seated === false &&
      validQueueItemId.noShow === false &&
      validQueueItemId.active === true
    ) {
      return res.status(200).json({ queueItemId: validQueueItemId.id });
    } else {
      return res.status(400).json({
        message:
          "Error, queue item has either quit, seated, noShow or inactive.",
      });
    }
  }),
];

exports.landing_page = [
  param("acctSlug").notEmpty().withMessage("Slug can't be empty"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const slug = req.params.acctSlug;
    console.log("Does params have slug? ", req.params.acctSlug);

    const account = await findAccountBySlug(slug);
    if (!account) {
      return res
        .status(404)
        .json({ message: "Account does not exist with us." });
    }

    const accountInfo = {
      id: account.id,
      companyName: account.companyName,
      logo: account.logo,
      slug: account.slug,
    };
    const outlets = await findOutletsByAcctId(account.id);

    const outletsWithQueue = [];
    for (const outlet of outlets) {
      const data = { outletId: outlet.id, accountId: account.id };
      const queues = await findActiveQueuesByOutletAndAccountId(data);
      for (const queue of queues) {
        const queueItemsLength = await findQueueItemsLengthByQueueId(queue.id);
        queue.queueLength = queueItemsLength;
      }
      outletsWithQueue.push({ ...outlet, queues });
    }

    console.log("Finding account landing page:", accountInfo, outletsWithQueue);

    res.status(200).json({ accountInfo, outletsWithQueue });
  }),
];

exports.outlet_landing_page = [
  param("acctSlug").notEmpty().withMessage("Params cannot be empty"),
  param("outletId").isInt().withMessage("Outlet id must be an int"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const params = req.params;
    const acctSlug = params.acctSlug;
    const outletId = parseInt(params.outletId);

    const account = await findAccountBySlug(acctSlug);
    if (!account) {
      return res
        .status(404)
        .json({ message: "Account does not exist with us." });
    }
    const accountInfo = {
      id: account.id,
      companyName: account.companyName,
      logo: account.logo,
      slug: account.slug,
    };
    const outletById = {
      id: outletId,
      accountId: account.id,
    };
    const outlet = await findOutletByIdAndAccountId(outletById);
    if (!outlet) {
      return res.status(404).json({ message: "Outlet does not exist." });
    }
    const infoToFindQueue = {
      accountId: account.id,
      outletId: outlet.id,
    };

    const queue = await findActiveQueueByOutletId(infoToFindQueue);
    console.log("Does queue exist?", queue);
    if (queue.length === 0) {
      return res.status(200).json({
        accountInfo,
        outlet,
      });
    }

    console.log("Is this the queueId: ", queue[0].id);
    const queueId = queue[0].id;
    const queueItemsLength = await findQueueItemsLengthByQueueId(queueId);

    if (queueItemsLength === 0) {
      return res.status(200).json({
        accountInfo,
        outlet,
        queue,
      });
    }
    res.status(200).json({
      accountInfo,
      outlet,
      queue,
      queueItemsLength,
    });
  }),
];

exports.customer_form_get = [
  param("acctSlug").notEmpty().withMessage("Params cannot be empty"),
  param("queueId").notEmpty().withMessage("Queue must have an id"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const params = req.params;
    const acctSlug = params.acctSlug;
    const account = await findAccountBySlug(acctSlug);
    console.log("received req customer form get", params);
    if (!account) {
      return res
        .status(404)
        .json({ message: "Account does not exist with us." });
    }
    const accountInfo = {
      id: account.id,
      companyName: account.companyName,
      logo: account.logo,
      slug: account.slug,
    };

    const queue = await findOutletByQueueId(params.queueId);
    if (!queue) {
      return res.status(404).json({
        message:
          "Queue Does Not Exist. Please ask Host for an updated QR code for the new queue.",
      });
    }
    console.log(accountInfo, !!queue);

    res.status(200).json({
      accountInfo,
      queue,
    });
  }),
];

//!Need to fix this
exports.customer_form_post = [
  param("acctSlug").notEmpty().withMessage("Params cannot be empty"),
  param("outletId").isInt().withMessage("Outlet id must be an int"),
  param("queueId").notEmpty().withMessage("Queue must have an id"),
  //validate body data
  body("customerInfo.customerName", "Name must be a string")
    .trim()
    .isString()
    .escape(),
  body("customerInfo.customerNumber", "Number must be valid")
    .trim()
    .isString()
    .escape(),
  body("customerInfo.VIP", "VIP must be boolean").isBoolean(),
  body("customerInfo.pax", "Pax must be an integer").trim().isInt().escape(),
  //Validate local storage info
  body("localStorageInfo")
    .optional({ nullable: true })
    .isObject()
    .withMessage("localStorageInfo must be an object if provided"),
  body("localStorageInfo.queueItemId")
    .optional()
    .isString()
    .withMessage("queueItemId in localStorageInfo must be a string")
    .isUUID()
    .escape(),
  body("localStorageInfo.queueId")
    .optional()
    .isString()
    .withMessage("queue id in local storage info must be a string")
    .escape(),
  body("localStorageInfo.acctSlug")
    .optional()
    .isString()
    .withMessage("acctSlug in local storage info must be a string")
    .escape(),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const customer = req.body.customerInfo;
    console.log("Customer info: ", customer);
    const localStorageInfo = req.body.localStorageInfo;
    const params = req.params;
    const account = await findAccountBySlug(params.acctSlug);

    //* Localstorage.queueItem Id exist?
    if (localStorageInfo !== null) {
      //FIND CUST, QUEUEITEM, MESSAGE, ACCOUNT ID
      console.log("This is the local storage info ", localStorageInfo);
      if (localStorageInfo.expiry)
        // const existingQueueItem = await findQueueItemByQueueItemId(
        //   localStorageInfo.queueItemId
        // );
        //TODO: TRUE: return cust, queueItem, msg, acctId
        console.log(
          "This is the result of existing queue item ",
          existingQueueItem
        );
    }

    //* FALSE: Is customer number in system for this account?
    const customerExist = await findDuplicateCustomerByNumberAndAcctId({
      number: customer.customerNumber,
      accountId: account.id,
    });

    //* FALSE: create new customer and new queueItem.
    if (customerExist.length === 0) {
      const dataForNewCustomer = {
        name: customer.customerName,
        number: customer.customerNumber,
        VIP: customer.VIP,
        accountId: account.id,
      };
      const newCustomer = await createACustomer(dataForNewCustomer);
      if (!newCustomer) {
        return res
          .status(400)
          .json({ message: "Error creating a new customer!" });
      }

      const existingQueueItemsLength = await findQueueItemsLengthByQueueId(
        params.queueId
      );

      const dataForNewQueueItem = {
        queueId: params.queueId,
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
        message: `Welcome ${newCustomer.name}! You have entered the queue!`,
        queueItem: newQueueItem,
        customer: newCustomer[0],
      });
    } else {
      //for this queue only
      //* TRUE: queueItem.active exist for this customer?
      const dataForActiveQueueItem = {
        queueId: params.queueId,
        customerId: customerExist[0].id,
      };
      const queueItemActive = await findDupeActiveCustomerInQueueItem(
        dataForActiveQueueItem
      );

      if (queueItemActive.length === 0 || queueItemActive[0] === undefined) {
        //FALSE: create a new queue item. return existingCust, newQueueItem, acctId, msg
        // return EXISTINGcust, newQueueItem, acctId, msg
        const existingQueueItemsLength = await findQueueItemsLengthByQueueId(
          params.queueId
        );

        const dataForNewQueueItem = {
          queueId: params.queueId,
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
          message: `Welcome Back, ${customerExist[0].name}. You have entered a new queue.`,
          queueItem: newQueueItem,
          customer: customerExist[0],
        });
      } else {
        //TRUE: Is queueitem.active.queueId === params.queueId?
        if (queueItemActive[0].queueId === params.queueId) {
          //TRUE: return existingCust, queueItem, acctId, msg
          res.status(201).json({
            message: `Welcome Back, ${customerExist[0].name}. This is where you left off.`,
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
            message: `Welcome Back, ${customerExist[0].name}. You were previously in queue at ${prevQueueLocation.outlet.name}.`,
            previousQueueId: prevQueueLocation.id,
            currentQueueId: params.queueId,
            previousQueueItemId: queueItemActive[0].id,
            customerId: queueItemActive[0].customerId,
            previousOutlet: prevQueueLocation.outlet.name,
          });
        }
      }
    }
  }),
];

exports.customer_form_repost = [
  //validate body
  param("acctSlug").notEmpty().withMessage("Params cannot be empty"),
  param("outletId").isInt().withMessage("Outlet id must be an int"),
  param("queueId").notEmpty().withMessage("Queue must have an id"),
  body("localStorageInfo")
    .optional({ nullable: true })
    .isObject()
    .withMessage("localStorageInfo must be an object if provided"),
  body("localStorageInfo.queueItemId")
    .optional()
    .isString()
    .withMessage("queueItemId in localStorageInfo must be a string")
    .isUUID()
    .escape(),
  body("localStorageInfo.queueId")
    .optional()
    .isString()
    .withMessage("queue id in local storage info must be a string")
    .escape(),
  body("localStorageInfo.acctSlug")
    .optional()
    .isString()
    .withMessage("acctSlug in local storage info must be a string")
    .escape(),
  //validate body data
  body("pax", "Pax must be an integer").trim().isInt().escape(),
  body("prevData.message").escape().trim(),
  body("prevData.previousQueueId").escape().trim(),
  body("prevData.currentQueueId").escape().trim(),
  body("prevData.previousQueueItemId").escape().trim(),
  body("prevData.customerId").escape().trim(),
  body(
    "remainInPreviousQueue",
    "Remain in previous queue must be a boolean"
  ).isBoolean(),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const params = req.params;
    const prevData = req.body.prevData;
    console.log("What are the prev data after saying yes?", prevData);
    //TRUE: update all queueItem to inactive. Create new queueItem. return existingCust, newQueueItem, acctId, msg
    const remainInPrevQueue = req.body.remainInPreviousQueue;
    if (remainInPrevQueue) {
      const existingCustomer = await findCustomerByCustomerID(
        prevData.customerId
      );
      const previousQueueItem = await findQueueItemByQueueItemId(
        prevData.previousQueueItemId
      );

      const queueId = previousQueueItem.queueId;
      const correctOutlet = await findOutletByQueueId(queueId);
      console.log("correct outlet? ", correctOutlet.outlet);
      res.status(201).json({
        message: `Welcome Back, ${existingCustomer.name}. This is where you left off.`,
        queueItem: previousQueueItem,
        customer: existingCustomer,
        outlet: correctOutlet.outlet,
      });
    }
    //FALSE: return existingCust, existingQueueId, acctId, msg
    if (!remainInPrevQueue) {
      const existingCustomer = await findCustomerByCustomerID(
        prevData.customerId
      );
      //update previous queue item to inactive
      const dataToUpdateQueueItem = {
        queueItemId: prevData.previousQueueItemId,
        queueItemActive: false,
        queueItemQuit: true,
      };
      const updatePrevQueueItem = await updateQueueItemByQueueItemId(
        dataToUpdateQueueItem
      );
      const existingQueueItemsLength = await findQueueItemsLengthByQueueId(
        params.queueId
      );
      //create a new queue item
      const dataForNewQueueItem = {
        queueId: prevData.currentQueueId,
        customerId: prevData.customerId,
        pax: parseInt(req.body.pax),
        position: existingQueueItemsLength + 1,
      };
      const newQueueItem = await createAQueueItem(dataForNewQueueItem);
      res.status(201).json({
        message: `Welcome Back, ${existingCustomer.name}. You've left your previous queue and entered a new queue.`,
        queueItem: newQueueItem,
        customer: existingCustomer,
      });
    }
  }),
];

exports.customer_quit_queue_post = [
  param("acctSlug").notEmpty().withMessage("Params cannot be empty"),
  param("queueId").notEmpty().withMessage("Queue must have an id"),
  param("queueItemId").notEmpty().withMessage("Queue Item must have an id"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    console.log(req.params);
    const params = req.params;

    const queueItem = await findQueueItemByQueueItemId(params.queueItemId);
    console.log("Customer trying to leave queue", queueItem);

    const data = {
      queueItemId: params.queueItemId,
      active: false,
      quit: true,
    };
    const updateQueueItem = await updateQueueItemByQueueItemId(data);
    console.log("Updated queue items: ", updateQueueItem);
    if (updateQueueItem) {
      res.status(201).json({
        message: `${queueItem.customer.name}, you have successfully left your queue. See you again soon!`,
      });
    } else {
      res.status(400).json({
        message: `${queueItem.id}, there was an error leaving the queue.`,
      });
    }
  }),
];

exports.customer_update_pax_post = [
  body("pax")
    .notEmpty()
    .isInt()
    .withMessage("Pax should be an integer and cannot be empty"),
  param("acctSlug").notEmpty().withMessage("Params cannot be empty"),
  param("queueId").notEmpty().withMessage("Queue must have an id"),
  param("queueItemId").notEmpty().withMessage("Queue Item must have an id"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const params = req.params;
    const pax = req.body.pax;
    console.log("We are in controllers: ", pax, params);
    //we need to update the queue item pax
    const dataForUpdate = {
      pax: pax,
      queueItemId: params.queueItemId,
    };
    const updatePax = await updatePaxByQueueItemId(dataForUpdate);
    console.log("This is the updated queueItem after pax update :", updatePax);
    res.status(201).json({
      message: `Updated pax to ${pax} for ${params.queueItemId}`,
      queueItem: updatePax,
    });
  }),
];

exports.customer_waiting_page_get = [
  param("acctSlug").notEmpty().withMessage("Require slug"),
  param("queueId").notEmpty().withMessage("Queue must have an id"),
  param("queueItemId").notEmpty().withMessage("Queue Item must have an id"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const { acctSlug, queueId, queueItemId } = req.params;

    const queueItem = await findQueueItemByQueueItemId(queueItemId);
    console.log("waiting page customer: ", queueItem);
    if (queueItem.active) {
      const account = await findAccountBySlug(acctSlug);
      const outlet = await findOutletByQueueId(queueId);
      const dataToReturn = {
        accountInfo: account,
        outlet: outlet.outlet,
        queueItem: queueItem,
        customer: queueItem.customer,
      };
      return res.status(200).json(dataToReturn);
    } else {
      return res
        .status(404)
        .json({ message: "Queue item was not found or no longer active." });
    }
  }),
];
