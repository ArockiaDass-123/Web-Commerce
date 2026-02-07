const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// POST /items - Create item
router.post('/', async (req, res) => {
    try {
        const { name, price } = req.body;

        const item = new Item({ name, price });
        await item.save();

        res.status(201).json({
            message: 'Item created successfully',
            item
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// GET /items - List items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
