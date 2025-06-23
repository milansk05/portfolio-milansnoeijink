// src/components/SkillsTimeline.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Zap } from "lucide-react";

interface TimelineEvent {
  year: string;
  event: string;
  icon?: string;
  description?: string;
}

const timeline: TimelineEvent[] = [
  {
    year: "2022",
    event: "Begin van mijn codereis",
    description:
      "Start van mijn opleiding bij Bit Academy Noorderpoort. Leerde de fundamenten van softwareontwikkeling, waaronder HTML, CSS en Command Line.",
  },
  {
    year: "2022-2023",
    event: "Frontend fundamenten",
    description:
      "Verdiepte kennis van HTML, CSS en JavaScript. Begon met het bouwen van interactieve websites en leerde frameworks als Bootstrap.",
  },
  {
    year: "2023",
    event: "Backend ontwikkeling",
    description:
      "Eerste stappen in backend-development met PHP en MySQL. Leerde database-ontwerp en -management, evenals hoe ik full-stack webapplicaties kon bouwen.",
  },
  {
    year: "2024",
    event: "Moderne frameworks",
    description:
      "Begon met het gebruik van moderne frameworks zoals React en Next.js. Verbeterde mijn JavaScript-vaardigheden en leerde TypeScript voor type-veilige code.",
  },
  {
    year: "2024-2025",
    event: "Professionele groei",
    description:
      "Stage bij HQ-Online waar ik werkte met WordPress en geavanceerd PHP (inclusief het maken van plugins). Leerde hoe het is om in een professionele bedrijfsomgeving te werken en in teamverband projecten te voltooien.",
  },
  {
    year: "2025",
    event: "Huidige focus",
    description:
      "Momenteel focus ik op het verdiepen van mijn kennis van moderne front-end ontwikkeling, state management, performance optimalisatie en toegankelijkheid.",
  },
];

// Thematische timeline loader
const TimelineLoader = () => (
  <section className="mb-20 min-h-[400px] flex items-center justify-center">
    <div className="text-center">
      {/* Titel */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-foreground mb-8"
      >
        Leerpad laden...
      </motion.h2>

      {/* Geanimeerde tijdlijn preview */}
      <div className="relative">
        {/* Centrale lijn */}
        <div className="w-1 h-64 bg-gray-200 dark:bg-gray-700 mx-auto relative">
          <motion.div
            className="w-1 bg-primary absolute top-0"
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
          />
        </div>

        {/* Geanimeerde punten op de tijdlijn */}
        {Array.from({ length: 3 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{ top: `${(index + 1) * 20}%` }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.5,
            }}
          >
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              {index === 0 && <Calendar className="w-3 h-3 text-white" />}
              {index === 1 && <Clock className="w-3 h-3 text-white" />}
              {index === 2 && <Zap className="w-3 h-3 text-white" />}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Laadtekst */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-muted-foreground mt-8"
      >
        <motion.span
          animate={{
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Tijdlijn samenstellen...
        </motion.span>
      </motion.p>
    </div>
  </section>
);

const SkillsTimeline = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuleer laadtijd voor timeline inhoud
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timelineElement = timelineRef.current;
      const timelineTop = timelineElement.getBoundingClientRect().top;
      const timelineBottom = timelineElement.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;

      // Bepaal wanneer de tijdlijn in beeld komt
      if (timelineTop < windowHeight && timelineBottom > 0) {
        setIsInView(true);

        const totalHeight = timelineElement.offsetHeight;
        const scrollProgressValue =
          timelineTop <= 0
            ? Math.min(
                1,
                Math.abs(timelineTop) / (totalHeight - windowHeight) + 0.1
              )
            : 0.1; // Start met een klein deel gevuld

        setScrollProgress(Math.min(1, Math.max(0.1, scrollProgressValue)));
      } else {
        setIsInView(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Direct een keer aanroepen om de initiële staat te bepalen
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TimelineLoader />
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
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-2 text-foreground">
            Mijn Leerpad
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Een overzicht van mijn ontwikkeling als software developer door de
            jaren heen
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative max-w-3xl mx-auto">
          {/* Achtergrond tijdlijn (onvolledig deel) */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-secondary/70 transform md:translate-x-[-50%]"></div>

          {/* Geanimeerde tijdlijn die gevuld wordt tijdens scrollen */}
          <motion.div
            className="absolute left-0 md:left-1/2 top-0 w-1 bg-primary transform md:translate-x-[-50%]"
            animate={{
              height: isInView ? `${scrollProgress * 100}%` : "0%",
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          />

          {timeline.map((item, index) => (
            <motion.div
              key={index}
              className={`mb-12 relative ${
                index % 2 === 0
                  ? "md:text-right md:mr-[50%] md:pr-8"
                  : "md:ml-[50%] md:pl-8"
              } pl-8 md:pl-0`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Cirkel op de tijdlijn met kleur die verandert afhankelijk van de scrollpositie */}
              <div
                className={`absolute left-[-8px] md:left-1/2 top-0 w-4 h-4 rounded-full md:translate-x-[-50%] border-4 border-background ${
                  scrollProgress * 100 >= (index / (timeline.length - 1)) * 100
                    ? "bg-primary"
                    : "bg-secondary/70"
                }`}
              />

              <div
                className={`bg-card p-6 rounded-lg shadow-lg ${
                  index % 2 === 0 ? "md:mr-4" : "md:ml-4"
                }`}
              >
                <div className="font-bold text-lg text-primary mb-2">
                  {item.year}
                </div>
                <h3 className="text-xl font-bold mb-2 text-accent-foreground">
                  {item.event}
                </h3>
                {item.description && (
                  <p className="text-accent-foreground/80">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default SkillsTimeline;