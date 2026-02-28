import React from 'react';
import { motion } from 'framer-motion';
import { Users, ShoppingBag, TrendingUp, MonitorCheck, DollarSign, Search } from 'lucide-react';

const WorkflowStep = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700"
    >
        <div className="bg-blue-50 p-4 rounded-full mb-4 dark:bg-gray-700">
            <Icon className="w-8 h-8 text-primary dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2 dark:text-white">{title}</h3>
        <p className="text-gray-600 text-sm dark:text-gray-300">{description}</p>
    </motion.div>
);

const HowItWorks = () => {
    return (
        <div className="min-h-screen bg-bg py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900 transition-colors duration-200">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">
                        How Integrated Services Work
                    </h1>
                    <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                        A seamless ecosystem for Customers and Partners.
                    </p>
                </div>

                {/* Customer Workflow */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-secondary pl-4 dark:text-white">
                        For Customers
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <WorkflowStep
                            icon={Search}
                            title="1. Explore & Select"
                            description="Browse our wide range of IT services, Tally addons, and web solutions in the catalog."
                            delay={0.1}
                        />
                        <WorkflowStep
                            icon={ShoppingBag}
                            title="2. Purchase & Subscribe"
                            description="Securely pay online. Integrations are activated instantly, and subscriptions are valid for 365 days."
                            delay={0.2}
                        />
                        <WorkflowStep
                            icon={MonitorCheck}
                            title="3. Manage & Extend"
                            description="Access your dashboard to view orders, download invoices, and auto-renew services."
                            delay={0.3}
                        />
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-green-500 pl-4 dark:text-white">
                        For Partners
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <WorkflowStep
                            icon={Users}
                            title="1. Join & Verify"
                            description="Sign up as a Partner. Get approved by Admin to unlock wholesale pricing and exclusive tools."
                            delay={0.4}
                        />
                        <WorkflowStep
                            icon={DollarSign}
                            title="2. Bulk Purchase with Margin"
                            description="Buy licenses in bulk at discounted rates. Your margin is your profit instantly."
                            delay={0.5}
                        />
                        <WorkflowStep
                            title="3. Partner & Earn Recurring"
                            description="Sell to your clients at market price. Track earnings and manage client expiry dates from your dashboard."
                            delay={0.6}
                        />
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-primary rounded-xl shadow-xl overflow-hidden">
                    <div className="px-6 py-12 md:px-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Ready to get started?</h3>
                            <p className="text-blue-100">Join thousands of satisfied clients and profitable partners today.</p>
                        </div>
                        <div className="mt-8 md:mt-0 space-x-4">
                            <button className="bg-white text-primary font-bold py-3 px-8 rounded-sm shadow-lg hover:bg-gray-50 transition">
                                Browse Services
                            </button>
                            <button className="bg-secondary text-white font-bold py-3 px-8 rounded-sm shadow-lg hover:bg-yellow-600 transition">
                                Become a Partner
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HowItWorks;
