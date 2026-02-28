import React from 'react';
import {
    Package,
    Search,
    Filter,
    Loader2,
    Edit,
    Trash2,
    Calendar
} from 'lucide-react';
import { motion as Motion } from 'framer-motion';

/**
 * ProductsListSection Component
 * Displays a searchable and filterable table of products.
 * 
 * @param {Array} products - List of products to display
 * @param {boolean} loading - Loading state for product list
 * @param {Function} onEdit - Callback for editing a product
 * @param {Function} onDelete - Callback for deleting a product
 * @param {Function} onAdd - Callback for adding a new product
 * @param {string} searchQuery - Current search input value
 * @param {Function} setSearchQuery - Function to update search query
 * @param {Function} onSearch - Callback to execute the search
 * @param {string} categoryFilter - Current category filter value
 * @param {Function} setCategoryFilter - Function to update category filter
 * @param {string} statusFilter - Current status filter value
 * @param {Function} setStatusFilter - Function to update status filter
 * @param {Function} onResetFilters - Callback to reset all filters
 */
const ProductsListSection = ({
    products,
    loading,
    onEdit,
    onDelete,
    onAdd,
    searchQuery,
    setSearchQuery,
    onSearch,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    onResetFilters
}) => (
    <div className="space-y-6">
        {/* Header and Add Action */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Product List ({products.length})</h2>
                <p className="text-sm text-slate-500 font-medium">Manage your product list.</p>
            </div>
            <button
                onClick={onAdd}
                className="w-full sm:w-auto px-6 py-3 bg-primary text-white text-sm font-bold rounded-lg shadow-xl shadow-primary/10 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
                <Package className="w-5 h-5" /> Add New Product
            </button>
        </div>

        {/* Filter Controls */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
            <div className="flex flex-col xl:flex-row p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && onSearch()}
                        placeholder="Query inventory database..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                    />
                </div>
                <div className="flex flex-wrap gap-3">
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                        <option value="All">All Categories</option>
                        <option value="Tally Addons">Tally Addons</option>
                        <option value="Custom Solutions">Custom Solutions</option>
                        <option value="Services">Services</option>
                    </select>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active Only</option>
                        <option value="Inactive">Inactive Only</option>
                    </select>

                    <button
                        onClick={onSearch}
                        className="px-8 py-2.5 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary-dark transition-all border border-transparent"
                    >
                        Search
                    </button>
                    <button
                        onClick={onResetFilters}
                        className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all font-bold"
                    >
                        <Filter className="w-4 h-4" /> Reset Filters
                    </button>
                </div>
            </div>

            {/* Content Display */}
            <div className="flex-1 overflow-auto max-h-[550px] custom-scrollbar">
                {loading ? (
                    <div className="flex flex-col items-center justify-center p-20 text-center">
                        <Loader2 className="w-10 h-10 text-primary animate-spin mb-3" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Synchronizing Registry</h3>
                        <p className="text-xs text-slate-500 font-medium mt-1">Fetching secure product data...</p>
                    </div>
                ) : products.length > 0 ? (
                    <>
                        {/* Desktop Table View */}
                        <table className="w-full border-collapse hidden sm:table">
                            <thead className="sticky top-0 z-10 bg-white dark:bg-slate-900">
                                <tr className="bg-slate-50/50 dark:bg-slate-950/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800">
                                    <th className="px-6 py-4 text-left">Product Title</th>
                                    <th className="px-6 py-4 text-left">Version Details</th>
                                    <th className="px-6 py-4 text-left">Addon File</th>
                                    <th className="px-6 py-4 text-left">Price</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                    <th className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {products.map((product) => (
                                    <tr key={product.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-2.5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                                                    <img
                                                        src={(product.images && product.images[0]) || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'}
                                                        alt=""
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop';
                                                            e.target.onerror = null;
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{product.name}</p>
                                                    <div className="flex flex-wrap gap-2 mt-1">
                                                        <span className="text-[9px] text-slate-500 font-mono uppercase bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">ID: SAP-{product.id.toString().padStart(4, '0')}</span>
                                                        <span className="text-[9px] text-primary font-mono uppercase bg-primary/5 px-1.5 py-0.5 rounded">{product.category}</span>
                                                    </div>
                                                    <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium mt-1.5 whitespace-normal leading-relaxed max-w-sm line-clamp-2">
                                                        {product.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-2.5">
                                            <div className="max-w-[250px] space-y-1.5">
                                                <div className="flex items-center gap-2">
                                                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[9px] font-black uppercase tracking-widest border border-primary/20">
                                                        {product.versions && product.versions.length > 0 ? product.versions[0].version : (product.version || 'v1.0.0')}
                                                    </span>
                                                    {(product.versions && product.versions.length > 0 && product.versions[0].releaseDate) && (
                                                        <span className="text-[9px] text-slate-400 font-bold flex items-center gap-1">
                                                            <Calendar className="w-2.5 h-2.5" />
                                                            {new Date(product.versions[0].releaseDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                        </span>
                                                    )}
                                                </div>

                                                {product.versions && product.versions.length > 0 && product.versions[0].changeLog && (
                                                    <div className="flex gap-1.5 items-start">
                                                        <div className="mt-1 w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                                                        <p className="text-[10px] text-slate-500 font-medium leading-normal whitespace-normal italic line-clamp-2">
                                                            {product.versions[0].changeLog}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-2.5">
                                            <div>
                                                <p className="text-xs font-black text-primary uppercase tracking-widest">{product.addonFile}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-2.5 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-slate-600 dark:text-slate-400">₹{product.basePrice?.toLocaleString()}</span>
                                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Base Unit Cost</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-2.5 whitespace-nowrap text-center">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${product.active
                                                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                                : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${product.active ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                                                {product.active ? 'Operational' : 'Restricted'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-2.5 whitespace-nowrap text-center">
                                            <div className="flex justify-center gap-1">
                                                <button
                                                    onClick={() => onEdit(product)}
                                                    className="p-2.5 hover:bg-primary/10 text-slate-400 hover:text-primary rounded-lg transition-all"
                                                    title="Modify Node"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => onDelete(product.id)}
                                                    className="p-2.5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-600 rounded-lg transition-all"
                                                    title="Terminate Node"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Mobile Stacked Card View */}
                        <div className="sm:hidden grid grid-cols-1 divide-y divide-slate-100 dark:divide-slate-800">
                            {products.map((product) => (
                                <div key={product.id} className="p-4 space-y-4">
                                    <div className="flex gap-4">
                                        <div className="w-16 h-16 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                                            <img
                                                src={(product.images && product.images[0]) || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'}
                                                alt=""
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop';
                                                    e.target.onerror = null;
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight truncate">{product.name}</p>
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${product.active
                                                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                                    : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                                                    }`}>
                                                    {product.active ? 'Active' : 'Locked'}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-1.5">
                                                <span className="text-[8px] text-slate-500 font-mono uppercase bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded tracking-tighter">ID: SAP-{product.id.toString().padStart(4, '0')}</span>
                                                <span className="text-[8px] text-primary font-mono uppercase bg-primary/5 px-1.5 py-0.5 rounded tracking-tighter">{product.category}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed line-clamp-2">
                                        {product.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-3 pt-1">
                                        <div className="bg-slate-50 dark:bg-slate-950/40 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Price</p>
                                            <p className="text-sm font-black text-slate-900 dark:text-white">₹{product.basePrice?.toLocaleString()}</p>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-slate-950/40 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Version</p>
                                            <p className="text-sm font-black text-primary">
                                                {product.versions && product.versions.length > 0 ? product.versions[0].version : (product.version || 'v1.0.0')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        <button
                                            onClick={() => onEdit(product)}
                                            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-primary/10 hover:text-primary transition-all"
                                        >
                                            <Edit className="w-4 h-4" /> Edit Record
                                        </button>
                                        <button
                                            onClick={() => onDelete(product.id)}
                                            className="flex items-center justify-center w-12 py-2.5 bg-rose-500/10 text-rose-500 rounded-lg hover:bg-rose-500 hover:text-white transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center opacity-40">
                        <Motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
                            <Package className="w-16 h-16 text-primary mb-4" />
                        </Motion.div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Access Registry Empty</h3>
                        <p className="text-xs text-slate-500 font-medium mt-1.5 max-w-sm">No assets match current diagnostic query filters.</p>
                        <button onClick={onAdd} className="mt-6 px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-dark transition-all">
                            Initialize Entry
                        </button>
                    </div>
                )}
            </div>
        </div >
    </div >
);

export default ProductsListSection;
