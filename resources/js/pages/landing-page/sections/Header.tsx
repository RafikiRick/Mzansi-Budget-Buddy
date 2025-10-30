import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';

interface HeaderProps {
    theme: 'light' | 'dark' | 'system';
    toggleTheme: () => void;
    canRegister: boolean;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, canRegister }) => {
    const { auth } = usePage<SharedData>().props;

    return (
        <header className="sticky top-0 z-10 w-full px-6 py-4 border-b border-border bg-background/95 backdrop-blur-sm">
            <nav className="flex items-center justify-between mx-auto max-w-7xl">
                
                {/* Logo/Name */}
                <h1 className="text-3xl font-extrabold text-primary font-cravelo">
                    Mzansi Budget Buddy
                </h1>
                
                {/* Auth Links & Toggle */}
                <div className='flex items-center gap-4'>
                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-foreground/70 hover:bg-secondary transition"
                        aria-label="Toggle Dark Mode"
                    >
                        {theme === 'dark' ? (
                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        ) : (
                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                        )}
                    </button>
                    
                    {/* Auth Links */}
                    {auth.user ? (
                        <Link
                            href={dashboard()}
                            className="px-5 py-2 text-sm font-semibold rounded-lg bg-secondary text-secondary-foreground hover:bg-muted transition"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={login()}
                                className="px-5 py-2 text-sm font-semibold rounded-lg hover:bg-secondary transition text-secondary-foreground"
                            >
                                Log in
                            </Link>
                            {canRegister && (
                                <Link
                                    href={register()}
                                    className="px-6 py-2 text-sm font-bold rounded-lg shadow-lg transition transform hover:scale-[1.03]
                                               bg-primary text-primary-foreground shadow-primary/50"
                                >
                                    Sign Up Free
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}