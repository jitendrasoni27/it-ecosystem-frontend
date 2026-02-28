import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, HelpCircle, CheckCircle, Info } from 'lucide-react';

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'warning' // info, warning, danger, success
}) => {

    const getIcon = () => {
        switch (type) {
            case 'danger': return <AlertCircle className="w-10 h-10 text-rose-500" />;
            case 'warning': return <HelpCircle className="w-10 h-10 text-amber-500" />;
            case 'success': return <CheckCircle className="w-10 h-10 text-emerald-500" />;
            case 'info': return <Info className="w-10 h-10 text-sky-500" />;
            default: return <HelpCircle className="w-10 h-10 text-primary" />;
        }
    };

    const getColors = () => {
        switch (type) {
            case 'danger': return {
                bg: 'bg-rose-500',
                hover: 'hover:bg-rose-600',
                shadow: 'shadow-rose-500/20',
                light: 'bg-rose-50 dark:bg-rose-500/10'
            };
            case 'warning': return {
                bg: 'bg-amber-500',
                hover: 'hover:bg-amber-600',
                shadow: 'shadow-amber-500/20',
                light: 'bg-amber-50 dark:bg-amber-500/10'
            };
            case 'success': return {
                bg: 'bg-emerald-500',
                hover: 'hover:bg-emerald-600',
                shadow: 'shadow-emerald-500/20',
                light: 'bg-emerald-50 dark:bg-emerald-500/10'
            };
            case 'info': return {
                bg: 'bg-sky-500',
                hover: 'hover:bg-sky-600',
                shadow: 'shadow-sky-500/20',
                light: 'bg-sky-50 dark:bg-sky-500/10'
            };
            default: return {
                bg: 'bg-primary',
                hover: 'hover:bg-blue-700',
                shadow: 'shadow-primary/20',
                light: 'bg-blue-50 dark:bg-primary/10'
            };
        }
    };

    const colors = getColors();

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
                />

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-800 p-6 text-center overflow-hidden"
                >
                    {/* Decorative Background Elements */}
                    <div className={`absolute -top-16 -right-16 w-32 h-32 ${colors.bg} opacity-10 rounded-full blur-3xl`} />
                    <div className={`absolute -bottom-16 -left-16 w-32 h-32 ${colors.bg} opacity-10 rounded-full blur-3xl`} />

                    <div className={`w-14 h-14 ${colors.light} rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10`}>
                        {React.cloneElement(getIcon(), { className: 'w-7 h-7' })}
                    </div>

                    <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 tracking-tight relative z-10">
                        {title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-6 leading-relaxed relative z-10 px-4">
                        {message}
                    </p>

                    <div className="flex gap-3 relative z-10">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-xs font-bold transition-all hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className={`flex-1 py-3 ${colors.bg} text-white rounded-xl text-xs font-black transition-all ${colors.hover} shadow-lg ${colors.shadow} active:scale-95`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ConfirmationModal;
