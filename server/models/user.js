const mongoose = require('mongoose');


const dayCountSchema = mongoose.Schema({
   date: {
      type: String,
      required: true
   },
   clickCount: {
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
   clickCount: {
      type: Number,
      required: true
   },

});

let post = mongoose.model('users', userSchema);

module.exports = post;
