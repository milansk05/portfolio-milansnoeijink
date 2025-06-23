// src/components/About.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { User, Code, Lightbulb } from "lucide-react";

// Thematische about loader
const AboutLoader = () => (
  <section
    id="overmij"
    className="mb-20 relative overflow-hidden min-h-[500px] flex items-center justify-center"
  >
    <div className="text-center">
      {/* Geanimeerd profiel icoon */}
      <motion.div
        className="mb-6"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
          <User className="w-12 h-12 text-white" />
        </div>
      </motion.div>

      {/* Floating icons */}
      <div className="relative mb-8">
        <motion.div
          className="absolute -left-16 top-0"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="p-3 bg-emerald-500/20 rounded-full">
            <Code className="w-6 h-6 text-emerald-500" />
          </div>
        </motion.div>

        <motion.div
          className="absolute -right-16 top-0"
          animate={{
            y: [0, -15, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <div className="p-3 bg-amber-500/20 rounded-full">
            <Lightbulb className="w-6 h-6 text-amber-500" />
          </div>
        </motion.div>
      </div>

      {/* Laadtekst */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg text-muted-foreground"
      >
        <motion.span
          animate={{
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Informatie laden...
        </motion.span>
      </motion.p>
    </div>
  </section>
);

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuleer laadtijd voor about inhoud
    const timer = setTimeout(() => setLoading(false), 1700);
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
          <AboutLoader />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.section
        id="overmij"
        className="mb-20 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Decoratieve elementen op de achtergrond */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>

        {/* Container voor inhoud */}
        <div className="relative bg-card rounded-xl shadow-lg p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Profielfoto wrapper met animatie */}
            <motion.div
              className="relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/images/profielfoto.jpg"
                  alt="Milan Snoeijink"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 160px, 192px"
                  priority
                />
              </div>

              {/* Decoratief element achter de afbeelding */}
              <div className="absolute -z-10 -bottom-3 -right-3 w-40 h-40 md:w-48 md:h-48 bg-primary/10 rounded-xl"></div>
            </motion.div>

            {/* Tekstinhoud */}
            <div className="flex-1">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="inline-block mb-2 px-3 py-1 bg-primary/10 rounded-full">
                  <h2 className="text-lg font-medium text-primary">Over mij</h2>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-accent-foreground">
                  Milan Snoeijink
                </h3>
                <div className="text-accent-foreground/80 space-y-4">
                  <p>
                    Hey! Ik ben Milan Snoeijink, een gedreven derdejaars student
                    Software Development aan de Bit Academy in Groningen. Mijn
                    passie ligt bij het ontwikkelen van efficiënte, creatieve
                    oplossingen voor complexe problemen.
                  </p>
                  <p>
                    Ik heb ervaring met diverse programmeertalen en frameworks
                    en werk graag aan innovatieve projecten. Nieuwsgierig? Laten
                    we connecten!
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Statistieken sectie */}
          <motion.div
            className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <StatsCard
              number="3+"
              text="Jaar ervaring in softwareontwikkeling"
              delay={0.1}
            />
            <StatsCard
              number="10+"
              text="(Succesvol) afgeronde projecten"
              delay={0.2}
            />
            <StatsCard
              number="Frontend & Backend"
              text="Full-stack ervaring"
              delay={0.3}
            />
          </motion.div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

interface StatsCardProps {
  number: string;
  text: string;
  delay?: number;
}

const StatsCard = ({ number, text, delay = 0 }: StatsCardProps) => {
  return (
    <motion.div
      className="relative overflow-hidden p-6 rounded-lg bg-gradient-to-br from-background to-muted border border-border shadow-md group"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      {/* Achtergrond gradiënt animatie bij hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <h3 className="text-2xl font-bold text-accent-foreground mb-1">
        {number}
      </h3>
      <p className="text-sm text-muted-foreground">{text}</p>
    </motion.div>
  );
};

export default About;