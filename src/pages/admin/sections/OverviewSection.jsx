import React from 'react';
import {
    DollarSign,
    Users,
    Briefcase,
    TrendingUp,
    Calendar,
    Download,
    ArrowUpRight,
    ArrowDownRight,
    CheckCircle,
    XCircle,
    ShieldCheck,
    Plus
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import AnalyticsCharts from '../../../components/admin/AnalyticsCharts';

/**
 * OverviewSection Component
 * Displays key metrics and pending partner approvals.
 * 
 * @param {Object} analyticsData - Data for charts and stats
 * @param {boolean} loading - Loading state for analytics
 * @param {Function} openCreateModal - Function to open product creation modal
 */
const OverviewSection = ({ analyticsData, loading, openCreateModal }) => {
    // Stat card configurations
    const stats = [
        {
            title: 'Total Revenue',
            value: analyticsData ? `₹${analyticsData.totalRevenue.toLocaleString()}` : '₹0',
            label: 'current archive',
            trend: '+12.5%',
            isPositive: true,
            icon: DollarSign,
            color: 'text-emerald-600',
            bg: 'bg-emerald-500/10'
        },
        {
            title: 'Active Customers',
            value: analyticsData ? analyticsData.totalCustomers.toLocaleString() : '0',
            label: 'verified nodes',
            trend: '+5.2%',
            isPositive: true,
            icon: Users,
            color: 'text-primary',
            bg: 'bg-primary/10'
        },
        {
            title: 'Total Partners',
            value: analyticsData ? analyticsData.totalPartners.toLocaleString() : '0',
            label: 'vetted registry',
            trend: '+2.4%',
            isPositive: true,
            icon: Briefcase,
            color: 'text-purple-600',
            bg: 'bg-purple-500/10'
        },
        {
            title: 'Processing Orders',
            value: '18',
            label: 'pending protocol',
            trend: '-1.4%',
            isPositive: false,
            icon: TrendingUp,
            color: 'text-orange-600',
            bg: 'bg-orange-500/10'
        },
    ];

    // Dummy data for pending partners
    const pendingPartners = [
        { id: 1, name: 'TechGrowth Solutions', applicant: 'Rahul Verma', type: 'Partner', date: '2025-02-14', status: 'Pending', avatar: 'RV' },
        { id: 2, name: 'CyberSys Inc', applicant: 'Amit Singh', type: 'Partner', date: '2025-02-13', status: 'Pending', avatar: 'AS' },
        { id: 3, name: 'WebWizards', applicant: 'Sneha Gupta', type: 'Partner', date: '2025-02-12', status: 'Pending', avatar: 'SG' },
    ];

    return (
        <div className="space-y-6">
            {/* Header with quick actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Admin Dashboard</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">Welcome back, Administrator. Monitoring system heartbeat.</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-all">
                        <Calendar className="w-4 h-4" /> System Audit
                    </button>
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-xs font-bold shadow-lg shadow-primary/10 hover:scale-[1.02] transition-all">
                        <Download className="w-4 h-4" /> Export Manifesto
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200/60 dark:border-slate-800 shadow-sm relative overflow-hidden group border-l-4 border-l-primary">
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.title}</p>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">{loading ? '...' : stat.value}</h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className={`flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded ${stat.isPositive ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'
                                        }`}>
                                        {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                        {stat.trend}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-medium">{stat.label}</span>
                                </div>
                            </div>
                            <div className={`${stat.bg} ${stat.color} p-3 rounded-lg transition-transform duration-500 group-hover:scale-110`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Analytics Charts */}
            <AnimatePresence>
                {analyticsData && (
                    <Motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <AnalyticsCharts data={analyticsData.chartData} />
                    </Motion.div>
                )}
            </AnimatePresence>

            {/* Bottom Section: Approvals & Sentinel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Pending Approvals Table */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/60 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-950/20">
                        <div>
                            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.25em]">Vetting Registry</h3>
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Partner Approval Queue</p>
                        </div>
                        <button className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Audit All</button>
                    </div>
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50/50 dark:bg-slate-950/50 text-slate-400 text-[9px] font-black uppercase tracking-[0.15em]">
                                    <th className="px-6 py-3 text-left">Organization Identity</th>
                                    <th className="px-6 py-3 text-left">Contact Node</th>
                                    <th className="px-6 py-3 text-left">Registry Date</th>
                                    <th className="px-6 py-3 text-center">Protocol</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {pendingPartners.map((partner) => (
                                    <tr key={partner.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-4.5 py-3 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                                    {partner.avatar}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">[{partner.name}]</p>
                                                    <p className="text-[9px] text-primary font-black uppercase tracking-widest mt-0.5">{partner.type} Tier</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400 font-medium">
                                            {partner.applicant}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">
                                            {partner.date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex justify-center gap-2">
                                                <button className="p-2 hover:bg-emerald-500/10 text-emerald-600 rounded-lg transition-colors group/btn" title="Approve">
                                                    <CheckCircle className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                                                </button>
                                                <button className="p-2 hover:bg-rose-500/10 text-rose-600 rounded-lg transition-colors group/btn" title="Reject">
                                                    <XCircle className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Info / Notifications */}
                <div className="space-y-4">
                    <div className="bg-white dark:bg-slate-900 p-4.5 rounded-lg border border-slate-200/60 dark:border-slate-800 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-10">
                            <ShieldCheck className="w-16 h-16 text-primary" />
                        </div>
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-5 relative z-10">System Diagnostic Sentinel</h3>
                        <div className="space-y-4 relative z-10">
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Database Node</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-tighter">Connected</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse"></span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Auth Protocol</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-tighter">Secure</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-slate-500">Node Storage</span>
                                <span className="text-xs font-bold text-slate-900 dark:text-white">64.2%</span>
                            </div>
                            <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-0.5">
                                <div className="h-full bg-primary w-[64.2%] rounded-full transition-all duration-1000 ease-out" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary p-6 rounded-lg text-white flex flex-col justify-between min-h-[160px] border border-white/5 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                            <Plus className="w-20 h-20 text-white" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-[10px] font-black text-white/50 uppercase tracking-[0.25em] mb-4">Operational Shortcuts</h3>
                            <button
                                onClick={openCreateModal}
                                className="w-full py-3.5 bg-white text-primary rounded-lg text-[10px] font-black uppercase tracking-[0.1em] transition-all flex items-center justify-center gap-3 hover:bg-slate-50 shadow-xl group/btn"
                            >
                                <Plus className="w-4 h-4 transition-transform group-hover/btn:rotate-90" /> Register New Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewSection;
