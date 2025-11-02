import React from 'react';
import { TestimonialCard } from '../components/TestimonialCards';

export const TestimonialSection: React.FC = () => (
    // Use solid background color
    <div 
        className="bg-background py-20"
    >
        {/* Outer container for the section's "box" with glowing border and hover effect */}
        <div className="max-w-7xl mx-auto px-6">
             <section 
                className="relative z-10 p-8 md:p-12 rounded-2xl border-2 border-border bg-card/70 
                           transition duration-300 hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.01]
                           shadow-xl dark:shadow-primary/30 shadow-foreground/40"
            >
                {/* Clean, bold header */}
                <h2 className="text-4xl font-extrabold text-center mb-10 text-foreground">
                    Loved by Money-Smart South Africans
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <TestimonialCard quote="This app is a game-changer! I finally know where my money is going each month. The local price comparison is brilliant." name="Thabo" location="Cape Town"/>
                    <TestimonialCard quote="I've saved R300 on my weekly Checkers trip thanks to the price tool. Simple to use and genuinely helpful." name="Palesa" location="Johannesburg"/>
                    <TestimonialCard quote="The savings goals feature with the progress bar actually makes me excited to save. A real win for Mzansi!" name="Sipho" location="Durban"/>
                </div>
             </section>
        </div>
    </div>
);