const express = require('express');
const router = express.Router();
const sequelize = require("sequelize");
const {requireAuth} = require('../../utils/auth');
const { Event, Group, Attendee, Venue,Image,Membership,User } = require('../../db/models');
const { check, body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateEvent = [
    check('venueId')
      .exists({ checkFalsy: true })
      .withMessage("Venue does not exist"),
    check('name')
      .exists({ checkFalsy: true })
      .isLength({min:5})
      .withMessage("Name must be at least 5 characters"),
    check('type')
      .exists({ checkFalsy: true })
      .isIn(['Online','In person'])
      .withMessage("Type must be 'Online' or 'In person'"),
    check('capacity')
      .exists({ checkFalsy: true })
      .isInt()
      .withMessage("Capacity must be an integer"),
    check('price')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage("Price is invalid"),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check('startDate')
        .exists({ checkFalsy: true })
        .isAfter()
        .withMessage("Start date must be in the future"),
    check('endDate')
        .exists({ checkFalsy: true })
        .custom((value, {req} )=>{
            if (new Date(value) < new Date(req.body.startDate)){
               return false
              }
              return true
        })
        .withMessage("End date is less than start date"),
    handleValidationErrors
  ];
const validateAttendee =[
    check('status')
    .not().isIn(['pending'])
    .withMessage("Cannot change a attendance status to 'pending'"),
    handleValidationErrors
]
//get all events
router.get('/', async (req,res)=>{
    const Events = await Event.findAll({
        group:['Group.id'],
        attributes:{
            include:[[
                sequelize.fn("COUNT", sequelize.col("Attendees.id")),
                "numAttending"
            ]],
            exclude:['capacity', 'price', 'description','createdAt','updatedAt']
        },
        include:[
            {
                model:Attendee,
                attributes:[]
            },
            {
                model:Group,
                attributes:['id','name', 'city','state']
            },
            {
                model:Venue,
                attributes:['id', 'city','state']
            }
        ]
    })
    for (let event of Events){
        const {startDate, endDate} = event
        const startDateObj = new Date(startDate).toLocaleString('sv')
        const endDateObj = new Date(endDate).toLocaleString('sv')
        event.dataValues.startDate = startDateObj
        event.dataValues.endDate = endDateObj
    }
    res.json({Events})
})
//get details of an event
router.get('/:eventId', async (req,res,next)=>{
    const eventId = req.params.eventId
    const event = await Event.findByPk(eventId, {
        group:['Images.id'],
        attributes:{
            include:[[
                sequelize.fn("COUNT", sequelize.col("Attendees.id")),
                "numAttending"
            ]],
            exclude:['createdAt','updatedAt', 'previewImage']
        },
        include:[
            {
                model:Attendee,
                attributes:[]
            },
            {
                model:Group,
                attributes:['id','name','private','city','state']
            },
            {
                model:Venue,
                attributes:{
                    exclude:['groupId','createdAt', 'updatedAt']
                }
            },
            {
                model:Image,
                attributes:['id','imagableId', 'url']
            }
        ]
    })
    if (event){
        const {startDate, endDate} = event
        const startDateObj = new Date(startDate).toLocaleString('sv')
        const endDateObj = new Date(endDate).toLocaleString('sv')
        event.dataValues.startDate = startDateObj
        event.dataValues.endDate = endDateObj
        res.json(event)
    }else{
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.message = "Event couldn't be found"
        return next(err);
    }
})
//add an image to an event
router.post('/:eventId/images', requireAuth, async (req,res,next)=>{
    const {url} = req.body
    const eventId = req.params.eventId
    const {user} = req
    const event = await Event.findByPk(eventId)
    if (event){
        const {id} = user
        const userId = id
        const attendee = await Attendee.findOne({where:{userId, eventId}})
        if (attendee){
            const {status}= attendee
            if (status === 'member'){
                const newImage = await event.createImage({userId,url})
                const {id} = newImage
                const response = await Image.findByPk(id, {
                    attributes:['id','imagableId','url']
                })
                return res.json(response)
            }
        }

        const err = new Error("Forbidden");
        err.status = 403;
        err.message = "Forbidden"
        return next(err);
    }else{
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.message = "Event couldn't be found"
        return next(err);
    }
})
//edit an event
router.put('/:eventId', requireAuth,validateEvent, async (req,res, next)=>{

    const eventId = req.params.eventId
    const {user} = req
    const event = await Event.scope('createEvent').findByPk(eventId)
    const {venueId} = req.body
    const venue = await Venue.findByPk(venueId)
    if (!venue){
        const err = new Error("Venue couldn't be found");
        err.status = 404;
        err.message = "Venue couldn't be found"
        return next(err);
    }
    if (event){
        const{groupId} = event
        const {id} = user
        const membership = await Membership.findOne({where:{memberId:id, groupId}})
        if (membership){
            const {status}= membership
            if (status === 'host'|| status === "co-host"){
            await event.update(req.body)
            const response = await Event.scope('createEvent').findByPk(eventId)
            const {startDate, endDate} = response
            const startDateObj = new Date(startDate).toLocaleString('sv')
            const endDateObj = new Date(endDate).toLocaleString('sv')
            response.dataValues.startDate = startDateObj
            response.dataValues.endDate = endDateObj
            return res.json(response)
            }
        }
        const err = new Error("Forbidden");
        err.status = 403;
        err.message = "Forbidden"
        return next(err);
    }
    else{
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.message = "Event couldn't be found"
        return next(err);
    }
})
// delete an event
router.delete('/:eventId', requireAuth, async (req,res,next)=>{
    const eventId = req.params.eventId
    const {user} = req
    const event = await Event.findByPk(eventId)
    if (event){
        const{groupId} = event
        const {id} = user
        const membership = await Membership.findOne({where:{memberId:id, groupId}})
        if (membership){
            const {status}= membership
            if (status === 'host'|| status === "co-host"){
            await event.destroy()
            return res.send({
                "message": "Successfully deleted"
              })
            }
        }
        const err = new Error("Forbidden");
        err.status = 403;
        err.message = "Forbidden"
        return next(err);

    }
    else{
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.message = "Event couldn't be found"
        return next(err);
    }
})
//get all attendees of an event
router.get('/:eventId/attendees', async (req,res,next)=>{
    const eventId = req.params.eventId
    const event = await Event.findByPk(eventId)
    const {id}= req.user
    if (event){
        const {groupId}= event
        const membership = await Membership.findOne({where:{memberId:id, groupId}})
        if (membership){
            const {status}= membership
            if(status === 'host' || status === 'co-host'){
                const Attendees = await User.findAll({
                    attributes:['id', 'firstName', 'lastName'],
                    include :{
                        model:Attendee,
                        as: 'Attendance',
                        attributes:[],
                        where:{eventId}
                    }

                })
                for (const user of Attendees){
                    const {id} = user
                    const attendee = await Attendee.findOne({where:{userId:id, eventId},
                    attributes:['status']})
                    user.dataValues.Attendance = attendee
                }
                return res.json({Attendees})
            }
        }
            const Attendees = await User.findAll({
                attributes:['id', 'firstName', 'lastName'],
                include:{
                    model: Attendee,
                    
                    attributes:['status'],
                    where:{eventId, status:['member', 'waitlist']},
                }
            })
            return res.json({Attendees})
    }
    else{
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.message = "Event couldn't be found"
        return next(err);
    }
})
//request attendance for an event
router.post('/:eventId/attendees',requireAuth, async(req,res,next)=>{
    const eventId = req.params.eventId
    const {user} = req
    const {id} = user
    const event = await Event.findByPk(eventId)
    if(event){
        const{groupId} = event
        const membership = await Membership.findOne({where:{memberId:id,groupId, status:['member','co-host','host']}})
        if(membership){
            const attendee = await Attendee.findOne({where:{userId:id,eventId}})
            if(attendee){
                const {status} = attendee
                if(status === 'pending'){
                    const err = new Error("Failed");
                    err.status = 400;
                    err.message = "Attendance has already been requested"
                    return next(err);
                }
                else if(status === 'member' || status === "waitlist"){
                    const err = new Error("Failed");
                    err.status = 400;
                    err.message = "User is already an attendee of the event"
                    return next(err);
                }
            }else{
                const newAttendee = await Attendee.create({userId:id,eventId,status:'pending'})
                const {id} = newAttendee
                const response = await Attendee.findByPk(id)
                res.json(response)
            }
        }
        else{
            const err = new Error("Forbidden");
            err.status = 403;
            err.message = "Forbidden"
            return next(err);
        }
    }else{
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.message = "Event couldn't be found"
        return next(err);
    }
})
//change status of an attendance
router.put('/:eventId/attendees', requireAuth,validateAttendee, async (req,res, next)=>{
    const eventId = req.params.eventId
    const event = await Event.findByPk(eventId)
    const {id} = req.user
    if(event){
        const {groupId} = event
        const membership = await Membership.findOne({where:{memberId:id, groupId}})
        if (membership){
            const {status}= membership
            if (status === 'host' || status === 'co-host'){
                const {userId,status} = req.body
                if (status === 'member'){
                    const attendee = await Attendee.findOne({where:{userId,eventId},
                    attributes:['id','userId', 'eventId','status','createdAt','updatedAt']})
                    if (attendee){
                        const {id} = attendee
                        await attendee.update({status})
                        const response = await Attendee.findByPk(id, {
                            attributes:['id', 'userId','eventId','status']
                        })
                        return res.json(response)
                    }else{
                        const err = new Error("Failed");
                        err.status = 404;
                        err.message = "Attendance between the user and the event does not exist"
                        return next(err);
                    }
                }
            }
        }
        const err = new Error("Forbidden");
        err.status = 403;
        err.message = "Forbidden"
        return next(err);
    }
    else{
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.message = "Event couldn't be found"
        return next(err);
    }
})
//delete attendance to an event
router.delete('/:eventId/attendees',requireAuth, async(req,res,next)=>{
    const eventId = req.params.eventId
    const event = await Event.findByPk(eventId)
    if(event){
        const {groupId} = event
        const {id} = req.user
        const membership = await Membership.findOne({where:{memberId:id,groupId}})
        if(membership){
            const {status} = membership
            const {userId} = req.body
            const attendee = await Attendee.findOne({where:{userId, eventId}})
            if (attendee){
                if(status === 'host' || userId === id){
                    await attendee.destroy()
                    return res.send({
                        "message": "Successfully deleted attendance from event"
                      })
                }
            }else{
                const err = new Error("Failed");
                err.status = 404;
                err.message = "Attendance does not exist for this User"
                return next(err);
            }
        }
        const err = new Error("Forbidden");
        err.status = 403;
        err.message = "Only the User or organizer may delete an Attendance"
        return next(err);


    }else{
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.message = "Event couldn't be found"
        return next(err);
    }
})
module.exports = router;