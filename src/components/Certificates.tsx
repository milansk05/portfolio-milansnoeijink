"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { type Certificate, categorizeAndSortCertificates } from "../utils/certificateUtils"

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
        date: "Februari 2, 2025",
        code: "0194fec7-2ba0-75a1-8dbb-09ee8c2320ba",
        category: "frontend",
    },
    {
        href: "https://www.nexed.com/verify?certId=0195374c-1428-7f77-b6a7-7246fff3e44c",
        title: "JavaScript Pro",
        date: "Februari 24, 2025",
        code: "0195374c-1428-7f77-b6a7-7246fff3e44c",
        category: "frontend",
    },
]

const sortButtons: { label: string; value: string }[] = [
    { label: "Alles", value: "date" },
    { label: "Front-end", value: "frontend" },
    { label: "Back-end", value: "backend" },
    { label: "Fullstack", value: "fullstack" },
    { label: "Functioneel", value: "functional" },
    { label: "Overig", value: "other" },
]

const Certificates = () => {
    const [showAll, setShowAll] = useState(false)
    const [sortType, setSortType] = useState("date")

    const sortedCertificates = categorizeAndSortCertificates(certificates, sortType)
    const hasMoreThanSix = sortedCertificates.length > 6
    const visibleCertificates = showAll || !hasMoreThanSix ? sortedCertificates : sortedCertificates.slice(0, 6)

    return (
        <section id="certificaten" className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-2 text-foreground">Certificaten</h2>
            <p className="text-center text-muted-foreground mb-8">
                Klik op een certificaat om de echtheid te verifiëren op de officiële website
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
                {sortButtons.map((button) => (
                    <button
                        key={button.value}
                        onClick={() => {
                            setSortType(button.value)
                            setShowAll(false) // Reset "Toon meer" als categorie verandert
                        }}
                        className={`px-4 py-2 rounded-full ${sortType === button.value
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                            }`}
                    >
                        {button.label}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleCertificates.map((cert, index) => (
                    <motion.a
                        key={cert.code}
                        href={cert.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-card hover:bg-card rounded-lg shadow-lg flex items-center gap-5 p-4 transition-colors text-card-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        viewport={{ once: true }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        <Image
                            src="/images/BIT-Academy-Logo-1024x1024.webp"
                            alt="Bit Academy Logo"
                            width={96}
                            height={60}
                            className="rounded-lg bg-white"
                        />
                        <div>
                            <p className="font-bold text-accent-foreground">{cert.title}</p>
                            <p className="text-sm text-accent-foreground/80">Behaald op {cert.date}</p>
                            <p className="text-sm text-accent-foreground/80">Code: {cert.code}</p>
                            <p className="text-sm text-accent-foreground/80 capitalize">Categorie: {cert.category}</p>
                        </div>
                    </motion.a>
                ))}
            </div>
            {hasMoreThanSix && (
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

export default Certificates