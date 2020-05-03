const mongoose = require('mongoose');

//Setting up mongo db 
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