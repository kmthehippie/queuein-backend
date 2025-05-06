const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const refreshController = require("../controllers/refreshController");
const passport = require("passport");
const jwt = require("../config/jwt");
const asyncHandler = require("express-async-handler");
const { findAllOAuthToken } = require("../db/authQueries");

const { getAllStaff } = require("../db/authQueries");

router.get("/", (req, res, next) => {
  res.send("Home");
});

router.post("/login", authController.normal_login);
router.post("/register", authController.normal_register_form_post);

router.get("/dashboard", jwt.authAccessToken, (req, res, next) => {
  res.send("Hey we got past the protected routes!");
});

router.post("/refresh", refreshController.handle_refresh_token);

//This is testing for protected route
router.post(
  "/staff",
  jwt.authAccessToken,
  asyncHandler(async (req, res, next) => {
    const OAuthToken = await findAllOAuthToken();
    res.status(200).json({
      message: "Sending response from /staff post",
      OAuthToken,
    });
  })
);

module.exports = {
  router,
};
