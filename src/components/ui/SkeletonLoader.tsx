// src/components/ui/SkeletonLoader.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "default" | "circle" | "text" | "card" | "image";
  lines?: number;
  animated?: boolean;
}

// Basis skeleton component
export const Skeleton = ({
  className,
  variant = "default",
  lines = 1,
  animated = true,
}: SkeletonProps) => {
  const baseClasses =
    "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700";

  const variants = {
    default: "h-4 rounded",
    circle: "rounded-full aspect-square",
    text: "h-4 rounded",
    card: "h-32 rounded-lg",
    image: "h-48 rounded-lg",
  };

  const shimmerAnimation = {
    animate: {
      backgroundPosition: ["200% 0", "-200% 0"],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    },
  };

  if (variant === "text" && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <motion.div
            key={index}
            className={cn(
              baseClasses,
              variants[variant],
              index === lines - 1 ? "w-3/4" : "w-full",
              className
            )}
            style={{
              backgroundSize: "400% 100%",
            }}
            {...(animated ? shimmerAnimation : {})}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(baseClasses, variants[variant], className)}
      style={{
        backgroundSize: "400% 100%",
      }}
      {...(animated ? shimmerAnimation : {})}
    />
  );
};

// Portfolio project skeleton
export const ProjectSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <Skeleton variant="image" className="w-full" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton variant="text" lines={3} />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
};

// Portfolio grid skeleton
export const PortfolioGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <ProjectSkeleton key={index} />
      ))}
    </div>
  );
};

// Team member skeleton
export const TeamMemberSkeleton = () => {
  return (
    <div className="text-center space-y-4">
      <Skeleton variant="circle" className="w-32 h-32 mx-auto" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-24 mx-auto" />
        <Skeleton className="h-4 w-32 mx-auto" />
        <Skeleton variant="text" lines={2} className="max-w-xs mx-auto" />
      </div>
    </div>
  );
};

// Blog post skeleton
export const BlogPostSkeleton = () => {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <Skeleton variant="image" className="w-full h-48" />
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton variant="circle" className="w-8 h-8" />
          <div className="space-y-1">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <Skeleton className="h-7 w-full" />
        <Skeleton variant="text" lines={3} />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-12 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
      </div>
    </article>
  );
};

// Navigation skeleton
export const NavigationSkeleton = () => {
  return (
    <nav className="flex items-center justify-between p-4">
      <Skeleton className="h-8 w-32" />
      <div className="hidden md:flex space-x-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-4 w-16" />
        ))}
      </div>
      <Skeleton className="h-10 w-24 rounded-full" />
    </nav>
  );
};

// Contact form skeleton
export const ContactFormSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-32 w-full rounded-lg" />
      </div>
      <Skeleton className="h-12 w-32 rounded-full" />
    </div>
  );
};