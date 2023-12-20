const { default: mongoose } = require("mongoose");

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn.connection.readyState === 1)
      console.log("DB connection Successfully");
    else console.log("DB connecting");
  } catch (error) {
    console.log("DB connection Failed");
    throw new Error(error);
  }
};

module.exports = dbConnect;
