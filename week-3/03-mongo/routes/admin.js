const express = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Item } = require("../db");
const router = express.Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        await Admin.create({ username, password });
        res.json({ message: 'Admin created successfully' });
    } catch (error) {
        res.status(500).json({ msg: "Error creating admin", error });
    }
});

router.post('/items', adminMiddleware, async (req, res) => {
    const { name, price, description } = req.body;

    try {
        const newItem = await Item.create({ name, price, description });
        res.json({ message: 'Item created successfully', name: newItem.name });
    } catch (error) {
        res.status(500).json({ msg: "Error creating item", error });
    }
});

router.get('/items', adminMiddleware, async (req, res) => {
    try {
        const items = await Item.find({});
        res.json({ items });
    } catch (error) {
        res.status(500).json({ msg: "Error fetching items", error });
    }
});

module.exports = router;
