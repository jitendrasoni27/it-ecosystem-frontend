import React, { useState, useEffect } from 'react';
import {
    Search,
    Loader2,
    Trash2,
    Clock
} from 'lucide-react';
import axios from 'axios';
import ConfirmationModal from '../../../components/modals/ConfirmationModal';

// Constants for log configuration
const API_BASE_URL = 'http://localhost:8080/api';

/**
 * SystemLogsSection Component
 * Provides real-time view and management of system log files.
 */
const SystemLogsSection = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [autoRefresh, setAutoRefresh] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterLevel, setFilterLevel] = useState('ALL');
    const [clearing, setClearing] = useState(false);

    // Modal State for confirmations
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'warning',
        onConfirm: () => { }
    });

    const showModal = (config) => {
        setModalConfig({ ...config, isOpen: true });
    };

    const closeModal = () => {
        setModalConfig(prev => ({ ...prev, isOpen: false }));
    };

    /**
     * Fetches recent log lines from the backend.
     */
    const fetchLogs = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/admin/logs?lines=200`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setLogs(response.data);
        } catch (err) {
            console.error('Failed to fetch logs:', err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Truncates the log file or clears specific levels.
     */
    const clearLogs = () => {
        const isLevelClear = filterLevel !== 'ALL';
        showModal({
            title: isLevelClear ? `Clear ${filterLevel} Logs?` : 'Clear All System Logs?',
            message: isLevelClear
                ? `This will permanently remove all ${filterLevel} entries from the log file. This action cannot be undone.`
                : 'This will permanently truncate the sap-app.log file. This action cannot be undone.',
            type: 'danger',
            confirmText: 'Clear Now',
            onConfirm: async () => {
                setClearing(true);
                try {
                    const token = localStorage.getItem('token');
                    await axios.delete(`${API_BASE_URL}/admin/logs`, {
                        params: { level: isLevelClear ? filterLevel : undefined },
                        headers: { 'Authorization': `Bearer ${token}` }
                    });

                    if (!isLevelClear) {
                        setLogs([]);
                    } else {
                        fetchLogs();
                    }

                    showModal({
                        title: 'Logs Cleared',
                        message: isLevelClear
                            ? `${filterLevel} log entries have been successfully removed.`
                            : 'The system log file has been successfully truncated.',
                        type: 'success',
                        confirmText: 'Dismiss',
                        onConfirm: () => { }
                    });
                } catch (err) {
                    console.error('Failed to clear logs:', err);
                    showModal({
                        title: 'Action Failed',
                        message: 'System was unable to clear the log entries. Please check server permissions.',
                        type: 'danger',
                        confirmText: 'Retry',
                        onConfirm: clearLogs
                    });
                } finally {
                    setClearing(false);
                }
            }
        });
    };

    // Client-side filtering of logs
    const filteredLogs = logs.filter(log => {
        const matchesQuery = log.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLevel = filterLevel === 'ALL' || log.includes(filterLevel);
        return matchesQuery && matchesLevel;
    });

    // Handle initial fetch and polling for auto-refresh
    useEffect(() => {
        fetchLogs();
        let interval;
        if (autoRefresh) {
            interval = setInterval(fetchLogs, 5000);
        }
        return () => clearInterval(interval);
    }, [autoRefresh]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">System Logs</h2>
                    <p className="text-sm text-slate-500 font-medium mt-1">Real-time infrastructure heartbeat monitoring.</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    {/* Log Search */}
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search in logs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-xs font-bold w-full sm:w-64 focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>

                    {/* Level Filter */}
                    <select
                        value={filterLevel}
                        onChange={(e) => setFilterLevel(e.target.value)}
                        className="px-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all uppercase"
                    >
                        <option value="ALL">All Levels</option>
                        <option value="ERROR">Error</option>
                        <option value="WARN">Warn</option>
                        <option value="INFO">Info</option>
                        <option value="DEBUG">Debug</option>
                        <option value="TRACE">Trace</option>
                    </select>

                    <button
                        onClick={clearLogs}
                        disabled={clearing || loading}
                        className="px-4 py-2 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 rounded-lg text-xs font-bold hover:bg-rose-100 transition-all flex items-center gap-2"
                    >
                        {clearing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                        {filterLevel !== 'ALL' ? `Clear ${filterLevel}` : 'Clear Logs'}
                    </button>

                    <label className="flex items-center gap-2 cursor-pointer bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg">
                        <input
                            type="checkbox"
                            checked={autoRefresh}
                            onChange={(e) => setAutoRefresh(e.target.checked)}
                            className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                        />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Live</span>
                    </label>

                    <button
                        onClick={fetchLogs}
                        disabled={loading}
                        className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
                    >
                        {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Clock className="w-3 h-3" />}
                        Refresh
                    </button>
                </div>
            </div>

            {/* Terminal/Log Viewer Container */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 shadow-2xl overflow-hidden font-mono text-[11px] h-[600px] flex flex-col">
                <div className="p-3 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/30"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/30"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/30"></div>
                    </div>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">sap-app.log • root@itecosystem-backend</span>
                </div>
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-1">
                    {filteredLogs.length > 0 ? filteredLogs.map((log, idx) => {
                        const isError = log.includes('ERROR');
                        const isWarn = log.includes('WARN');
                        const isInfo = log.includes('INFO');
                        const isDebug = log.includes('DEBUG');
                        const isTrace = log.includes('TRACE');

                        let textColor = 'text-slate-400';
                        if (isError) textColor = 'text-rose-400 font-bold';
                        else if (isWarn) textColor = 'text-amber-400 font-bold';
                        else if (isInfo) textColor = 'text-emerald-400';
                        else if (isDebug) textColor = 'text-sky-400';
                        else if (isTrace) textColor = 'text-slate-500';

                        return (
                            <p key={idx} className={`leading-relaxed break-all ${textColor}`}>
                                <span className="text-slate-600 mr-2">[{idx + 1}]</span>
                                {log}
                            </p>
                        );
                    }) : (
                        <div className="h-full flex flex-col items-center justify-center opacity-20">
                            <Clock className="w-12 h-12 mb-4 animate-pulse" />
                            <p className="font-bold uppercase tracking-widest">Establishing secure log stream...</p>
                        </div>
                    )}
                </div>
            </div>

            {/* In-section Confirmation Modal */}
            <ConfirmationModal
                isOpen={modalConfig.isOpen}
                onClose={closeModal}
                onConfirm={modalConfig.onConfirm}
                title={modalConfig.title}
                message={modalConfig.message}
                type={modalConfig.type}
                confirmText={modalConfig.confirmText}
            />
        </div>
    );
};

export default SystemLogsSection;
