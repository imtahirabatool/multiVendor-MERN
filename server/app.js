const express = require("express");
const ErrorHandler = require("./utils/ErrorHandler");
// const fileUpload = require("express-fileupload");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cookieParser());
app.use("/", express.static("uploads"))
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload({ useTempFiles: true }));

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "server/config/.env",
  });
}

//import routes
const user = require("./controller/user");

app.use("api/v2/user", user);


// Error handling middleware
app.use(ErrorHandler);

module.exports = app;
