import React, { useState } from 'react';

const ContactImage = "../images/mascot1.png"; 

export const ContactSection: React.FC = () => {
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
        
        // Simulating API call
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