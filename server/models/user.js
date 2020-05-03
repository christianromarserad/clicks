const mongoose = require('mongoose');

const dailyClicksSchema = mongoose.Schema({
   date: {
      type: String,
      required: true
   },
   count: {
      type: Number,
      required: true
   }
});

const userSchema = mongoose.Schema({
   email: {
      type: String,
      required: true
   },
   name: {
      type: String,
      required: true
   },
   totalCount: {
      type: Number,
      required: true
   },
   dailyClicksSchema: [dailyClicksSchema]
});

let post = mongoose.model('users', userSchema);

module.exports = post;
