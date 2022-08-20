const express = require('express')
const router = express.Router();
const sequelize = require("sequelize");
const { setTokenCookie, requireAuth} = require('../../utils/auth');
const { Group, Venue, Membership } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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

  router.put('/:venueId', requireAuth,validateVenue, async (req,res,next)=>{
    const {user} = req
    const venueId = req.params.venueId
    const venue = await Venue.findByPk(venueId)
    if (venue){
        const {groupId} = venue
        const {id} = user
        const membership = await Membership.findOne({where:{memberId:id, groupId}})
        if (membership){
            const {status} = membership
            if (status === 'host'|| status === "co-host"){
                await venue.update(req.body)
                const response = await Venue.findByPk(venueId)
                return res.json(response)
            }
        }
        const err = new Error("Forbidden");
        err.status = 403;
        err.message = "Forbidden"
        return next(err);
    }else{
        const err = new Error("Venue couldn't be found");
        err.status = 404;
        err.message = "Venue couldn't be found"
        return next(err);
    }
})


module.exports = router;