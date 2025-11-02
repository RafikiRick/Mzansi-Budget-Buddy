import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeHook {
    theme: Theme;
    toggleTheme: () => void;
}

// Function to determine the preferred theme from local storage or system settings
const getInitialTheme = (): Theme => {
    // Check local storage first
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
        return storedTheme;
    }

    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }

    // Default to light
    return 'light';
};

// Hook to manage the application theme
export const useTheme = (): ThemeHook => {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    // Apply or remove 'dark' class on the HTML element
    const applyTheme = (currentTheme: Theme) => {
        const html = document.documentElement;
        
        if (currentTheme === 'dark' || (currentTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    };

    // Initialize theme on mount
    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    // Handle system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleChange = () => {
            if (theme === 'system') {
                applyTheme('system');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => {
            let newTheme: Theme;
            
            // Cycle: dark -> light -> dark
            if (prevTheme === 'dark' || prevTheme === 'system') {
                newTheme = 'light';
            } else {
                newTheme = 'dark';
            }
            
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
            return newTheme;
        });
    };

    return { theme, toggleTheme };
};