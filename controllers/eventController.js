const Event= require("../models/eventModel");
const ApiFeatures = require("../utils/apifeatures");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const axios =require('axios') ;



// Create Event --Admin
exports.createEvent= async(req,res,next)=>{
    const event= await Event.create(req.body);
    res.status(201).json({
        success: true,
        event
    })
}

// get all  Event_Data with params
exports.getAllevent=catchAsyncErrors(async(req,res)=>{
    try{
    const apiFeature = new ApiFeatures(Event.find().sort(),req.query).search().filter();
    const event= await apiFeature.query;
   

    return res.status(200).json({
        success:true,
        message:"Get all Event",
        event
    });
} catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: error.message,
        message: "Error in getting all Event",
    });

}
});


// Create New Review or Update the review
exports.createEventReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, eventId, email, url } = req.body;
  
    const review = {
      
      rating: Number(rating),
      comment,
      email,
      url,
    };
  
    const eventName = await Event.findById(eventId);
  
          eventName.reviews.push(review);
      eventName.numOfReviews = eventName.reviews.length;
    
  
    let avg = 0;
  
    eventName.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    eventName.ratings = avg / eventName.reviews.length;
  
    await eventName.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });