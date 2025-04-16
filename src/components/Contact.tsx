"use client"

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Mail, Briefcase, AlertCircle } from "lucide-react";
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
            const timer = setTimeout(() => setSuccess(null), 2000);
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
                Heb je vragen, een interessant project, of wil je gewoon even kennismaken?<br></br> Stuur me een bericht via het contactformulier of neem contact op via e-mail of sociale media. Ik hoor graag van je!</p>
            <motion.div
                className="bg-card rounded-lg shadow-lg overflow-hidden text-card-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-8">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium mb-1">
                                    Naam
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 text-black bg-gray-50 rounded-md focus:outline-none focus:ring-2 ${errors.name ? "border-2 border-red-500 focus:ring-red-300" : "focus:ring-primary"
                                        }`}
                                    aria-invalid={errors.name ? "true" : "false"}
                                    aria-describedby={errors.name ? "name-error" : undefined}
                                />
                                {errors.name && (
                                    <div id="name-error" className="mt-1 flex items-center text-sm text-red-500">
                                        <AlertCircle className="h-4 w-4 mr-1" />
                                        {errors.name}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium mb-1">
                                    E-mail
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 text-black bg-gray-50 rounded-md focus:outline-none focus:ring-2 ${errors.email ? "border-2 border-red-500 focus:ring-red-300" : "focus:ring-primary"
                                        }`}
                                    aria-invalid={errors.email ? "true" : "false"}
                                    aria-describedby={errors.email ? "email-error" : undefined}
                                />
                                {errors.email && (
                                    <div id="email-error" className="mt-1 flex items-center text-sm text-red-500">
                                        <AlertCircle className="h-4 w-4 mr-1" />
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-sm font-medium mb-1">
                                    Bericht
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className={`w-full px-3 py-2 text-black bg-gray-50 rounded-md focus:outline-none focus:ring-2 ${errors.message ? "border-2 border-red-500 focus:ring-red-300" : "focus:ring-primary"
                                        }`}
                                    aria-invalid={errors.message ? "true" : "false"}
                                    aria-describedby={errors.message ? "message-error" : undefined}
                                ></textarea>
                                {errors.message && (
                                    <div id="message-error" className="mt-1 flex items-center text-sm text-red-500">
                                        <AlertCircle className="h-4 w-4 mr-1" />
                                        {errors.message}
                                    </div>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={isSending}
                                className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSending ? "Versturen..." : "Verstuur"}
                            </button>
                        </form>
                        {success !== null && (
                            <div className={`mt-4 p-3 rounded-md ${success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} flex items-center`}>
                                {success ? (
                                    <>✅ Je bericht is verzonden! Ik neem zo snel mogelijk contact met je op.</>
                                ) : (
                                    <>❌ Er is iets misgegaan. Probeer opnieuw of neem contact op via e-mail.</>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="md:w-1/2 p-8 flex flex-col justify-center">
                        <div className="mb-8">
                            <h4 className="text-xl font-bold mb-4 text-accent-foreground">Stage</h4>
                            <p className="flex flex-wrap items-center text-accent-foreground/80">
                                <Briefcase className="mr-2 flex-shrink-0" size={20} />
                                <span className="whitespace-nowrap">Ik loop momenteel stage bij</span>&nbsp;
                                <a href="https://www.hq-online.nl" className="text-[#ed7100] underline whitespace-nowrap">HQ-Online</a>.
                            </p>
                        </div>
                        <div className="mb-8">
                            <h4 className="text-xl font-bold mb-4 text-accent-foreground">Open voor projecten</h4>
                            <p className="flex items-center text-accent-foreground/80">
                                <Briefcase className="mr-2" size={20} />
                                Ik sta altijd open voor leuke projecten.
                            </p>
                        </div>
                        <div className="mb-8">
                            <h4 className="text-xl font-bold mb-4 text-accent-foreground">E-mail</h4>
                            <a href="mailto:snoeijinkmilan@gmail.com" className="flex items-center hover:text-accent-foreground transition-colors underline">
                                <Mail className="mr-2" size={20} />
                                snoeijinkmilan@gmail.com
                            </a>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold mb-4 text-accent-foreground">Sociale Media</h4>
                            <div className="flex space-x-4">
                                <a
                                    href="https://www.linkedin.com/in/milan-snoeijink-797315292/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent-foreground/80 hover:text-accent-foreground transition-colors"
                                    aria-label="LinkedIn profiel"
                                >
                                    <Linkedin size={24} />
                                </a>
                                <a
                                    href="https://github.com/milansk05"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent-foreground/80 hover:text-accent-foreground transition-colors"
                                    aria-label="GitHub profiel"
                                >
                                    <Github size={24} />
                                </a>
                                <a
                                    href="https://www.instagram.com/milan.sk19/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-accent-foreground transition-colors"
                                    aria-label="Instagram profiel"
                                >
                                    <Instagram size={24} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;