const express = require('express');
const mongoose = require('mongoose');

//Setting up mongo db 
mongoose.connect('mongodb://localhost/clicks', {
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


//Set up express
const app = express();

//middleware
app.use(express.json());

//routes
app.use('/user', require('./routes/user'));




const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`listening to port ${port}`);
})
