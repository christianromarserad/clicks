const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');
const axios = require('axios');
const user = require('../models/user');

function configurePassport() {
   passport.use(new BearerStrategy(
      async (token, done) => {
         try {
            // Validates if google access token is valid and from the known client id
            let result = await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`);
            if (result.data.issued_to !== process.env.CLICKS_CLIENT_ID) throw new Error('Unknown client id');

            // Get token's user infomation (email, name, picture, etc)
            result = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`);
            let googleUserInfo = result.data;

            // Finds the user
            user.findOne({ email: googleUserInfo.email }, async (err, userResult) => {

               // If user does not exist, create a new user
               if (!userResult) {
                  let newUser = new user();

                  newUser.email = googleUserInfo.email;
                  newUser.name = googleUserInfo.given_name;
                  newUser.totalCount = 0;
                  newUser.dailyClicks = [];

                  let newCreatedUser = await newUser.save();
                  return done(null, newCreatedUser);
               }
               else {
                  return done(null, userResult);
               }
            });
         }
         catch (error) {
            console.log(error);
            done(null, false);
         }
      }
   ));
}

module.exports = configurePassport;