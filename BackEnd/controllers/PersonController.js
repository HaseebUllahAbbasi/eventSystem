const PersonSchema = require('../model/Person')
const EventSchema = require('../model/Event')
const TasksSchema = require('../model/Task')

const catchAsyncErrors = require('../middlewares/catchAsyncError');

exports.myEvents = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.body;
    const events = await EventSchema.find();
    const updateList = [];
    const eventsByUserId = events.filter(item => {
        if (item.userId == id) {
            updateList.push(item)
            return item;
        }
    });
    if (eventsByUserId.length != 0) {

        res.status(200).json({
            success: true,
            list: eventsByUserId
        })
    }
    else
        res.status(404).json({
            success: false,
            message: "Not Found Admin of Any Event"
        })
})
exports.getEventByUserId = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.body;
    const events = await EventSchema.find();
    const teamsLists = events.filter(event => {
        const listofOneTeam = event.team;
        const result = listofOneTeam.find(item => item == id)
        if (result != undefined) {
            return event;
        }
    });
    if (teamsLists.length == 0)
        res.status(404).json({
            success: false,
            message: "not found the user in any team"
        })
    else
        res.status(200).json({
            success: true,
            teamsLists
        })
})

exports.deletePerson = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.body;
    const deletedPerson = await PersonSchema.findByIdAndDelete(id)
    res.status(200).json({
        success: true,
        deletedPerson
    })
})
exports.findByName = catchAsyncErrors(async (req, res, next) => {

    const name = req.params.name;
    const listUsers = await PersonSchema.find();
    const foundUser = listUsers.find((user) => {
        if (user.name == name) {
            return user;
        }
        else return null;
    })
    if (foundUser)
        res.status(200).json(
            {
                success: true,
                foundUser
            }
        )
    else {
        res.status(402).json(
            {
                success: false,
                msg: "userNotFound"
            }
        )

    }
})
exports.login = catchAsyncErrors(async (req, res, next) => {
    const { name, password } = req.body;
    const listUsers = await PersonSchema.find();

    const users = listUsers.find((user) => {
        if (user.name == name && user.password == password) {

            return user;
        }
        else return null;
    })
    res.status(200).json({
        success: true,
        users
    })


})
exports.getAllpersons = catchAsyncErrors(async (req, res, next) => {
    const allPerons = await PersonSchema.find();
    if (allPerons) {
        res.status(200).json({
            success: true,
            persons: allPerons
        })
    }
    else {
        res.status(402).json({
            success: false,
        })
    }
})
exports.updatePerson = catchAsyncErrors(async (req, res, next) => {
    const { id, name, email, number, password } = req.body;
    const updateUserData =
    {
        name, password, email, number
    };
    const updated = await PersonSchema.findByIdAndUpdate(id, updateUserData)
    if (updated) {
        res.status(200).json({
            success: true,
            updated
        })
    }
    else {
        res.status(402).json({
            success: false,
        })

    }
})
exports.getPersonByID = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.body;

    const personFetched = await PersonSchema.findById(id);
    if (personFetched)
        res.status(200).json({
            success: true,
            personFetched
        })
    else
        res.status(401).json({
            success: false,
        })
})

exports.addPerson = catchAsyncErrors(async (req, res, next) => {
    const { name, email, number, password } = req.body;
    const personCreated = await PersonSchema.create({
        name, password, email, number
    });
    res.status(200).json({
        success: true,
        personCreated
    })
})
exports.getTasksByUser = catchAsyncErrors(async (req, res, next) => {
    const { userId } = req.params;
    const allTasks = await TasksSchema.find();
    const filteredById = allTasks.filter((item) => {

        if (item.assignTo == userId) {
            return item;
        }

    }
    );
    res.status(200).json({
        success: true,
        filteredById,

    })
})


exports.getUnCompletedTasksByUser = catchAsyncErrors(async (req, res, next) => {
    const { userId } = req.params;
    const allTasks = await TasksSchema.find();
    const filteredById = allTasks.filter((item) => {
        if (item.assignTo == userId) {
            if (!item.taskStatus)
                return item;
        }

    }
    );
    res.status(200).json({
        success: true,
        filteredById,
    })
})
exports.getCompletedTasksByUser = catchAsyncErrors(async (req, res, next) => {
    const { userId } = req.params;
    const allTasks = await TasksSchema.find();
    const filteredById = allTasks.filter((item) => {


        if (item.assignTo == userId) {
            if (item.taskStatus)
                return item;
        }

    }
    );
    res.status(200).json({
        success: true,
        filteredById,

    })
})

exports.completeTasks = catchAsyncErrors(async (req, res, next) => {
    const { taskId, userId } = req.body;
    const foundPerson = await PersonSchema.findById(userId);
    const foundTask = await TasksSchema.findById(taskId);
    foundTask.taskStatus = true;
    console.log(foundTask);
    console.log("after the update")
    await TasksSchema.updateOne(foundTask);

    res.status(200).json({
        success: true,
        foundTask

    })
})
exports.requestsById = catchAsyncErrors(async (req, res, next) => {
    const { userId } = req.params;
    const foundPerson = await PersonSchema.findById(userId);
    if (foundPerson) {
        const requestList = foundPerson.requests;

        res.status(200).json({
            success: true,
            requestList
        })
    }
    else {
        res.status(402).json({
            success: false

        })
    }


})
exports.acceptRequest = catchAsyncErrors(async (req, res, next) => {

    const { userId, eventId } = req.body;
    const foundPerson = await PersonSchema.findById(userId);
    if (foundPerson) {
        const requestList = foundPerson.requests;
        const index = requestList.indexOf(eventId);
        if (index != -1) {
            const addingToEvent = foundPerson.requests.splice(index, 1);
            foundPerson.member.push(addingToEvent.toString())
            const eventByID = await EventSchema.findById(addingToEvent);
            eventByID.team.push(userId)
            requestList.splice(index, 1);

            const UpdatedEvent = await EventSchema.updateOne(eventByID);
            const updatedPerson = await PersonSchema.updateOne(foundPerson);
            res.status(200).json({
                success: true,
                foundPerson,
                eventByID
            })
        }
        else {

            res.status(402).json({
                success: false,
                msg: "Not Found The Event"
            })
        }
    }
    else {
        res.status(402).json({
            success: false,
            msg: "User  Not Found"

        })
    }


})

