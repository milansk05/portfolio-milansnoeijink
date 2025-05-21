"use client"

import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Mail, Briefcase, AlertCircle, Send, Loader2 } from "lucide-react";
import { Linkedin, Github, Instagram } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

type FormData = {
    name: string;
    email: string;
    message: string;
}

type FormErrors = {
    name?: string;
    email?: string;
    message?: string;
    recaptcha?: string;
}

// Lijst met verdachte domein patronen
const SUSPICIOUS_PATTERNS = [
    /^\d+@gmail\.com$/,         // Alleen nummers voor @gmail.com
    /^[a-z]{1,3}\d{4,}@/,       // Korte prefix gevolgd door veel cijfers
    /^temp[._-]?mail/i,         // Tijdelijke mail services
    /^throwaway/i,              // Wegwerp mail services
    /^user\d{5,}@/              // user12345@... patroon
];

// Lijst met gekende problematische domeinen (voorbeeld)
const SUSPICIOUS_DOMAINS = [
    'tempmail.com',
    'mailinator.com',
    'throwawaymail.com',
    'fakeinbox.com',
    'guerrillamail.com',
    'sharklasers.com',
    'yopmail.com'
];

// Discord SVG-pictogram component
const DiscordIcon = ({ className = "", size = 24 }: { className?: string, size?: number }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 50 50"
        fill="currentColor"
        className={className}
    >
        <path d="M 41.625 10.769531 C 37.644531 7.566406 31.347656 7.023438 31.078125 7.003906 C 30.660156 6.96875 30.261719 7.203125 30.089844 7.589844 C 30.074219 7.613281 29.9375 7.929688 29.785156 8.421875 C 32.417969 8.867188 35.652344 9.761719 38.578125 11.578125 C 39.046875 11.867188 39.191406 12.484375 38.902344 12.953125 C 38.710938 13.261719 38.386719 13.429688 38.050781 13.429688 C 37.871094 13.429688 37.6875 13.378906 37.523438 13.277344 C 32.492188 10.15625 26.210938 10 25 10 C 23.789063 10 17.503906 10.15625 12.476563 13.277344 C 12.007813 13.570313 11.390625 13.425781 11.101563 12.957031 C 10.808594 12.484375 10.953125 11.871094 11.421875 11.578125 C 14.347656 9.765625 17.582031 8.867188 20.214844 8.425781 C 20.0625 7.929688 19.925781 7.617188 19.914063 7.589844 C 19.738281 7.203125 19.34375 6.960938 18.921875 7.003906 C 18.652344 7.023438 12.355469 7.566406 8.320313 10.8125 C 6.214844 12.761719 2 24.152344 2 34 C 2 34.175781 2.046875 34.34375 2.132813 34.496094 C 5.039063 39.605469 12.972656 40.941406 14.78125 41 C 14.789063 41 14.800781 41 14.8125 41 C 15.132813 41 15.433594 40.847656 15.621094 40.589844 L 17.449219 38.074219 C 12.515625 36.800781 9.996094 34.636719 9.851563 34.507813 C 9.4375 34.144531 9.398438 33.511719 9.765625 33.097656 C 10.128906 32.683594 10.761719 32.644531 11.175781 33.007813 C 11.234375 33.0625 15.875 37 25 37 C 34.140625 37 38.78125 33.046875 38.828125 33.007813 C 39.242188 32.648438 39.871094 32.683594 40.238281 33.101563 C 40.601563 33.515625 40.5625 34.144531 40.148438 34.507813 C 40.003906 34.636719 37.484375 36.800781 32.550781 38.074219 L 34.378906 40.589844 C 34.566406 40.847656 34.867188 41 35.1875 41 C 35.199219 41 35.210938 41 35.21875 41 C 37.027344 40.941406 44.960938 39.605469 47.867188 34.496094 C 47.953125 34.34375 48 34.175781 48 34 C 48 24.152344 43.785156 12.761719 41.625 10.769531 Z M 18.5 30 C 16.566406 30 15 28.210938 15 26 C 15 23.789063 16.566406 22 18.5 22 C 20.433594 22 22 23.789063 22 26 C 22 28.210938 20.433594 30 18.5 30 Z M 31.5 30 C 29.566406 30 28 28.210938 28 26 C 28 23.789063 29.566406 22 31.5 22 C 33.433594 22 35 23.789063 35 26 C 35 28.210938 33.433594 30 31.5 30 Z"></path>
    </svg>
);

const Contact = () => {
    const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
    const [isSending, setIsSending] = useState(false);
    const [success, setSuccess] = useState<boolean | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    useEffect(() => {
        if (success !== null) {
            const timer = setTimeout(() => setSuccess(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Wis de fout als de gebruiker begint te typen
        if (errors[name as keyof FormErrors]) {
            setErrors({ ...errors, [name]: undefined });
        }
    };

    const validateForm = (): FormErrors => {
        const errors: FormErrors = {};

        // Naam validatie
        if (!formData.name.trim()) {
            errors.name = "Naam is verplicht";
        } else if (formData.name.trim().length < 2) {
            errors.name = "Voer een geldige naam in";
        }

        // E-mail validatie (meerdere stappen)
        if (!formData.email.trim()) {
            errors.email = "E-mail is verplicht";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Voer een geldig e-mailadres in";
        } else {
            // Check verdachte patronen
            const domain = formData.email.split('@')[1].toLowerCase();
            const isSuspiciousPattern = SUSPICIOUS_PATTERNS.some(pattern =>
                pattern.test(formData.email.toLowerCase())
            );
            const isSuspiciousDomain = SUSPICIOUS_DOMAINS.includes(domain);

            if (isSuspiciousPattern || isSuspiciousDomain) {
                errors.email = "Dit e-mailadres lijkt niet geldig. Gebruik een persoonlijk of zakelijk e-mailadres.";
            }
        }

        // Bericht validatie
        if (!formData.message.trim()) {
            errors.message = "Bericht is verplicht";
        } else if (formData.message.trim().length < 10) {
            errors.message = "Bericht moet minimaal 10 tekens bevatten";
        }

        // reCAPTCHA validatie
        if (!recaptchaToken) {
            errors.recaptcha = "Bevestig dat je geen robot bent";
        }

        return errors;
    };

    const handleRecaptchaChange = (token: string | null) => {
        setRecaptchaToken(token);
        if (errors.recaptcha) {
            setErrors(prev => ({ ...prev, recaptcha: undefined }));
        }
    };

    const handleRecaptchaExpired = () => {
        setRecaptchaToken(null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSending(true);

        try {
            const templateParams = {
                name: formData.name,
                email: formData.email,
                message: formData.message,
                'g-recaptcha-response': recaptchaToken
            };

            const response = await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
                templateParams,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
            );
            console.log("Email sent successfully:", response);
            setSuccess(true);
            setFormData({ name: "", email: "", message: "" });
            setErrors({});
            setRecaptchaToken(null);

            // Reset reCAPTCHA
            if (recaptchaRef.current) {
                recaptchaRef.current.reset();
            }
        } catch (error) {
            setSuccess(false);
            console.error("Error sending email:", error);
        }

        setIsSending(false);
    };

    return (
        <section id="contact" className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-2 text-foreground">Contacteer mij</h2>
            <p className="text-center text-muted-foreground mb-8">
                Heb je vragen, een interessant project, of wil je gewoon even kennismaken?<br />
                Stuur me een bericht via het contactformulier of neem contact op via e-mail of sociale media.
            </p>

            <motion.div
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <div className="bg-card rounded-lg shadow-lg p-6 text-card-foreground">
                            <h3 className="text-xl font-bold mb-6 text-accent-foreground border-b pb-2">Stuur een bericht</h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-1 text-accent-foreground">
                                        Naam
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 text-black ${errors.name
                                            ? "border-red-500 focus:ring-red-200"
                                            : "border-secondary focus:ring-primary/30"
                                            }`}
                                        placeholder="Jouw naam"
                                        aria-invalid={errors.name ? "true" : "false"}
                                        aria-describedby={errors.name ? "name-error" : undefined}
                                    />
                                    {errors.name && (
                                        <div id="name-error" className="mt-1 flex items-center text-sm text-red-500">
                                            <AlertCircle className="h-3 w-3 mr-1" />
                                            {errors.name}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-1 text-accent-foreground">
                                        E-mail
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 text-black ${errors.email
                                            ? "border-red-500 focus:ring-red-200"
                                            : "border-secondary focus:ring-primary/30"
                                            }`}
                                        placeholder="jouw@email.nl"
                                        aria-invalid={errors.email ? "true" : "false"}
                                        aria-describedby={errors.email ? "email-error" : undefined}
                                    />
                                    {errors.email && (
                                        <div id="email-error" className="mt-1 flex items-center text-sm text-red-500">
                                            <AlertCircle className="h-3 w-3 mr-1" />
                                            {errors.email}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-1 text-accent-foreground">
                                        Bericht
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 text-black ${errors.message
                                            ? "border-red-500 focus:ring-red-200"
                                            : "border-secondary focus:ring-primary/30"
                                            }`}
                                        placeholder="Jouw bericht hier..."
                                        aria-invalid={errors.message ? "true" : "false"}
                                        aria-describedby={errors.message ? "message-error" : undefined}
                                    ></textarea>
                                    {errors.message && (
                                        <div id="message-error" className="mt-1 flex items-center text-sm text-red-500">
                                            <AlertCircle className="h-3 w-3 mr-1" />
                                            {errors.message}
                                        </div>
                                    )}
                                </div>

                                {/* reCAPTCHA component */}
                                <div className="mt-4">
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                                        onChange={handleRecaptchaChange}
                                        onExpired={handleRecaptchaExpired}
                                        className="transform scale-90 origin-left"
                                    />
                                    {errors.recaptcha && (
                                        <div className="mt-1 flex items-center text-sm text-red-500">
                                            <AlertCircle className="h-3 w-3 mr-1" />
                                            {errors.recaptcha}
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSending}
                                    className="w-full mt-4 bg-primary text-primary-foreground px-4 py-3 rounded-md hover:bg-primary/90 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSending ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            <span>Versturen...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            <span>Verstuur bericht</span>
                                        </>
                                    )}
                                </button>

                                {success !== null && (
                                    <motion.div
                                        className={`mt-4 p-4 rounded-md ${success
                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                            } flex items-center`}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        {success ? (
                                            <>✅ Je bericht is verzonden! Ik neem zo snel mogelijk contact met je op.</>
                                        ) : (
                                            <>❌ Er is iets misgegaan. Probeer opnieuw of neem contact op via e-mail.</>
                                        )}
                                    </motion.div>
                                )}
                            </form>
                        </div>
                    </div>

                    <div className="md:col-span-1">
                        <div className="bg-card rounded-lg shadow-lg p-6 h-full text-card-foreground">
                            <h3 className="text-xl font-bold mb-6 text-accent-foreground border-b pb-2">Contact Info</h3>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-lg font-semibold mb-2 text-accent-foreground flex items-center">
                                        <Briefcase className="mr-2" size={18} />
                                        Stage
                                    </h4>
                                    <p className="text-accent-foreground/80 ml-6">
                                        Ik loop momenteel stage bij <a href="https://www.hq-online.nl" className="text-[#ed7100] hover:underline">HQ-Online</a>.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold mb-2 text-accent-foreground flex items-center">
                                        <Mail className="mr-2" size={18} />
                                        E-mail
                                    </h4>
                                    <a
                                        href="mailto:snoeijinkmilan@gmail.com"
                                        className="text-accent-foreground/80 hover:text-accent-foreground transition-colors hover:underline ml-6"
                                    >
                                        snoeijinkmilan@gmail.com
                                    </a>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold mb-3 text-accent-foreground">
                                        Sociale Media
                                    </h4>
                                    <div className="flex space-x-4 ml-6">
                                        <a
                                            href="https://www.linkedin.com/in/milan-snoeijink-797315292/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-secondary p-2 rounded-full text-accent-foreground/80 hover:text-accent-foreground hover:bg-secondary/70 transition-colors"
                                            aria-label="LinkedIn profiel"
                                        >
                                            <Linkedin size={20} />
                                        </a>
                                        <a
                                            href="https://github.com/milansk05"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-secondary p-2 rounded-full text-accent-foreground/80 hover:text-accent-foreground hover:bg-secondary/70 transition-colors"
                                            aria-label="GitHub profiel"
                                        >
                                            <Github size={20} />
                                        </a>
                                        <a
                                            href="https://www.instagram.com/milan.sk19/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-secondary p-2 rounded-full text-accent-foreground/80 hover:text-accent-foreground hover:bg-secondary/70 transition-colors"
                                            aria-label="Instagram profiel"
                                        >
                                            <Instagram size={20} />
                                        </a>
                                        <a
                                            href="https://discord.com/users/mrllama."
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-secondary p-2 rounded-full text-accent-foreground/80 hover:text-accent-foreground hover:bg-secondary/70 transition-colors"
                                            aria-label="Discord profiel"
                                        >
                                            <DiscordIcon size={20} />
                                        </a>
                                    </div>
                                </div>

                                <div className="pt-4 border-t">
                                    <p className="text-accent-foreground/80 italic">
                                        Ik sta altijd open voor interessante projecten en nieuwe samenwerkingen!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;