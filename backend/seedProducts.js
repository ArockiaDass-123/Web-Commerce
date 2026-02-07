const mongoose = require('mongoose');
require('dotenv').config();

const Item = require('./models/Item');

const products = [
    { productId: 'P01', name: 'Multivitamin Tablets for Men', category: 'Health', brand: 'Wellman', price: 510, rating: 3.8, reviewsCount: 6, badge: 'Sponsored', imageUrl: 'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=400', description: 'Daily energy & immunity support' },
    { productId: 'P02', name: 'Multivitamin Tablets for Women', category: 'Health', brand: 'Centrum', price: 502, rating: 4.3, reviewsCount: 5200, badge: 'Bestseller', imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400', description: '23 essential nutrients' },
    { productId: 'P03', name: 'Whole Food Multivitamin Women', category: 'Health', brand: 'Zeroharm', price: 599, rating: 4.4, reviewsCount: 199, badge: 'Deal', imageUrl: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400', description: 'Omega DHA & herbs' },
    { productId: 'P04', name: 'Ayurvedic Women Multivitamin', category: 'Health', brand: "Dr. Vaidya's", price: 506, rating: 4.8, reviewsCount: 11, badge: 'Sponsored', imageUrl: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400', description: 'Herbal nutrition blend' },
    { productId: 'P05', name: 'Vitamin C Tablets', category: 'Health', brand: 'HealthKart', price: 299, rating: 4.5, reviewsCount: 1200, badge: 'Bestseller', imageUrl: 'https://images.unsplash.com/photo-1616671276441-2f2c277b8bf9?w=400', description: 'Immunity booster' },
    { productId: 'P06', name: 'Protein Powder Chocolate', category: 'Fitness', brand: 'MuscleBlaze', price: 1899, rating: 4.4, reviewsCount: 9800, badge: 'Bestseller', imageUrl: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400', description: '24g protein per scoop' },
    { productId: 'P07', name: 'Whey Protein Vanilla', category: 'Fitness', brand: 'Optimum Nutrition', price: 2499, rating: 4.6, reviewsCount: 15000, badge: 'Sponsored', imageUrl: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400', description: 'Muscle recovery support' },
    { productId: 'P08', name: 'Digital Blood Pressure Monitor', category: 'Medical', brand: 'Dr Trust', price: 1999, rating: 4.3, reviewsCount: 7400, badge: 'Deal', imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400', description: 'One-touch BP check' },
    { productId: 'P09', name: 'Glucometer Kit', category: 'Medical', brand: 'Accu-Chek', price: 1599, rating: 4.5, reviewsCount: 6200, badge: 'Bestseller', imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400', description: 'Accurate sugar testing' },
    { productId: 'P10', name: 'Vitamin D3 Capsules', category: 'Health', brand: 'Carbamide Forte', price: 349, rating: 4.4, reviewsCount: 3100, badge: 'Sponsored', imageUrl: 'https://images.unsplash.com/photo-1615486364462-ef6363adbc18?w=400', description: 'Bone strength support' },
    { productId: 'P11', name: 'Omega-3 Fish Oil Capsules', category: 'Health', brand: 'Wow', price: 799, rating: 4.2, reviewsCount: 2800, badge: 'Deal', imageUrl: 'https://images.unsplash.com/photo-1616671276441-2f2c277b8bf9?w=400', description: 'Heart & brain care' },
    { productId: 'P12', name: 'Hair Growth Biotin Gummies', category: 'Health', brand: 'SugarBear', price: 1299, rating: 4.1, reviewsCount: 1400, badge: 'Sponsored', imageUrl: 'https://images.unsplash.com/photo-1597076545399-91a3ff0e5f79?w=400', description: 'Hair & nail support' },
    { productId: 'P13', name: 'Herbal Green Tea', category: 'Grocery', brand: 'Lipton', price: 299, rating: 4.3, reviewsCount: 8900, badge: 'Bestseller', imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400', description: 'Metabolism boost' },
    { productId: 'P14', name: 'Organic Honey', category: 'Grocery', brand: 'Dabur', price: 399, rating: 4.5, reviewsCount: 10500, badge: 'Bestseller', imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400', description: 'Pure forest honey' },
    { productId: 'P15', name: 'Apple Cider Vinegar', category: 'Health', brand: 'Kapiva', price: 499, rating: 4.2, reviewsCount: 3600, badge: 'Sponsored', imageUrl: 'https://images.unsplash.com/photo-1604908554168-5b7c88b88a10?w=400', description: 'Weight management' },
    { productId: 'P16', name: 'Electric Kettle 1.5L', category: 'Home', brand: 'Prestige', price: 1299, rating: 4.4, reviewsCount: 21000, badge: 'Bestseller', imageUrl: 'https://images.unsplash.com/photo-1594224457860-23b5f1fbe64b?w=400', description: 'Fast boiling' },
    { productId: 'P17', name: 'Air Fryer 4L', category: 'Kitchen', brand: 'Philips', price: 8999, rating: 4.6, reviewsCount: 8700, badge: 'Deal', imageUrl: 'https://images.unsplash.com/photo-1626803775151-61d756612f97?w=400', description: 'Oil-free cooking' },
    { productId: 'P18', name: 'Mixer Grinder 750W', category: 'Kitchen', brand: 'Bajaj', price: 3499, rating: 4.3, reviewsCount: 12000, badge: 'Bestseller', imageUrl: 'https://images.unsplash.com/photo-1616627980218-40f39c4f9c01?w=400', description: 'Heavy-duty motor' },
    { productId: 'P19', name: 'Non-Stick Cookware Set', category: 'Kitchen', brand: 'Pigeon', price: 1999, rating: 4.2, reviewsCount: 5600, badge: 'Sponsored', imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31b?w=400', description: '5-piece set' },
    { productId: 'P20', name: 'Vacuum Cleaner', category: 'Home', brand: 'Eureka Forbes', price: 6299, rating: 4.1, reviewsCount: 4200, badge: 'Deal', imageUrl: 'https://images.unsplash.com/photo-1616627451259-71c4f2ec70f3?w=400', description: 'Powerful suction' },
    { productId: 'P21', name: 'Smartphone 5G', category: 'Electronics', brand: 'Samsung', price: 17999, rating: 4.4, reviewsCount: 25000, badge: 'Bestseller', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', description: 'AMOLED display' },
    { productId: 'P22', name: 'Bluetooth Earbuds', category: 'Electronics', brand: 'Boat', price: 1499, rating: 4.3, reviewsCount: 98000, badge: 'Bestseller', imageUrl: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400', description: 'Deep bass sound' },
    { productId: 'P23', name: 'Smartwatch', category: 'Electronics', brand: 'Noise', price: 2499, rating: 4.2, reviewsCount: 54000, badge: 'Sponsored', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', description: 'Fitness tracking' },
    { productId: 'P24', name: 'Laptop Backpack', category: 'Accessories', brand: 'American Tourister', price: 1799, rating: 4.5, reviewsCount: 8600, badge: 'Bestseller', imageUrl: 'https://images.unsplash.com/photo-1585386959984-a4155228c5c0?w=400', description: 'Water-resistant' },
    { productId: 'P25', name: 'Office Chair', category: 'Furniture', brand: 'Green Soul', price: 10999, rating: 4.4, reviewsCount: 3900, badge: 'Deal', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400', description: 'Ergonomic design' },
    { productId: 'P26', name: 'LED Desk Lamp', category: 'Home', brand: 'Wipro', price: 999, rating: 4.3, reviewsCount: 7100, badge: 'Sponsored', imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', description: 'Eye-care lighting' },
    { productId: 'P27', name: 'Power Bank 20000mAh', category: 'Electronics', brand: 'Mi', price: 2199, rating: 4.5, reviewsCount: 67000, badge: 'Bestseller', imageUrl: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=400', description: 'Fast charging' },
    { productId: 'P28', name: 'USB-C Charging Cable', category: 'Electronics', brand: 'Amazon Basics', price: 299, rating: 4.6, reviewsCount: 42000, badge: 'Bestseller', imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400', description: 'Durable cable' },
    { productId: 'P29', name: 'Wireless Keyboard & Mouse', category: 'Electronics', brand: 'Logitech', price: 2499, rating: 4.5, reviewsCount: 8300, badge: 'Sponsored', imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400', description: 'Silent typing' },
    { productId: 'P30', name: 'External Hard Drive 1TB', category: 'Electronics', brand: 'WD', price: 4599, rating: 4.6, reviewsCount: 11000, badge: 'Bestseller', imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400', description: 'Secure storage' },
    { productId: 'P31', name: 'Yoga Mat', category: 'Fitness', brand: 'Boldfit', price: 699, rating: 4.4, reviewsCount: 32000, badge: 'Bestseller', imageUrl: 'https://images.unsplash.com/photo-1602192509154-0b900ee1f851?w=400', description: 'Anti-slip mat' },
    { productId: 'P32', name: 'Dumbbell Set', category: 'Fitness', brand: 'Kore', price: 1499, rating: 4.3, reviewsCount: 8700, badge: 'Sponsored', imageUrl: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=400', description: 'Home workout' },
    { productId: 'P33', name: 'Resistance Bands', category: 'Fitness', brand: 'Strauss', price: 499, rating: 4.2, reviewsCount: 5400, badge: 'Deal', imageUrl: 'https://images.unsplash.com/photo-1594737625785-cf9b1d1c9b8c?w=400', description: 'Full body training' },
    { productId: 'P34', name: 'Running Shoes Men', category: 'Footwear', brand: 'Adidas', price: 2999, rating: 4.4, reviewsCount: 6800, badge: 'Bestseller', imageUrl: 'https://images.unsplash.com/photo-1528701800489-20be3c3ea1a8?w=400', description: 'Lightweight comfort' },
    { productId: 'P35', name: 'Running Shoes Women', category: 'Footwear', brand: 'Puma', price: 2799, rating: 4.3, reviewsCount: 5900, badge: 'Sponsored', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', description: 'Breathable mesh' },
    { productId: 'P36', name: 'Casual Backpack', category: 'Bags', brand: 'Skybags', price: 1299, rating: 4.2, reviewsCount: 4400, badge: 'Deal', imageUrl: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=400', description: 'Daily use' },
    { productId: 'P37', name: 'Travel Trolley Bag', category: 'Bags', brand: 'Safari', price: 4999, rating: 4.4, reviewsCount: 3100, badge: 'Bestseller', imageUrl: 'https://images.unsplash.com/photo-1585386959984-a4155228c5c0?w=400', description: 'Hard shell' },
    { productId: 'P38', name: 'Sunglasses', category: 'Accessories', brand: 'Fastrack', price: 999, rating: 4.3, reviewsCount: 22000, badge: 'Bestseller', imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400', description: 'UV protection' },
    { productId: 'P39', name: 'Analog Wrist Watch', category: 'Accessories', brand: 'Titan', price: 3499, rating: 4.5, reviewsCount: 7800, badge: 'Sponsored', imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400', description: 'Classic design' },
    { productId: 'P40', name: "Men's Casual Shirt", category: 'Fashion', brand: 'Allen Solly', price: 1499, rating: 4.2, reviewsCount: 9600, badge: 'Bestseller', imageUrl: 'https://images.unsplash.com/photo-1521334884684-d80222895322?w=400', description: 'Cotton fabric' },
    { productId: 'P41', name: "Women's Kurti", category: 'Fashion', brand: 'Biba', price: 1999, rating: 4.3, reviewsCount: 5300, badge: 'Deal', imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400', description: 'Ethnic wear' },
    { productId: 'P42', name: 'Kids School Bag', category: 'Kids', brand: 'Wildcraft', price: 1599, rating: 4.4, reviewsCount: 4100, badge: 'Bestseller', imageUrl: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400', description: 'Comfortable straps' },
    { productId: 'P43', name: 'Toy Building Blocks', category: 'Toys', brand: 'LEGO', price: 2499, rating: 4.7, reviewsCount: 8700, badge: 'Bestseller', imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400', description: 'Creative play' },
    { productId: 'P44', name: 'Remote Control Car', category: 'Toys', brand: 'Hot Wheels', price: 1299, rating: 4.3, reviewsCount: 3900, badge: 'Sponsored', imageUrl: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=400', description: 'High speed' },
    { productId: 'P45', name: 'Wall Clock', category: 'Home Decor', brand: 'Ajanta', price: 899, rating: 4.4, reviewsCount: 6700, badge: 'Bestseller', imageUrl: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400', description: 'Silent movement' },
    { productId: 'P46', name: 'Decorative Table Lamp', category: 'Home Decor', brand: 'Philips', price: 1999, rating: 4.5, reviewsCount: 2800, badge: 'Deal', imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', description: 'Warm lighting' },
    { productId: 'P47', name: 'Bedsheet Double Size', category: 'Home', brand: 'Bombay Dyeing', price: 1499, rating: 4.3, reviewsCount: 7400, badge: 'Bestseller', imageUrl: 'https://images.unsplash.com/photo-1582582429416-7c7f4dfe0e0d?w=400', description: '100% cotton' },
    { productId: 'P48', name: 'Pillow Set (2)', category: 'Home', brand: 'Sleepyhead', price: 1299, rating: 4.2, reviewsCount: 3600, badge: 'Sponsored', imageUrl: 'https://images.unsplash.com/photo-1585559602708-87c4d5d3e7f3?w=400', description: 'Soft & firm' },
    { productId: 'P49', name: 'Bathroom Weighing Scale', category: 'Home', brand: 'HealthSense', price: 999, rating: 4.4, reviewsCount: 8200, badge: 'Bestseller', imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400', description: 'Digital display' },
    { productId: 'P50', name: 'Electric Toothbrush', category: 'Personal Care', brand: 'Oral-B', price: 2499, rating: 4.6, reviewsCount: 9100, badge: 'Bestseller', imageUrl: 'https://images.unsplash.com/photo-1606813902917-6cbb0f2cbb1f?w=400', description: 'Superior cleaning' }
];

async function seedProducts() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
        console.log('Connected to MongoDB');

        // Clear existing items
        await Item.deleteMany({});
        console.log('Cleared existing items');

        // Insert new products
        await Item.insertMany(products);
        console.log(`Successfully seeded ${products.length} products`);

        // Close connection
        await mongoose.connection.close();
        console.log('Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
}

seedProducts();
