const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY;
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY;

exports.generateAccessToken = (account) => {
  return jwt.sign(
    { id: account.id, companyName: account.companyName },
    accessTokenSecret,
    {
      expiresIn: accessTokenExpiry,
    }
  );
};

exports.generateRefreshToken = (account) => {
  return jwt.sign(
    { id: account.id, companyName: account.companyName },
    refreshTokenSecret,
    { expiresIn: refreshTokenExpiry }
  );
};

exports.authAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access Token Required" });
  }
  jwt.verify(token, accessTokenSecret, (err, account) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Access Token" });
    }
    req.account = account;
    next(); // Only call next() if the access token is valid
  });
};

exports.authRefreshToken = (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh Token Required" });
  }
  jwt.verify(refreshToken, refreshTokenSecret, (err, account) => {
    if (err) return res.status(403).json({ message: "Invalid Refresh Token" });
    const newAccessToken = this.generateAccessToken({ id: account.id });
    res.json({ accessToken: newAccessToken });
  });
  next();
};
