"use client"

import { motion } from "framer-motion"
import { Briefcase, Palette, Smartphone, Brain } from "lucide-react"

const expertiseItems = [
    {
        title: "Projectmanagement",
        description:
            "Met drie jaar ervaring in softwareontwikkeling weet ik hoe belangrijk een goed georganiseerd project is. Ik zorg voor structuur, heldere taakverdeling en strakke deadlines. Dit resulteert in efficiënte workflows en succesvolle projecten.",
        icon: Briefcase,
    },
    {
        title: "Creatief probleemoplossen",
        description:
            "Ik ben gedreven om complexe problemen op een innovatieve manier aan te pakken. Door strategisch en out-of-the-box te denken, ontwikkel ik slimme en efficiënte oplossingen die echt impact maken.",
        icon: Palette,
    },
    {
        title: "UI & UX Design",
        description:
            "Een intuïtieve en aantrekkelijke interface is essentieel voor een sterke gebruikerservaring. Ik ontwerp visueel aantrekkelijke en gebruiksvriendelijke interfaces die naadloos aansluiten op de behoeften van de gebruiker.",
        icon: Smartphone,
    },
    {
        title: "Analytisch denken",
        description:
            "Sterk analytisch vermogen helpt mij om complexe vraagstukken te doorgronden en logische, doordachte oplossingen te bieden. Ik breek problemen af in behapbare stappen en kies de meest efficiënte route naar een werkend eindresultaat.",
        icon: Brain,
    },
]

const Expertise = () => {
    return (
        <section id="expertise" className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-2 text-foreground">Mijn expertise</h2>
            <p className="text-center text-muted-foreground mb-8">Bekijk hier mijn expertise op het gebied van projectmanagement, design en probleemoplossing.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {expertiseItems.map((item, index) => (
                    <motion.div
                        key={item.title}
                        className="bg-card rounded-lg shadow-lg p-6 text-card-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <item.icon className="w-12 h-12 mb-4 text-primary" />
                        <h3 className="text-xl font-bold mb-2 text-accent-foreground">{item.title}</h3>
                        <p className="text-accent-foreground/80">{item.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default Expertise