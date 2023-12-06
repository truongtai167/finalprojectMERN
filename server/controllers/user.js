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
const makeToken = require("uniqid");

const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const notActivatedEmail = await User.findOne({
    email: new RegExp(`${token}$`),
  });
  if (notActivatedEmail) {
    notActivatedEmail.email = Buffer.from(
      notActivatedEmail?.email?.split("@")[0],
      "base64"
    ).toString("utf-8");
    notActivatedEmail.save();
  }
  return res.json({
    success: notActivatedEmail ? true : false,
    mes: notActivatedEmail
      ? notActivatedEmail
      : // "Register is successfully. Please go login"
        "Something went wrong, please try again",
  });
});
const register = asyncHandler(async (req, res) => {
  const { email, password, name, phoneNumber } = req.body;
  if (!email || !password || !name || !phoneNumber)
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });
  const user = await User.findOne({ email });
  if (user) throw new Error("email has existed");
  else {
    const token = makeToken();
    const encodedEmail = Buffer.from(email).toString("base64");
    const emailedited = encodedEmail + "@" + token;
    const newUser = await User.create({
      email: emailedited,
      password,
      name,
      phoneNumber,
    });
    if (newUser) {
      // const html = `<h2>Register code:</h2><br /><blockquote>debugboy-${token}</blockquote>`;
      const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Template</title>
          <style>
              body {
                  font-family: 'Helvetica', Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }

              .container {
                  max-width: 560px;
                  margin: 0 auto;
                  font-family: 'Helvetica', Arial, sans-serif;
              }

              .header {
                  background-color:#ffffff;
                  color: #fff;
                  text-align: center;
                  padding: 20px;
              }

              .logo img {
                  max-width: 100%;
                  height: auto;
              }

              .content {
                  background-color: #ffffff;
                  color: #353740;
                  padding: 40px 20px;
                  text-align: left;
                  line-height: 1.5;
              }

              h1 {
                  color: #202123;
                  font-size: 32px;
                  line-height: 40px;
                  margin: 0 0 20px;
              }
              .code{
                font-size: 16px;
                line-height: 24px;
                margin: 0 0 24px;
                text-align: center; 
              }
              p {
                font-size: 16px;
                line-height: 24px;
                margin: 0 0 24px; 
            }

              .cta-button {
                  display: inline-block;
                  text-decoration: none;
                  background: #10a37f;
                  border-radius: 3px;
                  color: white;
                  font-size: 16px;
                  line-height: 24px;
                  font-weight: 400;
                  padding: 12px 20px 11px;
                  margin: 0px;
              }

              .footer {
                  background: #ffffff;
                  color: #6e6e80;
                  padding: 0 20px 20px;
                  font-size: 13px;
                  line-height: 1.4;
                  text-align: left;
              }
          </style>
      </head>
      <body>
          <center>
              <table class="container" style="width: 100%; border-collapse: collapse !important;">
                  <tr>
                      <td class="header">
                          <img src="https://res.cloudinary.com/dmj8tbay1/image/upload/v1701228568/logo_ykataq.png" width="200" height="80" alt="BookingPitches Logo">
                      </td>
                  </tr>
                  <tr>
                      <td class="content">
                          <h1>Verify your email address</h1>
                          <p>
                              To continue setting up your BookingPitches account, please verify that this is your email address.
                          </p>
                          <p class"code">
                              DEBUGBOY-${token}
                          </p>
                      </td>
                  </tr>
                  <tr>
                      <td class="footer">
                          <p>
                              This link will expire in 1 minutes. If you did not make this request, please disregard this email.
                              For help, contact us through our <a href="" target="_blank">FAQ</a>.
                          </p>
                      </td>
                  </tr>
              </table>
          </center>
      </body>
      </html>
    `;

      await sendMail({
        email,
        html: emailHtml,
        subject: "Verify code - Debug Boy",
      });
    }
    setTimeout(async () => {
      await User.deleteOne({ email: emailedited });
    }, [60000]);
    return res.json({
      success: newUser ? true : false,
      mes: newUser
        ? "Please check your email"
        : "Something went wrong, please try again",
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
  const user = await User.findById(_id).select("-refreshToken -password ");
  return res.status(200).json({
    success: user ? true : false,
    user: user ? user : "User not found",
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
  const { email } = req.body;
  if (!email) throw new Error("Missing email");
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  const resetToken = user.createPasswordChangeToken();
  await user.save();

  const html = `Please follow this link to reset your password, this link will be closed in 15 min :
   <a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>Click here</a>`;
  const data = {
    email,
    html,
    subject: "Forgot Password",
  };
  const result = await sendMail(data);
  return res.status(200).json({
    success: result.response?.includes("OK") ? true : false,
    message: result.response?.includes("OK")
      ? "check your email"
      : "something went wrong , try again",
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

// const getUsers = asyncHandler(async (req, res) => {
//   const response = await User.find().select("-refreshToken -password -role");
//     return res.status(200).json({
//       success: response ? true : false,
//       users: response ? response : "cannot get user",
//     });
// });
// const getUsers = asyncHandler(async (req, res) => {
//   const response = await User.find().select("-refreshToken -password -role");
//   if (response)
//     return res.status(200).json({
//       success: true,
//       users: response,
//     });
//   else
//     return res.status(200).json({
//       success: false,
//       users: "Cannot get User",
//     });
// });
const getUsers = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  // tách các trường đặc biệt ra khỏi query
  const exlcludeFields = ["limit", "sort", "page", "fields"];
  exlcludeFields.forEach((el) => delete queries[el]);
  //Format lại các operators cho đúng cú pháp mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  );
  const formartedQueries = JSON.parse(queryString);
  // Filtering
  // regex: tìm từ bắt đầu bằng chữ truyền vào
  // options: 'i' không phân biệt viết hoa viết thường
  // doc: https://www.mongodb.com/docs/manual/reference/operator/query/regex/
  if (queries?.name)
    formartedQueries.name = { $regex: queries.name, $options: "i" };

  if (req.query.q) {
    delete formartedQueries.q;
    formartedQueries["$or"] = [
      { name: { $regex: queries.q, $options: "i" } },
      { email: { $regex: queries.q, $options: "i" } },
    ];
  }
  let queryCommand = User.find(formartedQueries);
  //Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }
  // Fields litmiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  //Pagination
  //limit : số object lấy về 1 lần gọi API
  //skip 2 (bỏ qua 2 cái đầu)
  // +2 => 2
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_USERS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);

  // Executed query
  // Số lượng sân thỏa điều kiện
  queryCommand
    .then(async (response) => {
      const counts = await User.find(formartedQueries).countDocuments();
      return res.status(200).json({
        success: response ? true : false,
        counts,
        users: response ? response : "Can not get users",
      });
    })
    .catch((err) => {
      if (err) throw new Error(err, message);
    });
});
const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  // if (!_id) throw new Error("Missing Input");
  const response = await User.findByIdAndDelete(userId);
  return res.status(200).json({
    success: response ? true : false,
    message: response
      ? `User with email ${response.email} deleted`
      : "No user delete",
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { name, phoneNumber, email } = req.body;
  const data = { name, phoneNumber, email };
  if (req.file) data.avatar = req.file.path;
  if (!_id || Object.keys(req.body).length === 0)
    throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(_id, data, {
    new: true,
  }).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    message: response ? "Updated" : "Can not update",
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
    message: response ? "Updated" : "something went wrong",
  });
});

const BookingPitch = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pitchId, bookedDate, shift } = req.body;
  if (!pitchId || !bookedDate || !shift) throw new Error("Missing input");
  const currentDate = new Date();
  if (new Date(bookedDate) < currentDate) {
    return res.status(400).json({
      success: false,
      message: "Choose another Date.",
    });
  }

  const existingBooking = await Booking.findOne({
    pitch: pitchId,
    bookedDate: bookedDate,
    shift: shift,
  });
  if (existingBooking) {
    // Kiểm tra trường shift
    return res.status(400).json({
      success: false,
      message: "this pitch already booked.",
    });
  } else {
    req.body.bookingBy = _id;
    req.body.pitch = pitchId;
    const response = await Booking.create(req.body);
    return res.status(200).json({
      success: response ? true : false,
      message: response ? "Booked" : "something went wrong",
    });
  }
});
// const removeOrder = asyncHandler(async (req, res) => {
//   const { _id } = req.params;

//   // Xóa nội dung trong trường order của model User
//   const updatedUser = await User.findByIdAndUpdate(
//     _id,
//     { $set: { order: [] } },
//     { new: true }
//   ).select("order");

//   return res.status(200).json({
//     success: true,
//     message: "Đã xóa nội dung trong trường order thành công.",
//   });
// });
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
  BookingPitch,
  verifyEmail,
  // removeOrder,
};
