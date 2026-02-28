import React, { useState } from 'react';
import { FileText, Upload, Send } from 'lucide-react';

const RequirementForm = () => {
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-sm shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden h-full">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-primary" /> Custom Requirements
                </h3>
            </div>
            <div className="p-6">
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Title</label>
                        <input type="text" placeholder="e.g., E-commerce App for Retail Store" className="w-full rounded-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Detailed Description</label>
                        <textarea rows={4} placeholder="Describe your requirements, features, and target audience..." className="w-full rounded-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3"></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Attachments (Optional)</label>
                        <div
                            className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center transition-colors ${dragActive ? 'border-primary bg-blue-50 dark:bg-blue-900/10' : 'border-gray-300 dark:border-gray-600 hover:border-primary'}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrag}
                        >
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Drag & drop files here, or <span className="text-primary font-bold cursor-pointer">browse</span>
                            </p>
                            <p className="text-xs text-gray-400 mt-1">PDF, DOCX, JPG (Max 5MB)</p>
                        </div>
                    </div>

                    <button type="button" className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-sm text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                        <Send className="w-4 h-4 mr-2" /> Submit Requirement
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RequirementForm;
