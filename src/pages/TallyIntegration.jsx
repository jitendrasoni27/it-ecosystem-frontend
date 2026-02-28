import React, { useMemo } from 'react';
import ProductCard from '../components/catalog/ProductCard';
import { products } from '../data/products';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Zap, RefreshCw, Shield, Globe } from 'lucide-react';

const TallyIntegration = () => {
    const { userRole } = useAuth();
    const isLoggedIn = !!userRole;

    const integrationProducts = useMemo(() =>
        products.filter(product => product.category === 'tally-integration'),
        []);

    const highlights = [
        {
            icon: <Zap className="w-7 h-7" />,
            title: 'Real-time Sync',
            desc: 'Bi-directional data flow between Tally and third-party platforms with zero manual effort.'
        },
        {
            icon: <RefreshCw className="w-7 h-7" />,
            title: 'Automated Workflows',
            desc: 'Eliminate repetitive data entry with rule-based automation from orders to ledger postings.'
        },
        {
            icon: <Shield className="w-7 h-7" />,
            title: 'Secure & Reliable',
            desc: 'All integrations use encrypted channels and built-in error validation for audit-grade accuracy.'
        },
        {
            icon: <Globe className="w-7 h-7" />,
            title: 'Universal Compatibility',
            desc: 'Connect Tally with any platform — ERP, CRM, E-commerce, Banking, HRMS, or custom web apps.'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 pb-20">
            <SEO
                title="Tally Integration Services - Connect Tally with Everything"
                description="Seamlessly integrate Tally Prime with E-commerce, Banking, CRM, ERP, Payment Gateways, and custom applications using our expert integration solutions."
            />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-indigo-900 via-primary to-blue-800 py-20 md:py-28 text-center text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 max-w-4xl mx-auto px-4"
                >
                    <span className="inline-block bg-white/15 backdrop-blur-sm text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-white/20">
                        🔗 Powered by Tally's TDL & API Framework
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-5 tracking-tight leading-tight">
                        Tally Integration Services
                    </h1>
                    <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        Connect Tally Prime with your E-commerce stores, Banks, CRM, ERP, Payment Gateways, and any custom application for a fully automated business workflow.
                    </p>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* What is Tally Integration */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 md:p-12 -mt-12 relative z-20"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        What is Tally Integration?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-lg">
                        Tally Integration refers to connecting <strong>Tally Prime (or Tally ERP 9)</strong> with external business applications so that data flows automatically between the systems. This eliminates manual data re-entry, reduces errors, and creates a unified digital ecosystem for your business.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-lg mt-4">
                        Using <strong>Tally Developer Language (TDL)</strong>, <strong>Tally's built-in XML Server</strong>, and modern <strong>REST/SOAP APIs</strong>, we build connectors that let Tally talk to virtually any software — from Amazon and Shopify to ERPNext, SAP, Razorpay, ICICI bank portals, and even your own custom-built web or mobile applications.
                    </p>
                </motion.div>

                {/* Highlight Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
                    {highlights.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center mb-4">
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* How Tally Integration Works */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">How It Works</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-center max-w-2xl mx-auto mb-10">
                        Our integration architecture leverages Tally's native capabilities for a reliable, maintainable solution.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '01',
                                title: 'Data Collection',
                                desc: 'External systems (e-commerce, CRM, bank portals) generate transactions. Our middleware captures this data via APIs, webhooks, or file-based imports.'
                            },
                            {
                                step: '02',
                                title: 'Transformation & Mapping',
                                desc: 'Data is cleaned, validated, and mapped to Tally-compatible formats — matching ledger names, stock items, tax codes, and voucher types automatically.'
                            },
                            {
                                step: '03',
                                title: 'Tally Posting',
                                desc: 'Using TDL and Tally\'s XML Server, vouchers and masters are pushed into Tally in real-time or batch mode, with full error logging and retry mechanisms.'
                            }
                        ].map((item, i) => (
                            <div key={i} className="relative bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
                                <span className="text-5xl font-extrabold text-primary/10 dark:text-primary/20 absolute top-4 right-6">{item.step}</span>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Integration Categories */}
                <div className="mt-16">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">Our Integration Solutions</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-center max-w-2xl mx-auto mb-10">
                        Browse our complete catalog of ready-to-deploy Tally connectors and integration modules.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                        {integrationProducts.map((product, index) => (
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

                {/* Supported Platforms */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-20 bg-gradient-to-r from-primary/5 to-indigo-50 dark:from-gray-800 dark:to-gray-800/50 rounded-xl p-8 md:p-12 border border-primary/10 dark:border-gray-700"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                        Platforms We Connect With
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {[
                            'Amazon', 'Flipkart', 'Shopify', 'WooCommerce', 'Magento', 'BigCommerce',
                            'Razorpay', 'Paytm', 'Stripe', 'PhonePe', 'ICICI Bank', 'HDFC Bank',
                            'Kotak Bank', 'SBI', 'Salesforce', 'Zoho CRM', 'HubSpot', 'Freshbooks',
                            'SAP B1', 'ERPNext', 'Delhivery', 'Shiprocket', 'Dunzo', 'Google Sheets'
                        ].map((platform, i) => (
                            <div
                                key={i}
                                className="bg-white dark:bg-gray-700 rounded-lg py-3 px-4 text-center text-sm font-medium text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
                            >
                                {platform}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Contact CTA */}
                <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Need a Custom Integration?</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                        Don't see your platform listed? Our team can build a custom connector for any system that supports APIs, file-based exchange, or database connectivity.
                    </p>
                    <a
                        href="/services"
                        className="inline-flex items-center gap-2 bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-sm transition-colors shadow-lg"
                    >
                        Request Integration <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TallyIntegration;
