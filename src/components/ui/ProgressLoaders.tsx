// src/components/ui/ProgressLoaders.tsx
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ProgressProps {
  className?: string;
  progress: number;
  showPercentage?: boolean;
  color?: string;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  label?: string;
}

// Lineaire voortgangsbalk
export const LinearProgress = ({
  className,
  progress,
  showPercentage = true,
  color = "blue",
  size = "md",
  animated = true,
  label,
}: ProgressProps) => {
  const heights = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  return (
    <div className={cn("w-full space-y-2", className)}>
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {label}
          </span>
          {showPercentage && (
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {Math.round(progress)}%
            </span>
          )}
        </div>
      )}

      <div
        className={cn(
          "w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden",
          heights[size]
        )}
      >
        <motion.div
          className={cn(
            `bg-${color}-500 dark:bg-${color}-400 rounded-full`,
            heights[size]
          )}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: animated ? 1 : 0, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

// Circulaire voortgangsindicator
export const CircularProgress = ({
  className,
  progress,
  showPercentage = true,
  color = "blue",
  size = "md",
}: ProgressProps) => {
  const sizes = {
    sm: { size: 60, stroke: 4 },
    md: { size: 80, stroke: 6 },
    lg: { size: 100, stroke: 8 },
  };

  const { size: circleSize, stroke } = sizes[size];
  const radius = (circleSize - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg
        width={circleSize}
        height={circleSize}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={stroke}
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />

        {/* Progress circle */}
        <motion.circle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          className={`text-${color}-500 dark:text-${color}-400`}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>

      {showPercentage && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {Math.round(progress)}%
          </span>
        </motion.div>
      )}
    </div>
  );
};

// Stappen voortgangsindicator
export const StepProgress = ({
  className,
  currentStep = 0,
  totalSteps = 4,
  color = "blue",
  labels,
}: {
  className?: string;
  currentStep?: number;
  totalSteps?: number;
  color?: string;
  labels?: string[];
}) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center flex-1">
            {/* Step circle */}
            <motion.div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2",
                index <= currentStep
                  ? `bg-${color}-500 border-${color}-500 text-white`
                  : "bg-white border-gray-300 text-gray-500 dark:bg-gray-800 dark:border-gray-600"
              )}
              initial={{ scale: 0.8 }}
              animate={{ scale: index <= currentStep ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {index + 1}
            </motion.div>

            {/* Connection line */}
            {index < totalSteps - 1 && (
              <div className="flex-1 mx-2">
                <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className={cn(`bg-${color}-500 h-full rounded-full`)}
                    initial={{ width: 0 }}
                    animate={{ width: index < currentStep ? "100%" : "0%" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Labels */}
      {labels && (
        <div className="flex justify-between mt-2">
          {labels.map((label, index) => (
            <div key={index} className="text-xs text-center flex-1">
              <span
                className={cn(
                  index <= currentStep
                    ? "text-gray-900 dark:text-gray-100 font-medium"
                    : "text-gray-500 dark:text-gray-400"
                )}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Loading met voortgang voor portfolio items
export const PortfolioLoadingProgress = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Projecten laden...",
    "Afbeeldingen verwerken...",
    "Metadata ophalen...",
    "Klaar!",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return newProgress;
      });
    }, 300);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress > 25 && currentStep === 0) setCurrentStep(1);
    if (progress > 50 && currentStep === 1) setCurrentStep(2);
    if (progress > 75 && currentStep === 2) setCurrentStep(3);
    if (progress >= 100 && currentStep === 3) setCurrentStep(4);
  }, [progress, currentStep]);

  return (
    <div className="max-w-md mx-auto space-y-6 p-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Portfolio wordt geladen
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {steps[Math.min(currentStep, steps.length - 1)]}
        </p>
      </div>

      <CircularProgress
        progress={progress}
        color="blue"
        size="lg"
        className="mx-auto"
      />

      <LinearProgress
        progress={progress}
        color="blue"
        label="Totale voortgang"
        className="w-full"
      />

      <StepProgress
        currentStep={currentStep}
        totalSteps={4}
        color="blue"
        labels={["Start", "Laden", "Verwerken", "Klaar"]}
      />
    </div>
  );
};

// Bestand upload voortgang
export const FileUploadProgress = ({
  progress,
  fileName,
  fileSize,
  uploadSpeed,
}: {
  progress: number;
  fileName: string;
  fileSize?: string;
  uploadSpeed?: string;
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
          <motion.div
            className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
            {fileName}
          </p>
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            {fileSize && <span>{fileSize}</span>}
            {uploadSpeed && <span>• {uploadSpeed}</span>}
            <span>• {Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      <LinearProgress
        progress={progress}
        color="blue"
        size="sm"
        showPercentage={false}
      />
    </div>
  );
};

// Content loading met progress
export const ContentLoadingProgress = ({
  title = "Content laden",
  items = [],
}: {
  title?: string;
  items?: string[];
}) => {
  const [loadedItems, setLoadedItems] = useState<number>(0);

  useEffect(() => {
    if (items.length === 0) return;

    const timer = setInterval(() => {
      setLoadedItems((prev) => {
        if (prev >= items.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(timer);
  }, [items.length]);

  const progress = items.length > 0 ? (loadedItems / items.length) * 100 : 0;

  return (
    <div className="max-w-sm mx-auto space-y-4 p-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
      </div>

      <CircularProgress
        progress={progress}
        color="purple"
        size="md"
        className="mx-auto"
      />

      {items.length > 0 && (
        <div className="space-y-2">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-2 text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: index < loadedItems ? 1 : 0.5,
                x: 0,
              }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={cn(
                  "w-4 h-4 rounded-full flex items-center justify-center",
                  index < loadedItems
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700"
                )}
              >
                {index < loadedItems && (
                  <motion.svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                )}
              </div>
              <span
                className={cn(
                  index < loadedItems
                    ? "text-gray-900 dark:text-gray-100"
                    : "text-gray-500 dark:text-gray-400"
                )}
              >
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};