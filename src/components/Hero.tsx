// src/components/Hero.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowRight, Code, Palette, Smartphone } from "lucide-react";
import { smoothScroll } from "@/utils/smoothScroll";

// Thematische hero loader
const HeroLoader = () => (
  <section className="text-center mb-20 pt-32 min-h-[500px] flex items-center">
    <div className="max-w-3xl mx-auto px-4 w-full">
      <div className="text-center">
        {/* Geanimeerde iconen */}
        <div className="flex justify-center gap-8 mb-8">
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="p-4 bg-blue-500/20 rounded-full"
          >
            <Code className="w-8 h-8 text-blue-500" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
            className="p-4 bg-purple-500/20 rounded-full"
          >
            <Palette className="w-8 h-8 text-purple-500" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
            className="p-4 bg-emerald-500/20 rounded-full"
          >
            <Smartphone className="w-8 h-8 text-emerald-500" />
          </motion.div>
        </div>

        {/* Laadtekst */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-muted-foreground"
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
            Portfolio laden...
          </motion.span>
        </motion.div>

        {/* Laadvoortgang */}
        <div className="w-64 mx-auto mt-6">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Hero = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuleer laadtijd voor hero inhoud
    const timer = setTimeout(() => setLoading(false), 2000);
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
          <HeroLoader />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.section
        className="text-center mb-20 pt-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-foreground leading-tight">
              Hallo, ik ben<br></br>{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Milan Snoeijink
              </span>
            </h1>

            <p className="text-xl text-secondary-foreground">
              Student Software Developer bij Bit Academy Noorderpoort
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="#contact"
              onClick={(e) => smoothScroll(e, "contact")}
              className="group flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all w-full sm:w-auto justify-center"
            >
              Contact opnemen
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight size={18} />
              </motion.div>
            </a>

            <a
              href="/files/CV Milan Snoeijink Software Developer.pdf"
              download="Milan_Snoeijink_CV"
              className="flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-full hover:bg-secondary/80 transition-colors w-full sm:w-auto justify-center"
            >
              <Download size={18} />
              Download CV
            </a>
          </motion.div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default Hero;