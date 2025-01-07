"use client"

import { motion } from "framer-motion"

const testimonials = [
    {
        name: "Jan de Vries",
        role: "Senior Developer bij TechCo",
        content: "Milan is een uitzonderlijk talent. Zijn toewijding en technische vaardigheden zijn indrukwekkend voor iemand zo vroeg in zijn carrière."
    },
    {
        name: "Lisa Jansen",
        role: "Project Manager bij WebSolutions",
        content: "Het was een genoegen om met Milan samen te werken. Hij brengt niet alleen technische expertise, maar ook creativiteit en een positieve houding in elk project."
    },
    {
        name: "Pieter Bakker",
        role: "Docent Software Development",
        content: "Milan's groei als ontwikkelaar is opmerkelijk. Hij pakt nieuwe concepten snel op en is altijd bereid om anderen te helpen."
    }
]

const Testimonials = () => {
    return (
        <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">Wat anderen zeggen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={index}
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-gray-600 dark:text-gray-300 mb-4">"{testimonial.content}"</p>
                        <div>
                            <p className="font-semibold dark:text-white">{testimonial.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default Testimonials