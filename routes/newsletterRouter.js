const express =require('express');
const router= express.Router();
const { createNewsLetter } = require('../controllers/newsLetterController');

router.route("/home/newsletter").post(createNewsLetter);        // create NewsLetter


module.exports=router;