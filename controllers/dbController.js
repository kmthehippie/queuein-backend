const asyncHandler = require("express-async-handler");
const { header, body, param } = require("express-validator");
const handleValidationResult = require("../middleware/validationResult");
const { findOutletsByAcctId } = require("../db/authQueries");

exports.sidenav_outlet_get = [
  param("accountId").notEmpty().withMessage("Params cannot be empty"),
  asyncHandler(async (req, res, next) => {
    console.log(req.params);
    const accountId = req.params.accountId;
    // 1. Find account related outlets
    const outlets = await findOutletsByAcctId(accountId);
    // 2. for the outlets found, create a simplified version to be sent back to front end.
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
  asyncHandler(async (req, res, next) => {
    console.log(req.params);
    const accountId = req.params.accountId;
    // 1. Find account related outlets
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
