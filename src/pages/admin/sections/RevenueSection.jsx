import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

/**
 * RevenueSection Component
 * Displays diagnostic analytics and revenue stream telemetry.
 */
const RevenueSection = () => (
    <div className="space-y-8">
        {/* Header and Epoch Selector */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Diagnostic Analytics</h2>
                <p className="text-sm text-slate-500 font-medium">Real-time revenue stream and performance telemetry.</p>
            </div>
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 w-full sm:w-auto overflow-x-auto hide-scrollbar">
                {['24H Phase', '7D Cycle', '30D Epoch', 'Annual'].map((p, i) => (
                    <button key={p} className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${i === 2 ? 'bg-primary text-white shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}>
                        {p}
                    </button>
                ))}
            </div>
        </div>

        {/* Analytics Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary/5 via-secondary/20 to-secondary/5" />
                <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
                    <div className="w-16 h-16 rounded-full bg-secondary/5 border border-secondary/10 flex items-center justify-center mb-6 animate-pulse">
                        <BarChart3 className="w-8 h-8 text-secondary/40" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Telemetry Synchronization Required</h3>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-2">
                        System is awaiting live data flow from the commerce gateway. Connect your production API keys to visualize historical and predicted yield matrices.
                    </p>
                </div>

                {/* Ghost Bar Chart Background */}
                <div className="absolute inset-x-8 bottom-8 h-32 flex items-end gap-2 opacity-[0.03] pointer-events-none">
                    {[40, 70, 45, 90, 65, 30, 85, 50, 75, 40, 60, 35, 80, 55].map((h, i) => (
                        <div key={i} className="flex-1 bg-slate-900 rounded-t-sm" style={{ height: `${h}%` }} />
                    ))}
                </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
                <div className="bg-primary text-white p-6 rounded-xl shadow-2xl relative overflow-hidden group min-h-[180px] flex flex-col justify-between">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <TrendingUp className="w-20 h-20" />
                    </div>
                    <div className="z-10">
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 mb-2">Projected Yield</p>
                        <h4 className="text-3xl font-black tracking-tighter">₹0.00</h4>
                    </div>
                    <div className="z-10 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-white/20 animate-ping" />
                        <span className="text-[10px] font-bold opacity-30 uppercase tracking-widest">Awaiting Pulse...</span>
                    </div>
                </div>

                {/* Health Monitoring */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Health</h4>
                    <div className="space-y-3">
                        {[
                            { label: 'API Connection', status: 'Offline', color: 'bg-rose-500' },
                            { label: 'Data Warehouse', status: 'Standby', color: 'bg-amber-500' },
                            { label: 'Prediction Engine', status: 'Ready', color: 'bg-emerald-500' }
                        ].map((s) => (
                            <div key={s.label} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950/50">
                                <span className="text-[9px] font-bold text-slate-500 uppercase">{s.label}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[8px] font-black uppercase text-slate-400">{s.status}</span>
                                    <div className={`w-1.5 h-1.5 rounded-full ${s.color}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default RevenueSection;
