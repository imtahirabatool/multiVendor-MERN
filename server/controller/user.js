const express = require("express");
const fs = require("fs/promises");
const path = require("path"); // Import path module
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();
const { upload } = require("../multer");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail"); // Import sendMail function

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      await fs.unlink(filePath); // Remove the uploaded file
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
    await user.save();

    // Create activation token
    const activationToken = createActivationToken({ email });

    // Create activation URL
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    // Send activation email
    await sendMail({
      email: email,
      subject: "Activate your account",
      message: `Hello ${name}, please click on the link to activate your account: ${activationUrl}`,
    });

    // Respond with success message
    res.status(201).json({
      success: true,
      message: `Please check your email (${email}) to activate your account!`,
    });
  } catch (error) {
    // Handle errors
    console.error("Error creating user:", error);
    return next(new ErrorHandler("Error creating user!", 500));
  }
});

// Create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m", 
  });
};

module.exports = router;
