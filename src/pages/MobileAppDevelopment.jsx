import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Smartphone, Zap, Shield, Layout, Cpu, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import ConsultationModal from '../components/modals/ConsultationModal';

const MobileAppDevelopment = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const features = [
        { icon: Smartphone, title: 'iOS & Android', desc: 'Native and Cross-platform development using Swift, Kotlin, and React Native.' },
        { icon: Layout, title: 'UI/UX Excellence', desc: 'Crafting intuitive and engaging user journeys with modern design principles.' },
        { icon: Zap, title: 'High Performance', desc: 'Optimized apps that run smoothly even on entry-level devices.' },
        { icon: Shield, title: 'Security First', desc: 'Enterprise-grade encryption and secure data handling protocols.' },
        { icon: Cpu, title: 'Backend Integration', desc: 'Seamless connection with your existing infrastructure and cloud services.' },
        { icon: Globe, title: 'Global Scalability', desc: 'Architecting for millions of users with cloud-native solutions.' },
    ];

    return (
        <div className="min-h-screen bg-background dark:bg-slate-950">
            <SEO title="Mobile App Development - IT Ecosystem" description="Enterprise-grade iOS and Android mobile application development services." />

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-primary py-24 text-white">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-extrabold mb-6"
                    >
                        Mobile App Development
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-blue-100 max-w-3xl mx-auto"
                    >
                        We build future-ready mobile applications that redefine user experiences and drive business growth through innovation and precision engineering.
                    </motion.p>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="card-material p-8 hover:border-primary/30 transition-all group"
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <f.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{f.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 border border-slate-100 dark:border-slate-800">
                    <div className="flex-1">
                        <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">Ready to transform your business?</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                            Whether you're a startup looking for an MVP or an enterprise needing a complex ecosystem, our experts are ready to turn your vision into a high-performing reality.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="btn-primary py-4 px-8 text-lg font-bold"
                        >
                            Schedule a Consultation
                        </button>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-50 dark:border-slate-700">
                            <div className="text-3xl font-bold text-primary mb-1">100+</div>
                            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Apps Delivered</div>
                        </div>
                        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-50 dark:border-slate-700">
                            <div className="text-3xl font-bold text-secondary mb-1">98%</div>
                            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Client Retention</div>
                        </div>
                        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-50 dark:border-slate-700">
                            <div className="text-3xl font-bold text-green-500 mb-1">4.9/5</div>
                            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">User Rating</div>
                        </div>
                        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-50 dark:border-slate-700">
                            <div className="text-3xl font-bold text-orange-500 mb-1">15+</div>
                            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Industries Served</div>
                        </div>
                    </div>
                </div>
            </div>

            <ConsultationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialCategory="Mobile App Development"
            />
        </div>
    );
};

export default MobileAppDevelopment;
