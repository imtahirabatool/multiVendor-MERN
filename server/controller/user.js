const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();
const { upload } = require("../multer");
const catchAsyncError = require("../middleware/catchAsyncError");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated } = require("../middleware/auth");

// router.post("/create-user", upload.single("file"), async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body;
//     console.log(`Checking if user with email ${email} exists.`);

//     // Validate email and other fields
//     if (!email || !name || !password) {
//       console.log("Missing required fields.");
//       return next(new ErrorHandler("Missing required fields.", 400));
//     }

//     const userEmail = await User.findOne({ email });
//     console.log("Database query result:", userEmail);

//     if (userEmail) {
//       if (req.file) {
//         const filename = req.file.filename;
//         const filePath = `uploads/${filename}`;
//         fs.unlink(filePath);
//         console.log(`File ${filePath} deleted because user already exists.`);
//       }
//       console.log(`User with email ${email} already exists.`);
//       return next(new ErrorHandler("User already exists.", 400));
//     }

//     // Generate file URL using path.join
//         const filename = req.file.filename;
//         const fileURL = path.join(filename)

//     // Create user object
//     const user = new User({
//       name: name,
//       email: email,
//       password: password,
//       avatar: fileURL,
//     });


//     // await user.save();
//     console.log(`User created: ${email}`);

//     // Create activation token
//     const activationToken = createActivationToken(user);
//     console.log("Generated activation token:", activationToken);

//     // Create activation URL
//     const activationUrl = `http://localhost:3000/activation/${activationToken}`;

//     try {
//       await sendMail({
//         email: user.email,
//         subject: "Activate Your Account",
//         message: `Hello ${user.name},\n\nPlease click on the link below to activate your account:\n\n${activationUrl}`,
//       });
//       res.status(201).json({
//         success: true,
//         message: `Please check your email: ${email} to activate your account.`,
//       });
//     } catch (error) {
//       console.error(`Error sending email to ${email}:`, error);
//       return next(new ErrorHandler(error.message, 500));
//     }
//   } catch (error) {
//     // Handle errors
//     console.error("Error creating user:", error);
//     return next(new ErrorHandler("Error creating user!", 500));
//   }
// });

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("User already exist", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate Your account",
        message: `Hello ${user.name},\n\t Please click on the link below to activate you account:\n\n${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email:-\n\t${user.email} to activate your account`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: process.env.ACTIVATION_EXPIRES,
  });
};
// const createActivationToken = (user) => {
//   return jwt.sign(user, process.env.ACTIVATION_SECRET, {
//     expiresIn: process.env.ACTIVATION_EXPIRES,
//   });
// };

// Activate user
// router.post(
//   "/activation",
//   catchAsyncError(async (req, res, next) => {
//     try {
//       const { activation_token } = req.body;
//       console.log("Received activation token:", activation_token);

//       const newUser = jwt.verify(
//         activation_token,
//         process.env.ACTIVATION_SECRET
//       );
//       console.log("Decoded token data:", newUser);

//       if (!newUser) {
//         return next(new ErrorHandler("Invalid Token", 400));
//       }

//       const { name, email, password, avatar } = newUser;

//       let user = await User.findOne({ email });
//       console.log("Database query result during activation:", user);

//       if (user) {
//         console.log(`User with email ${email} already exists.`);
//         return next(new ErrorHandler("User already exists!", 400));
//       }

//       user = await User.create({
//         name,
//         email,
//         password,
//         avatar,
//       });

//       console.log(`User activated: ${email}`);
//       sendToken(user, 201, res);
//     } catch (error) {
//       console.error("Error during activation:", error);
//       if (error.name === "TokenExpiredError") {
//         return next(new ErrorHandler("Token expired!", 400));
//       } else if (error.name === "JsonWebTokenError") {
//         return next(new ErrorHandler("Invalid Token", 400));
//       } else {
//         return next(new ErrorHandler(error.message, 500));
//       }
//     }
//   })
// );

router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }

      const { name, email, password, avatar } = newUser;

      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exists", 400));
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

//login user
router.post(
  "/login-user",
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please provide complete info!", 400));
      }
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Please provide correct info!", 400));
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//load user
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Load user
router.get(
  "/load-user",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(new ErrorHandler("User does not exist", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Log out user
router.get(
  "/logout",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
