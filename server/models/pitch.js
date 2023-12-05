const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var pitchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      // unique: true,
      lowercase: true,
    },
    thumb: {
      type: String,
      // required: true,
      // để required thì nếu comment cho pitch chưa có thumb thì ko save đc
    },
    description: {
      type: Array,
      required: true,
    },
    brand: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: "654aeed30df025516275eef0",
    },
    images: {
      type: Array,
    },
    address: {
      type: Array,
    },
    status: {
      type: String,
      enum: ["Empty", "Booked", "Maintain"],
    },
    ratings: [
      {
        star: { type: Number },
        postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
        comment: { type: String },
        updateAt: {
          type: Date,
        },
      },
    ],
    totalRatings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Pitch", pitchSchema);
