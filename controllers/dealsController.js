const ApiFeatures = require("../utils/apifeatures");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Deals= require("../models/dealsModel");



exports.createDeals= async(req,res,next)=>{
    const product= await Deals.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}

exports.getFestiveDeals=catchAsyncErrors(async(req,res)=>{
    const apiFeature = new ApiFeatures(Deals.find({}),req.query).search().filter();
    const festivaldeal= await apiFeature.query;
   

    res.status(200).json({
        success:true,
        festivaldeal
    });
});

// push reel url into the ARRAY
exports.putfestiveDeals = catchAsyncErrors(async (req, res, next) => {
    const {offerurl,vendorid } = req.body;
  
    const mess = {
        offerurl,
        vendorid
    };
  
    const product = await Deals.findById("63183e18276bece87e0764e1");
  
          product.festivedealsbanner.push(mess);
      
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });
