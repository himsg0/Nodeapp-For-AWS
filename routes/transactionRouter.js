const express =require('express');
const {createTransaction ,getTransaction } = require('../controllers/transactionController')


const router= express.Router();

router.route("/transaction/new").post(createTransaction);                //create Post

router.route("/transaction/get").get(getTransaction);               // get transaction by user 



module.exports=router;