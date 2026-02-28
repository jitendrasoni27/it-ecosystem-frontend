import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

const InstallPWA = () => {
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setSupportsPWA(true);
            setPromptInstall(e);
        };
        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const onClick = (evt) => {
        evt.preventDefault();
        if (!promptInstall) {
            return;
        }
        promptInstall.prompt();
    };

    if (!supportsPWA) {
        return null;
    }

    return (
        <button
            className="fixed bottom-4 right-4 bg-primary hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full shadow-lg flex items-center z-50 animate-bounce"
            id="setup_button"
            aria-label="Install app"
            title="Install Soniapps"
            onClick={onClick}
        >
            <Download className="w-5 h-5 mr-2" />
            Install App
        </button>
    );
};

export default InstallPWA;
