const PersonSchema = require('../model/Person')
const catchAsyncErrors = require('../middlewares/catchAsyncError');

exports.deletePerson = catchAsyncErrors(async (req, res, next) => {
    const {id} =  req.body;
    const deletedPerson  = await PersonSchema.findByIdAndDelete(id)  
    

    res.status(200).json({
        success: true,
        personCreated
    })
}
)
exports.updatePerson = catchAsyncErrors(async (req, res, next) => {
    const {id,name,email,number} =  req.body;
    const deletedPerson  = await PersonSchema.findByIdAndUpdate({id})  
    

    res.status(200).json({
        success: true,
        personCreated
    })
}
)



exports.addPerson = catchAsyncErrors(async (req, res, next) => {
    const { name, email, number, password } = req.body;
    const personCreated = await PersonSchema.create({
        name, password, email, number
    });


    res.status(200).json({
        success: true,
        personCreated
    })

    console.log("Person Created", personCreated)
})
