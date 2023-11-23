const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var pitchCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      // unique: true,
      lowercase: true,
    },
    brands: {
      type: Array,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("PitchCategory", pitchCategorySchema);
