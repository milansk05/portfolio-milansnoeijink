"use client"

import { motion } from "framer-motion"
import { Briefcase, Palette, Smartphone, Brain } from 'lucide-react'

const expertiseItems = [
    {
        title: "Management",
        description: "Als tweedejaars student Software Development heb ik al waardevolle ervaring opgedaan in projectmanagement. Ik ben bedreven in het coördineren van teamactiviteiten, het stellen van duidelijke doelen en het bewaken van de voortgang om deadlines te halen. Mijn aanpak zorgt ervoor dat projecten efficiënt en effectief worden uitgevoerd, wat resulteert in hoogwaardige resultaten.",
        icon: Briefcase,
    },
    {
        title: "Creativiteit",
        description: "Creativiteit staat centraal in mijn benadering van softwareontwikkeling. Ik vind het leuk om innovatieve oplossingen te bedenken en complexe problemen vanuit verschillende invalshoeken te benaderen. Mijn creatieve vaardigheden stellen me in staat om buiten de gebaande paden te denken en unieke en bruikbare ontwerpen te creëren die aan de behoeften van gebruikers voldoen.",
        icon: Palette,
    },
    {
        title: "UI & UX Design",
        description: "Mijn passie voor UI & UX design komt tot uiting in mijn streven naar gebruiksvriendelijke en visueel aantrekkelijke interfaces. Als student Software Development leer ik de nieuwste technieken en trends in UI en UX, en pas ik deze kennis toe in mijn projecten. Ik geloof dat een goed ontworpen interface de sleutel is tot een positieve gebruikerservaring en werk voortdurend aan het verbeteren van mijn ontwerpvaardigheden.",
        icon: Smartphone,
    },
    {
        title: "Kritisch denken",
        description: "Kritisch denken is een essentiële vaardigheid die ik in mijn studie Software Development dagelijks toepas. Ik ben vaardig in het analyseren van problemen, het evalueren van mogelijke oplossingen en het nemen van weloverwogen beslissingen. Deze eigenschap stelt me in staat om effectief en efficiënt te werken, waarbij ik altijd streef naar de beste mogelijke resultaten.",
        icon: Brain,
    },
]

const Expertise = () => {
    return (
        <section id="expertise" className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-8">Mijn expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {expertiseItems.map((item, index) => (
                    <motion.div
                        key={item.title}
                        className="bg-white hover:bg-slate-100 p-6 rounded-lg shadow transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <item.icon className="w-12 h-12 mb-4 text-gray-600" />
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-700">{item.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default Expertise