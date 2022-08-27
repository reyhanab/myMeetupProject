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
        .exists()
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
  const validateEvent = [
    check('venueId')
      .exists({ checkFalsy: true })
    //   .custom((value, {req}) =>{
    //     return Venue.findOne({where:{id:value, groupId: req.params.groupId}}).then(venue=>{
    //         if (!venue){
    //             return Promise.reject("Venue does not exist");
    //         }
    //     })
    //   })
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
  const validateMembership = [
    check('memberId')
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
        .withMessage("Cannot change a membership status to 'pending'"),
    handleValidationErrors
  ]
//get all groups
router.get('/', async (req,res)=>{
    const Groups = await Group.findAll({
        group: ['Group.id'],
        order:['id'],
        attributes:{
            include:[[
                sequelize.fn("COUNT", sequelize.col("Memberships.id")),
                "numMembers"
            ]]
        },
        include:
            {   model:Membership,
                attributes:[]
            }
    })

    for (let group of Groups){
        const {createdAt, updatedAt} = group
        const createdAtObj = new Date(createdAt).toLocaleString('sv')
        const updatedAtObj = new Date(updatedAt).toLocaleString('sv')
        group.dataValues.createdAt = createdAtObj
        group.dataValues.updatedAt = updatedAtObj
    }
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
        group: ['Group.id','Images.id', 'Venues.id', 'Organizer.id'],
        // group: ['Group.id'],
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

        const {createdAt, updatedAt} = group
        const createdAtObj = new Date(createdAt).toLocaleString('sv')
        const updatedAtObj = new Date(updatedAt).toLocaleString('sv')
        group.dataValues.createdAt = createdAtObj
        group.dataValues.updatedAt = updatedAtObj

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
    const {id} = user
    const newGroup = await user.createGroup(req.body)
    await newGroup.createMembership({memberId:id, status:'host'})
    if(newGroup){
        const {id} = newGroup
        const response = await Group.findByPk(id, {
            attributes:{
                exclude:['previewImage']
            }
        })
        const {createdAt, updatedAt} = response
        const createdAtObj = new Date(createdAt).toLocaleString('sv')
        const updatedAtObj = new Date(updatedAt).toLocaleString('sv')
        response.dataValues.createdAt = createdAtObj
        response.dataValues.updatedAt = updatedAtObj
        res.json(response)
    }

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
            const {createdAt, updatedAt} = group
            const createdAtObj = new Date(createdAt).toLocaleString('sv')
            const updatedAtObj = new Date(updatedAt).toLocaleString('sv')
            group.dataValues.createdAt = createdAtObj
            group.dataValues.updatedAt = updatedAtObj
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
            const images = await Image.findAll({where:{imagableId:req.params.groupId, imagableType:'group'}})
            for (let image of images){
                await image.destroy()
            }
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
            group:['Event.id','Group.id', 'Venue.id'],
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
        const {venueId} = req.body
        const venue = await Venue.findByPk(venueId)
        if (!venue){
            const err = new Error("Venue couldn't be found");
            err.status = 404;
            err.message = "Venue couldn't be found"
            return next(err);
        }
        const {groupId} = venue
        if(groupId != req.params.groupId){
            const err = new Error("Venue doesn't belong to this group");
            err.status = 404;
            err.message = "Venue doesn't belong to this group"
            return next(err);
        }

        const {id} = user
        const membership = await Membership.findOne({where:{memberId:id, groupId}})
        if (membership){
            const {status}= membership
            if (status === 'host'|| status === "co-host"){
                const newEvent = await group.createEvent(req.body)
                const {id} = newEvent
                const response = await Event.scope('createEvent').findByPk(id)
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
    }else{
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.message = "Group couldn't be found"
        return next(err);
    }
})
//get all members of a group
router.get('/:groupId/memberships', async (req,res,next)=>{
    const {id} = req.user
    const groupId = req.params.groupId
    const membership = await Membership.findOne({where:{memberId:id,groupId}})
    const group = await Group.findByPk(groupId)
    if (group){
        if (membership){
            const {status} = membership
            if (status === 'co-host' || status === "host"){
                const Members = await User.findAll({
                    attributes:['id', 'firstName', 'lastName'],

                    include:{
                        model: Membership,
                        attributes:[],
                        where:{groupId},
                    }
                })
                for (const user of Members){
                    const {id} = user
                    const membership = await Membership.findOne({where:{memberId:id, groupId},
                    attributes:['status']})
                    user.dataValues.Membership = membership
                }
                return res.json({Members})

            }
        }
                const Members = await User.findAll({
                    attributes:['id', 'firstName', 'lastName'],
                    include:{
                        model: Membership,
                        attributes:[],
                        where:{groupId, status:['co-host','member','host']},

                    }
                })
                for (const user of Members){
                    const {id} = user
                    const membership = await Membership.findOne({where:{memberId:id, groupId},
                    attributes:['status']})
                    user.dataValues.Membership = membership
                }
                return res.json({Members})


    }else{
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.message = "Group couldn't be found"
        return next(err);
    }
})
//request a membership for a group
router.post('/:groupId/memberships', requireAuth, async (req,res,next)=>{
    const groupId = req.params.groupId
    const {user} = req
    const {id} = user
    const group = await Group.findByPk(groupId)
    if (group){
        const membership = await Membership.findOne({where:{memberId:id, groupId}})
        if (membership){
            const {status} = membership
            if (status === 'pending'){
                const err = new Error("Faild");
                err.status = 400;
                err.message = "Membership has already been requested"
                return next(err);
            }
            else{
                const err = new Error("Faild");
                err.status = 400;
                err.message = "User is already a member of the group"
                return next(err);
            }

        }
        else{
            const newMembership = await user.createMembership({groupId, status:'pending'})
            const {id} = newMembership
            const response = await Membership.findByPk(id, {
                attributes:['groupId', 'memberId', 'status']
            })
            return res.json(response)
        }
    }else {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.message = "Group couldn't be found"
        return next(err);
    }
})
//change status of membership
router.put('/:groupId/memberships',requireAuth,validateMembership, async (req,res,next)=>{
    const {id} = req.user
    const groupId = req.params.groupId
    const group = await Group.findByPk(groupId)
    if (group){
        const {status, memberId} = req.body
        const membership = await Membership.findOne({where:{memberId, groupId}})
        if (membership){
            if (status === 'member'){
                const userMembership = await Membership.findOne({where:{memberId:id,groupId}})
                const {status} = userMembership
                if (status === 'co-host'|| status === 'host'){
                    await membership.update(req.body)
                    const {id} = membership
                    const response = await Membership.findByPk(id, {
                        attributes:['id','memberId','groupId','status']
                    })
                    return res.json(response)
                }
            }
            else if (status === 'co-host'){
                const userMembership = await Membership.findOne({where:{memberId:id,groupId}})
                const {status} = userMembership
                if (status === 'host'){
                    await membership.update(req.body)
                    const {id} = membership
                    const response = await Membership.findByPk(id, {
                        attributes:['id','memberId','groupId','status']
                    })
                    return res.json(response)
                }
            }
            const err = new Error("Forbidden");
            err.status = 403;
            err.message = "Forbidden"
            return next(err);
        }else{
            const err = new Error("Faild");
            err.status = 404;
            err.message = "Membership between the user and the group does not exits"
            return next(err);
        }
    }else{
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.message = "Group couldn't be found"
        return next(err);
    }
})
//delete a membership
router.delete('/:groupId/memberships', requireAuth,validateMembership, async (req,res,next)=>{
    const {memberId} = req.body
    const {id} = req.user
    const groupId = req.params.groupId
    const group = await Group.findByPk(groupId)
    if (group){
        const userMembership = await Membership.findOne({where:{memberId:id, groupId}})
        const {status} = userMembership
        if (status === 'host' || id === memberId){
            const membership = await Membership.findOne({where:{memberId, groupId}})
            if (membership){
                await membership.destroy()
                return res.send({
                    "message": "Successfully deleted membership from group"
                  })
            }
            else{
                const err = new Error("Faild");
                err.status = 404;
                err.message = "Membership does not exist for this User"
                return next(err);
            }
        }
    }
    else{
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.message = "Group couldn't be found"
        return next(err);
    }

})
module.exports = router;