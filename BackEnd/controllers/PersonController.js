const PersonSchema = require('../model/Person')
const EventSchema = require('../model/Event')

const catchAsyncErrors = require('../middlewares/catchAsyncError');

exports.deletePerson = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.body;
    const deletedPerson = await PersonSchema.findByIdAndDelete(id)
    res.status(200).json({
        success: true,
        deletedPerson
    })
})
exports.findByName = catchAsyncErrors(async (req, res, next) => {

    const name = req.params.name;
    const listUsers = await PersonSchema.find();
    const foundUser = listUsers.find((user) => {
        if (user.name == name) {
            return user;
        }
        else return null;
    })
    if (foundUser)
        res.status(200).json(
            {
                success: true,
                foundUser
            }
        )
    else {
        res.status(402).json(
            {
                success: false,
                msg: "userNotFound"
            }
        )

    }
})
exports.login = catchAsyncErrors(async (req, res, next) => {
    const { name, password } = req.body;
    const listUsers = await PersonSchema.find();

    const users = listUsers.find((user) => {
        if (user.name == name && user.password == password) {

            return user;
        }
        else return null;
    })
    res.status(200).json({
        success: true,
        users
    })


})
exports.getAllpersons = catchAsyncErrors(async (req, res, next) => {
    const allPerons = await PersonSchema.find();
    if (allPerons) {
        res.status(200).json({
            success: true,
            persons: allPerons
        })
    }
    else {
        res.status(402).json({
            success: false,
        })
    }
})
exports.updatePerson = catchAsyncErrors(async (req, res, next) => {
    const { id, name, email, number, password } = req.body;
    const updateUserData =
    {
        name, password, email, number
    };
    const updated = await PersonSchema.findByIdAndUpdate(id, updateUserData)
    if (updated) {
        res.status(200).json({
            success: true,
            updated
        })
    }
    else {
        res.status(402).json({
            success: false,
        })

    }
})
exports.getPersonByID = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.body;

    const personFetched = await PersonSchema.findById(id);
    if (personFetched)
        res.status(200).json({
            success: true,
            personFetched
        })
    else
        res.status(401).json({
            success: false,
        })
})

exports.addPerson = catchAsyncErrors(async (req, res, next) => {
    const { name, email, number, password } = req.body;
    const personCreated = await PersonSchema.create({
        name, password, email, number
    });
    res.status(200).json({
        success: true,
        personCreated
    })
})
exports.requestsById = catchAsyncErrors(async (req, res, next) => {
    const { userId } = req.params.userId;
    const foundPerson = await PersonSchema.findById(userId);
    if (foundPerson) {
        const requestList =  foundPerson.requests;
    
        res.status(200).json({
            success: true,
            requestList
        })
    }
    else 
    {
        res.status(402).json({
            success: false

        })
    }


})
exports.acceptRequest = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,

    })

})


