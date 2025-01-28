"use client"

import { motion } from "framer-motion"
import { Briefcase, Mail } from "lucide-react"

const Contact = () => {
    return (
        <section id="contact" className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Contacteer mij</h2>
            <motion.div
                className="bg-card rounded-lg shadow-lg overflow-hidden text-card-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-8">
                        <h3 className="text-2xl font-bold mb-4 text-accent-foreground">Contacteer mij</h3>
                        <p className="mb-6 text-accent-foreground/80">
                            Het contactformulier is momenteel niet beschikbaar. U kunt mij bereiken via het e-mailadres hiernaast.
                        </p>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-accent-foreground/80 mb-1">
                                    Naam
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    disabled
                                    className="w-full px-3 py-2 text-accent-foreground bg-secondary/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary cursor-not-allowed opacity-50"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-accent-foreground/80 mb-1">
                                    E-mail
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    disabled
                                    className="w-full px-3 py-2 text-accent-foreground bg-secondary/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary cursor-not-allowed opacity-50"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-sm font-medium text-accent-foreground/80 mb-1">
                                    Bericht
                                </label>
                                <textarea
                                    id="message"
                                    disabled
                                    rows={4}
                                    className="w-full px-3 py-2 text-accent-foreground bg-secondary/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary cursor-not-allowed opacity-50"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled
                                className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md opacity-50 cursor-not-allowed"
                            >
                                Verstuur
                            </button>
                        </form>
                    </div>
                    <div className="md:w-1/2 p-8 flex flex-col justify-center">
                        <div className="mb-8">
                            <h4 className="text-xl font-bold mb-4 text-accent-foreground">Stage bij HQ-Online</h4>
                            <p className="flex items-center text-secondary">
                                <Briefcase className="mr-2" size={20} />
                                Ik loop momenteel stage bij HQ-Online.
                            </p>
                        </div>
                        <div className="mb-8">
                            <h4 className="text-xl font-bold mb-4 text-accent-foreground">Open voor projecten</h4>
                            <p className="flex items-center text-secondary">
                                <Briefcase className="mr-2" size={20} />
                                Ik sta altijd open voor leuke projecten.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold mb-4 text-accent-foreground">E-mail</h4>
                            <p className="flex items-center">
                                <Mail className="mr-2" size={20} />
                                snoeijinkmilan@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default Contact