const express = require('express')
const router = express.Router();
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

// Log in
router.post('/', async (req, res, next) => {
      const { email, rawPassword } = req.body;

      const user = await User.login({ email, rawPassword });

      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
      }

      await setTokenCookie(res, user);
      return res.json({user});
    }
  );

module.exports = router;