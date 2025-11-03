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

const admin = require("firebase-admin");
const serviceAccount = require("./config/serviceAccountKey.json");
try {
  const serviceAccount = require("./config/serviceAccountKey.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase Admin SDK initialized successfully.");
} catch (error) {
  console.error(
    "Failed to initialize Firebase Admin SDK. Make sure serviceAccountKey.json is present and valid.",
    error.message
  );
}
app.use(express.static(path.join(__dirname, "/public")));

const indexRouter = require("./routes/indexRouter").router;

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
app.use(cors(corsOptions)); // Apply the cors package middleware
app.use(cookieParser()); // Apply cookie-parser AFTER CORS
app.use(passport.initialize());
require("./config/passportConfig");

app.set("trust proxy", 1);

app.use("/", indexRouter);

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
