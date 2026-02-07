import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, CheckCircle, History } from 'lucide-react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

const ProductsPage = ({ onLogout }) => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState(['All']);
    const [loading, setLoading] = useState(true);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        fetchItems();
        fetchCartCount();
    }, []);

    useEffect(() => {
        if (selectedCategory === 'All') {
            setFilteredItems(items);
        } else {
            setFilteredItems(items.filter(item => item.category === selectedCategory));
        }
    }, [selectedCategory, items]);

    const fetchItems = async () => {
        try {
            const response = await axios.get('/items');
            setItems(response.data);

            // Extract unique categories
            const uniqueCategories = ['All', ...new Set(response.data.map(item => item.category))];
            setCategories(uniqueCategories);

            setFilteredItems(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching items:', error);
            setLoading(false);
        }
    };

    const fetchCartCount = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/carts', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const user = JSON.parse(localStorage.getItem('user'));
            const userCart = response.data.find(cart => cart.userId === user.id);
            setCartCount(userCart?.items?.length || 0);
        } catch (error) {
            console.error('Error fetching cart count:', error);
        }
    };

    const handleAddToCart = async (itemId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                '/carts',
                { items: [itemId] },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            // Show success message
            const addedItem = items.find(item => item._id === itemId);
            window.alert(`✓ ${addedItem.name} added to cart!`);

            // Update cart count
            fetchCartCount();
        } catch (error) {
            window.alert(error.response?.data?.message || 'Failed to add item to cart');
        }
    };

    const handleViewCart = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/carts', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const user = JSON.parse(localStorage.getItem('user'));
            const userCart = response.data.find(cart => cart.userId === user.id);

            if (userCart && userCart.items.length > 0) {
                const cartInfo = `Cart ID: ${userCart._id}\n\nItems:\n${userCart.items
                    .map((item, idx) => `${idx + 1}. Item ID: ${item._id}`)
                    .join('\n')}`;
                window.alert(cartInfo);
            } else {
                window.alert('Your cart is empty');
            }
        } catch (error) {
            window.alert('Failed to fetch cart');
        }
    };

    const handleViewOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/orders', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const user = JSON.parse(localStorage.getItem('user'));
            const userOrders = response.data.filter(order => order.userId === user.id);

            if (userOrders.length > 0) {
                const ordersInfo = `Your Orders:\n\n${userOrders
                    .map((order, idx) => `Order ${idx + 1} (ID: ${order._id})\nDate: ${new Date(order.createdAt).toLocaleDateString()}`)
                    .join('\n\n')}`;
                window.alert(ordersInfo);
            } else {
                window.alert('No orders found');
            }
        } catch (error) {
            window.alert('Failed to fetch orders');
        }
    };

    const handleCheckout = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                '/orders',
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            // Show success message and stay on same page
            window.alert('Order successful!');

            // Refresh cart count
            fetchCartCount();
        } catch (error) {
            window.alert(error.response?.data?.message || 'Failed to create order');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar
                    onLogout={onLogout}
                    cartCount={cartCount}
                    onViewCart={handleViewCart}
                    onViewOrders={handleViewOrders}
                />
                <div className="flex items-center justify-center h-96">
                    <div className="text-xl text-gray-600">Loading products...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar
                onLogout={onLogout}
                cartCount={cartCount}
                onViewCart={handleViewCart}
                onViewOrders={handleViewOrders}
            />

            <div className="container mx-auto px-4 py-8">
                {/* Header with Checkout Button */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Shop All Products</h2>
                    <button
                        onClick={handleCheckout}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                    >
                        <CheckCircle size={20} />
                        Checkout
                    </button>
                </div>

                {/* Category Filters */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 ${selectedCategory === category
                                    ? 'bg-purple-600 text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                {filteredItems.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600">No items available in this category</p>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-800">
                                {selectedCategory === 'All' ? 'All Products' : selectedCategory}
                            </h3>
                            <span className="text-gray-600">
                                {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredItems.map((item) => (
                                <ProductCard
                                    key={item._id}
                                    product={item}
                                    onClick={() => handleAddToCart(item._id)}
                                    showAddButton={true}
                                    isLoggedIn={true}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;
