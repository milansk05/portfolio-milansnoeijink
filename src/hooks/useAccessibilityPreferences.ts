// src/hooks/useAccessibilityPreferences.ts
"use client";

import { useState, useEffect } from "react";

interface SystemAccessibilityPreferences {
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
  prefersLargeText: boolean;
  prefersDarkMode: boolean;
}

export const useAccessibilityPreferences =
  (): SystemAccessibilityPreferences => {
    const [preferences, setPreferences] =
      useState<SystemAccessibilityPreferences>({
        prefersReducedMotion: false,
        prefersHighContrast: false,
        prefersLargeText: false,
        prefersDarkMode: false,
      });

    useEffect(() => {
      // Functie om media query's te controleren
      const checkPreferences = () => {
        const newPreferences: SystemAccessibilityPreferences = {
          prefersReducedMotion: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches,
          prefersHighContrast:
            window.matchMedia("(prefers-contrast: high)").matches ||
            window.matchMedia("(-ms-high-contrast: active)").matches ||
            window.matchMedia("(-webkit-high-contrast: active)").matches,
          prefersLargeText: window.matchMedia(
            "(prefers-reduced-data: no-preference)"
          ).matches,
          prefersDarkMode: window.matchMedia("(prefers-color-scheme: dark)")
            .matches,
        };
        setPreferences(newPreferences);
      };

      // Controleer initiële waarden
      checkPreferences();

      // Media query listeners
      const reducedMotionQuery = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );
      const highContrastQuery = window.matchMedia("(prefers-contrast: high)");
      const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

      // Event listeners voor veranderingen
      const handleReducedMotionChange = (e: MediaQueryListEvent) => {
        setPreferences((prev) => ({
          ...prev,
          prefersReducedMotion: e.matches,
        }));
      };

      const handleHighContrastChange = (e: MediaQueryListEvent) => {
        setPreferences((prev) => ({ ...prev, prefersHighContrast: e.matches }));
      };

      const handleDarkModeChange = (e: MediaQueryListEvent) => {
        setPreferences((prev) => ({ ...prev, prefersDarkMode: e.matches }));
      };

      // Voeg listeners toe
      reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
      highContrastQuery.addEventListener("change", handleHighContrastChange);
      darkModeQuery.addEventListener("change", handleDarkModeChange);

      // Cleanup
      return () => {
        reducedMotionQuery.removeEventListener(
          "change",
          handleReducedMotionChange
        );
        highContrastQuery.removeEventListener(
          "change",
          handleHighContrastChange
        );
        darkModeQuery.removeEventListener("change", handleDarkModeChange);
      };
    }, []);

    return preferences;
  };

// Hook voor het automatisch toepassen van systeemvoorkeuren
export const useAutoAccessibility = () => {
  const systemPreferences = useAccessibilityPreferences();

  useEffect(() => {
    // Automatisch detecteren en toepassen van systeemvoorkeuren
    const savedSettings = localStorage.getItem("accessibility-settings");
    if (!savedSettings) {
      // Alleen toepassen als er nog geen handmatige instellingen zijn opgeslagen
      const autoSettings = {
        fontSize: "normaal" as const,
        readingMode: false,
        highContrast: systemPreferences.prefersHighContrast,
        reduceMotion: systemPreferences.prefersReducedMotion,
        enhancedFocus: false,
        increasedSpacing: false,
      };

      localStorage.setItem(
        "accessibility-auto-detected",
        JSON.stringify(autoSettings)
      );
    }
  }, [systemPreferences]);

  return systemPreferences;
};