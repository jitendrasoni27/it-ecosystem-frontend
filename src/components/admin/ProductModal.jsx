import React, { useState, useEffect } from 'react';
import {
    X,
    Upload,
    Plus,
    Trash2,
    FileText,
    Image as ImageIcon,
    Youtube,
    Save,
    Link as LinkIcon,
    AlertCircle,
    CheckCircle2,
    Calendar,
    Settings2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';


const ProductModal = ({ isOpen, onClose, onSave, initialData = null }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'Tally Addons',
        subCategory: '',
        basePrice: 0,
        images: [],
        tags: [],
        userManualUrl: '',
        versions: [], // [{ version: '', releaseDate: '', changeLog: '', fileUrl: '' }]
        youtubeLink: '',
        isActive: true
    });

    const [newTag, setNewTag] = useState('');
    const [uploading, setUploading] = useState({ type: null, progress: 0 });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                versions: initialData.versions || []
            });
        } else {
            setFormData({
                name: '',
                description: '',
                category: 'Tally Addons',
                subCategory: '',
                basePrice: 0,
                images: [],
                tags: [],
                userManualUrl: '',
                versions: [{ version: '', releaseDate: new Date().toISOString().split('T')[0], changeLog: '', fileUrl: '' }],
                youtubeLink: '',
                isActive: true
            });
        }
    }, [initialData, isOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleVersionChange = (index, field, value) => {
        setFormData(prev => {
            const newVersions = [...prev.versions];
            newVersions[index] = { ...newVersions[index], [field]: value };
            return { ...prev, versions: newVersions };
        });
    };

    const addVersion = () => {
        setFormData(prev => ({
            ...prev,
            versions: [
                { version: '', releaseDate: new Date().toISOString().split('T')[0], changeLog: '', fileUrl: '' },
                ...prev.versions
            ]
        }));
    };

    const removeVersion = (index) => {
        setFormData(prev => ({
            ...prev,
            versions: prev.versions.filter((_, i) => i !== index)
        }));
    };

    const handleFileUpload = async (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadFormData = new FormData();
        uploadFormData.append('file', file);

        setUploading({ type, progress: 0 });
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_BASE_URL}/files/upload`, uploadFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploading({ type, progress: percentCompleted });
                }
            });

            const { fileUrl } = response.data;

            if (type === 'images') {
                setFormData(prev => ({ ...prev, images: [...prev.images, fileUrl] }));
            } else if (type === 'manual') {
                setFormData(prev => ({ ...prev, userManualUrl: fileUrl }));
            } else if (type.startsWith('version-')) {
                const index = parseInt(type.split('-')[1]);
                handleVersionChange(index, 'fileUrl', fileUrl);
            }

            setUploading({ type: null, progress: 0 });
        } catch (err) {
            console.error('Upload failed:', err);
            setError(`Failed to upload ${type}. Please try again.`);
            setUploading({ type: null, progress: 0 });
        }
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const addTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative w-full max-w-5xl max-h-[96vh] bg-white dark:bg-slate-900 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800"
            >
                {/* Header */}
                <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-950/20">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                        {initialData ? 'Update Product' : 'Register Product'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 rounded-lg transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <form id="product-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {/* Left Column: Basic Info */}
                        <div className="space-y-4">
                            <section className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-wider">
                                    <FileText className="w-3.5 h-3.5 text-primary" /> Core Manifest
                                </h3>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-500 pl-1">Product Title</label>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="e.g. GST Auto-Reconciliation Tool"
                                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-primary/40 rounded-lg text-sm font-bold transition-all outline-none"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-500 pl-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                        rows={3}
                                        placeholder="Detailed technical specifications..."
                                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-primary/40 rounded-lg text-sm font-bold transition-all outline-none resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-slate-500 pl-1">Category</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-primary/40 rounded-lg text-xs font-black transition-all outline-none appearance-none"
                                        >
                                            <option>Tally Addons</option>
                                            <option>Custom Solutions</option>
                                            <option>Services</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-slate-500 pl-1">Base Price (₹)</label>
                                        <input
                                            type="number"
                                            name="basePrice"
                                            value={formData.basePrice}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-primary/40 rounded-lg text-sm font-black transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-500 pl-1">Search Tags</label>
                                    <div className="flex gap-2">
                                        <input
                                            value={newTag}
                                            onChange={(e) => setNewTag(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                            placeholder="Add tag..."
                                            className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-primary/40 rounded-lg text-xs font-bold transition-all outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={addTag}
                                            className="p-2 bg-primary text-white rounded-lg shadow-lg hover:scale-105 active:scale-95 transition-all"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {formData.tags.map(tag => (
                                            <span key={tag} className="flex items-center gap-2 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 rounded-md border border-slate-200 dark:border-slate-700 group transition-all">
                                                {tag}
                                                <X
                                                    onClick={() => removeTag(tag)}
                                                    className="w-3 h-3 cursor-pointer text-slate-400 hover:text-rose-500 transition-colors"
                                                />
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-wider">
                                    <Youtube className="w-3.5 h-3.5 text-rose-500" /> Media Assets
                                </h3>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-500 pl-1">YouTube Link</label>
                                    <div className="relative">
                                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                        <input
                                            name="youtubeLink"
                                            value={formData.youtubeLink}
                                            onChange={handleInputChange}
                                            placeholder="https://youtube.com/watch?v=..."
                                            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-primary/40 rounded-lg text-xs font-medium transition-all outline-none"
                                        />
                                    </div>
                                    {formData.youtubeLink && (
                                        <div className="mt-4 aspect-video rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-black shadow-inner">
                                            <iframe
                                                title="Preview"
                                                src={`https://www.youtube.com/embed/${formData.youtubeLink.split('v=')[1]?.split('&')[0] || formData.youtubeLink.split('/').pop()}`}
                                                className="w-full h-full"
                                                frameBorder="0"
                                                allowFullScreen
                                            />
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>

                        {/* Right Column: Uploads & Versions */}
                        <div className="space-y-4">
                            <section className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-wider">
                                        <Upload className="w-3.5 h-3.5 text-emerald-500" /> Compiled Versions
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={addVersion}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg text-[10px] font-bold hover:bg-emerald-500 hover:text-white transition-all"
                                    >
                                        <Plus className="w-3 h-3" /> Add Version
                                    </button>
                                </div>

                                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                    {formData.versions.map((ver, idx) => (
                                        <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 relative group transition-all hover:border-primary/30">
                                            <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    type="button"
                                                    onClick={() => removeVersion(idx)}
                                                    className="w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3 mb-3">
                                                <div className="space-y-1">
                                                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">Build Version</label>
                                                    <input
                                                        value={ver.version}
                                                        onChange={(e) => handleVersionChange(idx, 'version', e.target.value)}
                                                        placeholder="e.g. v2.4.0"
                                                        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold outline-none focus:border-primary/40 transition-all"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">Release Date</label>
                                                    <input
                                                        type="date"
                                                        value={ver.releaseDate}
                                                        onChange={(e) => handleVersionChange(idx, 'releaseDate', e.target.value)}
                                                        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold outline-none focus:border-primary/40 transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1 mb-3">
                                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">Patch Notes / Change Log</label>
                                                <textarea
                                                    value={ver.changeLog}
                                                    onChange={(e) => handleVersionChange(idx, 'changeLog', e.target.value)}
                                                    rows={2}
                                                    placeholder="Describe key changes..."
                                                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold outline-none focus:border-primary/40 transition-all resize-none"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-tighter block">Compiled Binary (TCP/ZIP)</label>
                                                <div className="flex items-center gap-3">
                                                    <label className="flex-1 cursor-pointer">
                                                        <input
                                                            type="file"
                                                            onChange={(e) => handleFileUpload(e, `version-${idx}`)}
                                                            className="hidden"
                                                        />
                                                        <div className={`flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-lg border border-dashed text-[10px] font-black transition-all ${ver.fileUrl ? 'border-emerald-500/50 text-emerald-600 bg-emerald-50/10' : 'border-slate-300 dark:border-slate-700 text-slate-400 hover:border-primary hover:text-primary'}`}>
                                                            {uploading.type === `version-${idx}` ? (
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-2.5 h-2.5 border-2 border-primary border-t-transparent animate-spin rounded-full" />
                                                                    {uploading.progress}%
                                                                </div>
                                                            ) : ver.fileUrl ? (
                                                                <>
                                                                    <CheckCircle2 className="w-3.5 h-3.5" /> File Secured
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Upload className="w-3.5 h-3.5" /> Upload Compilation
                                                                </>
                                                            )}
                                                        </div>
                                                    </label>
                                                    {ver.fileUrl && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleVersionChange(idx, 'fileUrl', '')}
                                                            className="p-2 bg-rose-500/10 text-rose-500 rounded-lg hover:bg-rose-500 hover:text-white transition-all"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {formData.versions.length === 0 && (
                                        <div className="text-center py-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                                            <p className="text-[10px] font-bold text-slate-400">No versions compiled yet.</p>
                                        </div>
                                    )}
                                </div>

                                {/* Manual PDF */}
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-500 pl-1">User Manual (PDF)</label>
                                    <div className="flex gap-4">
                                        <label className="flex-1 cursor-pointer">
                                            <input type="file" accept=".pdf" onChange={(e) => handleFileUpload(e, 'manual')} className="hidden" />
                                            <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-[10px] font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all group">
                                                {uploading.type === 'manual' ? (
                                                    <div className="flex items-center gap-2 text-primary">
                                                        <div className="w-3.5 h-3.5 border-2 border-primary border-t-transparent animate-spin rounded-full" />
                                                        Archiving... {uploading.progress}%
                                                    </div>
                                                ) : formData.userManualUrl ? (
                                                    <div className="flex items-center gap-2 text-emerald-500">
                                                        <CheckCircle2 className="w-3.5 h-3.5" /> Manual Verified
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-600">
                                                        <FileText className="w-3.5 h-3.5" /> Select Manual PDF
                                                    </div>
                                                )}
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* Thumbnail Images */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-500 pl-1">Product Images</label>
                                    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                                        {formData.images.map((img, idx) => (
                                            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 group">
                                                <img
                                                    src={img}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop';
                                                        e.target.onerror = null;
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(idx)}
                                                    className="absolute inset-0 bg-rose-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 className="w-4 h-4 text-white" />
                                                </button>
                                            </div>
                                        ))}
                                        <label className="aspect-square flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-all group">
                                            <input type="file" multiple accept="image/*" onChange={(e) => handleFileUpload(e, 'images')} className="hidden" />
                                            {uploading.type === 'images' ? (
                                                <div className="text-primary font-bold text-[9px] animate-pulse">{uploading.progress}%</div>
                                            ) : (
                                                <>
                                                    <ImageIcon className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                                                    <span className="text-[9px] font-bold text-slate-400 mt-0.5">Add</span>
                                                </>
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </form>

                {/* Footer Actions */}
                <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start bg-slate-100/50 dark:bg-slate-800/50 p-3 rounded-xl sm:bg-transparent sm:p-0">
                        <div className="flex items-center gap-3">
                            <div className={`w-2.5 h-2.5 rounded-full ${formData.isActive ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`} />
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                                    className="w-4 h-4 rounded-md border-slate-300 text-primary focus:ring-primary/20 accent-primary"
                                />
                                <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                                    Active Status
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <button
                            type="button"
                            onClick={onClose}
                            className="order-2 sm:order-1 px-6 py-3 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800"
                        >
                            Cancel
                        </button>
                        <button
                            form="product-form"
                            type="submit"
                            className="order-1 sm:order-2 flex items-center justify-center gap-2.5 px-8 py-3 bg-primary text-white text-xs font-black rounded-xl shadow-xl hover:shadow-primary/40 active:scale-95 transition-all"
                        >
                            <Save className="w-4 h-4" /> {initialData ? 'Save Changes' : 'Register Product'}
                        </button>
                    </div>
                </div>

                {/* Error Pulse */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            exit={{ y: 100 }}
                            className="absolute bottom-0 inset-x-0 p-4 bg-rose-600 text-white flex items-center justify-between z-50 shadow-2xl"
                        >
                            <div className="flex items-center gap-3">
                                <AlertCircle className="w-5 h-5" />
                                <span className="text-sm font-bold">{error}</span>
                            </div>
                            <button onClick={() => setError(null)} className="p-2 hover:bg-white/10 rounded-lg">
                                <X className="w-4 h-4" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ProductModal;
