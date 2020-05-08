const mongoose = require('mongoose');

const errorHandler = (err, req, res, next) => {
   console.log(err); // So that I can see what errors are fired in the console

   //Passport responds 401 unauthorize automatically

   if (err instanceof require('../CustomErrors/ResourceNotFoundError')) {
      res.status(err.status).json({ errorMessage: err.message });
   }
   else if (err instanceof require('../CustomErrors/BadRequestError')) {
      res.status(err.status).json({ errorMessage: err.message });
   }
   else if (err instanceof mongoose.Error.ValidationError) {
      res.status(400).json(err);
   }
   else {
      //Unexpected Errors or Server Errors
      if (process.env.NODE_ENV === 'production') {
         //If in production, provide least information
         res.status(500).json({ errorMessage: 'Unexpected server error' });
      }
      else {
         // Let express handle it
         next(err);
      }
   }
}

module.exports = errorHandler;

