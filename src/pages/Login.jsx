import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, AlertCircle, Shield, User, Chrome, Facebook, Linkedin, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import axios from 'axios';

const Login = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const roleParam = searchParams.get('role');
    const [role, setRole] = useState('customer');

    const { login } = useAuth();

    useEffect(() => {
        if (roleParam && ['customer', 'partner', 'admin'].includes(roleParam)) {
            setRole(roleParam);
        }
    }, [roleParam]);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:8080/api/auth/signin', {
                username: loginData.username,
                password: loginData.password
            });

            const { token, role: backendRole, themePreference, ...userDetails } = response.data;
            const normalizedRole = backendRole.toLowerCase().replace('role_', '');

            login({
                token: token,
                role: normalizedRole,
                themePreference: themePreference,
                ...userDetails
            });

            if (normalizedRole === 'admin') {
                navigate('/admin-dashboard');
            } else if (normalizedRole === 'partner') {
                navigate('/partner-dashboard');
            } else {
                navigate('/customer-dashboard');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const roles = [
        { id: 'customer', label: 'Customer', icon: Mail },
        { id: 'partner', label: 'Partner', icon: Shield },
        { id: 'admin', label: 'Admin', icon: Lock }
    ];

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-background dark:bg-slate-950 py-8 px-4 transition-colors duration-300">
            <SEO title="Login - IT Ecosystem" description="Login to your IT Ecosystem account." />

            <div className="max-w-md w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="card-material px-6 py-6"
                >
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1.5 tracking-tight">Welcome Back</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Sign in to your account</p>
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

                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Email or Company Name</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                </div>
                                <input
                                    name="username"
                                    type="text"
                                    required
                                    value={loginData.username}
                                    onChange={handleInputChange}
                                    className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1.5 ml-1">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
                                <Link to="/forgot-password" size="sm" className="text-xs font-bold text-primary hover:text-primary-dark hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    value={loginData.password}
                                    onChange={handleInputChange}
                                    className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full flex items-center justify-center group"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Signing in...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    Sign In <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                            <span className="px-3 bg-white dark:bg-slate-900 text-slate-400">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <button className="flex items-center justify-center py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" title="Google">
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
                        Don't have an account?{' '}
                        <Link to={role === 'partner' ? '/register?role=partner' : '/register'} className="text-primary font-bold hover:underline">
                            Create account
                        </Link>
                    </p>
                </motion.div>
            </div >
        </div >
    );
};

export default Login;
