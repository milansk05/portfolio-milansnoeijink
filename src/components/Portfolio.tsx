"use client"

import { motion } from "framer-motion"

const Portfolio = () => {
    return (
        <section id="portfolio" className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Mijn portfolio</h2>
            <motion.div
                className="bg-accent rounded-lg shadow-lg p-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h3 className="text-xl font-semibold mb-4 text-accent-foreground">Projecten komen binnenkort</h3>
                <p className="text-accent-foreground/80 mb-6">
                    Ik ben momenteel bezig met het ontwikkelen van nieuwe projecten. Kom binnenkort terug om mijn laatste werk te
                    bekijken!
                </p>
                <a
                    href="https://github.com/milansk05"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-colors inline-block"
                >
                    Bezoek mijn GitHub
                </a>
            </motion.div>
        </section>
    )
}

export default Portfolio