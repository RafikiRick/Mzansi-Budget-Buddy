import React from 'react';

// Define the steps specific to Mzansi Budget Buddy
const steps = [
    {
        number: 1,
        title: "Create Your Account",
        description: "Sign up is quick and secure. Set up your Mzansi Budget Buddy profile from any device in under 5 minutes."
    },
    {
        number: 2,
        title: "Connect & Track",
        description: "Securely link your bank accounts to instantly track your ZAR spending and start seeing local insights."
    },
    {
        number: 3,
        title: "Save & Compare",
        description: "Activate your Savings Goal tracker and use the Local Price Comparison tool to start maximizing your Rand immediately."
    }
];

export const ProcessSection: React.FC = () => (
    // This section uses the main background color for a contrasting break
    <div className="bg-background py-16">
        
        {/* Main content container and positioning */}
        <div className="max-w-4xl mx-auto px-6">
            
            {/* The main card container matching the Finpay style (dark card on a lighter/dark background) */}
            <div 
                // Note: The contrasting bg-card/70 on bg-background provides a great visual break,
                // and the shadow ensures the "glow" effect in both light and dark modes.
                className="p-8 md:p-12 rounded-2xl bg-card/70 border border-border shadow-2xl shadow-primary/30"
            >
                
                {/* Title */}
                <h3 className="text-3xl font-extrabold text-foreground mb-10 text-center">
                    Maximize your Rand with 3 simple steps.
                </h3>

                {/* Steps Grid */}
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {steps.map((step) => (
                        <div key={step.number} className="space-y-4">
                            
                            {/* Step Number: Large, bold, and accented with primary color */}
                            <div className="flex justify-center mb-4">
                                <div className="text-3xl font-extrabold text-primary border-b-2 border-primary pb-1">
                                    {step.number}
                                </div>
                            </div>
                            
                            {/* Step Title: Sub-heading style */}
                            <h4 className="text-lg font-semibold text-foreground">{step.title}</h4>
                            
                            {/* Step Description: Muted text */}
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    </div>
);