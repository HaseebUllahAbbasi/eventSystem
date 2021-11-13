const express = require('express');
const { addPerson, updatePerson,findByName,requestsById,acceptRequest,login,deletePerson,getAllpersons, getPersonByID } = require('../controllers/PersonController');
const router = express.Router();
router.route('/persons').get(getAllpersons);
router.route('/person').put(updatePerson);
router.route('/person').post(addPerson);
router.route('/person').delete(deletePerson);
router.route('/person').get(getPersonByID);
router.route('/login').get(login)
router.route('/personByName/:name').get(findByName)
router.route('/acceptRequest').post(acceptRequest)
router.route('/requests/:userId').get(requestsById)

module.exports = router;
