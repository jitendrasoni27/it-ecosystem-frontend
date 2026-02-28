import React, { useState } from 'react';
import { Loader, CheckCircle, XCircle, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const PaymentGatewayMock = ({ totalAmount, onSuccess, onCancel }) => {
    const [status, setStatus] = useState('input'); // input, processing, success, fail
    const { clearCart } = useCart();
    const navigate = useNavigate();

    const handlePayment = () => {
        setStatus('processing');
        // Simulate network delay
        setTimeout(() => {
            const isSuccess = Math.random() > 0.1; // 90% success rate
            if (isSuccess) {
                setStatus('success');
                clearCart();
                setTimeout(() => {
                    onSuccess();
                    navigate('/dashboard');
                }, 2000);
            } else {
                setStatus('fail');
            }
        }, 3000);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full text-center relative">
                {status === 'input' && (
                    <>
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Secure Checkouts</h2>
                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md mb-6 text-left">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Amount</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">₹{totalAmount.toLocaleString('en-IN')}</p>
                        </div>

                        <div className="space-y-4 mb-8">
                            <button
                                onClick={handlePayment}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md flex items-center justify-center"
                            >
                                <CreditCard className="w-5 h-5 mr-2" /> Pay Now (Credit Card)
                            </button>
                            <button
                                onClick={handlePayment}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-md flex items-center justify-center"
                            >
                                UPI / Net Banking
                            </button>
                        </div>
                        <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">Cancel</button>
                    </>
                )}

                {status === 'processing' && (
                    <div className="py-12">
                        <Loader className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Processing Payment...</h3>
                        <p className="text-gray-500 dark:text-gray-400">Please do not close this window.</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="py-12">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Payment Successful!</h3>
                        <p className="text-gray-500 dark:text-gray-400">Redirecting to Dashboard...</p>
                    </div>
                )}

                {status === 'fail' && (
                    <div className="py-12">
                        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Payment Failed</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">Something went wrong. Please try again.</p>
                        <button
                            onClick={() => setStatus('input')}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-sm"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentGatewayMock;
