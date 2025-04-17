"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Github, Instagram, Linkedin, Mail, Code, ExternalLink } from 'lucide-react'
import { smoothScroll } from '@/utils/smoothScroll'

const ImprovedFooter = () => {
    const currentYear = new Date().getFullYear()

    // Links for footer navigation
    const footerLinks = [
        { name: "Home", href: "/" },
        { name: "Over mij", href: "#overmij", isAnchor: true },
        { name: "Expertise", href: "#expertise", isAnchor: true },
        { name: "Certificaten", href: "#certificaten", isAnchor: true },
        { name: "Portfolio", href: "#portfolio", isAnchor: true },
        { name: "Contact", href: "#contact", isAnchor: true },
        { name: "Changelog", href: "/changelog" }
    ]

    // Social media links
    const socialLinks = [
        { name: "GitHub", href: "https://github.com/milansk05", icon: Github, label: "Bekijk mijn GitHub projecten" },
        { name: "Instagram", href: "https://www.instagram.com/milan.sk19/", icon: Instagram, label: "Volg mij op Instagram" },
        { name: "LinkedIn", href: "https://www.linkedin.com/in/milan-snoeijink-797315292/", icon: Linkedin, label: "Connect met mij op LinkedIn" },
        { name: "Email", href: "mailto:snoeijinkmilan@gmail.com", icon: Mail, label: "Stuur mij een e-mail" }
    ]

    return (
        <footer className="bg-card pt-12 pb-6 mt-10 border-t border-border relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute -left-20 -top-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            <div className="absolute -right-20 bottom-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Column 1: About */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 relative">
                                <Image
                                    src="/favicon.ico"
                                    alt="Logo"
                                    width={40}
                                    height={40}
                                    className="object-contain rounded-full overflow-hidden"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-accent-foreground">Milan Snoeijink</h3>
                        </div>
                        <p className="text-accent-foreground/70 mb-4">
                            Student Software Developer bij Bit Academy Noorderpoort, gepassioneerd over het bouwen van moderne web applicaties.
                        </p>

                        <div className="flex space-x-3 mt-4">
                            {socialLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    target={link.href.startsWith('http') ? "_blank" : ""}
                                    rel={link.href.startsWith('http') ? "noopener noreferrer" : ""}
                                    aria-label={link.label}
                                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                                >
                                    <link.icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                    {/* Column 2: Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-lg font-semibold mb-4 text-accent-foreground">Snelle Links</h3>
                        <ul className="space-y-2">
                            {footerLinks.map((link) => (
                                <li key={link.name}>
                                    {link.isAnchor ? (
                                        <a
                                            href={link.href}
                                            onClick={(e) => smoothScroll(e, link.href.substring(1))}
                                            className="text-accent-foreground/70 hover:text-primary transition-colors flex items-center gap-1"
                                        >
                                            <span className="text-primary text-sm">›</span> {link.name}
                                        </a>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className="text-accent-foreground/70 hover:text-primary transition-colors flex items-center gap-1"
                                        >
                                            <span className="text-primary text-sm">›</span> {link.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Column 3: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-lg font-semibold mb-4 text-accent-foreground">Contact</h3>
                        <div className="space-y-3">
                            <p className="text-accent-foreground/70 flex items-start gap-2">
                                <Mail size={18} className="text-primary mt-1 flex-shrink-0" />
                                <span>snoeijinkmilan@gmail.com</span>
                            </p>

                            <div className="pt-3 border-t border-border">
                                <p className="text-accent-foreground/70 mb-3">Stage bij:</p>
                                <a
                                    href="https://www.hq-online.nl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-accent-foreground hover:text-primary transition-colors group"
                                >
                                    <span className="text-[#ed7100] font-semibold">HQ-Online</span>
                                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Column 4: Newsletter or extra info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-lg font-semibold mb-4 text-accent-foreground">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'].map((tech) => (
                                <span
                                    key={tech}
                                    className="inline-block bg-secondary/60 text-secondary-foreground px-3 py-1 rounded-full text-xs font-medium"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="mt-6 pt-4 border-t border-border">
                            <a
                                href="#contact"
                                onClick={(e) => smoothScroll(e, "contact")}
                                className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                            >
                                <Mail size={16} />
                                <span>Contact opnemen</span>
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Divider */}
                <div className="border-t border-border my-6"></div>

                {/* Bottom section */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm">
                    <p className="text-center md:text-left mb-4 md:mb-0 flex items-center text-accent-foreground/60">
                        © {currentYear} Milan Snoeijink

                        <span className="flex items-center ml-2">
                            <span className="mx-1">|</span>
                        </span>

                        <span
                            className="hidden sm:inline text-xs text-accent-foreground/30 ml-2 cursor-pointer hover:text-accent-foreground/80 transition-colors"
                            title="↑↑↓↓←→←→BA"
                        >
                            🐱
                        </span>
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 text-accent-foreground/60">
                        <a
                            href="https://github.com/milansk05/portfolio-milansnoeijink"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-primary transition-colors"
                        >
                            <Code size={14} />
                            <span>Source Code</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default ImprovedFooter