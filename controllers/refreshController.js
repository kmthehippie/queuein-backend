const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const {
  findOAuthTokenByRefreshToken,
  deleteOAuthTokenByRefreshToken,
  updateOAuthToken,
} = require("../db/authQueries");
const { generateAccessToken } = require("../config/jwt");

const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

exports.handle_refresh_token = [
  asyncHandler(async (req, res, next) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      return res
        .status(401)
        .json({ message: "Error. Cookies do not exist for refresh token!" });
    }

    const refreshToken = cookies.jwt;
    const oid = cookies.oid;

    try {
      const expiry = jwt.decode(refreshToken);

      if (expiry && expiry.exp) {
        const time = Math.floor(Date.now() / 1000);
        console.log("Expired Refresh Token?", expiry.exp < time);
      }
      jwt.verify(refreshToken, refreshTokenSecret, async (err, decoded) => {
        //If jwt.verify() throws an error meaning it is an invalid refreshtoken/expired token
        if (err) {
          console.error("Error verifying refresh token", err);
          await deleteOAuthTokenByRefreshToken(refreshToken);
          return res
            .status(401)
            .json({ message: "Error. Invalid or expired refresh token." });
        }

        const OAuthToken = await findOAuthTokenByRefreshToken(refreshToken);
        if (!OAuthToken) {
          return res.status(401).json({
            message: "There is no OAuthToken with this refresh token id",
          });
        }

        if (oid) {
          if (OAuthToken.id !== oid) {
            console.warn("OID cookie does not match OAuthToken ID.");
            await deleteOAuthTokenByRefreshToken({
              refreshToken: refreshToken,
            });
            return res.status(401).json({ message: "Invalid session." });
          }
        }

        const account = OAuthToken.account;
        console.log("Account id in refresh controller: ", account);

        const newAccessToken = generateAccessToken(account);

        await updateOAuthToken({
          id: OAuthToken.id,
          accessToken: newAccessToken,
          lastLoggedIn: new Date(),
        });

        return res.status(200).json({
          message: "Access token refreshed successfully!",
          accountId: account.id,
          accessToken: newAccessToken,
        });
      });
    } catch (err) {
      console.error("Unexpected error during refresh token handling", err);
      return res
        .status(500)
        .json({ message: "Internal server error during refresh." });
    }
  }),
];
