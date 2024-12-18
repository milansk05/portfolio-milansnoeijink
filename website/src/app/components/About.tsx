"use client"

import { motion } from "framer-motion"

const About = () => {
    return (
        <motion.section
            id="overmij"
            className="mb-20 p-10 bg-white rounded-lg shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <h2 className="text-3xl font-bold text-center mb-8">Over mij</h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-center">
                Hey, ik ben Milan Snoeijink, een enthousiaste softwareontwikkelaar in opleiding aan de Bit Academy in Groningen. Ik ben gepassioneerd over het schrijven van efficiënte code en het bedenken van creatieve oplossingen. Bij de Bit Academy werk ik aan uitdagende projecten en help ik mee om de volgende generatie ontwikkelaars te inspireren. Neem gerust een kijkje op mijn website om mijn projecten en mijn reis in de digitale wereld te ontdekken. Voor vragen of samenwerkingen ben ik altijd bereikbaar!
            </p>
        </motion.section>
    )
}

export default About