const advertise= require("../models/advertiseUsModel");

exports.createAdvertise= async(req,res,next)=>{
    const advertisewithUs= await advertise.create(req.body);
    res.status(201).json({
        success: true,
        advertisewithUs
    })
}