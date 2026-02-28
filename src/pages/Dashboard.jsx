import React from 'react';
import SubscriptionList from '../components/dashboard/SubscriptionList';
import OrderHistory from '../components/dashboard/OrderHistory';
import OffersWallet from '../components/dashboard/OffersWallet';
import RequirementForm from '../components/dashboard/RequirementForm';
import { LayoutDashboard, LogOut, Settings, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const navigate = useNavigate();
    const { userRole, currentUser, logout } = useAuth();

    React.useEffect(() => {
        if (!userRole) {
            navigate('/login');
        }
    }, [userRole, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">

            {/* Dashboard Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar (Mock) */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white dark:bg-gray-800 rounded-sm shadow-sm overflow-hidden sticky top-24">
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                                <div className="flex items-center space-x-4">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                                        {currentUser?.fullName ? currentUser.fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'U'}
                                    </div>
                                    <div className="min-w-0">
                                        <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate">{currentUser?.fullName || 'User'}</h2>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{userRole} Account</p>
                                    </div>
                                </div>
                            </div>
                            <nav className="p-4 space-y-2">
                                <a href="#" className="flex items-center space-x-3 px-4 py-3 bg-primary/5 text-primary rounded-md font-medium">
                                    <LayoutDashboard className="w-5 h-5" />
                                    <span>Overview</span>
                                </a>
                                <Link to="/profile" className="flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors">
                                    <User className="w-5 h-5" />
                                    <span>Profile</span>
                                </Link>
                                <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors">
                                    <Settings className="w-5 h-5" />
                                    <span>Settings</span>
                                </a>
                                <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-md transition-colors">
                                    <LogOut className="w-5 h-5" />
                                    <span>Sign Out</span>
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 space-y-8">

                        {/* Welcome Message */}
                        <div className="bg-gradient-to-r from-primary to-blue-800 rounded-sm shadow-md p-8 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h1 className="text-2xl font-bold mb-2">Welcome back, {currentUser?.fullName?.split(' ')[0] || 'User'}!</h1>
                                <p className="opacity-90">Here is what's happening with your business ecosystem today.</p>
                            </div>
                            <div className="absolute right-0 bottom-0 opacity-10">
                                <LayoutDashboard className="w-48 h-48 -mb-12 -mr-12" />
                            </div>
                        </div>

                        {/* Widgets Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <SubscriptionList />
                            <OffersWallet />
                        </div>

                        {/* Requirements & Orders */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <OrderHistory />
                            </div>
                            <div className="lg:col-span-1">
                                <RequirementForm />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
