const express = require('express');
const { getAllNotes } = require('../controllers/NotesController');
const router = express.Router();
router.route('/allTasks').get(getAllNotes);
module.exports = router;
