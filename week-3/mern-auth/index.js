const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());

// MongoDB connection
const mongoURL = 'mongodb+srv://mihirsaidudekula:aez0yHhfIIAvGOIZ@cluster0.xfmyzjg.mongodb.net/?retryWrites=true&majority&appName=Cluster0';

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });

// Routers
const userRouter = require('./routes/user');
const itemRouter = require('./routes/items');

app.use('/users', userRouter);
app.use('/items', itemRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
