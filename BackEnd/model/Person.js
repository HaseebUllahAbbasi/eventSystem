const mongoose = require('mongoose')
const PersonSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please Enter Name"],
            maxlength: [30, "Your Name cannot exceed 30 charachters"],
            unique:[true,"User Already Exists with Name"]
        },
        email:
        {
            type: String,
            required: [true, "please Enter Email"],
            maxlength: [50, "Your Name cannot exceed 50 charachters"],
            unique:[true,"User Already Exists with Email"]
        },
        number:
        {
            type: String,
            required: [true, "please Enter Number"],
            maxlength: [11, "Your Number cannot exceed 11 Numbers"],
            unique:[true,"User Already Exists with Number"]
        },
        password:
        {
            type: String,
            required: [true, "please Enter password"],  
            maxlength: [20, "Your Number cannot exceed 20 charachters"]
        },
        requests:[],
        member:[],
        tasks:[]
    }
)
module.exports = mongoose.model('Person',PersonSchema);
