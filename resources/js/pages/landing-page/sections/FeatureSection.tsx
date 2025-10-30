import React from 'react';
import { FeatureCard } from '../components/FeatureCard';

const PastelBackground = "/images/pastel.jpg"; 

export const FeatureSection: React.FC = () => (
    <div 
        className="relative overflow-hidden bg-cover bg-center py-20"
        style={{ backgroundImage: `url(${PastelBackground})` }}
    >
        {/* Inner Container for Content */}
        <section className="px-6 max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-foreground font-cravelo">
                    Budgeting, simplified for you!
                </h2>
                <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                    Manage your finances and save smarter with local tools.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard icon="📈" title="Track Your Spending - Local Context" description="Easily log expenses in ZAR with categories tailored for SA: Taxi Fare, Spaza Shop, and Eskom Bills."/>
                <FeatureCard icon="💰" title="Set and Smash Savings Goals" description="Define goals (e.g., 'R5k for December trip'), visualize progress, and stay motivated."/>
                <FeatureCard icon="🛒" title="Local Price Compare Tool" description="Find the best deals on essentials across Shoprite, Checkers, PnP, and Woolies."/>
                <FeatureCard icon="⛽" title="Fuel & Data Alerts" description="Receive timely updates on petrol/diesel prices and data bundle specials."/>
                <FeatureCard icon="💡" title="Loadshedding Cost Tracker" description="Monitor the true monthly cost of generators, gas, and inverter usage due to power cuts."/>
                <FeatureCard icon="🤖" title="AI-Powered Insights" description="Get personalized, actionable tips on where to cut costs based on your Mzansi spending."/>
            </div>
        </section>
    </div>
);