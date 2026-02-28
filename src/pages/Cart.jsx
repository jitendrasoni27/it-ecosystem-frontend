import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import PaymentGatewayMock from '../components/payment/PaymentGatewayMock';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
    const { userRole } = useAuth();
    const isPartner = userRole === 'partner';
    const [showPayment, setShowPayment] = useState(false);

    // Calculations
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const partnerDiscount = isPartner ? subtotal * 0.20 : 0;
    const total = subtotal - partnerDiscount;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-background dark:bg-slate-950 flex flex-col items-center justify-center p-4">
                <ShoppingBag className="w-20 h-20 text-slate-200 dark:text-slate-800 mb-6" />
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Your cart is empty</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-10 text-center max-w-sm">Looks like you haven't added any professional IT services to your ecosystem yet.</p>
                <Link to="/services" className="btn-primary">
                    Browse Services
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background dark:bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-10 tracking-tight">Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Cart Items */}
                    <div className="flex-1 container-material overflow-hidden">
                        <div className="p-6 space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-6 last:border-0 last:pb-0">
                                    <div className="flex-1 text-center sm:text-left mb-4 sm:mb-0">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.features[0]}</p>
                                        {isPartner && (
                                            <span className="inline-block mt-2 bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded-full">
                                                Partner Margin Available
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center space-x-6">
                                        {/* Quantity */}
                                        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-sm">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-10 text-center text-sm font-bold text-gray-900 dark:text-white">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Price */}
                                        <div className="text-right w-24">
                                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                                                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                ₹{item.price.toLocaleString('en-IN')} / unit
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 hover:text-red-700 p-2"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 flex justify-between items-center">
                            <Link to="/services" className="text-primary font-bold text-sm hover:underline">
                                &larr; Continue Shopping
                            </Link>
                            <button onClick={clearCart} className="text-gray-500 hover:text-red-600 text-sm">
                                Clear Cart
                            </button>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-96">
                        <div className="bg-white dark:bg-gray-800 rounded-sm shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                                </div>

                                {isPartner && (
                                    <div className="flex justify-between text-green-600 font-bold">
                                        <span>Partner Discount (20%)</span>
                                        <span>- ₹{partnerDiscount.toLocaleString('en-IN')}</span>
                                    </div>
                                )}

                                <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex justify-between items-end">
                                    <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                                    <div className="text-right">
                                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                            ₹{total.toLocaleString('en-IN')}
                                        </span>
                                        {isPartner && (
                                            <p className="text-xs text-green-600 font-bold mt-1">
                                                You Saved: ₹{partnerDiscount.toLocaleString('en-IN')}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowPayment(true)}
                                className="w-full btn-secondary flex justify-center items-center"
                            >
                                Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2" />
                            </button>

                            <p className="text-xs text-gray-400 text-center mt-4">
                                Secure 256-bit SSL Encrypted Payment
                            </p>
                        </div>
                    </div>

                </div>

                {/* Payment Modal */}
                {showPayment && (
                    <PaymentGatewayMock
                        totalAmount={total}
                        onSuccess={() => setShowPayment(false)}
                        onCancel={() => setShowPayment(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default Cart;
