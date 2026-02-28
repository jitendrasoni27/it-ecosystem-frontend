import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, X, Upload, Youtube, FileText, Info, Package, AlignLeft, Tag, Hash, IndianRupee, Layers } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConfirmationModal from '../../components/modals/ConfirmationModal';

const AdminAddProduct = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    React.useEffect(() => {
        if (!token || userRole !== 'admin') {
            navigate('/login?role=admin');
        }
    }, [token, userRole, navigate]);

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState({});
    const [product, setProduct] = useState({
        name: '',
        description: '',
        category: '',
        subCategory: '',
        licenseNumber: '',
        basePrice: '',
        images: [''],
        userManualUrl: '',
        version: '',
        youtubeLink: '',
        isActive: true,
    });

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

    const categories = ['Tally Services', 'Web Dev', 'Mobile App', 'Marketing', 'Cloud', 'Cyber Security'];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileUpload = async (file, type, index = null) => {
        if (!file) return;
        const key = type === 'image' ? `image-${index}` : 'manual';
        setUploading(prev => ({ ...prev, [key]: true }));

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('http://localhost:8080/api/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });

            if (type === 'image' && index !== null) {
                handleImageChange(index, res.data.fileUrl);
            } else if (type === 'manual') {
                setProduct(prev => ({ ...prev, userManualUrl: res.data.fileUrl }));
            }
        } catch (error) {
            console.error('Upload failed:', error);
            showModal({
                title: 'Upload Failed',
                message: 'System was unable to process the file upload. Please try again.',
                type: 'danger',
                confirmText: 'Dismiss'
            });
        } finally {
            setUploading(prev => ({ ...prev, [key]: false }));
        }
    };

    const handleImageChange = (index, value) => {
        const newImages = [...product.images];
        newImages[index] = value;
        setProduct(prev => ({ ...prev, images: newImages }));
    };

    const addImageField = () => {
        setProduct(prev => ({ ...prev, images: [...prev.images, ''] }));
    };

    const removeImageField = (index) => {
        if (product.images.length > 1) {
            const newImages = product.images.filter((_, i) => i !== index);
            setProduct(prev => ({ ...prev, images: newImages }));
        }
    };

    const [dragActive, setDragActive] = useState({});

    const handleDrag = (e, key) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(prev => ({ ...prev, [key]: true }));
        } else if (e.type === "dragleave") {
            setDragActive(prev => ({ ...prev, [key]: false }));
        }
    };

    const handleDrop = (e, type, index = null) => {
        e.preventDefault();
        e.stopPropagation();
        const key = type === 'image' ? `image-${index}` : 'manual';
        setDragActive(prev => ({ ...prev, [key]: false }));

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files[0], type, index);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const finalProduct = {
                ...product,
                basePrice: parseFloat(product.basePrice) || 0,
                images: product.images.filter(img => img && img.trim() !== '')
            };

            await axios.post('http://localhost:8080/api/products', finalProduct, {
                headers: { Authorization: `Bearer ${token}` }
            });

            showModal({
                title: 'Success!',
                message: 'Product has been successfully added to the system catalog.',
                type: 'success',
                confirmText: 'View Inventory',
                onConfirm: () => navigate('/admin/services')
            });
        } catch (error) {
            console.error('Error adding product:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred';
            showModal({
                title: 'Save Failed',
                message: `Unable to save product: ${errorMessage}`,
                type: 'danger',
                confirmText: 'Retry'
            });
        } finally {
            setLoading(false);
        }
    };

    const DropZone = ({ type, index = null, accept, label }) => {
        const key = type === 'image' ? `image-${index}` : 'manual';
        return (
            <div
                className={`relative border-2 border-dashed rounded-lg p-4 transition-all duration-200 flex flex-col items-center justify-center text-center ${dragActive[key]
                    ? 'border-primary bg-primary/5 scale-[1.01]'
                    : 'border-slate-200 dark:border-slate-700 hover:border-primary/50 bg-slate-50/30'
                    }`}
                onDragEnter={(e) => handleDrag(e, key)}
                onDragOver={(e) => handleDrag(e, key)}
                onDragLeave={(e) => handleDrag(e, key)}
                onDrop={(e) => handleDrop(e, type, index)}
            >
                <input
                    type="file"
                    accept={accept}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => handleFileUpload(e.target.files[0], type, index)}
                />

                {uploading[key] ? (
                    <div className="flex flex-col items-center py-2">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
                        <p className="text-xs text-primary font-medium animate-pulse">Uploading...</p>
                    </div>
                ) : (
                    <>
                        <Upload className={`w-8 h-8 mb-2 ${dragActive[key] ? 'text-primary' : 'text-gray-400'}`} />
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
                        <p className="text-xs text-gray-500 mt-1">or drag and drop files here</p>
                    </>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background dark:bg-slate-950 py-12 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                        <Link to="/admin/services" className="mr-4 p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Add New Product</h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Configure the technical and fiscal profile.</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="card-material px-8 py-7">
                        <div className="flex items-center mb-8 space-x-3 text-primary">
                            <Info className="w-5 h-5" />
                            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Basic Information</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-slate-500 mb-1.5 ml-1">Product Title</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Package className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={product.name}
                                        onChange={handleChange}
                                        className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        placeholder="e.g., Tally Prime Gold Subscription"
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-slate-500 mb-1.5 ml-1">Description</label>
                                <div className="relative group">
                                    <div className="absolute top-3 left-0 pl-4 flex items-start pointer-events-none">
                                        <AlignLeft className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <textarea
                                        name="description"
                                        required
                                        rows="4"
                                        value={product.description}
                                        onChange={handleChange}
                                        className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        placeholder="Enter detailed product description..."
                                    ></textarea>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-500 mb-1.5 ml-1">Category</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Tag className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <select
                                        name="category"
                                        required
                                        value={product.category}
                                        onChange={handleChange}
                                        className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-500 mb-1.5 ml-1">Sub-category</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Tag className="h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        name="subCategory"
                                        value={product.subCategory}
                                        onChange={handleChange}
                                        className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        placeholder="e.g., Add-on, Annual Renewal"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-500 mb-1.5 ml-1">License Number</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Hash className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        name="licenseNumber"
                                        value={product.licenseNumber}
                                        onChange={handleChange}
                                        className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
                                        placeholder="e.g., LIC-123456"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-500 mb-1.5 ml-1">Base Price (₹)</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <IndianRupee className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        type="number"
                                        name="basePrice"
                                        required
                                        value={product.basePrice}
                                        onChange={handleChange}
                                        className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-500 mb-1.5 ml-1">Version</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Layers className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        name="version"
                                        value={product.version}
                                        onChange={handleChange}
                                        className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        placeholder="e.g., v4.1"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-material px-8 py-7">
                        <div className="flex items-center mb-8 space-x-3 text-primary">
                            <Upload className="w-5 h-5" />
                            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Product Media</h2>
                        </div>

                        <div className="space-y-6">
                            <label className="block text-sm font-bold text-slate-500 mb-1.5 ml-1">Product Images</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {product.images.map((url, index) => (
                                    <div key={index} className="space-y-3 p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-900/50 relative group">
                                        {product.images.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeImageField(index)}
                                                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}

                                        <DropZone
                                            type="image"
                                            index={index}
                                            accept="image/*"
                                            label="Browse Image"
                                        />

                                        <input
                                            type="text"
                                            value={url}
                                            onChange={(e) => handleImageChange(index, e.target.value)}
                                            className="w-full px-3 py-1.5 text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all dark:text-white"
                                            placeholder="or paste URL"
                                        />

                                        {url && (
                                            <div className="relative w-full h-24 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center">
                                                <img
                                                    src={url}
                                                    alt={`Preview ${index}`}
                                                    className="max-w-full max-h-full object-contain p-1"
                                                    onError={(e) => {
                                                        e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop';
                                                        e.target.onerror = null;
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={addImageField}
                                    className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-4 flex flex-col items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all duration-200 bg-slate-50/30 dark:bg-slate-900/30 group"
                                >
                                    <Plus className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-bold">Add Another Image</span>
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 p-6 bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-slate-500 mb-2 flex items-center ml-1">
                                    <FileText className="w-4 h-4 mr-2 text-primary" /> User Manual (PDF)
                                </label>

                                <DropZone
                                    type="manual"
                                    accept=".pdf"
                                    label="Browse User Manual"
                                />

                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FileText className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        name="userManualUrl"
                                        value={product.userManualUrl}
                                        onChange={handleChange}
                                        className="block w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        placeholder="or paste PDF URL"
                                    />
                                </div>

                                {product.userManualUrl && (
                                    <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-lg text-xs text-emerald-700 dark:text-emerald-400 flex items-center">
                                        <CheckCircle2 className="w-4 h-4 mr-2" />
                                        <div className="flex-1 truncate">Manual Linked: {product.userManualUrl.split('/').pop()}</div>
                                        <a href={product.userManualUrl} target="_blank" rel="noopener noreferrer" className="ml-2 font-bold hover:underline">View</a>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-slate-500 mb-2 flex items-center ml-1">
                                    <Youtube className="w-4 h-4 mr-2 text-red-500" /> YouTube Video Link
                                </label>
                                <div className="relative group">
                                    <div className="absolute top-3 left-0 pl-4 flex items-start pointer-events-none">
                                        <LinkIcon className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        name="youtubeLink"
                                        value={product.youtubeLink}
                                        onChange={handleChange}
                                        className="block w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-[116px]"
                                        placeholder="https://youtube.com/watch?v=..."
                                    />
                                </div>
                                <p className="text-xs text-slate-500 font-medium ml-1">Links will be automatically embedded in product details.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between card-material px-8 py-7">
                        <div className="flex items-center mb-4 sm:mb-0">
                            <input
                                type="checkbox"
                                name="isActive"
                                id="isActive"
                                checked={product.isActive}
                                onChange={handleChange}
                                className="w-5 h-5 text-primary rounded-lg border-slate-300 focus:ring-primary/20 transition-all cursor-pointer"
                            />
                            <label htmlFor="isActive" className="ml-3 text-sm text-slate-700 dark:text-slate-300 font-bold cursor-pointer">Default to Active (Publish immediately)</label>
                        </div>
                        <div className="flex space-x-4 w-full sm:w-auto">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/services')}
                                className="flex-1 sm:flex-none px-8 py-3 text-slate-500 font-bold hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all border border-transparent"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading || Object.values(uploading).some(Boolean)}
                                className="flex-1 sm:flex-none px-10 py-3 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg shadow-xl shadow-primary/20 flex items-center justify-center transition-all disabled:opacity-50 active:scale-95"
                            >
                                <Save className="w-4 h-4 mr-2.5" />
                                {loading ? 'Saving...' : 'Save Product'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

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

export default AdminAddProduct;
