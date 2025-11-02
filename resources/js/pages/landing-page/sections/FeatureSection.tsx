import React from 'react';
import { TrendingUp, Goal, ShoppingCart } from 'lucide-react';
import { FeatureCard } from '../components/FeatureCard'; // Assumes FeatureCard.tsx is saved

const topFeatures = [
    {
        icon: TrendingUp, 
        title: "Track Your Spending - Local Context", 
        description: "Our intelligent tracker automatically categorizes expenses in ZAR, recognizing local vendors and offering unique categories like 'Spaza Shop', 'Eskom Bills', and 'Taxi Fare' for a true Mzansi financial snapshot."
    },
    {
        icon: Goal, 
        title: "Set and Smash Savings Goals", 
        description: "Define achievable goals—from 'R5k for December trip' to 'New Laptop Fund'—and use our progress visualization to stay motivated. We help you automate transfers to hit targets faster."
    },
    {
        icon: ShoppingCart, 
        title: "Local Price Compare Tool", 
        description: "Save on essentials with our real-time comparison tool. See which major retailers (Shoprite, Checkers, PnP, and Woolies) offer the best prices before you shop, ensuring you stretch every Rand."
    }
];

export const FeatureSection: React.FC = () => (
    <div 
        id="features" 
        className="bg-background py-20"
    >
        <div className="max-w-7xl mx-auto px-6">
            <section 
                // Glowing Bounding Box and Hover Effect
                className="relative z-10 p-10 rounded-2xl border-2 border-border bg-card/70 
                           transition duration-300 hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.01]
                           shadow-xl dark:shadow-primary/30 shadow-foreground/40"
            >
                
                {/* Two-Column Header Layout */}
                <div className="grid md:grid-cols-2 gap-8 mb-16 items-start">
                    
                    <div className="text-left">
                        <h2 className="text-5xl font-extrabold text-foreground tracking-tight">
                            Budgeting, simplified for you!
                        </h2>
                    </div>
                    
                    <div className="text-left pt-2">
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                            Manage your finances and save smarter with local tools designed to help Mzansi families thrive.
                        </p>
                    </div>
                </div>
                
                {/* Feature Cards Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {topFeatures.map((feature, index) => (
                        <FeatureCard 
                            key={index}
                            icon={feature.icon} 
                            title={feature.title} 
                            description={feature.description}
                        />
                    ))}
                </div>
            </section>
        </div>
    </div>
);