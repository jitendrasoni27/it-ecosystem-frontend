import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Globe, Server, Database, Code, Layout, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ConsultationModal from '../components/modals/ConsultationModal';

const WebAppDevelopment = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const services = [
        { icon: Code, title: 'Custom Web Apps', desc: 'Bespoke web applications tailored to your unique business logic and workflows.' },
        { icon: Layout, title: 'Single Page Apps (SPA)', desc: 'Fast, responsive, and seamless user experiences using React, Vue, or Angular.' },
        { icon: Database, title: 'SAAS Development', desc: 'Secure and scalable multi-tenant architectures for your software-as-a-service ideas.' },
        { icon: Server, title: 'Robust Backend', desc: 'Scalable server-side solutions with Node.js, Python, or Java to power your apps.' },
        { icon: Globe, title: 'E-commerce Solutions', desc: 'High-converting online stores with custom features and third-party integrations.' },
        { icon: Shield, title: 'Cloud Infrastructure', desc: 'Deployment and optimization on AWS, Azure, or GCP for maximum reliability.' },
    ];

    return (
        <div className="min-h-screen bg-background dark:bg-slate-950">
            <SEO title="Web App Development - IT Ecosystem" description="Professional web application development services for modern businesses." />

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-primary py-24 text-white">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-extrabold mb-6"
                    >
                        Web App Development
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-blue-100 max-w-3xl mx-auto"
                    >
                        We engineer scalable, secure, and performant web applications that solve complex problems and deliver exceptional business value.
                    </motion.p>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {services.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="card-material p-8 hover:border-primary/30 transition-all group"
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <s.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{s.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{s.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white text-balance">The ultimate technology stack for your vision.</h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center font-bold">1</div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">Discovery & Planning</h4>
                                    <p className="text-slate-600 dark:text-slate-400">In-depth analysis of your business requirements and technical feasibility.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">2</div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">Agile Development</h4>
                                    <p className="text-slate-600 dark:text-slate-400">Iterative building process with constant feedback and transparent communication.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold">3</div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">Quality Assurance</h4>
                                    <p className="text-slate-600 dark:text-slate-400">Rigorous testing across browsers and devices to ensure flawless performance.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="bg-slate-900 rounded-3xl p-8 text-white font-mono shadow-2xl">
                            <div className="flex gap-2 mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <pre className="text-xs md:text-sm overflow-x-auto">
                                {`const project = {
  name: "Your Enterprise Solution",
  stack: ["React", "Node.js", "PostgreSQL"],
  features: [
    "Secure Auth",
    "Real-time Analytics",
    "Cloud Sync"
  ],
  readyToLaunch: true
};

function deliverSuccess(project) {
  return project.readyToLaunch 
    ? "🚀 Scaling your business..."
    : "🛠 Polishing perfection";
}

console.log(deliverSuccess(project));`}
                            </pre>
                        </div>
                    </div>
                </div>

                <div className="bg-primary rounded-[3rem] p-12 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                    <div className="max-w-xl relative i-10 text-center md:text-left">
                        <h2 className="text-4xl font-bold mb-4">Start your web transformation today.</h2>
                        <p className="text-lg text-blue-100 mb-0">Our expert web architects are ready to help you build a robust and scalable future for your business.</p>
                    </div>
                    <div className="flex-shrink-0 relative z-10">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-white text-primary hover:bg-slate-100 transition-colors py-4 px-10 rounded-2xl font-extrabold text-lg flex items-center shadow-2xl active:scale-95 duration-200"
                        >
                            Request Web Consultation <ArrowRight className="ml-3 w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            <ConsultationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialCategory="Web App Development"
            />
        </div>
    );
};

export default WebAppDevelopment;
