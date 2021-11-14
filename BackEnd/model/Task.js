const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema(
    {
        eventId: {
            type:String,
            required:[true,"Please Enter the Event Id "],
            maxlength:[25,"Id invalid"]
        },
        taskText: {
            type: String,   
            required: [true, "please Enter Task"],
            maxlength: [50, "Your Name cannot exceed 50 charachters"],
        },
        assignTo:
        {
            type:String,
            required:[true,"Please Enter the Person Id "],
            maxlength:[25,"Id invalid"]
        },
        taskStatus:
        {
            type: Boolean        
        }
    }
)
module.exports = mongoose.model('Task',TaskSchema);
