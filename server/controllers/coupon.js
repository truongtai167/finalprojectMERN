const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

const createCoupon = asyncHandler(async (req, res) => {
  const { name, discount, expiry } = req.body;
  if (!name || !discount || !expiry) throw new Error("Missing Inputs");
  const response = await Coupon.create({
    ...req.body,
    expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000,
  });
  return res.status(200).json({
    success: response ? true : false,
    createdCoupon: response ? response : "Cannot create new coupon",
  });
});
const getCoupon = asyncHandler(async (req, res) => {
  const response = await Coupon.find().select("-createAt -updateAt");
  return res.status(200).json({
    success: response ? true : false,
    createdCoupon: response ? response : "Cannot get coupon",
  });
});

const updateCoupon = asyncHandler(async (req, res) => {
  const { couponId } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing Inputs");
  if (req.body.expiry)
    req.body.expiry = Date.now() + +req.body.expiry * 24 * 60 * 60 * 1000;
  const response = await Coupon.findByIdAndUpdate(couponId, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    updatedCoupon: response ? response : "Cannot update coupon",
  });
});

const deleteCoupon = asyncHandler(async (req, res) => {
  const { couponId } = req.params;
  const response = await Coupon.findByIdAndDelete(couponId);
  return res.status(200).json({
    success: response ? true : false,
    deletedCoupon: response ? response : "Cannot delete coupon",
  });
});

module.exports = {
  createCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
};
