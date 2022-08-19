const router = require('express').Router();
const { setTokenCookie,requireAuth,restoreUser } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const groupsRouter = require('./groups.js');

router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/groups', groupsRouter)

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});



module.exports = router;