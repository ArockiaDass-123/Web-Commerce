const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    },
    reviewsCount: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    badge: {
        type: String,
        enum: ['Sponsored', 'Bestseller', 'Deal', null],
        default: null
    },
    imageUrl: {
        type: String,
        required: true,
        default: 'https://via.placeholder.com/200'
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Item', itemSchema);
