import React, { useMemo } from 'react';
import ProductCard from '../components/catalog/ProductCard';
import { products } from '../data/products';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Puzzle, Zap, Settings, Download } from 'lucide-react';

const TallyAddons = () => {
    const { userRole } = useAuth();
    const isLoggedIn = !!userRole;

    const addonProducts = useMemo(() =>
        products.filter(product => product.category === 'tally-addons'),
        []);

    const benefits = [
        {
            icon: <Puzzle className="w-7 h-7" />,
            title: 'Plug & Play',
            desc: 'Simply load the TCP file into Tally Prime and activate — no complex setup or coding required.'
        },
        {
            icon: <Zap className="w-7 h-7" />,
            title: 'Instant Productivity',
            desc: 'Automate repetitive tasks like backups, messaging, and reporting from day one.'
        },
        {
            icon: <Settings className="w-7 h-7" />,
            title: 'Fully Configurable',
            desc: 'Every addon comes with flexible settings so you can tailor it to your unique business rules.'
        },
        {
            icon: <Download className="w-7 h-7" />,
            title: 'Free Trial Available',
            desc: 'Try before you buy — download a trial TCP, test it with your data, and purchase when ready.'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 pb-20">
            <SEO
                title="Tally Addons - Extend Your Tally Prime"
                description="Boost your Tally Prime with powerful addons for automation, messaging, GST, inventory, payroll, and more. Download TCP files and start immediately."
            />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-emerald-900 via-teal-800 to-primary py-20 md:py-28 text-center text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-5 right-10 w-96 h-96 bg-teal-300 rounded-full blur-3xl" />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 max-w-4xl mx-auto px-4"
                >
                    <span className="inline-block bg-white/15 backdrop-blur-sm text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-white/20">
                        🧩 Ready-to-Use TDL Modules
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-5 tracking-tight leading-tight">
                        Tally Addons
                    </h1>
                    <p className="text-teal-100 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        Supercharge your Tally Prime with pre-built addons for cloud backup, WhatsApp messaging, digital signatures, GST tools, inventory tracking, and much more.
                    </p>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* What are Tally Addons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 md:p-12 -mt-12 relative z-20"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        What are Tally Addons?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-lg">
                        Tally Addons are <strong>pre-built TDL (Tally Developer Language) modules</strong> that extend the standard functionality of Tally Prime. They are delivered as <strong>.TCP files</strong> which you simply load into Tally to unlock new features — no programming knowledge needed.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-lg mt-4">
                        From automating your <strong>cloud backups</strong> and sending <strong>WhatsApp invoices</strong> to adding <strong>digital signatures</strong>, <strong>barcode billing</strong>, and <strong>advanced payroll</strong> — our addons cover the most in-demand enhancements that thousands of Tally users rely on every day.
                    </p>
                </motion.div>

                {/* Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
                    {benefits.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Addon Cards Grid */}
                <div className="mt-16">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">Browse All Addons</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-center max-w-2xl mx-auto mb-10">
                        Each addon includes a YouTube demo, downloadable TCP file, and user manual — available after login.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                        {addonProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08 }}
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
                </div>

                {/* CTA */}
                <div className="mt-20 bg-white dark:bg-gray-800 rounded-xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Need a Custom Addon?</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                        Don't see the feature you need? Our TDL development team can build a custom addon tailored to your exact workflow.
                    </p>
                    <a
                        href="/tally-custom-solutions"
                        className="inline-block bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-sm transition-colors shadow-lg"
                    >
                        Explore Custom Solutions
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TallyAddons;
