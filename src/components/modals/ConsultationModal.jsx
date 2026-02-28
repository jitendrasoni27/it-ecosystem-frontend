import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, CheckCircle, AlertCircle, FileText, Send } from 'lucide-react';
import ConfirmationModal from './ConfirmationModal';

const ConsultationModal = ({ isOpen, onClose, initialCategory = '' }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        mobile: '',
        email: '',
        requirementCategory: initialCategory,
        requirementTitle: '',
        requirementDescription: '',
        document: null
    });

    // Update category when initialCategory changes (e.g. clicking different triggers)
    React.useEffect(() => {
        if (isOpen) {
            setFormData(prev => ({
                ...prev,
                requirementCategory: initialCategory || prev.requirementCategory
            }));
        }
    }, [isOpen, initialCategory]);

    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [fileName, setFileName] = useState('');

    // Modal State
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info',
        onConfirm: () => { }
    });

    const showModal = (config) => {
        setModalConfig({ ...config, isOpen: true });
    };

    const closeModal = () => {
        setModalConfig(prev => ({ ...prev, isOpen: false }));
    };

    const categories = [
        "Web App Development",
        "Mobile App Development",
        "Tally Integration",
        "Tally Support",
        "Tally Development",
        "Custom Business Solution",
        "Other"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                setFormData(prev => ({ ...prev, document: file }));
                setFileName(file.name);
                setFormData(prev => ({ ...prev, document: file }));
                setFileName(file.name);
            } else {
                showModal({
                    title: 'Invalid File Type',
                    message: 'Please upload only PDF or DOC files to continue.',
                    type: 'warning',
                    confirmText: 'Got it'
                });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        // Mocking API call
        setTimeout(() => {
            console.log('Form Submitted:', formData);
            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setFormData({
                    fullName: '',
                    mobile: '',
                    email: '',
                    requirementCategory: '',
                    requirementTitle: '',
                    requirementDescription: '',
                    document: null
                });
                setFileName('');
            }, 3000);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors z-10"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {status === 'success' ? (
                            <div className="p-12 text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                                >
                                    <CheckCircle className="w-10 h-10" />
                                </motion.div>
                                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Request Sent!</h2>
                                <p className="text-slate-500 dark:text-slate-400">Our consultants will review your requirements and reach out within 24 hours.</p>
                            </div>
                        ) : (
                            <div className="p-8 md:p-12 max-h-[90vh] overflow-y-auto">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Request Consultation</h2>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-500 pl-1 uppercase tracking-wider">Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-bold"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-500 pl-1 uppercase tracking-wider">Mobile Number</label>
                                            <input
                                                required
                                                type="tel"
                                                name="mobile"
                                                value={formData.mobile}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-bold"
                                                placeholder="+91 XXXXX XXXXX"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-slate-500 pl-1 uppercase tracking-wider">Email ID</label>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-bold"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-500 pl-1 uppercase tracking-wider">Requirement Category</label>
                                            <select
                                                required
                                                name="requirementCategory"
                                                value={formData.requirementCategory}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none text-sm font-bold"
                                            >
                                                <option value="" disabled>Select category</option>
                                                {categories.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-500 pl-1 uppercase tracking-wider">Requirement Title</label>
                                            <input
                                                required
                                                type="text"
                                                name="requirementTitle"
                                                value={formData.requirementTitle}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-bold"
                                                placeholder="e.g. Sales App Integration"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-slate-500 pl-1 uppercase tracking-wider">Description</label>
                                        <textarea
                                            required
                                            name="requirementDescription"
                                            value={formData.requirementDescription}
                                            onChange={handleChange}
                                            rows="3"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none text-sm font-bold"
                                            placeholder="Tell us about your requirements..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Supporting Document (Optional)</label>
                                        <div className="relative group/file">
                                            <input
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                onChange={handleFileChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            <div className={`w-full px-4 py-4 rounded-xl border-2 border-dashed transition-all flex items-center justify-between ${fileName
                                                ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-500'
                                                }`}>
                                                <div className="flex items-center">
                                                    {fileName ? <FileText className="w-5 h-5 mr-3" /> : <Upload className="w-5 h-5 mr-3" />}
                                                    <span className="text-sm font-medium">{fileName || 'Upload PDF or DOC (Max 5MB)'}</span>
                                                </div>
                                                {fileName && <CheckCircle className="w-5 h-5" />}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        disabled={status === 'submitting'}
                                        type="submit"
                                        className="w-full py-4 bg-primary text-white rounded-2xl font-extrabold text-lg flex items-center justify-center transition-all hover:bg-blue-700 disabled:opacity-50 shadow-xl shadow-primary/20"
                                    >
                                        {status === 'submitting' ? (
                                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Submit Request <Send className="ml-3 w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}

            <ConfirmationModal
                isOpen={modalConfig.isOpen}
                onClose={closeModal}
                onConfirm={modalConfig.onConfirm}
                title={modalConfig.title}
                message={modalConfig.message}
                type={modalConfig.type}
                confirmText={modalConfig.confirmText}
            />
        </AnimatePresence>
    );
};

export default ConsultationModal;
