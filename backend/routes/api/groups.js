const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth} = require('../../utils/auth');
const { Group, Image, User, Venue,Membership } = require('../../db/models');
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
  const validateImage = [
    check('url')
    .exists({ checkFalsy: true })
    .withMessage("Url is required"),
    handleValidationErrors
  ]
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
    const {name,about,type,private,city,state} = req.body
    const newGroup = await user.createGroup({name,about,type,private,city,state})
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
// router.get('/:groupId/venues', requireAuth)

module.exports = router;