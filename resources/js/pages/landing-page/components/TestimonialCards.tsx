import React from 'react';

interface TestimonialCardProps {
    quote: string;
    name: string;
    location: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, location }) => (
    // Clean, inverse card style
    <div className="p-6 bg-card rounded-xl border border-border shadow-md transition hover:shadow-primary/20">
        
        {/* Quote */}
        <p className="text-lg italic text-foreground mb-4 leading-relaxed">
            "**{quote}**"
        </p>
        
        {/* Author */}
        <div className="text-sm font-semibold text-primary">
            {name}
        </div>
        <div className="text-xs text-muted-foreground">
            {location}
        </div>
    </div>
);