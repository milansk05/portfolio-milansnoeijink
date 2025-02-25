"use client"

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion";
import { Mail, Briefcase } from "lucide-react";
import { Linkedin, Github, Instagram } from "lucide-react";

const Contact = () => {
    const [formData, setFormData] = useState<{ name: string; email: string; message: string }>({ name: "", email: "", message: "" });
    const [isSending, setIsSending] = useState(false);
    const [success, setSuccess] = useState<boolean | null>(null);
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);

    useEffect(() => {
        if (success !== null) {
            const timer = setTimeout(() => setSuccess(null), 2000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!captchaValue) {
            setSuccess(false);
            return;
        }

        setIsSending(true);

        const templateParams = {
            to_name: "Milan Snoeijink",
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
        };

        try {
            const response = await emailjs.send(
                "service_jz42tcr",
                "template_440y3an",
                templateParams,
                "lHmUgT3v2e8-jRgOO"
            );
            console.log("Email sent successfully:", response);
            setSuccess(true);
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            setSuccess(false);
            console.error("Error sending email:", error);
        }

        setIsSending(false);
    };

    return (
        <section id="contact" className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-2 text-foreground">Contacteer mij</h2>
            <p className="text-center text-muted-foreground mb-8">Vul het onderstaande formulier in om mij een bericht te sturen.</p>
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
                                <label htmlFor="name" className="block text-sm font-medium text-accent-foreground/80 mb-1">
                                    Naam *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 text-black bg-secondary/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-accent-foreground/80 mb-1">
                                    E-mail *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 text-black bg-secondary/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-sm font-medium text-accent-foreground/80 mb-1">
                                    Bericht *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    required
                                    className="w-full px-3 py-2 text-black bg-secondary/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                ></textarea>
                            </div>
                            <div className="mb-4 flex justify-center">
                                <ReCAPTCHA
                                    sitekey="6LexVeIqAAAAAPT7AN9EtTrEphdGbYjfRBzGAnNi"
                                    onChange={(value) => setCaptchaValue(value)}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSending}
                                className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-80 transition"
                            >
                                {isSending ? "Versturen..." : "Verstuur"}
                            </button>
                        </form>
                    </div>
                    <div className="md:w-1/2 p-8 flex flex-col justify-center">
                        <div className="mb-8">
                            <h4 className="text-xl font-bold mb-4 text-accent-foreground">Stage</h4>
                            <p className="flex flex-wrap items-center text-accent-foreground/80">
                                <Briefcase className="mr-2 flex-shrink-0" size={20} />
                                <span className="whitespace-nowrap">Ik loop momenteel stage bij</span>&nbsp;
                                <a href="https://www.hq-online.nl" className="text-[#ed7100] hover:underline whitespace-nowrap">HQ-Online</a>.
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
                            <a href="mailto:snoeijinkmilan@gmail.com" className="flex items-center hover:text-accent-foreground transition-colors hover:underline">
                                <Mail className="mr-2" size={20} />
                                snoeijinkmilan@gmail.com
                            </a>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold mb-4 text-accent-foreground">Sociale Media</h4>
                            <div className="flex space-x-4">
                                <a href="https://www.linkedin.com/in/milan-snoeijink-797315292/" target="_blank" rel="noopener noreferrer" className="text-accent-foreground/80 hover:text-accent-foreground transition-colors">
                                    <Linkedin size={24} />
                                </a>
                                <a href="https://github.com/milansk05" target="_blank" rel="noopener noreferrer" className="text-accent-foreground/80 hover:text-accent-foreground transition-colors">
                                    <Github size={24} />
                                </a>
                                <a href="https://www.instagram.com/milan.sk19/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-foreground transition-colors">
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