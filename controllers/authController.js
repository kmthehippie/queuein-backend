const asyncHandler = require("express-async-handler");
const { header, body, validationResult } = require("express-validator");
const handleValidationResult = require("../middleware/validationResult");
const passwordUtils = require("../config/passwordUtils");
const jwt = require("../config/jwt");
const { setAuthCookies } = require("../middleware/setAuthCookies");
const slugify = require("../config/slugify");

const {
  deleteAllOAuthToken,
  deleteOAuthTokenByRefreshToken,
  findOAuthTokenByOID,
  deleteOAuthTokenByOID,
  getAccountEmail,
  createAccount,
  createStaff,
  createOAuthToken,
  updateOAuthToken,
  findOAuthTokenByAccountIdAndUserAgent,
  findExistingSlug,
} = require("../db/authQueries");

// Helper function for sending server errors
const sendServerError = (res, message) => {
  return res.status(500).json({ message });
};

// Helper function for sending invalid credentials error
const sendInvalidCredentialsError = (res) => {
  return res.status(409).json({ message: "Invalid credentials" });
};
exports.normal_login = [
  //Validate the header
  header("User-Agent")
    .notEmpty()
    .withMessage("User-Agent header is required")
    .isString()
    .withMessage("User-Agent must be a string")
    .isLength({ min: 5, max: 255 }) // Example length constraints
    .withMessage("User-Agent must be between 5 and 255 characters")
    .matches(/Mozilla\/\d+\.\d+/, "i"),
  // Validate input
  body("credentials.email", "Invalid credentials")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("credentials.password", "Invalid credentials")
    .trim()
    .isLength({ min: 6 })
    .notEmpty(),
  body("credentials.rememberDevice", "'Remember Device' is not a boolean")
    .optional()
    .isBoolean()
    .toBoolean(),
  handleValidationResult,

  asyncHandler(async (req, res, next) => {
    const { email, password, rememberDevice } = req.body.credentials;
    const userAgent = req.get("User-Agent");

    const accountExist = await getAccountEmail(email);
    console.log("Account exist? ", accountExist.companyName);
    if (!accountExist) return sendInvalidCredentialsError(res);
    if (!(await passwordUtils.validatePw(accountExist.password, password)))
      return sendInvalidCredentialsError(res);

    const accessToken = jwt.generateAccessToken(accountExist);
    const refreshToken = jwt.generateRefreshToken(accountExist);

    if (rememberDevice) {
      try {
        const existingOAuthToken = await findOAuthTokenByAccountIdAndUserAgent(
          accountExist.id,
          userAgent
        );
        if (existingOAuthToken) {
          console.log(
            "Device already remembered, update tokens ",
            existingOAuthToken.id
          );
          // Device already remembered, update tokens
          await updateOAuthToken({
            id: existingOAuthToken.id,
            accessToken,
            refreshToken,
            lastLoggedIn: new Date(),
          });
          setAuthCookies(req, res, next, refreshToken, existingOAuthToken.id);
        } else {
          console.log(
            "New device, create a new token ",
            accountExist.companyName
          );
          const newOAuthToken = await createOAuthToken({
            provider: "LOCAL",
            accessToken,
            refreshToken,
            accountId: accountExist.id,
            userAgent,
            lastLoggedIn: new Date(),
          });
          setAuthCookies(req, res, next, refreshToken, newOAuthToken.id);
        }
      } catch (error) {
        console.error("Error handling OAuthToken:", error);
        return sendServerError(res, "Database error during login.");
      }
    } else {
      setAuthCookies(req, res, next, refreshToken);
    }
    return res.status(201).json({
      message: "Logged In Successfully.",
      accountId: accountExist.id,
      accessToken: accessToken,
    });
  }),
];

exports.normal_register_form_post = [
  //Validate the header
  header("User-Agent")
    .notEmpty()
    .withMessage("User-Agent header is required")
    .isString()
    .withMessage("User-Agent must be a string")
    .isLength({ min: 5, max: 255 })
    .withMessage("User-Agent must be between 5 and 255 characters")
    .matches(/Mozilla\/\d+\.\d+/, "i"),
  // Validate accountInfo
  body("accountInfo.companyName", "Company name must be a string")
    .trim()
    .isString()
    .escape(),
  body("accountInfo.companyEmail", "Company email is not valid")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("accountInfo.password", "Password must be at least 6 characters long")
    .isLength({ min: 6 })
    .notEmpty()
    .trim(),

  // Validate ownerInfo
  body("ownerInfo.name", "Owner name must be a string")
    .trim()
    .isString()
    .escape(),
  body("ownerInfo.email", "Owner email is not valid")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("ownerInfo.role", "Owner role must be a string")
    .trim()
    .isString()
    .escape(),
  body("ownerInfo.password", "Password must be at least 6 characters long")
    .isLength({ min: 6 })
    .notEmpty()
    .trim(),

  handleValidationResult,

  asyncHandler(async (req, res, next) => {
    const { accountInfo, ownerInfo } = req.body;
    const userAgent = req.get("User-Agent");
    const {
      companyEmail,
      password: accountPassword,
      companyName,
    } = accountInfo;
    const {
      name: ownerName,
      email: ownerEmail,
      password: ownerPassword,
    } = ownerInfo;

    const accountExist = await getAccountEmail(companyEmail);

    if (accountExist) {
      return res
        .status(409)
        .json({ message: "Email Account already exist in system" });
    }

    try {
      let slug = slugify.slugify(companyName);
      let isSlugUnique = false;
      let counter = 1;
      while (!isSlugUnique) {
        const existingAccountWithSlug = await findExistingSlug(slug);
        if (!existingAccountWithSlug) {
          isSlugUnique = true;
        } else {
          counter++;
          slug = slugify(`${companyName}-${counter}`);
        }
      }
      const hashedPassword = await passwordUtils.generatePw(accountPassword);
      const newAccount = await createAccount({
        companyName,
        companyEmail,
        password: hashedPassword,
        hasPassword: true,
        slug: slug,
      });

      if (!newAccount) {
        return sendServerError(res, "Error creating new account");
      }

      const hashedOwnerPassword = await passwordUtils.generatePw(ownerPassword);
      const newOwner = await createStaff({
        name: ownerName,
        role: "OWNER",
        email: ownerEmail,
        accountId: newAccount.id,
        password: hashedOwnerPassword,
      });

      if (!newOwner) {
        return sendServerError(res, "Error creating new owner");
      }

      const accessToken = jwt.generateAccessToken(newAccount);
      const refreshToken = jwt.generateRefreshToken(newAccount);

      const newOAuthToken = await createOAuthToken({
        provider: "LOCAL",
        accessToken,
        refreshToken,
        accountId: newAccount.id,
        userAgent: userAgent,
      });

      if (!newOAuthToken) {
        return sendServerError(res, "Error creating auth token");
      }

      setAuthCookies(req, res, next, refreshToken, newOAuthToken.id);
      return res.status(201).json({
        message: "Account created successfully",
        accountId: newAccount.id,
        accessToken,
        oid: newOAuthToken.id,
      });
    } catch (error) {
      console.error("Registration error:", error);
      return sendServerError(
        res,
        "An unexpected error occurred during registration"
      );
    }
  }),
];

exports.google_register_form_post = [
  asyncHandler(async (req, res, next) => {
    console.log("Google register form: ", req);
  }),
  //First get data from react (this would likely be the Google ID token or profile info)
  //Validate the data from react
  //Check if the email (from Google profile) has already been used to create an ACCOUNT
  //If not, create an account with just the email.
  //CreateOwnerGoogle to immediately create the staff (using Google profile info).
  //Create OAuthToken for user to be logged in (linking Google credentials to the account).
  //Respond to the client with a success and potentially a redirect URL to the google_success page.
  //Handle the case where the Google email already exists.
];

exports.google_success_register_form_post = [
  //Validate data from react (companyName, potentially password choice)
  //Find the Account created during the initial Google registration (likely by email).
  //Update the Account with the rest of the info from the success register form (companyName, logo, etc.).
  //If the user chose to set a password, update the password and set hasPassword to true.
  //Potentially update the Owner Staff record with more details if provided.
  //Respond to the client with a success message and potentially a redirect to the dashboard.
];

exports.logout_post = [];
