const asyncHandler = require("express-async-handler");
const { getStaffByNameAndAccountId } = require("../db/authQueries");

const checkIfStaffNameExists = asyncHandler(async (req, res, next) => {
  const { name, accountId } = req.body; //! Assuming these are in the request body. Check if correct!

  if (!name || !accountId) {
    return res
      .status(400)
      .json({ message: "Staff name and account ID are required." });
  }

  const existingStaff = await getStaffByNameAndAccountId(name, accountId);

  if (existingStaff) {
    return res.status(409).json({
      message:
        "A staff member with this name already exists within this company. Please choose a different name.",
    });
  }
  next();
});

module.exports = checkIfStaffNameExists;
