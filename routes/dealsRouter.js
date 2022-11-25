const express =require('express');
const router= express.Router();
const { createDeals,getFestiveDeals,putfestiveDeals } = require('../controllers/dealsController');

router.route("/festivedeals/new").post(createDeals);        // create 
router.route("/festivedeals/all").get(getFestiveDeals);        // Get all 
router.route("/festivedeals/push/deals").put(putfestiveDeals);      // Push


module.exports=router;