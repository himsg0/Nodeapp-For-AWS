const express =require('express');
const {createContact, getContactList} = require('../controllers/contactUsController')


const router= express.Router();

router.route("/contactUs/new").post(createContact);                //create Post
router.route("/contactUs/all").get(getContactList); // get all data by params


module.exports=router;