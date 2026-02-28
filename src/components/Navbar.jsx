import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    Menu,
    X,
    ShoppingCart,
    User,
    Search,
    Sun,
    Moon,
    ChevronDown,
    LayoutGrid,
    LogOut,
    Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [scrolled, setScrolled] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const { getCartCount } = useCart();
    const { userRole, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setIsSearchExpanded(false);
            setIsOpen(false);
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Career', path: '/career' },
    ];

    const productLinks = [
        { name: 'Tally Solutions', path: '/tally-products', desc: 'Enterprise ERP & Accounting' },
        { name: 'Addons & Plugins', path: '/tally-addons', desc: 'Extend your business logic' },
        { name: 'API Integration', path: '/tally-integration', desc: 'Sync with 3rd party apps' },
        { name: 'Custom Development', path: '/web-app-development', desc: 'Bespoke software solutions' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 transition-colors ${scrolled
                ? 'bg-primary dark:bg-slate-900 border-b border-white/5 shadow-md h-16'
                : 'bg-primary dark:bg-slate-900 border-b border-white/10 h-20'
                }`}
        >
            <div className="w-full h-full px-8 flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center gap-10">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center transition-all group-hover:shadow-lg">
                            <Shield className="text-primary dark:text-slate-900 w-5 h-5" />
                        </div>
                        <span className="font-bold text-lg tracking-tight text-white">
                            IT Ecosystem
                        </span>
                    </Link>

                    {/* Navigation - Desktop */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${location.pathname === link.path
                                    ? 'text-white bg-white/10'
                                    : 'text-white/70 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div
                            className="relative"
                            onMouseEnter={() => setIsMenuOpen(true)}
                            onMouseLeave={() => setIsMenuOpen(false)}
                        >
                            <button className="flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-semibold text-white/70 hover:text-white transition-all">
                                Solutions
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full left-0 w-72 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 overflow-hidden"
                                    >
                                        <div className="p-3 mb-1 border-b border-slate-100 dark:border-slate-800">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Business Modules</p>
                                        </div>
                                        {productLinks.map((p) => (
                                            <Link
                                                key={p.name}
                                                to={p.path}
                                                className="block p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                            >
                                                <p className="text-sm font-bold text-slate-900 dark:text-white">{p.name}</p>
                                                <p className="text-[10px] text-slate-500 font-medium">{p.desc}</p>
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-2">
                    {/* Search Component */}
                    <div className="hidden md:flex items-center relative mr-3">
                        <motion.div
                            className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-transparent focus-within:border-slate-300 dark:focus-within:border-slate-600 transition-all"
                            animate={{ width: isSearchExpanded ? 240 : 40 }}
                        >
                            <button
                                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                                className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white flex-shrink-0"
                            >
                                <Search className="w-4 h-4" />
                            </button>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                                className="bg-transparent border-none outline-none text-sm w-full font-medium pr-4 text-slate-900 dark:text-white"
                            />
                        </motion.div>
                    </div>

                    {/* Tools */}
                    <div className="flex items-center gap-0.5">
                        <button
                            onClick={toggleTheme}
                            className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors rounded-lg"
                        >
                            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </button>

                        <Link to="/cart" className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors rounded-lg relative">
                            <ShoppingCart className="w-5 h-5" />
                            {getCartCount() > 0 && (
                                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-white text-primary text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>
                    </div>

                    <div className="hidden lg:block w-px h-6 bg-white/10 mx-2"></div>

                    {/* Auth Area */}
                    {!userRole ? (
                        <div className="hidden lg:flex items-center gap-3">
                            <Link to="/login" className="text-sm font-bold text-white/70 hover:text-white transition-colors">
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className="px-5 py-2 rounded-lg bg-white text-primary text-sm font-bold transition-all hover:scale-[1.02] shadow-sm hover:shadow-md"
                            >
                                Get Started
                            </Link>
                        </div>
                    ) : (
                        <div className="relative group">
                            <button className="flex items-center gap-3 p-1 pl-3 rounded-full border border-white/10 hover:border-white/20 transition-all bg-white/5 shadow-sm">
                                <span className="text-xs font-bold text-white capitalize hidden sm:inline">{userRole}</span>
                                <div className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center text-[10px] font-black uppercase">
                                    {userRole.charAt(0)}
                                </div>
                            </button>

                            <div className="absolute hidden group-hover:block right-0 pt-2 w-60 z-[120]">
                                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden p-1">
                                    <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg mb-1">
                                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Authenticated Access</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate mt-1">Authorized Profile</p>
                                    </div>
                                    <Link to={userRole === 'admin' ? "/admin-dashboard" : "/dashboard"} className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors rounded-lg">
                                        <LayoutGrid className="w-4 h-4" /> Dashboard
                                    </Link>
                                    <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors rounded-lg">
                                        <User className="w-4 h-4" /> Profile Protocol
                                    </Link>
                                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-1"></div>
                                    <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors rounded-lg text-left">
                                        <LogOut className="w-4 h-4" /> Termination
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden w-10 h-10 flex items-center justify-center text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 rounded-lg ml-1"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden absolute top-full left-0 right-0 max-h-[calc(100vh-80px)] overflow-y-auto"
                    >
                        <div className="px-6 py-8 space-y-8">
                            {/* Search for Mobile */}
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search ecosystem..."
                                    className="w-full bg-slate-50 dark:bg-slate-800 py-4 pl-12 pr-4 rounded-xl text-sm font-medium border border-transparent focus:border-slate-200 outline-none"
                                    onKeyDown={handleSearch}
                                />
                            </div>

                            <div className="space-y-4">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Navigation</p>
                                <div className="grid grid-cols-1 gap-1">
                                    {navLinks.map(link => (
                                        <Link
                                            key={link.name}
                                            to={link.path}
                                            className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-sm font-bold text-slate-900 dark:text-white"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.name}
                                            <ChevronDown className="-rotate-90 w-4 h-4 opacity-30" />
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Enterprise Solutions</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {productLinks.map(link => (
                                        <Link
                                            key={link.name}
                                            to={link.path}
                                            className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-[11px] font-bold text-slate-700 dark:text-slate-300"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                                {!userRole ? (
                                    <div className="grid grid-cols-2 gap-4">
                                        <Link
                                            to="/login"
                                            className="flex items-center justify-center py-4 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="flex items-center justify-center py-4 rounded-xl font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Start Free
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 p-4 bg-slate-900 text-white rounded-xl">
                                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-black">
                                                {userRole.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold capitalize">{userRole}</p>
                                                <p className="text-[10px] text-white/60">Active Session</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Link
                                                to="/dashboard"
                                                className="flex items-center justify-center py-4 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-sm text-slate-900 dark:text-white"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Dashboard
                                            </Link>
                                            <button
                                                onClick={() => { logout(); setIsOpen(false); }}
                                                className="flex items-center justify-center py-4 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-xl font-bold text-sm"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
