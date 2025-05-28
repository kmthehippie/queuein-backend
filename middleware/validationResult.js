// middleware/validationResultHandler.js
const { validationResult } = require("express-validator");

const handleValidationResult = (req, res, next) => {
  console.log("Receiving data for handling validation ", req.body, req.params);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "There is error in handling validation",
      errors: errors.array(),
    });
  }
  console.log(
    "Handled validation in middleware. These are the errors: ",
    errors
  );
  next();
};

module.exports = handleValidationResult;
