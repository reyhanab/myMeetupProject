const router = require('express').Router();
const { setTokenCookie,requireAuth,restoreUser } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

// router.get('/restore-user',(req, res) => {
//     return res.json(req.user);
//   }
// );
// router.get('/require-auth',requireAuth,(req, res) => {
//     return res.json(req.user);
//   }
// );

// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         email: 'demo@user.io'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });

// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
//     // console.log({ requestBody: req.body })
//   });

module.exports = router;