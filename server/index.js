const express = require('express');
const configureMongoDb = require('./configuration/mongodbConfig');
const configurePassport = require('./configuration/passportConfig');

//Configurations
configureMongoDb();
configurePassport();

//Create express application
const app = express();

//Set up middleware
app.use(express.json());

//Routes
app.use('/user', require('./routes/user'));


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`listening to port ${port}`);
})

