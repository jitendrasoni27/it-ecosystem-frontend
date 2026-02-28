import React, { useState } from 'react';
import SEO from '../components/SEO';
import {
    Monitor,
    Smartphone,
    Link as LinkIcon,
    LifeBuoy,
    Code,
    RefreshCw,
    Puzzle,
    Briefcase,
    ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ConsultationModal from '../components/modals/ConsultationModal';

const ServiceSection = ({ icon: Icon, title, description, links, onAction, dark = false }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`p-8 rounded-3xl border transition-all duration-300 ${dark
            ? 'bg-slate-900 border-slate-800 text-white hover:border-primary/50'
            : 'bg-white border-slate-100 text-slate-900 hover:border-primary/30 shadow-sm hover:shadow-md'
            }`}
    >
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${dark ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'
            }`}>
            <Icon className="w-7 h-7" />
        </div>
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className={`mb-8 leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
            {description}
        </p>
        <div className="space-y-3">
            {links && links.map((link, i) => {
                if (link.isModal) {
                    return (
                        <button
                            key={i}
                            onClick={() => onAction(link.category || title)}
                            className={`flex items-center text-sm font-bold group transition-colors ${dark ? 'text-blue-400 hover:text-white' : 'text-primary hover:text-blue-700'
                                }`}
                        >
                            {link.label}
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </button>
                    );
                }
                return (
                    <Link
                        key={i}
                        to={link.path}
                        className={`flex items-center text-sm font-bold group transition-colors ${dark ? 'text-blue-400 hover:text-white' : 'text-primary hover:text-blue-700'
                            }`}
                    >
                        {link.label}
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                );
            })}
        </div>
    </motion.div>
);

const Services = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalCategory, setModalCategory] = useState('');

    const openModal = (category) => {
        setModalCategory(category);
        setIsModalOpen(true);
    };

    const coreServices = [
        {
            icon: Monitor,
            title: "Web App Development",
            description: "Custom enterprise web solutions built with modern frameworks for scalability, security, and exceptional performance.",
            links: [
                { label: "Learn more", path: "/web-app-development" },
                { label: "Get a consultation", isModal: true }
            ]
        },
        {
            icon: Smartphone,
            title: "Mobile App Development",
            description: "High-performance native and cross-platform mobile applications for iOS and Android that engage users and drive growth.",
            links: [
                { label: "Learn more", path: "/mobile-app-development" },
                { label: "Get a consultation", isModal: true }
            ]
        },
        {
            icon: LinkIcon,
            title: "Tally Integration for Apps",
            description: "Bridge the gap between your custom web/mobile applications and Tally Prime for real-time data synchronization and reporting.",
            links: [{ label: "Get a consultation", isModal: true, category: "Tally Integration" }]
        }
    ];

    const tallyProfessionalServices = [
        {
            icon: LifeBuoy,
            title: "Tally Support",
            description: "Reliable, round-the-clock technical support for all your Tally Prime queries, troubleshooting, and health checks.",
            links: [{ label: "Request Support", isModal: true, category: "Tally Support" }]
        },
        {
            icon: Code,
            title: "Tally Development & Implementation",
            description: "End-to-end implementation and custom TDL development to align Tally Prime perfectly with your business workflows.",
            links: [{ label: "Request Development", isModal: true, category: "Tally Development" }]
        },
        {
            icon: RefreshCw,
            title: "Tally Integration & Sync",
            description: "Seamless data synchronization across multiple locations, branches, and third-party software ecosystems.",
            links: [{ label: "Request Integration", isModal: true, category: "Tally Integration" }]
        },
        {
            icon: Puzzle,
            title: "Tally Add-ons",
            description: "Explore our library of ready-made Tally enhancements designed to boost productivity and reporting capabilities.",
            links: [{ label: "View all add-ons", path: "/tally-addons" }]
        },
        {
            icon: Briefcase,
            title: "Custom Business Solutions",
            description: "Bespoke automation and digital transformation strategies tailored specifically to your unique industry requirements.",
            links: [{ label: "Explore Custom Solution", isModal: true, category: "Custom Business Solution" }]
        }
    ];

    return (
        <div className="min-h-screen bg-background dark:bg-slate-950">
            <SEO title="Professional Services - IT Ecosystem" description="Expert Web, Mobile, and Tally professional services tailored for your business." />

            {/* Header */}
            <div className="bg-primary pt-24 pb-32 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight"
                    >
                        Professional IT Services
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-blue-100 max-w-2xl mx-auto font-medium"
                    >
                        We provide state-of-the-art technology solutions and expert Tally consulting to empower your digital transformation journey.
                    </motion.p>
                </div>
            </div>

            {/* Core Services Section */}
            <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {coreServices.map((service, i) => (
                        <ServiceSection key={i} {...service} onAction={openModal} />
                    ))}
                </div>
            </div>

            {/* Specialized Tally Services Section */}
            <div className="bg-slate-50 dark:bg-slate-900/50 py-24 transition-colors">
                <div className="max-w-7xl mx-auto px-4 text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Tally & Custom Solutions</h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">Expertise in deep Tally integration and bespoke automation strategies for your specific business needs.</p>
                </div>

                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tallyProfessionalServices.map((service, i) => (
                        <ServiceSection key={i} {...service} dark={i === 1} onAction={openModal} />
                    ))}
                </div>
            </div>

            {/* Call to Action */}
            <div className="max-w-7xl mx-auto px-4 py-24">
                <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                    <div className="max-w-xl relative z-10 text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Need a tailored solution for your business?</h2>
                        <p className="text-lg text-blue-100 mb-0">Our consultants are ready to help you analyze your requirements and build a roadmap for success.</p>
                    </div>
                    <div className="flex-shrink-0 relative z-10">
                        <button
                            onClick={() => openModal('Custom Business Solution')}
                            className="bg-white text-primary hover:bg-slate-100 transition-colors py-5 px-10 rounded-2xl font-extrabold text-lg flex items-center shadow-2xl hover:scale-105 active:scale-95 duration-200"
                        >
                            Book a Consultation <ArrowRight className="ml-3 w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            <ConsultationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialCategory={modalCategory}
            />
        </div>
    );
};

export default Services;
