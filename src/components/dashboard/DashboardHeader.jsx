import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const DashboardHeader = ({ activeTab, setActiveTab }) => {
    const { mode, density, toggleTheme } = useTheme();
    const { currentUser } = useAuth();

    return (
        <header
            style={{ height: 'var(--global-nav-h)', paddingLeft: 'var(--global-px)', paddingRight: 'var(--global-px)' }}
            className="bg-primary dark:bg-slate-900 border-b border-white/5 flex items-center justify-between flex-shrink-0 z-40 shadow-sm transition-all duration-300 transition-colors"
        >
            <div className="flex items-center gap-4 sm:gap-6">
                <div>
                    <h1 className="text-sm sm:text-lg font-bold text-white capitalize leading-tight">
                        {activeTab.replace('-', ' ')}
                    </h1>
                    <p className="hidden xs:block text-[8px] sm:text-[9px] text-white/50 font-bold uppercase tracking-widest mt-0.5">
                        SONIAPPS / {activeTab.replace('-', ' ')}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                    >
                        {mode === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    </button>
                </div>

                <div className="h-6 w-px bg-white/10" />

                <button
                    onClick={() => setActiveTab('profile')}
                    className="flex items-center gap-3 hover:bg-white/5 p-1.5 rounded-xl transition-all group"
                >
                    <div className="text-right hidden sm:block leading-tight">
                        <p className="text-xs font-bold text-white group-hover:text-primary transition-colors">
                            {currentUser?.fullName || 'User Access'}
                        </p>
                        <p className="text-[9px] text-white/50 font-bold uppercase tracking-tighter">
                            {currentUser?.email || 'Verified Tier'}
                        </p>
                    </div>
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white text-primary dark:text-slate-900 flex items-center justify-center text-[11px] font-black shadow-lg group-hover:scale-105 transition-transform">
                        {currentUser?.fullName ? currentUser.fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'US'}
                    </div>
                </button>
            </div>
        </header>
    );
};

export default DashboardHeader;
