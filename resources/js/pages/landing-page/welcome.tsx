import { Head } from '@inertiajs/react';
import React from 'react';

// Import the sections and hook
import { useTheme } from './components/ThemeHooks';
import { Header } from './sections/Header';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { FeatureSection } from './sections/FeatureSection';
import { ContactSection } from './sections/ContactSection';
import { TestimonialSection } from './sections/TestimonialSection';
import { Footer } from './sections/Footer';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { theme, toggleTheme } = useTheme(); 

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,600,700,800"
                    rel="stylesheet"
                />
            </Head>
            
            <div className="min-h-screen font-sans">
                
                {/* 1. HEADER (Navigation Bar) */}
                <Header theme={theme} toggleTheme={toggleTheme} canRegister={canRegister} />

                <main>
                    {/* 2. HERO SECTION */}
                    <HeroSection />

                    {/* 3. ABOUT SECTION */}
                    <AboutSection /> 

                    {/* 4. FEATURE SECTION (BUDGETING SIMPLIFIED) */}
                    <FeatureSection />
                    
                    {/* 5. CONTACT SECTION */}
                    <ContactSection />
                    
                    {/* 6. TESTIMONIAL/CALLOUT SECTION */}
                    <TestimonialSection />

                </main>

                {/* 7. FOOTER */}
                <Footer />
            </div>
        </>
    );
}