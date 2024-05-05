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

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      await fs.unlink(filePath);
      return next(new ErrorHandler("User already exists.", 400));
    }

    // Generate file URL using path.join
    const fileURL = path.join(__dirname, "..", "uploads", req.file.filename);

    // Create user object
    const user = new User({
      name: name,
      email: email,
      password: password,
      avatar: fileURL,
    });

    // Save user to database
    // await user.save();

    // Create activation token
    const activationToken = createActivationToken({ email });
    console.log("first activation token" + activationToken);

    // Create activation URL
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email: email,
        subject: "Activate Your account",
        message: ` Hello ${name},\n\t Please click on the link below to activate your account:\n\n${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email:-\n\t${email} to activate your account`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }

    // Send activation email
    // await sendMail({
    //   email: user.email,
    //   subject: "Activate your account",
    //   message: Hello ${user.name}, please click on the link to activate your account: ${activationUrl},
    // });

    // // Respond with success message
    // res.status(201).json({
    //   success: true,
    //   message: Please check your email (${user.email}) to activate your account!,
    // });
  } catch (error) {
    // Handle errors
    console.error("Error creating user:", error);
    return next(new ErrorHandler("Error creating user!", 500));
  }
});

// Create activation token
const createActivationToken = (email) => {
  return jwt.sign(email, process.env.ACTIVATION_SECRET, {
    expiresIn: process.env.ACTIVATION_EXPIRES,
  });
};

// activate user
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUser = verify(activation_token.process.env.ACTIVATION_SECRET);

      if (!newUser) {
        return next(new ErrorHandler("Invalid Token", 400));
      }
      const { name, email, password, avatar } = newUser;
      User.create({
        name,
        email,
        password,
        avatar,
      });
      sendToken(newUser, 201, res);
    } catch (error) {}
  })
);

module.exports = router;
