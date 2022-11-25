const express =require('express');
const router= express.Router();
const { createKubecoin,getAllcoinPackage } = require('../controllers/kubecoinController');

router.route("/coin/new").post(createKubecoin);        // create Event
router.route("/coin/package/all").get(getAllcoinPackage);        // Get all Event



module.exports=router;