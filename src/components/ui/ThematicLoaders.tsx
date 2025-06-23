// src/components/ui/ThematicLoaders.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}

// Code geïnspireerde loader (voor development portfolio)
export const CodeLoader = ({
  className,
  size = "md",
  color = "blue",
}: LoaderProps) => {
  const sizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };

  const codeSnippets = ["<div>", "function()", "{ }", "[]", "=>", "&&"];

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className={cn("font-mono", sizes[size])}>
        {codeSnippets.map((snippet, index) => (
          <motion.span
            key={index}
            className={`text-${color}-500 dark:text-${color}-400 inline-block mx-1`}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
          >
            {snippet}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

// Design geïnspireerde loader (geometric shapes)
export const DesignLoader = ({ className, size = "md" }: LoaderProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        {/* Driehoek */}
        <motion.div
          className="absolute top-0 left-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-purple-500"
          style={{ transform: "translateX(-50%)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Cirkel */}
        <motion.div
          className="absolute top-1/2 left-0 w-3 h-3 bg-pink-500 rounded-full"
          style={{ transform: "translateY(-50%)" }}
          animate={{
            x: [0, 32, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Vierkant */}
        <motion.div
          className="absolute bottom-0 right-0 w-4 h-4 bg-green-500"
          animate={{
            rotate: [0, 180, 360],
            borderRadius: ["0%", "50%", "0%"],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

// Portfolio specifieke loader
export const PortfolioLoader = ({ className, size = "md" }: LoaderProps) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-4",
        className
      )}
    >
      <div className={cn("relative", sizeClasses[size])}>
        {/* Buitenste ring */}
        <motion.div
          className="absolute inset-0 border-4 border-gradient-to-r from-blue-500 to-purple-500 rounded-full border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />

        {/* Binnenste ring */}
        <motion.div
          className="absolute inset-2 border-4 border-gradient-to-r from-purple-500 to-pink-500 rounded-full border-b-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Center dot */}
        <motion.div
          className="absolute inset-1/2 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.p
        className="text-sm text-gray-600 dark:text-gray-400 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Portfolio laden...
      </motion.p>
    </div>
  );
};

// Dots loader (minimalistisch)
export const DotsLoader = ({
  className,
  size = "md",
  color = "blue",
}: LoaderProps) => {
  const sizes = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  return (
    <div
      className={cn("flex items-center justify-center space-x-2", className)}
    >
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={cn(
            sizes[size],
            `bg-${color}-500 dark:bg-${color}-400 rounded-full`
          )}
          animate={{
            y: [-10, 0, -10],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Pulse loader
export const PulseLoader = ({
  className,
  size = "md",
  color = "blue",
}: LoaderProps) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <motion.div
        className={cn(
          sizes[size],
          `bg-${color}-500 dark:bg-${color}-400 rounded-full`
        )}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

// Bars loader (voor data loading)
export const BarsLoader = ({
  className,
  size = "md",
  color = "blue",
}: LoaderProps) => {
  const heights = {
    sm: ["h-4", "h-6", "h-8", "h-6", "h-4"],
    md: ["h-6", "h-8", "h-10", "h-8", "h-6"],
    lg: ["h-8", "h-10", "h-12", "h-10", "h-8"],
  };

  const widths = {
    sm: "w-1",
    md: "w-1.5",
    lg: "w-2",
  };

  return (
    <div className={cn("flex items-end justify-center space-x-1", className)}>
      {heights[size].map((height, index) => (
        <motion.div
          key={index}
          className={cn(
            widths[size],
            height,
            `bg-${color}-500 dark:bg-${color}-400 rounded-t`
          )}
          animate={{
            scaleY: [1, 0.3, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Spinner met tekst
export const SpinnerWithText = ({
  className,
  size = "md",
  color = "blue",
  text = "Laden...",
}: LoaderProps & { text?: string }) => {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  return (
    <div className={cn("flex flex-col items-center space-y-3", className)}>
      <motion.div
        className={cn(
          sizes[size],
          `border-2 border-${color}-200 dark:border-${color}-800 border-t-${color}-500 dark:border-t-${color}-400 rounded-full`
        )}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.p
        className="text-sm text-gray-600 dark:text-gray-400"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {text}
      </motion.p>
    </div>
  );
};