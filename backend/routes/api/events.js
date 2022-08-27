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
    check('userId')
    .exists({checkFalsy:true})
    .custom(value =>{
        return User.findOne({where:{id:value}}).then(user => {
            if (!user) {
              return Promise.reject("User couldn't be found");
            }
          })
    })
    .withMessage("User couldn't be found"),
    check('status')
    .not().isIn(['pending'])
    .withMessage("Cannot change a attendance status to 'pending'"),
    handleValidationErrors
];
const validateQuery = [
    check('page')
        .isInt({min:0})
        .optional("nullable")
        .withMessage("Page must be greater than or equal to 0"),
    check('size')
        .isInt({min:0})
        .optional("nullable")
        .withMessage("Size must be greater than or equal to 0"),
    check('name')
        .isString()
        .optional("nullable")
        .withMessage("Name must be a string"),
    check('type')
        .isIn(['Online', 'In person'])
        .optional("nullable")
        .withMessage("Type must be 'Online' or 'In Person'"),
    check('startDate')
        .isDate()
        .optional("nullable")
        .withMessage("Start date must be a valid datetime"),
    handleValidationErrors
];
//get all events
router.get('/',validateQuery, async (req,res)=>{

    const size = req.query.size || 20
    const page = req.query.page || 0

    const {Op} = require('sequelize')

    const Events = await Event.findAll({
        // where:{
        //     [Op.or]:[
        //         {name : `${req.query.name || ""}`},
        //         {type : `${req.query.type || ""}`},
        //         {startDate : `${req.query.startDate || ""}`},
        //         {}
        //     ]
        // },
        group:['Event.id','Group.id','Venue.id'],
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
        ],
        limit : size,
        // offset : size * (page-1),
        offset: page > 0 ? (size * (page-1)) : 0,
        subQuery:false
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
        group:['Event.id','Images.id','Group.id', 'Venue.id'],
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
    if (event){
        const{groupId} = event
        const eventGroupId = groupId
        const {id} = user
        const {venueId} = req.body
        const venue = await Venue.findByPk(venueId)
        if (!venue){
            const err = new Error("Venue couldn't be found");
            err.status = 404;
            err.message = "Venue couldn't be found"
            return next(err);
        }else{
            const {groupId} = venue
            if(groupId != eventGroupId){
                const err = new Error("Venue doesn't belong to this group");
                err.status = 404;
                err.message = "Venue doesn't belong to this group"
                return next(err);
            }
        }
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
            const images = await Image.findAll({where:{imagableId:eventId, imagableType:'event'}})
            for (let image of images){
                await image.destroy()
            }
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
                    attributes:[],
                    where:{eventId, status:['member', 'waitlist']},
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
    const userId = id
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
                const newAttendee = await Attendee.create({userId,eventId,status:'pending'})
                const {id} = newAttendee
                const response = await Attendee.scope('requestAttendee').findByPk(id)
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
                        const {id, status} = attendee
                        if (status === 'member'){
                            const err = new Error("Failed");
                            err.status = 400;
                            err.message = "User is already an attendee of the event"
                            return next(err);
                        }

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