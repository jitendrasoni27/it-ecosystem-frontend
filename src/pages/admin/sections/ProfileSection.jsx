import React from 'react';
import {
    Mail,
    User,
    Smartphone,
    Building,
    Shield,
    DollarSign,
    Clock
} from 'lucide-react';

/**
 * ProfileSection Component
 * Displays the current user's profile details and system identity.
 * 
 * @param {Object} currentUser - The currently logged-in user object
 */
const ProfileSection = ({ currentUser }) => (
    <div className="max-w-5xl space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">System Identity</h2>
                <p className="text-slate-500 font-medium mt-1">Comprehensive administrative node profile</p>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-700">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">Live Secure Connection</span>
            </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />

            {/* User Avatar and Primary Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-10 pb-10 border-b border-slate-100 dark:border-slate-800 relative z-10">
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-primary/20 border-4 border-white dark:border-slate-800 rotate-3 hover:rotate-0 transition-transform duration-500">
                    {currentUser?.fullName ? currentUser.fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'AD'}
                </div>
                <div className="text-center sm:text-left pt-2">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">{currentUser?.fullName || 'Administrator'}</h3>
                    <p className="text-primary font-bold tracking-tight text-sm mt-1 uppercase">Administrator @ Protocol Node</p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-5">
                        <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">Full Privileges</span>
                        <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">Root Access</span>
                        <span className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-200 dark:border-slate-700">JWT Encrypted</span>
                    </div>
                </div>
            </div>

            {/* Profile Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
                <div className="space-y-2.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5" /> Email Address
                    </label>
                    <p className="text-base font-bold text-slate-800 dark:text-slate-200 truncate">{currentUser?.email || 'N/A'}</p>
                </div>
                <div className="space-y-2.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <User className="w-3.5 h-3.5" /> Identity Username
                    </label>
                    <p className="text-base font-bold text-slate-800 dark:text-slate-200">@{currentUser?.username || 'N/A'}</p>
                </div>
                <div className="space-y-2.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Smartphone className="w-3.5 h-3.5" /> Secured Mobile
                    </label>
                    <p className="text-base font-bold text-slate-800 dark:text-slate-200">{currentUser?.mobileNumber || 'No Uplink'}</p>
                </div>
                <div className="space-y-2.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Building className="w-3.5 h-3.5" /> Organization Node
                    </label>
                    <p className="text-base font-bold text-slate-800 dark:text-slate-200 uppercase truncate">{currentUser?.organizationName || 'Independent Administrator'}</p>
                </div>
                <div className="space-y-2.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5" /> Partner Protocol Code
                    </label>
                    <p className="text-base font-bold text-slate-800 dark:text-slate-200 font-mono tracking-tighter">{currentUser?.partnerCode || 'AD-CORE-001'}</p>
                </div>
                <div className="space-y-2.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <DollarSign className="w-3.5 h-3.5" /> Wallet Balance
                    </label>
                    <p className="text-base font-black text-emerald-600 dark:text-emerald-400">₹{currentUser?.walletBalance?.toLocaleString('en-IN') || '0.00'}</p>
                </div>
                <div className="space-y-2.5 lg:col-span-1 sm:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" /> Session Diagnostic
                    </label>
                    <p className="text-base font-bold text-slate-800 dark:text-slate-200 font-mono">
                        {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} at {new Date().toLocaleTimeString()}
                    </p>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4">
                <button className="px-10 py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-slate-900/10">
                    Maintain Protocol Identity
                </button>
                <button className="px-10 py-4 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-750 transition-all">
                    Reset Access Tokens
                </button>
            </div>
        </div>
    </div>
);

export default ProfileSection;
