const asyncHandler = require("express-async-handler");
const { header, body, param } = require("express-validator");
const handleValidationResult = require("../middleware/validationResult");
const { convertText } = require("../helper/convertText");
const {
  findAccountByName,
  findQueueItemsByQueueId,
  findQueueByQueueId,
  findDuplicateCustomerInQueue,
  findDupeActiveCustomerInQueueItem,
  findCustomerByCustomerID,
  findOutletsByAcctId,
  findActiveQueuesByOutletAndAccountId,
  findOutletByIdAndAccountId,
  findAccountBySlug,
  createACustomer,
  createAQueueItem,
  findDuplicateCustomerByNumberAndAcctId,
  findOutletByQueueId,
  findQueueItemsLengthByQueueId,
  findActiveQueueItemsLengthByQueueId,
  findQueueItemByQueueItemId,
  updateQueueItemByQueueItemId,
  updatePaxByQueueItemId,
  findQueueItemByContactNumberAndQueueId,
  createAQueueItemVIP,
} = require("../db/authQueries");

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
    const { queueItemId } = req.body;
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

    const queue = await findActiveQueuesByOutletAndAccountId(infoToFindQueue);
    console.log("Does queue exist?", queue);
    if (queue.length === 0 || queue.active === false) {
      return res.status(200).json({
        accountInfo,
        outlet,
      });
    }

    console.log("Is this the queueId: ", queue[0].id);
    const queueId = queue[0].id;
    const queueItemsLength = await findActiveQueueItemsLengthByQueueId(queueId);

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
  body("customerName", "Name must be a string").trim().isString().escape(),
  body("customerNumber", "Number must be valid").trim().isString().escape(),
  body("VIP", "VIP must be boolean").isBoolean(),
  body("pax", "Pax must be an integer").trim().isInt().escape(),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const { acctSlug, queueId } = req.params;
    const { customerName, customerNumber, VIP, pax } = req.body;
    const account = await findAccountBySlug(acctSlug);
    if (!account) {
      return res.status(404).json({ message: "Error. Account not found" });
    }

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
      return res.status(200).json({
        message: `Welcome Back, ${
          activeExistingQueueItem.name || customerName
        } . This is where you left off.`,
        queueItem: activeExistingQueueItem,
      });
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
        message: `Welcome ${newQueueItem.name}. You have entered the queue.`,
        queueItem: newQueueItem,
      });
    } else {
      let customerToLink = null;
      const existingCustomer = await findDuplicateCustomerByNumberAndAcctId({
        number: customerNumber,
        accountId: account.id,
      });
      if (existingCustomer.length === 0) {
        const dataForNewCustomer = {
          name: customerName,
          number: customerNumber,
          VIP: VIP,
          accountId: account.id,
        };
        customerToLink = await createACustomer(dataForNewCustomer);
        if (!customerToLink) {
          return res
            .status(400)
            .json({ message: "Error creating a new customer!" });
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
        message: `Welcome ${newQueueItem.name}. You have entered the queue.`,
        queueItem: newQueueItem,
        customer: customerToLink,
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
    const params = req.params;

    const queueItem = await findQueueItemByQueueItemId(params.queueItemId);
    console.log("Customer trying to quit the queue", queueItem);

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
