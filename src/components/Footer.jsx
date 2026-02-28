import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-200 border-t border-slate-800 pt-16 pb-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex-shrink-0 font-extrabold text-2xl text-white">
                            IT<span className="text-secondary">Ecosystem</span>
                        </Link>
                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                            Empowering businesses with cutting-edge IT solutions, seamless integrations, and profitable partnerships.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-6">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-sm hover:text-primary transition-colors">Home</Link></li>
                            <li><Link to="/services" className="text-sm hover:text-primary transition-colors">Services</Link></li>
                            <li><Link to="/how-it-works" className="text-sm hover:text-primary transition-colors">How It Works</Link></li>
                            <li><Link to="/login" className="text-sm hover:text-primary transition-colors">Login / Sign Up</Link></li>
                            <li><Link to="/documentation" className="text-sm hover:text-primary transition-colors">Technical Documentation</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-6">Support</h3>
                        <ul className="space-y-2">
                            <li><Link to="/contact" className="text-sm hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link to="/faq" className="text-sm hover:text-primary transition-colors">FAQs</Link></li>
                            <li><Link to="/privacy" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-sm hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-6">Contact</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center text-sm">
                                <Mail className="w-4 h-4 mr-2 text-primary" />
                                <span>support@soniapps.in</span>
                            </li>
                            <li className="flex items-center text-sm">
                                <Phone className="w-4 h-4 mr-2 text-primary" />
                                <span>+91 8236082118</span>
                            </li>
                            <li className="flex items-center text-sm">
                                <MapPin className="w-4 h-4 mr-2 text-primary" />
                                <span>Raipur, Chhattisgarh, India</span>
                            </li>
                        </ul>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center bg-transparent">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        &copy; {new Date().getFullYear()} Soniapps Solutions. All rights reserved.
                    </p>
                    <div className="mt-4 md:mt-0 text-sm text-gray-500 dark:text-gray-400 flex space-x-4">
                        <span>Designed with ❤️ by Soniapps Solutions</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
