const mongoose = require("mongoose");

const localityBannerSchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: [true, "Please Enter city Name"],
    trim: true,
  },

  localityName: {
    type: String,
    required: [true, "Please Enter locality Name"],
    trim: true,
  },

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("localityBanner", localityBannerSchema);