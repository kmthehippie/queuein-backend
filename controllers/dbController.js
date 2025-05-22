const asyncHandler = require("express-async-handler");
const { header, body, param } = require("express-validator");
const handleValidationResult = require("../middleware/validationResult");
const {
  findOutletsByAcctId,
  createOutlet,
  updateOutletByOutletAndAcctId,
} = require("../db/authQueries");

exports.sidenav_outlet_get = [
  param("accountId").notEmpty().withMessage("Params cannot be empty"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    console.log(req.params);
    const accountId = req.params.accountId;
    const outlets = await findOutletsByAcctId(accountId);
    const arrToReturn = outlets.map((outlet) => ({
      name: outlet.name,
      id: outlet.id,
    }));
    console.log(arrToReturn);
    if (!outlets) {
      return res
        .status(404)
        .json({ message: "No outlets associated with this account id" });
    } else {
      return res.status(200).json(arrToReturn);
    }
  }),
];

exports.all_outlets_get = [
  param("accountId").notEmpty().withMessage("Params cannot be empty"),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const accountId = req.params.accountId;
    const outlets = await findOutletsByAcctId(accountId);
    console.log("Here are all outlets data", outlets);
    if (!outlets) {
      return res
        .status(404)
        .json({ message: "No outlets associated with this account id" });
    } else {
      return res.status(200).json(outlets);
    }
  }),
];

exports.update_outlet_patch = [
  param("accountId").notEmpty().withMessage("Params cannot be empty"),
  param("outletId").notEmpty().withMessage("Outlet params cannot be empty"),
  body("name")
    .optional() // This makes the field optional
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long.")
    .trim()
    .escape(),
  body("location")
    .optional({ checkFalsy: true })
    .notEmpty()
    .withMessage("Location cannot be empty if provided.")
    .trim()
    .escape(),
  body("googleMaps")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Google Maps URL must be a valid URL.")
    .notEmpty()
    .withMessage("Google Maps URL cannot be empty if provided.")
    .trim(),
  body("wazeMaps")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Waze Maps URL must be a valid URL.")
    .notEmpty()
    .withMessage("Waze Maps URL cannot be empty if provided.")
    .trim(),
  body("imgUrl")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Image URL must be a valid URL.")
    .notEmpty()
    .withMessage("Image URL cannot be empty if provided.")
    .trim(),
  body("defaultEstWaitTime")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Estimated wait time must be a non-negative integer.")
    .notEmpty()
    .withMessage("Estimated wait time cannot be empty if provided."),
  body("phone")
    .optional({ checkFalsy: true })
    .isLength({ min: 10 })
    .withMessage("Contact number must be at least 10 numbers long.")
    .notEmpty()
    .withMessage("Contact number cannot be empty if provided.")
    .trim()
    .escape(),
  body("hours")
    .optional({ checkFalsy: true })
    .notEmpty()
    .withMessage("Hours cannot be empty if provided.")
    .trim()
    .escape(),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    const params = req.params;
    console.log("These are the params: ", params);
    console.log("This is the body: ", req.body);

    const dataToUpdate = {
      outletId: parseInt(params.outletId),
      accountId: params.accountId,
      ...req.body,
    };
    const updatedOutlet = await updateOutletByOutletAndAcctId(dataToUpdate);
    if (!updatedOutlet) {
      return res
        .status(404)
        .json({ message: "Error. Was not able to update the outlet data." });
    } else {
      return res.status(201).json(updatedOutlet);
    }
  }),
];

exports.new_outlet_post = [
  param("accountId")
    .notEmpty()
    .withMessage("Account ID cannot be empty.")
    .trim()
    .escape(),
  body("name")
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long.")
    .trim()
    .escape(),
  body("location")
    .optional({ checkFalsy: true })
    .escape()
    .isLength({ min: 1 })
    .withMessage("Location cannot be an empty string if provided."),
  body("googleMaps")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("Google Maps URL must be a valid URL."),
  body("wazeMaps")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("Waze Maps URL must be a valid URL."),
  body("imgUrl")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("Image URL must be a valid URL."),
  body("defaultEstWaitTime")
    .notEmpty()
    .withMessage("Estimated wait time is required.")
    .isInt({ min: 0 })
    .withMessage("Estimated wait time must be a non-negative integer.")
    .toFloat(),
  body("phone")
    .optional({ checkFalsy: true })
    .trim()
    .escape()
    .isLength({ min: 10 })
    .withMessage(
      "Contact number must be at least 10 numbers long if provided."
    ),
  body("hours")
    .optional({ checkFalsy: true })
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Hours cannot be an empty string if provided."),
  handleValidationResult,
  asyncHandler(async (req, res, next) => {
    console.log("We are in the new outlet post", req.params);
    console.log(req.body);
    const data = {
      accountId: req.params.accountId,
      ...req.body,
    };
    const createNewOutlet = await createOutlet(data);
    if (!createNewOutlet) {
      return res.status(404).json({ message: "Error creating a new outlet" });
    } else {
      return res.status(201).json(createNewOutlet);
    }
  }),
];
