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
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Category" }],
      required: true,
    },
    quantity: {
      type: String,
      default: 1,
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
