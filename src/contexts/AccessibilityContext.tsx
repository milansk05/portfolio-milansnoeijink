// src/contexts/AccessibilityContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AccessibilitySettings {
  // Lettergrootte instellingen
  fontSize: "klein" | "normaal" | "groot" | "extra-groot";
  // Leesmodus (verbergt afleidende elementen)
  readingMode: boolean;
  // Contrast instellingen
  highContrast: boolean;
  // Reduceer animaties
  reduceMotion: boolean;
  // Focus indicatoren versterken
  enhancedFocus: boolean;
  // Tekst spacing vergroten
  increasedSpacing: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => void;
  resetSettings: () => void;
  applySettings: () => void;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: "normaal",
  readingMode: false,
  highContrast: false,
  reduceMotion: false,
  enhancedFocus: false,
  increasedSpacing: false,
};

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error(
      "useAccessibility moet gebruikt worden binnen een AccessibilityProvider"
    );
  }
  return context;
};

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({
  children,
}) => {
  const [settings, setSettings] =
    useState<AccessibilitySettings>(defaultSettings);

  // Laad instellingen uit localStorage bij component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("accessibility-settings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error(
          "Fout bij het laden van toegankelijkheidsinstellingen:",
          error
        );
      }
    }
  }, []);

  // Sla instellingen op in localStorage en pas ze toe
  useEffect(() => {
    localStorage.setItem("accessibility-settings", JSON.stringify(settings));
    const root = document.documentElement;
    root.classList.remove(
      "accessibility-reading-mode",
      "accessibility-high-contrast",
      "accessibility-reduce-motion",
      "accessibility-enhanced-focus",
      "accessibility-increased-spacing",
      "font-size-klein",
      "font-size-normaal",
      "font-size-groot",
      "font-size-extra-groot"
    );
    root.classList.add(`font-size-${settings.fontSize}`);
    if (settings.readingMode) {
      root.classList.add("accessibility-reading-mode");
    }
    if (settings.highContrast) {
      root.classList.add("accessibility-high-contrast");
    }
    if (settings.reduceMotion) {
      root.classList.add("accessibility-reduce-motion");
    }
    if (settings.enhancedFocus) {
      root.classList.add("accessibility-enhanced-focus");
    }
    if (settings.increasedSpacing) {
      root.classList.add("accessibility-increased-spacing");
    }
    if (settings.reduceMotion) {
      const style = document.createElement("style");
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, [settings]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem("accessibility-settings");
  };

  const value: AccessibilityContextType = {
    settings,
    updateSetting,
    resetSettings,
    applySettings: () => {},
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};