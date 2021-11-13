const express = require('express');
const { createEvent,getEventByID,addGuest,sendRequest,addNotes,getAllEvents,getNotesOfEvent } = require('../controllers/EventController');
const router = express.Router();
router.route('/event/:eventId').get(getEventByID);
router.route('/addGuest').post(addGuest)
router.route('/event').post(createEvent);
router.route('/addNote').post(addNotes);
router.route('/getEvents').get(getAllEvents);
router.route('/notesOfEvent').get(getNotesOfEvent);
router.route('/sendRequest').post(sendRequest);


module.exports = router;