const asyncHandler = require("express-async-handler");
const { header, body } = require("express-validator");
const handleValidationResult = require("../middleware/validationResult");
const passwordUtils = require("../config/passwordUtils");
const jwt = require("../config/jwt");
const passport = require("passport");
const { setAuthCookies } = require("../middleware/setAuthCookies");
const slugify = require("../config/slugify");
const axios = require("axios");
const { encrypt, decrypt } = require("../utils/encryption");

const {
  deleteOAuthToken,
  getAccountEmail,
  createAccount,
  createStaff,
  createOAuthToken,
  updateOAuthToken,
  findOAuthTokenByAccountIdAndUserAgent,
  findOAuthTokenByRefreshToken,
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
  body("email", "Invalid credentials").trim().isEmail().normalizeEmail(),
  body("password", "Invalid credentials")
    .trim()
    .isLength({ min: 6 })
    .notEmpty(),
  body("rememberDevice", "'Remember Device' is not a boolean")
    .optional()
    .isBoolean()
    .toBoolean(),
  handleValidationResult,
  passport.authenticate("local", { session: false }),
  asyncHandler(async (req, res, next) => {
    const accountExist = req.user;
    // Decrypt sensitive fields if needed (though not sent back in response)
    if (accountExist.companyName)
      accountExist.companyName = decrypt(accountExist.companyName);
    if (accountExist.companyEmail)
      accountExist.companyEmail = decrypt(accountExist.companyEmail);
    delete accountExist.password;

    console.log(
      "Account exists as req.user after passport authenticates it: ",
      accountExist
    );
    const { rememberDevice } = req.body;
    const userAgent = req.get("User-Agent");
    const accessToken = jwt.generateAccessToken(accountExist);
    const refreshToken = jwt.generateRefreshToken(accountExist);
    console.log("Do we remember device? ", rememberDevice);
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
            accessToken: accessToken,
            refreshToken: refreshToken,
            lastLoggedIn: new Date(),
          });
          setAuthCookies(req, res, refreshToken, existingOAuthToken.id);
        } else {
          console.log(
            "New device, create a new token ",
            accountExist.companyName
          );
          const newOAuthToken = await createOAuthToken({
            provider: "LOCAL",
            accessToken: accessToken,
            refreshToken: refreshToken,
            accountId: accountExist.id,
            userAgent: userAgent,
            lastLoggedIn: new Date(),
          });
          setAuthCookies(req, res, refreshToken, newOAuthToken.id);
        }
      } catch (error) {
        console.error("Error handling OAuthToken:", error);
        return sendInvalidCredentialsError(res);
      }
    } else {
      setAuthCookies(req, res, refreshToken);
    }
    console.log("Returning res.status 201");
    setAuthCookies(req, res, refreshToken, newOAuthToken.id);
    return res.status(201).json({
      message: "Logged In Successfully.",
      accountId: accountExist.id,
      accessToken: accessToken,
      businessType: accountExist.businessType,
      acctSlug: accountExist.slug,
    });
  }),
];
const businessType = {
  BASIC: "BASIC",
  CLINIC: "CLINIC",
  RESTAURANT: "RESTAURANT",
};
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
  body("accountInfo.businessType")
    .trim()
    .isIn(Object.values(businessType))
    .withMessage("Invalid Business Type"),
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
    console.log("Register attempt received:", req.body); // Add this
    const { accountInfo, ownerInfo } = req.body;
    const userAgent = req.get("User-Agent");

    const {
      companyEmail,
      password: accountPassword,
      companyName,
      businessType,
    } = accountInfo;
    console.log("Account info in register: ", accountInfo);
    const {
      name: ownerName,
      email: ownerEmail,
      password: ownerPassword,
    } = ownerInfo;

    // Encrypt sensitive fields
    const encryptedCompanyName = encrypt(companyName);
    const encryptedCompanyEmail = encrypt(companyEmail);
    const encryptedOwnerName = encrypt(ownerName);
    const encryptedOwnerEmail = encrypt(ownerEmail);

    const accountExist = await getAccountEmail(encryptedCompanyEmail);
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
        companyName: encryptedCompanyName,
        companyEmail: encryptedCompanyEmail,
        businessType: businessType,
        password: hashedPassword,
        hasPassword: true,
        slug: slug,
      });

      if (!newAccount) {
        return sendServerError(res, "Error creating new account");
      }

      const hashedOwnerPassword = await passwordUtils.generatePw(ownerPassword);
      const newOwner = await createStaff({
        name: encryptedOwnerName,
        role: "TIER_1",
        email: encryptedOwnerEmail,
        accountId: newAccount.id,
        password: hashedOwnerPassword,
      });

      if (!newOwner) {
        return sendServerError(res, "Error creating new owner");
      }
      console.log("A new owner is created ", newOwner);

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
      console.log("Account created successfully:", newAccount.id); // Add this
      return res.status(201).json({
        message: "Account created successfully",
        accountId: newAccount.id,
        accessToken,
        oid: newOAuthToken.id,
        businessType: newAccount.businessType,
        acctSlug: newAccount.slug,
        companyName: decrypt(newAccount.companyName),
      });
    } catch (error) {
      console.error("Registration error:", error);
      if (!res.headersSent) {
        return sendServerError(
          res,
          "An unexpected error occurred during registration"
        );
      }
    }
  }),
];

exports.normal_logout = [
  asyncHandler(async (req, res, next) => {
    const { accountId } = req.params;
    const oid = req.cookies.oid;
    const refreshToken = req.cookies.jwt;

    const cookieOptions = {
      httpOnly: true,
      secure: true, // Set to true in production
      sameSite: "None",
      path: "/",
    };

    try {
      const oAuthTokenExist = await findOAuthTokenByRefreshToken(refreshToken);
      if (oAuthTokenExist) {
        const data = {
          oid: oAuthTokenExist.id,
          refreshToken: oAuthTokenExist.refreshToken,
          accountId: oAuthTokenExist.accountId,
        };
        await deleteOAuthToken(data);
      } else {
        console.log("No refresh token or OID cookie found to invalidate.");
      }
    } catch (error) {
      console.error(
        "Error deleting OAuthToken from database during logout:",
        error
      );
    } finally {
      res.clearCookie("jwt", cookieOptions);
      res.clearCookie("oid", cookieOptions);
      console.log("Successfully logged out!");
      return res.status(200).json({ message: "Logged out successfully." });
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

exports.firebase_proxy_get = asyncHandler(async (req, res, next) => {
  const { scriptName } = req.params;
  const validScripts = ["firebase-app.js", "firebase-messaging.js"];

  if (!validScripts.includes(scriptName)) {
    return res.status(404).send("// Script not found.");
  }

  try {
    const compatScriptName = scriptName.replace(".js", "-compat.js");
    const scriptUrl = `https://www.gstatic.com/firebasejs/9.23.0/${compatScriptName}`;
    const response = await axios.get(scriptUrl, {
      responseType: "text",
    });

    res.setHeader("Content-Type", "application/javascript");
    res.send(response.data);
  } catch (error) {
    console.error(`Failed to proxy Firebase script ${scriptName}:`, error);
    res.status(500).send("// Failed to load script from proxy");
  }
});
