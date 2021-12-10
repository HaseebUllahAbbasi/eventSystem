const express = require('express');
const { createEvent,assignTask,changeDesc,removeNote,assignTaskByName,sendRequestByName,changeStatus,getTasksByEventId,getEventByID,addGuest,sendRequest,addNotes,getAllEvents,getNotesOfEvent } = require('../controllers/EventController');
const router = express.Router();
router.route('/event/:eventId').get(getEventByID);
router.route('/addGuest').post(addGuest)
router.route('/event').post(createEvent);
router.route('/addNote').post(addNotes);
router.route('/removeNote').post(removeNote);

router.route('/getEvents').get(getAllEvents);
router.route('/notesOfEvent').get(getNotesOfEvent);
router.route('/sendRequest').post(sendRequest);
router.route('/assignTask').post(assignTask);
router.route('/assignTask/:eventId').post(getTasksByEventId);
router.route('/changeStatus').post(changeStatus);
router.route('/changeDesc').post(changeDesc);
router.route('/sendReqByName').post(sendRequestByName);
router.route('/assignTaskByName').post(assignTaskByName);



module.exports = router;