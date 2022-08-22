const express = require('express')
const router = express.Router();
const sequelize = require("sequelize");
const { requireAuth} = require('../../utils/auth');
const { Group, Image, User, Venue,Membership, Attendee, Event } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateGroup = [
    check('name')
      .exists({ checkFalsy: true })
      .isLength({max:60, min:2})
      .withMessage("Name must be 60 characters or less"),
    check('about')
      .exists({ checkFalsy: true })
      .isLength({min:50})
      .withMessage("About must be 50 characters or more"),
    check('type')
      .exists({ checkFalsy: true })
      .isIn(['Online','In person'])
      .withMessage("Type must be 'Online' or 'In person'"),
    check('private')
        .exists({ checkFalsy: true })
        .isBoolean()
        .withMessage('Private must be a boolean'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage("City is required"),
      check('state')
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    handleValidationErrors
  ];
  const validateVenue = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage("Longitude is not valid"),
    handleValidationErrors
  ];
  const validateImage = [
    check('url')
    .exists({ checkFalsy: true })
    .withMessage("Url is required"),
    handleValidationErrors
  ];
  const venueId = Venue.findAll({
    attributes:['id'],
    limit: 1,
    order:[['id', 'DESC']]
  })

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
        .custom((value, {req} )=>{
            if (new Date(value).toISOString() < new Date(req.body.startDate).toISOString()){
               return false
              }
        })
        // .isAfter(new Date('startDate').toDateString())
        .withMessage("End date is less than start date"),
    handleValidationErrors
  ];
//get all groups
router.get('/', async (req,res)=>{
    const Groups = await Group.findAll()
    res.json({Groups})
})
//get details of a group
router.get('/:groupId', async (req,res,next)=>{
    const groupId = req.params.groupId
    const check = await Group.findByPk(groupId)
    if (check){
    const group = await Group.findByPk(groupId, {
        attributes:{
            include:[[
                sequelize.fn("COUNT", sequelize.col("Memberships.id")),
                "numMembers"
            ]],
            exclude:['previewImage']
        },
        group: ["Images.id", 'Venues.id'],
        include:[
            {   model:Membership,
                attributes:[]
            },
            {  model:Image,
                as: "Images",
                attributes :['id', 'imagableId', 'url']
            },
            {   model:User,
                as: 'Organizer',
                attributes:['id', 'firstName', 'lastName']
            },
            {   model:Venue,
                as:'Venues',
                attributes:{
                    exclude:['createdAt','updatedAt']
                }
            }
        ]
    })
        res.json(group)
    }
    else {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.message = "Group couldn't be found"
        return next(err);
    }

})
//create a group
router.post('/',requireAuth, validateGroup, async (req,res,next)=>{
    const {user}= req
    const newGroup = await user.createGroup(req.body)
    const {id}= user
    await newGroup.createMembership({memberId:id, status:'host'})
    res.json(newGroup)
})
//add an image to a group
router.post('/:groupId/images', requireAuth,validateImage, async (req,res,next)=>{
    const {url} = req.body
    const groupId = req.params.groupId
    const {user} = req
    const {id} = user
    const userId = id
    const group = await Group.findByPk(groupId)
    if (group){
        const {organizerId} = group
        if (userId === organizerId){
            const newImage = await group.createImage({userId,url})
            const {id} = newImage
            const response = await Image.findByPk(id, {
                attributes:['id','imagableId','url']
            })
            res.json(response)
        }
        else{
            const err = new Error("Forbidden");
            err.status = 403;
            err.message = "Forbidden"
            return next(err);
        }
    }
    else{
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.message = "Group couldn't be found"
        return next(err);
    }
})
//edit a group
router.put('/:groupId', requireAuth,validateGroup, async (req,res, next)=>{

    const groupId = req.params.groupId
    const {user} = req
    const group = await Group.scope('editResponse').findByPk(groupId)
    if (group){
        const {id} = user
        const {organizerId} = group
        if (id === organizerId){
            await group.update(req.body)
            res.json(group)
        }
        else{
            const err = new Error("Forbidden");
            err.status = 403;
            err.message = "Forbidden"
            return next(err);
        }
    }
    else{
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.message = "Group couldn't be found"
        return next(err);
    }
})

//delete a group
router.delete('/:groupId', requireAuth, async (req,res,next)=>{
    const {user} = req
    const group = await Group.findByPk(req.params.groupId)
    if (group){
        const {id} = user
        const {organizerId} = group
        if (id === organizerId){
            await group.destroy()
            res.send({
                "message": "Successfully deleted",
                "statusCode": 200
              })
        }else{
            const err = new Error("Forbidden");
            err.status = 403;
            err.message = "Forbidden"
            return next(err);
        }

    }else{
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.message = "Group couldn't be found"
        return next(err);
    }
})
//get all venues for a group
router.get('/:groupId/venues', requireAuth, async (req,res,next)=>{
    const {user} = req
    const groupId = req.params.groupId
    const group = await Group.findByPk(groupId)
    if (group){
        const {id} = user
        const membership = await Membership.findOne({where:{memberId:id, groupId}})
        if (membership){
            const {status}= membership
            if (status === 'host'|| status === "co-host"){
                const Venues = await group.getVenues()
                return res.json({Venues})
            }
        }
        const err = new Error("Forbidden");
        err.status = 403;
        err.message = "Forbidden"
        return next(err);
    }else{
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.message = "Group couldn't be found"
        return next(err);
    }
})
// create a venue for a group
router.post('/:groupId/venues', requireAuth,validateVenue, async (req,res,next)=>{
    const {user} = req
    const groupId = req.params.groupId
    const group = await Group.findByPk(groupId)
    if (group){
        const {id} = user
        const membership = await Membership.findOne({where:{memberId:id, groupId}})
        if (membership){
            const {status}= membership
            if (status === 'host'|| status === "co-host"){
                const newVenue = await group.createVenue(req.body)
                const {id} = newVenue
                const response = await Venue.findByPk(id)
                return res.json(response)
            }
        }
        const err = new Error("Forbidden");
        err.status = 403;
        err.message = "Forbidden"
        return next(err);
    }else{
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.message = "Group couldn't be found"
        return next(err);
    }
})
// get events of a group
router.get('/:groupId/events', async (req,res,next)=>{
    const groupId = req.params.groupId
    const group = await Group.findByPk(groupId)
    if (group){
        const Events = await Event.findAll({
            where:{groupId},
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
    }
    else{
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.message = "Group couldn't be found"
        return next(err);
    }
})
//create an event
router.post('/:groupId/events', requireAuth,validateEvent, async (req,res,next)=>{
    const {user} = req
    const groupId = req.params.groupId
    const group = await Group.findByPk(groupId)
    if (group){
        const {id} = user
        const membership = await Membership.findOne({where:{memberId:id, groupId}})
        if (membership){
            const {status}= membership
            if (status === 'host'|| status === "co-host"){
                const newEvent = await group.createEvent(req.body)
                const {id} = newEvent
                const response = await Event.scope('createEvent').findByPk(id)
                return res.json(response)
            }
        }
        const err = new Error("Forbidden");
        err.status = 403;
        err.message = "Forbidden"
        return next(err);
    }else{
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.message = "Group couldn't be found"
        return next(err);
    }
})

module.exports = router;