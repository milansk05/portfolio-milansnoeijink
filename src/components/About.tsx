"use client"

import { motion } from "framer-motion"

const About = () => {
    return (
        <motion.section
            id="overmij"
            className="mb-20 p-10 bg-accent rounded-lg shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <h2 className="text-3xl font-bold text-center mb-8 text-accent-foreground">Over mij</h2>
            <p className="text-accent-foreground max-w-2xl mx-auto text-center">
                Hey! Ik ben Milan Snoeijink, een gedreven derdejaars student Software Development aan de Bit Academy in
                Groningen. Mijn passie ligt bij het ontwikkelen van efficiënte, creatieve oplossingen voor complexe problemen.
                In mijn tijd bij de Bit Academy heb ik aan diverse uitdagende projecten gewerkt, waardoor ik een brede kennis
                heb opgebouwd in verschillende programmeertalen en frameworks. Ik vind het geweldig om nieuwe technologieën te
                verkennen en toe te passen in mijn projecten. Naast mijn studie ben ik altijd op zoek naar kansen om mijn
                vaardigheden verder te ontwikkelen en bij te dragen aan innovatieve projecten. Heb je een interessant project of
                wil je gewoon eens van gedachten wisselen over tech? Neem gerust contact met me op!
            </p>
        </motion.section>
    )
}

export default About