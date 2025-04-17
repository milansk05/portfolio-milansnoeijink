"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Modal from "@/components/Modal"
import TechnologyBadge from "@/components/TechnologyBadge"
import { Github, ExternalLink, ArrowRight } from "lucide-react"

// Project type definitie
type ProjectCategory = "all" | "web" | "mobile" | "design" | "other"

interface Project {
    id: number
    title: string
    description: string
    image: string
    category: ProjectCategory
    repoUrl?: string
    liveUrl?: string
    details?: {
        description: string
        technologies: string[]
        features: string[]
        implementation: string
    }
}

// Project gegevens
const projects: Project[] = [
    {
        id: 1,
        title: "Portfolio Website",
        description: "Mijn persoonlijke portfolio website",
        image: "/images/portfoliowebsite_voorbeeld.png",
        category: "web",
        repoUrl: "https://github.com/milansk05/portfolio-milansnoeijink",
        liveUrl: "https://milansnoeijink.nl",
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
        title: "Komt binnenkort...",
        description: "",
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
        description: "",
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
    const [showEmptyProjects, setShowEmptyProjects] = useState(true)

    useEffect(() => {
        // Simuleer laadtijd voor data
        const timer = setTimeout(() => setLoading(false), 500)
        return () => clearTimeout(timer)
    }, [])

    // Filter projecten op basis van categorie en verberg "Komt binnenkort..." projecten tenzij ingeschakeld
    const filteredProjects = projects
        .filter(project => {
            // Filter eerst op categorie
            const matchesCategory = activeCategory === "all" || project.category === activeCategory;

            // Filter vervolgens lege projecten
            if (!showEmptyProjects && project.title.includes("Komt binnenkort")) {
                return false;
            }

            return matchesCategory;
        })

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
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl font-bold text-center mb-2 text-foreground">Mijn portfolio</h2>
                <p className="text-center text-muted-foreground mb-8">Klik op een project om meer details te zien</p>
            </motion.div>

            <div className="flex flex-col items-center mb-8 space-y-4">
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

                {/* Schakelknop voor het tonen van toekomstige projecten */}
                <button
                    onClick={() => setShowEmptyProjects(!showEmptyProjects)}
                    className="text-sm flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <div className={`w-4 h-4 rounded-sm border ${showEmptyProjects ? 'bg-primary border-primary' : 'border-muted-foreground'} flex items-center justify-center transition-colors`}>
                        {showEmptyProjects && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span>Toon &quot;Komt binnenkort&quot; projecten</span>
                </button>
            </div>

            {filteredProjects.length === 0 ? (
                <motion.div
                    className="bg-card rounded-lg shadow-lg p-10 text-center max-w-md mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="mb-6 text-center">
                        <div className="inline-block p-4 bg-secondary/50 rounded-full mb-4">
                            <ExternalLink size={40} className="text-primary" />
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Geen projecten gevonden</h3>
                    <p className="text-muted-foreground">
                        Er zijn momenteel geen projecten in deze categorie. Nieuwe projecten worden binnenkort toegevoegd!
                    </p>

                    <button
                        onClick={() => setActiveCategory("all")}
                        className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                        Bekijk alle projecten
                    </button>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className={`bg-card group hover:bg-card/90 rounded-lg shadow-lg overflow-hidden cursor-pointer flex flex-col h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-transparent hover:border-border ${project.title.includes("Komt binnenkort") ? "opacity-60 hover:opacity-100" : ""}`}
                            whileHover={{ scale: project.details ? 1.02 : 1 }}
                            onClick={() => project.details && setSelectedProject(project)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="relative overflow-hidden h-48">
                                {project.image ? (
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-muted flex items-center justify-center">
                                        {project.title.includes("Komt binnenkort") ? (
                                            <div className="text-center p-4">
                                                <div className="animate-pulse mb-2">
                                                    <Github size={32} className="text-muted-foreground mx-auto" />
                                                </div>
                                                <p className="text-muted-foreground text-sm">Nieuw project in ontwikkeling</p>
                                            </div>
                                        ) : (
                                            <p className="text-muted-foreground">Afbeelding binnenkort beschikbaar</p>
                                        )}
                                    </div>
                                )}

                                {/* Categorie label */}
                                <div className="absolute top-2 right-2">
                                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-black/70 text-white">
                                        {filterCategories.find(cat => cat.value === project.category)?.label || project.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4 flex-grow flex flex-col">
                                <h3 className="text-xl font-semibold mb-2 text-accent-foreground">{project.title}</h3>
                                <p className="text-accent-foreground/80 flex-grow">{project.description}</p>

                                <div className="mt-4 flex justify-between items-center">
                                    <div className="flex space-x-2">
                                        {project.repoUrl && (
                                            <a
                                                href={project.repoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-foreground transition-colors p-2"
                                                onClick={(e) => e.stopPropagation()}
                                                aria-label="GitHub repository"
                                            >
                                                <Github size={18} />
                                            </a>
                                        )}
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-foreground transition-colors p-2"
                                                onClick={(e) => e.stopPropagation()}
                                                aria-label="Live website"
                                            >
                                                <ExternalLink size={18} />
                                            </a>
                                        )}
                                    </div>

                                    {project.details && (
                                        <button
                                            className="text-primary flex items-center group-hover:underline"
                                            aria-label="Meer details"
                                        >
                                            <span className="mr-1">Details</span>
                                            <ArrowRight size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <Modal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                title={selectedProject?.title || ""}
                image={selectedProject?.image}
            >
                {selectedProject && selectedProject.details && (
                    <div className="space-y-6">
                        {/* Project hoofdafbeelding */}
                        {selectedProject.image && (
                            <div className="relative h-56 md:h-72 w-full rounded-lg overflow-hidden mb-2">
                                <Image
                                    src={selectedProject.image}
                                    alt={`${selectedProject.title} screenshot`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}

                        {/* Externe links */}
                        {(selectedProject.repoUrl || selectedProject.liveUrl) && (
                            <div className="flex flex-wrap gap-3 mb-4">
                                {selectedProject.repoUrl && (
                                    <a
                                        href={selectedProject.repoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-secondary/80 hover:bg-secondary text-secondary-foreground px-4 py-2 rounded-md transition-colors"
                                    >
                                        <Github size={18} />
                                        <span>GitHub Repository</span>
                                    </a>
                                )}
                                {selectedProject.liveUrl && (
                                    <a
                                        href={selectedProject.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md transition-colors"
                                    >
                                        <ExternalLink size={18} />
                                        <span>Live Bekijken</span>
                                    </a>
                                )}
                            </div>
                        )}

                        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                            <p className="text-accent-foreground">{selectedProject.details.description}</p>

                            {selectedProject.details.technologies.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="text-lg font-semibold text-accent-foreground mb-3">Technologieën</h4>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {selectedProject.details.technologies.map((tech, index) => (
                                            <TechnologyBadge key={index} name={tech} index={index} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {selectedProject.details.features.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="text-lg font-semibold text-accent-foreground mb-3">Kenmerken</h4>
                                    <ul className="space-y-2">
                                        {selectedProject.details.features.map((feature, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="flex items-start"
                                            >
                                                <span className="text-primary mr-2">•</span>
                                                <span className="text-accent-foreground/80">{feature}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {selectedProject.details.implementation && (
                                <div className="mt-6">
                                    <h4 className="text-lg font-semibold text-accent-foreground mb-3">Implementatie</h4>
                                    <div className="p-4 bg-secondary/30 text-accent-foreground/80 rounded-lg border border-border">
                                        {selectedProject.details.implementation}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </section>
    )
}

export default Portfolio