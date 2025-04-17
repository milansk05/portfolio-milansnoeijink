"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, X, Plus } from "lucide-react"

const skills = [
    { name: "WordPress", image: "/images/wordpress.png", proficiency: 70, category: "cms" },
    { name: "React", image: "/images/react-original-wordmark-icon-840x1024-vhmauxp6.png", proficiency: 80, category: "frontend" },
    { name: "Next.js", image: "/images/nextjs-icon.webp", proficiency: 80, category: "frontend" },
    { name: "TypeScript", image: "/images/Typescript_logo_2020.png", proficiency: 70, category: "language" },
    { name: "Bootstrap", image: "/images/5968672.png", proficiency: 80, category: "frontend" },
    { name: "PHP", image: "/images/php-logo-4694fbe1.webp", proficiency: 80, category: "language" },
    { name: "Twig", image: "/images/twig-1.png", proficiency: 60, category: "template" },
    { name: "SQL", image: "/images/sql-logo-6f2e527e.webp", proficiency: 85, category: "database" },
    { name: "HTML", image: "/images/html-logo-0f5d6bc7.webp", proficiency: 90, category: "frontend" },
    { name: "CSS", image: "/images/css-logo-7cd08696.webp", proficiency: 80, category: "frontend" },
    { name: "JavaScript", image: "/images/javascript-logo-58842eab.webp", proficiency: 80, category: "language" },
    { name: "Tailwind CSS", image: "/images/tailwind-logo-23f154a0.webp", proficiency: 85, category: "frontend" },
]

type SkillCategory = "all" | "frontend" | "language" | "database" | "cms" | "template"

const categories: { label: string; value: SkillCategory }[] = [
    { label: "Alles", value: "all" },
    { label: "Frontend", value: "frontend" },
    { label: "Talen", value: "language" },
    { label: "Database", value: "database" },
    { label: "CMS", value: "cms" },
    { label: "Templates", value: "template" },
]

const Skills = () => {
    const [showAll, setShowAll] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState<SkillCategory>("all")
    const [expandedSkill, setExpandedSkill] = useState<string | null>(null)

    useEffect(() => {
        // Simuleer laadtijd voor data
        const timer = setTimeout(() => setLoading(false), 500)
        return () => clearTimeout(timer)
    }, [])

    // Filter op categorie en zoekterm
    const filteredSkills = skills.filter(skill =>
        (activeCategory === "all" || skill.category === activeCategory) &&
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const maxVisible = 8
    const hasMoreThanMax = filteredSkills.length > maxVisible && searchTerm === "" && activeCategory === "all"
    const visibleSkills = (showAll || !hasMoreThanMax || searchTerm !== "" || activeCategory !== "all")
        ? filteredSkills
        : filteredSkills.slice(0, maxVisible)

    const getProficiencyLabel = (proficiency: number): string => {
        if (proficiency >= 90) return "Expert"
        if (proficiency >= 75) return "Gevorderd"
        if (proficiency >= 60) return "Competent"
        if (proficiency >= 40) return "Gemiddeld"
        return "Beginner"
    }

    const getProficiencyColor = (proficiency: number): string => {
        if (proficiency >= 90) return "bg-emerald-500"
        if (proficiency >= 75) return "bg-blue-500"
        if (proficiency >= 60) return "bg-amber-500"
        if (proficiency >= 40) return "bg-orange-500"
        return "bg-red-500"
    }

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
        <section id="skills" className="mb-20">
            <h2 className="text-3xl font-bold text-center text-foreground mb-2">Vaardigheden</h2>
            <p className="text-center text-muted-foreground mb-8">
                Een overzicht van de technologieën en tools waarin ik ervaring heb en regelmatig mee werk.
            </p>

            {/* Filter en zoekbalk */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                <div className="flex flex-wrap justify-center gap-2">
                    {categories.map(category => (
                        <button
                            key={category.value}
                            onClick={() => {
                                setActiveCategory(category.value)
                                setExpandedSkill(null) // Reset expanded skill when changing categories
                            }}
                            className={`px-4 py-2 rounded-full transition-colors ${activeCategory === category.value
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-72">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                        type="text"
                        placeholder="Zoek vaardigheden..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-10 py-2 w-full rounded-full bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    )}
                </div>
            </div>

            {visibleSkills.length === 0 ? (
                <div className="text-center bg-secondary/50 rounded-lg p-8 mt-8">
                    <p className="text-muted-foreground">Geen vaardigheden gevonden voor &quot;{searchTerm}&quot;.</p>
                </div>
            ) : (
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {visibleSkills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            layoutId={`skill-card-${skill.name}`}
                            className={`bg-card rounded-lg shadow-lg overflow-hidden ${expandedSkill === skill.name
                                ? "col-span-1 md:col-span-2 lg:col-span-3"
                                : ""
                                }`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            viewport={{ once: true }}
                        >
                            <div
                                className={`p-6 cursor-pointer ${expandedSkill === skill.name
                                    ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                                    : "flex items-center"
                                    }`}
                                onClick={() => setExpandedSkill(expandedSkill === skill.name ? null : skill.name)}
                            >
                                <div className={`flex items-center ${expandedSkill === skill.name ? "flex-col md:flex-row" : "space-x-4"
                                    }`}>
                                    <div className="bg-gradient-to-br from-background to-secondary rounded-lg p-3 w-16 h-16 flex items-center justify-center flex-shrink-0">
                                        <Image
                                            src={skill.image || "/placeholder.svg"}
                                            alt={`${skill.name} logo`}
                                            width={48}
                                            height={48}
                                            className="object-contain"
                                        />
                                    </div>

                                    <div className={`flex-grow ${expandedSkill === skill.name ? "mt-4 md:mt-0 md:ml-4" : ""}`}>
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className="text-lg font-semibold text-accent-foreground">{skill.name}</h3>
                                            <span className="bg-secondary text-secondary-foreground text-xs px-2.5 py-1 rounded-full whitespace-nowrap ml-2">
                                                {getProficiencyLabel(skill.proficiency)}
                                            </span>
                                        </div>

                                        <div className="w-full bg-secondary rounded-full h-2.5 mt-2">
                                            <motion.div
                                                className={`h-2.5 rounded-full ${getProficiencyColor(skill.proficiency)}`}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.proficiency}%` }}
                                                transition={{ duration: 1, delay: 0.2 }}
                                                viewport={{ once: true }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {expandedSkill === skill.name && (
                                    <div className="text-accent-foreground/80 mt-4 md:mt-0">
                                        <h4 className="font-medium mb-2 text-accent-foreground">Details</h4>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Niveau: {getProficiencyLabel(skill.proficiency)} ({skill.proficiency}%)</li>
                                            <li>Categorie: {
                                                categories.find(cat => cat.value === skill.category)?.label ||
                                                skill.category.charAt(0).toUpperCase() + skill.category.slice(1)
                                            }</li>
                                        </ul>

                                        <div className="flex items-center justify-end mt-4">
                                            <button className="text-primary flex items-center gap-1 text-sm">
                                                <Plus size={16} />
                                                {expandedSkill === skill.name ? "Minder tonen" : "Meer tonen"}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {hasMoreThanMax && activeCategory === "all" && searchTerm === "" && (
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