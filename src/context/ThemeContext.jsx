import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const savedTheme = localStorage.getItem('theme') || 'light:default:comfort';
    const [mode, setMode] = useState(savedTheme.split(':')[0]);
    const [accent, setAccent] = useState(savedTheme.split(':')[1] || 'default');
    const [density, setDensity] = useState(savedTheme.split(':')[2] || 'comfort');

    useEffect(() => {
        const root = window.document.documentElement;

        // Mode handling
        root.classList.remove('dark');
        if (mode === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            if (systemTheme === 'dark') root.classList.add('dark');
        } else if (mode === 'dark') {
            root.classList.add('dark');
        }

        // Accent handling
        const classes = Array.from(root.classList);
        classes.forEach(c => {
            if (c.startsWith('theme-')) root.classList.remove(c);
            if (c.startsWith('density-')) root.classList.remove(c);
        });

        if (accent !== 'default') {
            root.classList.add(`theme-${accent}`);
        }

        // Density handling
        root.classList.add(`density-${density}`);

        localStorage.setItem('theme', `${mode}:${accent}:${density}`);
    }, [mode, accent, density]);

    const toggleTheme = () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{
            mode, setMode,
            accent, setAccent,
            density, setDensity,
            toggleTheme
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
