const newsletter= require("../models/newsLetterModel");

exports.createNewsLetter= async(req,res,next)=>{
    const newsLetter= await newsletter.create(req.body);
    res.status(201).json({
        success: true,
        newsLetter
    })
}