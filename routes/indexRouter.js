const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const refreshController = require("../controllers/refreshController");
const customerController = require("../controllers/customerController");
const dbController = require("../controllers/dbController");
const cronTestController = require("../utils/cronjobtester");
const jwt = require("../config/jwt");
const rateLimit = require("express-rate-limit");
const { auth } = require("firebase-admin");

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per `window` (here, per minute)
  message:
    "You have made too many requests to join the queue. Please try again after a minute.",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router.get("/landingPage/:acctSlug", customerController.landing_page);
router.get(
  "/outletLandingPage/:acctSlug/:outletId",
  customerController.outlet_landing_page
);

//* FCM CUSTOMER ROUTE *//
router.post(
  "/notifications/subscribe",
  customerController.customer_subscribe_fcm_post
);
router.get("/firebase-proxy/:scriptName", authController.firebase_proxy_get);

//* CUSTOMER ROUTES *//
router.get(
  "/customerForm/:acctSlug/:queueId",
  customerController.customer_form_get
);
router.post(
  "/customerForm/:acctSlug/:outletId/:queueId",
  limiter,
  customerController.customer_form_post
);
router.post(
  "/customerQuit/:acctSlug/:queueId/:queueItemId",
  customerController.customer_quit_queue_post
);
router.post(
  "/customerUpdatePax/:acctSlug/:queueId/:queueItemId",
  limiter,
  customerController.customer_update_pax_post
);
router.post(
  "/customerWaitingPage/:acctSlug/:queueId/:queueItemId",
  customerController.customer_waiting_page_get
);

//KIOSK-CUSTOMER RELATED ROUTES
router.post(
  "/kiosk/:acctSlug/:outletId/:queueId",
  customerController.customer_kiosk_form_post
);
router.get(
  "/kiosk/:acctSlug/:queueItem",
  customerController.customer_kiosk_get_waiting_data
);
router.post(
  "/kiosk/:acctSlug/:outletId/:queueId/prevQR",
  customerController.customer_get_prev_waiting
);

//CHECKING LOCAL STORAGE SETTING
router.post("/customerVerifyLS", customerController.check_local_storage);

//* ACCOUNT ROUTES *//
router.post("/login", authController.normal_login);
router.post("/register", authController.normal_register_form_post);
router.post("/logout/:accountId", authController.normal_logout);
// router.get("/dashboard", jwt.authAccessToken, (req, res, next) => {
//   res.send("Hey we got past the protected routes!");
// });
router.post("/refresh", refreshController.handle_refresh_token);
router.patch(
  "/assign-staff/:accountId",
  authController.assign_staff_oauth_token
);

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
router.get(
  "/activeQueue/:accountId/:queueId/:outletId",
  dbController.active_queue_get
);
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
router.patch("/maxQueueItems/:queueId", dbController.max_queue_items_patch);

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
router.get(
  "/settings/auditlogs/:accountId",
  dbController.audit_logs_outlet_get
);

//CUSTOMER INFO PAGES
router.get("/customerInfo/:accountId", dbController.customer_info_get);

//DEV ONLY - TESTING CRON JOBS
// if (process.env.NODE_ENV !== "production") {
//   router.post("/test/audit-cleanup", cronTestController.test_audit_log_cleanup);
//   router.post("/test/phone-cleanup", cronTestController.test_phone_cleanup);
//   router.post(
//     "/test/queue-cleanup",
//     cronTestController.test_inactive_queue_cleanup
//   );
//   router.post("/test/usage-reset", cronTestController.test_usage_reset);
// }

module.exports = {
  router,
};
