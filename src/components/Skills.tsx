"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search } from "lucide-react"

const skills = [
    { name: "WordPress", image: "/images/wordpress.png", proficiency: 70 },
    { name: "React", image: "/images/react-original-wordmark-icon-840x1024-vhmauxp6.png", proficiency: 80 },
    { name: "Next.js", image: "/images/nextjs-icon.webp", proficiency: 80 },
    { name: "TypeScript", image: "/images/Typescript_logo_2020.png", proficiency: 70 },
    { name: "Bootstrap", image: "/images/5968672.png", proficiency: 80 },
    { name: "PHP", image: "/images/php-logo-4694fbe1.webp", proficiency: 80 },
    { name: "Twig", image: "/images/twig-1.png", proficiency: 60 },
    { name: "SQL", image: "/images/sql-logo-6f2e527e.webp", proficiency: 85 },
    { name: "HTML", image: "/images/html-logo-0f5d6bc7.webp", proficiency: 90 },
    { name: "CSS", image: "/images/css-logo-7cd08696.webp", proficiency: 80 },
    { name: "JavaScript", image: "/images/javascript-logo-58842eab.webp", proficiency: 80 },
    { name: "Tailwind CSS", image: "/images/tailwind-logo-23f154a0.webp", proficiency: 85 },
]

const Skills = () => {
    const [showAll, setShowAll] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simuleer laadtijd voor data
        const timer = setTimeout(() => setLoading(false), 500)
        return () => clearTimeout(timer)
    }, [])

    const filteredSkills = skills.filter(skill =>
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const maxVisible = 8
    const hasMoreThanMax = filteredSkills.length > maxVisible && searchTerm === ""
    const visibleSkills = (showAll || !hasMoreThanMax || searchTerm !== "")
        ? filteredSkills
        : filteredSkills.slice(0, maxVisible)

    if (loading) {
        return (
            <section className="mb-20 min-h-[400px] flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold text-center text-foreground mb-2">Vaardigheden</h2>
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary mt-10"></div>
                <p className="text-muted-foreground mt-4">Vaardigheden laden...</p>
            </section>
        )
    }

    return (
        <section className="mb-20">
            <h2 className="text-3xl font-bold text-center text-foreground mb-2">Vaardigheden</h2>
            <p className="text-center text-muted-foreground mb-8">
                Een overzicht van de technologieën en tools waarin ik ervaring heb en regelmatig mee werk.
            </p>

            <div className="relative max-w-md mx-auto mb-8">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                    type="text"
                    placeholder="Zoek vaardigheden..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full rounded-full bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm("")}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
                    >
                        ✕
                    </button>
                )}
            </div>

            {visibleSkills.length === 0 ? (
                <p className="text-center text-muted-foreground">Geen vaardigheden gevonden voor "{searchTerm}".</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {visibleSkills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            className="bg-card rounded-lg p-6 shadow-lg flex items-center space-x-4 text-card-foreground"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-transparent dark:bg-muted rounded-lg p-2 w-16 h-16 flex items-center justify-center">
                                <Image
                                    src={skill.image || "/placeholder.svg"}
                                    alt={`${skill.name} logo`}
                                    width={48}
                                    height={48}
                                    className="object-contain bg-muted"
                                    loading="lazy"
                                />
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-lg font-semibold mb-2 text-accent-foreground">{skill.name}</h3>
                                <div className="w-full bg-secondary rounded-full h-2.5">
                                    <motion.div
                                        className="bg-primary h-2.5 rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.proficiency}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        viewport={{ once: true }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {hasMoreThanMax && searchTerm === "" && (
                <div className="text-center mt-8">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
                    >
                        {showAll ? "Toon minder" : "Toon meer"}
                    </button>
                </div>
            )}
        </section>
    )
}

export default Skills