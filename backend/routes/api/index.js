const router = require('express').Router();
const { setTokenCookie,requireAuth,restoreUser } = require('../../utils/auth.js');
const { User } = require('../../db/models');

router.use(restoreUser);



module.exports = router;