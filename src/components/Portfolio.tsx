"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Modal from "@/components/Modal"

const projects = [
    {
        id: 1,
        title: "Portfolio Website",
        description: "Mijn persoonlijke portfolio website",
        image: "/images/portfoliowebsite_voorbeeld.png",
        details: {
            description:
                "Deze portfolio website is gebouwd om mijn vaardigheden en projecten te showcasen. Het is een volledig responsive single-page applicatie die moderne web development technieken en best practices demonstreert.",
            technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
            features: [
                "Responsive design voor alle schermformaten",
                "Dark mode ondersteuning",
                "Dynamische certificaten sectie met filtering",
                "Animaties en overgangen voor een vloeiende gebruikerservaring",
                "SEO geoptimaliseerd",
                "Toegankelijk en gebruiksvriendelijk",
            ],
            implementation:
                "De website is gebouwd met Next.js, wat server-side rendering en optimale prestaties mogelijk maakt. React wordt gebruikt voor de UI componenten, terwijl TypeScript zorgt voor type-veiligheid en verbeterde ontwikkelaarservaring. Tailwind CSS is gebruikt voor de styling, wat snelle ontwikkeling en consistentie in het ontwerp mogelijk maakt. Framer Motion is geïmplementeerd voor vloeiende animaties en overgangen.",
        },
    },
    {
        id: 2,
        title: "Komt binnenkort",
        description: "Nieuw project wordt binnenkort toegevoegd",
        image: null,
        details: null,
    },
    {
        id: 3,
        title: "Komt binnenkort",
        description: "Nog een project in ontwikkeling...",
        image: null,
        details: null,
    },
]

const Portfolio = () => {
    const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)

    return (
        <section id="portfolio" className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-2 text-foreground">Mijn portfolio</h2>
            <p className="text-center text-muted-foreground mb-8">Klik op een project om meer details te zien</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        className="bg-card rounded-lg shadow-lg overflow-hidden cursor-pointer flex flex-col"
                        whileHover={{ scale: project.details ? 1.05 : 1 }}
                        whileTap={{ scale: project.details ? 0.95 : 1 }}
                        onClick={() => project.details && setSelectedProject(project)}
                    >
                        {project.image ? (
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={400}
                                height={300}
                                className="w-full h-48 object-cover"
                            />
                        ) : (
                            <div className="w-full h-48 bg-muted flex items-center justify-center">
                                <p className="text-muted-foreground"></p>
                            </div>
                        )}

                        <div className="p-4 text-center">
                            <h3 className="text-xl font-semibold mb-2 text-accent-foreground">{project.title}</h3>
                            <p className="text-accent-foreground/80">{project.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
            <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} title={selectedProject?.title || ""}>
                {selectedProject && selectedProject.details && (
                    <div className="bg-card text-card-foreground rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="space-y-4 p-6">
                            <p className="text-accent-foreground">{selectedProject.details.description}</p>
                            <h4 className="text-lg font-semibold text-accent-foreground">Technologieën</h4>
                            <ul className="list-disc list-inside text-accent-foreground/80">
                                {selectedProject.details.technologies.map((tech, index) => (
                                    <li key={index}>{tech}</li>
                                ))}
                            </ul>
                            <h4 className="text-lg font-semibold text-accent-foreground">Kenmerken</h4>
                            <ul className="list-disc list-inside text-accent-foreground/80">
                                {selectedProject.details.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                            <h4 className="text-lg font-semibold text-accent-foreground">Implementatie</h4>
                            <p className="text-accent-foreground/80">{selectedProject.details.implementation}</p>
                        </div>
                    </div>
                )}
            </Modal>
        </section>
    )
}

export default Portfolio