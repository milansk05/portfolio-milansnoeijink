// src/components/CareerTimeline.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Trophy,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Building
} from "lucide-react";

interface CareerEvent {
  id: string;
  year: string;
  period: string;
  title: string;
  organization: string;
  location: string;
  type: "opleiding" | "stage" | "project" | "certificaat" | "mijlpaal";
  description: string;
  skills: string[];
  achievements: string[];
  details?: {
    responsibilities?: string[];
    projects?: string[];
    technologies?: string[];
    links?: {
      url: string;
      label: string;
    }[];
  };
  color: string;
  icon: typeof Calendar;
}

const careerEvents: CareerEvent[] = [
  {
    id: "start-2022",
    year: "2022",
    period: "September 2022",
    title: "Start Software Development Opleiding",
    organization: "Bit Academy Noorderpoort",
    location: "Groningen, Nederland",
    type: "opleiding",
    description: "Begin van mijn reis in de wereld van softwareontwikkeling. Eerste kennismaking met programmeren en de fundamenten van webdevelopment.",
    skills: ["HTML", "CSS", "Command Line", "Git Basics", "Problem Solving"],
    achievements: [
      "Eerste werkende website gebouwd",
      "Basis van versioneringssystemen geleerd",
      "Fundamenten van webstandaarden eigen gemaakt"
    ],
    details: {
      responsibilities: [
        "Leren van HTML semantiek en structuur",
        "CSS styling en layout technieken",
        "Basis command line operaties",
        "Eerste stappen in version control met Git"
      ],
      projects: [
        "Eerste persoonlijke website",
        "Statische HTML/CSS projecten",
        "Basis formulieren en interactiviteit"
      ],
      technologies: ["HTML5", "CSS3", "Git", "VS Code", "GitHub"]
    },
    color: "#3B82F6",
    icon: GraduationCap
  },
  {
    id: "frontend-2023",
    year: "2023",
    period: "2022 - 2023",
    title: "Frontend Development Specialisatie",
    organization: "Bit Academy Noorderpoort",
    location: "Groningen, Nederland",
    type: "opleiding",
    description: "Verdieping in frontend technologieën met focus op JavaScript en moderne workflows. Eerste dynamische webapplicaties gebouwd.",
    skills: ["JavaScript", "Bootstrap", "jQuery", "Responsive Design", "DOM Manipulation"],
    achievements: [
      "Eerste interactieve webapplicaties gebouwd",
      "Responsive design principes toegepast",
      "JavaScript ES6+ features geleerd"
    ],
    details: {
      responsibilities: [
        "JavaScript programmeerconcepten leren",
        "Werken met DOM API's en event handling",
        "Responsive web design implementeren",
        "Gebruik van CSS frameworks zoals Bootstrap"
      ],
      projects: [
        "Interactieve dashboard applicatie",
        "Mobile-first responsive websites",
        "JavaScript games en calculators"
      ],
      technologies: ["JavaScript ES6+", "Bootstrap", "jQuery", "CSS Grid", "Flexbox"]
    },
    color: "#F59E0B",
    icon: Code
  },
  {
    id: "backend-2023",
    year: "2023",
    period: "Midden 2023",
    title: "Backend Development & Databases",
    organization: "Bit Academy Noorderpoort",
    location: "Groningen, Nederland",
    type: "opleiding",
    description: "Introductie in server-side development met PHP en database management. Eerste full-stack applicaties ontwikkeld.",
    skills: ["PHP", "MySQL", "SQL", "Database Design", "MVC Pattern"],
    achievements: [
      "Eerste full-stack webapplicatie ontwikkeld",
      "Database ontwerp en normalisatie geleerd",
      "Server-side programmeerconcepten toegepast"
    ],
    details: {
      responsibilities: [
        "PHP server-side logica ontwikkelen",
        "Database schema's ontwerpen en implementeren",
        "SQL queries schrijven en optimaliseren",
        "MVC architectuur patroon toepassen"
      ],
      projects: [
        "Content Management Systeem",
        "User authentication systeem",
        "E-commerce applicatie prototype"
      ],
      technologies: ["PHP 8", "MySQL", "phpMyAdmin", "Apache", "MVC Architecture"]
    },
    color: "#8B5CF6",
    icon: Building
  },
  {
    id: "modern-frameworks-2024",
    year: "2024",
    period: "Begin 2024",
    title: "Moderne Frameworks & Tools",
    organization: "Bit Academy Noorderpoort",
    location: "Groningen, Nederland",
    type: "opleiding",
    description: "Overgang naar moderne development met React, Next.js en TypeScript. Focus op component-based architectuur en type safety.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Component Architecture"],
    achievements: [
      "React ecosystem volledig verkend",
      "TypeScript voor type-safe development geïmplementeerd",
      "Moderne build tools en workflows opgezet"
    ],
    details: {
      responsibilities: [
        "React componenten en hooks ontwikkelen",
        "Next.js applicaties bouwen met SSR/SSG",
        "TypeScript implementeren voor type safety",
        "Moderne CSS frameworks zoals Tailwind CSS gebruiken"
      ],
      projects: [
        "Portfolio website met Next.js",
        "React dashboard applicatie",
        "TypeScript-based componenten bibliotheek"
      ],
      technologies: ["React 18", "Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"]
    },
    color: "#06B6D4",
    icon: Code
  },
  {
    id: "stage-hq-online",
    year: "2024-2025",
    period: "September 2024 - Heden",
    title: "Stage WordPress Developer",
    organization: "HQ-Online",
    location: "Groningen, Nederland",
    type: "stage",
    description: "Professionele stage als WordPress developer waar ik werk aan klantprojecten en plugin development. Eerste ervaring in een professionele ontwikkelomgeving.",
    skills: ["WordPress", "PHP Advanced", "Plugin Development", "Client Communication", "Professional Workflow"],
    achievements: [
      "Eerste professionele WordPress plugins ontwikkeld",
      "Klantprojecten succesvol opgeleverd",
      "Team collaboration ervaring opgedaan"
    ],
    details: {
      responsibilities: [
        "WordPress themes en plugins ontwikkelen",
        "Klantspecifieke oplossingen implementeren",
        "Code reviews en teamwork",
        "Projectmanagement en deadlines behalen"
      ],
      projects: [
        "Custom WordPress plugins voor klanten",
        "Theme ontwikkeling en aanpassingen",
        "E-commerce oplossingen met WooCommerce"
      ],
      technologies: ["WordPress", "PHP 8+", "MySQL", "WooCommerce", "ACF Pro"],
      links: [
        {
          url: "https://www.hq-online.nl",
          label: "HQ-Online Website"
        }
      ]
    },
    color: "#10B981",
    icon: Briefcase
  },
  {
    id: "current-focus-2025",
    year: "2025",
    period: "Heden",
    title: "Moderne Frontend Specialisatie",
    organization: "Zelfstandige Ontwikkeling",
    location: "Groningen, Nederland",
    type: "mijlpaal",
    description: "Focus op geavanceerde frontend development, performance optimalisatie, en toegankelijkheid. Building van moderne web experiences.",
    skills: ["Advanced React", "Performance Optimization", "Accessibility", "Modern CSS", "State Management"],
    achievements: [
      "Portfolio website volledig vernieuwd",
      "Geavanceerde animaties geïmplementeerd",
      "Performance en toegankelijkheid geoptimaliseerd"
    ],
    details: {
      responsibilities: [
        "Geavanceerde React patterns implementeren",
        "Web performance optimalisatie",
        "Toegankelijkheidsstandaarden toepassen",
        "Modern CSS technieken zoals Grid en Custom Properties"
      ],
      projects: [
        "Nieuwe portfolio website",
        "Interactieve web componenten",
        "Performance-geoptimaliseerde applicaties"
      ],
      technologies: ["React 19", "Next.js 15", "Framer Motion", "CSS Grid", "Web Vitals"]
    },
    color: "#EC4899",
    icon: Trophy
  }
];

// Icon mapping voor verschillende types
const getIconForType = (type: CareerEvent["type"]) => {
  switch (type) {
    case "opleiding":
      return GraduationCap;
    case "stage":
      return Briefcase;
    case "project":
      return Code;
    case "certificaat":
      return Trophy;
    case "mijlpaal":
      return Trophy;
    default:
      return Calendar;
  }
};

// Timeline loader component
const CareerTimelineLoader = () => (
  <section className="mb-20 min-h-[600px] flex items-center justify-center">
    <div className="text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-foreground mb-8"
      >
        Carrière tijdlijn laden...
      </motion.h2>

      {/* Geanimeerde horizontale tijdlijn preview */}
      <div className="relative w-96 mx-auto">
        {/* Horizontale lijn */}
        <div className="h-1 bg-gray-200 dark:bg-gray-700 relative overflow-hidden rounded-full">
          <motion.div
            className="h-1 bg-primary absolute left-0 top-0 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
          />
        </div>

        {/* Geanimeerde punten */}
        {Array.from({ length: 5 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-primary rounded-full"
            style={{ left: `${(index + 1) * 16}%` }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.3,
            }}
          />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-muted-foreground mt-8"
      >
        Professionale reis samenstellen...
      </motion.p>
    </div>
  </section>
);

const CareerTimeline = () => {
  const [selectedEvent, setSelectedEvent] = useState<CareerEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Voor oneindige loop: we dupliceren de events 3 keer
  const infiniteEvents = [...careerEvents, ...careerEvents, ...careerEvents];

  useEffect(() => {
    // Simuleer laadtijd voor carrière data
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current && !isTransitioning) {
        const { scrollLeft } = timelineRef.current;
        const itemWidth = 320 + 64; // kaartbreedte + gap
        const totalOriginalWidth = careerEvents.length * itemWidth;
        // Check of we aan het einde zijn en reset naar het begin (oneindige loop)
        if (scrollLeft >= totalOriginalWidth * 2) {
          setIsTransitioning(true);
          timelineRef.current.scrollTo({
            left: totalOriginalWidth,
            behavior: 'auto' // Instant reset zonder animatie
          });
          setTimeout(() => setIsTransitioning(false), 50);
        }
        // Check of we aan het begin zijn en jump naar het midden
        else if (scrollLeft <= 0) {
          setIsTransitioning(true);
          timelineRef.current.scrollTo({
            left: totalOriginalWidth,
            behavior: 'auto' // Instant reset zonder animatie
          });
          setTimeout(() => setIsTransitioning(false), 50);
        }
      }
    };

    const timelineElement = timelineRef.current;
    if (timelineElement) {
      timelineElement.addEventListener("scroll", handleScroll);
      
      // Start in het midden voor oneindige scroll effect
      const itemWidth = 320 + 64;
      const initialPosition = careerEvents.length * itemWidth;
      timelineElement.scrollTo({ left: initialPosition, behavior: 'auto' });
    }

    return () => {
      if (timelineElement) {
        timelineElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isTransitioning]);

  const scrollTimeline = (direction: "left" | "right") => {
    if (timelineRef.current && !isTransitioning) {
      const scrollAmount = 384; // kaartbreedte + gap (320 + 64)
      const currentScroll = timelineRef.current.scrollLeft;
      const newScrollPosition = direction === "left" 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      timelineRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth"
      });
    }
  };

  if (loading) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CareerTimelineLoader />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.section
        className="mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2 text-foreground">
            Mijn Carrière Reis
          </h2>
          <p className="text-muted-foreground">
            Van student tot professionele developer - ontdek mijn ontwikkeling door de jaren heen
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Scroll Buttons - altijd beschikbaar voor oneindige scroll */}
          <button
            onClick={() => scrollTimeline("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background border border-border shadow-lg flex items-center justify-center transition-all text-foreground hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => scrollTimeline("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background border border-border shadow-lg flex items-center justify-center transition-all text-foreground hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight size={20} />
          </button>

          {/* Horizontale Tijdlijn */}
          <div
            ref={timelineRef}
            className="overflow-x-auto scrollbar-hide px-12"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex items-center py-8" style={{ width: 'max-content' }}>
              {infiniteEvents.map((event, index) => {
                const IconComponent = getIconForType(event.type);
                const isSelected = selectedEvent?.id === event.id;
                const originalIndex = index % careerEvents.length;

                return (
                  <div key={`${event.id}-${index}`} className="flex items-center">
                    {/* Event Card */}
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: (originalIndex * 0.1) % 0.6 }}
                    >
                      {/* Connection Line (tussen alle items) */}
                      <div className="absolute top-6 left-full w-16 h-0.5 bg-border z-0" />

                      {/* Event Card */}
                      <motion.div
                        className={`relative cursor-pointer p-6 rounded-xl border transition-all duration-300 bg-card min-w-[320px] max-w-[320px] mr-16 ${
                          isSelected
                            ? "border-primary shadow-lg scale-105"
                            : "border-border hover:border-primary/50 hover:shadow-md"
                        }`}
                        onClick={() => setSelectedEvent(isSelected ? null : event)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Header met icoon en jaar */}
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                            style={{ backgroundColor: event.color }}
                          >
                            <IconComponent size={18} />
                          </div>
                          <div>
                            <div className="font-bold text-foreground">{event.year}</div>
                            <div className="text-sm text-muted-foreground">{event.period}</div>
                          </div>
                        </div>

                        {/* Titel en organisatie */}
                        <h3 className="font-semibold text-foreground mb-1 leading-tight">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                          <Building size={12} />
                          <span>{event.organization}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                          <MapPin size={12} />
                          <span>{event.location}</span>
                        </div>

                        {/* Korte beschrijving */}
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {event.description}
                        </p>

                        {/* Skills preview */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {event.skills.slice(0, 3).map((skill, skillIndex) => (
                            <span
                              key={`${skill}-${index}-${skillIndex}`}
                              className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                          {event.skills.length > 3 && (
                            <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md">
                              +{event.skills.length - 3} meer
                            </span>
                          )}
                        </div>

                        {/* Click indicator */}
                        <div className="text-xs text-primary font-medium">
                          {isSelected ? "Klik om te sluiten" : "Klik voor details"}
                        </div>

                        {/* Indicator voor geselecteerd item */}
                        {isSelected && (
                          <motion.div
                            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-primary"
                            layoutId="selected-indicator"
                          />
                        )}
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 max-w-4xl mx-auto"
            >
              <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Linker kolom: Algemene info */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: selectedEvent.color }}
                      >
                        {selectedEvent.icon && <selectedEvent.icon size={20} />}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">
                          {selectedEvent.title}
                        </h3>
                        <p className="text-muted-foreground">{selectedEvent.period}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <Building size={14} className="text-primary" />
                        <span className="text-foreground">{selectedEvent.organization}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin size={14} className="text-primary" />
                        <span className="text-foreground">{selectedEvent.location}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6">
                      {selectedEvent.description}
                    </p>

                    {/* Links */}
                    {selectedEvent.details?.links && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-2">Links</h4>
                        <div className="space-y-2">
                          {selectedEvent.details.links.map((link, index) => (
                            <a
                              key={index}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-primary hover:underline"
                            >
                              <ExternalLink size={14} />
                              {link.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Achievements */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Hoogtepunten</h4>
                      <ul className="space-y-2">
                        {selectedEvent.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Trophy size={14} className="text-primary mt-1 flex-shrink-0" />
                            <span className="text-muted-foreground text-sm">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Rechter kolom: Details */}
                  <div>
                    {/* Skills */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">Vaardigheden</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEvent.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-md border border-primary/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    {selectedEvent.details?.technologies && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-3">Technologieën</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedEvent.details.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Responsibilities */}
                    {selectedEvent.details?.responsibilities && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-3">Verantwoordelijkheden</h4>
                        <ul className="space-y-2">
                          {selectedEvent.details.responsibilities.map((responsibility, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-muted-foreground text-sm">{responsibility}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Projects */}
                    {selectedEvent.details?.projects && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Projecten</h4>
                        <ul className="space-y-2">
                          {selectedEvent.details.projects.map((project, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Code size={14} className="text-primary mt-1 flex-shrink-0" />
                              <span className="text-muted-foreground text-sm">{project}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </AnimatePresence>
  );
};

export default CareerTimeline;