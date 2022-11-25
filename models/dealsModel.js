const mongoose = require("mongoose");

const deals = new mongoose.Schema({
  
    weddingurl: {
        type: String,
        
      },
      title: {
        type: String,
        
      },
  festivedealsdays: [
    {
      dayurl: {
        type: String
        
      },
      daytitle: {
        type: String,
        
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      
    }
  ],

  

  
});

module.exports = mongoose.model("deals", deals);