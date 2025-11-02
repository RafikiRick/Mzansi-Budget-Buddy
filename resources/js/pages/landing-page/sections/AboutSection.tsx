import { Link } from '@inertiajs/react';
import React from 'react';

const MeerkatImage = "../images/mascot2.png"; 

export const AboutSection: React.FC = () => (
    <div className="bg-background py-20">
        
        <div className="max-w-7xl mx-auto px-6">
            <section 
                id="about-us" 
                // Glowing Bounding Box and Hover Effect
                className="relative z-10 p-8 md:p-12 rounded-2xl border-2 border-border bg-card/70 
                           transition duration-300 hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.01]
                           shadow-xl dark:shadow-primary/30 shadow-foreground/40
                           flex flex-col md:flex-row items-center justify-between gap-12"
            >
                
                <div className="md:w-1/2 text-center md:text-left space-y-6">
                    <h2 className="text-4xl font-extrabold text-foreground">
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
                        className="max-w-xs md:max-w-sm lg:max-w-md h-auto"
                    />
                </div>
            </section>
        </div>
    </div>
);