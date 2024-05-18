const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "server/config/.env",
  });
}

//import routes
const user = require("./controller/user");

// Mount user routes
app.use("/api/v2/user", user); // Added a forward slash (/) before "api/v2/user"

// Error handling middleware
app.use(ErrorHandler);

module.exports = app;
