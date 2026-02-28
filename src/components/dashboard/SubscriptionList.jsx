import React from 'react';
import { Calendar, AlertCircle, CheckCircle } from 'lucide-react';

const mockSubscriptions = [
    { id: 1, service: 'Tally Cloud (Gold)', expiry: '2026-02-15', status: 'Active', autoRenew: true },
    { id: 2, service: 'Web Maintenance', expiry: '2025-11-20', status: 'Active', autoRenew: false },
    { id: 3, service: 'Mobile App API', expiry: '2025-10-01', status: 'Expiring Soon', autoRenew: true },
];

const SubscriptionList = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-sm shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-primary" /> Active Subscriptions
                </h3>
                <button className="text-sm text-primary hover:underline">View All</button>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {mockSubscriptions.map((sub) => (
                    <div key={sub.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-bold text-gray-800 dark:text-white">{sub.service}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Expires: {sub.expiry}</p>
                            </div>
                            <div className="text-right">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sub.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {sub.status}
                                </span>
                                <div className="text-xs text-gray-500 mt-2">
                                    {sub.autoRenew ? 'Auto-renew ON' : 'Auto-renew OFF'}
                                </div>
                            </div>
                        </div>
                        {sub.status === 'Expiring Soon' && (
                            <div className="mt-3 flex items-center text-xs text-red-600 bg-red-50 p-2 rounded-sm dark:bg-red-900/20 dark:text-red-400">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                Renew within 7 days to avoid service interruption.
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubscriptionList;
