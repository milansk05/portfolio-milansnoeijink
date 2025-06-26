// src/hooks/useImageOptimization.ts - Hook
import { useState, useEffect, useCallback } from "react";

interface ImageOptimizationOptions {
  quality?: number;
  format?: "webp" | "avif" | "jpeg" | "png";
  fallbackFormat?: "jpeg" | "png";
  breakpoints?: number[];
}

interface OptimizedImageData {
  src: string;
  srcSet: string;
  sizes: string;
  blurDataURL?: string;
}

const useImageOptimization = (
  originalSrc: string,
  options: ImageOptimizationOptions = {}
) => {
  const {
    quality = 75,
    format = "webp",
    fallbackFormat = "jpeg",
    breakpoints = [640, 768, 1024, 1280, 1536],
  } = options;

  const [optimizedImage, setOptimizedImage] = useState<OptimizedImageData>({
    src: originalSrc,
    srcSet: "",
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Controleer browser ondersteuning voor moderne formaten
  const checkFormatSupport = useCallback(
    async (format: string): Promise<boolean> => {
      return new Promise((resolve) => {
        const testImages = {
          webp: "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
          avif: "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=",
        };

        if (!testImages[format as keyof typeof testImages]) {
          resolve(false);
          return;
        }

        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = testImages[format as keyof typeof testImages];
      });
    },
    []
  );

  // Genereer blur placeholder
  const generateBlurDataURL = useCallback((width = 10, height = 6): string => {
    if (typeof window === "undefined") return "";

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (!ctx) return "";

    // Gradient gebaseerd op gemiddelde kleuren
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#f1f5f9");
    gradient.addColorStop(0.5, "#e2e8f0");
    gradient.addColorStop(1, "#cbd5e1");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    return canvas.toDataURL();
  }, []);

  // Genereer Next.js Image src voor verschillende formaten en groottes
  const generateOptimizedSrc = useCallback(
    (
      width: number,
      selectedFormat: string,
      selectedQuality: number
    ): string => {
      const params = new URLSearchParams({
        url: originalSrc,
        w: width.toString(),
        q: selectedQuality.toString(),
      });

      // Voeg format parameter toe als het niet de standaard is
      if (selectedFormat !== "jpeg") {
        params.set("fm", selectedFormat);
      }

      return `/_next/image?${params.toString()}`;
    },
    [originalSrc]
  );

  // Genereer srcSet voor responsive images
  const generateSrcSet = useCallback(
    (supportedFormat: string, selectedQuality: number): string => {
      return breakpoints
        .map((width) => {
          const src = generateOptimizedSrc(
            width,
            supportedFormat,
            selectedQuality
          );
          return `${src} ${width}w`;
        })
        .join(", ");
    },
    [breakpoints, generateOptimizedSrc]
  );

  // Optimaliseer afbeelding op basis van browser ondersteuning
  useEffect(() => {
    const optimizeImage = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Controleer ondersteuning voor gewenste format
        const supportsFormat = await checkFormatSupport(format);
        const selectedFormat = supportsFormat ? format : fallbackFormat;

        // Genereer geoptimaliseerde bronnen
        const optimizedSrc = generateOptimizedSrc(
          1200,
          selectedFormat,
          quality
        );
        const srcSet = generateSrcSet(selectedFormat, quality);
        const blurDataURL = generateBlurDataURL();

        // Responsive sizes gebaseerd op gebruik
        const sizes =
          "(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw";

        setOptimizedImage({
          src: optimizedSrc,
          srcSet,
          sizes,
          blurDataURL,
        });
      } catch (err) {
        setError("Fout bij het optimaliseren van de afbeelding");
        console.error("Image optimization error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (originalSrc) {
      optimizeImage();
    }
  }, [
    originalSrc,
    format,
    fallbackFormat,
    quality,
    checkFormatSupport,
    generateOptimizedSrc,
    generateSrcSet,
    generateBlurDataURL,
  ]);

  // Preload functie voor kritieke afbeeldingen
  const preloadImage = useCallback(() => {
    if (typeof window === "undefined") return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = optimizedImage.src;

    if (optimizedImage.srcSet) {
      link.setAttribute("imagesrcset", optimizedImage.srcSet);
      link.setAttribute("imagesizes", optimizedImage.sizes);
    }

    document.head.appendChild(link);
  }, [optimizedImage]);

  return {
    optimizedImage,
    isLoading,
    error,
    preloadImage,
  };
};

export default useImageOptimization;