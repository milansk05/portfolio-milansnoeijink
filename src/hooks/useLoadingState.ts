// src/hooks/useLoadingState.ts
import { useState, useEffect, useCallback } from "react";

export type LoadingState = "idle" | "loading" | "success" | "error";

interface UseLoadingStateProps {
  initialState?: LoadingState;
  autoReset?: number; // Tijd in ms om automatisch terug te gaan naar idle
}

interface LoadingStateReturn {
  state: LoadingState;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isIdle: boolean;
  setLoading: () => void;
  setSuccess: () => void;
  setError: () => void;
  setIdle: () => void;
  reset: () => void;
}

export const useLoadingState = ({
  initialState = "idle",
  autoReset,
}: UseLoadingStateProps = {}): LoadingStateReturn => {
  const [state, setState] = useState<LoadingState>(initialState);

  const setLoading = useCallback(() => setState("loading"), []);
  const setSuccess = useCallback(() => setState("success"), []);
  const setError = useCallback(() => setState("error"), []);
  const setIdle = useCallback(() => setState("idle"), []);
  const reset = useCallback(() => setState(initialState), [initialState]);

  // Auto reset functionaliteit
  useEffect(() => {
    if (autoReset && (state === "success" || state === "error")) {
      const timer = setTimeout(() => {
        setState("idle");
      }, autoReset);

      return () => clearTimeout(timer);
    }
  }, [state, autoReset]);

  return {
    state,
    isLoading: state === "loading",
    isSuccess: state === "success",
    isError: state === "error",
    isIdle: state === "idle",
    setLoading,
    setSuccess,
    setError,
    setIdle,
    reset,
  };
};

// Hook voor voortgang tracking
interface UseProgressProps {
  duration?: number; // Totale duur in ms
  steps?: string[]; // Stappen namen
  autoStart?: boolean;
}

interface ProgressReturn {
  progress: number;
  currentStep: number;
  currentStepName: string;
  isComplete: boolean;
  start: () => void;
  reset: () => void;
  setStep: (step: number) => void;
}

export const useProgress = ({
  duration = 3000,
  steps = [],
  autoStart = false,
}: UseProgressProps = {}): ProgressReturn => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(autoStart);

  const start = useCallback(() => {
    setIsRunning(true);
    setProgress(0);
    setCurrentStep(0);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setProgress(0);
    setCurrentStep(0);
  }, []);

  const setStep = useCallback(
    (step: number) => {
      setCurrentStep(Math.max(0, Math.min(step, steps.length - 1)));
    },
    [steps.length]
  );

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (duration / 50); // Update elke 50ms
        if (newProgress >= 100) {
          setIsRunning(false);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isRunning, duration]);

  // Update stap gebaseerd op voortgang
  useEffect(() => {
    if (steps.length > 0) {
      const stepSize = 100 / steps.length;
      const newStep = Math.floor(progress / stepSize);
      setCurrentStep(Math.min(newStep, steps.length - 1));
    }
  }, [progress, steps.length]);

  useEffect(() => {
    if (autoStart) {
      start();
    }
  }, [autoStart, start]);

  return {
    progress,
    currentStep,
    currentStepName: steps[currentStep] || "",
    isComplete: progress >= 100,
    start,
    reset,
    setStep,
  };
};