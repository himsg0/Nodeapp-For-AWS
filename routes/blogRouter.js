const express =require('express');
const {createPost, getAllblog, getAllPostCategories} = require('../controllers/blogController')


const router= express.Router();

router.route("/blog/new").post(createPost);                //create Post
router.route("/blog/all").get(getAllblog); // get all data by params
router.route("/blog/category").get(getAllPostCategories);


module.exports=router;