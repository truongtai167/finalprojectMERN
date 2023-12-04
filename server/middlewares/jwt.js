const jwt = require("jsonwebtoken");

const generateAccessToken = (userId, role) => {
  return jwt.sign({ _id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: "15s",
  });
};
const generateRefreshToken = (userId, role) => {
  return jwt.sign({ _id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
