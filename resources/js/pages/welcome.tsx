import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react'; 

// --- Theme Hook for Dark Mode Toggle (Defined here for single file) ---

const useTheme = () => {
    const [theme, setTheme] = React.useState<'light' | 'dark' | 'system'>(() => {
        if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
            return localStorage.getItem('theme') as 'light' | 'dark';
        }
        return 'system';
    });

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    React.useEffect(() => {
        const isDark = 
            theme === 'dark' || 
            (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return { theme, toggleTheme };
}


// --- Helper Components Defined Inside Welcome ---

// 1. Feature Card Component 
const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
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

// 2. Testimonial Card Component
const TestimonialCard: React.FC<{ quote: string; name: string; location: string }> = ({ quote, name, location }) => (
    <div className="p-6 rounded-lg shadow-md border-l-4 border-primary
                    bg-card">
        <blockquote className="italic text-muted-foreground">
            "{quote}"
        </blockquote>
        <p className="mt-4 font-semibold text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">{location}</p>
    </div>
);

// 3. About Section Component
const MeerkatImage = "../images/mascot2.png"; 

const AboutSection: React.FC = () => (
    <section id="about-us" className="py-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 bg-card rounded-xl shadow-xl border border-border">
        
        <div className="md:w-1/2 text-center md:text-left space-y-6">
            <h2 className="text-4xl font-extrabold text-foreground font-cravelo">
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
                className="max-w-xs md:max-w-sm lg:max-w-md h-auto animate-float"
            />
        </div>
    </section>
);


// 4. Contact Section Component
const ContactImage = "../images/mascot1.png"; 

const ContactSection: React.FC = () => {
    const [status, setStatus] = useState<'' | 'success' | 'error'>('');
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({ name: '', email: '', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = { name: '', email: '', message: '' };

        if (!form.name.trim()) { newErrors.name = 'Name is required.'; valid = false; }
        if (!form.email || !form.email.includes('@')) { newErrors.email = 'Valid email is required.'; valid = false; } 
        if (form.message.length < 10) { newErrors.message = 'Message must be at least 10 characters.'; valid = false; }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            setStatus('error');
            document.getElementById('contact-status')?.scrollIntoView({ behavior: 'smooth' }); 
            return;
        }
        
        console.log('Submitting form:', form);
        
        setTimeout(() => {
            setStatus('success');
            setForm({ name: '', email: '', message: '' });
        }, 500);
    };

    return (
        <section id="contact" className="py-20 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-foreground font-cravelo">
                    Get In Touch!
                </h2>
                <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                    Have a question, suggestion, or just want to say hello? We'd love to hear from you.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start bg-card p-10 rounded-xl shadow-2xl border border-border">
                
                {/* Left Side: Static Image (Masot2) */}
                <div className="w-full md:w-1/4 flex flex-col items-center justify-center p-4">
                    <div className="bg-transparent rounded-lg">
                         <img 
                            src={ContactImage} 
                            alt="Mzansi Budget Buddy Mascot" 
                            className="max-w-full h-auto max-h-60 object-contain" 
                        />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground text-center hidden md:block">
                        Need help with your budget? Contact us!
                    </p>
                </div>

                {/* Right Side: Contact Form */}
                <div className="w-full md:w-3/4 space-y-6"> 
                    <h3 className="text-2xl font-bold text-foreground font-cravelo">Send us a quick message</h3>

                    <div id="contact-status">
                        {status === 'success' && (
                            <div className="p-4 text-sm font-medium rounded-lg bg-secondary/20 text-secondary-foreground border border-secondary">
                                Success! Your message has been received and we will be in touch soon.
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="p-4 text-sm font-medium rounded-lg bg-destructive/10 text-destructive border border-destructive">
                                Error: Please correct the fields highlighted in red before submitting.
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* NAME */}
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={form.name}
                                onChange={handleChange}
                                className={`w-full p-3 rounded-lg border-input bg-background focus:ring-2 focus:ring-primary focus:border-primary ${errors.name ? 'border-destructive' : 'border-border'}`}
                            />
                            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                        </div>
                        
                        {/* EMAIL */}
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email Address"
                                value={form.email}
                                onChange={handleChange}
                                className={`w-full p-3 rounded-lg border-input bg-background focus:ring-2 focus:ring-primary focus:border-primary ${errors.email ? 'border-destructive' : 'border-border'}`}
                            />
                            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                        </div>

                        {/* MESSAGE */}
                        <div>
                            <textarea
                                name="message"
                                placeholder="Your Message (min 10 characters)"
                                value={form.message}
                                onChange={handleChange}
                                rows={5}
                                className={`w-full p-3 rounded-lg border-input bg-background focus:ring-2 focus:ring-primary focus:border-primary resize-none ${errors.message ? 'border-destructive' : 'border-border'}`}
                            ></textarea>
                            {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                        </div>
                        
                        {/* BUTTON */}
                        <button
                            type="submit"
                            className="w-full px-6 py-3 text-lg font-bold rounded-lg shadow-md transition
                                       bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};


// --- Main Welcome Component ---

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;
    const { theme, toggleTheme } = useTheme(); 
    const BackgroundImage = "/images/green.png"; 
    const PastelBackground = "/images/pastel.jpg"; 

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,600,700,800"
                    rel="stylesheet"
                />
            </Head>
            
            <div className="min-h-screen font-sans">
                
                {/* 1. HEADER (Navigation Bar) */}
                <header className="sticky top-0 z-10 w-full px-6 py-4 border-b border-border bg-background/95 backdrop-blur-sm">
                    <nav className="flex items-center justify-between mx-auto max-w-7xl">
                        
                        {/* Logo/Name */}
                        <h1 className="text-3xl font-extrabold text-primary font-cravelo">
                            Mzansi Budget Buddy
                        </h1>
                        
                        {/* Auth Links & Toggle */}
                        <div className='flex items-center gap-4'>
                            {/* Theme Toggle Button */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full text-foreground/70 hover:bg-secondary transition"
                                aria-label="Toggle Dark Mode"
                            >
                                {theme === 'dark' ? (
                                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                ) : (
                                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                                )}
                            </button>
                            
                            {/* Auth Links */}
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="px-5 py-2 text-sm font-semibold rounded-lg bg-secondary text-secondary-foreground hover:bg-muted transition"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="px-5 py-2 text-sm font-semibold rounded-lg hover:bg-secondary transition text-secondary-foreground"
                                    >
                                        Log in
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="px-6 py-2 text-sm font-bold rounded-lg shadow-lg transition transform hover:scale-[1.03]
                                                       bg-primary text-primary-foreground shadow-primary/50"
                                        >
                                            Sign Up Free
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <main>
                    {/* 2. HERO SECTION - UPDATED FOR 3D GOLD CARD EFFECT */}
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

                    {/* 3. ABOUT SECTION */}
                    <AboutSection /> 

                    {/* 4. FEATURE SECTION (BUDGETING SIMPLIFIED) - WITH PASTEL BACKGROUND */}
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
                    
                    {/* 5. CONTACT SECTION */}
                    <ContactSection />
                    
                    {/* 6. TESTIMONIAL/CALLOUT SECTION - WITH PASTEL BACKGROUND */}
                    <div 
                        className="relative overflow-hidden bg-cover bg-center py-20"
                        style={{ backgroundImage: `url(${PastelBackground})` }}
                    >
                         <section className="px-6 max-w-7xl mx-auto relative z-10 border-t border-b border-border">
                            <h2 className="text-3xl font-bold text-center mb-10 text-foreground font-cravelo">
                                Loved by Money-Smart South Africans
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <TestimonialCard quote="This app is a game-changer! I finally know where my money is going each month. The local price comparison is brilliant." name="Thabo" location="Cape Town"/>
                                <TestimonialCard quote="I've saved R300 on my weekly Checkers trip thanks to the price tool. Simple to use and genuinely helpful." name="Palesa" location="Johannesburg"/>
                                <TestimonialCard quote="The savings goals feature with the progress bar actually makes me excited to save. A real win for Mzansi!" name="Sipho" location="Durban"/>
                            </div>
                         </section>
                    </div>

                </main>

                {/* 7. FOOTER */}
                <footer className="py-10 px-6 border-t border-border bg-background">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                        <p>&copy; {new Date().getFullYear()} Mzansi Budget Buddy. All rights reserved.</p>
                        <div className="mt-4 md:mt-0 space-x-6">
                            <a href="#about-us" className="hover:text-primary">About Us</a>
                            <a href="#contact" className="hover:text-primary">Contact</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}