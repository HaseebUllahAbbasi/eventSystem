const PersonSchema = require('../model/Person')
const EventSchema = require('../model/Event')
const GuestSchema = require('../model/Guest')
const NotesSchema = require('../model/Notes')
const TaskSchema = require('../model/Task')

const catchAsyncErrors = require('../middlewares/catchAsyncError');
exports.getMembersByEvent = catchAsyncErrors(async (req, res, next) => {
    const { eventId } = req.params;
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

        if (event.team.length == 0) {
            res.status(401).json(
                {
                    success: false,
                    message: "No Team Members"
                }
            )

        }
        else {
            let index = 0;
            const team = event.team;
            for (let i = 0; i < team.length; i++) {
                if (team.name == memberName) {
                    index = i;
                    break;
                }
            }
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
                let indexPerson = 0;
                for (let j = 0; j < memberList.length; j++) {
                    if (memberList[j].id == eventId) {
                        indexPerson = j;
                    }
                }
                memberList.splice(indexPerson, 1);
                const UpdatedEvent = await EventSchema.updateOne({ _id: eventId }, { team: [...team] });
                const updatedPerson = await PersonSchema.updateOne({ _id: memberId }, { member: [...memberList] });

                res.status(200).json({
                    success: true,
                    message: "removed the person",
                    memberList,
                    team,
                })

            }

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
        res.status(404).json(
            {
                success: false,
                message: "Not Found"
            }
        )
    }

})
exports.removeNote = catchAsyncErrors(async (req, res, next) => {
    const { eventId, plannerId, noteId } = req.body;
    const event = await EventSchema.findById(eventId);
    if (event) {
        if (event.userId == plannerId) {
            // const deletedNote = await NotesSchema.deleteOne({ _id: noteId });
            const notesList = event.notes;
            const index = notesList.indexOf(noteId);
            if (index != -1) {
                notesList.splice(index, 1);
                const updatedEvent = await EventSchema.updateOne({ _id: event._id }, { notes: [...event.notes] });
                res.status(200).json(
                    {
                        success: true,
                        notesList,
                        message: "note removed",
                        updatedEvent
                    }
                )

            }
            else {
                res.status(200).json(
                    {
                        success: false,
                        message: "note Not Found"
                    }
                )
            }
        }
        else {
            res.status(200).json(
                {
                    success: false,
                    message: "Not Authorized"
                }
            )
        }
    }
    else {
        res.status(404).json(
            {

                success: false,
                message: "Not Found"
            }
        )
    }

})
exports.getGuestByEvent = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const GuestList = await GuestSchema.find();
    const filteredList = GuestList.filter(guest => guest.eventId == id);
    if (filteredList.length == 0) {
        res.status(200).json(
            {
                success: false,
                message: "No Guests"
            }
        )

    }
    else {
        res.status(200).json(
            {
                success: true,
                guestList: filteredList,
                guests: filteredList.length
            }
        )
    }
})
exports.removeGuest = catchAsyncErrors(async (req, res, next) => {
    const { eventId, plannerId, guestId } = req.body;

    const event = await EventSchema.findById(eventId);
    if (event) {
        if (event.userId == plannerId) {
            const deletedGuest = await GuestSchema.deleteOne({ _id: guestId });

            const guestList = event.guestList;
            const index = guestList.indexOf(guestId);
            if (index != -1) {
                guestList.splice(index, 1);
                const updatedEvent = await EventSchema.updateOne({ _id: eventId }, { guestList: [...guestList] });
                res.status(200).json(
                    {
                        success: true,
                        guestList,
                        message: "Guest removed",
                        updatedEvent
                    }
                )
            }
            else {
                res.status(200).json(
                    {
                        success: false,
                        message: "guest  Not Found"
                    }
                )
            }

        }
        else {
            res.status(200).json(
                {
                    success: false,
                    message: "Not Authorized"
                }
            )

        }

    }
    else {
        res.status(404).json(
            {
                success: false,
                message: "Not Found"
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
    const filteredPerson = personsById.filter(person => person.name == taskAssignedTo);
    if (filteredPerson.length == 0) {
        res.status(200).json({
            success: false,
            message: "Person Not Found",
        })
    }
    else {
        let found = false;
        for (let i = 0; i < eventById.team.length; i++) {
            if (eventById.team[0].name == taskAssignedTo)
                found = true;
        }
        if (found==false) 
        {
            res.status(200).json({
                success: false,
                message: "Person is Not Team Member",
            })  

        }
        else {
            eventById.tasks.push(taskCreated._id);
            filteredPerson[0].tasks.push(taskCreated._id)
            const UpdatedEvent = await EventSchema.updateOne({ _id: eventById._id }, { tasks: [...eventById.tasks] });
            const updatedPerson = await PersonSchema.updateOne({ _id: filteredPerson[0]._id }, { tasks: [...filteredPerson[0].tasks] });

            res.status(200).json({
                success: true,
                taskCreated,
            })
        }


    }

})


exports.getNotesOfEvent = catchAsyncErrors(async (req, res, next) => {
    const { eventId } = req.body;
    const notesList = await NotesSchema.find();

    
    const noteListsFound = notesList.filter(note => note.eventId == eventId);
    

    if (noteListsFound.length != 0) {
        res.status(200).json(
            {
                success: true,
                noteListsFound,
            }
        )
    }
    else {
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
            number: guestNumber,
            eventId: eventId
        });

        event.guestList.push(guestCreated._id)
        const guestList = event.guestList;
        const updatedEvent = await EventSchema.updateOne({ _id: eventId }, { guestList: [...guestList] });
        res.status(200).json(
            {
                success: true,
                guestList
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
