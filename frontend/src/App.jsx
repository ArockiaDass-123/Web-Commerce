import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import ProductsPage from './pages/ProductsPage';
import axios from 'axios';

// Set axios default base URL for backend
axios.defaults.baseURL = 'https://web-commerce-backend.onrender.com';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
        setLoading(false);
    }, []);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('/users/logout', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setIsLoggedIn(false);
        }
    };

    // Protected Route Component
    const ProtectedRoute = ({ children }) => {
        if (loading) {
            return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
        }
        return isLoggedIn ? children : <Navigate to="/login" replace />;
    };

    // Public Route Component (redirect to products if already logged in)
    const PublicRoute = ({ children }) => {
        if (loading) {
            return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
        }
        return !isLoggedIn ? children : <Navigate to="/products" replace />;
    };

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {/* Public Routes */}
                    <Route
                        path="/"
                        element={
                            <PublicRoute>
                                <LandingPage onSignInClick={() => window.location.href = '/login'} />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <Login
                                    onLoginSuccess={handleLoginSuccess}
                                    onBackToHome={() => window.location.href = '/'}
                                />
                            </PublicRoute>
                        }
                    />

                    {/* Protected Route - Products Page Only */}
                    <Route
                        path="/products"
                        element={
                            <ProtectedRoute>
                                <ProductsPage onLogout={handleLogout} />
                            </ProtectedRoute>
                        }
                    />

                    {/* Catch all - redirect to landing or products */}
                    <Route
                        path="*"
                        element={<Navigate to={isLoggedIn ? "/products" : "/"} replace />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;