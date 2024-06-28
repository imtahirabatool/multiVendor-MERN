const express = require("express");
const catchAsyncError = require("../middleware/catchAsyncError");
const router = express.Router();
const CouponCode = require("../model/couponCode");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller } = require("../middleware/auth");

//Create coupon code
router.post(
  "/creat-coupon-code",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const isCouponCodeExist = await CouponCode.find({
        name: req.body.name,
      });

      if (isCouponCodeExist.length!==0) {
        return next(new ErrorHandler("Coupon code already exists!", 400));
      }
      const couponCode = await CouponCode.create(req.body);

      res.status(201).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

module.exports = router;
