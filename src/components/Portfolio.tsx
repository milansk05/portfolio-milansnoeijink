"use client"

import { useState } from 'react'
import Image from "next/image"
import { motion } from "framer-motion"

const projects = [
    {
        title: "Bit-Anwsers",
        description: "Web Rookie Eindproject: Het maken van een Webshop / Bestelapplicatie met gebruik van HTML, CSS, JavaScript en Bootstrap/Tailwind. Dit project stelde je in staat om al je voorgaande kennis van de front-end toe te passen en te oefenen.",
        image: "/bitanwsers.png",
        link: "./bitanswers/index.html",
        category: "Frontend"
    },
    {
        title: "Bit-Tweets",
        description: "Backend Eindproject: Het bouwen van een complete interactieve website. Hiervoor had ik geleerd op applicaties te bouwen in PHP. Dit project stelde je in staat om al je voorgaande kennis van PHP toe te passen en te oefenen.",
        image: "/bittweets.png",
        link: "./bittweets/index.php",
        category: "Backend"
    },
    {
        title: "Binsta",
        description: "Your Fullstack Framework Eindproject: Een socialmediaplatform waar je jouw code snippets kunt delen met je vrienden. Denk aan Instagram voor code. Hiervoor heb ik allerlei handigheden geleerd die het eenvoudiger en sneller maken om applicaties te bouwen met mijn eigen framework.",
        image: "/binsta.png",
        link: "#",
        category: "Fullstack"
    }
]

const categories = ["Alle", "Frontend", "Backend", "Fullstack"]

const Portfolio = () => {
    const [filter, setFilter] = useState("Alle")

    const filteredProjects = filter === "Alle"
        ? projects
        : projects.filter(project => project.category === filter)

    return (
        <section id="portfolio" className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Mijn portfolio</h2>
            <div className="flex justify-center space-x-4 mb-8">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={`px-4 py-2 rounded-full transition-colors ${filter === category
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                    <motion.div
                        key={project.title}
                        className="bg-accent rounded-lg shadow-lg overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Image
                            src={project.image}
                            alt={project.title}
                            width={400}
                            height={225}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-accent-foreground">{project.title}</h3>
                            <p className="text-sm text-accent-foreground/80 mb-2">{project.category}</p>
                            <p className="text-accent-foreground/90 mb-4">{project.description}</p>
                            {project.link !== "#" ? (
                                <a
                                    href={project.link}
                                    className="text-primary hover:text-primary/90 transition-colors inline-block"
                                >
                                    Klik hier om project te bekijken
                                </a>
                            ) : (
                                <p className="text-primary/80">Project bekijken momenteel nog niet beschikbaar.</p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="text-center mt-8">
                <a
                    href="https://github.com/milansk05"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-colors inline-block"
                >
                    Bezoek mijn GitHub
                </a>
            </div>
        </section>
    )
}

export default Portfolio