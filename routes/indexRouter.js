const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const refreshController = require("../controllers/refreshController");
const customerController = require("../controllers/customerController");
const dbController = require("../controllers/dbController");
const passport = require("passport");
const jwt = require("../config/jwt");
const asyncHandler = require("express-async-handler");
const {
  findOAuthTokenByOID,
  findAccountByAccountId,
  createQueue,
} = require("../db/authQueries");

router.get("/", (req, res, next) => {
  res.send("Home");
});
router.get("/landingPage/:acctSlug", customerController.landing_page);
router.get(
  "/outletLandingPage/:acctSlug/:outletId",
  customerController.outlet_landing_page
);

//* CUSTOMER ROUTES *//
router.get(
  "/customerForm/:acctSlug/:outletId/:queueId",
  customerController.customer_form_get
);
router.post(
  "/customerForm/:acctSlug/:outletId/:queueId",
  customerController.customer_form_post
);
router.post(
  "/customerFormRepost/:acctSlug/:outletId/:queueId",
  customerController.customer_form_repost
);

router.post(
  "/customerQuit/:acctSlug/:queueId/:queueItemId",
  customerController.customer_quit_queue_post
);

router.post(
  "/customerUpdatePax/:acctSlug/:queueId/:queueItemId",
  customerController.customer_update_pax_post
);

//* ACCOUNT ROUTES *//
router.post("/login", authController.normal_login);
router.post("/register", authController.normal_register_form_post);
router.get("/dashboard", jwt.authAccessToken, (req, res, next) => {
  res.send("Hey we got past the protected routes!");
});
router.post("/refresh", refreshController.handle_refresh_token);

//* DASHBOARD ROUTES *//
router.get("/sidenav/:accountId", dbController.sidenav_outlet_get);
router.get("/allOutlets/:accountId", dbController.all_outlets_get);
router.patch(
  "/updateOutlet/:accountId/:outletId",
  dbController.update_outlet_patch
);
router.post("/newOutlet/:accountId", dbController.new_outlet_post);
router.get(
  "/queueActivity/:accountId/:outletId",
  dbController.queue_activity_get
);
router.get("/activeQueue/:queueId", dbController.active_queue_get);
router.post("/newQueue/:accountId/:outletId", dbController.new_queue_post);

router.post("/newCustomer/:queueId", dbController.new_customer_post);
router.post("/customerRepost/:queueId", dbController.new_customer_repost);

//This is testing for protected route
router.post(
  "/test",
  jwt.authAccessToken,
  asyncHandler(async (req, res, next) => {
    const oid = req.cookies.oid;
    const oAuthToken = await findOAuthTokenByOID(oid);
    console.log("Found OAuthToken:", oAuthToken);

    if (!oAuthToken) {
      return res.status(400).json({ error: "Invalid or missing OAuthToken" });
    }

    const account = await findAccountByAccountId(oAuthToken.accountId);

    if (!account) {
      return res.status(400).json({ error: "Associated Account not found" });
    }

    // const data = { ...req.body, accountId: account.id };
    // const createFakeOutlet = await createOutlet(data);

    // const data = { ...req.body, accountId: account.id };
    // const updateLogo = await updateAccount(data);
    // console.log(updateLogo);

    const data = { ...req.body, accountId: account.id };
    const startFakeQueue = await createQueue(data);
    console.log("Started fake queue? ", startFakeQueue);

    // const existingCustomer = await findCustomerByAcctIdAndNumber({
    //   accountId: "bb1510ea-b77f-4cdb-b6b5-6c999fa657b8",
    //   number: req.body.number,
    // });

    // if (existingCustomer) {
    //   const dataForQueueItem = {
    //     queueId: req.body.queueId,
    //     customerId: existingCustomer.id,
    //     pax: req.body.pax,
    //   };
    //   const newQueueItem = await createAQueueItem(dataForQueueItem);
    // } else {
    //   const dataForCustomer = {
    //     name: req.body.customerName,
    //     number: req.body.number,
    //     VIP: req.body.VIP,
    //     accountId: "bb1510ea-b77f-4cdb-b6b5-6c999fa657b8",
    //   };
    //   const newCustomer = await createACustomer(dataForCustomer);
    //   const dataForQueueItem = {
    //     queueId: req.body.queueId,
    //     customerId: newCustomer.id,
    //     pax: req.body.pax,
    //   };
    //   const newQueueItem = await createAQueueItem(dataForQueueItem);
    // }

    // const dataFindQueueId = {
    //   accountId: account.id,
    //   outlet: 1,
    // };
    // const findQueueId = await findActiveQueuesByOutletAndAccountId(
    //   dataFindQueueId
    // );
    // console.log(findQueueId);

    res.status(200).json({
      message: "Sending response from /test post",
    });
  })
);

module.exports = {
  router,
};
