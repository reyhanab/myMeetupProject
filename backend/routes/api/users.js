const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
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

router.post('/', validateSignup,async (req, res) => {
      const { firstName, lastName, email, rawPassword } = req.body;
      const user = await User.signup({ firstName, lastName, email, rawPassword});

      await setTokenCookie(res, user);

      return res.json({user});
    }
  );

module.exports = router;