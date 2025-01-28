"use client"

import { motion } from "framer-motion"
import { Briefcase, Palette, Smartphone, Brain } from "lucide-react"

const expertiseItems = [
    {
        title: "Projectmanagement",
        description:
            "In mijn drie jaar bij de Bit Academy heb ik veel ervaring opgedaan met projectmanagement. Ik kan goed overzicht houden, taken verdelen en deadlines bewaken. Hierdoor lopen projecten soepel en bereiken we samen goede resultaten.",
        icon: Briefcase,
    },
    {
        title: "Creatief probleemoplossen",
        description:
            "Ik vind het een uitdaging om creatieve oplossingen te bedenken voor lastige problemen. Door vanuit verschillende hoeken naar een vraagstuk te kijken, kom ik vaak tot verrassende en effectieve oplossingen. Deze aanpak helpt me om innovatieve software te ontwikkelen die echt waarde toevoegt.",
        icon: Palette,
    },
    {
        title: "UI & UX Design",
        description:
            "Een goed ontworpen interface maakt het verschil tussen een product dat werkt en een product dat mensen graag gebruiken. Ik focus me op het maken van interfaces die niet alleen mooi zijn, maar ook intuïtief en gebruiksvriendelijk. Hierbij pas ik de nieuwste trends en technieken toe die ik tijdens mijn studie heb geleerd.",
        icon: Smartphone,
    },
    {
        title: "Analytisch denken",
        description:
            "Als developer is het cruciaal om problemen grondig te kunnen analyseren. Ik ben sterk in het opdelen van complexe vraagstukken in behapbare delen, het afwegen van verschillende oplossingen, en het maken van weloverwogen keuzes. Deze vaardigheid helpt me om efficiënt te werken en kwaliteit te leveren.",
        icon: Brain,
    },
]

const Expertise = () => {
    return (
        <section id="expertise" className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Mijn expertise</h2>
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