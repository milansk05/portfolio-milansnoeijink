"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2, ZoomIn } from "lucide-react"

interface DiagramCarouselProps {
    images: string[]
    onClose?: () => void
}

// Helper functie om diagramtype te bepalen op basis van bestandspad of bestandsnaam
const getDiagramType = (path: string): { type: string; title: string; description: string } => {
    // Bepaal op basis van pad of naam het type diagram
    if (path.includes("state") || path.includes("toestand")) {
        return {
            type: "State Diagram",
            title: "Toestandsdiagram",
            description: "Dit diagram toont de verschillende toestanden waarin een object of systeem zich kan bevinden en de overgangen tussen deze toestanden."
        };
    } else if (path.includes("class") || path.includes("klasse")) {
        return {
            type: "Class Diagram",
            title: "Klassendiagram",
            description: "Dit diagram visualiseert de structuur van een systeem door de klassen, hun attributen, methoden en de relaties tussen klassen weer te geven."
        };
    } else if (path.includes("sequence") || path.includes("sequentie")) {
        return {
            type: "Sequence Diagram",
            title: "Sequentiediagram",
            description: "Dit diagram toont de interactie tussen objecten in een tijdsvolgorde, met nadruk op de volgorde van berichtuitwisseling."
        };
    } else if (path.includes("activity") || path.includes("activiteit")) {
        return {
            type: "Activity Diagram",
            title: "Activiteitendiagram",
            description: "Dit diagram modelleert de workflow van opeenvolgende activiteiten en acties, inclusief beslismomenten en parallelle processen."
        };
    } else if (path.includes("use-case") || path.includes("usecase")) {
        return {
            type: "Use Case Diagram",
            title: "Use Case Diagram",
            description: "Dit diagram toont het gedrag van een systeem vanuit het perspectief van de gebruiker en visualiseert de interacties tussen actoren en het systeem."
        };
    } else if (path.includes("deployment") || path.includes("implementatie")) {
        return {
            type: "Deployment Diagram",
            title: "Deploymentdiagram",
            description: "Dit diagram visualiseert de fysieke architectuur en infrastructuur, met hardware nodes, software componenten en hun verbindingen."
        };
    } else {
        // Standaard indien type niet bepaald kan worden
        return {
            type: "UML Diagram",
            title: "UML Diagram",
            description: "Een diagram gemaakt met Unified Modeling Language om aspecten van het softwaresysteem te visualiseren."
        };
    }
};

const DiagramCarousel: React.FC<DiagramCarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Bepaal diagramtype op basis van huidige afbeelding
    const currentDiagramInfo = images[currentIndex] ?
        getDiagramType(images[currentIndex]) :
        { type: "UML Diagram", title: "UML Diagram", description: "" };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsLoaded(false);
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsLoaded(false);
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleImageLoad = () => {
        setIsLoaded(true);
    };

    const toggleZoom = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsZoomed(!isZoomed);
    };

    const handleTabClick = (index: number) => {
        if (index !== currentIndex) {
            setIsLoaded(false);
            setCurrentIndex(index);
        }
    };

    return (
        <div className="diagram-carousel w-full">
            {/* Tabs voor navigatie door diagram types */}
            <div className="diagram-tabs flex overflow-x-auto pb-2 mb-4 no-scrollbar">
                {images.map((img, idx) => {
                    const diagramInfo = getDiagramType(img);
                    return (
                        <button
                            key={idx}
                            onClick={() => handleTabClick(idx)}
                            className={`flex-shrink-0 px-3 py-1.5 text-sm font-medium rounded-t-lg mr-1 transition-colors ${idx === currentIndex
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary/70 text-secondary-foreground hover:bg-secondary"
                                }`}
                        >
                            {diagramInfo.type}
                        </button>
                    );
                })}
            </div>

            {/* Diagram titel en type */}
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-primary/20 text-primary">
                        {currentDiagramInfo.type}
                    </span>
                </div>
                <h3 className="text-xl font-bold text-accent-foreground">{currentDiagramInfo.title}</h3>
                {currentDiagramInfo.description && (
                    <p className="text-accent-foreground/80 mt-2 text-sm">
                        {currentDiagramInfo.description}
                    </p>
                )}
            </div>

            {/* Afbeeldingscontainer met navigatie */}
            <div className={`relative overflow-hidden rounded-lg mb-4 ${isZoomed ? "h-[70vh]" : "h-72"} transition-all duration-300 bg-black/5`}>
                {/* Laadanimatie */}
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
                    </div>
                )}

                {/* Diagramafbeelding */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isLoaded ? 1 : 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative h-full w-full"
                    >
                        <Image
                            src={images[currentIndex]}
                            alt={`UML Diagram ${currentIndex + 1}`}
                            fill
                            className={`object-contain transition-transform duration-300 ${isZoomed ? "scale-[1.8] cursor-zoom-out" : "cursor-zoom-in"}`}
                            onClick={toggleZoom}
                            onLoad={handleImageLoad}
                            sizes="(max-width: 768px) 100vw, 800px"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Zoom knop */}
                <button
                    onClick={toggleZoom}
                    className="absolute top-2 right-2 z-10 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
                    aria-label={isZoomed ? "Uitzoomen" : "Inzoomen"}
                >
                    {isZoomed ? <Maximize2 size={18} /> : <ZoomIn size={18} />}
                </button>

                {/* Navigatieknoppen */}
                <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
                    aria-label="Vorige diagram"
                >
                    <ChevronLeft size={20} />
                </button>

                <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
                    aria-label="Volgende diagram"
                >
                    <ChevronRight size={20} />
                </button>

                {/* Paginaindicatoren */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleTabClick(idx);
                            }}
                            className={`w-2 h-2 rounded-full ${idx === currentIndex ? "bg-primary" : "bg-white/50"
                                }`}
                            aria-label={`Ga naar diagram ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DiagramCarousel;