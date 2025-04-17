import React from 'react'
import { motion } from 'framer-motion'

interface TechnologyBadgeProps {
    name: string
    index: number
    iconPath?: string
}

// Map technology names to appropriate colors
const getTechColor = (techName: string): { bg: string, text: string } => {
    const techColors: Record<string, { bg: string, text: string }> = {
        "React": { bg: "bg-blue-100 dark:bg-blue-900/50", text: "text-blue-800 dark:text-blue-300" },
        "Next.js": { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-800 dark:text-gray-200" },
        "TypeScript": { bg: "bg-blue-100 dark:bg-blue-900/50", text: "text-blue-800 dark:text-blue-300" },
        "JavaScript": { bg: "bg-yellow-100 dark:bg-yellow-900/50", text: "text-yellow-800 dark:text-yellow-300" },
        "Node.js": { bg: "bg-green-100 dark:bg-green-900/50", text: "text-green-800 dark:text-green-300" },
        "Express": { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-800 dark:text-gray-200" },
        "MongoDB": { bg: "bg-green-100 dark:bg-green-900/50", text: "text-green-800 dark:text-green-300" },
        "PostgreSQL": { bg: "bg-blue-100 dark:bg-blue-900/50", text: "text-blue-800 dark:text-blue-300" },
        "MySQL": { bg: "bg-blue-100 dark:bg-blue-900/50", text: "text-blue-800 dark:text-blue-300" },
        "Tailwind CSS": { bg: "bg-cyan-100 dark:bg-cyan-900/50", text: "text-cyan-800 dark:text-cyan-300" },
        "HTML": { bg: "bg-orange-100 dark:bg-orange-900/50", text: "text-orange-800 dark:text-orange-300" },
        "CSS": { bg: "bg-blue-100 dark:bg-blue-900/50", text: "text-blue-800 dark:text-blue-300" },
        "PHP": { bg: "bg-purple-100 dark:bg-purple-900/50", text: "text-purple-800 dark:text-purple-300" },
        "Firebase": { bg: "bg-amber-100 dark:bg-amber-900/50", text: "text-amber-800 dark:text-amber-300" },
        "Redux": { bg: "bg-purple-100 dark:bg-purple-900/50", text: "text-purple-800 dark:text-purple-300" },
        "Stripe": { bg: "bg-purple-100 dark:bg-purple-900/50", text: "text-purple-800 dark:text-purple-300" },
        "Prisma": { bg: "bg-slate-100 dark:bg-slate-800", text: "text-slate-800 dark:text-slate-300" },
        "React Native": { bg: "bg-blue-100 dark:bg-blue-900/50", text: "text-blue-800 dark:text-blue-300" },
        "Expo": { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-800 dark:text-gray-200" },
        "Framer Motion": { bg: "bg-pink-100 dark:bg-pink-900/50", text: "text-pink-800 dark:text-pink-300" },
        "EmailJS": { bg: "bg-yellow-100 dark:bg-yellow-900/50", text: "text-yellow-800 dark:text-yellow-300" },
    }

    // Return color based on tech name, or default color if not found
    return techColors[techName] || { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-800 dark:text-gray-200" }
}

const TechnologyBadge: React.FC<TechnologyBadgeProps> = ({ name, index, iconPath }) => {
    const { bg, text } = getTechColor(name)

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`inline-flex items-center px-3 py-1 rounded-full ${bg} ${text} text-sm font-medium`}
        >
            {iconPath && (
                <span className="mr-1 w-4 h-4">
                    <img src={iconPath} alt={name} className="w-full h-full object-contain" />
                </span>
            )}
            {name}
        </motion.div>
    )
}

export default TechnologyBadge