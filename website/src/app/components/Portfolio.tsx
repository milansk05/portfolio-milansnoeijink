"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const projects = [
    {
        title: "Bit-Anwsers",
        description: "Web Rookie Eindproject: Het maken van een Webshop / Bestelapplicatie met gebruik van HTML, CSS, JavaScript en Bootstrap/Tailwind. Dit project stelde je in staat om al je voorgaande kennis van de front-end toe te passen en te oefenen.",
        image: "/bitanwsers.png",
        link: "./bitanswers/index.html"
    },
    {
        title: "Bit-Tweets",
        description: "Backend Eindproject: Het bouwen van een complete interactieve website. Hiervoor had ik geleerd op applicaties te bouwen in PHP. Dit project stelde je in staat om al je voorgaande kennis van PHP toe te passen en te oefenen.",
        image: "/bittweets.png",
        link: "./bittweets/index.php"
    },
    {
        title: "Binsta",
        description: "Your Fullstack Framework Eindproject: Een socialmediaplatform waar je jouw code snippets kunt delen met je vrienden. Denk aan Instagram voor code. Hiervoor heb ik allerlei handigheden geleerd die het eenvoudiger en sneller maken om applicaties te bouwen met mijn eigen framework.",
        image: "/binsta.png",
        link: "#"
    }
]

const Portfolio = () => {
    return (
        <section id="portfolio" className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-8">Mijn portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.title}
                        className="bg-white p-6 rounded-lg shadow"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Image
                            src={project.image}
                            alt={project.title}
                            width={400}
                            height={225}
                            className="w-full h-50 object-cover rounded-t-lg"
                        />
                        <h3 className="text-xl font-bold mt-4">{project.title}</h3>
                        <p className="mt-2 mb-2 text-gray-600">
                            {project.title === "Binsta" ? "Your Fullstack Framework Eindproject" : project.title === "Bit-Tweets" ? "Backend Eindproject" : "Web Rookie Eindproject"}
                        </p>
                        <p className="text-gray-700">{project.description}</p>
                        {project.link !== "#" ? (
                            <a href={project.link} className="text-blue-600 hover:underline mt-2 inline-block">
                                Klik hier om project te bekijken
                            </a>
                        ) : (
                            <p className="text-blue-600 mt-2">Project bekijken momenteel nog niet beschikbaar.</p>
                        )}
                    </motion.div>
                ))}
            </div>
            <div className="text-center mt-8">
                <a
                    href="https://github.com/milansk05"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors inline-block"
                >
                    Bezoek mijn GitHub
                </a>
            </div>
        </section>
    )
}

export default Portfolio