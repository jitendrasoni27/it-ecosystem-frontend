import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, Star, Heart, Lightbulb, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const jobs = [

    {
        id: 1,
        title: 'Support Executive',
        location: 'Remote / Raipur, India',
        experience: '0-2 Years',
        type: 'Full-Time',
        description: 'Help our customers succeed by providing top-tier technical and functional support for our software ecosystem.',
        requirements: ['Basic understanding of Tally Prime', 'Excellent verbal and written communication', 'Problem-solving mindset and patience']
    },
    {
        id: 2,
        title: 'Sales Executive / Manager',
        location: 'Pan India / Raipur',
        experience: '2-5 Years',
        type: 'Full-Time',
        description: 'Drive growth by identifying new business opportunities and managing relationships with key partners and clients.',
        requirements: ['Proven experience in B2B software sales', 'Strong networking and negotiation skills', 'Knowledge of ERP/Accounting software market']
    },
    {
        id: 3,
        title: 'Senior Web Developer',
        location: 'Remote / Raipur, India',
        experience: '5+ Years',
        type: 'Full-Time',
        description: 'We are looking for an expert React/Next.js developer to lead our frontend team and build scalable enterprise applications.',
        requirements: ['Expertise in React, Tailwind, and Node.js', 'Experience with cloud infrastructure (AWS/Azure)', 'Proven track record of building performant web apps']
    },
    {
        id: 4,
        title: 'Tally Customization Expert',
        location: 'Remote / Raipur, India',
        experience: '3+ Years',
        type: 'Full-Time',
        description: 'Join us to bridge the gap between business accounting and modern software through Tally.Developer 9 and TDL expertise.',
        requirements: ['Strong knowledge of Tally Prime and TDL (Tally Definition Language)', 'Understanding of business accounting workflows', 'Experience with Tally API integrations']
    },
    {
        id: 5,
        title: 'Mobile App Developer (Angular / React JS / Native)',
        location: 'Remote',
        experience: '2-4 Years',
        type: 'Full-Time',
        description: 'Build beautiful, high-performance cross-platform mobile applications for our clients using Angular / React JS / Native.',
        requirements: ['Proficiency in Angular / React JS / Native framework', 'Experience with State Management (Bloc/Provider)', 'Knowledge of CI/CD for mobile apps']
    }
];

const values = [
    { title: 'Innovation First', icon: Lightbulb, description: 'We push boundaries and explore new technologies to solve complex problems.' },
    { title: 'People Oriented', icon: Users, description: 'Our team is our greatest asset. We prioritize growth, health, and happiness.' },
    { title: 'Excellence Always', icon: Star, description: 'We take pride in our work and strive for the highest quality in every line of code.' },
    { title: 'Stronger Together', icon: Users, description: 'Collaboration is at the heart of everything we do. We win as a team.' }
];

const Career = () => {
    return (
        <div className="bg-bg dark:bg-gray-900 transition-colors duration-200 min-h-screen">
            <SEO title="Careers" description="Join IT Ecosystem and build the future of software solutions. Explore our current job openings." />

            {/* Hero Section */}
            <div className="bg-primary py-20 text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-6"
                    >
                        Join Our <span className="text-secondary">Mission</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-blue-100 max-w-3xl mx-auto mb-10"
                    >
                        We're building a team of passionate innovators, developers, and problem-solvers. At IT Ecosystem, your work directly impacts businesses globally.
                    </motion.p>
                    <a href="#openings" className="bg-white text-primary font-bold py-3 px-8 rounded-sm hover:bg-gray-100 transition shadow-lg">
                        View Open Positions
                    </a>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-2xl -ml-24 -mb-24"></div>
            </div>

            {/* Why Work With Us */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Life at IT Ecosystem</h2>
                        <div className="h-1 w-20 bg-secondary mx-auto mb-6"></div>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">Our culture is built on transparency, creativity, and continuous learning.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white dark:bg-gray-800 p-8 rounded-sm text-center shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-16 h-16 bg-blue-50 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <value.icon className="w-8 h-8 text-primary dark:text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Job Openings */}
            <section id="openings" className="py-20 bg-gray-50 dark:bg-gray-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Current Openings</h2>
                    <div className="space-y-6">
                        {jobs.map((job) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-sm shadow-sm border border-transparent hover:border-primary transition-all group"
                            >
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{job.title}</h3>
                                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {job.location}</span>
                                            <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1" /> {job.experience}</span>
                                            <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {job.type}</span>
                                        </div>
                                    </div>
                                    <Link
                                        to={`/apply/${job.id}`}
                                        className="bg-primary text-white font-bold py-2 px-6 rounded-sm hover:bg-blue-600 transition self-start md:self-center"
                                    >
                                        Apply Now
                                    </Link>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Description</h4>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{job.description}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Requirements</h4>
                                        <ul className="space-y-1">
                                            {job.requirements.map((req, i) => (
                                                <li key={i} className="text-gray-600 dark:text-gray-300 text-sm flex items-start">
                                                    <ArrowRight className="w-3 h-3 text-secondary mt-1 mr-2 flex-shrink-0" />
                                                    {req}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="bg-white dark:bg-gray-800 p-12 rounded-sm shadow-xl border-t-8 border-secondary">
                        <Heart className="w-12 h-12 text-red-500 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Don't see a fit?</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            We are always looking for exceptional talent. If you're passionate about what we do, send your resume to <strong className="text-primary">careers@itecosystem.com</strong> and we'll keep you in mind for future roles.
                        </p>
                        <button className="text-primary font-bold border-2 border-primary py-3 px-8 rounded-sm hover:bg-primary hover:text-white transition">
                            Send General Application
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Career;
