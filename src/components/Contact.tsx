"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Briefcase, Mail } from 'lucide-react'

const Contact = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send the form data to a server
        console.log('Form submitted:', { name, email, message })
        // Reset form fields
        setName('')
        setEmail('')
        setMessage('')
    }

    return (
        <section id="contact" className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Contacteer mij</h2>
            <motion.div
                className="bg-accent rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-8">
                        <h3 className="text-2xl font-bold mb-4 text-accent-foreground">Contacteer mij</h3>
                        <p className="mb-6 text-accent-foreground/80">
                            Ik sta open voor samenwerkingen en nieuwe connecties.
                            Vul het formulier in of stuur me een e-mail.
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-accent-foreground/80 mb-1">Naam</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 text-accent-foreground bg-secondary/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-accent-foreground/80 mb-1">E-mail</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 text-accent-foreground bg-secondary/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-sm font-medium text-accent-foreground/80 mb-1">Bericht</label>
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    rows={4}
                                    className="w-full px-3 py-2 text-accent-foreground bg-secondary/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                            >
                                Verstuur
                            </button>
                        </form>
                    </div>
                    <div className="md:w-1/2 bg-accent p-8 flex flex-col justify-center">
                        <div className="mb-8">
                            <h4 className="text-xl font-bold mb-4 text-accent-foreground">Open voor stage</h4>
                            <p className="flex items-center text-accent-foreground/80">
                                <User className="mr-2" size={20} />
                                Ik ben op dit moment op zoek naar stage.
                            </p>
                        </div>
                        <div className="mb-8">
                            <h4 className="text-xl font-bold mb-4 text-accent-foreground">Open voor projecten</h4>
                            <p className="flex items-center text-accent-foreground/80">
                                <Briefcase className="mr-2" size={20} />
                                Ik sta altijd open voor leuke projecten.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold mb-4 text-accent-foreground">E-mail</h4>
                            <p className="flex items-center text-accent-foreground/80">
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