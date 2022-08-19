const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Group, Image, User, Venue,Membership, sequelize } = require('../../db/models');


//get all groups
router.get('/', async (req,res)=>{
    const Groups = await Group.findAll()
    res.json({Groups})
})
//get details of a group
router.get('/:groupId', async (req,res)=>{
    const groupId = req.params.groupId
    const group = await Group.findByPk(groupId, {
        attributes:{
            include:[[
                sequelize.fn("COUNT", sequelize.col("Memberships.id")),
                "numMembers"
            ]],
            exclude:['previewImage']
        },
        include:[
            {
                model:Membership,
                attributes:[]
            },
            {  model:Image,
                as: "Images",
                attributes :['id', 'imagableId', 'url']
            },
            {
                model:User,
                as: 'Organizer',
                attributes:['id', 'firstName', 'lastName']
            },
            {
                model:Venue,
                as:'Venues',
                attributes:{
                    exclude:['createdAt','updatedAt']
                }
            }
        ]
    })
    res.json(group)
})

module.exports = router;