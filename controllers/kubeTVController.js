const ApiFeatures = require("../utils/apifeatures");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Kubetv= require("../models/kubeTVModel");



exports.createTVUrl= async(req,res,next)=>{
    const product= await Kubetv.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}

exports.getkubeTVUrl=catchAsyncErrors(async(req,res)=>{
    const apiFeature = new ApiFeatures(Kubetv.find({}),req.query);//.search().filter();
    const kubereel= await apiFeature.query;
   

    res.status(200).json({
        success:true,
        kubereel
    });
});

// push reel url into the ARRAY
exports.putkubeReelUrl = catchAsyncErrors(async (req, res, next) => {
    const {url} = req.body;
  
    const mess = {
      url
    };
  
    const product = await Kubetv.findById("62ff40cd801b8ccf8b50b727");
  
          product.videourl.push(mess);
      
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });
