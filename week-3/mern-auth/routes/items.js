const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const userAuthMiddleware = require('../middleware/userAuth');

// Post a new item as an authenticated user
router.post('/', userAuthMiddleware, async (req, res) => {
    const { itemName, itemPrice } = req.body;
    const userId = req.user.userId; // Retrieve userId from the JWT

    try {
        const item = new Item({
            itemName,
            itemPrice,
            user: userId // Assign the item to the authenticated user
        });
        const savedItem = await item.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find().populate('user', 'username'); // Optionally populate user details
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
