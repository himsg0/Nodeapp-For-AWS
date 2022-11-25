const coin= require("../models/kubecoinModel");
const ApiFeatures = require("../utils/apifeatures");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");



// Create kube data --Admin
exports.createKubecoin= async(req,res,next)=>{
    const kubedata= await coin.create(req.body);
    res.status(201).json({
        success: true,
        kubedata
    })
}



// get all kube data
exports.getAllcoinPackage=catchAsyncErrors(async(req,res)=>{
    const apiFeature = new ApiFeatures(coin.find(),req.query).search().filter();
    const coinpackage= await apiFeature.query;
   

    res.status(200).json({
        success:true,
        coinpackage
    });
});
