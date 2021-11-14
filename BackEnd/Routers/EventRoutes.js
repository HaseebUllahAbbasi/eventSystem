const express = require('express');
const { createEvent,assignTask,getTasksByEventId,getEventByID,addGuest,sendRequest,addNotes,getAllEvents,getNotesOfEvent } = require('../controllers/EventController');
const router = express.Router();
router.route('/event/:eventId').get(getEventByID);
router.route('/addGuest').post(addGuest)
router.route('/event').post(createEvent);
router.route('/addNote').post(addNotes);
router.route('/getEvents').get(getAllEvents);
router.route('/notesOfEvent').get(getNotesOfEvent);
router.route('/sendRequest').post(sendRequest);
router.route('/assignTask').post(assignTask);
router.route('/assignTask/:eventId').post(getTasksByEventId);



module.exports = router;