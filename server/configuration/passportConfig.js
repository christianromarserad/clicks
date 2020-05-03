const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const axios = require('axios');
const userModel = require('../models/user');

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
            userModel.findOne({ email: googleUserInfo.email }, async (err, userResult) => {

               // If user does not exist, create a new user
               if (!userResult) {
                  let userDocument = new userModel();

                  userDocument.email = googleUserInfo.email;
                  userDocument.name = googleUserInfo.given_name;
                  userDocument.totalCount = 0;
                  userDocument.dailyClicks = [];

                  let newCreatedUser = await userDocument.save();
                  return done(null, newCreatedUser);
               }
               else {
                  return done(null, userResult);
               }
            });
         }
         catch (error) {
            done(null, false);
         }
      }
   ));
}

module.exports = configurePassport;