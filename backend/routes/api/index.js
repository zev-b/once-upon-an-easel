// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const artRouter = require('./artpiece.js');
const tagsRouter = require('./tags.js');

const { restoreUser } = require("../../utils/auth.js");
// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter); 
router.use('/art-pieces', artRouter);
router.use('/tags', tagsRouter);

// router.post('/test', (req, res) => {
//   res.json({ requestBody: req.body });
// });

module.exports = router;