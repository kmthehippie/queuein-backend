const asyncHandler = require("express-async-handler");
const {
  findOAuthTokenByRefreshToken,
  deleteOAuthTokenByRefreshToken,
  updateOAuthToken,
} = require("../db/authQueries");
const { generateAccessToken, refreshTokenDecoded } = require("../config/jwt");

exports.handle_refresh_token = [
  refreshTokenDecoded,
  asyncHandler(async (req, res, next) => {
    const refreshToken = req.cookies.jwt;
    const oid = req.cookies.oid;
    const decoded = req.decodedRefreshToken;
    console.log("refreshing: ", refreshToken, oid, decoded);

    if (decoded && decoded.exp) {
      const time = Math.floor(Date.now() / 1000);
      console.log(
        "Expired Refresh Token (from middleware)?",
        decoded.exp < time
      );
    }

    const OAuthToken = await findOAuthTokenByRefreshToken(refreshToken);
    if (!OAuthToken) {
      await deleteOAuthTokenByRefreshToken(refreshToken);
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

    // Ensure the decoded ID matches the OAuthToken's account ID (good practice)
    // if (decoded.id !== OAuthToken.account.id) {
    //   console.warn("Decoded token ID does not match OAuthToken account ID.");
    //   await deleteOAuthTokenByRefreshToken(refreshToken);
    //   return res.status(401).json({ message: "Invalid token data." });
    // }

    const account = OAuthToken.account;
    console.log("Account id in refresh controller: ", account.id);

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
  }),
];
