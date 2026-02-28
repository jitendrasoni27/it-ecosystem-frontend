import React, { useState } from 'react';
import {
    Search,
    ChevronDown,
    Check,
    Maximize2,
    Layout,
    Minimize2,
    ShieldCheck,
    Sun,
    Moon,
    Settings
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// Constants for theme configuration
const API_BASE_URL = 'http://localhost:8080/api';

const THEME_PRESETS = [
    { id: 'default', label: 'Standard Blue', color: 'bg-blue-600' },
    { id: 'navy', label: 'Cobalt Navy', color: 'bg-[#000957]' },
    { id: 'emerald', label: 'Deep Emerald', color: 'bg-emerald-600' },
    { id: 'amethyst', label: 'Royal Amethyst', color: 'bg-purple-600' },
    { id: 'crimson', label: 'Crimson Vengeance', color: 'bg-red-600' },
    { id: 'amber', label: 'Amber Horizon', color: 'bg-amber-600' },
    { id: 'ocean', label: 'Oceanic Abyss', color: 'bg-cyan-600' },
    { id: 'sapphire', label: 'Vibrant Sapphire', color: 'bg-blue-500' },
    { id: 'rose', label: 'Velvet Rose', color: 'bg-rose-600' },
    { id: 'gold', label: 'Imperial Gold', color: 'bg-yellow-500' },
    { id: 'forest', label: 'Evergreen Forest', color: 'bg-green-700' },
    { id: 'slate', label: 'Urban Slate', color: 'bg-slate-500' },
    { id: 'sunset', label: 'Neon Sunset', color: 'bg-orange-500' },
    { id: 'midnight', label: 'Void Midnight', color: 'bg-zinc-900' },
    { id: 'neon', label: 'Toxic Neon', color: 'bg-lime-500' },
    { id: 'quartz', label: 'Crystalline Quartz', color: 'bg-teal-500' },
    { id: 'volcano', label: 'Burning Volcano', color: 'bg-red-800' }
];

/**
 * ThemeAutocompleter Component
 * Dropdown selector for choosing appearance presets with search capability.
 */
const ThemeAutocompleter = ({ value, onChange, mode, density, currentUser }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const containerRef = React.useRef(null);

    const selectedTheme = THEME_PRESETS.find(t => t.id === value) || THEME_PRESETS[0];

    const filteredThemes = query === ''
        ? THEME_PRESETS
        : THEME_PRESETS.filter((theme) =>
            theme.label.toLowerCase().includes(query.toLowerCase())
        );

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = async (themeId) => {
        onChange(themeId);
        setIsOpen(false);
        setQuery('');
        try {
            await axios.put(`${API_BASE_URL}/user/profile`, {
                ...currentUser,
                themePreference: `${mode}:${themeId}:${density}`
            });
        } catch (err) {
            console.error('Failed to save theme preference', err);
        }
    };

    return (
        <div className="relative" ref={containerRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 cursor-pointer hover:border-primary/30 dark:hover:border-primary/20 transition-all min-w-[180px] shadow-sm active:scale-[0.98]"
            >
                <div className="flex items-center gap-2.5">
                    <div className={`w-3 h-3 rounded-full ${selectedTheme.color} shadow-[0_0_8px_rgba(0,0,0,0.1)]`} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">
                        {selectedTheme.label}
                    </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-500 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <Motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute z-[100] right-0 mt-3 w-[260px] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
                    >
                        <div className="p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search themes..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-[10px] font-bold tracking-tight focus:ring-4 focus:ring-primary/5 outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-2 space-y-1">
                            {filteredThemes.length > 0 ? (
                                filteredThemes.map((theme) => (
                                    <button
                                        key={theme.id}
                                        onClick={() => handleSelect(theme.id)}
                                        className={`w-full flex items-center justify-between px-3 py-3 text-left rounded-xl transition-all group ${value === theme.id
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                            : 'hover:bg-slate-100 dark:hover:bg-slate-900'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-4 h-4 rounded-full ${theme.color} border-2 ${value === theme.id ? 'border-white/40' : 'border-transparent shadow-sm'}`} />
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${value === theme.id ? 'text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                                                {theme.label}
                                            </span>
                                        </div>
                                        {value === theme.id && (
                                            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                        )}
                                    </button>
                                ))
                            ) : (
                                <div className="p-8 text-center">
                                    <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-3 opacity-50">
                                        <Search className="w-6 h-6 text-slate-400" />
                                    </div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Node Not Found</p>
                                </div>
                            )}
                        </div>
                    </Motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/**
 * DensitySelector Component
 * Toggle buttons for interface spatial density.
 */
const DensitySelector = ({ value, onChange, mode, accent, currentUser }) => {
    const options = [
        { id: 'expanded', label: 'Expanded', icon: Maximize2, desc: 'Maximum breathing room' },
        { id: 'comfort', label: 'Comfort', icon: Layout, desc: 'Balanced spatial rhythm' },
        { id: 'compact', label: 'Compact', icon: Minimize2, desc: 'High information density' }
    ];

    const handleSelect = async (densityId) => {
        onChange(densityId);
        try {
            await axios.put(`${API_BASE_URL}/user/profile`, {
                ...currentUser,
                themePreference: `${mode}:${accent}:${densityId}`
            });
        } catch (err) {
            console.error('Failed to save density preference', err);
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {options.map((opt) => (
                <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all relative overflow-hidden group ${value === opt.id
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-slate-100 dark:border-slate-800 text-slate-400 hover:border-slate-200 dark:hover:border-slate-700'
                        }`}
                >
                    <opt.icon className={`w-5 h-5 transition-transform duration-500 ${value === opt.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <div className="text-center">
                        <span className="text-[10px] font-black uppercase tracking-widest block">{opt.label}</span>
                        <span className="text-[8px] font-bold opacity-40 uppercase tracking-tighter mt-0.5 block">{opt.desc}</span>
                    </div>
                </button>
            ))}
        </div>
    );
};

/**
 * SettingsSection Component
 * Hub for visual preferences and platform security settings.
 */
const SettingsSection = ({ mode, setMode, accent, setAccent, density, setDensity, currentUser }) => (
    <div className="max-w-5xl space-y-8 pb-12">
        <div>
            <h2 className="text-2xl font-extrabold tracking-tight">Platform Governance</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">Configure infrastructure and security defaults.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Security Settings Area */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm space-y-6 relative overflow-hidden group">
                <div className="p-3 bg-emerald-500/5 rounded-xl w-fit group-hover:scale-105 transition-transform duration-500">
                    <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Security Protocol Layer</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all cursor-pointer border border-transparent hover:border-slate-100">
                            <div className="max-w-[75%]">
                                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight">Adaptive MFA Enforcement</p>
                                <p className="text-[10px] text-slate-400 font-bold leading-relaxed mt-0.5">Admin layer multi-factor requirement.</p>
                            </div>
                            <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
                                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all cursor-pointer border border-transparent hover:border-slate-100 opacity-40">
                            <div className="max-w-[75%]">
                                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight">IP Whitelist Sentinel</p>
                                <p className="text-[10px] text-slate-400 font-bold leading-relaxed mt-0.5">Restrict console access networks.</p>
                            </div>
                            <div className="w-10 h-5 bg-slate-200 dark:bg-slate-700 rounded-full relative">
                                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visual Interface Settings Area */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm space-y-8 relative overflow-visible group">
                <div className="p-3 bg-primary/5 rounded-xl w-fit group-hover:scale-110 transition-transform duration-500">
                    <Sun className="w-6 h-6 text-primary dark:text-white" />
                </div>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Visual Interface Protocol</h3>
                        <p className="text-xs text-slate-500 font-medium mt-1">Configure global aesthetic parameters.</p>
                    </div>

                    <div className="space-y-6">
                        {/* Theme Mode Toggles */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Core UI Mode</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    { id: 'light', label: 'Light', icon: Sun },
                                    { id: 'dark', label: 'Dark', icon: Moon },
                                    { id: 'system', label: 'System', icon: Settings }
                                ].map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={async () => {
                                            setMode(t.id);
                                            try {
                                                await axios.put(`${API_BASE_URL}/user/profile`, {
                                                    ...currentUser,
                                                    themePreference: `${t.id}:${accent}:${density}`
                                                });
                                            } catch (err) {
                                                console.error('Failed to save theme preference', err);
                                            }
                                        }}
                                        className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${mode === t.id
                                            ? 'border-primary bg-primary/5 text-primary'
                                            : 'border-slate-100 dark:border-slate-800 text-slate-400 hover:border-slate-200 dark:hover:border-slate-700'
                                            }`}
                                    >
                                        <t.icon className="w-5 h-5" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">{t.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Density Selector */}
                        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Interface Density</label>
                            <DensitySelector
                                value={density}
                                onChange={setDensity}
                                mode={mode}
                                accent={accent}
                                currentUser={currentUser}
                            />
                        </div>

                        {/* Accent Color Autocompleter */}
                        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Appearance Preset</label>
                                <ThemeAutocompleter
                                    value={accent}
                                    onChange={setAccent}
                                    mode={mode}
                                    currentUser={currentUser}
                                    density={density}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-gradient-to-r from-rose-500/10 to-rose-600/5 border-2 border-dashed border-rose-500/20 p-8 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
            <div className="absolute -left-10 -top-10 w-32 h-32 bg-rose-500 opacity-5 rounded-full blur-[40px]" />
            <div className="relative z-10 text-center md:text-left">
                <h3 className="text-xl font-bold text-rose-600 tracking-tight">Enterprise Purge Protocol</h3>
                <p className="text-xs text-rose-500 font-semibold mt-1 leading-relaxed">Operation irreversible. Redundancy clusters will be purged.</p>
            </div>
            <button className="relative z-10 px-8 py-3 bg-rose-600 text-white text-xs font-bold rounded-lg hover:bg-rose-700 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-rose-600/20">
                Initiate Purge
            </button>
        </div>
    </div>
);

export default SettingsSection;
export { THEME_PRESETS };
