const express =require('express');
const router= express.Router();
const { createTVUrl,getkubeTVUrl,putkubeReelUrl } = require('../controllers/kubeTVController');

router.route("/kubetv/new").post(createTVUrl);        // create Event
router.route("/kubetv/all").get(getkubeTVUrl);        // Get all Event
router.route("/kubetv/push/url").put(putkubeReelUrl);      // Push KUBETV REEL 


module.exports=router;