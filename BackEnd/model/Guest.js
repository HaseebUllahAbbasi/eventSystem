const mongoose = require('mongoose')
const GuestSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please Enter Name"],
            maxlength: [30, "Your Name cannot exceed 30 charachters"],
        },
        number:
        {
            type: String,
            required: [true, "please Enter Number"],
            maxlength: [11, "Your Number cannot exceed 11 Numbers"],
        },
        eventId: {
            type: String,
            required: [true, "Please Enter the Event Id "],
            maxlength: [25, "Id invalid"]
        },
    }
)
module.exports = mongoose.model('Guest',GuestSchema);
