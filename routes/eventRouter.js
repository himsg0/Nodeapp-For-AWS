const express =require('express');
const router= express.Router();
const { createEvent, getAllevent,createEventReview } = require('../controllers/eventController');

router.route("/event/new").post(createEvent);        // create Event
router.route("/event/all").get(getAllevent);        // Get all Event
router.route("/event/review/new").put(createEventReview);   // event review


module.exports=router;