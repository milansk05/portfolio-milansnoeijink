// src/components/ProjectCard.tsx - Component
"use client";

import { motion } from "framer-motion";
import LazyImage from "./LazyImage";
import TechnologyBadge from "./TechnologyBadge";
import { Github, ExternalLink, Eye } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  repoUrl?: string;
  liveUrl?: string;
  details?: {
    technologies: string[];
  };
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

const ProjectCard = ({ project, index, onClick }: ProjectCardProps) => {
  // Blur data URL voor betere loading experience
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
          {project.details?.technologies && (
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

export default ProjectCard;