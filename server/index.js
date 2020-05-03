const express = require('express');
const configureMongoDb = require('./configuration/mongodbConfig');
const configurePassport = require('./configuration/passportConfig');

//configurations
configureMongoDb();
configurePassport();

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
