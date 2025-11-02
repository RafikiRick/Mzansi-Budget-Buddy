import { Head } from '@inertiajs/react';
import React from 'react';

// Import the sections and hook
import { useTheme } from './components/ThemeHooks';
import { Header } from './sections/Header';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { FeatureSection } from './sections/FeatureSection';
import { ProcessSection} from './sections/ProcessSection';
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
                    href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800"
                    rel="stylesheet"
                />
            </Head>
            
            <div className="min-h-screen font-['Plus_Jakarta_Sans',sans-serif]">
                
                {/* 1. HEADER (Navigation Bar) */}
                <Header theme={theme} toggleTheme={toggleTheme} canRegister={canRegister} />

                <main>
                    {/* 2. HERO SECTION */}
                    <HeroSection />

                    {/* 3. ABOUT SECTION */}
                    <AboutSection /> 

                    {/* 4. FEATURE SECTION (BUDGETING SIMPLIFIED) */}
                    <FeatureSection />
                    
                    {/* 5. PROCESS SECTION (Steps) */}
                    <ProcessSection />
                    
                    {/* 6. CONTACT SECTION */}
                    <ContactSection />
                    
                    {/* 7. TESTIMONIAL/CALLOUT SECTION */}
                    <TestimonialSection />

                </main>

                {/* 8. FOOTER */}
                <Footer />
            </div>
        </>
    );
}