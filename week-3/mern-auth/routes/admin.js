const { Router } = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require('../index');

const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();
    res.status(201).send('Admin created');
});

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(404).send('Admin not found');
    
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).send('Invalid credentials');

    const token = jwt.sign({ id: admin._id }, 'your-secret-key');
    res.send({ token });
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.status(201).send(course);
});

router.get('/courses', adminMiddleware, async (req, res) => {
    const courses = await Course.find();
    res.send(courses);
});

module.exports = router;
