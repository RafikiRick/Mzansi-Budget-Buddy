import { register } from '@/routes';
import { Link } from '@inertiajs/react';
import React from 'react';

const MzansiLogo = "/images/logo.png"; // Placeholder path to your logo

export const HeroSection: React.FC = () => (
    <div className="relative overflow-hidden bg-background py-20 md:py-28">
        
        <div className="max-w-7xl mx-auto px-6">
            <section 
                // Glowing Bounding Box and Hover Effect
                className="relative z-10 p-8 md:p-12 rounded-2xl border-2 border-border bg-card/70 
                           transition duration-300 hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.01]
                           shadow-xl dark:shadow-primary/30 shadow-foreground/40"
            >
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    
                    <div className="md:text-left text-center space-y-6">
                        
                        {/* Gradient Title */}
                        <h2 className="text-5xl md:text-6xl tracking-tight mb-4 font-extrabold 
                                       bg-gradient-to-r from-[#8a2be2] via-[#00c6ff] to-[#4d8f9e] text-transparent bg-clip-text">
                            Get paid early. Save automatically.
                        </h2>
                        
                        <p className="text-xl max-w-lg md:mx-0 mx-auto text-muted-foreground/90">
                            Take control of your money, spending, and savings — the smart, secure, and sophisticated Mzansi way.
                        </p>

                        <div>
                            <Link
                                href={register()}
                                className="inline-block px-10 py-3 text-lg font-bold rounded-lg shadow-xl transition transform hover:scale-[1.03]
                                           bg-primary text-primary-foreground shadow-primary/60"
                            >
                                Get Started Free
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-center items-center relative min-h-[300px]">
                        
                        {/* Circular Logo Container with Glow */}
                        <div className="relative p-2 md:p-4 rounded-full bg-card/70 border border-border 
                                    shadow-2xl shadow-primary/30 transform transition-transform duration-500
                                    flex items-center justify-center overflow-hidden">
                            
                            <img 
                                src={MzansiLogo} 
                                alt="Mzansi Budget Buddy Logo" 
                                className="w-64 h-64 md:w-80 md:h-80 object-contain rounded-full"
                            />
                            
                            <div className="absolute inset-0 m-auto w-48 h-48 bg-primary/20 rounded-full blur-3xl opacity-50 z-[-1]"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
);