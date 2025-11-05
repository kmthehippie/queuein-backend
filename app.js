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
const startCronJobs = require("./helper/cronJobs");

const admin = require("./config/firebaseAdminConfig");
console.log("Firebase Admin SDK loaded and ready.");

app.use(express.static(path.join(__dirname, "/public")));

const { router: indexRouter } = require("./routes/indexRouter");

const corsOptions = {
  origin: (origin, callback) => {
    console.log("The allowed origins: ", allowedOrigins);
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
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(passport.initialize());
require("./config/passportConfig");

app.set("trust proxy", 1);
// app.options("*", cors(corsOptions));
app.use("/api", indexRouter);

const server = http.createServer(app);
const io = setupSocket(server);
app.set("io", io);

server.listen(process.env.PORT, () => {
  console.log(`App is now listening on port ${process.env.PORT}`);
  startCronJobs();
});

//* App.listen removed because server.listen is working instead
// app.listen(process.env.PORT, () => {
//   console.log(`App is now listening on port ${process.env.PORT}`);
// });
