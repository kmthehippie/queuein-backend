const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const accessTokenExpiry = parseInt(process.env.ACCESS_TOKEN_EXPIRY);
const refreshTokenExpiry = parseInt(process.env.REFRESH_TOKEN_EXPIRY);
const queueItemSecret = process.env.QUEUE_ITEM_SECRET;

exports.generateAccessToken = (account) => {
  console.log(
    `Generated access token for ${account.companyName} which expires in ${accessTokenExpiry}`
  );
  return jwt.sign(
    { id: account.id, companyName: account.companyName },
    accessTokenSecret,
    {
      expiresIn: accessTokenExpiry,
    }
  );
};

exports.generateRefreshToken = (account) => {
  console.log(
    `Generated refresh token for ${account.companyName} which expires in ${refreshTokenExpiry}`
  );
  return jwt.sign(
    { id: account.id, companyName: account.companyName },
    refreshTokenSecret,
    { expiresIn: refreshTokenExpiry }
  );
};

exports.authAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("Trying to authorize the access token: ", authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access Token Required" });
  }

  jwt.verify(token, accessTokenSecret, (err, account) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Access Token" });
    }
    req.account = account;
    console.log(`Verifying access token for the account ${req.account}`);
    next();
  });
};

exports.refreshTokenDecoded = (req, res, next) => {
  console.log("Refresh token decoded: ", req.cookies.jwt);
  const refreshToken = req.cookies.jwt;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh Token Required" });
  }

  jwt.verify(refreshToken, refreshTokenSecret, (err, decoded) => {
    if (err) {
      console.error("Error verifying refresh token in middleware:", err);
      return res.status(403).json({ message: "Invalid Refresh Token" });
    }
    req.decodedRefreshToken = decoded;
    next();
  });
};

exports.generateQueueItemToken = (queueItemId) => {
  console.log(`Generated queue item token for queue item id: ${queueItemId}`);
  return jwt.sign({ queueItemId: queueItemId }, queueItemSecret, {
    expiresIn: "1d",
  });
};

exports.verifyQueueItemToken = (token) => {
  try {
    const decoded = jwt.verify(token, queueItemSecret);
    return decoded;
  } catch (err) {
    console.error("Error verifying queue item token:", err);
    return null;
  }
};
