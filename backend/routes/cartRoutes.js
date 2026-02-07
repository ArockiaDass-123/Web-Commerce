const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

// POST /carts - Add items to cart (Protected)
router.post('/', auth, async (req, res) => {
    try {
        const { items } = req.body;
        const userId = req.userId;

        // Find or create cart for user
        let cart = await Cart.findOne({ userId });

        if (cart) {
            // Add items to existing cart
            cart.items = [...cart.items, ...items];
            await cart.save();
        } else {
            // Create new cart
            cart = new Cart({ userId, items });
            await cart.save();
        }

        // Populate items
        await cart.populate('items');

        res.status(201).json({
            message: 'Items added to cart',
            cart
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// GET /carts - List carts
router.get('/', async (req, res) => {
    try {
        const carts = await Cart.find().populate('items');
        res.json(carts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// DELETE /carts/items/:itemId - Remove item from cart (Protected)
router.delete('/items/:itemId', auth, async (req, res) => {
    try {
        const { itemId } = req.params;
        const userId = req.userId;

        // Find user's cart
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Remove the item from cart
        cart.items = cart.items.filter(item => item.toString() !== itemId);
        await cart.save();

        // Populate items
        await cart.populate('items');

        res.json({
            message: 'Item removed from cart',
            cart
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
