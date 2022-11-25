const contact= require("../models/contactUsModel");
const ApiFeatures = require("../utils/apifeatures");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");



// Create response of contact --Admin
exports.createContact= async(req,res,next)=>{
    const contactUs= await contact.create(req.body);
    res.status(201).json({
        success: true,
        contactUs
    })
}



// get all contact list  
exports.getContactList=catchAsyncErrors(async(req,res)=>{
    const apiFeature = new ApiFeatures(contact.find(),req.query).search().filter();
    const contactUs= await apiFeature.query;
   

    res.status(200).json({
        success:true,
        contactUs
    });
});