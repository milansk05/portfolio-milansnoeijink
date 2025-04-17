"use client"

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Mail, Briefcase, AlertCircle, Send, Loader2 } from "lucide-react";
import { Linkedin, Github, Instagram } from "lucide-react";

type FormData = {
    name: string;
    email: string;
    message: string
}

type FormErrors = {
    name?: string;
    email?: string;
    message?: string;
}

const Contact = () => {
    const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
    const [isSending, setIsSending] = useState(false);
    const [success, setSuccess] = useState<boolean | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});

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

        if (!formData.name.trim()) {
            errors.name = "Naam is verplicht";
        }

        if (!formData.email.trim()) {
            errors.email = "E-mail is verplicht";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Voer een geldig e-mailadres in";
        }

        if (!formData.message.trim()) {
            errors.message = "Bericht is verplicht";
        } else if (formData.message.trim().length < 10) {
            errors.message = "Bericht moet minimaal 10 tekens bevatten";
        }

        return errors;
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
                message: formData.message
            };

            const response = await emailjs.send(
                "service_jz42tcr",
                "template_440y3an",
                templateParams,
                "lHmUgT3v2e8-jRgOO"
            );
            console.log("Email sent successfully:", response);
            setSuccess(true);
            setFormData({ name: "", email: "", message: "" });
            setErrors({});
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