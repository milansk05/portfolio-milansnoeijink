// src/components/AnimatedBackground.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useDarkMode } from "./DarkModeContext";

// Geoptimaliseerde hulpfuncties
const generateRandomPosition = () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
});

const generateRandomSize = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const generateRandomDelay = (max: number) => Math.random() * max;

const AnimatedBackground = () => {
  const { darkMode } = useDarkMode();
  const [mounted, setMounted] = useState(false);

  // Memoïzeer de random elementen voor betere prestaties
  const stars = useMemo(
    () =>
      Array.from({ length: 150 }, (_, i) => ({
        id: i,
        ...generateRandomPosition(),
        size: generateRandomSize(0.5, 3),
        delay: generateRandomDelay(8),
        duration: generateRandomSize(2, 5),
        opacity: generateRandomSize(0.2, 0.8),
      })),
    []
  );

  const shootingStars = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        ...generateRandomPosition(),
        delay: generateRandomDelay(25),
        angle: generateRandomSize(-20, 20),
      })),
    []
  );

  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        ...generateRandomPosition(),
        size: generateRandomSize(2, 10),
        delay: generateRandomDelay(10),
        duration: generateRandomSize(8, 16),
        amplitude: generateRandomSize(15, 40),
      })),
    []
  );

  const orbs = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        ...generateRandomPosition(),
        size: generateRandomSize(20, 60),
        delay: generateRandomDelay(15),
        duration: generateRandomSize(20, 35),
      })),
    []
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
      {darkMode ? (
        // Donkere modus - Magische nachthemel
        <>
          {/* Achtergrond gradiënt met kleurrijke accenten */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-blue-950/30" />
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-indigo-950/10 to-slate-900/50" />

          {/* Verbeterde twinkelende sterren */}
          {stars.map((star) => (
            <motion.div
              key={`star-${star.id}`}
              className="absolute rounded-full bg-white shadow-sm"
              style={{
                width: star.size,
                height: star.size,
                left: `${star.x}%`,
                top: `${star.y}%`,
                boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.3)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Verbeterde vallende sterren met trail effect */}
          {shootingStars.map((star) => (
            <motion.div
              key={`shooting-star-${star.id}`}
              className="absolute"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                rotate: `${star.angle}deg`,
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                x: [-20, 120],
                y: [0, 60],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: star.delay,
                ease: "easeOut",
              }}
            >
              <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-lg" />
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-blue-200 to-transparent shadow-sm mt-[-1px]" />
            </motion.div>
          ))}

          {/* Mystieke zwevendere orbs */}
          {orbs.map((orb) => (
            <motion.div
              key={`orb-${orb.id}`}
              className="absolute rounded-full"
              style={{
                width: orb.size,
                height: orb.size,
                left: `${orb.x}%`,
                top: `${orb.y}%`,
                background: `radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 100%)`,
                filter: "blur(1px)",
              }}
              animate={{
                x: [0, 30, -20, 0],
                y: [0, -40, 20, 0],
                scale: [1, 1.2, 0.8, 1],
                opacity: [0.3, 0.6, 0.2, 0.3],
              }}
              transition={{
                duration: orb.duration,
                repeat: Infinity,
                delay: orb.delay,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Pulserende aurora effect */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 opacity-20"
            style={{
              background:
                "linear-gradient(180deg, rgba(168, 85, 247, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)",
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      ) : (
        // Lichte modus - Levendig daghemel
        <>
          {/* Warme achtergrond gradiënten */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-amber-50/20" />
          <div className="absolute inset-0 bg-gradient-radial from-yellow-100/20 via-transparent to-blue-50/10" />

          {/* Zonnestralen effect */}
          <motion.div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.1) 40%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 360],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              scale: { duration: 12, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 60, repeat: Infinity, ease: "linear" },
              opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
          />

          {/* Verbeterde zwevende deeltjes */}
          {particles.map((particle) => (
            <motion.div
              key={`particle-${particle.id}`}
              className="absolute rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                background: `radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(147, 197, 253, 0.1) 50%, transparent 100%)`,
                filter: "blur(0.5px)",
              }}
              animate={{
                y: [0, -particle.amplitude, 0],
                x: [0, particle.amplitude * 0.3, 0],
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Wolkachtige vormen */}
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={`cloud-${i}`}
              className="absolute rounded-full opacity-10"
              style={{
                width: generateRandomSize(80, 150),
                height: generateRandomSize(40, 80),
                left: `${generateRandomSize(10, 80)}%`,
                top: `${generateRandomSize(20, 60)}%`,
                background:
                  "linear-gradient(45deg, rgba(255, 255, 255, 0.3) 0%, rgba(219, 234, 254, 0.2) 100%)",
                filter: "blur(2px)",
              }}
              animate={{
                x: [0, 50, 0],
                scale: [1, 1.1, 1],
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: generateRandomSize(20, 35),
                repeat: Infinity,
                delay: generateRandomDelay(10),
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Subtiele kleuraccenten */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-1/3 opacity-10"
            style={{
              background:
                "linear-gradient(0deg, rgba(34, 197, 94, 0.05) 0%, rgba(59, 130, 246, 0.03) 50%, transparent 100%)",
            }}
            animate={{
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}
    </div>
  );
};

export default AnimatedBackground;