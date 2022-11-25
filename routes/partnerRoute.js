const express =require('express');
const {createPartner, getPartnerList} = require('../controllers/becomeaPartnerController')


const router= express.Router();

router.route("/becomeaPartner/new").post(createPartner);                //create Post
router.route("/becomeaPartner/all").get(getPartnerList); // get all data by params


module.exports=router;