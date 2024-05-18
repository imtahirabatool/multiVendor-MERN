const express = require("express");
const fs = require("fs/promises");
const path = require("path"); // Import path module
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();
const { upload } = require("../multer");
const catchAsyncError = require("../middleware/catchAsyncError");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      await fs.unlink(filePath); // Using fs.promises.unlink
      return next(new ErrorHandler("User already exists.", 400));
    }

    // Generate file URL using path.join
    const fileURL = path.join(__dirname, "..", "uploads", req.file.filename);

    // Create user object
    const user = new User({
      name,
      email,
      password,
      avatar: fileURL,
    });

    // Save user to database
    await user.save(); // Make sure to save the user

    // Create activation token
    const activationToken = createActivationToken({ name, email, password, avatar: fileURL });
    console.log("First activation token:", activationToken);

    // Create activation URL
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email,
        subject: "Activate Your Account",
        message: `Hello ${name},\n\nPlease click on the link below to activate your account:\n\n${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email: ${email} to activate your account.`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    // Handle errors
    console.error("Error creating user:", error);
    return next(new ErrorHandler("Error creating user!", 500));
  }
});

// Create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: process.env.ACTIVATION_EXPIRES,
  });
};

// Activate user
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

      if (!newUser) {
        return next(new ErrorHandler("Invalid Token", 400));
      }
      const { name, email, password, avatar } = newUser;

      let user = await User.findOne({ email });
      if (user) {
        return next(new ErrorHandler("User already exists!", 400));
      }
      user = await User.create({
        name,
        email,
        password,
        avatar,
      });
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
