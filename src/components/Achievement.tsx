"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'

interface AchievementProps {
    title: string
    description: string
    icon?: string
    show: boolean
    onClose: () => void
}

const Achievement = ({ title, description, icon = "/images/achievement-icon.png", show, onClose }: AchievementProps) => {
    if (!show) return null

    return (
        <motion.div
            className="fixed top-8 right-8 z-50 flex items-center gap-3 bg-gray-800/90 border-2 border-gray-900 rounded-md px-4 py-3 shadow-lg w-80"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.4 }}
        >
            {/* Achievement icon */}
            <div className="flex-shrink-0 relative w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-md overflow-hidden border border-yellow-700">
                <Image
                    src={icon}
                    alt="Achievement Icon"
                    width={40}
                    height={40}
                    className="object-contain"
                />
            </div>

            {/* Achievement text */}
            <div className="flex-grow">
                <p className="text-yellow-300 text-sm font-bold mb-1">Achievement Unlocked!</p>
                <p className="text-white font-bold text-base leading-tight">{title}</p>
                <p className="text-gray-300 text-xs">{description}</p>
            </div>

            {/* Yellow shine animation */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent pointer-events-none"
                initial={{ x: -200 }}
                animate={{ x: 350 }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    repeatDelay: 1
                }}
            />
        </motion.div>
    )
}

export default Achievement