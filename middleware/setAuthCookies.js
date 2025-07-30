const refreshTokenExpiry = parseInt(
  process.env.REFRESH_TOKEN_EXPIRY_FOR_COOKIES
);
const oidExpiry = parseInt(process.env.OID_EXPIRY_FOR_COOKIES);

const setAuthCookies = (req, res, next, refreshToken, id) => {
  const cookieOptions = {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    path: "/",
  };

  res.cookie("jwt", refreshToken, {
    ...cookieOptions,
    maxAge: refreshTokenExpiry,
  });

  res.cookie("oid", id, {
    ...cookieOptions,
    maxAge: oidExpiry,
  });
  console.log("Setting auth cookies!");
  next();
};

module.exports = { setAuthCookies };
