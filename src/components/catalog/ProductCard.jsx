import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Check, Youtube, FileDown, BookOpen, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product, showAddToCart = true, showPrice = true, showLoginToShop = false }) => {
    const { userRole } = useAuth();
    const { addToCart } = useCart();
    const isLoggedIn = !!userRole;

    // Pricing Logic
    const isPartner = userRole === 'partner';
    const basePrice = product.price;
    const discount = isPartner ? 0.20 : 0; // 20% discount for partners
    const finalPrice = basePrice * (1 - discount);
    const margin = basePrice - finalPrice;

    return (
        <div className="card-material overflow-hidden h-full flex flex-col group">
            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={product.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop';
                        e.target.onerror = null;
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">IT Solution</span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{product.name}</h3>
                    {product.isBestSeller && (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                            Best Seller
                        </span>
                    )}
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 min-h-[40px]">
                    {product.description}
                </p>

                {/* Media Links - Visible only after login */}
                <div className="mb-6 space-y-2 py-3 border-y border-gray-50 dark:border-gray-700">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Resources</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {isLoggedIn ? (
                            <>
                                <a href={product.youtubeLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-xs text-red-600 hover:underline">
                                    <Youtube className="w-4 h-4 mr-2" /> Demo Video
                                </a>
                                <a href={product.tcpLink} download className="flex items-center text-xs text-blue-600 hover:underline">
                                    <FileDown className="w-4 h-4 mr-2" /> Download TCP
                                </a>
                                <a href={product.manualLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-xs text-green-600 hover:underline">
                                    <BookOpen className="w-4 h-4 mr-2" /> User Manual
                                </a>
                            </>
                        ) : (
                            <div className="col-span-2 py-2 px-3 bg-gray-50 dark:bg-gray-700/50 rounded-sm flex items-center justify-center text-gray-400 text-[10px]">
                                <Lock className="w-3 h-3 mr-2" /> Login to access media & downloads
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-auto">
                    {showPrice && isLoggedIn && (
                        <div className="flex items-end justify-between mb-4 pt-2">
                            <div>
                                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wide">License Fee</p>
                                <div className="flex items-baseline">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                        ₹{finalPrice.toLocaleString('en-IN')}
                                    </span>
                                    {isPartner && (
                                        <span className="ml-2 text-sm text-gray-400 line-through">
                                            ₹{basePrice.toLocaleString('en-IN')}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-2 pt-2">
                        {showAddToCart && isLoggedIn && (
                            <button
                                onClick={() => addToCart(product)}
                                className="btn-primary w-full flex justify-center items-center"
                            >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Add to Cart
                            </button>
                        )}

                        {!isLoggedIn && (
                            <Link
                                to="/login"
                                className="btn-outline w-full flex justify-center items-center"
                            >
                                Login to Shop
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
