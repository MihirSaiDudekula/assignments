const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const adminRouter = require('../routes/admin');
const userRouter = require('../routes/user');

// Connect to MongoDB 
const mongourl = 'mongodb+srv:..';

mongoose.connect(mongourl)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

const app = express();
app.use(bodyParser.json());

// Use the routers
app.use('/admin', adminRouter);
app.use('/user', userRouter);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
