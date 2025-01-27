"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const blogPosts = [
    {
        title: "Mijn reis in software development",
        excerpt: "In deze post deel ik mijn ervaringen en lessen die ik heb geleerd tijdens mijn studie en stages.",
        date: "15 mei 2024",
        slug: "mijn-reis-in-software-development"
    },
    {
        title: "De toekomst van web development",
        excerpt: "Een overzicht van opkomende technologieën en trends die de toekomst van web development zullen vormgeven.",
        date: "2 juni 2024",
        slug: "toekomst-van-web-development"
    },
    {
        title: "Tips voor beginnende programmeurs",
        excerpt: "Praktische adviezen en resources voor mensen die net beginnen met programmeren.",
        date: "20 juni 2024",
        slug: "tips-voor-beginnende-programmeurs"
    }
]

const Blog = () => {
    return (
        <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">Blog</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                    <motion.div
                        key={index}
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-xl font-semibold mb-2 dark:text-white">{post.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400">{post.date}</span>
                            <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline dark:text-blue-400">
                                Lees meer
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default Blog