// src/components/ui/SkeletonLoader.tsx
"use client";

import { motion, Transition } from "framer-motion";
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

  // Correct gedefinieerde transition
  const shimmerTransition: Transition = {
    duration: 2,
    repeat: Infinity,
    ease: "linear" as const,
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
            animate={
              animated
                ? { backgroundPosition: ["200% 0", "-200% 0"] }
                : undefined
            }
            transition={animated ? shimmerTransition : undefined}
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
      animate={
        animated ? { backgroundPosition: ["200% 0", "-200% 0"] } : undefined
      }
      transition={animated ? shimmerTransition : undefined}
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
      </div>
      <div className="flex justify-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
};

// Blog post skeleton
export const BlogPostSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <Skeleton variant="image" className="w-full h-48" />
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-6 w-full" />
        <Skeleton variant="text" lines={3} />
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-16 rounded" />
        </div>
      </div>
    </div>
  );
};

// Navigation skeleton
export const NavigationSkeleton = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <Skeleton variant="circle" className="w-10 h-10" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="hidden md:flex items-center gap-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-4 w-16" />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Skeleton variant="circle" className="w-8 h-8" />
            <Skeleton className="h-8 w-20 rounded" />
          </div>
        </div>
      </div>
    </nav>
  );
};

// Contact form skeleton
export const ContactFormSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full rounded" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-32 w-full rounded" />
        </div>
        <div className="flex justify-center">
          <Skeleton className="h-10 w-32 rounded" />
        </div>
      </div>
    </div>
  );
};

// Card skeleton - algemeen gebruik
export const CardSkeleton = ({
  showImage = true,
  showBadges = true,
  className,
}: {
  showImage?: boolean;
  showBadges?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden",
        className
      )}
    >
      {showImage && <Skeleton variant="image" className="w-full" />}
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton variant="text" lines={2} />
        {showBadges && (
          <div className="flex gap-2 flex-wrap">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};

// Loading state voor lijsten
export const ListSkeleton = ({
  items = 5,
  variant = "default",
}: {
  items?: number;
  variant?: "default" | "detailed";
}) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
        >
          <Skeleton variant="circle" className="w-12 h-12 flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            {variant === "detailed" && (
              <>
                <Skeleton className="h-4 w-1/2" />
                <div className="flex gap-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Stats skeleton
export const StatsSkeleton = ({ columns = 3 }: { columns?: number }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6`}>
      {Array.from({ length: columns }).map((_, index) => (
        <div
          key={index}
          className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow"
        >
          <Skeleton className="h-12 w-16 mx-auto mb-4" />
          <Skeleton className="h-6 w-24 mx-auto mb-2" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
      ))}
    </div>
  );
};