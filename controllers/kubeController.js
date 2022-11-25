
const kube= require("../models/kubeModel");
const ApiFeatures = require("../utils/apifeatures");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");



// Create kube data --Admin
exports.createKube= async(req,res,next)=>{
    const kubedata= await kube.create(req.body);
    res.status(201).json({
        success: true,
        kubedata
    })
}



// get all kube data
exports.getAllKubeData=catchAsyncErrors(async(req,res)=>{
    const apiFeature = new ApiFeatures(kube.find(),req.query).search().filter();
    const kubedata= await apiFeature.query;
   

    res.status(200).json({
        success:true,
        kubedata
    });
});
