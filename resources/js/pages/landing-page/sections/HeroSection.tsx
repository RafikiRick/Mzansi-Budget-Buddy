import { register } from '@/routes';
import { Link } from '@inertiajs/react';
import React from 'react';

const BackgroundImage = "/images/green.png"; 

export const HeroSection: React.FC = () => (
    <div 
        className="relative overflow-hidden bg-cover bg-center" 
        style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
        {/* Overlay to ensure text visibility */}
        <div className="absolute inset-0 bg-background/50 dark:bg-background/80 mix-blend-multiply"></div> 

        <section className="py-24 px-6 max-w-7xl mx-auto text-center relative z-10">
            <h2 className="text-6xl md:text-7xl tracking-tight mb-4 text-primary font-cravelo">
                The Next Era Of Mzansi Finance...
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-16 text-foreground/90">
                Take control of your money, spending, and savings — the smart, secure, and sophisticated Mzansi way.
            </p>

            {/* --- 3D Element (Gold Card Image) --- */}
            <div className="flex justify-center items-center mb-16">
                <div className="relative p-8 rounded-2xl bg-primary/20 
                            shadow-[0_25px_50px_-12px_rgba(var(--primary-rgb),0.5)] 
                            dark:shadow-[0_25px_50px_-12px_rgba(var(--primary-rgb),0.3)] 
                            transform hover:scale-[1.05] transition-transform duration-500">
                    
                    {/* The Gold Card Image */}
                    <img 
                        src="/images/money.png" 
                        alt="Mzansi Gold Credit Card" 
                        className="max-w-xs md:max-w-md h-auto object-contain rounded-lg 
                                   shadow-2xl shadow-primary/70 transform rotate-x-12"
                    />
                    
                    {/* Subtle Glow/Halo for depth */}
                    <div className="absolute inset-0 m-auto w-48 h-48 bg-primary/20 rounded-full blur-3xl opacity-50 z-[-1]"></div>
                </div>
            </div>
            {/* --- End 3D Element --- */}

            <div className="space-x-4">
                <Link
                    href={register()}
                    className="inline-block px-10 py-3 text-lg font-bold rounded-lg shadow-xl transition transform hover:scale-[1.03]
                               bg-primary text-primary-foreground shadow-primary/60"
                >
                    Get Started Free
                </Link>
                <a
                    href="#about-us" 
                    className="inline-block px-10 py-3 text-lg font-semibold rounded-lg border-2 border-white
                               text-white transition hover:bg-primary/20"
                >
                    Learn More
                </a>
            </div>
        </section>
    </div>
);