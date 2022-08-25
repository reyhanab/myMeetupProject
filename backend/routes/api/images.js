const express = require('express');
const router = express.Router();
const sequelize = require("sequelize");
const {requireAuth} = require('../../utils/auth');
const { Image, Group,Event } = require('../../db/models');

//delete an image
router.delete('/:imageId', requireAuth, async (req,res,next)=>{
    const {id} = req.user
    const imageId = req.params.imageId
    console.log(imageId)
    const image = await Image.findByPk(imageId, {
        attributes:['id','userId', 'imagableId','url']
    })
    console.log(image)
    if(image){
        const {userId} = image
        if(userId == id){
           await image.destroy()
           return res.send({
            "message": "Successfully deleted",
            "statusCode": 200
          })
        }
        const err = new Error("Forbidden");
        err.status = 403;
        err.message = "Forbidden"
        return next(err);

    }else{
        const err = new Error("Image couldn't be found");
        err.status = 404;
        err.message = "Image couldn't be found"
        return next(err);
    }
})
module.exports = router