const express =require('express');
const {createAdvertise} = require('../controllers/advertiseUsController')


const router= express.Router();

router.route("/advertiseUs/new").post(createAdvertise);                //create Post



module.exports=router;