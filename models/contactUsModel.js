const mongoose = require("mongoose");

const ContactUsSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      
    },

    mobileNo: {
      type: Number,
      required: [true,"Please Enter the Phone Number"],
      maxLength: [10, "number cannot exceed 10 characters"]
    },
    message: {
      type: String,
      required: false,
    },
    
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
}
  
);

module.exports = mongoose.model("Contact", ContactUsSchema);