import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Lock, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, Shield } from 'lucide-react';
import SEO from '../components/SEO';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            setStatus('error');
            setMessage('Passwords Do Not Match.');
            return;
        }

        if (!token) {
            setStatus('error');
            setMessage('Invalid Or Missing Reset Token Protocol.');
            return;
        }

        setStatus('loading');

        try {
            await axios.post(`${API_BASE_URL}/api/auth/reset-password`, {
                token: token,
                newPassword: formData.newPassword
            });
            setStatus('success');
            setMessage('Your Password Has Been Reset Successfully. You Can Now Log In With Your New Credentials.');
        } catch (err) {
            setStatus('error');
            setMessage(err.response?.data?.message || 'Failed To Reset Password. The Link May Be Expired.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white py-24 px-4 font-sans">
            <SEO title="Reset Password - It Ecosystem" description="Update Your Digital Access Key." />

            <div className="max-w-2xl w-full">
                <div className="border-8 border-black p-8 md:p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] bg-white">
                    <div className="text-center mb-12 border-b-4 border-black pb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 border-4 border-black bg-success mb-6">
                            <Lock className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-black mb-4 uppercase tracking-tighter leading-none">Access Key Reconfiguration</h1>
                        <div className="inline-block bg-black text-white px-4 py-1 text-sm font-black uppercase tracking-widest">
                            Establishing New Security Credentials
                        </div>
                    </div>

                    {status === 'success' ? (
                        <div className="text-center py-8">
                            <div className="mx-auto h-24 w-24 border-4 border-black bg-success text-white flex items-center justify-center mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                <CheckCircle className="h-12 w-12" />
                            </div>
                            <h3 className="text-2xl font-black text-black mb-4 uppercase">Key Update Successful</h3>
                            <p className="text-xl font-bold text-black mb-10 uppercase leading-tight">{message}</p>
                            <Link to="/login" className="btn-primary w-full">
                                Return To Auth Gate
                            </Link>
                        </div>
                    ) : (
                        <form className="space-y-8" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-xl font-black text-black uppercase tracking-tighter mb-4">
                                    New Access Phrase (Password)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-6 w-6 text-black" />
                                    </div>
                                    <input
                                        name="newPassword"
                                        type="password"
                                        required
                                        value={formData.newPassword}
                                        onChange={handleInputChange}
                                        className="block w-full pl-12 pr-4 py-4 border-4 border-black text-black font-black placeholder-gray-400 focus:outline-none focus:bg-yellow-50 bg-white"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xl font-black text-black uppercase tracking-tighter mb-4">
                                    Protocol Verification (Confirm Password)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-6 w-6 text-black" />
                                    </div>
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="block w-full pl-12 pr-4 py-4 border-4 border-black text-black font-black placeholder-gray-400 focus:outline-none focus:bg-yellow-50 bg-white"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {status === 'error' && (
                                <div className="p-4 bg-secondary text-white border-4 border-black font-black uppercase text-sm flex items-center">
                                    <AlertCircle className="h-6 w-6 mr-3 flex-shrink-0" />
                                    {message}
                                </div>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full py-5 border-4 border-black font-black text-2xl uppercase tracking-widest bg-primary text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 transition-transform active:scale-95 disabled:bg-gray-400"
                                >
                                    {status === 'loading' ? (
                                        <span className="flex items-center justify-center gap-4">
                                            <svg className="animate-spin h-8 w-8 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                            Mapping New Identity...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-4">
                                            Reconfigure Access <ArrowRight className="w-8 h-8" />
                                        </span>
                                    )}
                                </button>
                            </div>

                            <div className="flex items-center justify-center pt-4">
                                <Link to="/login" className="flex items-center text-xl font-black text-secondary hover:underline uppercase">
                                    <ArrowLeft className="w-6 h-6 mr-2" /> Abort Reset
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
