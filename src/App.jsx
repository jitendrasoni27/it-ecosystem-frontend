import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Lazy Loaded Components
const Home = lazy(() => import('./pages/Home'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Services = lazy(() => import('./pages/Services'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const PartnerDashboard = lazy(() => import('./pages/partner/PartnerDashboard'));
const CustomerDashboard = lazy(() => import('./pages/customer/CustomerDashboard'));
const ServiceManagement = lazy(() => import('./pages/admin/ServiceManagement'));
const MobileAppDevelopment = lazy(() => import('./pages/MobileAppDevelopment'));
const WebAppDevelopment = lazy(() => import('./pages/WebAppDevelopment'));
const Cart = lazy(() => import('./pages/Cart'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const Career = lazy(() => import('./pages/Career'));
const TallyProducts = lazy(() => import('./pages/TallyProducts'));
const TallyCustomSolutions = lazy(() => import('./pages/TallyCustomSolutions'));
const TallyIntegration = lazy(() => import('./pages/TallyIntegration'));
const TallyAddons = lazy(() => import('./pages/TallyAddons'));
const JobApplication = lazy(() => import('./pages/JobApplication'));
const TechnicalDocs = lazy(() => import('./pages/TechnicalDocs'));

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SEO from './components/SEO';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import Profile from './pages/Profile';
import useAnalytics from './hooks/useAnalytics'; // Analytics Hook
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Loading Fallback
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

import InstallPWA from './components/InstallPWA';
import Offline from './components/Offline';
import useOnlineStatus from './hooks/useOnlineStatus';

import { useAuth } from './context/AuthContext';

// Wrapper to use hooks inside Router
const AppContent = () => {
  useAnalytics(); // Track page views
  const isOnline = useOnlineStatus();
  const { userRole } = useAuth();
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin') ||
    location.pathname === '/admin-dashboard' ||
    location.pathname === '/partner-dashboard' ||
    location.pathname === '/customer-dashboard';

  const footerPaths = ['/', '/services', '/career', '/login', '/register', '/forgot-password'];
  const showFooter = footerPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-bg dark:bg-gray-900 font-sans transition-colors duration-200 flex flex-col justify-between">
      <ScrollToTop />
      <ScrollToTopButton />
      {!isOnline && <Offline />}
      <div className={isAdminPath ? "" : "pt-20"}>
        {!isAdminPath && <Navbar />}
        <InstallPWA />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<><SEO title="Home" description="Welcome to IT Ecosystem - Your Software Solutions Partner for Web, Mobile, and Tally." /><Home /></>} />
            <Route path="/how-it-works" element={<><SEO title="How It Works" description="Understand our workflow and engagement models." /><HowItWorks /></>} />
            <Route path="/services" element={<><SEO title="Services" description="Explore our wide range of IT services." /><Services /></>} />
            <Route path="/login" element={<><SEO title="Login" /><Login /></>} />
            <Route path="/register" element={<><SEO title="Register" /><Register /></>} />
            <Route path="/forgot-password" element={<><SEO title="Forgot Password" /><ForgotPassword /></>} />
            <Route path="/profile" element={<><SEO title="Profile" /><Profile /></>} /> {/* Added Profile route */}
            <Route path="/dashboard" element={<><SEO title="Dashboard" /><Dashboard /></>} />
            <Route path="/customer-dashboard" element={<><SEO title="Customer Dashboard" /><CustomerDashboard /></>} />
            <Route path="/partner-dashboard" element={<><SEO title="Partner Dashboard" /><PartnerDashboard /></>} />
            <Route path="/admin-dashboard" element={<><SEO title="Admin Dashboard" /><AdminDashboard /></>} />
            <Route path="/admin/services" element={<><SEO title="Manage Services" /><ServiceManagement /></>} />
            <Route path="/mobile-app-development" element={<><SEO title="Mobile App Development" /><MobileAppDevelopment /></>} />
            <Route path="/web-app-development" element={<><SEO title="Web App Development" /><WebAppDevelopment /></>} />
            <Route path="/cart" element={<><SEO title="Shopping Cart" /><Cart /></>} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/career" element={<Career />} />
            <Route path="/tally-products" element={<><SEO title="Tally Products" /><TallyProducts /></>} />
            <Route path="/tally-custom-solutions" element={<><SEO title="Tally Custom Solutions" /><TallyCustomSolutions /></>} />
            <Route path="/tally-integration" element={<><SEO title="Tally Integration" /><TallyIntegration /></>} />
            <Route path="/tally-addons" element={<><SEO title="Tally Addons" /><TallyAddons /></>} />
            <Route path="/apply/:positionId" element={<JobApplication />} />
            <Route path="/documentation" element={<><SEO title="Documentation" /><TechnicalDocs /></>} />
          </Routes>
        </Suspense>
      </div>
      {(!userRole || showFooter) && <Footer />}
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <ThemeProvider>
            <Router>
              <AppContent />
            </Router>
          </ThemeProvider>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
