// middleware/validationResultHandler.js
const { validationResult } = require("express-validator");

const handleValidationResult = (req, res, next) => {
  console.log(req.body);
  console.log(req.params);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "There is error in handling validation",
      errors: errors.array(),
    });
  }
  console.log("Handled validation in middleware ", req.body);
  next();
};

module.exports = handleValidationResult;
