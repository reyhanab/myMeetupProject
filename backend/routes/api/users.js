const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage("Invalid email"),
    check('firstName')
      .exists({ checkFalsy: true })
      .withMessage( "First Name is required",),
    check('lastName')
      .exists({ checkFalsy: true })
      .withMessage("Last Name is required"),
    check('rawPassword')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

  const validateLogin = [
    check('email')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Email is required"),
    check('rawPassword')
      .exists({ checkFalsy: true })
      .withMessage("Password is required"),
    handleValidationErrors
  ];

  //log in
  router.post('/login',validateLogin, async (req, res, next) => {
    const { email, rawPassword } = req.body;

    const user = await User.login({ email, rawPassword });

    if (!user) {
      const err = new Error("Invalid credentials");
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ["Invalid credentials"];
      return next(err);
    }

    user.dataValues.token = await setTokenCookie(res, user);
    return res.json({user});
  }
);

// Get the Current User
router.get('/:userId',restoreUser,(req, res) => {
  const { user } = req;
  if (user) {
    const {id, firstName, lastName, email}= user
    return res.json({id, firstName, lastName, email}
      // user: user.toSafeObject()
    );
  } else return res.json({});
}
);


//signup
router.post('/signup', validateSignup,async (req, res,next) => {
      const { firstName, lastName, email, rawPassword } = req.body;
      const checkEmail = await User.findOne({where:{email}})
      if (checkEmail){
        const err = new Error("User already exists");
        err.status = 403;
        err.title = 'email';
        err.errors = ["User with that email already exists"];
        return next(err);
      }
      else{
      const user = await User.signup({ firstName, lastName, email, rawPassword});

      user.dataValues.token = await setTokenCookie(res, user);
      return res.json({user});
    }
  }
  );

module.exports = router;