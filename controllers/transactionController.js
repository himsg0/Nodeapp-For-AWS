const transaction= require("../models/transactionModel");
const uuid = require("uuid");
const ApiFeatures = require("../utils/apifeatures");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


// create coin transaction
exports.createTransaction= async(req,res,next)=>{

    const transactionid = uuid.v4();
    const {debituser,credituser,amount}= req.body;

 
    const cointransaction = {
        transactionid:transactionid,
        debituser: debituser,
        credituser: credituser,
        amount:amount

    }

    const t= await transaction.create(cointransaction);
    res.status(201).json({
        success: true,
        t
    })
}


// get user data of transaction

exports.getTransaction = catchAsyncErrors(async (req, res, next) => {
   
    
    
    const apiFeature = new ApiFeatures(transaction.find(),req.query).filter();
    const userTransaction= await apiFeature.query;

    res.status(200).json({
      success: true,
      userTransaction
      
    }); 
  });