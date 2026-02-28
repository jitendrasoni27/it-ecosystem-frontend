import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import ProductModal from '../../components/admin/ProductModal';
import AnalyticsCharts from '../../components/admin/AnalyticsCharts';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import TechnicalDocs from '../TechnicalDocs';
import { useTheme } from '../../context/ThemeContext';
import UserModal from '../../components/admin/UserModal';

// Dashboard Sections
import OverviewSection from './sections/OverviewSection';
import ProfileSection from './sections/ProfileSection';
import ProductsListSection from './sections/ProductsListSection';
import UserListSection from './sections/UserListSection';
import PartnerStatusSection from './sections/PartnerStatusSection';
import ExpiryDetailsSection from './sections/ExpiryDetailsSection';
import OrderHistorySection from './sections/OrderHistorySection';
import RevenueSection from './sections/RevenueSection';
import SettingsSection from './sections/SettingsSection';
import SystemLogsSection from './sections/SystemLogsSection';
import { API_BASE_URL } from '../../config/api';

//const API_BASE_URL = 'http://localhost:8080/api';


const AdminDashboard = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'dashboard');
    const { mode, setMode, accent, setAccent, density, setDensity, toggleTheme } = useTheme();
    const { logout, currentUser } = useAuth();
    const navigate = useNavigate();

    // Sync theme with user preference
    React.useEffect(() => {
        if (currentUser?.themePreference) {
            const [prefMode, prefAccent, prefDensity] = currentUser.themePreference.split(':');
            if (prefMode) setMode(prefMode);
            if (prefAccent) setAccent(prefAccent);
            if (prefDensity) setDensity(prefDensity);
        }
    }, [currentUser?.themePreference, setMode, setAccent, setDensity]);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');

    const [analyticsData, setAnalyticsData] = useState(null);
    const [analyticsLoading, setAnalyticsLoading] = useState(false);

    // User Management State
    const [users, setUsers] = useState([]);
    const [userLoading, setUserLoading] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [userSearchQuery, setUserSearchQuery] = useState('');
    const [userRoleFilter, setUserRoleFilter] = useState('All');


    const fetchAnalyticsData = async () => {
        setAnalyticsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/analytics/dashboard`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setAnalyticsData(response.data);
        } catch (err) {
            console.error('Failed to fetch analytics:', err);
        } finally {
            setAnalyticsLoading(false);
        }
    };

    const fetchProducts = async (query = '', category = 'All', status = 'All') => {
        setLoading(true);
        try {
            let endpoint = '/products';
            const params = new URLSearchParams();

            if (query) {
                endpoint = '/products/search';
                params.append('query', query);
            } else {
                if (category !== 'All') params.append('category', category);
                if (status !== 'All') params.append('active', status === 'Active');
            }

            const queryString = params.toString();
            const url = `${API_BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;
            const token = localStorage.getItem('token');
            const response = await axios.get(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setProducts(response.data);
        } catch (err) {
            console.error('Failed to fetch products:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async (query = '', role = 'All') => {
        setUserLoading(true);
        try {
            let endpoint = '/admin/users';
            const params = new URLSearchParams();

            if (query) {
                endpoint = '/admin/users/search';
                params.append('query', query);
            } else if (role !== 'All') {
                params.append('role', role);
            }

            const queryString = params.toString();
            const url = `${API_BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;
            const token = localStorage.getItem('token');
            const response = await axios.get(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (err) {
            console.error('Failed to fetch users:', err);
        } finally {
            setUserLoading(false);
        }
    };

    React.useEffect(() => {
        if (activeTab === 'dashboard') {
            fetchAnalyticsData();
        } else if (activeTab === 'products') {
            fetchProducts(searchQuery, categoryFilter, statusFilter);
        } else if (activeTab === 'users') {
            fetchUsers(userSearchQuery, userRoleFilter);
        }
    }, [activeTab, searchQuery, categoryFilter, statusFilter, userSearchQuery, userRoleFilter]);

    const handleSaveProduct = async (formData) => {
        try {
            const token = localStorage.getItem('token');
            if (editingProduct) {
                await axios.put(`${API_BASE_URL}/products/${editingProduct.id}`, formData, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            } else {
                await axios.post(`${API_BASE_URL}/products`, formData, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            }
            setIsModalOpen(false);
            setEditingProduct(null);
            fetchProducts();
        } catch (err) {
            console.error('Error saving product:', err);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to terminate this product archive?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${API_BASE_URL}/products/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                fetchProducts();
            } catch (err) {
                console.error('Error deleting product:', err);
            }
        }
    };

    const openCreateModal = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleSaveUser = async (userData) => {
        try {
            const token = localStorage.getItem('token');
            if (editingUser) {
                await axios.put(`${API_BASE_URL}/admin/users/${editingUser.id}`, userData, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            } else {
                await axios.post(`${API_BASE_URL}/admin/users`, userData, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            }
            setIsUserModalOpen(false);
            setEditingUser(null);
            fetchUsers(userSearchQuery, userRoleFilter);
        } catch (err) {
            console.error('Error saving user:', err);
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure you want to terminate this user node?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${API_BASE_URL}/admin/users/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                fetchUsers(userSearchQuery, userRoleFilter);
            } catch (err) {
                console.error('Error deleting user:', err);
            }
        }
    };

    const openCreateUserModal = () => {
        setEditingUser(null);
        setIsUserModalOpen(true);
    };

    const openEditUserModal = (user) => {
        setEditingUser(user);
        setIsUserModalOpen(true);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Render logic for different sections
    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <OverviewSection analyticsData={analyticsData} loading={loading} />;
            case 'profile':
                return <ProfileSection currentUser={currentUser} />;
            case 'products':
                return (
                    <ProductsListSection
                        products={products}
                        loading={loading}
                        onEdit={openEditModal}
                        onDelete={handleDeleteProduct}
                        onAdd={() => {
                            setEditingProduct(null);
                            setIsModalOpen(true);
                        }}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        onSearch={fetchProducts}
                        categoryFilter={categoryFilter}
                        setCategoryFilter={setCategoryFilter}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        onResetFilters={() => {
                            setSearchQuery('');
                            setCategoryFilter('All');
                            setStatusFilter('All');
                            fetchProducts();
                        }}
                    />
                );
            case 'users':
                return (
                    <UserListSection
                        users={users}
                        loading={userLoading}
                        onEdit={openEditUserModal}
                        onDelete={handleDeleteUser}
                        onAdd={() => {
                            setEditingUser(null);
                            setIsUserModalOpen(true);
                        }}
                        searchQuery={userSearchQuery}
                        setSearchQuery={setUserSearchQuery}
                        onSearch={fetchUsers}
                        roleFilter={userRoleFilter}
                        setRoleFilter={setUserRoleFilter}
                        onResetFilters={() => {
                            setUserSearchQuery('');
                            setUserRoleFilter('All');
                            fetchUsers();
                        }}
                    />
                );
            case 'partners':
                return <PartnerStatusSection />;
            case 'expiry':
                return <ExpiryDetailsSection />;
            case 'orders':
                return <OrderHistorySection />;
            case 'revenue':
                return <RevenueSection />;
            case 'settings':
                return (
                    <SettingsSection
                        mode={mode}
                        setMode={setMode}
                        accent={accent}
                        setAccent={setAccent}
                        density={density}
                        setDensity={setDensity}
                        currentUser={currentUser}
                    />
                );
            case 'logs':
                return <SystemLogsSection />;
            case 'docs':
                return <TechnicalDocs />;
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">
            {/* Sidebar */}
            <DashboardSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onLogout={handleLogout}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                role="ROLE_ADMIN"
            />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-slate-950">
                {/* Admin Header / TopBar */}
                <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Content Container */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="p-4 sm:p-8 md:p-10 max-w-full">
                        <AnimatePresence mode="wait">
                            <Motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                {renderContent()}
                            </Motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            {/* Global Modals */}
            <AnimatePresence>
                {isModalOpen && (
                    <ProductModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSave={handleSaveProduct}
                        initialData={editingProduct}
                    />
                )}
                {isUserModalOpen && (
                    <UserModal
                        isOpen={isUserModalOpen}
                        onClose={() => setIsUserModalOpen(false)}
                        onSave={handleSaveUser}
                        initialData={editingUser}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};


export default AdminDashboard;
