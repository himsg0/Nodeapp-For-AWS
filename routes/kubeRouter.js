const express =require('express');
const {createKube,getAllKubeData} = require('../controllers/kubeController')


const router= express.Router();

router.route("/kube/new").post(createKube);                //create kube data
router.route("/kube/all").get(getAllKubeData); // get all kube data by params



module.exports=router;