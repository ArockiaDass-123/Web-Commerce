import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag } from 'lucide-react';
import ProductCard from './ProductCard';

const LandingPage = ({ onSignInClick }) => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState(['All']);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchItems();
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-lg">
                            <ShoppingBag size={28} className="text-white" />
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            LuxeMarket
                        </h1>
                    </div>

                    {/* Sign In Button */}
                    <button
                        onClick={onSignInClick}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        Sign In
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Collection</h2>
                    <p className="text-xl text-purple-100 mb-2">Curated items just for you.</p>
                    <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                        <span className="text-lg font-semibold">{items.length} Products</span>
                    </div>
                </div>
            </section>

            {/* Category Filters */}
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-wrap gap-3 justify-center">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${selectedCategory === category
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
            <div className="container mx-auto px-4 py-8">
                {loading ? (
                    <div className="flex items-center justify-center h-96">
                        <div className="text-xl text-gray-600">Loading products...</div>
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600">No products found in this category</p>
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
                                    onClick={onSignInClick}
                                    showAddButton={true}
                                    isLoggedIn={false}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 mt-12">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-400">© 2026 LuxeMarket. All rights reserved.</p>
                    <p className="text-sm text-gray-500 mt-2">Sign in to start shopping!</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
