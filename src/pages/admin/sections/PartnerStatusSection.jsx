import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

/**
 * PartnerStatusSection Component
 * Visualizes the partnership lifecycle and pipeline status.
 */
const PartnerStatusSection = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-extrabold tracking-tight">Partnership Lifecycle</h2>
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-8 shadow-sm relative">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
                {[
                    { label: 'Pending Assessment', count: 3, color: 'bg-amber-500' },
                    { label: 'Technical Review', count: 5, color: 'bg-indigo-500' },
                    { label: 'Verified Partners', count: 12, color: 'bg-emerald-500' },
                    { label: 'Active in Market', count: 25, color: 'bg-primary' }
                ].map((step, idx) => (
                    <div key={idx} className="relative group">
                        <div className={`h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 mb-4 overflow-hidden`}>
                            <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1, delay: idx * 0.2 }} className={`h-full ${step.color} shadow-lg`} />
                        </div>
                        <h4 className="text-xs font-bold text-slate-400 mb-1">{step.label}</h4>
                        <p className="text-xl font-bold text-slate-800 dark:text-slate-200 tabular-nums">{step.count}</p>
                    </div>
                ))}
            </div>
            <div className="p-12 text-center bg-slate-50/50 dark:bg-slate-950/20 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800">
                <ShieldCheck className="w-12 h-12 text-slate-200 dark:text-slate-800 mx-auto mb-4" />
                <p className="text-slate-400 font-bold text-xs tracking-tight">Monitoring system pipeline flows...</p>
            </div>
        </div>
    </div>
);

export default PartnerStatusSection;
