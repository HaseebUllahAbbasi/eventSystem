const express = require('express');
const { addPerson, updatePerson,completeTasks,myEvents,getEventByUserId,getTasksByUser,findByName,requestsById,acceptRequest,login,deletePerson,getAllpersons, getPersonByID, getCompletedTasksByUser, getUnCompletedTasksByUser } = require('../controllers/PersonController');
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
router.route('/tasksByID/:userId').get(getTasksByUser)
router.route('/completedTasks/:userId').get(getCompletedTasksByUser)
router.route('/unCompletedTasks/:userId').get(getUnCompletedTasksByUser)
router.route('/completeTask').post(completeTasks);
router.route('/getEventByUser').get(getEventByUserId);
router.route('/myEvents').get(myEvents);


module.exports = router;
