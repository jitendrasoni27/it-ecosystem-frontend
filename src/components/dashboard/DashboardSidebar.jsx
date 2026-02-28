import React from 'react';
import {
    LayoutDashboard,
    User,
    Package,
    Users,
    Shield,
    Clock,
    History,
    BarChart3,
    Settings,
    LogOut,
    ChevronRight,
    BookOpen,
    CreditCard,
    Activity,
    Briefcase,
    ShieldCheck,
    CreditCard as CardIcon
} from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const DashboardSidebar = ({ activeTab, setActiveTab, onLogout, isCollapsed, setIsCollapsed, role = 'CUSTOMER' }) => {
    const { currentUser } = useAuth();
    const { density } = useTheme();

    // Handle responsive behavior
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsCollapsed(true);
            } else {
                setIsCollapsed(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [setIsCollapsed]);

    const getMenuGroups = () => {
        const commonPreferences = {
            title: 'Preferences',
            items: [
                { id: 'profile', label: 'My Profile', icon: User },
                { id: 'documentation', label: 'Resources', icon: BookOpen },
                { id: 'settings', label: 'Settings', icon: Settings },
            ]
        };

        if (role === 'ROLE_ADMIN') {
            return [
                {
                    title: 'Platform',
                    items: [
                        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                        { id: 'products', label: 'Inventory', icon: Package },
                        { id: 'users', label: 'Users', icon: Users },
                        { id: 'orders', label: 'Transactions', icon: History },
                    ]
                },
                {
                    title: 'Reporting',
                    items: [
                        { id: 'revenue', label: 'Analytics', icon: BarChart3 },
                        { id: 'partner-analytics', label: 'Partners', icon: Users },
                        { id: 'logs', label: 'System Logs', icon: Activity },
                    ]
                },
                commonPreferences
            ];
        }

        if (role === 'ROLE_PARTNER') {
            return [
                {
                    title: 'Business',
                    items: [
                        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
                        { id: 'clients', label: 'My Clients', icon: Users },
                        { id: 'inventory', label: 'Equipment', icon: Package },
                        { id: 'transactions', label: 'Payouts', icon: CreditCard },
                    ]
                },
                {
                    title: 'Performance',
                    items: [
                        { id: 'analytics', label: 'Telemetry', icon: Activity },
                        { id: 'commissions', label: 'Yield', icon: BarChart3 },
                    ]
                },
                {
                    title: 'Preferences',
                    items: [
                        { id: 'profile', label: 'My Profile', icon: User },
                        { id: 'settings', label: 'Settings', icon: Settings },
                    ]
                }
            ];
        }

        // Default: ROLE_CUSTOMER
        return [
            {
                title: 'Workspace',
                items: [
                    { id: 'dashboard', label: 'Management', icon: LayoutDashboard },
                    { id: 'services', label: 'Active Services', icon: ShieldCheck },
                    { id: 'orders', label: 'Billings', icon: CardIcon },
                ]
            },
            commonPreferences
        ];
    };

    const menuGroups = getMenuGroups();

    return (
        <Motion.div
            animate={{ width: isCollapsed ? 56 : 260 }}
            style={{ paddingTop: 'var(--global-py)', paddingBottom: 'var(--global-py)' }}
            className="h-screen bg-primary dark:bg-slate-900 flex flex-col sticky top-0 z-[110] transition-all duration-300 overflow-hidden shadow-2xl transition-colors"
        >
            {/* Sidebar Toggle */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-20 bg-primary dark:bg-slate-900 border border-white/10 w-6 h-6 rounded-full flex items-center justify-center shadow-md z-50 hover:bg-white/10 dark:hover:bg-slate-800 transition-colors"
                title={isCollapsed ? "Expand" : "Collapse"}
            >
                <Motion.div animate={{ rotate: isCollapsed ? 0 : 180 }}>
                    <ChevronRight className="w-3 h-3 text-white dark:text-slate-300" />
                </Motion.div>
            </button>

            {/* Brand/Identity Area */}
            <div className={`h-16 flex items-center border-b border-white/5 transition-all ${isCollapsed ? 'justify-center px-0' : 'px-4 sm:px-6'}`}>
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-lg flex-shrink-0 flex items-center justify-center shadow-sm">
                        <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900" />
                    </div>
                    {!isCollapsed && (
                        <div className="flex flex-col">
                            <h2 className="text-sm font-bold text-white leading-none">
                                {role === 'ROLE_ADMIN' ? 'Control Center' : role === 'ROLE_PARTNER' ? 'Partner Portal' : 'Service Hub'}
                            </h2>
                            <p className="text-[10px] text-white/60 font-medium mt-1 uppercase tracking-tighter">
                                {currentUser?.role?.replace('ROLE_', '') || 'Access Tier'}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Sections */}
            <nav
                style={{ gap: 'var(--global-sidebar-gap)', paddingLeft: 'var(--global-sidebar-px)', paddingRight: 'var(--global-sidebar-px)' }}
                className={`flex-1 overflow-y-auto pt-6 pb-4 flex flex-col hide-scrollbar transition-all ${isCollapsed ? 'items-center' : ''}`}
            >
                {menuGroups.map((group, groupIdx) => (
                    <div key={groupIdx} className="space-y-1">
                        {!isCollapsed && (
                            <p className="px-4 text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">
                                {group.title}
                            </p>
                        )}
                        <div className="space-y-0.5">
                            {group.items.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    style={{ paddingBlock: 'var(--global-item-py)' }}
                                    className={`w-full flex items-center gap-3 rounded-lg transition-all group ${isCollapsed ? 'justify-center px-0' : 'px-3'} ${activeTab === item.id
                                        ? 'bg-white text-[#1f5ebb] dark:text-slate-900 shadow-md'
                                        : 'text-white/70 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <item.icon className={`w-4.5 h-4.5 sm:w-5 sm:h-5 flex-shrink-0 ${activeTab === item.id ? '' : 'group-hover:scale-105 transition-transform'}`} />
                                    {!isCollapsed && (
                                        <span className="text-sm font-medium tracking-tight">
                                            {item.label}
                                        </span>
                                    )}
                                    {!isCollapsed && activeTab === item.id && (
                                        <div className="ml-auto w-1 h-1 bg-primary dark:bg-slate-900 rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Sidebar Bottom */}
            <div className={`p-2 sm:p-3 bg-primary dark:bg-slate-900 border-t border-white/5 mt-auto transition-all transition-colors`}>
                <button
                    onClick={onLogout}
                    className={`w-full flex items-center gap-3 py-1.5 text-white/60 hover:text-red-400 transition-colors rounded-lg ${isCollapsed ? 'justify-center px-0' : 'px-3'}`}
                    title="Sign Out"
                >
                    <LogOut className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                    {!isCollapsed && <span className="text-sm font-semibold">Sign Out</span>}
                </button>
            </div>
        </Motion.div>
    );
};

export default DashboardSidebar;
