// src/components/LazyImage.tsx - Component
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  placeholder = "blur",
  blurDataURL,
  onLoad,
  onError,
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer voor lazy loading
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px", // Start loading 50px voor het zichtbaar wordt
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Genereer een standaard blur placeholder als er geen is opgegeven
  const generateBlurDataURL = (width: number = 10, height: number = 10) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Gradient van lichtgrijs naar donkergrijs
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#f3f4f6");
      gradient.addColorStop(1, "#e5e7eb");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    return canvas.toDataURL();
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Fallback afbeelding bij error
  const fallbackSrc = "/images/placeholder-project.svg";

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Loading skeleton */}
      {!isLoaded && isInView && !hasError && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </motion.div>
      )}

      {/* Afbeelding wordt alleen geladen als deze in view is */}
      {isInView && (
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Image
            src={hasError ? fallbackSrc : src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            placeholder={placeholder}
            blurDataURL={blurDataURL || generateBlurDataURL()}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            onLoad={handleLoad}
            onError={handleError}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      )}

      {/* Error state */}
      {hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800"
        >
          <div className="text-center text-gray-500 dark:text-gray-400">
            <svg
              className="w-12 h-12 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">Afbeelding niet beschikbaar</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LazyImage;