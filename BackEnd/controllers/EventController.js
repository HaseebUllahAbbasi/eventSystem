const PersonSchema = require('../model/Person')
const EventSchema = require('../model/Event')
const GuestSchema = require('../model/Guest')
const NotesSchema = require('../model/Notes')
const TaskSchema = require('../model/Task')

const catchAsyncErrors = require('../middlewares/catchAsyncError');
exports.getMembersByEvent = catchAsyncErrors(async (req, res, next) => {
    const { eventId } = req.body;
    const event = await EventSchema.findById(eventId);
    if (event) {
        if (event.team.length == 0) {

            res.status(401).json(
                {
                    success: false,
                    message: "No Team Members"
                }
            )
        }
        else {
            const team = event.team;

            res.status(200).json({
                success: true,
                members: team.length,
                team,
            })
        }

    }
    else {
        res.status(404).json(
            {
                success: false,
                message: "Not Found With Id"
            }
        )
    }
})
exports.removeMember = catchAsyncErrors(async (req, res, next) => {
    const { eventId, plannerId, memberId, memberName } = req.body;
    const event = await EventSchema.findById(eventId);
    if (event) {
        if (event.userId == plannerId) {
            if (event.team.length == 0) {
                res.status(401).json(
                    {
                        success: false,
                        message: "No Team Members"
                    }
                )
            }
            else {
                const team = event.team;
                const index = team.indexOf({ id: memberId, name: memberName });
                if (index == -1) {
                    res.status(404).json(
                        {
                            success: false,
                            message: "Not Found With Id"
                        }
                    )
                }
                else {
                    team.splice(index, 1);
                    personFound = await PersonSchema.findById(memberId);

                    const memberList = personFound.member;
                    const indexPerson = team.indexOf({ id: memberId, name: memberName });
                    memberList.splice(indexPerson, 1);
                    const UpdatedEvent = await EventSchema.updateOne({ _id: eventByID._id }, { team: [...team] });
                    const updatedPerson = await PersonSchema.updateOne({ _id: foundPerson._id }, { member: [...memberList] });



                }

            }
        }
        else {
            res.status(300).json(
                {
                    success: false,
                    message: "not Authorized"
                }
            )
        }


    }
    else {
        res.status(404).json(
            {
                success: false,
                message: "Not Found With Id"
            }
        )
    }

})

exports.createEvent = catchAsyncErrors(async (req, res, next) => {
    const { userName, plannerId, eventName, eventStatus, eventDesc } = req.body;
    const eventCreated = await EventSchema.create({
        userId: plannerId,
        eventName: eventName,
        eventStatus: eventStatus,
        eventDesc: eventDesc,
        userName: userName
        // team : []
    })
    res.status(200).json(
        {
            success: true,
            eventCreated
        }
    )
})
exports.getTasksByEventId = catchAsyncErrors(async (req, res, next) => {
    const { eventId } = req.params;
    const events = await TaskSchema.find();
    const taskByEventId = events.filter(item => {
        if (eventId == item.eventId) {
            return item;
        }
    })
    res.status(200).json(
        {
            success: true,
            tasks: taskByEventId
        }
    )

})
exports.getAllEvents = catchAsyncErrors(async (req, res, next) => {
    const events = await EventSchema.find();
    if (events) {
        res.status(200).json({
            success: true,
            events: events
        })
    }
})
exports.addNotes = catchAsyncErrors(async (req, res, next) => {
    const { eventId, plannerId, noteText } = req.body;

    const event = await EventSchema.findById(eventId);
    if (event) {

        const noteCreated = await NotesSchema.create({
            eventId: eventId,
            NotesText: noteText
        })

        event.notes.push(noteCreated._id);
        const updatedEvent = await EventSchema.updateOne({ _id: event._id }, { notes: [...event.notes] });


        res.status(200).json(
            {
                success: true,
                event: event,
                note: noteCreated
            }
        )
    }
    else {
        res.status(402).json(
            {
                success: false
            }
        )
    }

})
exports.removeNote = catchAsyncErrors(async (req, res, next) => {
    const { eventId, plannerId, noteId  } = req.body;

    const event = await EventSchema.findById(eventId);
    if (event) 
    {

    }
    else {
        res.status(404).json(
            {
                success: false,
                message: "No Event"
            }
        )
    }

})
exports.sendRequestByName = catchAsyncErrors(async (req, res, next) => {
    const { plannerId, eventId, eventName, recipientName } = req.body;
    const foundUsers = await PersonSchema.find();
    foundUser = foundUsers.filter(user => user.name == recipientName);

    if (foundUser[0]) {
        foundUser[0].requests.push({ id: eventId, name: eventName });
        const updated = await PersonSchema.updateOne({ _id: foundUser[0]._id }, { requests: [...foundUser[0].requests] })

        res.status(200).json({
            success: true,
            foundUser
        })
    }
    else
        res.status(402).json({
            success: false
        })
})

exports.sendRequest = catchAsyncErrors(async (req, res, next) => {
    const { plannerId, eventId, eventName, recipientId } = req.body;
    const foundUser = await PersonSchema.findById(recipientId);
    if (foundUser) {

        foundUser.requests.push({ id: eventId, name: eventName });

        const updated = await PersonSchema.updateOne({ _id: foundUser._id }, { requests: [...foundUser.requests] })

        res.status(200).json({
            success: true,
            foundUser
        })

    }
    else
        res.status(402).json({
            success: false
        })
})

exports.changeStatus = catchAsyncErrors(async (req, res, next) => {
    const { plannerId, eventId, eventStatus } = req.body;
    const eventById = await EventSchema.findById(eventId);

    if (eventById.userId) {
        if (eventById.userId == plannerId) {
            eventById.status = eventStatus;
            const updated = await EventSchema.updateOne({ _id: eventById._id }, { eventStatus: eventStatus });
            res.status(200).json(
                {
                    success: true,
                    event: eventById
                }
            )
        }
        else
            res.status(401).json({
                success: false,
                message: "Not Authorized"
            })


    }
    else {
        res.status(404).json({
            success: false,
            message: "Not Found the Event"
        })
    }

})

exports.changeDesc = catchAsyncErrors(async (req, res, next) => {
    const { plannerId, eventId, eventDesc } = req.body;
    const eventById = await EventSchema.findById(eventId);

    if (eventById.userId) {
        if (eventById.userId == plannerId) {
            eventById.eventDesc = eventDesc;
            const updated = await EventSchema.updateOne({ _id: eventById._id }, { eventById });
            res.status(200).json(
                {
                    success: true,
                    event: eventById
                }
            )
        }
        else
            res.status(401).json({
                success: false,
                message: "Not Authorized"
            })


    }
    else {
        res.status(404).json({
            success: false,
            message: "Not Found the Event"
        })
    }

})

exports.assignTask = catchAsyncErrors(async (req, res, next) => {
    const { plannerId, eventId, taskAssignedTo, taskText } = req.body;
    const taskCreated = await TaskSchema.create({
        eventId: eventId,
        taskText: taskText,
        assignTo: taskAssignedTo
    })
    const eventById = await EventSchema.findById(eventId);
    const personById = await PersonSchema.findById(taskAssignedTo)
    eventById.tasks.push(taskCreated._id);
    personById.tasks.push(taskCreated._id)
    const UpdatedEvent = await EventSchema.updateOne({ _id: eventById._id }, { eventById });
    const updatedPerson = await PersonSchema.updateOne({ _id: personById._id }, { personById });

    res.status(200).json({
        success: true,
        taskCreated,
    })
})
exports.assignTaskByName = catchAsyncErrors(async (req, res, next) => {
    const { plannerId, eventId, taskAssignedTo, taskText } = req.body;
    const taskCreated = await TaskSchema.create({
        eventId: eventId,
        taskText: taskText,
        assignTo: taskAssignedTo
    })
    const eventById = await EventSchema.findById(eventId);
    const personsById = await PersonSchema.find();
    personById = personsById.filter(person => person.name == taskAssignedTo);
    if (personsById) 
    {
        eventById.tasks.push(taskCreated._id);
        personById.tasks.push(taskCreated._id)
        const UpdatedEvent = await EventSchema.updateOne({ _id: eventById._id }, { eventById });
        const updatedPerson = await PersonSchema.updateOne({ _id: personById._id }, { personById });

        res.status(200).json({
            success: true,
            taskCreated,
        })
    }
    else
    {
        res.status(404).json({
            success: false,
            message: "Person Not Found",
        })
    
    }

})


exports.getNotesOfEvent = catchAsyncErrors(async (req, res, next) => {
    // const { eventId } = req.body;
    // const notesList = await NotesSchema.find();
    // const noteListsFound = notesList.filter(note => note.eventId == eventId); 
         
    // res.status(200).json(
    //     {
    //         success: true,
    //         noteListsFound
    //     }
    // )

    const { eventId } = req.body;
    const notesList = await NotesSchema.find();

    const noteListsFound  =  notesList.filter(note => note.eventId == eventId);
    
    if(noteListsFound.length != 0 )
    {
        res.status(200).json(
            {
                success: true,
                noteListsFound,
            }
        )
    }
    else
    {
        res.status(200).json(
            {
                success: false,
                message: "No Notes",
                noteListsFound,
                notesList
            
            }
        )
    }
})
exports.addGuest = catchAsyncErrors(async (req, res, next) => {
    const { eventId, plannerId, guestName, guestNumber } = req.body;
    const event = await EventSchema.findById(eventId);
    if (event) {
        const guestCreated = await GuestSchema.create({
            name: guestName,
            number: guestNumber
        });

        const eventList = event.guestList;
        event.guestList.push(guestCreated._id)
        const updatedEvent = await EventSchema.updateOne({ _id: event._id }, { event });
        res.status(200).json(
            {
                success: true,
                updatedEvent
            }
        )
    }
    else {
        res.status(402).json(
            {
                success: false
            }
        )
    }
})
exports.getEventByID = catchAsyncErrors(async (req, res, next) => {
    const eventId = req.params.eventId;
    const event = await EventSchema.findById(eventId);
    if (event)
        res.status(200).json({
            success: true,
            event
        })
    else
        res.status(402).json({
            success: false
        })
})
