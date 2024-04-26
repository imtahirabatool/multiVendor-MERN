const express = require("express");
const path = require("path");
const fs = require("fs/promises"); // Import the filesystem module
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();
const { upload } = require("../multer");

// Create User Router
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      throw new ErrorHandler("User already exists.", 400);
    }

    const fileURL = path.join(__dirname, "..", "uploads/", req.file.filename);

    const user = new User({
      name: name,
      email: email,
      password: password,
      avatar: fileURL,
    });

    console.log(user);
    await user.save();

    res.status(200).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error:", error.message);
    next(new ErrorHandler("Error saving file.", 500));
  }
});

module.exports = router;
