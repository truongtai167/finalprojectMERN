const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    numberViews: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    image: {
      type: String,
      default:
        "https://cdn.vox-cdn.com/thumbor/6KkhK8Wal9zTm3cZMPy_YUVlpdw=/0x0:3487x2728/1200x0/filters:focal(0x0:3487x2728):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/24735629/1496209808.jpg",
    },
    author: {
      type: String,
      default: "Admin",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//Export the model
module.exports = mongoose.model("News", newsSchema);
