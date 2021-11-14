const PersonSchema = require('../model/Person')
const EventSchema = require('../model/Event')
const GuestSchema = require('../model/Guest')
const NotesSchema = require('../model/Notes')
const TaskSchema = require('../model/Task')

const catchAsyncErrors = require('../middlewares/catchAsyncError');
const { truncate } = require('fs')
exports.createEvent = catchAsyncErrors(async (req, res, next) => {
    const { plannerId, eventName, eventStatus } = req.body;
    const eventCreated = await EventSchema.create({
        userId: plannerId,
        eventName: eventName,
        eventStatus: eventStatus,
    })
    res.status(200).json(
        {
            success: true,
            eventCreated
        }
    )
})
exports.getTasksByEventId =catchAsyncErrors(async (req, res, next) => 
{
    const {eventId} = req.params;
    const events = await TaskSchema.find();
    events.map(item=> {
        if(eventId ==item.eventId)
        {
            return item;
        }
        else return null;
    }) 
    res.status(200).json(
        {
            success:true
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
        const updatedEvent = await EventSchema.updateOne(event);

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
exports.sendRequest = catchAsyncErrors(async (req, res, next) => {
    const { plannerId, eventId,recipientId } = req.body;
    const foundUser = await PersonSchema.findById(recipientId);
    if (foundUser) {

        foundUser.requests.push(eventId);
        const updated =  await  PersonSchema.updateOne(foundUser)
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
exports.assignTask =  catchAsyncErrors(async (req, res, next) => {
    const {plannerId,eventId, taskAssignedTo, taskText } = req.body;
    const taskCreated =  await TaskSchema.create({
        eventId: eventId,
        taskText:taskText,
        assignTo:taskAssignedTo
    })
    const eventById =  await EventSchema.findById(eventId);
    const personById =  await PersonSchema.findById(taskAssignedTo)
    eventById.tasks.push(taskCreated._id);
    personById.tasks.push(taskCreated._id)
    const UpdatedEvent = await EventSchema.updateOne(eventById);
    const updatedPerson = await PersonSchema.updateOne(personById);
            
    res.status(200).json({
        success:true,
        taskCreated,
    })


})
exports.getNotesOfEvent = catchAsyncErrors(async (req, res, next) => {
    const { eventId } = req.body;
    const notesList = await NotesSchema.find();
    const noteListsFound = notesList.map((note) => {
        if (note.eventId == eventId) {
            return note;
        }
        else return null;
    });

    res.status(200).json(
        {
            success: true,
            noteListsFound
        }
    )
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
        const updatedEvent = await EventSchema.updateOne(event);
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