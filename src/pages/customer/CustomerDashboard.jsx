import React, { useState } from 'react';
import {
    LayoutDashboard,
    ShieldCheck,
    CreditCard,
    BookOpen,
    Settings,
    Activity,
    Clock,
    Search,
    Filter,
    ArrowUpRight,
    TrendingUp,
    Shield,
    User,
    HelpCircle,
    Bell
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import TechnicalDocs from '../TechnicalDocs';

const CustomerDashboard = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'dashboard');
    const { mode, setMode, accent, setAccent } = useTheme();
    const { logout, currentUser } = useAuth();
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);

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
                return <CustomerOverview />;
            case 'services':
                return <ActiveServicesSection />;
            case 'orders':
                return <OrderHistorySection />;
            case 'profile':
                return <ProfileSection currentUser={currentUser} />;
            case 'documentation':
                return <TechnicalDocs IsDashboard={true} />;
            case 'settings':
                return <CustomerSettings />;
            default:
                return <CustomerOverview />;
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
                role="ROLE_CUSTOMER"
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
        </div>
    );
};

// --- Customer Sections ---

const CustomerOverview = () => (
    <div className="space-y-8">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Service Management Console</h2>
                <p className="text-sm text-slate-500 font-medium mt-1 uppercase tracking-widest opacity-60">Operations Center • Subscription: Global Cluster</p>
            </div>
            <div className="flex gap-3">
                <button className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:bg-slate-50 transition-all text-slate-500 dark:text-slate-400">
                    <Bell className="w-5 h-5" />
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary text-white p-6 rounded-2xl shadow-xl shadow-primary/20 relative overflow-hidden group">
                <ShieldCheck className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Network Status</p>
                <h3 className="text-2xl font-black tracking-tight">System Secured</h3>
                <div className="mt-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Live Integration</span>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm group">
                <Clock className="w-5 h-5 text-amber-500 mb-4 group-hover:rotate-12 transition-transform" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Upcoming Renewal</p>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">March 24, 2025</h3>
                <p className="text-[10px] text-amber-500 font-bold mt-2 uppercase">27 Days Remaining</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm group">
                <CreditCard className="w-5 h-5 text-primary mb-4" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Wallet</p>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">₹1,240.00</h3>
                <p className="text-[10px] text-primary font-bold mt-2 uppercase tracking-widest">Verified Balance</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-[0.02]">
                    <TrendingUp className="w-64 h-64 text-primary" />
                </div>
                <h3 className="text-xl font-black tracking-tight mb-2">Resource Utilization</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">Performance Telemetry</p>
                <div className="space-y-6">
                    {[
                        { label: 'Compute Power', pct: 68, color: 'bg-primary' },
                        { label: 'Neural Bandwidth', pct: 42, color: 'bg-indigo-500' },
                        { label: 'Database I/O', pct: 85, color: 'bg-emerald-500' }
                    ].map((res) => (
                        <div key={res.label} className="space-y-2">
                            <div className="flex justify-between text-[11px] font-bold">
                                <span className="text-slate-500 uppercase tracking-tight">{res.label}</span>
                                <span className="text-slate-900 dark:text-white tabular-nums">{res.pct}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${res.pct}%` }} className={`h-full ${res.color}`} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden group">
                <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-primary opacity-20 blur-[60px]" />
                <h3 className="text-xl font-bold tracking-tight mb-6">Support Knowledge Base</h3>
                <div className="space-y-4">
                    {[
                        'Architecture Implementation Guide',
                        'Security Protocol Standards',
                        'API Endpoint Documentation',
                        'Billing & Settlement Protocols'
                    ].map((doc) => (
                        <div key={doc} className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer group/link">
                            <span className="text-xs font-medium text-white/60 group-hover/link:text-white">{doc}</span>
                            <ArrowUpRight className="w-4 h-4 text-white/20 group-hover/link:text-white transition-all" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const ActiveServicesSection = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-extrabold tracking-tight">Active Clusters</h2>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center opacity-40">
            <ShieldCheck className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <p className="font-bold text-slate-400">Querying active deployment status...</p>
        </div>
    </div>
);

const OrderHistorySection = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-extrabold tracking-tight">Order Archives</h2>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center opacity-40">
            <CreditCard className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <p className="font-bold text-slate-400">Retrieving settlement history nodes...</p>
        </div>
    </div>
);

const CustomerSettings = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-extrabold tracking-tight">Interface Configuration</h2>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center opacity-40">
            <Settings className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <p className="font-bold text-slate-400">Accessing visual protocol parameters...</p>
        </div>
    </div>
);

const ProfileSection = ({ currentUser }) => (
    <div className="max-w-4xl space-y-8">
        <div>
            <h2 className="text-2xl font-extrabold tracking-tight">Node Identity</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">Manage residency and access parameters.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 p-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-32 h-32 rounded-3xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center text-4xl font-black shadow-2xl">
                    {currentUser?.fullName?.[0]}
                </div>
                <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Residency Name</label>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">{currentUser?.fullName}</p>
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secure Uplink</label>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">{currentUser?.email}</p>
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Organization Unit</label>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">{currentUser?.organizationName || 'Independent Participant'}</p>
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Protocol</label>
                            <p className="text-lg font-bold text-primary font-black uppercase tracking-tighter">{currentUser?.role?.replace('ROLE_', '')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default CustomerDashboard;
