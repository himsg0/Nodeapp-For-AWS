const mongoose = require("mongoose");

const AdvertiseUsSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      
    },

    lastname: {
      type: String,
      
    },

    contactNo: {
      type: Number,
      required: [true,"Please Enter the Phone Number"],
      maxLength: [10, "number cannot exceed 10 characters"]
    },
    email: {
      type: String,
      required: false,
    },
    categories_Name: {
        type: String,

        
      },
      city_Name: {
        type: String,

        
      },
    
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
}
  
);

module.exports = mongoose.model("AdvertiseWithUS", AdvertiseUsSchema);