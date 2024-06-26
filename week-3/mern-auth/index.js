const mongoose = require('mongoose');

// Connect to MongoDB

const mongoURL = 'mongodb+srv://mihirsaidudekula:aez0yHhfIIAvGOIZ@cluster0.xfmyzjg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

// Define schemas
const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}
