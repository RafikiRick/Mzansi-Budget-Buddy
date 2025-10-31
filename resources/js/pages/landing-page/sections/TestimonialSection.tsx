import React from 'react';
import { TestimonialCard } from '../components/TestimonialCards';

const PastelBackground = "/images/pastel.jpg"; 

export const TestimonialSection: React.FC = () => (
    <div 
        className="relative overflow-hidden bg-cover bg-center py-20"
        style={{ backgroundImage: `url(${PastelBackground})` }}
    >
         <section className="px-6 max-w-7xl mx-auto relative z-10 border-t border-b border-border">
            <h2 className="text-3xl font-bold text-center mb-10 text-foreground font-cravelo">
                Loved by Money-Smart South Africans
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
                <TestimonialCard quote="This app is a game-changer! I finally know where my money is going each month. The local price comparison is brilliant." name="Thabo" location="Cape Town"/>
                <TestimonialCard quote="I've saved R300 on my weekly Checkers trip thanks to the price tool. Simple to use and genuinely helpful." name="Palesa" location="Johannesburg"/>
                <TestimonialCard quote="The savings goals feature with the progress bar actually makes me excited to save. A real win for Mzansi!" name="Sipho" location="Durban"/>
            </div>
         </section>
    </div>
);