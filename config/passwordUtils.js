const bcrypt = require("bcryptjs");

exports.generatePw = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    throw err;
  }
};

exports.validatePw = async (dbPassword, password) => {
  if (!dbPassword) {
    return false;
  }
  if (!password) {
    return false;
  }
  try {
    const match = await bcrypt.compare(password, dbPassword);
    return match;
  } catch (err) {
    return false;
  }
};
