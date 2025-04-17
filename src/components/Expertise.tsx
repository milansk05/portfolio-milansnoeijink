"use client"

import { motion } from "framer-motion"
import { Briefcase, Palette, Smartphone, Brain } from "lucide-react"

const expertiseItems = [
    {
        title: "Projectmanagement",
        description:
            "Met drie jaar ervaring in softwareontwikkeling weet ik hoe belangrijk een goed georganiseerd project is. Ik zorg voor structuur, heldere taakverdeling en strakke deadlines. Dit resulteert in efficiënte workflows en succesvolle projecten.",
        icon: Briefcase,
        color: "#3B82F6",
        background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
    },
    {
        title: "Creatief probleemoplossen",
        description:
            "Ik ben gedreven om complexe problemen op een innovatieve manier aan te pakken. Door strategisch en out-of-the-box te denken, ontwikkel ik slimme en efficiënte oplossingen die echt impact maken.",
        icon: Palette,
        color: "#EC4899",
        background: "linear-gradient(135deg, #EC4899 0%, #BE185D 100%)",
    },
    {
        title: "UI & UX Design",
        description:
            "Een intuïtieve en aantrekkelijke interface is essentieel voor een sterke gebruikerservaring. Ik ontwerp visueel aantrekkelijke en gebruiksvriendelijke interfaces die naadloos aansluiten op de behoeften van de gebruiker.",
        icon: Smartphone,
        color: "#10B981",
        background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
    },
    {
        title: "Analytisch denken",
        description:
            "Sterk analytisch vermogen helpt mij om complexe vraagstukken te doorgronden en logische, doordachte oplossingen te bieden. Ik breek problemen af in behapbare stappen en kies de meest efficiënte route naar een werkend eindresultaat.",
        icon: Brain,
        color: "#8B5CF6",
        background: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
    },
]

const Expertise = () => {
    return (
        <section id="expertise" className="mb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center mb-8"
            >
                <h2 className="text-3xl font-bold text-foreground mb-2">Mijn expertise</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Bekijk hier mijn expertise op het gebied van projectmanagement, design en probleemoplossing.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {expertiseItems.map((item, index) => (
                    <motion.div
                        key={item.title}
                        className="group relative bg-card rounded-lg shadow-lg p-6 text-card-foreground overflow-hidden hover:shadow-xl transition-shadow"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                    >
                        {/* Background accent */}
                        <div
                            className="absolute top-0 left-0 w-full h-1 opacity-70"
                            style={{ background: item.background }}
                        />

                        {/* Icon container with gradient background */}
                        <div className="relative mb-4">
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                                style={{ background: `linear-gradient(135deg, ${item.color}20 0%, ${item.color}40 100%)` }}
                            >
                                <item.icon
                                    className="w-8 h-8"
                                    style={{ color: item.color }}
                                />
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-2 text-accent-foreground group-hover:text-primary transition-colors">
                            {item.title}
                        </h3>

                        <p className="text-accent-foreground/80">
                            {item.description}
                        </p>

                        {/* Corner decoration */}
                        <div
                            className="absolute bottom-0 right-0 w-12 h-12 -mb-6 -mr-6 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
                            style={{ background: item.background }}
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default Expertise