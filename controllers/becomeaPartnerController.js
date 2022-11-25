const becomeAPartner= require("../models/becomeaPartnerModel");
const ApiFeatures = require("../utils/apifeatures");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");



// Create response of contact --Admin
exports.createPartner= async(req,res,next)=>{
    const PartnerForm= await becomeAPartner.create(req.body);
    res.status(201).json({
        success: true,
        PartnerForm
    })
}



// get all contact list  
exports.getPartnerList=catchAsyncErrors(async(req,res)=>{
    const apiFeature = new ApiFeatures(becomeAPartner.find(),req.query).search().filter();
    const PartnerList= await apiFeature.query;
   

    res.status(200).json({
        success:true,
        PartnerList
    });
});