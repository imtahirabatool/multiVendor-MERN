const express = require("express");
const ErrorHandler = require("./utils/ErrorHandler");
const fileUpload = require("express-fileupload"); 
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");



app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload({ useTempFiles: true })); 


// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "server/config/.env",
  });
}

// Error handling middleware
app.use(ErrorHandler);

module.exports = app;
