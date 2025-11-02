import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
    // Clean, high-contrast card style
    <div className="p-6 bg-card rounded-xl border border-border shadow-md transition hover:shadow-primary/20">
        
        {/* Icon: Primary color accent */}
        <div className="mb-4">
            <Icon className="w-8 h-8 text-primary" />
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
        
        {/* Description */}
        <p className="text-muted-foreground">{description}</p>
    </div>
);