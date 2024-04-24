const express = require("express");
const path = require("path");
const fs = require("fs/promises"); // Import the filesystem module
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();
const { upload } = require("../multer");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;
  const userEmail = await User.findOne({ email });
  if (userEmail) {
    return next(new ErrorHandler("User already Exists.", 400));
  }

  // Construct file URL with the uploads folder path
  const fileURL = path.join(__dirname, "..", "uploads", req.file.filename);

  // Move the uploaded file to the uploads folder
  try {
    await fs.rename(req.file.path, fileURL);
  } catch (error) {
    return next(new ErrorHandler("Error saving file.", 500));
  }

  const user = {
    name: name,
    email: email,
    password: password,
    avatar: fileURL, // Save the file URL in the user object
  };

  console.log(user);

  // Here you would typically save the user object to the database

  res.status(200).json({ message: "User created successfully", user });
});

module.exports = router;
