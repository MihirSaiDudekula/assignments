const express = require("express");
const userMiddleware = require("../middleware/user");
const { User, Item } = require("../db");
const router = express.Router();

// User Routes
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        await User.create({ username, password });
        res.json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Error creating user", error });
    }
});

router.get('/items', async (req, res) => {
    try {
        const items = await Item.find({});
        res.json({ items });
    } catch (error) {
        res.status(500).json({ msg: "Error fetching items", error });
    }
});

router.post('/items/:itemId', userMiddleware, async (req, res) => {
    const { itemId } = req.params;
    const { username } = req.headers;

    try {
        await User.updateOne({ username }, { "$push": { purchasedItems: itemId } });
        res.json({ message: "Purchase complete!" });
    } catch (error) {
        res.status(500).json({ msg: "Error purchasing item", error });
    }
});

router.get('/purchasedItems', userMiddleware, async (req, res) => {
    const { username } = req.headers;

    try {
        const user = await User.findOne({ username }).populate('purchasedItems');
        res.json({ purchasedItems: user.purchasedItems });
    } catch (error) {
        res.status(500).json({ msg: "Error fetching purchased items", error });
    }
});

module.exports = router;
