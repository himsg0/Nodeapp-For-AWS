const mongoose = require("mongoose");

const kubecoin = new mongoose.Schema({
  
    cointitle: {
        type: String,
        
      },
      coinurl: {
        type: String,
        
      },
  userpackages: [
    {
      packagetitle: {
        type: String
        
      },
      packageamount: {
        type: String,
        
      },
      packagecoins: {
        type: String,
        
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      
    }
  ],

  

  
});

module.exports = mongoose.model("kubecoin", kubecoin);