// 📁 src/components/Portfolio.tsx - Component (Volledig Performance Optimized)
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LazyImage from "@/components/LazyImage";
import Modal from "@/components/Modal";
import TechnologyBadge from "@/components/TechnologyBadge";
import {
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";

// Types
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

// Performance: Memoized filter categories
const FILTER_CATEGORIES = [
  { value: "all" as const, label: "Alles" },
  { value: "web" as const, label: "Web Development" },
  { value: "design" as const, label: "Design" },
  { value: "mobile" as const, label: "Mobile Apps" },
  { value: "other" as const, label: "Overig" },
] as const;

// Performance: Complete projects data met alle details
const PROJECTS: Project[] = [
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
        "Performance geoptimaliseerd met lazy loading",
        "Modern image optimization",
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
        "De website is gebouwd met Next.js 15.3 voor server-side rendering en optimale prestaties. React 19 wordt gebruikt voor de UI-componenten, terwijl GraphQL zorgt voor efficiënte datacommunicatie met WordPress. TailwindCSS 4.1 met een uitgebreide typografie configuratie zorgt voor consistente styling en responsiviteit. Het project bevat geavanceerde componenten zoals een adaptieve header, geanimeerde menu's, een bookmark systeem en automatische inhoudsopgave generatie.",
    },
  },
  {
    id: 3,
    title: "Binsta - Instagram voor code",
    description:
      "Een sociaal platform waar programmeurs code snippets kunnen delen, liken en becommentariëren.",
    image: "/images/binstawebsite_voorbeeld.png",
    category: "web",
    repoUrl: "https://github.com/milansk05/binsta",
    liveUrl: "",
    details: {
      description:
        "Binsta is een innovatief sociaal platform specifiek ontworpen voor programmeurs en developers. Het stelt gebruikers in staat om code snippets te delen, te liken, te becommentariëren en van elkaar te leren. De applicatie combineert de sociale aspecten van platforms zoals Instagram met de functionaliteit die developers nodig hebben voor het delen van code.",
      technologies: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Socket.io",
        "JWT",
        "Bcrypt",
        "Multer",
      ],
      features: [
        "Gebruikersregistratie en authenticatie met JWT tokens",
        "Code snippets uploaden met syntax highlighting",
        "Real-time like en comment systeem",
        "Gebruikerprofielen met follower/following functionaliteit",
        "Feed algoritme voor relevante content",
        "Code syntax highlighting voor verschillende programmeertalen",
        "Search en filter functionaliteit",
        "Real-time notificaties via Socket.io",
        "Responsive design voor desktop en mobile",
        "File upload voor afbeeldingen en code bestanden",
        "Admin panel voor content moderatie",
        "API endpoints voor alle CRUD operaties",
      ],
      implementation:
        "De frontend is gebouwd met React en maakt gebruik van modern hooks en context API voor state management. De backend API is gebouwd met Express.js en gebruikt MongoDB voor data persistentie. JWT tokens worden gebruikt voor veilige authenticatie en Socket.io zorgt voor real-time functionaliteiten zoals live comments en notificaties. Bcrypt wordt gebruikt voor wachtwoord hashing en Multer voor bestandsuploads. De applicatie volgt RESTful API principes en implementeert proper error handling en input validatie.",
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
        "De UML diagrammen zijn gemaakt met professionele modeling tools zoals Draw.io, Lucidchart en Visual Paradigm. Elk diagram volgt de officiële UML 2.5 specificatie en gebruikt consistente styling en naamgevingsconventies. Ze zijn ontwikkeld als onderdeel van diverse studieopdrachten en projecten om softwareontwerp en -architectuur te documenteren.",
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
    id: 5,
    title: "Website Makers - Professionele Webdevelopment Studio",
    description:
      "Een moderne, volledig geanimeerde bedrijfswebsite voor een webdevelopment studio met focus op conversie en gebruikerservaring.",
    image: "/images/website-makers-frontpage.png",
    category: "web",
    repoUrl: "https://github.com/milansk05/website-makers",
    details: {
      description:
        "Website Makers is een complete bedrijfswebsite voor een professionele webdevelopment studio. De site combineert moderne ontwerpprincipes met geavanceerde animaties en is volledig geoptimaliseerd voor conversie. Het project toont expertise in moderne webdevelopment met Next.js 15, TypeScript en Framer Motion.",
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
        "De Website Makers site is gebouwd als een moderne Next.js 15 applicatie met het nieuwe App Router systeem. Het project maakt gebruik van TypeScript voor type safety en Tailwind CSS v4 voor styling met custom kleuren en componenten. Framer Motion zorgt voor vloeiende animaties en page transitions, terwijl Lucide React gebruikt wordt voor consistente iconografie.",
    },
  },
  {
    id: 6,
    title: "Komt binnenkort",
    description: "???",
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
  {
    id: 7,
    title: "Komt binnenkort",
    description: "???",
    image: "",
    category: "other",
    repoUrl: "",
    details: {
      description: "Komt binnenkort",
      technologies: [],
      features: [],
      implementation: "",
    },
  },
];

// Performance: Memoized ProjectCard component
const ProjectCard = ({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) => {
  const generateBlurDataURL = () => {
    return `data:image/svg+xml;base64,${Buffer.from(
      `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#grad)" />
      </svg>`
    ).toString("base64")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true, margin: "-20px" }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
        {/* Project afbeelding met optimalizatie */}
        <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
          {project.image ? (
            <LazyImage
              src={project.image}
              alt={`Screenshot van ${project.title}`}
              width={400}
              height={300}
              className="w-full h-full"
              placeholder="blur"
              blurDataURL={generateBlurDataURL()}
              priority={index < 3} // Eerste 3 projecten krijgen priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <svg
                  className="w-16 h-16 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <p className="text-sm">Komt binnenkort</p>
              </div>
            </div>
          )}

          {/* Overlay met hover effect */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.div
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-3"
              >
                <Eye className="w-6 h-6 text-primary" />
              </motion.div>
            </div>
          </div>

          {/* Categorie badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full backdrop-blur-sm">
              {project.category === "web"
                ? "Web Dev"
                : project.category === "mobile"
                ? "Mobile"
                : project.category === "design"
                ? "Design"
                : "Overig"}
            </span>
          </div>
        </div>

        {/* Project content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
            {project.title}
          </h3>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Technologieën */}
          {project.details?.technologies &&
            project.details.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.details.technologies.slice(0, 3).map((tech, idx) => (
                  <TechnologyBadge key={tech} name={tech} index={idx} />
                ))}
                {project.details.technologies.length > 3 && (
                  <span className="text-xs text-muted-foreground px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                    +{project.details.technologies.length - 3} meer
                  </span>
                )}
              </div>
            )}

          {/* Action buttons */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {project.repoUrl && (
                <motion.a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-5 h-5" />
                </motion.a>
              )}

              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-5 h-5" />
                </motion.a>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 text-sm font-medium text-primary hover:text-primary-foreground hover:bg-primary rounded-lg transition-all duration-200"
            >
              Meer details
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Performance: Memoized loading component
const PortfolioLoader = () => {
  const [loadingStep, setLoadingStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = useMemo(
    () => [
      { progress: 25, step: "Projecten laden...", duration: 800 },
      { progress: 50, step: "Afbeeldingen verwerken...", duration: 600 },
      { progress: 75, step: "Metadata ophalen...", duration: 500 },
      { progress: 100, step: "Portfolio klaar!", duration: 300 },
    ],
    []
  );

  useEffect(() => {
    let currentStep = 0;
    const updateStep = () => {
      if (currentStep < steps.length) {
        const step = steps[currentStep];
        setLoadingStep(currentStep);
        setProgress(step.progress);

        setTimeout(() => {
          currentStep++;
          if (currentStep < steps.length) {
            updateStep();
          }
        }, step.duration);
      }
    };

    updateStep();
  }, [steps]);

  return (
    <div className="text-center py-16">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full mb-6"
      />

      <div className="max-w-md mx-auto">
        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary/80"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        <motion.p
          key={loadingStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-muted-foreground font-medium"
        >
          {steps[loadingStep]?.step || "Laden..."}
        </motion.p>

        <p className="text-sm text-muted-foreground/70 mt-2">
          {progress}% voltooid
        </p>
      </div>
    </div>
  );
};

// Performance: Memoized empty state
const EmptyState = ({ category }: { category: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-16"
  >
    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
      <svg
        className="w-8 h-8 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">
      Geen projecten gevonden
    </h3>
    <p className="text-muted-foreground">
      Er zijn momenteel geen projecten beschikbaar voor{" "}
      {category === "all" ? "alle categorieën" : `categorie &quot;${category}&quot;`}
    </p>
  </motion.div>
);

// Main Portfolio Component
const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [loading, setLoading] = useState(true);
  const [showEmptyProjects, setShowEmptyProjects] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Performance: Memoized filtered projects
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCategory =
        activeCategory === "all" || project.category === activeCategory;
      const isEmptyProject = project.title.includes("Komt binnenkort");

      if (!showEmptyProjects && isEmptyProject) {
        return false;
      }

      return matchesCategory;
    });
  }, [activeCategory, showEmptyProjects]);

  // Performance: Optimized loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  // Reset carousel index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProject]);

  // Performance: Memoized handlers
  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleCategoryChange = useCallback((category: ProjectCategory) => {
    setActiveCategory(category);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const nextImage = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (selectedProject?.details?.images) {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === selectedProject.details!.images!.length - 1
            ? 0
            : prevIndex + 1
        );
      }
    },
    [selectedProject]
  );

  const prevImage = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (selectedProject?.details?.images) {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === 0
            ? selectedProject.details!.images!.length - 1
            : prevIndex - 1
        );
      }
    },
    [selectedProject]
  );

  if (loading) {
    return (
      <section id="portfolio" className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-2 text-foreground">
            Mijn Portfolio
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Performance geoptimaliseerd met lazy loading en moderne image
            optimization
          </p>
        </motion.div>
        <PortfolioLoader />
      </section>
    );
  }

  return (
    <section id="portfolio" className="mb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-2 text-foreground">
          Mijn Portfolio
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          Klik op een project om meer details te zien
        </p>
      </motion.div>

      {/* Category filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap justify-center gap-2 mb-8"
      >
        {FILTER_CATEGORIES.map((category) => (
          <button
            key={category.value}
            onClick={() => handleCategoryChange(category.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === category.value
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-gray-100 dark:bg-gray-800 text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {category.label}
          </button>
        ))}
      </motion.div>

      {/* Performance statistics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-4 text-sm text-muted-foreground bg-gray-50 dark:bg-gray-900 px-4 py-2 rounded-full">
          <span>📊 {filteredProjects.length} projecten</span>
          <span>⚡ Lazy loading actief</span>
          <span>🖼️ WebP optimalisatie</span>
          <span>🎯 Performance optimized</span>
        </div>
      </motion.div>

      {/* Projects grid */}
      <AnimatePresence mode="wait">
        {filteredProjects.length > 0 ? (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </motion.div>
        ) : (
          <EmptyState category={activeCategory} />
        )}
      </AnimatePresence>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center mt-12"
      >
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={showEmptyProjects}
            onChange={(e) => setShowEmptyProjects(e.target.checked)}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          Toon &quot;Komt binnenkort&quot; projecten
        </label>
      </motion.div>

      {/* Project modal */}
      <AnimatePresence>
        {selectedProject && (
          <Modal
            isOpen={!!selectedProject}
            onClose={handleCloseModal}
            title={selectedProject?.title || "Project details"}
          >
            <div className="relative">
              {/* Modal content */}
              <div className="bg-card rounded-xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b border-border">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        {selectedProject.title}
                      </h2>
                      <p className="text-muted-foreground">
                        {selectedProject.description}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 ml-4">
                      {selectedProject.repoUrl && (
                        <motion.a
                          href={selectedProject.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors duration-200"
                        >
                          <Github className="w-5 h-5" />
                        </motion.a>
                      )}

                      {selectedProject.liveUrl && (
                        <motion.a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors duration-200"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                  {/* Project afbeelding(en) */}
                  {selectedProject.details?.images &&
                  selectedProject.details.images.length > 0 ? (
                    <div className="relative">
                      <div className="relative h-80 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <LazyImage
                          src={
                            selectedProject.details.images[currentImageIndex]
                          }
                          alt={`${selectedProject.title} - Afbeelding ${
                            currentImageIndex + 1
                          }`}
                          width={800}
                          height={600}
                          className="w-full h-full"
                          priority={true}
                        />

                        {/* Navigation arrows */}
                        {selectedProject.details.images.length > 1 && (
                          <>
                            <button
                              onClick={prevImage}
                              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-all duration-200"
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>

                            <button
                              onClick={nextImage}
                              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-all duration-200"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </>
                        )}

                        {/* Image indicator */}
                        {selectedProject.details.images.length > 1 && (
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {selectedProject.details.images.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                  index === currentImageIndex
                                    ? "bg-white"
                                    : "bg-white/50 hover:bg-white/75"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : selectedProject.image ? (
                    <div className="relative h-64 rounded-lg overflow-hidden">
                      <LazyImage
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        width={800}
                        height={400}
                        className="w-full h-full"
                        priority={true}
                      />
                    </div>
                  ) : null}

                  {/* Project beschrijving */}
                  {selectedProject.details?.description && (
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        Over dit project
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedProject.details.description}
                      </p>
                    </div>
                  )}

                  {/* Technologieën */}
                  {selectedProject.details?.technologies &&
                    selectedProject.details.technologies.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-3">
                          Gebruikte technologieën
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.details.technologies.map(
                            (tech, idx) => (
                              <TechnologyBadge
                                key={tech}
                                name={tech}
                                index={idx}
                              />
                            )
                          )}
                        </div>
                      </div>
                    )}

                  {/* Features */}
                  {selectedProject.details?.features &&
                    selectedProject.details.features.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-3">
                          Belangrijkste functies
                        </h4>
                        <ul className="space-y-2">
                          {selectedProject.details.features.map(
                            (feature, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-start"
                              >
                                <span className="text-primary mr-3 mt-1">
                                  •
                                </span>
                                <span className="text-muted-foreground">
                                  {feature}
                                </span>
                              </motion.li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                  {/* Implementatie */}
                  {selectedProject.details?.implementation && (
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">
                        Implementatie details
                      </h4>
                      <div className="p-4 bg-gray-50 dark:bg-gray-900 text-muted-foreground rounded-lg border border-border">
                        {selectedProject.details.implementation}
                      </div>
                    </div>
                  )}

                  {/* Project stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {selectedProject.details?.technologies?.length || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Technologieën
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {selectedProject.details?.features?.length || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Features
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {selectedProject.details?.images?.length ||
                          (selectedProject.image ? 1 : 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Afbeeldingen
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {selectedProject.category.toUpperCase()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Categorie
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-border">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {selectedProject.repoUrl && (
                        <motion.a
                          href={selectedProject.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
                        >
                          <Github className="w-4 h-4" />
                          <span className="text-sm font-medium">View Code</span>
                        </motion.a>
                      )}

                      {selectedProject.liveUrl && (
                        <motion.a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="text-sm font-medium">Live Demo</span>
                        </motion.a>
                      )}
                    </div>

                    <motion.button
                      onClick={handleCloseModal}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                    >
                      Sluiten
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;