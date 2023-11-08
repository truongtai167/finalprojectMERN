const User = require("../models/user");
const Booking = require("../models/booking");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const sendMail = require("../ultils/sendMail");
const crypto = require("crypto");

const register = asyncHandler(async (req, res) => {
  const { name, email, password, phoneNumber, identityNumber, dateOfBirth } =
    req.body;
  if (
    !name ||
    !email ||
    !password ||
    !phoneNumber ||
    !identityNumber ||
    !dateOfBirth
  ) {
    return res.status(400).json({
      success: false,
      message: "Missing input",
    });
  }
  const user = await User.findOne({ email });
  if (user) throw new Error("User has existed");
  else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      success: newUser ? true : false,
      message: newUser
        ? "Register successfully. Please log in "
        : "Something go wrong",
    });
  }
});
// refresh token=> cap moi access token
// access token => xac thuc nguoi dung, phan quyen nguoi dung
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing input",
    });
  }
  const response = await User.findOne({ email });
  if (response && (await response.isCorrectPassword(password))) {
    // use destructuring to get password and role
    const { password, role, refreshToken, ...userData } = response.toObject();
    // create access token
    const accessToken = generateAccessToken(response._id, role);
    // create refresh token
    const newRefreshToken = generateRefreshToken(response._id);
    // save refresh token in database
    await User.findByIdAndUpdate(
      response._id,
      { refreshToken: newRefreshToken },
      { new: true } // return after update - if false return obj before update
    );
    // save refresh token in cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true, // nghĩa là cookie đó chỉ có thể được truy cập qua giao thức HTTP (không thể truy cập bằng JavaScript trong trình duyệt).
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      accessToken,
      userData,
    });
  } else {
    throw new Error("Invalid credentials!");
  }
});

const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select("-refreshToken -password -role");
  return res.status(200).json({
    success: user ? true : false,
    result: user ? user : "User not found",
  });
});
const refreshAccessToken = asyncHandler(async (req, res) => {
  // get token from cookies
  const cookie = req.cookies;
  // check if token exist
  if (!cookie && !cookie.refreshToken)
    throw new Error("No refresh token in cookies");
  // check token
  const result = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  const response = await User.findOne({
    _id: result._id,
    refreshToken: cookie.refreshToken,
  });
  // check if token == token saved in database
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response
      ? generateAccessToken(response._id, response.role)
      : "Refresh token not match",
  });
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie && !cookie.refreshToken)
    throw new Error("No refresh token in cookie");
  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: "" },
    { new: true }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    message: "Logout is done",
  });
});

// client send mail
// server check mail , if validate => send mail + link (password change token)
// client check mail => click link
// client send api + link
// server check token
// change password

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.query;
  if (!email) throw new Error("Missing email");
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  const resetToken = user.createPasswordChangeToken();
  await user.save();

  const html = `Please follow this link to reset your password, this link will be closed in 15 min : <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>`;
  const data = {
    email,
    html,
  };
  const result = await sendMail(data);
  return res.status(200).json({
    success: true,
    result,
  });
});
const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token) throw new Error("Missing inputs");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Invalid reset token");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangedAt = Date.now();
  user.passwordResetExpires = undefined;
  await user.save();
  return res.status(200).json({
    success: user ? true : false,
    message: user ? "Updated password" : "Something went wrong",
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const response = await User.find().select("-refreshToken -password -role");
  return res.status(200).json({
    success: response ? true : false,
    users: response,
  });
});
const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id) throw new Error("Missing Input");

  const response = await User.findByIdAndDelete(_id);
  return res.status(200).json({
    success: response ? true : false,
    deletedUser: response
      ? `User with email ${response.email} deleted`
      : "No user delete",
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id || Object.keys(req.body).length === 0)
    throw new Error("Missing Input");

  const response = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select("-refreshToken -password -role");
  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : "something went wrong",
  });
});

const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing Input");

  const response = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  }).select("-refreshToken -password -role");
  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : "something went wrong",
  });
});

// cùng sân -  cùng ngày -  cùng shift => error
// cùng sân - cùng ngày - khác shift => ok
// cùng sân - khác ngày - cùng shift => ok
// status != emptu => eror

const updateOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pitchId, bookedDate, shift } = req.body;
  if (!pitchId || !bookedDate || !shift) throw new Error("Missing input");

  // Tìm đặt sân trong bảng Booking dựa trên ngày và ca sân
  const exOrder = await Booking.find({
    "pitches.pitch": pitchId,
    "pitches.shift": shift,
    "pitches.bookedDate": bookedDate,
  });
  const existingBooking = exOrder[0]?.pitches.find(
    (el) => el.pitch.toString() === pitchId && el.shift === shift
  );

  if (existingBooking) {
    // Kiểm tra xem có sân bóng cụ thể (pitchId) đã được đặt trong ngày và ca sân này chưa
    console.log("chon san khac de");
    return res.status(400).json({
      success: false,
      message: "booked pitch, choose another pitch please.",
    });
  } else {
    console.log("loi cmnr");
    const user = await User.findById(_id).select("order");
    const alreadyPitch = user?.order?.find((el) => {
      return el.pitch.toString() === pitchId && el.shift === shift;
    });

    if (alreadyPitch) {
      return res.status(500).json({
        success: false,
        message: "already added in order",
      });
    } else {
      const response = await User.findByIdAndUpdate(
        _id,
        { $push: { order: { pitch: pitchId, bookedDate, shift } } },
        { new: true }
      );
      return res.status(200).json({
        success: response ? true : false,
        BookingPitch: response ? response : "something went wrong",
      });
    }
  }
});

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  updateUser,
  updateUserByAdmin,
  updateOrder,
};
