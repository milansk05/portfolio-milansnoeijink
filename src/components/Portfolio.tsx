"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Modal from "@/components/Modal"
import TechnologyBadge from "@/components/TechnologyBadge"
import DiagramCarousel from "@/components/DiagramCarousel"
import { Github, ExternalLink, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

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
        images?: string[] // Array of image paths for carousel
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
        title: "Headless WordPress met Next.js",
        description: "Moderne headless CMS-oplossing waarbij WordPress als backend fungeert en Next.js als frontend.",
        image: "/images/headless-wordpress_voorbeeld.png",
        category: "web",
        repoUrl: "https://github.com/milansk05/headless-wp",
        liveUrl: "",
        details: {
            description:
                "Deze website is ontwikkeld als een moderne headless CMS-oplossing waarbij WordPress als backend fungeert en Next.js als frontend. Het is een volledig responsive applicatie die geavanceerde web development technieken demonstreert, met speciale aandacht voor gebruikerservaring en prestaties.",
            technologies: ["Next.js", "React", "GraphQL", "Framer Motion", "Tailwind CSS", "WordPress (headless)"],
            features: [
                "Responsive design met adaptieve navigatie voor alle apparaten",
                "Dynamisch content management via WordPress",
                "Server-side rendering en statische generatie voor optimale prestaties",
                "GraphQL API-integratie voor efficiënte data-uitwisseling",
                "Bookmark/favorieten systeem met lokale opslag",
                "Automatisch gegenereerde inhoudsopgave voor lange artikelen",
                "Gerelateerde posts en content suggesties",
                "Geavanceerde mega menu's en navigatie-opties",
                "Social media sharing integratie",
                "Leesvoortgangsindicator en leestijdschatting",
                "Geoptimaliseerde afbeeldingsweergave en lazy loading",
                "SEO geoptimaliseerd met meta tags en structured data",
                "Contactformulier met serverless functies",
                "Interactieve UI elementen met Framer Motion animaties"
            ],
            implementation:
                "De website is gebouwd met Next.js 15.3 voor server-side rendering en optimale prestaties. React 19 wordt gebruikt voor de UI-componenten, terwijl GraphQL zorgt voor efficiënte datacommunicatie met WordPress. TailwindCSS 4.1 met een uitgebreide typografie configuratie zorgt voor consistente styling en responsiviteit. Het project bevat geavanceerde componenten zoals een adaptieve header, geanimeerde menu's, een bookmark systeem en automatische inhoudsopgave generatie. Framer Motion zorgt voor vloeiende animaties en overgangen, waardoor de gebruikerservaring wordt verbeterd. De applicatie demonstreert hoe je de kracht van WordPress CMS kunt combineren met de snelheid en flexibiliteit van een moderne JavaScript frontend.",
        },
    },
    {
        id: 3,
        title: "Binsta - Instagram voor code",
        description: "Een sociaal platform waar programmeurs code snippets kunnen delen, liken en becommentariëren.",
        image: "/images/binsta_inlog.png",
        category: "web",
        repoUrl: "https://github.com/milansk05/Binsta",
        details: {
            description:
                "Binsta is een socialmediaplatform specifiek voor programmeurs, geïnspireerd op Instagram. Het stelt gebruikers in staat om code snippets te delen met syntax highlighting, deze te liken en er reacties op te plaatsen. Het platform heeft een modern, donker thema en is volledig responsive voor alle apparaten.",
            technologies: ["PHP", "MySQL", "RedBeanPHP", "Twig", "JavaScript", "CSS", "Highlight.js"],
            features: [
                "Gebruikersregistratie en authenticatie",
                "Code snippets delen met syntax highlighting voor 15+ programmeertalen",
                "Like en reactie systeem",
                "Responsive interface voor desktop en mobiel",
                "Modern donker thema specifiek voor code weergave",
                "Profiel pagina's met statistieken over taalgebruik",
                "Zoekfunctie voor gebruikers",
                "Kopieer-functie voor code snippets",
                "Persoonlijke feed met recente posts"
            ],
            implementation:
                "Binsta is ontwikkeld met PHP en maakt gebruik van RedBeanPHP als ORM voor databasebeheer. De front-end is gebouwd met Twig als template engine, met JavaScript voor interactieve elementen zoals het like-systeem en code highlighting. De applicatie heeft een MVC-structuur met controllers voor verschillende functies zoals posts, gebruikers en authenticatie. Highlight.js zorgt voor professionele syntax highlighting van code in verschillende programmeertalen. Het ontwerp is geoptimaliseerd voor leesbaarheid van code met een donker thema en gebruikt moderne CSS-technieken voor een responsieve layout.",
        },
    },
    {
        id: 4,
        title: "UML Diagram Collectie",
        description: "Diverse UML-diagrammen ontwikkeld tijdens mijn opleiding, van klassendiagrammen tot sequentiediagrammen",
        image: "/images/klassendiagram.png",
        category: "design",
        repoUrl: "",
        details: {
            description:
                "Tijdens mijn opleiding heb ik verschillende UML-diagrammen gemaakt om softwaresystemen te modelleren en te documenteren. Deze collectie toont mijn vaardigheid in het toepassen van verschillende UML-technieken, van structurele klassendiagrammen tot dynamische sequentie- en activiteitendiagrammen.",
            technologies: ["UML 2.5", "PlantUML", "Enterprise Architect", "Draw.io", "Visual Paradigm"],
            features: [
                "Klassendiagrammen voor het visualiseren van objectgeoriënteerde systemen",
                "State diagrammen voor het modelleren van objecttoestanden en overgangen",
                "Activiteitendiagrammen voor het in kaart brengen van processen en workflows",
                "Deploymentdiagrammen voor het specificeren van hardware- en softwareconfiguraties",
                "Sequentiediagrammen voor het modelleren van object interacties",
                "Use Case diagrammen voor het documenteren van systeemfunctionaliteiten"
            ],
            implementation:
                "De diagrammen zijn gemaakt met verschillende tools, waaronder Enterprise Architect en Visual Paradigm. Ze zijn ontwikkeld als onderdeel van diverse studieopdrachten en projecten om softwareontwerp en -architectuur te documenteren. De UML-technieken heb ik toegepast om zowel bestaande systemen te analyseren als nieuwe systemen te ontwerpen. De diagrammen tonen mijn vaardigheid in het conceptualiseren en visualiseren van complexe softwaresystemen.",
            images: [
                "/images/state_diagram.png",
                "/images/klassendiagram.png",
                "/images/sequence_diagram.png",
                "/images/afrekenproces-diagram.png",
                "/images/use_case_diagram.png",
                "/images/deployment-diagram.png"
            ]
        },
    },
    {
        id: 5,
        title: "TaskFlow - Moderne Taakbeheer Applicatie",
        description: "Een volledig uitgeruste Progressive Web App voor taakbeheer, ontwikkeld als MBO 4 Software Developer portfolio project. Toont geavanceerde frontend en backend ontwikkelingsvaardigheden.",
        image: "/images/taskflow-dashboard.png",
        category: "web",
        repoUrl: "https://github.com/milansk05/TaskFlow",
        details: {
            description: "TaskFlow is een geavanceerde taakbeheer applicatie die moderne webontwikkeling technieken combineert met een uitstekende gebruikerservaring. Het project demonstreert professionele ontwikkelingsvaardigheden door gebruik te maken van de nieuwste technologieën en best practices. De applicatie biedt offline functionaliteit, real-time updates, en een volledig responsive design. Als portfolio project voor MBO 4 Software Developer toont TaskFlow expertise in zowel frontend als backend development, inclusief database design, API ontwikkeling, en moderne deployment strategieën.",

            technologies: [
                "Next.js 15",
                "TypeScript",
                "React 19",
                "Tailwind CSS 4",
                "Framer Motion",
                "Prisma ORM",
                "PostgreSQL",
                "API Routes",
                "Service Workers",
                "Web App Manifest",
                "ESLint",
                "Vercel Deployment"
            ],

            features: [
                "Volledig CRUD taakbeheer systeem",
                "Project organisatie met kleurcodering",
                "Meerdere weergavemodi (Lijst, Kaart, Kanban)",
                "Geavanceerde zoek- en filterfuncties",
                "Responsive design (mobiel-first)",
                "Dark/Light mode toggle",
                "Offline functionaliteit (PWA)",
                "Drag & drop interface",
                "Keyboard shortcuts",
                "Real-time statistieken dashboard",
                "Import/Export functionaliteit",
                "Automatische backup systeem",
                "CSV export voor Excel",
                "Type-safe database operaties",
                "Smooth animaties met Framer Motion",
                "Smart notificatiesysteem",
                "Contextgevoelige help",
                "Toegankelijkheidsoptimalisaties"
            ],

            implementation: "TaskFlow is gebouwd als een moderne Progressive Web App met een focus op gebruikerservaring en technische excellentie. De applicatie gebruikt Next.js 15 met het nieuwe App Router voor server-side rendering en optimale performance. TypeScript zorgt voor type-safe development en betere code kwaliteit door het hele project. Voor state management wordt React Context API gebruikt in combinatie met custom reducers voor efficiënte data flow. De UI is gebouwd met Tailwind CSS 4 en Framer Motion voor prachtige animaties en responsive design. De backend implementeert Prisma ORM met PostgreSQL voor type-safe database operaties en een goed gestructureerd relationeel datamodel. RESTful API endpoints zorgen voor betrouwbare communicatie tussen frontend en backend. Progressive Web App features maken de applicatie installeerbaar en offline bruikbaar door Service Workers en intelligente caching strategieën. De ontwikkeling volgt moderne best practices met component-driven development, clean code principes en uitgebreide TypeScript typing. ESLint configuratie waarborgt consistente code kwaliteit en Git workflow met duidelijke commit messages zorgt voor professioneel versiebeher. Deployment gebeurt via Vercel met automatische builds en omgevingsspecifieke configuraties.",
        }
    },
    {
        id: 6,
        title: "Komt binnenkort - website-makers website",
        description: "",
        image: "",
        category: "other",
        repoUrl: "",
        details: {
            description:
                "Komt binnenkort",
            technologies: [],
            features: [],
            implementation:
                ""
        },
    },
    {
        id: 7,
        title: "Komt binnenkort - A. Groen - Klus en Rietdekken",
        description: "",
        image: "",
        category: "other",
        repoUrl: "",
        details: {
            description:
                "Komt binnenkort",
            technologies: [],
            features: [],
            implementation:
                ""
        },
    }
]

const filterCategories = [
    { value: "all", label: "Alles" },
    { value: "web", label: "Web Development" },
    { value: "design", label: "Design" },
    { value: "mobile", label: "Mobile Apps" },
    { value: "other", label: "Overig" }
]

const Portfolio = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all")
    const [loading, setLoading] = useState(true)
    const [showEmptyProjects, setShowEmptyProjects] = useState(true)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        // Simuleer laadtijd voor data
        const timer = setTimeout(() => setLoading(false), 500)
        return () => clearTimeout(timer)
    }, [])

    // Reset carousel index when project changes
    useEffect(() => {
        setCurrentImageIndex(0)
    }, [selectedProject])

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (selectedProject?.details?.images) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === selectedProject.details!.images!.length - 1 ? 0 : prevIndex + 1
            )
        }
    }

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (selectedProject?.details?.images) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? selectedProject.details!.images!.length - 1 : prevIndex - 1
            )
        }
    }

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
                        {/* Project afbeeldingen carrousel */}
                        {selectedProject.details.images && selectedProject.details.images.length > 0 ? (
                            <div className="relative w-full rounded-lg overflow-hidden mb-2">
                                {/* Gebruik de aangepaste DiagramCarousel component voor UML-projecten */}
                                {selectedProject.id === 4 ? (
                                    <div className="h-auto">
                                        <DiagramCarousel images={selectedProject.details.images} />
                                    </div>
                                ) : (
                                    <div className="relative h-56 md:h-72 w-full">
                                        {/* Carrousel navigatieknoppen */}
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
                                            aria-label="Vorige afbeelding"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>

                                        <button
                                            onClick={nextImage}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
                                            aria-label="Volgende afbeelding"
                                        >
                                            <ChevronRight size={20} />
                                        </button>

                                        {/* Afbeelding */}
                                        <motion.div
                                            key={currentImageIndex}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="h-full w-full relative"
                                        >
                                            <Image
                                                src={selectedProject.details.images[currentImageIndex]}
                                                alt={`${selectedProject.title} - Afbeelding ${currentImageIndex + 1}`}
                                                fill
                                                className="object-contain bg-black/20"
                                            />
                                        </motion.div>

                                        {/* Indicatoren */}
                                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                                            {selectedProject.details.images.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setCurrentImageIndex(idx);
                                                    }}
                                                    className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? "bg-primary" : "bg-white/50"
                                                        }`}
                                                    aria-label={`Ga naar afbeelding ${idx + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : selectedProject.image ? (
                            <div className="relative h-56 md:h-72 w-full rounded-lg overflow-hidden mb-2">
                                <Image
                                    src={selectedProject.image}
                                    alt={`${selectedProject.title} screenshot`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : null}

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