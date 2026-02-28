import React from 'react';
import { motion } from 'framer-motion';
import { History } from 'lucide-react';

/**
 * OrderHistorySection Component
 * Displays historical settlement ledger and protocol logs.
 */
const OrderHistorySection = () => (
    <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Archive Transactions</h2>
                <p className="text-sm text-slate-500 font-medium">Historical settlement ledger and protocol logs.</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 hide-scrollbar">
                {['All Nodes', 'Active Protocol', 'Archived'].map((f) => (
                    <button key={f} className="px-5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary hover:border-primary/30 transition-all whitespace-nowrap">
                        {f}
                    </button>
                ))}
            </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[500px] flex flex-col items-center justify-center p-12 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/5 via-primary/20 to-primary/5" />
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center max-w-md text-center"
            >
                <div className="w-20 h-20 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-8 shadow-inner group transition-transform hover:rotate-12">
                    <History className="w-10 h-10 text-slate-300 dark:text-slate-700 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">No Transactions Found</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    The archival settlement registry is currently empty. Initialize a new commercial protocol or synchronize with external merchant nodes to populate this ledger.
                </p>
                <button className="mt-10 px-8 py-3 bg-primary text-white rounded-lg text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                    Initialize Protocol
                </button>
            </motion.div>

            {/* Ghost Table Scaffold (Visual flourish) */}
            <div className="absolute inset-0 pointer-events-none p-12 opacity-[0.03] overflow-hidden">
                <div className="space-y-8 w-full">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="flex gap-8 border-b border-slate-900 pb-8">
                            <div className="w-12 h-12 bg-slate-900 rounded-full" />
                            <div className="flex-1 space-y-3">
                                <div className="h-4 bg-slate-900 w-1/4 rounded" />
                                <div className="h-3 bg-slate-900 w-1/2 rounded" />
                            </div>
                            <div className="w-24 h-4 bg-slate-900 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default OrderHistorySection;
