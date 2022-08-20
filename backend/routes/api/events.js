const express = require('express');
const router = express.Router();
const sequelize = require("sequelize");
const {requireAuth} = require('../../utils/auth');
const { Event, Group, Attendee, Venue,Image } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


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

module.exports = router;