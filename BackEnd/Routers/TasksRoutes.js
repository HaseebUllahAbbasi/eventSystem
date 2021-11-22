const express = require('express');
const { getAllTasks } = require('../controllers/TaskController');
const router = express.Router();
router.route('/allTasks').get(getAllTasks);
module.exports = router;
