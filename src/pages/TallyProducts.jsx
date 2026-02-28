import React, { useMemo } from 'react';
import ProductCard from '../components/catalog/ProductCard';
import { products } from '../data/products';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

const TallyProducts = () => {
    // Filter products specifically for the tally-products category
    const tallyProducts = useMemo(() =>
        products.filter(product => product.category === 'tally-products'),
        []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 pb-20">
            <SEO
                title="Tally Products - Official Tally Prime Licenses"
                description="Explore our range of official Tally Prime licenses, including Silver, Gold, and Server editions. Authorized Tally Partner."
            />

            {/* Hero Header */}
            <div className="bg-primary py-16 md:py-24 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/20" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 max-w-7xl mx-auto px-4"
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">Official Tally Prime Products</h1>
                    <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                        World-class business management software for all your accounting, inventory, and GST needs.
                    </p>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    {tallyProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="h-full"
                        >
                            <ProductCard product={product} showAddToCart={false} />
                        </motion.div>
                    ))}
                </div>

                {/* Trust Section */}
                <div className="mt-20 bg-white dark:bg-gray-800 rounded-lg p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                        <div>
                            <div className="text-primary text-3xl font-bold mb-2">Authorized</div>
                            <p className="text-gray-600 dark:text-gray-400">Certified Tally Partner with expert support.</p>
                        </div>
                        <div>
                            <div className="text-primary text-3xl font-bold mb-2">Lifetime</div>
                            <p className="text-gray-600 dark:text-gray-400">Official perpetual licenses with full ownership.</p>
                        </div>
                        <div>
                            <div className="text-primary text-3xl font-bold mb-2">Support</div>
                            <p className="text-gray-600 dark:text-gray-400">Implementation and migration assistance included.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TallyProducts;
