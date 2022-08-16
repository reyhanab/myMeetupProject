const express = require('express')
const router = express.Router();

const { setTokenCookie,restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('firstName')
      .exists({ checkFalsy: true })
      .isLength({ min: 2 })
      .withMessage('Please provide a firstname with at least 2 characters.'),
    check('lastName')
      .exists({ checkFalsy: true })
      .isLength({ min: 2 })
      .withMessage('Please provide a lastname with at least 2 characters.'),
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

router.get("/:userId",requireAuth, async (req,res,next)=>{
  const currentUser = await User.scope('currentUser').findByPk(req.params.userId)
  if (currentUser){
    res.json(currentUser)
  }else{
    const err = new Error('User not found');
    err.status = 401;
    err.title = 'User not found';
    err.errors = ['The provided userId was invalid.'];
    return next(err);
  }
});

router.post('/login',validateLogin, async (req, res, next) => {
  const { email, rawPassword } = req.body;

  const user = await User.login({ email, rawPassword });

  if (!user) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = ["Invalid credentials"];
    return next(err);
  }

  await setTokenCookie(res, user);
  return res.json({user});
}
);

router.post('/signup', validateSignup,async (req, res) => {
  const { firstName, lastName, email, rawPassword } = req.body;
  const user = await User.signup({ firstName, lastName, email, rawPassword});

  await setTokenCookie(res, user);

  return res.json({user});
}
);
module.exports = router;