const express = require('express');
const { addPerson } = require('../controllers/PersonController');
const router = express.Router();
router.route('/person').post(addPerson);
module.exports = router;