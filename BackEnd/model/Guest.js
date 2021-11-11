const mongoose = require('mongoose')
const GuestSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please Enter Name"],
            maxlength: [30, "Your Name cannot exceed 30 charachters"],
            unique:[true,"User Already Exists with Name"]
        },
        number:
        {
            type: String,
            required: [true, "please Enter Number"],
            maxlength: [11, "Your Number cannot exceed 11 Numbers"],
            unique:[true,"User Already Exists with Number"]
        }
    }
)
module.exports = mongoose.model('Guest',GuestSchema);
