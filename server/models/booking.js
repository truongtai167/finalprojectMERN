const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var bookingSchema = new mongoose.Schema({
  pitches: [
    {
      pitch: { type: mongoose.Types.ObjectId, ref: "pitch" },
      bookedDate: { type: Date },
      shift: {
        type: Array,
      },
    },
  ],
  status: {
    type: String,
    default: "Pending",
    enum: ["Cancelled", "Pending", "Success"],
  },
  // paymentIntent: {},
  coupon: {
    type: mongoose.Types.ObjectId,
    ref: "Coupon",
  },
  bookingBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  total: Number,
});

//Export the model
module.exports = mongoose.model("Booking", bookingSchema);
