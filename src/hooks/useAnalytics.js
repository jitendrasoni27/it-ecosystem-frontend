import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useAnalytics = () => {
    const location = useLocation();

    useEffect(() => {
        // Mock Analytics Call
        console.log(`[Analytics] Page View: ${location.pathname}`);

        // In a real app, you would send this to Google Analytics or similar
        // window.gtag('config', 'GA_MEASUREMENT_ID', { page_path: location.pathname });
    }, [location]);
};

export default useAnalytics;
