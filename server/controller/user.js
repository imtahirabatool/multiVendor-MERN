const express = require("express");
const User = require("../model/user");
const path = require("path");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;
  const userEmail = await User.findOne({ email });
  if (userEmail) {
    return next(new ErrorHandler("User already Exits.", 400));
  }
});
