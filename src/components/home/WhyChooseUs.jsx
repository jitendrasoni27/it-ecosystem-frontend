import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, ShieldCheck, Users, Headphones, BarChart } from 'lucide-react';

const reasons = [
    {
        title: 'Expert Team',
        description: 'Our professionals bring years of cross-industry experience to every project.',
        icon: Users,
        color: 'text-blue-500'
    },
    {
        title: 'Fast Delivery',
        description: 'We prioritize efficiency without compromising on the quality of our solutions.',
        icon: Zap,
        color: 'text-yellow-500'
    },
    {
        title: 'Secure & Reliable',
        description: 'Robust security measures and reliable infrastructure for your peace of mind.',
        icon: ShieldCheck,
        color: 'text-green-500'
    },
    {
        title: 'Scalable Solutions',
        description: 'Designed to grow with your business, ensuring long-term value and impact.',
        icon: BarChart,
        color: 'text-purple-500'
    },
    {
        title: '24/7 Support',
        description: 'Our dedicated support team is always ready to assist you with any technical needs.',
        icon: Headphones,
        color: 'text-red-500'
    },
    {
        title: 'Proven Track Record',
        description: 'Trusted by hundreds of companies for delivering consistent result-oriented software.',
        icon: CheckCircle,
        color: 'text-cyan-500'
    }
];

const WhyChooseUs = () => {
    return (
        <section className="bg-gray-50 dark:bg-gray-800 py-16 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    Why Choose Our <span className="text-primary">Services</span>
                </h2>
                <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full mb-6"></div>
                <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
                    We combine technical expertise with a deep understanding of business requirements to deliver exceptional value.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={reason.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-gray-900 p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow border-t-4 border-primary"
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gray-50 dark:bg-gray-800 mb-6`}>
                                <reason.icon className={`w-6 h-6 ${reason.color}`} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{reason.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {reason.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
