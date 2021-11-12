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
    },
    team: [PersonSchema],
    tasks: [TaskSchema],
    guestList: [GuestSchema],
    notes: [NotesSchema],
    eventStatus: {
        type: Boolean,
        required: [true, "please Enter Event Status"],
    }
}
)
module.exports = mongoose.model('Event',EventSchema);
