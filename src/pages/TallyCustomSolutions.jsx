import React, { useMemo } from 'react';
import ProductCard from '../components/catalog/ProductCard';
import { products } from '../data/products';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const TallyCustomSolutions = () => {
    const { userRole } = useAuth();
    const isLoggedIn = !!userRole;

    // Filter products specifically for the tally-custom-solutions category
    const customSolutions = useMemo(() =>
        products.filter(product => product.category === 'tally-custom-solutions'),
        []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 pb-20">
            <SEO
                title="Tally Custom Solutions - Personalized TDL Development"
                description="Tailor-made Tally customizations (TDL) to fit your unique business processes. Explore our portfolio of custom integrations and modules."
            />

            {/* Hero Header */}
            <div className="bg-gradient-to-r from-blue-900 to-primary py-16 md:py-24 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 max-w-7xl mx-auto px-4"
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">Tally Custom Solutions</h1>
                    <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                        Bridging the gap between standard Tally features and your unique business requirements with expert TDL development.
                    </p>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                {/* Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    {customSolutions.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="h-full"
                        >
                            <ProductCard
                                product={product}
                                showAddToCart={false}
                                showPrice={false}
                                showLoginToShop={!isLoggedIn}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-20 bg-white dark:bg-gray-800 rounded-lg p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Have a unique requirement?</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                        Our team of expert TDL developers can build custom modules tailored specifically for your business workflow.
                    </p>
                    <a
                        href="/services"
                        className="inline-block bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-sm transition-colors shadow-lg"
                    >
                        Request Custom Development
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TallyCustomSolutions;
