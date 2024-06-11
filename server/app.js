const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

// Middleware
app.use(express.json()); // Use express.json() for parsing JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // bodyParser for handling URL-encoded bodies
app.use(cookieParser()); // Cookie parser middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from localhost:3000
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);
app.use("/", express.static("uploads")); // Serve static files from the "uploads" directory

// Config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: "server/config/.env",
  });
}

// Import routes
const user = require("./controller/user");
const shop = require("./controller/shop");

// Mount routes
app.use("/api/v2/user", user); // Mount user routes under /api/v2/user
app.use("/api/v2/shop", shop); // Mount user routes under /api/v2/shop

// Error handling middleware - should be placed at the end
app.use(ErrorHandler);

module.exports = app;
