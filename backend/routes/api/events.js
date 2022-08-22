const express = require('express');
const router = express.Router();
const sequelize = require("sequelize");
const {requireAuth} = require('../../utils/auth');
const { Event, Group, Attendee, Venue,Image,Membership } = require('../../db/models');
const { check, body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateEvent = [
    check('venueId')
      .exists({ checkFalsy: true })
      .custom(value => {
        return Venue.findByPk(value).then(venue => {
          if (!venue) {
            return Promise.reject("Venue does not exist");
          }
        })
      })
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
        .isAfter(new Date().toDateString())
        .withMessage("Start date must be in the future"),
    check('endDate')
        .exists({ checkFalsy: true })
        .isAfter(this.startDate)
        .withMessage("End date is less than start date"),
    handleValidationErrors
  ];

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
        const {id} = user
        const membership = await Membership.findOne({where:{memberId:id, groupId}})
        if (membership){
            const {status}= membership
            if (status === 'host'|| status === "co-host"){
            await event.update(req.body)
            const response = await Event.scope('createEvent').findByPk(eventId)
            return res.json(response)
            }
        }
        else{
            const err = new Error("Forbidden");
            err.status = 403;
            err.message = "Forbidden"
            return next(err);
        }
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
module.exports = router;