const express = require('express');
const configureMongoDb = require('./configuration/mongodbConfig');
const configurePassport = require('./configuration/passportConfig');
const errorHandler = require('./customMiddleware/errorHandler');

//Configurations
configureMongoDb();
configurePassport();

//Create express application
const app = express();

//Body parser middleware
app.use(express.json());

//Routes middleware
app.use('/user', require('./routes/user'));

//Error Handler middleware
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`listening to port ${port}`);
})

