// src/components/Expertise.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Palette, Smartphone, Brain } from "lucide-react";

const expertiseItems = [
  {
    title: "Projectmanagement",
    description:
      "Met drie jaar ervaring in softwareontwikkeling weet ik hoe belangrijk een goed georganiseerd project is. Ik zorg voor structuur, heldere taakverdeling en strakke deadlines. Dit resulteert in efficiënte workflows en succesvolle projecten.",
    icon: Briefcase,
    color: "#3B82F6",
    background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
  },
  {
    title: "Creatief probleemoplossen",
    description:
      "Ik ben gedreven om complexe problemen op een innovatieve manier aan te pakken. Door strategisch en out-of-the-box te denken, ontwikkel ik slimme en efficiënte oplossingen die echt impact maken.",
    icon: Palette,
    color: "#EC4899",
    background: "linear-gradient(135deg, #EC4899 0%, #BE185D 100%)",
  },
  {
    title: "UI & UX Design",
    description:
      "Een intuïtieve en aantrekkelijke interface is essentieel voor een sterke gebruikerservaring. Ik ontwerp visueel aantrekkelijke en gebruiksvriendelijke interfaces die naadloos aansluiten op de behoeften van de gebruiker.",
    icon: Smartphone,
    color: "#10B981",
    background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
  },
  {
    title: "Analytisch denken",
    description:
      "Sterk analytisch vermogen helpt mij om complexe vraagstukken te doorgronden en logische, doordachte oplossingen te bieden. Ik breek problemen af in behapbare stappen en kies de meest efficiënte route naar een werkend eindresultaat.",
    icon: Brain,
    color: "#8B5CF6",
    background: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
  },
];

// Thematische expertise loader
const ExpertiseLoader = () => {
  const loaderIcons = [
    { icon: Briefcase, color: "#3B82F6", delay: 0 },
    { icon: Palette, color: "#EC4899", delay: 0.3 },
    { icon: Smartphone, color: "#10B981", delay: 0.6 },
    { icon: Brain, color: "#8B5CF6", delay: 0.9 },
  ];

  return (
    <section
      id="expertise"
      className="mb-20 min-h-[400px] flex items-center justify-center"
    >
      <div className="text-center">
        {/* Titel */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-foreground mb-8"
        >
          Expertise laden...
        </motion.h2>

        {/* Geanimeerde iconen grid */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {loaderIcons.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: item.delay,
                type: "spring",
                bounce: 0.4,
              }}
            >
              <motion.div
                className="p-6 rounded-full mb-4"
                style={{ backgroundColor: `${item.color}20` }}
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.delay,
                }}
              >
                <item.icon className="w-8 h-8" style={{ color: item.color }} />
              </motion.div>

              {/* Laadbalken */}
              <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className="h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 2,
                    delay: item.delay + 0.5,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Laadtekst */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-muted-foreground"
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
            Vaardigheden analyseren...
          </motion.span>
        </motion.p>
      </div>
    </section>
  );
};

const Expertise = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuleer laadtijd voor expertise inhoud
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
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
          <ExpertiseLoader />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.section
        id="expertise"
        className="mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Mijn expertise
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Bekijk hier mijn expertise op het gebied van projectmanagement,
            design en probleemoplossing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {expertiseItems.map((item, index) => (
            <motion.div
              key={item.title}
              className="group relative bg-card rounded-lg shadow-lg p-6 text-card-foreground overflow-hidden hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Achtergrond accent */}
              <div
                className="absolute top-0 left-0 w-full h-1 opacity-70"
                style={{ background: item.background }}
              />

              {/* Icoon container met gradient achtergrond */}
              <div className="relative mb-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}20 0%, ${item.color}40 100%)`,
                  }}
                >
                  <item.icon
                    className="w-8 h-8"
                    style={{ color: item.color }}
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2 text-accent-foreground group-hover:text-primary transition-colors">
                {item.title}
              </h3>

              <p className="text-accent-foreground/80">{item.description}</p>

              {/* Hoek decoratie */}
              <div
                className="absolute bottom-0 right-0 w-12 h-12 -mb-6 -mr-6 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ background: item.background }}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default Expertise;