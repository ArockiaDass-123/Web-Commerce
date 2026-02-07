const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

// POST /orders - Convert cart to order (Protected)
router.post('/', auth, async (req, res) => {
    try {
        const userId = req.userId;

        // Find user's cart
        const cart = await Cart.findOne({ userId });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Create order from cart
        const order = new Order({
            userId,
            items: cart.items
        });
        await order.save();

        // Clear cart
        cart.items = [];
        await cart.save();

        // Populate items
        await order.populate('items');

        res.status(201).json({
            message: 'Order created successfully',
            order
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// GET /orders - List orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('items');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
