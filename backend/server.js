const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', userRoutes);
app.use('/items', itemRoutes);
app.use('/carts', cartRoutes);
app.use('/orders', orderRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'E-Commerce API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

const { seedDatabase } = require('./seedProducts');
const Item = require('./models/Item');

// Attempt to connect to MongoDB but don't crash the process if it fails.
// In cloud environments (like Render) there may not be a MongoDB on localhost;
// set `MONGODB_URI` to your production DB (Atlas, etc.).
mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');

        // Auto-seed if database is empty
        try {
            const count = await Item.countDocuments();
            if (count === 0) {
                console.log('Database is empty. seeding initial data...');
                await seedDatabase(false); // false means don't close connection
                console.log('Auto-seeding completed');
            } else {
                console.log(`Database has ${count} items. Skipping seed.`);
            }
        } catch (err) {
            console.error('Auto-seeding failed:', err);
        }
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        console.error('\nWarning: the app will continue running without a MongoDB connection.');
        console.error('If you deployed to a host, set `MONGODB_URI` to a reachable database (e.g. MongoDB Atlas).');
    })
    .finally(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    });

module.exports = app;
