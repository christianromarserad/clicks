const mongoose = require('mongoose');

// Set up mongo db connection
function configureMongoDb() {
   mongoose.connect(process.env.CLICKS_MONGODB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
   })
   let db = mongoose.connection;
   db.once('open', () => {
      console.log('Connected to MongoDB');
   });
   db.on('error', (err) => {
      console.log(err);
   });
}

module.exports = configureMongoDb;