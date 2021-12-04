const mongoose = require('mongoose')
const PersonSchema = require('./Person').schema
const TaskSchema = require('./Task').schema
const GuestSchema = require('./Guest').schema
const NotesSchema = require('./Notes').schema

const EventSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "Please Enter the Event Organizer Id "],
        maxlength: [25, "Id invalid"]
    },
    eventName: {
        type: String,
        required: [true, "Please Enter Event Name"],
        maxlength: [20, "Your Name cannot exceed 20 charachters"],
        unique:[true,"Event Already Exists with Name"]
    },
    eventDesc: {
        type: String,
        required: [true, "Please Enter Event Description"],
        maxlength: [40, "Event Description cannot exceed 40 charachters"],
    },
    userName: {
        type: String,
        required: [true, "Please Admin User Name of Event"],
        maxlength: [30, "Your Name cannot exceed 30 charachters"],
    },
    team: [],
    tasks: [],
    guestList: [],
    notes: [],
    eventStatus: {
        type: Boolean,
        required: [true, "please Enter Event Status"],
    }
}
)
module.exports = mongoose.model('Event',EventSchema);
