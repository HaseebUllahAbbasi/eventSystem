const mongoose = require('mongoose')
const NotesSchema = new mongoose.Schema({
    eventId: {
        type:String,
        required:[true,"Please Enter the Event Id "],
        maxlength:[25,"Id invalid"]
    },
    NotesText: {
        type: String,   
        required: [true, "please Enter Task"],
        maxlength: [80, "Your Name cannot exceed 80 charachters"],
    },
}
)

module.exports = mongoose.model('Note',NotesSchema);
