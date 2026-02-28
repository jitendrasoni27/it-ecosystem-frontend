import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('http://localhost:8080/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });
            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(data.message || 'If an account exists with this email, you will receive a password reset link shortly.');
            } else {
                setStatus('error');
                setMessage(data.message || 'Failed to send reset link. Please try again.');
            }
        } catch (err) {
            console.error('Forgot password error:', err);
            setStatus('error');
            setMessage('Network error. Please check your connection.');
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-background dark:bg-slate-950 py-8 px-4 transition-colors duration-300">
            <SEO title="Forgot Password - IT Ecosystem" />

            <div className="max-w-md w-full">
                <div className="card-material px-6 py-6">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1.5 tracking-tight">
                            Reset Password
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Enter your email to receive a reset link
                        </p>
                    </div>

                    {status === 'success' ? (
                        <div className="text-center py-2">
                            <div className="mx-auto h-12 w-12 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle className="h-8 w-8" />
                            </div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">Check your email</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 px-4">{message}</p>
                            <Link to="/login" className="btn-primary w-full flex items-center justify-center">
                                Back to Login
                            </Link>
                        </div>
                    ) : (
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">
                                    Email address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            {status === 'error' && (
                                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg flex items-center text-sm">
                                    <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                                    {message}
                                </div>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="btn-primary w-full flex items-center justify-center py-3"
                                >
                                    {status === 'loading' ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                            Sending Link...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Send Reset Link <ArrowRight className="w-5 h-5" />
                                        </span>
                                    )}
                                </button>
                            </div>

                            <div className="flex items-center justify-center pt-2">
                                <Link to="/login" className="flex items-center text-sm font-bold text-slate-500 hover:text-primary transition-colors">
                                    <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Login
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
