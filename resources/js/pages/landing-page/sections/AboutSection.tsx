import { Link } from '@inertiajs/react';
import React from 'react';

const MeerkatImage = "../images/mascot2.png"; 

export const AboutSection: React.FC = () => (
    <section id="about-us" className="py-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 bg-card rounded-xl shadow-xl border border-border">
        
        <div className="md:w-1/2 text-center md:text-left space-y-6">
            <h2 className="text-4xl font-extrabold text-foreground font-cravelo">
                Hey! Welcome to <span className="text-primary">Mzansi Budget Buddy</span> 
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
                We developed Mzansi Budget Buddy with a clear mission: to empower South Africans to navigate the complexities of personal finance, especially in the face of recent inflation and rising living costs.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
                Our goal is to provide intuitive tools and relevant local insights to help you track your spending, compare prices, set achievable savings goals, and ultimately, gain peace of mind about your financial future.
            </p>
            <Link
                href="/register"
                className="inline-block mt-6 px-8 py-3 text-lg font-bold rounded-lg shadow-md transition
                           bg-primary text-primary-foreground hover:bg-primary/90"
            >
                Join the Mzansi Family
            </Link>
        </div>

        <div className="md:w-1/2 flex justify-center items-center">
            <img
                src={MeerkatImage}
                alt="Mzansi Budget Buddy Meerkat Mascot"
                className="max-w-xs md:max-w-sm lg:max-w-md h-auto animate-float"
            />
        </div>
    </section>
);