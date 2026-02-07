import React, { useState } from 'react';
import axios from 'axios';
import { LogIn, UserPlus, ArrowLeft } from 'lucide-react';

const Login = ({ onLoginSuccess, onBackToHome }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isSignup) {
                // Signup
                await axios.post('/users', { username, password });
                window.alert('Account created successfully! Please login.');
                setIsSignup(false);
                setPassword('');
            } else {
                // Login
                const response = await axios.post('/users/login', { username, password });
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                onLoginSuccess();
            }
        } catch (error) {
            if (error.response?.data?.message) {
                window.alert(error.response.data.message);
            } else {
                window.alert('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md relative">
                {onBackToHome && (
                    <button
                        onClick={onBackToHome}
                        className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 flex items-center gap-1 text-sm font-medium transition"
                    >
                        <ArrowLeft size={16} />
                        Back to Home
                    </button>
                )}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {isSignup ? 'Create Account' : 'Welcome Back'}
                    </h1>
                    <p className="text-gray-600">
                        {isSignup ? 'Sign up to start shopping' : 'Login to your account'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                    >
                        {isSignup ? (
                            <>
                                <UserPlus size={20} />
                                Sign Up
                            </>
                        ) : (
                            <>
                                <LogIn size={20} />
                                Login
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsSignup(!isSignup)}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        {isSignup
                            ? 'Already have an account? Login'
                            : "Don't have an account? Sign up"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
