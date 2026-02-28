import React from 'react';
import { Wallet, Tag, TrendingUp } from 'lucide-react';

const OffersWallet = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-sm shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
                    <Wallet className="w-5 h-5 mr-2 text-primary" /> Savings & Offers
                </h3>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Wallet Balance / Savings */}
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-sm p-4 text-white shadow-md">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-white/20 rounded-full">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-sm">Lifetime</span>
                        </div>
                        <p className="text-blue-100 text-sm">Total Savings</p>
                        <h4 className="text-3xl font-bold">₹15,400</h4>
                        <p className="text-xs text-blue-100 mt-2">Saved via Bulk Orders & Coupons</p>
                    </div>

                    {/* Active Coupons */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Available Coupons</h4>

                        <div className="border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-sm flex justify-between items-center group cursor-pointer hover:border-primary transition-colors">
                            <div className="flex items-center">
                                <Tag className="w-4 h-4 text-secondary mr-2" />
                                <div>
                                    <p className="font-bold text-gray-800 dark:text-white text-sm">WELCOME500</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Flat ₹500 off on first order</p>
                                </div>
                            </div>
                            <button className="text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">APPLY</button>
                        </div>

                        <div className="border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-sm flex justify-between items-center group cursor-pointer hover:border-primary transition-colors">
                            <div className="flex items-center">
                                <Tag className="w-4 h-4 text-secondary mr-2" />
                                <div>
                                    <p className="font-bold text-gray-800 dark:text-white text-sm">BULK20</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">20% off on commands above ₹50k</p>
                                </div>
                            </div>
                            <button className="text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">APPLY</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default OffersWallet;
