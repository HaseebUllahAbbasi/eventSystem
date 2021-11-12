const PersonSchema = require('../model/Person')
const EventSchema = require('../model/Event')


const catchAsyncErrors = require('../middlewares/catchAsyncError');
exports.createEvent = catchAsyncErrors(async (req, res, next) => {
    const { plannerId,eventName,eventStatus } = req.body;
    const eventCreated = await  EventSchema.create({
        userId: plannerId,
        eventName: eventName,
        eventStatus: eventStatus,
    })
    res.status(200).json(
        {
            success:true,
            eventCreated
        }
    )
})

exports.sendRequest = catchAsyncErrors(async (req,res,next)=>
{
  //  from the event 
    // to be implemented
})
exports.addGuest = catchAsyncErrors(async (req,res,next)=>{
    const {eventId, plannerId, guestName, guestNumber} = req.body;
    const  event = await EventSchema.findById(eventId);
    if(event)
    {
        const eventList = event.guestList; 
        event.guestList.push({
            name:guestName,
            number:guestNumber
        })
        const updatedEvent = await  EventSchema.updateOne(event);
        res.status(200).json(
            {
                success:true,
                updatedEvent
            }
        )
    }
    else
    {
        res.status(402).json(
            {
                success: false
            }
        )
    }
}) 
exports.getEventByID = catchAsyncErrors(async (req,res,next)=>
{
    const eventId =  req.params.eventId;
    const event = await EventSchema.findById(eventId);
    if(event)
    res.status(200).json({
        success:true,
        event
    })
    else
    res.status(402).json({
        success:false
    })
})