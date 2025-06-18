// middleware/validationResultHandler.js
const { validationResult } = require("express-validator");

const handleValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "There is error in handling validation",
      errors: errors.array(),
    });
  }

  next();
};

module.exports = handleValidationResult;
