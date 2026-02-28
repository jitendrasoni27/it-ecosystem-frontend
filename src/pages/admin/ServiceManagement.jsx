import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceManagement = () => {
    // Mock Data
    const [services, setServices] = useState([
        { id: 1, name: 'Tally Cloud (Single User)', category: 'Cloud', price: 6000, status: 'Active' },
        { id: 2, name: 'Web Application (Startup)', category: 'Web Dev', price: 14999, status: 'Active' },
        { id: 3, name: 'E-commerce Add-on', category: 'Web Dev', price: 24999, status: 'Active' },
        { id: 4, name: 'Mobile App (Android)', category: 'Mobile App', price: 34999, status: 'Active' },
        { id: 5, name: 'Bulk SMS Pack (10k)', category: 'Marketing', price: 2500, status: 'Active' },
    ]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex items-center">
                        <Link to="/admin-dashboard" className="mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Service Management</h1>
                            <p className="text-sm text-slate-500 mt-1">Manage the platform product catalog and pricing structures.</p>
                        </div>
                    </div>
                    <Link to="/admin/add-product" className="bg-primary hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-lg flex items-center shadow-lg shadow-primary/20 transition-all active:scale-95">
                        <Plus className="w-5 h-5 mr-2" /> Add New Service
                    </Link>
                </div>

                {/* Filters & Search */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-sm p-5 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-96 group">
                        <input
                            type="text"
                            placeholder="Find products by name or category..."
                            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all dark:text-white"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary w-4 h-4 transition-colors" />
                    </div>
                    <div className="flex space-x-3 w-full md:w-auto">
                        <select className="flex-1 md:flex-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm font-bold text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer">
                            <option>All Categories</option>
                            <option>Cloud</option>
                            <option>Web Dev</option>
                            <option>Marketing</option>
                        </select>
                        <select className="flex-1 md:flex-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm font-bold text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer">
                            <option>Status: Active</option>
                            <option>Status: Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Services Table */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800">
                            <thead className="bg-slate-50 dark:bg-slate-950/40">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 tracking-tight">Service Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 tracking-tight">Category</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 tracking-tight">Price (₹)</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 tracking-tight">Status</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 tracking-tight">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
                                {services.map((service) => (
                                    <tr key={service.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{service.name}</div>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-slate-500 dark:text-slate-400">
                                            {service.category}
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap text-sm font-extrabold text-slate-900 dark:text-white tabular-nums">
                                            {service.price.toLocaleString('en-IN')}
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <span className="px-3 py-1 inline-flex text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                                                {service.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                            <button className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ServiceManagement;
