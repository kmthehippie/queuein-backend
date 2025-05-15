const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const allowedOrigins = require("./config/allowedOrigins");
const http = require("http");
const setupSocket = require("./socket");

app.use(express.static(path.join(__dirname, "/public")));

const indexRouter = require("./routes/indexRouter").router;

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions)); // Apply the cors package middleware
app.use(cookieParser()); // Apply cookie-parser AFTER CORS
app.use(passport.initialize());
require("./config/passportConfig");
app.use("/", indexRouter);

const server = http.createServer(app);
setupSocket(server);
server.listen(process.env.PORT, () => {
  console.log(`App is now listening on port ${process.env.PORT}`);
});

//* App.listen removed because server.listen is working instead
// app.listen(process.env.PORT, () => {
//   console.log(`App is now listening on port ${process.env.PORT}`);
// });
