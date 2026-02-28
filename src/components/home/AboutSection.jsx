import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
    return (
        <section className="bg-white dark:bg-gray-900 py-16 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            Empowering Businesses through <span className="text-primary">Innovation</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                            IT Ecosystem is a leading software solutions provider dedicated to helping businesses navigate the digital landscape. With years of expertise in software development and Tally integration, we deliver excellence at every step.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                            Our mission is to simplify complex business processes through cutting-edge technology, ensuring our clients stay ahead in an ever-evolving market. From custom web applications to seamless system integrations, we provide the tools you need to thrive.
                        </p>
                        <div className="flex gap-4">
                            <div className="text-center p-4 bg-blue-50 dark:bg-gray-800 rounded-sm">
                                <span className="block text-2xl font-bold text-primary">10+</span>
                                <span className="text-sm text-gray-500">Years Experience</span>
                            </div>
                            <div className="text-center p-4 bg-blue-50 dark:bg-gray-800 rounded-sm">
                                <span className="block text-2xl font-bold text-primary">500+</span>
                                <span className="text-sm text-gray-500">Clients Served</span>
                            </div>
                            <div className="text-center p-4 bg-blue-50 dark:bg-gray-800 rounded-sm">
                                <span className="block text-2xl font-bold text-primary">100%</span>
                                <span className="text-sm text-gray-500">Satisfaction</span>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-video bg-primary rounded-sm overflow-hidden shadow-2xl relative">
                            {/* Decorative elements */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary opacity-20"></div>
                            <div className="absolute flex items-center justify-center inset-0 text-white text-5xl font-bold opacity-10">
                                IT ECOSYSTEM
                            </div>
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070"
                                alt="Team Working"
                                className="w-full h-full object-cover mix-blend-overlay"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-sm -z-10"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
