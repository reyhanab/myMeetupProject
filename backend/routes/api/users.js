const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

router.post('/',async (req, res) => {
      const { firstName, lastName, email, rawPassword } = req.body;
      const user = await User.signup({ firstName, lastName, email, rawPassword});

      await setTokenCookie(res, user);

      return res.json({user});
    }
  );

module.exports = router;