import React from 'react';

export const Footer: React.FC = () => (
    <footer className="py-10 px-6 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Mzansi Budget Buddy. All rights reserved.</p>
            <div className="mt-4 md:mt-0 space-x-6">
                <a href="#about-us" className="hover:text-primary">About Us</a>
                <a href="#contact" className="hover:text-primary">Contact</a>
            </div>
        </div>
    </footer>
);