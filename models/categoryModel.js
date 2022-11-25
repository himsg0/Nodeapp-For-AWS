const mongoose = require("mongoose");

const catg = new mongoose.Schema({
  
  categories_Name: {
    type: String,

    required: [true, "Please categories Name"],
    trim: true,
  },
  url: {
    type: String,
    required: true,
  },
  sub_cat: [
    {
      subcat_Name: {
        type: String,
        required: true,
      },
      
    }
  ],

  

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("cat", catg);