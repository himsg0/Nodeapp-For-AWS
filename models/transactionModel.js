const mongoose = require("mongoose");

const transaction = new mongoose.Schema({
  
    transactionid: {
        type: String,
        
      },
    debituser: {
        type: String,
        
      },
      credituser: {
        type: String,
        
      },
      amount: {
        type: Number,
        
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
  

  

  
});

module.exports = mongoose.model("transaction", transaction);