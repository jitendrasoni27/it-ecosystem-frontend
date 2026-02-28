import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, AlertCircle, Shield, Building, Phone, Chrome, Facebook, Linkedin, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import SEO from '../components/SEO';
import ConfirmationModal from '../components/modals/ConfirmationModal';

const Register = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const roleParam = searchParams.get('role');
    const [role, setRole] = useState('customer');

    useEffect(() => {
        if (roleParam && ['customer', 'partner'].includes(roleParam)) {
            setRole(roleParam);
        }
    }, [roleParam]);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '', // This will hold the Company Name
        email: '',
        password: '',
        fullName: '',
        phone: '',
        gstin: '',
        partnerCode: '',
        legalName: ''
    });

    const [partnerCodes, setPartnerCodes] = useState([]);
    const [filteredPartnerCodes, setFilteredPartnerCodes] = useState([]);
    const [showPartnerSuggestions, setShowPartnerSuggestions] = useState(false);

    const [isFetchingGstin, setIsFetchingGstin] = useState(false);

    // Modal State
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info',
        onConfirm: () => { }
    });

    const showModal = (config) => {
        setModalConfig({ ...config, isOpen: true });
    };

    const closeModal = () => {
        setModalConfig(prev => ({ ...prev, isOpen: false }));
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const signupData = {
                username: formData.username, // Holds Company Name
                email: formData.email,
                password: formData.password,
                fullName: formData.fullName,
                phone: formData.phone,
                gstin: role === 'partner' ? formData.gstin : undefined,
                partnerCode: (role === 'customer') ? formData.partnerCode : undefined,
                role: [role]
            };

            await axios.post('http://localhost:8080/api/auth/signup', signupData);
            showModal({
                title: 'Registration Successful',
                message: 'Your account has been created. You can now log in to the system.',
                type: 'success',
                confirmText: 'Login Now',
                onConfirm: () => navigate(`/login?role=${role}`)
            });
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fetchPartnerCodes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/auth/partner-codes');
            setPartnerCodes(response.data);
        } catch (err) {
            console.error('Failed to fetch partner codes:', err);
        }
    };

    useEffect(() => {
        fetchPartnerCodes();

        const handleClickOutside = () => setShowPartnerSuggestions(false);
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    const handlePartnerCodeChange = (e) => {
        const value = e.target.value.toUpperCase();
        setFormData({ ...formData, partnerCode: value });

        if (value.length > 1) {
            const filtered = partnerCodes.filter(code =>
                code.toUpperCase().includes(value)
            );
            setFilteredPartnerCodes(filtered);
            setShowPartnerSuggestions(true);
        } else {
            setShowPartnerSuggestions(false);
        }
    };

    const selectPartnerCode = (code) => {
        setFormData({ ...formData, partnerCode: code });
        setShowPartnerSuggestions(false);
    };

    const fetchGstinDetails = async (gstNumber) => {
        if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstNumber)) return;

        setIsFetchingGstin(true);
        try {
            // Using a public-facing API for GSTIN verification (Example: Appyflow - requires registration for real keys)
            // For demonstration, we'll try a common pattern or a public endpoint if available
            // Note: In a production app, this should go through a backend proxy to hide API keys
            const response = await axios.get(`https://commonapi.masterindia.co/commonapi/v1/gstin/search?gstin=${gstNumber}`);

            if (response.data && response.data.data) {
                const { lgnm, tradeNam } = response.data.data;
                setFormData(prev => ({
                    ...prev,
                    fullName: lgnm || prev.fullName,
                    username: tradeNam || lgnm || prev.username
                }));
            }
        } catch (err) {
            console.error('Failed to fetch GST details:', err);
            // Non-blocking error, user can still type manually
        } finally {
            setIsFetchingGstin(false);
        }
    };

    const handleGstinChange = (e) => {
        const val = e.target.value.toUpperCase();
        setFormData(prev => ({ ...prev, gstin: val }));

        if (val.length === 15) {
            fetchGstinDetails(val);
        }
    };

    const roles = [
        { id: 'customer', label: 'Customer', icon: User },
        { id: 'partner', label: 'Partner', icon: Shield }
    ];

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-background dark:bg-slate-950 py-8 px-4 transition-colors duration-300">
            <SEO title="Register - IT Ecosystem" description="Create your IT Ecosystem account." />

            <div className="max-w-md w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="card-material px-6 py-6"
                >
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1.5 tracking-tight">Create Account</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Join IT Ecosystem to get started</p>
                    </div>

                    {/* Role Selector */}
                    <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg mb-6">
                        {roles.map((r) => (
                            <button
                                key={r.id}
                                onClick={() => setRole(r.id)}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all duration-200 ${role === r.id
                                    ? 'bg-white dark:bg-slate-700 text-primary shadow-sm'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                    }`}
                            >
                                <r.icon className="w-3.5 h-3.5" />
                                {r.label}
                            </button>
                        ))}
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg flex items-center text-xs">
                            <AlertCircle className="w-4 h-4 mr-2.5 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <form className="space-y-3.5" onSubmit={handleRegister}>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Company Name</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Building className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                </div>
                                <input
                                    name="username"
                                    type="text"
                                    required
                                    minLength={3}
                                    maxLength={50}
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="Tech Solutions Ltd"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Full Name</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                </div>
                                <input
                                    name="fullName"
                                    type="text"
                                    required
                                    minLength={2}
                                    maxLength={100}
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        {role === 'partner' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1 flex items-center justify-between">
                                        GSTIN Number
                                        {isFetchingGstin && (
                                            <span className="flex items-center gap-1.5 text-[10px] text-primary animate-pulse uppercase tracking-widest font-extrabold">
                                                <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                Verifying...
                                            </span>
                                        )}
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Shield className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                        </div>
                                        <input
                                            name="gstin"
                                            type="text"
                                            required
                                            maxLength={15}
                                            pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
                                            title="Invalid GSTIN format. Example: 22AAAAA0000A1Z5"
                                            value={formData.gstin}
                                            onChange={handleGstinChange}
                                            className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono tracking-wider"
                                            placeholder="22AAAAA0000A1Z5"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Phone Number</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                </div>
                                <input
                                    name="phone"
                                    type="tel"
                                    required
                                    minLength={10}
                                    maxLength={15}
                                    pattern="^[0-9+]{10,15}$"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Email address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    minLength={6}
                                    maxLength={40}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {(role === 'customer') && (
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1 flex items-center gap-2">
                                    Referral / Partner Code
                                    <span className="text-[10px] text-slate-400 font-medium normal-case">(Optional)</span>
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <ArrowRight className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        name="partnerCode"
                                        type="text"
                                        value={formData.partnerCode}
                                        onChange={handlePartnerCodeChange}
                                        onFocus={() => formData.partnerCode.length > 1 && setShowPartnerSuggestions(true)}
                                        className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
                                        placeholder="e.g. PART-12345"
                                        autoComplete="off"
                                    />
                                    <AnimatePresence>
                                        {showPartnerSuggestions && filteredPartnerCodes.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl max-h-48 overflow-y-auto custom-scrollbar"
                                            >
                                                {filteredPartnerCodes.map((code, index) => (
                                                    <button
                                                        key={index}
                                                        type="button"
                                                        onClick={() => selectPartnerCode(code)}
                                                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border-b border-slate-50 dark:border-slate-700 last:border-none flex items-center justify-between group"
                                                    >
                                                        <span>{code}</span>
                                                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <p className="text-[10px] text-slate-500 mt-1 ml-1 font-medium">Leave blank if you were not referred by a partner.</p>
                            </div>
                        )}

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full flex items-center justify-center group py-3"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Creating Account...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Create Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
                            <span className="px-3 bg-white dark:bg-slate-900 text-slate-400">Or register with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <button className="flex items-center justify-center py-2 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" title="Google">
                            <Chrome className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                        </button>
                        <button className="flex items-center justify-center py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" title="Facebook">
                            <Facebook className="w-5 h-5 text-[#1877F2]" />
                        </button>
                        <button className="flex items-center justify-center py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" title="LinkedIn">
                            <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                        </button>
                    </div>

                    <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
                        Already have an account?{' '}
                        <Link to={`/login?role=${role}`} className="text-primary font-bold hover:underline">
                            Sign in
                        </Link>
                    </p>
                </motion.div>
            </div>

            <ConfirmationModal
                isOpen={modalConfig.isOpen}
                onClose={closeModal}
                onConfirm={modalConfig.onConfirm}
                title={modalConfig.title}
                message={modalConfig.message}
                type={modalConfig.type}
                confirmText={modalConfig.confirmText}
            />
        </div>
    );
};

export default Register;
