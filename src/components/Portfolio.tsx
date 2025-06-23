// src/components/Portfolio.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Modal from "@/components/Modal";
import TechnologyBadge from "@/components/TechnologyBadge";
import DiagramCarousel from "@/components/DiagramCarousel";
import {
  Github,
  ExternalLink,
} from "lucide-react";

// Nieuwe loading componenten
const SkeletonLoader = ({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "circle" | "image" | "text";
}) => {
  const baseClasses =
    "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse";

  const variants = {
    default: "h-4 rounded",
    circle: "rounded-full aspect-square",
    image: "h-48 rounded-lg",
    text: "h-4 rounded",
  };

  return (
    <motion.div
      className={`${baseClasses} ${variants[variant]} ${className}`}
      style={{ backgroundSize: "400% 100%" }}
      animate={{
        backgroundPosition: ["200% 0", "-200% 0"],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

// Portfolio specifieke skeleton
const ProjectSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
    <SkeletonLoader variant="image" className="w-full" />
    <div className="p-6 space-y-4">
      <SkeletonLoader className="h-6 w-3/4" />
      <div className="space-y-2">
        <SkeletonLoader className="h-4 w-full" />
        <SkeletonLoader className="h-4 w-5/6" />
        <SkeletonLoader className="h-4 w-2/3" />
      </div>
      <div className="flex gap-2">
        <SkeletonLoader className="h-6 w-16 rounded-full" />
        <SkeletonLoader className="h-6 w-20 rounded-full" />
      </div>
    </div>
  </div>
);

// Thematische portfolio loader
const PortfolioLoader = () => (
  <div className="flex flex-col items-center justify-center space-y-6 py-16">
    <div className="relative w-24 h-24">
      {/* Buitenste ring */}
      <motion.div
        className="absolute inset-0 border-4 border-gradient-to-r from-blue-500 to-purple-500 rounded-full border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "conic-gradient(from 0deg, #3b82f6, #8b5cf6, transparent)",
        }}
      />

      {/* Binnenste ring */}
      <motion.div
        className="absolute inset-2 border-4 border-gradient-to-r from-purple-500 to-pink-500 rounded-full border-b-transparent"
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "conic-gradient(from 180deg, #8b5cf6, #ec4899, transparent)",
        }}
      />

      {/* Center dot */}
      <motion.div
        className="absolute inset-1/2 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>

    {/* Voortgangsstappen */}
    <div className="text-center space-y-2">
      <motion.p
        className="text-lg font-semibold text-gray-900 dark:text-gray-100"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Portfolio laden...
      </motion.p>

      <div className="flex items-center justify-center space-x-2">
        {["Projecten", "Afbeeldingen", "Metadata"].map((step, index) => (
          <motion.div
            key={step}
            className="flex items-center"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "easeInOut",
            }}
          >
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {step}
            </span>
            {index < 2 && (
              <motion.div
                className="w-2 h-2 mx-2 bg-blue-500 rounded-full"
                animate={{ scale: [0, 1, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.5 + 0.25,
                }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>

    {/* Voortgangsbalk */}
    <div className="w-64 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
      <motion.div
        className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
        }}
      />
    </div>
  </div>
);

// Project type definitie (behouden van originele code)
type ProjectCategory = "all" | "web" | "mobile" | "design" | "other";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: ProjectCategory;
  repoUrl?: string;
  liveUrl?: string;
  details?: {
    description: string;
    technologies: string[];
    features: string[];
    implementation: string;
    images?: string[];
  };
}

// Project gegevens (behouden van originele code)
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
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
      ],
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
    description:
      "Moderne headless CMS-oplossing waarbij WordPress als backend fungeert en Next.js als frontend.",
    image: "/images/headless-wordpress_voorbeeld.png",
    category: "web",
    repoUrl: "https://github.com/milansk05/headless-wp",
    liveUrl: "",
    details: {
      description:
        "Deze website is ontwikkeld als een moderne headless CMS-oplossing waarbij WordPress als backend fungeert en Next.js als frontend. Het is een volledig responsive applicatie die geavanceerde web development technieken demonstreert, met speciale aandacht voor gebruikerservaring en prestaties.",
      technologies: [
        "Next.js",
        "React",
        "GraphQL",
        "Framer Motion",
        "Tailwind CSS",
        "WordPress (headless)",
      ],
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
        "Interactieve UI elementen met Framer Motion animaties",
      ],
      implementation:
        "De website is gebouwd met Next.js 15.3 voor server-side rendering en optimale prestaties. React 19 wordt gebruikt voor de UI-componenten, terwijl GraphQL zorgt voor efficiënte datacommunicatie met WordPress. TailwindCSS 4.1 met een uitgebreide typografie configuratie zorgt voor consistente styling en responsiviteit. Het project bevat geavanceerde componenten zoals een adaptieve header, geanimeerde menu's, een bookmark systeem en automatische inhoudsopgave generatie. Framer Motion zorgt voor vloeiende animaties en overgangen, waardoor de gebruikerservaring wordt verbeterd. De applicatie demonstreert hoe je de kracht van WordPress CMS kunt combineren met de snelheid en flexibiliteit van een moderne JavaScript frontend.",
    },
  },
  {
    id: 3,
    title: "Binsta - Instagram voor code",
    description:
      "Een sociaal platform waar programmeurs code snippets kunnen delen, liken en becommentariëren.",
    image: "/images/binsta_inlog.png",
    category: "web",
    repoUrl: "https://github.com/milansk05/binsta",
    liveUrl: "",
    details: {
      description:
        "Binsta is een innovatief sociaal platform specifiek ontworpen voor programmeurs. Het stelt ontwikkelaars in staat om hun code snippets te delen, van elkaar te leren en samen te werken. Het platform combineert de sociale aspecten van Instagram met de technische focus van programmeergemeenschappen.",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Socket.io",
        "JWT",
        "Multer",
        "Bcrypt",
      ],
      features: [
        "Gebruikersregistratie en authenticatie met JWT tokens",
        "Code snippets uploaden met syntax highlighting",
        "Real-time like en comment systeem",
        "Gebruikersprofielen met code statistieken",
        "Volg andere programmeurs voor geprsonaliseerde feed",
        "Zoekfunctionaliteit op basis van programmeertaal en tags",
        "Responsive design voor desktop en mobile",
        "Real-time notificaties voor interacties",
        "Dark mode ondersteuning",
        "Code syntax highlighting voor meerdere talen",
      ],
      implementation:
        "De applicatie is gebouwd met een moderne MERN stack (MongoDB, Express, React, Node.js). De frontend is ontwikkeld in React met hooks voor state management en responsieve styling. De backend API is gebouwd met Express.js en gebruikt MongoDB voor data persistentie. JWT tokens worden gebruikt voor veilige authenticatie en Socket.io zorgt voor real-time functionaliteiten zoals live comments en notificaties. Bcrypt wordt gebruikt voor wachtwoord hashing en Multer voor bestandsuploads. De applicatie volgt RESTful API principes en implementeert proper error handling en input validatie.",
    },
  },
  {
    id: 4,
    title: "UML Diagrammen Collectie",
    description:
      "Een uitgebreide verzameling van professionele UML diagrammen voor softwareontwerp en systeemanalyse.",
    image: "/images/state_diagram.png",
    category: "design",
    repoUrl: "",
    details: {
      description:
        "Deze collectie bevat een uitgebreide reeks UML (Unified Modeling Language) diagrammen die ik heb ontwikkeld voor verschillende software projecten. De diagrammen dekken verschillende aspecten van softwareontwerp af, van high-level systeemarchitectuur tot gedetailleerde klassenstructuren en procesflows. Ze zijn ontwikkeld als onderdeel van diverse studieopdrachten en projecten om softwareontwerp en -architectuur te documenteren.",
      technologies: [
        "Draw.io",
        "Lucidchart",
        "PlantUML",
        "Visual Paradigm",
        "Enterprise Architect",
      ],
      features: [
        "Klassendiagrammen voor object-georiënteerd ontwerp",
        "Use case diagrammen voor requirement analyse",
        "Sequence diagrammen voor interactie modeling",
        "State diagrammen voor gedragsmodeling",
        "Activity diagrammen voor procesflows",
        "Deployment diagrammen voor systeem architectuur",
        "Component diagrammen voor modulaire structuur",
        "Professionele styling en consistente notatie",
        "Gedetailleerde documentatie bij elk diagram",
        "Exporteerbaar naar verschillende formaten",
      ],
      implementation:
        "De UML diagrammen zijn gemaakt met professionele modeling tools zoals Draw.io, Lucidchart en Visual Paradigm. Elk diagram volgt de officiële UML 2.5 specificatie en gebruikt consistente styling en naamgevingsconventies. Ze zijn ontwikkeld als onderdeel van diverse studieopdrachten en projecten om softwareontwerp en -architectuur te documenteren. De UML-technieken heb ik toegepast om zowel bestaande systemen te analyseren als nieuwe systemen te ontwerpen. De diagrammen tonen mijn vaardigheid in het conceptualiseren en visualiseren van complexe softwaresystemen.",
      images: [
        "/images/state_diagram.png",
        "/images/klassendiagram.png",
        "/images/sequence_diagram.png",
        "/images/afrekenproces-diagram.png",
        "/images/use_case_diagram.png",
        "/images/deployment-diagram.png",
      ], 
    },
  },
  {
    id: 6,
    title: "Website Makers - Professionele Webdevelopment Studio",
    description:
      "Een moderne, volledig geanimeerde bedrijfswebsite voor een webdevelopment studio met focus op conversie en gebruikerservaring.",
    image: "/images/website-makers-frontpage.png",
    category: "web",
    repoUrl: "https://github.com/milansk05/website-makers",
    details: {
      description:
        "Website Makers is een complete bedrijfswebsite voor een professionele webdevelopment studio. De site combineert moderne ontwerpprincipes met geavanceerde animaties en is volledig geoptimaliseerd voor conversie. Het project toont expertise in moderne webdevelopment met Next.js 15, TypeScript en Framer Motion. De website bevat uitgebreide secties voor diensten, portfolio, team informatie en contactmogelijkheden, allemaal met een focus op het aantrekken en converteren van potentiële klanten.",
      technologies: [
        "Next.js 15",
        "React 19",
        "TypeScript",
        "Tailwind CSS v4",
        "Framer Motion",
        "Lucide React",
        "PostCSS",
        "ESLint",
      ],
      features: [
        "Volledig responsive design voor alle apparaten",
        "Geavanceerde animaties en micro-interacties met Framer Motion",
        "Dynamische hero sectie met zwevende elementen en gradient animaties",
        "Interactieve diensten overzicht met hover effecten en uitklapbare details",
        "Geanimeerde testimonials carousel met automatische en handmatige navigatie",
        "Portfolio showcase met filtering en modal weergave",
        "Team sectie met interactieve profielkaarten en achievements",
        "Contact formulier met real-time validatie en success states",
        "SEO geoptimaliseerd met uitgebreide metadata en structured data",
        "Performance geoptimaliseerd met lazy loading en image optimization",
        "Toegankelijkheid features zoals skip links en ARIA labels",
        "Custom UI componenten zoals Kaart, Knop en Sectie",
        "Modulaire CSS architectuur met custom properties",
        "Progressive Web App features met service worker",
        "Analytics integratie met Vercel Speed Insights",
      ],
      implementation:
        "De Website Makers site is gebouwd als een moderne Next.js 15 applicatie met het nieuwe App Router systeem. Het project maakt gebruik van TypeScript voor type safety en Tailwind CSS v4 voor styling met custom kleuren en componenten. Framer Motion zorgt voor vloeiende animaties en page transitions, terwijl Lucide React gebruikt wordt voor consistente iconografie. De architectuur is modulair opgezet met herbruikbare UI componenten zoals Kaart, Knop en Sectie die verschillende variants en animatie states ondersteunen. Het project bevat uitgebreide SEO optimalisatie met structured data, Open Graph metadata en performance optimalisaties. De styling maakt gebruik van CSS custom properties voor consistente theming en ondersteunt dark mode en reduced motion preferences. De applicatie is volledig responsive en geoptimaliseerd voor Core Web Vitals met lazy loading, image optimization en efficient bundle splitting.",
    },
  },
  {
    id: 7,
    title: "Komt binnenkort",
    description: "A. Groen - Klus en Rietdekken",
    image: "",
    category: "web",
    repoUrl: "",
    details: {
      description: "Komt binnenkort",
      technologies: [],
      features: [],
      implementation: "",
    },
  },
];

const filterCategories = [
  { value: "all", label: "Alles" },
  { value: "web", label: "Web Development" },
  { value: "design", label: "Design" },
  { value: "mobile", label: "Mobile Apps" },
  { value: "other", label: "Overig" },
];

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [loading, setLoading] = useState(true);
  const [showEmptyProjects, setShowEmptyProjects] = useState(true);

  // Verbeterde loading simulatie met stappen
  useEffect(() => {
    const steps = [
      { progress: 25, step: "Projecten laden...", duration: 800 },
      { progress: 50, step: "Afbeeldingen verwerken...", duration: 600 },
      { progress: 75, step: "Metadata ophalen...", duration: 500 },
      { progress: 100, step: "Portfolio klaar!", duration: 300 },
    ];

    let currentStepIndex = 0;

    const updateStep = () => {
      if (currentStepIndex < steps.length) {
        const currentStep = steps[currentStepIndex];
        setTimeout(() => {
          currentStepIndex++;
          if (currentStepIndex < steps.length) {
            updateStep();
          } else {
            setTimeout(() => setLoading(false), 200);
          }
        }, currentStep.duration);
      }
    };

    updateStep();
  }, []);

  // Reset carousel index when project changes
  // setCurrentImageIndex(0); // removed unused

  // Filter projecten op basis van categorie en verberg "Komt binnenkort..." projecten tenzij ingeschakeld
  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeCategory === "all" || project.category === activeCategory;
    if (!showEmptyProjects && project.title.includes("Komt binnenkort")) {
      return false;
    }
    return matchesCategory;
  });

  // Verbeterd loading scherm met animaties en voortgang
  if (loading) {
    return (
      <section id="portfolio" className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-2 text-foreground">
            Mijn portfolio
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Klik op een project om meer details te zien
          </p>
        </motion.div>

        {/* Verbeterde loading animaties */}
        <div className="min-h-[600px]">
          <PortfolioLoader />

          {/* Skeleton grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
              >
                <ProjectSkeleton />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-2 text-foreground">
          Mijn portfolio
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          Klik op een project om meer details te zien
        </p>
      </motion.div>

      <div className="flex flex-col items-center mb-8 space-y-4">
        <div className="flex flex-wrap justify-center gap-2">
          {filterCategories.map((category) => (
            <button
              key={category.value}
              onClick={() =>
                setActiveCategory(category.value as ProjectCategory)
              }
              className={`px-4 py-2 rounded-full transition-colors ${
                activeCategory === category.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="showEmptyProjects"
            checked={showEmptyProjects}
            onChange={(e) => setShowEmptyProjects(e.target.checked)}
            className="rounded"
          />
          <label
            htmlFor="showEmptyProjects"
            className="text-sm text-muted-foreground"
          >
            Toon &quot;Komt binnenkort&quot; projecten
          </label>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-48 bg-muted">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-muted-foreground">
                      Geen afbeelding
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                {project.details?.technologies &&
                  project.details.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.details.technologies.slice(0, 3).map((tech, i) => (
                        <TechnologyBadge key={tech} name={tech} index={i} />
                      ))}
                      {project.details.technologies.length > 3 && (
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          +{project.details.technologies.length - 3} meer
                        </span>
                      )}
                    </div>
                  )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Modal voor project details (behouden van originele code) */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || "Project details"}
      >
        {selectedProject && (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-accent-foreground mb-2">
                  {selectedProject.title}
                </h2>
                <p className="text-accent-foreground/80">
                  {selectedProject.description}
                </p>
              </div>
              <div className="flex space-x-2">
                {selectedProject.repoUrl && (
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Github size={16} />
                    <span>GitHub</span>
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 bg-secondary text-secondary-foreground px-3 py-2 rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            {selectedProject.details && (
              <div className="space-y-6">
                {/* Project afbeelding of carousel */}
                {selectedProject.details.images &&
                selectedProject.details.images.length > 0 ? (
                  <div className="relative">
                    <DiagramCarousel images={selectedProject.details.images} />
                  </div>
                ) : selectedProject.image ? (
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : null}

                {/* Project beschrijving */}
                <div>
                  <h3 className="text-lg font-semibold text-accent-foreground mb-3">
                    Over dit project
                  </h3>
                  <p className="text-accent-foreground/80 leading-relaxed">
                    {selectedProject.details.description}
                  </p>
                </div>

                {/* Technologieën */}
                {selectedProject.details.technologies.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-accent-foreground mb-3">
                      Gebruikte technologieën
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.details.technologies.map((tech, i) => (
                        <TechnologyBadge key={tech} name={tech} index={i} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                {selectedProject.details.features.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-accent-foreground mb-3">
                      Belangrijkste functies
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.details.features.map(
                        (feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start"
                          >
                            <span className="text-primary mr-2">•</span>
                            <span className="text-accent-foreground/80">
                              {feature}
                            </span>
                          </motion.li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {/* Implementatie */}
                {selectedProject.details.implementation && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-accent-foreground mb-3">
                      Implementatie
                    </h4>
                    <div className="p-4 bg-secondary/30 text-accent-foreground/80 rounded-lg border border-border">
                      {selectedProject.details.implementation}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Portfolio;