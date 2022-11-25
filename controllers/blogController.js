
const Post= require("../models/blogModel");
const ApiFeatures = require("../utils/apifeatures");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");



// Create Product --Admin
exports.createPost= async(req,res,next)=>{
    const Blogpost= await Post.create(req.body);
    res.status(201).json({
        success: true,
        Blogpost
    })
}



// get all blog post
exports.getAllblog=catchAsyncErrors(async(req,res)=>{
    const apiFeature = new ApiFeatures(Post.find(),req.query).search().filter();
    const Blogpost= await apiFeature.query;
   

    res.status(200).json({
        success:true,
        Blogpost
    });
});


// get all distinct category
exports.getAllPostCategories=catchAsyncErrors(async(req,res)=>{
    const apiFeature = new ApiFeatures(Post.distinct("category"),req.query);
    const blogcategory= await apiFeature.query;
   

    res.status(200).json({
        success:true,
        blogcategory
    });
});