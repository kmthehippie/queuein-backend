const asyncHandler = require("express-async-handler");
const { header, body, param } = require("express-validator");
const handleValidationResult = require("../middleware/validationResult");
const {
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
  findOutletsByAcctIdLandingPage,
  findAllQueueItemsByQueueId,
  updateQueueItemFcmToken,
  updateSecretTokenByQueueItemId,
} = require("../db/authQueries");
const {
  sendQueueUpdate,
  sendQueueUpdateForHost,
  sendOutletUpdate,
} = require("../helper/socketHelper");
const { generateQueueItemToken } = require("../config/jwt");
const { encrypt, decrypt, hashPhone } = require("../utils/encryption");

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
      companyName: decrypt(account.companyName),
      logo: account.logo,
      slug: account.slug,
    };
    console.log("Account info: ", accountInfo.id);

    const outlets = await findOutletsByAcctIdLandingPage(accountInfo.id);

    const outletsWithQueue = [];
    for (const outlet of outlets) {
      const data = { outletId: outlet.id, accountId: account.id };
      const queues = await findActiveQueuesByOutletAndAccountId(data);
      for (const queue of queues) {
        const queueItemsLength = await findActiveQueueItemsLengthByQueueId(
          queue.id
        );
        console.log(queue.id, "The queue items length: ", queueItemsLength);
        queue.queueLength = queueItemsLength;
        delete queue.queueItems;
      }
      outletsWithQueue.push({ ...outlet, queues });
    }
    res.status(200).json({ accountInfo, outletsWithQueue });
  }),
];

//! REPEATED CALL TO THIS 3X
exports.outlet_landing_page = [
  param("acctSlug").notEmpty().withMessage("Params cannot be empty"),
  param("outletId").isString().withMessage("Outlet must be a string"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const params = req.params;
    const acctSlug = params.acctSlug;
    const outletId = params.outletId;

    const account = await findAccountBySlug(acctSlug);
    if (!account) {
      return res
        .status(404)
        .json({ message: "Account does not exist with us." });
    }
    const accountInfo = {
      id: account.id,
      companyName: decrypt(account.companyName),
      logo: account.logo,
      slug: account.slug,
      businessType: account.businessType,
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

    if (queue.length !== 0) {
      console.log("This is the queue in outlet_landing:", queue[0].id);
      const queueItems = queue[0].queueItems;
      const activeItems = queueItems.filter(
        (item) =>
          item.seated === false &&
          item.quit === false &&
          item.noShow === false &&
          item.active === true
      );
      const activeItemsLength = activeItems.length;

      res.status(200).json({
        accountInfo,
        outlet,
        queue,
        activeItemsLength,
      });
    }
    if (queue.length === 0 || queue.active === false) {
      return res.status(200).json({
        accountInfo,
        outlet,
        queue: null,
      });
    }
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
      companyName: decrypt(account.companyName),
      logo: account.logo,
      slug: account.slug,
      businessType: account.businessType,
    };

    const queue = await findOutletByQueueId(params.queueId);
    if (!queue) {
      return res.status(404).json({
        message:
          "Queue Does Not Exist. Please ask Host for an updated QR code for the new queue.",
      });
    }
    console.log(accountInfo.id, !!queue);

    res.status(200).json({
      accountInfo,
      queue,
    });
  }),
];

exports.customer_form_post = [
  param("acctSlug").notEmpty().withMessage("Params cannot be empty"),
  param("outletId").isString().withMessage("Outlet must be a string"),
  param("queueId").notEmpty().withMessage("Queue must have an id"),
  //validate body data
  body("customerName", "Name must be a string").trim().isString().escape(),
  body("customerNumber", "Number must be valid").trim().isString().escape(),
  body("VIP", "VIP must be boolean").isBoolean(),
  body("pdpaConsent", "PDPA Consent must be boolean").isBoolean(),
  body("pax", "Pax must be an integer").trim().optional().isInt().escape(),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const { acctSlug, queueId } = req.params;
    const { customerName, customerNumber, VIP, pax, pdpaConsent } = req.body;
    const account = await findAccountBySlug(acctSlug);
    if (!account) {
      return res.status(404).json({ message: "Error. Account not found" });
    }

    const dataToFindQueueItem = {
      queueId: queueId,
      contactNumberHashed: hashPhone(customerNumber), // Encrypt for query
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
        name: encrypt(customerName),
        contactNumber: encrypt(customerNumber),
        contactNumberHashed: hashPhone(customerNumber),
        position: newPosition,
        pdpaConsent: pdpaConsent,
        pdpaConsentAt: pdpaConsent ? new Date() : null,
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

      const io = req.app.get("io");
      const notice = {
        action: "join",
        queueItemId: queueItemToReturn.id,
      };
      await sendQueueUpdateForHost(
        io,
        `host_${queueItemToReturn.queueId}`,
        notice
      );
      await sendOutletUpdate(io, `outlet_${queueItemToReturn.queueId}`, notice);

      return res.status(201).json({
        message: `Welcome ${queueItemToReturn.name}. You have entered the queue.`,
        queueItem: queueItemToReturn,
        secretToken: queueItemSecretToken,
      });
    } else {
      let customerToLink = null;
      const existingCustomer = await findDuplicateCustomerByNumberAndAcctId({
        number: encrypt(customerNumber),
        accountId: account.id,
      });
      console.log("Existing customer found: ", existingCustomer.id);

      if (existingCustomer.length === 0) {
        const dataForNewCustomer = {
          name: encrypt(customerName),
          number: encrypt(customerNumber),
          numberHashed: hashPhone(customerNumber),
          pdpaConsent: pdpaConsent,
          pdpaConsentAt: pdpaConsent ? new Date() : null,
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
        name: encrypt(customerName),
        contactNumber: encrypt(customerNumber),
        contactNumberHashed: hashPhone(customerNumber),
        position: newPosition,
        customerId: customerToLink.id,
        pdpaConsent: pdpaConsent,
        pdpaConsentAt: pdpaConsent ? new Date() : null,
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

      const io = req.app.get("io");
      const notice = {
        action: "join",
        queueItemId: newQueueItem.id,
      };
      if (queueItemToReturn)
        await sendQueueUpdateForHost(
          io,
          `host_${newQueueItem.queueId}`,
          notice
        );

      await sendOutletUpdate(io, `outlet_${newQueueItem.queueId}`, notice);

      return res.status(201).json({
        message: `Welcome ${newQueueItem.name}. You have entered the queue.`,
        queueItem: queueItemToReturn,
        customer: customerToLink,
        secretToken: queueItemSecretToken,
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
    console.log("Customer trying to quit the queue", queueItem.id);

    const data = {
      queueItemId: params.queueItemId,
      active: false,
      quit: true,
    };
    const updateQueueItem = await updateQueueItemByQueueItemId(data);
    console.log("Updated queue items: ", updateQueueItem.id);

    if (updateQueueItem) {
      const io = req.app.get("io");
      const notice = {
        action: "quit",
        queueItemId: updateQueueItem.id,
      };
      await sendQueueUpdateForHost(
        io,
        `host_${updateQueueItem.queueId}`,
        notice
      );
      await sendQueueUpdate(
        io,
        `queue_${updateQueueItem.queueId}`,
        updateQueueItem.id
      );
      await sendOutletUpdate(io, `outlet_${updateQueueItem.queueId}`, notice);

      res.status(201).json({
        message: `${updateQueueItem.name}, you have successfully left your queue. See you again soon!`,
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
    console.log("We are in customer update pax controller: ", pax, params);
    //we need to update the queue item pax
    const dataForUpdate = {
      pax: pax,
      queueItemId: params.queueItemId,
    };
    const updatePax = await updatePaxByQueueItemId(dataForUpdate);

    const io = req.app.get("io");
    const notice = {
      action: "pax",
      queueItemId: updatePax.id,
    };
    await sendQueueUpdateForHost(io, `host_${updatePax.queueId}`, notice);
    await sendQueueUpdate(io, `queue_${updatePax.queueId}`, notice);

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
    const queue = await findAllQueueItemsByQueueId(queueId);
    const allQueueItems = queue.queueItems;

    const queueItemPos = allQueueItems
      .filter((item) => item.active && !item.quit && !item.seated)
      .map((item) => item.position);
    const currentlyServingPos = queueItemPos[0] || null;

    let queueItemsAheadOfCustomer = 0;
    if (queueItem && queueItem.position !== undefined) {
      queueItemsAheadOfCustomer = queueItemPos.filter(
        (pos) => pos < queueItem.position
      ).length;
    }
    let queueListType;
    let arrToSend = null;

    if (queueItemsAheadOfCustomer >= 5) {
      queueListType = "large-bar";
    } else if (
      queueItemsAheadOfCustomer < 5 &&
      queueItemsAheadOfCustomer >= 1
    ) {
      queueListType = "short-bar";
      arrToSend = queueItemPos.slice(0, 7);
    } else {
      queueListType = "serving-you-bar";
      arrToSend = queueItemPos.slice(0, 7);
    }

    console.log("Currently serving pos: ", currentlyServingPos);

    //! ADD THE .QUEUELIST
    if (queueItem.active) {
      const account = await findAccountBySlug(acctSlug);
      const outlet = await findOutletByQueueId(queueId);
      // Decrypt fields
      account.companyName = decrypt(account.companyName);
      queueItem.name = decrypt(queueItem.name);
      queueItem.contactNumber = decrypt(queueItem.contactNumber);
      if (queueItem.customer) {
        queueItem.customer.name = decrypt(queueItem.customer.name);
        queueItem.customer.number = decrypt(queueItem.customer.number);
      }
      const dataToReturn = {
        accountInfo: account,
        outlet: outlet.outlet,
        queueItem: queueItem,
        queueList: {
          type: queueListType,
          partiesAhead: queueItemsAheadOfCustomer,
          arr: arrToSend,
        },
        customer: queueItem.customer,
        currentlyServing: currentlyServingPos,
      };

      return res.status(200).json(dataToReturn);
    } else {
      return res
        .status(404)
        .json({ message: "Queue item was not found or no longer active." });
    }
  }),
];

exports.customer_kiosk_form_post = [
  param("acctSlug").notEmpty().withMessage("Params cannot be empty"),
  param("outletId").isString().withMessage("Outlet must be a string"),
  param("queueId").notEmpty().withMessage("Queue must have an id"),
  //validate body data
  body("customerName", "Name must be a string").trim().isString().escape(),
  body("customerNumber", "Number must be valid").trim().isString().escape(),
  body("VIP", "VIP must be boolean").isBoolean(),
  body("pdpaConsent", "PDPA Consent must be boolean").isBoolean(),
  body("pax", "Pax must be an integer").trim().optional().isInt().escape(),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const { acctSlug, queueId } = req.params;
    const { customerName, customerNumber, VIP, pax, pdpaConsent } = req.body;
    const account = await findAccountBySlug(acctSlug);
    if (!account) {
      return res.status(404).json({ message: "Error. Account not found" });
    }
    const dataToFindQueueItem = {
      queueId: queueId,
      contactNumberHashed: hashPhone(customerNumber),
    };
    const existingQueueItem = await findQueueItemByContactNumberAndQueueId(
      dataToFindQueueItem
    );
    console.log("Existing queue item found: ", existingQueueItem.id);
    const existingQueueItemsLength = await findQueueItemsLengthByQueueId(
      queueId
    );
    const newPosition = existingQueueItemsLength + 1;

    const activeExistingQueueItem = existingQueueItem.find(
      (item) => item.active
    );
    if (activeExistingQueueItem) {
      return res.status(200).json({
        status: "existing",
        queueItem: activeExistingQueueItem,
      });
    }

    if (VIP === false) {
      const dataForNewQueueItem = {
        queueId: queueId,
        pax: parseInt(pax),
        name: encrypt(customerName),
        contactNumber: encrypt(customerNumber),
        contactNumberHashed: hashPhone(customerNumber),
        position: newPosition,
        pdpaConsent: pdpaConsent,
        pdpaConsentAt: pdpaConsent ? new Date() : null,
      };
      const newQueueItem = await createAQueueItem(dataForNewQueueItem);
      if (!newQueueItem) {
        return res
          .status(400)
          .json({ message: "Error creating a new queue item" });
      }
      newQueueItem.name = decrypt(newQueueItem.name);
      newQueueItem.contactNumber = decrypt(newQueueItem.contactNumber);
      const io = req.app.get("io");
      const notice = {
        action: "join",
        queueItemId: newQueueItem.id,
      };

      console.log("New Queue Item: ", newQueueItem.id);
      await sendQueueUpdateForHost(io, `host_${newQueueItem.queueId}`, notice);
      await sendQueueUpdate(io, `queue_${newQueueItem.queueId}`, notice);
      await sendOutletUpdate(io, `outlet_${newQueueItem.outletId}`, notice);

      return res.status(201).json({
        status: "new",
        queueItem: newQueueItem,
      });
    } else {
      let customerToLink = null;

      console.log("Looking for existing customer for VIP", account.id);
      const existingCustomer = await findDuplicateCustomerByNumberAndAcctId({
        numberHashed: hashPhone(customerNumber),
        accountId: account.id,
      });

      console.log("Existing customer found: ", existingCustomer.id);

      if (existingCustomer.length === 0) {
        const dataForNewCustomer = {
          name: encrypt(customerName),
          number: encrypt(customerNumber),
          numberHashed: hashPhone(customerNumber),
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
        name: encrypt(customerName),
        contactNumber: encrypt(customerNumber),
        contactNumberHashed: hashPhone(customerNumber),
        position: newPosition,
        customerId: customerToLink.id,
        pdpaConsent: pdpaConsent,
        pdpaConsentAt: pdpaConsent ? new Date() : null,
      };
      const newQueueItem = await createAQueueItemVIP(dataForNewQueueItem);
      if (!newQueueItem) {
        return res
          .status(400)
          .json({ message: "Error creating a new queue item for VIP" });
      }

      newQueueItem.name = decrypt(newQueueItem.name);
      newQueueItem.contactNumber = decrypt(newQueueItem.contactNumber);
      customerToLink.name = decrypt(customerToLink.name);
      customerToLink.number = decrypt(customerToLink.number);

      console.log("New VIP Queue Item: ", newQueueItem.id, customerToLink.id);
      const io = req.app.get("io");
      const notice = {
        action: "join",
        queueItemId: newQueueItem.id,
      };
      await sendQueueUpdateForHost(io, `host_${newQueueItem.queueId}`, notice);
      await sendQueueUpdate(io, `queue_${newQueueItem.queueId}`, notice);

      return res.status(201).json({
        status: "new vip",
        queueItem: newQueueItem,
        customer: customerToLink,
      });
    }
  }),
];

exports.customer_kiosk_get_waiting_data = [
  param("acctSlug").notEmpty().withMessage("Params cannot be empty"),
  param("queueItem").notEmpty().withMessage("Queue Item must have an id"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const { acctSlug, queueItem } = req.params;
    const accountInfo = await findAccountBySlug(acctSlug);
    const queueItemInfo = await findQueueItemByQueueItemId(queueItem);
    const outlet = await findOutletByQueueId(queueItemInfo.queueId);

    const queue = await findAllQueueItemsByQueueId(queueItemInfo.queueId);

    const allQueueItems = queue.queueItems;
    const queueItemPos = allQueueItems
      .filter((item) => item.active && !item.quit && !item.seated)
      .map((item) => item.position);
    const currentlyServingPos = queueItemPos[0] || null;

    if (!outlet || !accountInfo || !queueItemInfo) {
      return res.status(400).json({
        message: "Error getting outlet, account info or queue item info.",
      });
    }

    accountInfo.companyName = decrypt(accountInfo.companyName);
    queueItemInfo.name = decrypt(queueItemInfo.name);
    queueItemInfo.contactNumber = decrypt(queueItemInfo.contactNumber);

    return res.status(200).json({
      message: `Welcome ${queueItemInfo.name}. You have entered the queue.`,
      outlet: outlet.outlet,
      accountInfo: accountInfo,
      queueItem: queueItemInfo,
      currentlyServing: currentlyServingPos,
    });
  }),
];

exports.customer_get_prev_waiting = [
  param("acctSlug").notEmpty().withMessage("Params cannot be empty"),
  param("outletId").isString().withMessage("Outlet must be a string"),
  param("queueId").notEmpty().withMessage("Queue must have an id"),
  body("customerName", "Name must be a string").trim().isString().escape(),
  body("customerNumber", "Number must be valid").trim().isString().escape(),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const { acctSlug, outletId, queueId } = req.params;
    const { customerName, customerNumber } = req.body;

    const data = {
      queueId,
      contactNumberHashed: hashPhone(customerNumber), // Encrypt for query
    };

    const queueItem = await findQueueItemByContactNumberAndQueueId(data);
    console.log("This is the queue item: ", queueItem.id);

    if (queueItem.length < 1) {
      return res.status(404).json({
        message:
          "We can't find the queue item for this contact number and queue id.",
      });
    }
    // Decrypt in response if needed
    queueItem.forEach((item) => {
      item.name = decrypt(item.name);
      item.contactNumber = decrypt(item.contactNumber);
    });
    return res.status(200).json({
      message: "Success, Queue item found",
      queueItem,
    });
  }),
];

exports.customer_subscribe_fcm_post = [
  body("token").notEmpty().withMessage("FCM token is required."),
  body("queueItemId")
    .notEmpty()
    .isUUID()
    .withMessage("A valid queueItemId is required."),
  body("secretToken")
    .notEmpty()
    .withMessage("A valid secretToken is required."),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const { token, queueItemId, secretToken } = req.body;
    console.log("Subscribing to FCM with data:", req.body);

    const queueItem = await findQueueItemByQueueItemId(queueItemId);
    if (!queueItem) {
      return res.status(404).json({ message: "Queue item not found." });
    }

    if (queueItem.secretToken !== secretToken) {
      return res.status(403).json({ message: "Invalid secret token." });
    }

    const updatedQueueItem = await updateQueueItemFcmToken(queueItemId, token);

    if (!updatedQueueItem) {
      return res.status(404).json({ message: "Queue item not found." });
    }

    console.log(
      `Successfully subscribed queue item ${queueItemId} with FCM token.`
    );
    res
      .status(200)
      .json({ message: "Successfully subscribed to notifications." });
  }),
];
