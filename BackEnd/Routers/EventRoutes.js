const express = require('express');
const { createEvent,getEventByID,addGuest } = require('../controllers/EventController');
const router = express.Router();
router.route('/event/:eventId').get(getEventByID);
router.route('/addGuest').post(addGuest)
router.route('/event').post(createEvent);
module.exports = router;