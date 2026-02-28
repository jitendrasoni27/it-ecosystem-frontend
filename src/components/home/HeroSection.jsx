import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Boxes } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <div className="bg-background dark:bg-slate-950 py-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                    {/* Main Banner (Customer Focus) - Spans 8 cols */}
                    <div className="md:col-span-8 relative rounded-xl overflow-hidden shadow-material-lg group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/40 to-transparent z-10 flex flex-col justify-center px-8 md:px-16">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <span className="bg-accent text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-4 inline-block shadow-sm">
                                    Premium Choice
                                </span>
                                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                                    Pioneering the <br />
                                    <span className="text-secondary-light">IT Ecosystem</span>
                                </h1>
                                <p className="text-gray-100 mb-6 max-w-md">
                                    Web, Mobile, and Tally Integrations tailored for growth. Starting at just ₹9,999.
                                </p>
                                <Link to="/services" className="btn-primary inline-flex items-center !bg-white !text-primary hover:!bg-slate-50">
                                    Explore Ecosystem <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </motion.div>
                        </div>
                        {/* Background Image Mock */}
                        <div className="h-64 md:h-96 bg-primary w-full object-cover">
                            {/* Decorative Circles */}
                            <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            <div className="absolute right-20 bottom-0 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"></div>
                        </div>
                    </div>

                    {/* Side Banners (Partner/Offer Focus) - Spans 4 cols */}
                    <div className="md:col-span-4 flex flex-col gap-4">

                        {/* Top Side Banner */}
                        <div className="flex-1 container-material p-8 flex flex-col justify-center relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-2 tracking-tight">Partner Portal</h3>
                                <p className="text-primary font-semibold mb-4 text-sm">Empower your business with high-margin IT solutions.</p>
                                <Link to="/register?role=partner" className="text-secondary font-bold text-sm flex items-center group-hover:gap-1 transition-all">
                                    Apply Now <ArrowRight className="ml-1 w-4 h-4" />
                                </Link>
                            </div>
                            <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:scale-110 transition-transform duration-500">
                                <Boxes className="w-32 h-32 text-slate-400" />
                            </div>
                        </div>

                        {/* Bottom Side Banner */}
                        <div className="flex-1 bg-slate-900 text-white rounded-xl p-8 shadow-material-md flex flex-col justify-center relative overflow-hidden">
                            <h3 className="text-lg font-bold text-blue-400 mb-1 tracking-wider uppercase text-xs">Tally on Cloud</h3>
                            <p className="text-slate-300 text-sm mb-4">Anytime, Anywhere Secure Access</p>
                            <span className="text-3xl font-extrabold text-white tracking-tighter">₹500<span className="text-sm text-slate-400 font-normal">/mo</span></span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
