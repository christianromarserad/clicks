const router = require('express').Router();
const passport = require('passport');
const moment = require('moment');
const userModel = require('../models/user');
const ResourceNotFoundError = require('../customErrors/ResourceNotFoundError');

// Get current user
router.get('/', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
   try {
      let userDocument = await userModel.findOne({ email: req.user.email });

      if (!userDocument) {
         // If User not found throw an error
         throw new ResourceNotFoundError('User not found');
      }

      // I need to remove daily clicks that are in the past months so I can save db space
      let currentMonthDailyClicks = userDocument.dailyClicks.filter((dailyClick) => {
         let date = moment(dailyClick.date, 'MMMM D YYYY').format('MMMM YYYY');
         let currentDate = moment().format('MMMM YYYY');
         return date === currentDate;
      });
      userDocument.dailyClicks = currentMonthDailyClicks;

      let updatedUserDocument = await userDocument.save();

      res.json(updatedUserDocument);
   } catch (err) {
      next(err);
   }
});

// Update total click count for the current user
router.put('/incrementcount', passport.authenticate('bearer', { session: false }), async (req, res) => {
   try {
      let userDocument = await userModel.findOne({ email: req.user.email });

      if (!userDocument) {
         // If User not found throw an error
         throw new ResourceNotFoundError('User not found');
      }

      userDocument.totalCount += 1;

      let dailyClickIndex = userDocument.dailyClicks.findIndex((dailyCountDocument) => (dailyCountDocument.date === moment().format('MMMM D YYYY')));

      if (dailyClickIndex !== -1) {
         //Increment count for today's clicks count if it exist
         userDocument.dailyClicks[dailyClickIndex].count += 1;
      }
      else {
         //Create a record for today's click count if it doesn't exist yet
         userDocument.dailyClicks.push({ date: moment().format('MMMM D YYYY'), count: 1 });
      }

      let savedUserDocument = await userDocument.save();

      res.json(savedUserDocument);

   } catch (err) {
      next(err);
   }
});

// Gets the users that has the most clicks
router.get('/topusers/:topNumber', async (req, res, next) => {
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
      next(err);
   }
});

// Get the current user's rank
router.get('/rank', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
   try {
      let usersDocument = await userModel.find();
      let sortedUsers = usersDocument.sort((user1, user2) => (user2.totalCount - user1.totalCount))
      let rank = sortedUsers.findIndex((user) => (user.email === req.user.email)) + 1;
      res.json({
         name: req.user.name,
         rank
      });
   } catch (err) {
      next(err);
   }
});

// Overwrites user's click the data using the local data
router.put('/overwriteclickdata', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
   try {
      let userDocument = await userModel.findOne({ email: req.user.email });
      userDocument.totalCount = req.body.totalCount;
      userDocument.dailyClicks = req.body.dailyClicks;
      let savedUserDocument = userDocument.save();
      res.json(savedUserDocument);
   } catch (err) {
      res.status(500)
      res.json(err);
   }
});

router.put('/updatename', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
   try {
      let userDocument = await userModel.findOne({ email: req.user.email });

      if (!userDocument) {
         // If User not found throw an error
         throw new ResourceNotFoundError('User not found');
      }

      userDocument.name = req.body.name;
      let savedUserDocument = userDocument.save();
      res.json(savedUserDocument);
   }
   catch (err) {
      next(err)
   }
});

module.exports = router;

