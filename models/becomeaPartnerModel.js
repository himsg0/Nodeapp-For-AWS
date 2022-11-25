const mongoose = require("mongoose");

const BecomeaPartnerSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      required: true,
      
    },
    ownerName: {
      type: String,
      required: true,
    },

    storeAddress: {
        type: String,
        required: true,
        
      },

      city: {
        type: String,
        required: true,
      },
      locality: {
        type: String,
        required: true,
      },


    contactNo: {
      type: Number,
      required: [true,"Please Enter the Phone Number"],
      maxLength: [10, "number cannot exceed 10 characters"]
    },
    
    
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
}
  
);

module.exports = mongoose.model("Partner", BecomeaPartnerSchema);