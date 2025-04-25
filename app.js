const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/public")));

app.listen(process.env.PORT, () => {
  console.log(`App is now listening on port ${process.env.PORT}`);
});
