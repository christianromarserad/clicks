const router = require('express').Router();
const passport = require('passport');

router.get('/', passport.authenticate('bearer', { session: false }), (req, res) => {
   //TODO WITH AUTHENTICATION
   res.json(req.user);
});

router.put('/incrementCount', (req, res) => {
   //TODO WITH AUTHENTICATION
   res.send("incrementCount");
});

router.get('/topusers', (req, res) => {
   //TODO
   res.send("getTopClicks");
});

module.exports = router;
