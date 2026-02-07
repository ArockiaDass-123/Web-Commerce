import React from 'react';
import { LogOut, ShoppingCart, History } from 'lucide-react';

const Navbar = ({ onLogout, cartCount = 0, onViewCart, onViewOrders }) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">E-Commerce Store</h1>
                        <p className="text-sm text-blue-100">Welcome, {user.username}!</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={onViewCart}
                            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition duration-200 relative"
                        >
                            <ShoppingCart size={20} />
                            Cart
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={onViewOrders}
                            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition duration-200"
                        >
                            <History size={20} />
                            Orders
                        </button>

                        <button
                            onClick={onLogout}
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition duration-200"
                        >
                            <LogOut size={20} />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
