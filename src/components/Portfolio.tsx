"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Modal from "@/components/Modal"

type ProjectCategory = "all" | "web" | "mobile" | "design" | "other"

interface Project {
    id: number
    title: string
    description: string
    image: string
    category: ProjectCategory
    details?: {
        description: string
        technologies: string[]
        features: string[]
        implementation: string
    }
}

const projects: Project[] = [
    {
        id: 1,
        title: "Portfolio Website",
        description: "Mijn persoonlijke portfolio website",
        image: "/images/portfoliowebsite_voorbeeld.png",
        category: "web",
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
        title: "Realworks Wonen API",
        description: "Een API voor het ophalen van woninginformatie",
        image: "",
        category: "web",
        details: {
            description:
                "Komt binnenkort...",
            technologies: [],
            features: [
            ],
            implementation:
                "",
        },
    },
    {
        id: 3,
        title: "Komt binnenkort...",
        description: "Een real-time chat applicatie met Next.js",
        image: "",
        category: "web",
    },
]

const filterCategories = [
    { value: "all", label: "Alles" },
    { value: "web", label: "Web Development" },
    { value: "mobile", label: "Mobile Apps" },
    { value: "design", label: "Design" },
    { value: "other", label: "Overig" }
]

const Portfolio = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simuleer laadtijd voor data
        const timer = setTimeout(() => setLoading(false), 500)
        return () => clearTimeout(timer)
    }, [])

    const filteredProjects = activeCategory === "all"
        ? projects
        : projects.filter(project => project.category === activeCategory)

    if (loading) {
        return (
            <section id="portfolio" className="mb-20 min-h-[400px] flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold text-center mb-2 text-foreground">Mijn portfolio</h2>
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary mt-10"></div>
                <p className="text-muted-foreground mt-4">Portfolio projecten laden...</p>
            </section>
        )
    }

    return (
        <section id="portfolio" className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-2 text-foreground">Mijn portfolio</h2>
            <p className="text-center text-muted-foreground mb-8">Klik op een project om meer details te zien</p>

            <div className="flex justify-center mb-8">
                <div className="flex flex-wrap justify-center gap-2">
                    {filterCategories.map(category => (
                        <button
                            key={category.value}
                            onClick={() => setActiveCategory(category.value as ProjectCategory)}
                            className={`px-4 py-2 rounded-full transition-colors ${activeCategory === category.value
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            {filteredProjects.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">
                    Geen projecten gevonden in deze categorie. Meer projecten komen binnenkort!
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            className="bg-card rounded-lg shadow-lg overflow-hidden cursor-pointer flex flex-col"
                            whileHover={{ scale: project.details ? 1.05 : 1 }}
                            whileTap={{ scale: project.details ? 0.95 : 1 }}
                            onClick={() => project.details && setSelectedProject(project)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
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
                                    <p className="text-muted-foreground">Afbeelding binnenkort beschikbaar</p>
                                </div>
                            )}

                            <div className="p-4 text-center">
                                <h3 className="text-xl font-semibold mb-2 text-accent-foreground">{project.title}</h3>
                                <p className="text-accent-foreground/80">{project.description}</p>
                                <div className="mt-2">
                                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                                        {filterCategories.find(cat => cat.value === project.category)?.label || project.category}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} title={selectedProject?.title || ""}>
                {selectedProject && selectedProject.details && (
                    <div className="space-y-4">
                        <p className="text-accent-foreground">{selectedProject.details.description}</p>

                        {selectedProject.details.technologies.length > 0 && (
                            <>
                                <h4 className="text-lg font-semibold text-accent-foreground">Technologieën</h4>
                                <ul className="list-disc list-inside text-accent-foreground/80">
                                    {selectedProject.details.technologies.map((tech, index) => (
                                        <li key={index}>{tech}</li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {selectedProject.details.features.length > 0 && (
                            <>
                                <h4 className="text-lg font-semibold text-accent-foreground">Kenmerken</h4>
                                <ul className="list-disc list-inside text-accent-foreground/80">
                                    {selectedProject.details.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {selectedProject.details.implementation && (
                            <>
                                <h4 className="text-lg font-semibold text-accent-foreground">Implementatie</h4>
                                <p className="text-accent-foreground/80">{selectedProject.details.implementation}</p>
                            </>
                        )}
                    </div>
                )}
            </Modal>
        </section>
    )
}

export default Portfolio