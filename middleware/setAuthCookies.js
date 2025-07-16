const refreshTokenExpiry = parseInt(
  process.env.REFRESH_TOKEN_EXPIRY_FOR_COOKIES
);
const oidExpiry = parseInt(process.env.OID_EXPIRY_FOR_COOKIES);

const setAuthCookies = (req, res, next, refreshToken, id) => {
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    maxAge: refreshTokenExpiry,
    secure: true, // IMPORTANT: Set this to true
    path: "/",
  });

  res.cookie("oid", id, {
    httpOnly: true,
    sameSite: "None",
    maxAge: oidExpiry,
    secure: true, // IMPORTANT: Set this to true
    path: "/",
  });
  next();
};

module.exports = { setAuthCookies };
