"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface TimelineEvent {
    year: string
    event: string
    icon?: string
    description?: string
}

const timeline: TimelineEvent[] = [
    {
        year: "2022",
        event: "Begin van mijn codereis",
        description: "Start van mijn opleiding bij Bit Academy Noorderpoort. Leerde de fundamenten van softwareontwikkeling, waaronder HTML, CSS en Command Line."
    },
    {
        year: "2022-2023",
        event: "Frontend fundamenten",
        description: "Verdiepte kennis van HTML, CSS en JavaScript. Begon met het bouwen van interactieve websites en leerde frameworks als Bootstrap."
    },
    {
        year: "2023",
        event: "Backend ontwikkeling",
        description: "Eerste stappen in backend-development met PHP en MySQL. Leerde database-ontwerp en -management, evenals hoe ik full-stack webapplicaties kon bouwen."
    },
    {
        year: "2024",
        event: "Moderne frameworks",
        description: "Begon met het gebruik van moderne frameworks zoals React en Next.js. Verbeterde mijn JavaScript-vaardigheden en leerde TypeScript voor type-veilige code."
    },
    {
        year: "2024-2025",
        event: "Professionele groei",
        description: "Stage bij HQ-Online waar ik werkte met WordPress en geavanceerd PHP (inclusief het maken van plugins). Leerde hoe het is om in een professionele bedrijfsomgeving te werken en in teamverband projecten te voltooien."
    },
    {
        year: "2025",
        event: "Huidige focus",
        description: "Momenteel focus ik op het verdiepen van mijn kennis van moderne front-end ontwikkeling, state management, performance optimalisatie en toegankelijkheid."
    }
]

const SkillsTimeline = () => {
    const timelineRef = useRef<HTMLDivElement>(null)
    const [isInView, setIsInView] = useState(false)
    
    // Deze state houdt bij hoeveel procent van de tijdlijn zichtbaar is
    const [scrollProgress, setScrollProgress] = useState(0)
    
    useEffect(() => {
        const handleScroll = () => {
            if (!timelineRef.current) return
            
            const timelineElement = timelineRef.current
            const timelineTop = timelineElement.getBoundingClientRect().top
            const timelineBottom = timelineElement.getBoundingClientRect().bottom
            const windowHeight = window.innerHeight
            
            // Bepaal wanneer de tijdlijn in beeld komt
            if (timelineTop < windowHeight && timelineBottom > 0) {
                setIsInView(true)
                
                // Bereken hoeveel procent van de tijdlijn zichtbaar is
                // const visibleHeight = Math.min(windowHeight, timelineBottom) - Math.max(0, timelineTop)
                const totalHeight = timelineElement.offsetHeight
                // const visiblePercentage = Math.min(visibleHeight / totalHeight, 1)
                
                // Pas de berekening aan om de lijn te vullen naarmate we door de tijdlijn scrollen
                // We willen dat de lijn volledig gevuld is wanneer we het einde van de tijdlijn bereiken
                const scrollProgressValue = timelineTop <= 0 
                    ? Math.min(1, Math.abs(timelineTop) / (totalHeight - windowHeight) + 0.1)
                    : 0.1 // Start met een klein deel gevuld
                
                setScrollProgress(Math.min(1, Math.max(0.1, scrollProgressValue)))
            } else {
                setIsInView(false)
            }
        }
        
        window.addEventListener('scroll', handleScroll)
        // Direct een keer aanroepen om de initiële staat te bepalen
        handleScroll()
        
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-2 text-foreground">Mijn Leerpad</h2>
            <p className="text-center text-muted-foreground mb-12">
                Een overzicht van mijn ontwikkeling als software developer door de jaren heen
            </p>

            <div ref={timelineRef} className="relative max-w-3xl mx-auto">
                {/* Achtergrond tijdlijn (onvolledig deel) */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-secondary/70 transform md:translate-x-[-50%]"></div>
                
                {/* Geanimeerde tijdlijn die gevuld wordt tijdens scrollen */}
                <motion.div 
                    className="absolute left-0 md:left-1/2 top-0 w-1 bg-primary transform md:translate-x-[-50%]"
                    animate={{ 
                        height: isInView ? `${scrollProgress * 100}%` : "0%" 
                    }}
                    transition={{ 
                        duration: 0.3,
                        ease: "easeOut"
                    }}
                />

                {timeline.map((item, index) => (
                    <motion.div
                        key={index}
                        className={`mb-12 relative ${index % 2 === 0 ? 'md:text-right md:mr-[50%] md:pr-8' : 'md:ml-[50%] md:pl-8'
                            } pl-8 md:pl-0`}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        {/* Cirkel op de tijdlijn met kleur die verandert afhankelijk van de scrollpositie */}
                        <div 
                            className={`absolute left-[-8px] md:left-1/2 top-0 w-4 h-4 rounded-full md:translate-x-[-50%] border-4 border-background ${
                                scrollProgress * 100 >= (index / (timeline.length - 1)) * 100 
                                    ? "bg-primary" 
                                    : "bg-secondary/70"
                            }`}
                        />

                        <div className={`bg-card p-6 rounded-lg shadow-lg ${index % 2 === 0 ? 'md:mr-4' : 'md:ml-4'
                            }`}>
                            <div className="font-bold text-lg text-primary mb-2">{item.year}</div>
                            <h3 className="text-xl font-bold mb-2 text-accent-foreground">{item.event}</h3>
                            {item.description && (
                                <p className="text-accent-foreground/80">{item.description}</p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default SkillsTimeline