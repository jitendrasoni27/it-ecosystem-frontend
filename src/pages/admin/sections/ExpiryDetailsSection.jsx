import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';

/**
 * ExpiryDetailsSection Component
 * Monitors and displays expiration status for products/partners.
 */
const ExpiryDetailsSection = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-extrabold text-rose-600 tracking-tight">Expiration Criticality</h2>
                <p className="text-sm text-slate-500 font-medium">Monitoring life-cycles for proactive renewal.</p>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-rose-600 text-white p-6 rounded-lg shadow-2xl shadow-rose-600/20 relative overflow-hidden group">
                <Clock className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                <h3 className="text-4xl font-bold mb-1 tabular-nums">12</h3>
                <p className="text-xs font-bold opacity-70 leading-relaxed">Immediate Renewal <br /> (7 Days Target)</p>
                <div className="mt-6 pt-4 border-t border-white/10">
                    <button className="text-xs font-bold bg-white/10 px-4 py-2 rounded-lg hover:bg-white text-rose-600 transition-all">Alert Partners</button>
                </div>
            </div>
            <div className="bg-amber-500 text-white p-6 rounded-lg shadow-2xl shadow-amber-500/20 relative overflow-hidden group">
                <Clock className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                <h3 className="text-4xl font-bold mb-1 tabular-nums">28</h3>
                <p className="text-xs font-bold opacity-70 leading-relaxed">Standard Renewal <br /> (30 Days Target)</p>
                <div className="mt-6 pt-4 border-t border-white/10">
                    <button className="text-xs font-bold bg-white/10 px-4 py-2 rounded-lg hover:bg-white text-amber-500 transition-all">Queue Reminders</button>
                </div>
            </div>
            <div className="bg-[#000957] text-white p-6 rounded-lg shadow-2xl relative overflow-hidden group">
                <CheckCircle className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 text-emerald-400 group-hover:scale-110 transition-transform duration-700" />
                <h3 className="text-4xl font-bold mb-1 tabular-nums">842</h3>
                <p className="text-xs font-bold opacity-70 leading-relaxed">Secured Lifecycle <br /> (Healthy Catalog)</p>
                <div className="mt-6 pt-4 border-t border-white/10">
                    <p className="text-[10px] font-bold opacity-40">No action required</p>
                </div>
            </div>
        </div>
    </div>
);

export default ExpiryDetailsSection;
