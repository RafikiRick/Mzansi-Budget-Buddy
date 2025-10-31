import React from 'react';

// 1. Feature Card Component 
export const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="p-6 space-y-3 rounded-xl transition-all duration-300
                    bg-card text-card-foreground
                    shadow-2xl shadow-foreground/10 dark:shadow-black/30 
                    hover:shadow-3xl hover:shadow-primary/20 hover:scale-[1.02] border border-border">
        <div className="p-3 inline-block rounded-full bg-secondary">
            <span className="text-2xl text-secondary-foreground">
                {icon}
            </span>
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
    </div>
);