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
  "/customerForm/:acctSlug/:queueId",
  customerController.customer_form_get
);
router.post(
  "/customerForm/:acctSlug/:outletId/:queueId",
  customerController.customer_form_post
);
router.post(
  "/customerQuit/:acctSlug/:queueId/:queueItemId",
  customerController.customer_quit_queue_post
);
router.post(
  "/customerUpdatePax/:acctSlug/:queueId/:queueItemId",
  customerController.customer_update_pax_post
);
router.post(
  "/customerWaitingPage/:acctSlug/:queueId/:queueItemId",
  customerController.customer_waiting_page_get
);

//CHECKING LOCAL STORAGE SETTING
router.post("/customerVerifyLS", customerController.check_local_storage);

//* ACCOUNT ROUTES *//
router.post("/login", authController.normal_login);
router.post("/register", authController.normal_register_form_post);
router.post("/logout", authController.normal_logout);
// router.get("/dashboard", jwt.authAccessToken, (req, res, next) => {
//   res.send("Hey we got past the protected routes!");
// });
router.post("/refresh", refreshController.handle_refresh_token);

//* DASHBOARD ROUTES *//
//SIDENAV ROUTE
router.get("/sidenav/:accountId", dbController.sidenav_outlet_get);

//OUTLET RELATED ROUTES
router.get("/allOutlets/:accountId", dbController.all_outlets_get);
router.patch(
  "/updateOutlet/:accountId/:outletId/:uploadType",
  dbController.update_outlet_patch
);
router.delete("/delOutlet/:accountId/:outletId", dbController.outlet_delete);
router.post("/newOutlet/:accountId/:uploadType", dbController.new_outlet_post);
router.get("/outlet/:accountId/:outletId", dbController.qrcode_outlet_get);

//QUEUE RELATED ROUTES
router.get(
  "/queueActivity/:accountId/:outletId",
  dbController.queue_activity_get
);
router.get("/activeQueue/:queueId", dbController.active_queue_get);
router.get(
  "/inactiveQueues/:accountId/:outletId",
  dbController.inactive_queues_get
);
router.post("/newQueue/:accountId/:outletId", dbController.new_queue_post);
router.post(
  "/endQueue/:accountId/:outletId/:queueId",
  dbController.end_queue_post
);

//CUSTOMER OR QUEUEITEM RELATED ROUTES
router.post("/newCustomer/:queueId", dbController.new_customer_post);
router.patch("/seatQueueItem/:queueItemId", dbController.seat_queue_item_patch);
router.patch("/callQueueItem/:queueItemId", dbController.call_queue_item_patch);
router.patch(
  "/noShowQueueItem/:queueItemId",
  dbController.no_show_queue_item_patch
);

//STAFF RELATED ROUTES
router.get("/staffList/:accountId", dbController.staff_list_get);
router.post("/newStaff/:accountId", dbController.new_staff_post);
router.delete("/staff/:accountId/:staffId", dbController.staff_delete);
router.get("/staff/:accountId/:staffId", dbController.staff_get);
router.patch("/staff/:accountId/:staffId", dbController.staff_patch);

//MINI VERIFICATION ROUTE
router.post("/authorisedRole/:accountId", dbController.check_role_post);

//SETTINGS RELATED ROUTES
router.post("/genQRCode/:accountId/:outletId", dbController.qrcode_outlet_post);
router.get("/settings/account/:accountId", dbController.account_details_get);
router.patch(
  "/account/:accountId/:uploadType",
  jwt.authAccessToken,
  dbController.account_details_patch
);

// This is testing for protected route
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
