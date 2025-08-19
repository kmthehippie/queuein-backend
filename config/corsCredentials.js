// const allowedOrigins = require("../config/allowedOrigins");

// const corsCredentials = (req, res, next) => {
//   const origin = req.headers.origin;
//   console.log("The allowed origins: ", allowedOrigins);

//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET, POST, PUT, PATCH, DELETE"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Content-Type, Authorization"
//     );
//     res.setHeader("Access-Control-Allow-Credentials", true);
//   }

//   if (req.method === "OPTIONS") {
//     res.setHeader("Access-Control-Allow-Origin", origin); // Set CORS headers for preflight response
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET, POST, PUT, PATCH, DELETE"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Content-Type, Authorization"
//     );
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     res.sendStatus(200); // Preflight request successful
//   } else {
//     next();
//   }
// };

// module.exports = corsCredentials;

const allowedOrigins = require("../config/allowedOrigins");

const corsCredentials = (req, res, next) => {
  const origin = req.headers.origin;
  const isAllowed = allowedOrigins.includes(origin) || !origin;

  if (isAllowed) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
  }

  // Handle preflight requests by sending a 200 OK after headers are set
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  // For all other requests, pass control to the next middleware
  next();
};

module.exports = corsCredentials;
