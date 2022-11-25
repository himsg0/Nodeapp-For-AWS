const mongoose = require("mongoose");

const BlogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

     slugtitle: {
      type: String,
      required: true,
      unique: true,
    },

    desc: {
      type: String,
      required: true,
    },
    featuredImage: {
      type: String,
      required: false,
    },
    thumbnailImage: {
      type: String,
      required: false,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
}
  
);

module.exports = mongoose.model("Post", BlogPostSchema);