"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { type Certificate, categorizeAndSortCertificates } from "../utils/certificateUtils"
import { Search, Award, Calendar, Filter, X, ExternalLink } from "lucide-react"

const certificates: Certificate[] = [
    {
        href: "https://www.nexed.com/verify?certId=625495f0-eee7-466b-a42e-569c5f0fe592",
        title: "Command line",
        date: "Sep 13, 2022",
        code: "625495f0-eee7-466b-a42e-569c5f0fe592",
        category: "other",
    },
    {
        href: "https://www.nexed.com/verify?certId=cadfafe3-d2c3-4a67-bd9e-4ead7d407cfd",
        title: "HTML/CSS Beginner",
        date: "Sep 21, 2022",
        code: "cadfafe3-d2c3-4a67-bd9e-4ead7d407cfd",
        category: "frontend",
    },
    {
        href: "https://www.nexed.com/verify?certId=975b8d44-2423-4f3e-876c-53e5b3b9ec27",
        title: "MySQL Beginner",
        date: "Oct 7, 2022",
        code: "975b8d44-2423-4f3e-876c-53e5b3b9ec27",
        category: "backend",
    },
    {
        href: "https://www.nexed.com/verify?certId=656031bb-972a-4e9c-adc3-84898e78e8b9",
        title: "HTML/CSS Advanced",
        date: "Dec 6, 2022",
        code: "656031bb-972a-4e9c-adc3-84898e78e8b9",
        category: "frontend",
    },
    {
        href: "https://www.nexed.com/verify?certId=cdf73f4e-afdf-4ebf-a339-b94d1b3f25a8",
        title: "Git",
        date: "Jan 19, 2023",
        code: "cdf73f4e-afdf-4ebf-a339-b94d1b3f25a8",
        category: "other",
    },
    {
        href: "https://www.nexed.com/verify?certId=42fc424d-2c5e-4fb9-978a-8c4a4c453d71",
        title: "JavaScript Beginner",
        date: "Jan 24, 2023",
        code: "42fc424d-2c5e-4fb9-978a-8c4a4c453d71",
        category: "frontend",
    },
    {
        href: "https://www.nexed.com/verify?certId=83eeac69-d889-4656-b03e-2a2e332d5fb4",
        title: "Bootstrap",
        date: "Mar 7, 2023",
        code: "83eeac69-d889-4656-b03e-2a2e332d5fb4",
        category: "frontend",
    },
    {
        href: "https://www.nexed.com/verify?certId=e206da99-a169-4892-8557-8d2c5157ef1f",
        title: "JavaScript Novice",
        date: "Apr 19, 2023",
        code: "e206da99-a169-4892-8557-8d2c5157ef1f",
        category: "frontend",
    },
    {
        href: "https://www.nexed.com/verify?certId=f509520c-cd00-46ef-8800-cf7a0dcca9cb",
        title: "PHP Beginner",
        date: "Jun 27, 2023",
        code: "f509520c-cd00-46ef-8800-cf7a0dcca9cb",
        category: "backend",
    },
    {
        href: "https://www.nexed.com/verify?certId=018cfd41-abc2-78a4-95ac-d668f4bc9451",
        title: "Scrum",
        date: "Jul 12, 2023",
        code: "018cfd41-abc2-78a4-95ac-d668f4bc9451",
        category: "functional",
    },
    {
        href: "https://www.nexed.com/verify?certId=018cfd41-b8f2-7097-80a8-d4b939cad2dc",
        title: "PHP Web",
        date: "Sep 20, 2023",
        code: "018cfd41-b8f2-7097-80a8-d4b939cad2dc",
        category: "backend",
    },
    {
        href: "https://www.nexed.com/verify?certId=018cfd41-c59f-70bb-a7cd-d5eedbc261ad",
        title: "PHP Novice",
        date: "Sep 25, 2023",
        code: "018cfd41-c59f-70bb-a7cd-d5eedbc261ad",
        category: "backend",
    },
    {
        href: "https://www.nexed.com/verify?certId=018cfd41-d317-7ed3-97ef-6d8e65b8e320",
        title: "JavaScript Introductie",
        date: "Sep 27, 2023",
        code: "018cfd41-d317-7ed3-97ef-6d8e65b8e320",
        category: "frontend",
    },
    {
        href: "https://www.nexed.com/verify?certId=018cfd41-e595-7dfd-ae77-cae416a04975",
        title: "Database PDO",
        date: "Sep 29, 2023",
        code: "018cfd41-e595-7dfd-ae77-cae416a04975",
        category: "backend",
    },
    {
        href: "https://www.nexed.com/verify?certId=018cfd41-f47b-78a3-bc74-667aa84ecabe",
        title: "Fullstack Webdeveloper",
        date: "Dec 10, 2023",
        code: "018cfd41-f47b-78a3-bc74-667aa84ecabe",
        category: "fullstack",
    },
    {
        href: "https://www.nexed.com/verify?certId=018cfd42-019a-7c76-b5a2-fdd23ce48ed1",
        title: "Database Advanced",
        date: "Dec 20, 2023",
        code: "018cfd42-019a-7c76-b5a2-fdd23ce48ed1",
        category: "backend",
    },
    {
        href: "https://www.nexed.com/verify?certId=018cfd42-0f47-7733-8827-12f43836fc4b",
        title: "HTML Pro",
        date: "Jan 12, 2024",
        code: "018cfd42-0f47-7733-8827-12f43836fc4b",
        category: "frontend",
    },
    {
        href: "https://www.nexed.com/verify?certId=018ea35b-e8df-79a1-82f9-295e1ea4aff9",
        title: "Object Oriented Programming Intro",
        date: "Apr 2, 2024",
        code: "018ea35b-e8df-79a1-82f9-295e1ea4aff9",
        category: "other",
    },
    {
        href: "https://www.nexed.com/verify?certId=019011a5-c551-7497-ba87-e7bd2a080d64",
        title: "Unit Testing met PHP",
        date: "Apr 11, 2024",
        code: "019011a5-c551-7497-ba87-e7bd2a080d64",
        category: "backend",
    },
    {
        href: "https://www.nexed.com/verify?certId=018fb9b2-bb71-791d-aec0-e3b501fe7ce3",
        title: "Reguliere Expressies",
        date: "May 27, 2024",
        code: "018fb9b2-bb71-791d-aec0-e3b501fe7ce3",
        category: "other",
    },
    {
        href: "https://www.nexed.com/verify?certId=0194fec7-2ba0-75a1-8dbb-09ee8c2320ba",
        title: "CSS Pro",
        date: "Feb 2, 2025",
        code: "0194fec7-2ba0-75a1-8dbb-09ee8c2320ba",
        category: "frontend",
    },
    {
        href: "https://www.nexed.com/verify?certId=0195374c-1428-7f77-b6a7-7246fff3e44c",
        title: "JavaScript Pro",
        date: "Feb 24, 2025",
        code: "0195374c-1428-7f77-b6a7-7246fff3e44c",
        category: "frontend",
    },
    {
        href: "https://www.nexed.com/verify?certId=01954c7c-52a4-704a-8add-60880786ac61",
        title: "Front-end Frameworks",
        date: "Feb 28, 2025",
        code: "01954c7c-52a4-704a-8add-60880786ac61",
        category: "frontend",
    },
    {
        href: "https://www.nexed.com/verify?certId=01955c8e-9214-7a0a-9fde-c367e481adec",
        title: "End-to-End Testing",
        date: "Mar 4, 2025",
        code: "01955c8e-9214-7a0a-9fde-c367e481adec",
        category: "other",
    },
    {
        href: "https://www.nexed.com/verify?certId=019570e7-8ba8-7db8-951a-1399b526da02",
        title: "JavaScript Classes",
        date: "Mar 7, 2025",
        code: "019570e7-8ba8-7db8-951a-1399b526da02",
        category: "frontend",
    },
]

type SortButton = { label: string; value: string; icon: React.ElementType };

// Custom filter buttons met iconen
const sortButtons: SortButton[] = [
    { label: "Alles", value: "date", icon: Filter },
    { label: "Front-end", value: "frontend", icon: Award },
    { label: "Back-end", value: "backend", icon: Award },
    { label: "Fullstack", value: "fullstack", icon: Award },
    { label: "Functioneel", value: "functional", icon: Award },
    { label: "Overig", value: "other", icon: Award },
]

// Hulpfunctie om certificaat categorieën te tellen
const countCertificatesByCategory = (certs: Certificate[]) => {
    return certs.reduce((counts, cert) => {
        counts[cert.category] = (counts[cert.category] || 0) + 1;
        return counts;
    }, {} as Record<string, number>);
}

const ImprovedCertificates = () => {
    const [showAll, setShowAll] = useState(false)
    const [sortType, setSortType] = useState("date")
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)

    useEffect(() => {
        // Simuleer laadtijd voor data
        const timer = setTimeout(() => setLoading(false), 500)
        return () => clearTimeout(timer)
    }, [])

    // Bereken categorie-aantallen
    const categoryCounts = useMemo(() =>
        countCertificatesByCategory(certificates), []);

    // Filter certificaten op zoekopdracht en sorteertype
    const filteredCertificates = useMemo(() => {
        let filtered = certificates;

        // Zoekfilter toepassen
        if (searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            filtered = filtered.filter(cert =>
                cert.title.toLowerCase().includes(lowerSearchTerm) ||
                cert.category.toLowerCase().includes(lowerSearchTerm)
            );
        }

        // Categorie filter toepassen
        return categorizeAndSortCertificates(filtered, sortType);
    }, [searchTerm, sortType]);

    const hasMoreThanSix = filteredCertificates.length > 6
    const visibleCertificates = showAll || !hasMoreThanSix ? filteredCertificates : filteredCertificates.slice(0, 6)

    // Groepeer certificaten per jaar
    const certificatesByYear = useMemo(() => {
        return visibleCertificates.reduce((groups, cert) => {
            const year = new Date(cert.date).getFullYear().toString();
            if (!groups[year]) groups[year] = [];
            groups[year].push(cert);
            return groups;
        }, {} as Record<string, Certificate[]>);
    }, [visibleCertificates]);

    // Jaartallen in omgekeerde volgorde (nieuwste eerst)
    const years = useMemo(() =>
        Object.keys(certificatesByYear).sort((a, b) => parseInt(b) - parseInt(a)),
        [certificatesByYear]
    );

    // Details modal voor certificaten
    const renderCertificateModal = () => {
        if (!selectedCertificate) return null;

        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-card rounded-xl p-6 max-w-md w-full shadow-xl text-card-foreground"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-accent-foreground">Certificaat Details</h3>
                        <button
                            onClick={() => setSelectedCertificate(null)}
                            className="p-1 rounded-full hover:bg-secondary transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex justify-center mb-6">
                        <div className="w-32 h-32 bg-white rounded-lg p-2 flex items-center justify-center shadow-md">
                            <Image
                                src="/images/BIT-Academy-Logo-1024x1024.webp"
                                alt="Bit Academy Logo"
                                width={100}
                                height={100}
                                className="object-contain"
                            />
                        </div>
                    </div>

                    <h4 className="text-lg font-bold text-center mb-4 text-accent-foreground">{selectedCertificate.title}</h4>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-accent-foreground/80">
                            <Calendar size={18} />
                            <span>Behaald op {selectedCertificate.date}</span>
                        </div>

                        <div className="flex items-center gap-2 text-accent-foreground/80">
                            <Award size={18} />
                            <span className="capitalize">Categorie: {selectedCertificate.category}</span>
                        </div>

                        <div className="flex flex-col gap-1 text-accent-foreground/80">
                            <p className="text-sm">Certificaat Code:</p>
                            <code className="bg-secondary p-2 rounded text-xs font-mono break-all">{selectedCertificate.code}</code>
                        </div>
                    </div>

                    <div className="mt-6">
                        <a
                            href={selectedCertificate.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            <ExternalLink size={18} />
                            Verifiëren op Nexed
                        </a>
                    </div>
                </motion.div>
            </div>
        );
    };

    if (loading) {
        return (
            <section id="certificaten" className="mb-20 min-h-[400px] flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold text-center mb-2 text-foreground">Certificaten</h2>
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary mt-10"></div>
                <p className="text-muted-foreground mt-4">Certificaten laden...</p>
            </section>
        )
    }

    return (
        <section id="certificaten" className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-2 text-foreground">Certificaten</h2>
            <p className="text-center text-muted-foreground mb-8">
                Klik op een certificaat om details te bekijken en om de echtheid te verifiëren
            </p>

            {/* Statistieken en categorieën */}
            <div className="mb-8 bg-card rounded-lg p-6 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Statistieken */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center text-accent-foreground">
                            <Award size={20} className="mr-2 text-primary" />
                            Certificaten Overzicht
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-secondary/50 rounded-lg p-4 text-center">
                                <p className="text-2xl font-bold text-accent-foreground">{certificates.length}</p>
                                <p className="text-xs text-muted-foreground">Totaal</p>
                            </div>
                            <div className="bg-secondary/50 rounded-lg p-4 text-center">
                                <p className="text-2xl font-bold text-accent-foreground">{categoryCounts.frontend || 0}</p>
                                <p className="text-xs text-muted-foreground">Frontend</p>
                            </div>
                            <div className="bg-secondary/50 rounded-lg p-4 text-center">
                                <p className="text-2xl font-bold text-accent-foreground">{categoryCounts.backend || 0}</p>
                                <p className="text-xs text-muted-foreground">Backend</p>
                            </div>
                        </div>
                    </div>

                    {/* Filter en zoeken */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center text-accent-foreground">
                            <Filter size={20} className="mr-2 text-primary" />
                            Filteren en Zoeken
                        </h3>

                        {/* Zoekbalk */}
                        <div className="relative mb-4">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Zoek op titel of categorie..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-10 py-2 bg-secondary rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter knoppen */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {sortButtons.map((button) => (
                    <button
                        key={button.value}
                        onClick={() => {
                            setSortType(button.value)
                            setShowAll(false) // Reset "Toon meer" als categorie verandert
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${sortType === button.value
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            }`}
                    >
                        <button.icon size={16} />
                        {button.label}
                        {button.value !== "date" && categoryCounts[button.value] && (
                            <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-secondary/20 backdrop-blur-sm">
                                {categoryCounts[button.value]}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Geen resultaten bericht */}
            {visibleCertificates.length === 0 && (
                <div className="text-center py-12 bg-card rounded-lg shadow-md">
                    <Image
                        src="/images/BIT-Academy-Logo-1024x1024.webp"
                        alt="Bit Academy Logo"
                        width={80}
                        height={80}
                        className="mx-auto mb-4 opacity-20"
                    />
                    <h3 className="text-xl font-semibold mb-2 text-accent-foreground">Geen certificaten gevonden</h3>
                    <p className="text-muted-foreground">
                        {searchTerm
                            ? `Geen certificaten gevonden voor "${searchTerm}".`
                            : `Geen certificaten in de categorie "${sortButtons.find(b => b.value === sortType)?.label}".`}
                    </p>
                </div>
            )}  

            {/* Certificaten gegroepeerd per jaar */}
            {visibleCertificates.length > 0 && (
                <motion.div
                    className="space-y-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {years.map(year => (
                        <div key={year} className="mb-8">
                            <div className="flex items-center mb-4">
                                <h3 className="text-xl font-bold text-accent-foreground">{year}</h3>
                                <div className="ml-4 h-px flex-grow bg-border"></div>
                                <span className="ml-2 bg-secondary text-secondary-foreground text-sm px-3 py-1 rounded-full">
                                    {certificatesByYear[year].length} certificaten
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {certificatesByYear[year].map((cert, index) => (
                                    <motion.div
                                        key={cert.code}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="group cursor-pointer"
                                        onClick={() => setSelectedCertificate(cert)}
                                    >
                                        <div className="bg-card hover:bg-card/80 rounded-lg shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:translate-y-[-2px] border border-transparent group-hover:border-primary/20">
                                            <div className="p-4 flex items-center gap-4">
                                                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-md p-1 flex items-center justify-center shadow-sm group-hover:shadow">
                                                    <Image
                                                        src="/images/BIT-Academy-Logo-1024x1024.webp"
                                                        alt="Bit Academy Logo"
                                                        width={40}
                                                        height={40}
                                                        className="object-contain"
                                                    />
                                                </div>

                                                <div className="flex-grow min-w-0">
                                                    <h4 className="font-medium text-accent-foreground truncate group-hover:text-primary transition-colors">{cert.title}</h4>
                                                    <div className="flex flex-wrap items-center gap-2 mt-1">
                                                        <span className="text-xs text-muted-foreground">{cert.date}</span>
                                                        <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground"></span>
                                                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary capitalize">
                                                            {cert.category}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <ExternalLink size={16} className="text-primary" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
            )}

            {/* Toon meer/minder knop */}
            {hasMoreThanSix && (
                <div className="text-center mt-10">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="group relative px-6 py-2 overflow-hidden rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {showAll ? "Toon minder" : `Toon alle ${filteredCertificates.length} certificaten`}
                        </span>
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary-foreground/20 to-primary/0"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        />
                    </button>
                </div>
            )}

            {/* Certificate Detail Modal */}
            <AnimatePresence>
                {selectedCertificate && renderCertificateModal()}
            </AnimatePresence>
        </section>
    )
}

export default ImprovedCertificates