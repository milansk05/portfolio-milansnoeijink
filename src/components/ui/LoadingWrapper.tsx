// src/components/ui/LoadingWrapper.tsx
"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Skeleton,
  PortfolioGridSkeleton,
  TeamMemberSkeleton,
  BlogPostSkeleton,
  NavigationSkeleton,
  ContactFormSkeleton,
} from "./SkeletonLoader";
import {
  CodeLoader,
  DesignLoader,
  PortfolioLoader,
  DotsLoader,
  PulseLoader,
  BarsLoader,
  SpinnerWithText,
} from "./ThematicLoaders";
import { useProgress } from "@/hooks/useLoadingState";

interface LoadingWrapperProps {
  children: ReactNode;
  loading?: boolean;
  type?: "skeleton" | "spinner" | "themed" | "progress";
  skeletonType?:
    | "default"
    | "portfolio"
    | "team"
    | "blog"
    | "navigation"
    | "contact";
  loaderType?:
    | "code"
    | "design"
    | "portfolio"
    | "dots"
    | "pulse"
    | "bars"
    | "spinner";
  className?: string;
  loadingText?: string;
  color?: string;
  size?: "sm" | "md" | "lg";
  showProgress?: boolean;
  progressSteps?: string[];
  minLoadingTime?: number; // Minimum laadtijd in ms
  fade?: boolean;
}

export const LoadingWrapper = ({
  children,
  loading = false,
  type = "skeleton",
  skeletonType = "default",
  loaderType = "portfolio",
  className,
  loadingText = "Laden...",
  color = "blue",
  size = "md",
  showProgress = false,
  progressSteps = [],
  minLoadingTime = 0,
  fade = true,
}: LoadingWrapperProps) => {
  const { progress, currentStepName } = useProgress({
    steps: progressSteps,
    autoStart: loading && showProgress,
    duration: minLoadingTime,
  });

  const renderSkeleton = () => {
    switch (skeletonType) {
      case "portfolio":
        return <PortfolioGridSkeleton />;
      case "team":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <TeamMemberSkeleton key={i} />
            ))}
          </div>
        );
      case "blog":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <BlogPostSkeleton key={i} />
            ))}
          </div>
        );
      case "navigation":
        return <NavigationSkeleton />;
      case "contact":
        return <ContactFormSkeleton />;
      default:
        return (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-4" />
            ))}
          </div>
        );
    }
  };

  const renderLoader = () => {
    const loaderProps = { size, color, className: "mx-auto" };

    switch (loaderType) {
      case "code":
        return <CodeLoader {...loaderProps} />;
      case "design":
        return <DesignLoader {...loaderProps} />;
      case "portfolio":
        return <PortfolioLoader {...loaderProps} />;
      case "dots":
        return <DotsLoader {...loaderProps} />;
      case "pulse":
        return <PulseLoader {...loaderProps} />;
      case "bars":
        return <BarsLoader {...loaderProps} />;
      case "spinner":
        return <SpinnerWithText {...loaderProps} text={loadingText} />;
      default:
        return <PortfolioLoader {...loaderProps} />;
    }
  };

  const renderLoadingContent = () => {
    if (type === "progress" && showProgress) {
      return (
        <div className="flex flex-col items-center space-y-4">
          {renderLoader()}
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentStepName || loadingText}
            </p>
            <div className="w-64 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
              <motion.div
                className={`bg-${color}-500 h-2 rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {Math.round(progress)}%
            </p>
          </div>
        </div>
      );
    }

    if (type === "skeleton") {
      return renderSkeleton();
    }

    return (
      <div className="flex justify-center items-center min-h-[200px]">
        {renderLoader()}
      </div>
    );
  };

  return (
    <div className={cn("relative", className)}>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={fade ? { opacity: 0 } : undefined}
            animate={fade ? { opacity: 1 } : undefined}
            exit={fade ? { opacity: 0 } : undefined}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {renderLoadingContent()}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={fade ? { opacity: 0 } : undefined}
            animate={fade ? { opacity: 1 } : undefined}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Specifieke wrapper voor portfolio sectie
export const PortfolioLoadingWrapper = ({
  children,
  loading,
  className,
}: {
  children: ReactNode;
  loading: boolean;
  className?: string;
}) => {
  return (
    <LoadingWrapper
      loading={loading}
      type="progress"
      loaderType="portfolio"
      showProgress={true}
      progressSteps={[
        "Projecten laden...",
        "Afbeeldingen verwerken...",
        "Metadata ophalen...",
        "Portfolio klaar!",
      ]}
      minLoadingTime={2000}
      className={className}
    >
      {children}
    </LoadingWrapper>
  );
};

// Wrapper voor blog/content
export const ContentLoadingWrapper = ({
  children,
  loading,
  className,
}: {
  children: ReactNode;
  loading: boolean;
  className?: string;
}) => {
  return (
    <LoadingWrapper
      loading={loading}
      type="skeleton"
      skeletonType="blog"
      className={className}
    >
      {children}
    </LoadingWrapper>
  );
};

// Wrapper voor team sectie
export const TeamLoadingWrapper = ({
  children,
  loading,
  className,
}: {
  children: ReactNode;
  loading: boolean;
  className?: string;
}) => {
  return (
    <LoadingWrapper
      loading={loading}
      type="skeleton"
      skeletonType="team"
      className={className}
    >
      {children}
    </LoadingWrapper>
  );
};

// Wrapper voor contact formulier
export const ContactLoadingWrapper = ({
  children,
  loading,
  className,
}: {
  children: ReactNode;
  loading: boolean;
  className?: string;
}) => {
  return (
    <LoadingWrapper
      loading={loading}
      type="themed"
      loaderType="spinner"
      loadingText="Formulier laden..."
      className={className}
    >
      {children}
    </LoadingWrapper>
  );
};

// Higher-order component voor automatische loading states
const withLoading = <P extends object>(
  Component: React.ComponentType<P>,
  loadingProps?: Partial<LoadingWrapperProps>
) => {
  const Wrapped = (props: P & { loading?: boolean }) => {
    const { loading = false, ...componentProps } = props;
    return (
      <LoadingWrapper loading={loading} {...loadingProps}>
        <Component {...(componentProps as P)} />
      </LoadingWrapper>
    );
  };
  Wrapped.displayName = `withLoading(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
};
export { withLoading };