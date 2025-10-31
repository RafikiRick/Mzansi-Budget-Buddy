import React from 'react'; 

export const useTheme = () => {
    const [theme, setTheme] = React.useState<'light' | 'dark' | 'system'>(() => {
        if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
            return localStorage.getItem('theme') as 'light' | 'dark';
        }
        return 'system';
    });

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    React.useEffect(() => {
        const isDark = 
            theme === 'dark' || 
            (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return { theme, toggleTheme };
}