import React, { useState } from 'react';
import {
    Users,
    TrendingUp,
    BarChart3,
    Package,
    History,
    Activity,
    CreditCard,
    DollarSign,
    ShieldCheck,
    Clock,
    Search,
    Filter,
    Plus,
    ArrowUpRight,
    ArrowDownRight,
    Briefcase
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import TechnicalDocs from '../TechnicalDocs';
import { useTheme } from '../../context/ThemeContext';

import axios from 'axios';

const PartnerDashboard = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'dashboard');
    const { mode, setMode, accent, setAccent } = useTheme();
    const { logout, currentUser } = useAuth();
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [clients, setClients] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [onboardModalOpen, setOnboardModalOpen] = useState(false);

    const API_BASE_URL = 'http://localhost:8080/api';

    const fetchClients = async () => {
        setFetchLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/partner/clients`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setClients(response.data);
        } catch (err) {
            console.error('Failed to fetch clients:', err);
        } finally {
            setFetchLoading(false);
        }
    };

    React.useEffect(() => {
        if (activeTab === 'clients') {
            fetchClients();
        }
    }, [activeTab]);

    // Sync theme with user preference
    React.useEffect(() => {
        if (currentUser?.themePreference) {
            const [prefMode, prefAccent] = currentUser.themePreference.split(':');
            if (prefMode) setMode(prefMode);
            if (prefAccent) setAccent(prefAccent);
        }
    }, [currentUser?.themePreference, setMode, setAccent]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <PartnerOverview clientsCount={clients.length} />;
            case 'clients':
                return (
                    <ClientsSection
                        clients={clients}
                        loading={fetchLoading}
                        onAdd={() => setOnboardModalOpen(true)}
                        onRefresh={fetchClients}
                    />
                );
            case 'inventory':
                return <InventorySection />;
            case 'transactions':
                return <PayoutSection />;
            case 'analytics':
                return <TelemetrySection />;
            case 'commissions':
                return <YieldSection />;
            case 'profile':
                return <ProfileSection currentUser={currentUser} />;
            default:
                return <PartnerOverview clientsCount={clients.length} />;
        }
    };

    return (
        <div className="flex h-screen bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">
            <DashboardSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onLogout={handleLogout}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                role="ROLE_PARTNER"
            />

            <main className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-slate-950">
                <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="p-8 md:p-10 max-w-full">
                        <AnimatePresence mode="wait">
                            <Motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                {renderContent()}
                            </Motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            {/* Modals */}
            <AnimatePresence>
                {onboardModalOpen && (
                    <OnboardUserModal
                        isOpen={onboardModalOpen}
                        onClose={() => setOnboardModalOpen(false)}
                        onSuccess={fetchClients}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

// --- Partner Sections ---

const PartnerOverview = ({ clientsCount }) => (
    <div className="space-y-8">
        <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Commercial Protocol Overview</h2>
            <p className="text-sm text-slate-500 font-medium mt-1 uppercase tracking-widest opacity-60">Operations Center • Node Status: Active</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                { label: 'Active Clients', value: clientsCount, icon: Users, color: 'text-primary' },
                { label: 'Settled Yield', value: '₹4.2L', icon: DollarSign, color: 'text-emerald-500' },
                { label: 'Pending Payout', value: '₹84K', icon: Clock, color: 'text-amber-500' },
                { label: 'Platform Rank', value: 'Silver', icon: ShieldCheck, color: 'text-indigo-500' }
            ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm group hover:scale-[1.02] transition-all">
                    <stat.icon className={`w-5 h-5 ${stat.color} mb-4 group-hover:scale-110 transition-transform`} />
                    <p className="text-sm font-bold text-slate-500 tracking-tight">{stat.label}</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{stat.value}</p>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:scale-110 transition-transform duration-700">
                    <TrendingUp className="w-64 h-64 text-primary" />
                </div>
                <h3 className="text-xl font-black tracking-tight mb-6">Yield Trajectory</h3>
                <div className="h-48 flex items-end gap-3 px-1">
                    {[20, 35, 25, 60, 45, 75, 55, 90, 65, 85].map((h, i) => (
                        <div key={i} className="flex-1 bg-primary/10 hover:bg-primary rounded-t-md transition-all duration-500 relative group/bar" style={{ height: `${h}%` }}>
                            <div className="opacity-0 group-hover/bar:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-black px-2 py-1 rounded-md transition-all">₹{h}K</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-primary text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col justify-between group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                    <Users className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                    <h3 className="text-xl font-bold tracking-tight">Expand Your Cluster</h3>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mt-2 mb-8">Recruitment Protocol</p>
                    <button onClick={() => { }} className="px-6 py-3 bg-white/10 hover:bg-white text-white hover:text-primary rounded-xl transition-all font-black text-xs uppercase tracking-widest border border-white/20">
                        Generate Referral
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const ClientsSection = ({ clients, loading, onAdd, onRefresh }) => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Client Hub</h2>
                <p className="text-sm text-slate-500 font-medium">Manage your onboarded customers and node associations.</p>
            </div>
            <button
                onClick={onAdd}
                className="px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
            >
                <Plus className="w-4 h-4" />
                Onboard User
            </button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            {loading ? (
                <div className="p-20 text-center space-y-4">
                    <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mx-auto" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Synchronizing Client Nodes...</p>
                </div>
            ) : clients.length === 0 ? (
                <div className="p-20 text-center space-y-6">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-950 rounded-3xl mx-auto flex items-center justify-center border border-slate-100 dark:border-slate-800">
                        <Users className="w-10 h-10 text-slate-300" />
                    </div>
                    <div className="max-w-xs mx-auto">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Clients Found</h3>
                        <p className="text-xs text-slate-500 font-medium mt-2">You haven't onboarded any customers to your protocol yet. Use the onboarding system to start expanding your cluster.</p>
                    </div>
                    <button
                        onClick={onAdd}
                        className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
                    >
                        Initialize Onboarding Protocol
                    </button>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Identity Node</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Organization</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Uplink Status</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Registered</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {clients.map((client) => (
                                <tr key={client.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center text-xs font-black shadow-md group-hover:scale-110 transition-transform">
                                                {client.fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{client.fullName}</p>
                                                <p className="text-[10px] font-medium text-slate-500 mt-0.5">{client.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                                            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{client.organizationName || 'Independent Node'}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-600 rounded-lg w-fit">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <p className="text-xs font-bold text-slate-500 italic tabular-nums">
                                            {new Date(client.registrationDate).toLocaleDateString()}
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    </div>
);

const InventorySection = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-extrabold tracking-tight">Inventory Monitor</h2>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center opacity-40">
            <Package className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <p className="font-bold text-slate-400">Retrieving system asset telemetry...</p>
        </div>
    </div>
);

const PayoutSection = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-extrabold tracking-tight">Financial Archival</h2>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center opacity-40">
            <CreditCard className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <p className="font-bold text-slate-400">Accessing fiscal settlement ledger...</p>
        </div>
    </div>
);

const TelemetrySection = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-extrabold tracking-tight">System Telemetry</h2>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center opacity-40">
            <Activity className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <p className="font-bold text-slate-400">Listening for real-time performance pulses...</p>
        </div>
    </div>
);

const YieldSection = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-extrabold tracking-tight">Yield Projections</h2>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center opacity-40">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <p className="font-bold text-slate-400">Calculating prospective revenue matrices...</p>
        </div>
    </div>
);

const OnboardUserModal = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        fullName: '',
        phone: '',
        organizationName: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:8080/api/partner/onboard', formData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            onSuccess();
            onClose();
            setFormData({
                username: '',
                email: '',
                password: '',
                fullName: '',
                phone: '',
                organizationName: ''
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to onboard user');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
            <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <Motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl relative overflow-hidden border border-slate-200 dark:border-slate-800"
            >
                <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Onboard New Node</h3>
                    <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-widest opacity-60">Customer Authentication Setup</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-xs font-bold flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                            <input
                                required
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                                placeholder="Client Identity"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Company Node</label>
                            <input
                                required
                                value={formData.organizationName}
                                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                                placeholder="Organization"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Username</label>
                            <input
                                required
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                                placeholder="handlename"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Key</label>
                            <input
                                required
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Uplink</label>
                        <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                            placeholder="client@node.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secure Mobile</label>
                        <input
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                            placeholder="+91 XXXXX XXXXX"
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-4 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                        >
                            Abort
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-3 px-10 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Initializing...' : 'Authorize Node'}
                        </button>
                    </div>
                </form>
            </Motion.div>
        </div>
    );
};

const ProfileSection = ({ currentUser }) => (
    <div className="max-w-4xl space-y-8">
        <div>
            <h2 className="text-2xl font-extrabold tracking-tight">System Identity</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">Manage your professional credentials.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 p-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-32 h-32 rounded-3xl bg-primary text-white flex items-center justify-center text-4xl font-black shadow-2xl">
                    {currentUser?.fullName?.[0]}
                </div>
                <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">{currentUser?.fullName}</p>
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Uplink</label>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">{currentUser?.email}</p>
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Organization</label>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">{currentUser?.organizationName || 'Strategic Partner'}</p>
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Partner Code</label>
                            <p className="text-lg font-bold text-primary font-mono">{currentUser?.partnerCode || 'RECRUIT-NODE'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default PartnerDashboard;
