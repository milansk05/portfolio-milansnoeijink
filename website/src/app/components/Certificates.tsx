"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const certificates = [
    {
        href: "https://www.nexed.com/verify?certId=625495f0-eee7-466b-a42e-569c5f0fe592",
        title: "Command line",
        date: "Sep 13, 2022",
        code: "625495f0-eee7-466b-a42e-569c5f0fe592"
    },
    {
        href: "https://www.nexed.com/verify?certId=cadfafe3-d2c3-4a67-bd9e-4ead7d407cfd",
        title: "HTML/CSS Beginner",
        date: "Sep 21, 2022",
        code: "cadfafe3-d2c3-4a67-bd9e-4ead7d407cfd"
    },
    // ... Add all other certificates here
]

const Certificates = () => {
    const [showAll, setShowAll] = useState(false)
    const visibleCertificates = showAll ? certificates : certificates.slice(0, 6)

    return (
        <section id="certificaten" className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-8">Certificaten</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleCertificates.map((cert, index) => (
                    <motion.a
                        key={cert.code}
                        href={cert.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white hover:bg-slate-100 rounded-lg shadow flex items-center gap-5 p-4 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Image
                            src="/bitlogo.jpg"
                            alt="Bit Academy Logo"
                            width={96}
                            height={60}
                            className="rounded-lg"
                        />
                        <div>
                            <p className="font-bold">{cert.title}</p>
                            <p className="text-sm text-gray-600">Behaald op {cert.date}</p>
                            <p className="text-sm text-gray-600">Code: {cert.code}</p>
                        </div>
                    </motion.a>
                ))}
            </div>
            {certificates.length > 6 && (
                <div className="text-center mt-8">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                        {showAll ? "Toon minder" : "Toon meer"}
                    </button>
                </div>
            )}
        </section>
    )
}

export default Certificates