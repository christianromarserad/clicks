const router = require('express').Router();
const passport = require('passport');
const moment = require('moment');
const userModel = require('../models/user');

// Get current user
router.get('/', passport.authenticate('bearer', { session: false }), (req, res) => {
   res.json(req.user);
});


// Update total click count for the current user
router.put('/incrementcount', passport.authenticate('bearer', { session: false }), async (req, res) => {
   try {
      let userDocument = await userModel.findOne({ email: req.user.email });

      if (userDocument.totalCount < req.body.localTotalCount) {
         //If the local storage has more click counts than in the server, set the server count to local click counts
         userDocument.totalCount = req.body.localTotalCount
      }
      else {
         //If server total click count is more than the local, ignore the local count and increment the server total count by one
         userDocument.totalCount += 1;
      }

      let dailyClickIndex = userDocument.dailyClicks.findIndex((dailyCountDocument) => (dailyCountDocument.date === moment().format('MMMM Do YYYY')));

      if (dailyClickIndex !== -1) {
         //Increment count for today/s clicks count if it exist
         userDocument.dailyClicks[dailyClickIndex].count += 1;
      }
      else {
         //Create a record for today's click count if it doesn't exist yet
         userDocument.dailyClicks.push({ date: moment().format('MMMM Do YYYY'), count: 1 });
      }

      let savedUserDocument = await userDocument.save();

      res.json(savedUserDocument);

   } catch (error) {
      res.status(500);
      res.json(error);
   }
});


// Gets the users that has the most clicks
router.get('/topusers/:topNumber', passport.authenticate('bearer', { session: false }), async (req, res) => {
   try {
      let usersDocument = await userModel.find();
      let topUsers = usersDocument.sort((user1, user2) => (user2.totalCount - user1.totalCount))
         .slice(0, req.params.topNumber)
         .map((user) => ({
            name: user.name,
            totalCount: user.totalCount
         }));

      res.json(topUsers);
   } catch (err) {
      res.status(500);
      res.json(err);
   }
});


// Get the current user's rank
router.get('/rank', passport.authenticate('bearer', { session: false }), async (req, res) => {
   try {
      let usersDocument = await userModel.find();
      let sortedUsers = usersDocument.sort((user1, user2) => (user2.totalCount - user1.totalCount))
      let rank = sortedUsers.findIndex((user) => (user.email === req.user.email)) + 1;
      res.json({
         name: req.user.name,
         rank
      });
   } catch (err) {
      res.status(500);
      res.json(err);
   }
})

module.exports = router;
