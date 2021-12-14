const express = require('express');
const { addPerson, updatePerson,getAllNames,completeTasks,cancelRequest,requestsDetailsById,myEvents,getEventByUserId,getTasksByUser,findByName,requestsById,acceptRequest,login,deletePerson,getAllpersons, getPersonByID, getCompletedTasksByUser, getUnCompletedTasksByUser } = require('../controllers/PersonController');
const router = express.Router();
router.route('/persons').get(getAllpersons);
router.route('/person').put(updatePerson);
router.route('/person').post(addPerson);
router.route('/person').delete(deletePerson);
router.route('/person/:id').get(getPersonByID);
router.route('/login').post(login)
router.route('/personByName/:name').get(findByName)
router.route('/acceptRequest').post(acceptRequest)
router.route('/cancelRequest').post(cancelRequest)
router.route('/requests/:userId').get(requestsById)
router.route('/requestsDetails/:userId').get(requestsDetailsById)

router.route('/tasksByID/:userId').get(getTasksByUser)
router.route('/completedTasks/:userId').get(getCompletedTasksByUser)
router.route('/unCompletedTasks/:userId').get(getUnCompletedTasksByUser)
router.route('/completeTask').post(completeTasks);
router.route('/getEventByUser').post(getEventByUserId);
router.route('/myEvents').post(myEvents);
router.route('/getAllName').get(getAllNames);

module.exports = router;
