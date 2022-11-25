const mongoose = require("mongoose");

const kubeTV = new mongoose.Schema({
  
  
  videourl: [
    {
      url: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      
    }
  ],

  

  
});

module.exports = mongoose.model("kubetv", kubeTV);