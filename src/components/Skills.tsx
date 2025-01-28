"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const skills = [
    {
        name: "React",
        image: "/images/react-original-wordmark-icon-840x1024-vhmauxp6.png",
        proficiency: 85,
    },
    {
        name: "Next.js",
        image: "/images/nextjs-light.png",
        proficiency: 80,
    },
    {
        name: "TypeScript",
        image: "/images/Typescript_logo_2020.png",
        proficiency: 75,
    },
    {
        name: "Bootstrap",
        image: "/images/bootstrap.png",
        proficiency: 80,
    },
    {
        name: "PHP",
        image: "/images/php-logo-4694fbe1.webp",
        proficiency: 75,
    },
    {
        name: "Twig",
        image: "/images/twig-logo.png",
        proficiency: 70,
    },
    {
        name: "SQL",
        image: "/images/sql-logo-6f2e527e.webp",
        proficiency: 85,
    },
    {
        name: "HTML",
        image: "/images/html-logo-0f5d6bc7.webp",
        proficiency: 90,
    },
    {
        name: "CSS",
        image: "/images/css-logo-7cd08696.webp",
        proficiency: 85,
    },
    {
        name: "JavaScript",
        image: "/images/javascript-logo-58842eab.webp",
        proficiency: 80,
    },
    {
        name: "Tailwind CSS",
        image: "/images/tailwind-logo-23f154a0.webp",
        proficiency: 75,
    },
]

const Skills = () => {
    return (
        <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Vaardigheden</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill.name}
                        className="bg-accent rounded-lg p-6 shadow-lg flex items-center space-x-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-white dark:bg-gray-700 rounded-lg p-2 w-16 h-16 flex items-center justify-center">
                            <Image
                                src={skill.image || "/placeholder.svg"}
                                alt={`${skill.name} logo`}
                                width={48}
                                height={48}
                                className="object-contain"
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
        </section>
    )
}

export default Skills