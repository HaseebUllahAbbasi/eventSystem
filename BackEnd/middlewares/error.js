const ErrorHandler = require('../utils/ErrorHandler')
module.exports = (err,req,res,next)=>
{
    err.statusCode = err.StatusCode || 500;
    res.status(err.statusCode).json(
        {
            success:false,
            error:err,
            errMessage: err.message,
            stack: err.stack
        }
    )
}