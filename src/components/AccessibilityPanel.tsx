// src/components/AccessibilityPanel.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accessibility,
  Type,
  BookOpen,
  Eye,
  RotateCcw,
  X,
  MousePointer,
  CheckCircle,
  Info,
} from "lucide-react";
import { useAccessibility } from "@/contexts/AccessibilityContext";

const AccessibilityPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { settings, updateSetting, resetSettings } = useAccessibility();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard toegankelijkheid voor het openen/sluiten van het paneel
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Alt + A om het toegankelijkheidspaneel te openen
      if (event.altKey && event.key.toLowerCase() === "a") {
        event.preventDefault();
        setIsOpen((prev) => !prev);
      }
      // Escape om het paneel te sluiten
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Toegankelijkheidsknop - altijd zichtbaar */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 bottom-4 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Toegankelijkheidsinstellingen openen (Alt + A)"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Accessibility className="w-6 h-6" />
      </motion.button>

      {/* Toegankelijkheidspaneel overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Achtergrond overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Paneel */}
            <motion.div
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-background border-r border-border z-50 shadow-2xl overflow-y-auto"
              role="dialog"
              aria-labelledby="accessibility-panel-title"
              aria-describedby="accessibility-panel-description"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                <div className="flex items-center gap-2">
                  <Accessibility className="w-5 h-5 text-primary" />
                  <h2
                    id="accessibility-panel-title"
                    className="text-lg font-semibold"
                  >
                    Toegankelijkheid
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md hover:bg-secondary transition-colors focus:ring-2 focus:ring-primary"
                  aria-label="Paneel sluiten"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Inhoud */}
              <div className="p-4 space-y-6">
                <p
                  id="accessibility-panel-description"
                  className="text-sm text-muted-foreground"
                >
                  Pas de website aan jouw behoeften aan voor een betere
                  ervaring.
                </p>

                {/* Lettergrootte instellingen */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-primary" />
                    <h3 className="font-medium">Lettergrootte</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {(
                      ["klein", "normaal", "groot", "extra-groot"] as const
                    ).map((size) => (
                      <button
                        key={size}
                        onClick={() => updateSetting("fontSize", size)}
                        className={`p-3 rounded-lg border transition-all text-sm font-medium ${
                          settings.fontSize === size
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card border-border hover:bg-secondary"
                        }`}
                        aria-pressed={settings.fontSize === size}
                      >
                        <div className="flex items-center justify-between">
                          <span className="capitalize">{size}</span>
                          {settings.fontSize === size && (
                            <CheckCircle className="w-4 h-4" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Leesmodus */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <h3 className="font-medium">Leesmodus</h3>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() =>
                        updateSetting("readingMode", !settings.readingMode)
                      }
                      className={`w-full p-3 rounded-lg border transition-all text-left ${
                        settings.readingMode
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border hover:bg-secondary"
                      }`}
                      aria-pressed={settings.readingMode}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">
                            Lezen zonder afleiding
                          </div>
                          <div className="text-xs opacity-75 mt-1">
                            Verbergt animaties en niet-essentiële elementen
                          </div>
                        </div>
                        {settings.readingMode && (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Contrast instellingen */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-primary" />
                    <h3 className="font-medium">Visuele aanpassingen</h3>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() =>
                        updateSetting("highContrast", !settings.highContrast)
                      }
                      className={`w-full p-3 rounded-lg border transition-all text-left ${
                        settings.highContrast
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border hover:bg-secondary"
                      }`}
                      aria-pressed={settings.highContrast}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Hoog contrast</div>
                          <div className="text-xs opacity-75 mt-1">
                            Verhoogt het kleurcontrast voor betere leesbaarheid
                          </div>
                        </div>
                        {settings.highContrast && (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </div>
                    </button>

                    <button
                      onClick={() =>
                        updateSetting("enhancedFocus", !settings.enhancedFocus)
                      }
                      className={`w-full p-3 rounded-lg border transition-all text-left ${
                        settings.enhancedFocus
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border hover:bg-secondary"
                      }`}
                      aria-pressed={settings.enhancedFocus}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Verbeterde focus</div>
                          <div className="text-xs opacity-75 mt-1">
                            Maakt focus indicatoren duidelijker zichtbaar
                          </div>
                        </div>
                        {settings.enhancedFocus && (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Beweging en animaties */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MousePointer className="w-4 h-4 text-primary" />
                    <h3 className="font-medium">Beweging en interactie</h3>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() =>
                        updateSetting("reduceMotion", !settings.reduceMotion)
                      }
                      className={`w-full p-3 rounded-lg border transition-all text-left ${
                        settings.reduceMotion
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border hover:bg-secondary"
                      }`}
                      aria-pressed={settings.reduceMotion}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Verminder animaties</div>
                          <div className="text-xs opacity-75 mt-1">
                            Beperkt bewegende elementen en transities
                          </div>
                        </div>
                        {settings.reduceMotion && (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </div>
                    </button>

                    <button
                      onClick={() =>
                        updateSetting(
                          "increasedSpacing",
                          !settings.increasedSpacing
                        )
                      }
                      className={`w-full p-3 rounded-lg border transition-all text-left ${
                        settings.increasedSpacing
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border hover:bg-secondary"
                      }`}
                      aria-pressed={settings.increasedSpacing}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">
                            Vergroot tekstafstand
                          </div>
                          <div className="text-xs opacity-75 mt-1">
                            Meer ruimte tussen regels en elementen
                          </div>
                        </div>
                        {settings.increasedSpacing && (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Reset knop */}
                <div className="pt-4 border-t border-border">
                  <button
                    onClick={resetSettings}
                    className="w-full p-3 rounded-lg border border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <RotateCcw className="w-4 h-4" />
                      <span>Standaardinstellingen herstellen</span>
                    </div>
                  </button>
                </div>

                {/* Sneltoets informatie */}
                <div className="bg-muted/50 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-muted-foreground">
                      <p className="font-medium mb-1">Sneltoetsen:</p>
                      <p>
                        <kbd className="px-1 py-0.5 rounded bg-muted border">
                          Alt + A
                        </kbd>{" "}
                        - Open dit paneel
                      </p>
                      <p>
                        <kbd className="px-1 py-0.5 rounded bg-muted border">
                          Esc
                        </kbd>{" "}
                        - Sluit dit paneel
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityPanel;