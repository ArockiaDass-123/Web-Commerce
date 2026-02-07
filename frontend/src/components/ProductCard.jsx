import React from 'react';
import { Star, StarHalf } from 'lucide-react';

const ProductCard = ({ product, onClick, showAddButton = false, isLoggedIn = false }) => {
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={`full-${i}`} size={14} className="fill-yellow-400 text-yellow-400" />);
        }
        if (hasHalfStar) {
            stars.push(<StarHalf key="half" size={14} className="fill-yellow-400 text-yellow-400" />);
        }
        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<Star key={`empty-${i}`} size={14} className="text-gray-300" />);
        }
        return stars;
    };

    const formatReviews = (count) => {
        if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}k`;
        }
        return count;
    };

    const getBadgeStyle = (badge) => {
        switch (badge) {
            case 'Sponsored':
                return 'bg-gray-100 text-gray-700 border border-gray-300';
            case 'Bestseller':
                return 'bg-orange-500 text-white';
            case 'Deal':
                return 'bg-red-600 text-white';
            default:
                return '';
        }
    };

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group"
        >
            {/* Image Container */}
            <div className="relative bg-gray-50 h-56 flex items-center justify-center overflow-hidden">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {product.badge && (
                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-md text-xs font-semibold ${getBadgeStyle(product.badge)}`}>
                        {product.badge}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Category Tag */}
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded">
                        {product.category}
                    </span>
                </div>

                {/* Product Name */}
                <h3 className="text-base font-semibold text-gray-800 mb-1 line-clamp-2 min-h-[3rem]">
                    {product.name}
                </h3>

                {/* Brand */}
                <p className="text-sm text-gray-500 mb-2">{product.brand}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                        {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                        {product.rating} ({formatReviews(product.reviewsCount)})
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-blue-600">₹{product.price}</p>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 mt-2 line-clamp-1">{product.description}</p>

                {/* Add to Cart Button */}
                {showAddButton && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick();
                        }}
                        disabled={!isLoggedIn}
                        className={`w-full mt-4 py-2 rounded-lg font-semibold transition-all duration-200 ${isLoggedIn
                                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        {isLoggedIn ? 'Add to Cart' : 'Sign in to purchase'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
