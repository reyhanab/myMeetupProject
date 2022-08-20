const express = require('express')
const router = express.Router();
const sequelize = require("sequelize");
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User,Group, Membership } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage("Invalid email"),
    check('firstName')
      .exists({ checkFalsy: true })
      .withMessage("First Name is required"),
    check('lastName')
      .exists({ checkFalsy: true })
      .withMessage("Last Name is required"),
    handleValidationErrors
  ];

  const validateLogin = [
    check('email')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Email is required"),
    check('password')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Password is required"),
    handleValidationErrors
  ];

  //log in
  router.post('/login',validateLogin, async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.login({ email, password });

    if (!user) {
      const err = new Error("Invalid credentials");
      err.status = 401;
      err.title = 'Login failed';
      // err.errors = ["Invalid credentials"];
      return next(err);
    }

    user.dataValues.token = await setTokenCookie(res, user);
    return res.json(user);
  }
);

// Get the Current User
router.get('/:userId',[restoreUser,requireAuth],async (req, res,next) => {
  const { user } = req;
  if (user) {
    const {id, firstName, lastName, email} = user

    return res.json({id, firstName, lastName, email}
      // user: user.toSafeObject()
    );
  } else return res.json({});
}
);


//signup
router.post('/signup', validateSignup,async (req, res,next) => {
      const { firstName, lastName, email, password } = req.body;
      const checkEmail = await User.findOne({where:{email}})
      if (checkEmail){
        const err = new Error("User already exists");
        err.status = 403;
        err.title = 'email';
        err.errors = {'email':"User with that email already exists"};
        return next(err);
      }
      else{
      const user = await User.signup({ firstName, lastName, email, password});

      user.dataValues.token = await setTokenCookie(res, user);
      return res.json(user);
    }
  }
  );

  // get groups of current user
  router.get('/:userId/groups', requireAuth, async (req, res)=>{
    const { user } = req;
    if (user) {
    //  const Groups = await user.getGroups()
     let Groups =[]
     const userMemberships = await user.getMemberships()
     for(let membership of userMemberships){
      const userGroup = await membership.getGroup()
      Groups.push(userGroup)
     }

     for (let group of Groups){
      const {id} = group
      const countMembers = await Membership.count({
        where:{groupId:id}
      })
      group.dataValues.numMembers = countMembers
     }
     res.json({Groups})
    }
  })

module.exports = router;