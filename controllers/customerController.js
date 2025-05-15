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
  findDuplicateCustomerByNumber,
  findDuplicateCustomerInQueue,
  findDupeActiveCustomerInQueueItem,
  findOutletByQueueId,
  findQueueItemsLengthByQueueId,
  findQueueItemByQueueItemId,
} = require("../db/authQueries");
const prisma = require("../script");

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
    const localStorageInfo = req.body.localStorageInfo;
    const params = req.params;
    const account = await findAccountBySlug(params.acctSlug);

    //* Localstorage.queueItem Id exist?
    if (localStorageInfo !== null) {
      //FIND CUST, QUEUEITEM, MESSAGE, ACCOUNT ID
      console.log("This is the local storage info ", localStorageInfo);
      const existingQueueItem = await findQueueItemByQueueItemId(
        localStorageInfo.queueItemId
      );
      //TODO: TRUE: return cust, queueItem, msg, acctId
      console.log(
        "This is the result of existing queue item ",
        existingQueueItem
      );
    }

    //FALSE: cust Number in system?
    const customerExist = await findDuplicateCustomerByNumber(
      data.customerNumber
    );
    //* FALSE: create new customer and new queueItem. return newCustomer, newQueueItem, acctId, msg
    if (!customerExist) {
      const dataForNewCustomer = {
        name: customer.customerName,
        number: customer.number,
        VIP: customer.VIP,
        accountId: account.id,
      };
      const newCustomer = await createACustomer(dataForNewCustomer);
      if (!newCustomer) {
        return res
          .status(400)
          .json({ message: "Error creating a new customer!" });
      }
      const dataForNewQueueItem = {
        queueId: params.queueId,
        customerId: newCustomer.id,
        pax: parseInt(customer.pax),
      };
      const newQueueItem = await createAQueueItem(dataForNewQueueItem);
      if (!newQueueItem) {
        return res
          .status(400)
          .json({ message: "Error creating a new queue item!" });
      }

      res.status(201).json({
        message: `Welcome ${customer.customerName}! You have entered the queue`,
        queueItem: newQueueItem,
        customer: newCustomer,
      });
    }
    //TODO: TRUE: queueItem.active exist for this customer?
    const dataForActiveQueueItem = {
      queueId: params.queueId,
      customerId: customerExist.id,
    };
    const queueItemActive = await findDupeActiveCustomerInQueueItem(
      dataForActiveQueueItem
    );
    console.log(queueItemActive);

    //FALSE: create a new queue item. return existingCust, newQueueItem, acctId, msg
    //TRUE: Is queueitem.active.queueId === params.queueId?
    //TRUE: return existingCust, queueItem, acctId, msg
    //FALSE: PROMPT CUSTOMER: Do you wish to leave your previous queue at queue.location?
    //TRUE: update all queueItem to inactive. Create new queueItem. return existingCust, newQueueItem, acctId, msg
    //FALSE: return existingCust, existingQueueId, acctId, msg
  }),
];

exports.customer_quit_queue_post = [
  asyncHandler(async (req, res, next) => {
    //TODO: FIND THE QUEUEITEM USING THE QUEUEITEM ID
    //TODO: SET queueItem.active to FALSE
    //TODO: SET queueItem.quit to TRUE
  }),
];
