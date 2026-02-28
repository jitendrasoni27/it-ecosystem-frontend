import React from 'react';
import { WifiOff } from 'lucide-react';

const Offline = () => {
    return (
        <div className="fixed inset-0 bg-gray-900/90 z-[100] flex flex-col items-center justify-center text-white px-4 text-center">
            <WifiOff className="w-20 h-20 mb-6 text-gray-400" />
            <h2 className="text-3xl font-bold mb-2">You are Offline</h2>
            <p className="text-gray-300 max-w-md">
                It seems you have lost your internet connection.
                Please check your network settings.
                <br />
                <span className="text-sm mt-2 block opacity-75">Some features may not work until you reconnect.</span>
            </p>
            <button
                onClick={() => window.location.reload()}
                className="mt-8 px-6 py-2 bg-primary hover:bg-blue-600 rounded-sm font-bold transition-colors"
            >
                Try Reconnecting
            </button>
        </div>
    );
};

export default Offline;
