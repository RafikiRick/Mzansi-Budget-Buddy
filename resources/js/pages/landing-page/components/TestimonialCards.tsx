import React from 'react';

// 2. Testimonial Card Component
export const TestimonialCard: React.FC<{ quote: string; name: string; location: string }> = ({ quote, name, location }) => (
    <div className="p-6 rounded-lg shadow-md border-l-4 border-primary
                    bg-card">
        <blockquote className="italic text-muted-foreground">
            "{quote}"
        </blockquote>
        <p className="mt-4 font-semibold text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">{location}</p>
    </div>
);