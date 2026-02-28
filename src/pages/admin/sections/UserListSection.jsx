import React from 'react';
import {
    Plus,
    Search,
    Filter,
    Loader2,
    Edit,
    Trash2,
    Mail,
    Smartphone,
    Building,
    Users
} from 'lucide-react';

/**
 * UserListSection Component
 * Displays a searchable and filterable table of users.
 * 
 * @param {Array} users - List of users to display
 * @param {boolean} loading - Loading state for user list
 * @param {Function} onEdit - Callback for editing a user
 * @param {Function} onDelete - Callback for deleting a user
 * @param {Function} onAdd - Callback for adding a new user
 * @param {string} searchQuery - Current search input value
 * @param {Function} setSearchQuery - Function to update search query
 * @param {Function} onSearch - Callback to execute the search
 * @param {string} roleFilter - Current role filter value
 * @param {Function} setRoleFilter - Function to update role filter
 * @param {Function} onResetFilters - Callback to reset all filters
 */
const UserListSection = ({
    users,
    loading,
    onEdit,
    onDelete,
    onAdd,
    searchQuery,
    setSearchQuery,
    onSearch,
    roleFilter,
    setRoleFilter,
    onResetFilters
}) => (
    <div className="space-y-6">
        {/* Header and Add Action */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">User List ({users.length})</h2>
                <p className="text-sm text-slate-500 font-medium">Manage infrastructure users and partners.</p>
            </div>
            <button
                onClick={onAdd}
                className="w-full sm:w-auto px-6 py-3 bg-primary text-white text-sm font-bold rounded-lg shadow-xl shadow-primary/10 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
                <Plus className="w-5 h-5" /> Register New User
            </button>
        </div>

        {/* User Filter Controls */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
            <div className="flex flex-col xl:flex-row p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && onSearch()}
                        placeholder="Query user database..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                    />
                </div>
                <div className="flex flex-wrap gap-3">
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                        <option value="All">All Tiers</option>
                        <option value="ADMIN">Administrators</option>
                        <option value="PARTNER">Partners</option>
                        <option value="CUSTOMER">Customers</option>
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

            {/* List Content */}
            <div className="flex-1 overflow-auto max-h-[440px] custom-scrollbar">
                {loading ? (
                    <div className="flex flex-col items-center justify-center p-20 text-center">
                        <Loader2 className="w-10 h-10 text-primary animate-spin mb-3" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Accessing User Archives</h3>
                        <p className="text-xs text-slate-500 font-medium mt-1">Retrieving secure identity nodes...</p>
                    </div>
                ) : users.length > 0 ? (
                    <>
                        {/* Desktop Table View */}
                        <table className="w-full border-collapse hidden sm:table">
                            <thead className="sticky top-0 z-10 bg-white dark:bg-slate-900">
                                <tr className="bg-slate-50/50 dark:bg-slate-950/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800">
                                    <th className="px-6 py-4 text-left">User Identity</th>
                                    <th className="px-6 py-4 text-left">Contact Metadata</th>
                                    <th className="px-6 py-4 text-left">Organization Node</th>
                                    <th className="px-6 py-4 text-center">Privilege Tier</th>
                                    <th className="px-6 py-4 text-center">Protocol Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {users.map((user) => (
                                    <tr key={user.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-2.5 whitespace-nowrap">
                                            <div className="flex items-center gap-4">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white font-black text-xs shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                                                    {user.fullName ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'U'}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{user.fullName}</p>
                                                    <p className="text-[10px] text-slate-500 font-mono mt-0.5 uppercase">@{user.username}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-2.5 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{user.email}</span>
                                                <span className="text-[10px] text-slate-500 mt-0.5 font-medium">{user.mobileNumber || 'No Uplink'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-2.5 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{user.organizationName || 'Independent Node'}</span>
                                                <span className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-tighter">Code: {user.partnerCode || 'N/A'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-2.5 whitespace-nowrap text-center">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${user.role === 'ROLE_ADMIN'
                                                ? 'bg-primary/10 text-primary border-primary/20'
                                                : user.role === 'ROLE_PARTNER'
                                                    ? 'bg-secondary/10 text-secondary border-secondary/20'
                                                    : 'bg-slate-500/10 text-slate-500 border-slate-500/20'
                                                }`}>
                                                {user.role?.replace('ROLE_', '')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-2.5 whitespace-nowrap text-center">
                                            <div className="flex justify-center gap-1">
                                                <button
                                                    onClick={() => onEdit(user)}
                                                    className="p-2.5 hover:bg-primary/10 text-slate-400 hover:text-primary rounded-lg transition-all"
                                                    title="Modify Node"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => onDelete(user.id)}
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
                            {users.map((user) => (
                                <div key={user.id} className="p-4 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white font-black text-sm shadow-sm">
                                            {user.fullName ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'U'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight truncate">{user.fullName}</p>
                                                    <p className="text-[10px] text-slate-500 font-mono mt-0.5 uppercase tracking-tighter">@{user.username}</p>
                                                </div>
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${user.role === 'ROLE_ADMIN'
                                                    ? 'bg-primary/10 text-primary border-primary/20'
                                                    : user.role === 'ROLE_PARTNER'
                                                        ? 'bg-secondary/10 text-secondary border-secondary/20'
                                                        : 'bg-slate-500/10 text-slate-500 border-slate-500/20'
                                                    }`}>
                                                    {user.role?.replace('ROLE_', '')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 pt-1">
                                        <div className="bg-slate-50 dark:bg-slate-950/40 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                                <Mail className="w-2.5 h-2.5" /> Email
                                            </p>
                                            <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate">{user.email}</p>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-slate-950/40 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                                <Smartphone className="w-2.5 h-2.5" /> Contact
                                            </p>
                                            <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{user.mobileNumber || 'N/A'}</p>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 dark:bg-slate-950/40 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-0.5 flex items-center gap-1.5">
                                                    <Building className="w-2.5 h-2.5" /> Organization
                                                </p>
                                                <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400 truncate">{user.organizationName || 'Independent Node'}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Code</p>
                                                <p className="text-[10px] font-mono font-bold text-primary">{user.partnerCode || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        <button
                                            onClick={() => onEdit(user)}
                                            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-primary/10 hover:text-primary transition-all"
                                        >
                                            <Edit className="w-4 h-4" /> Edit Record
                                        </button>
                                        <button
                                            onClick={() => onDelete(user.id)}
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
                        <Users className="w-16 h-16 text-primary mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Identity Registry Empty</h3>
                        <p className="text-xs text-slate-500 font-medium mt-1.5 max-w-sm">No identity nodes match current archive filters.</p>
                        <button onClick={onAdd} className="mt-6 px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-dark transition-all">
                            Initialize Entry
                        </button>
                    </div>
                )}
            </div>
        </div>
    </div>
);

export default UserListSection;
