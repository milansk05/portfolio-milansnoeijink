"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useDarkMode } from '@/components/DarkModeContext'

const DarkModeToggle = () => {
    const { darkMode, toggleDarkMode } = useDarkMode()
    const [mounted, setMounted] = useState(false)

    // Gebruik useEffect om te voorkomen dat er hydration mismatch is
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <button
            onClick={toggleDarkMode}
            className="p-4 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 relative overflow-hidden"
            aria-label={darkMode ? "Schakel lichte modus in" : "Schakel donkere modus in"}
        >
            <div className="relative z-10 w-4 h-4 flex items-center justify-center">
                {darkMode ? (
                    // Zon animatie
                    <motion.div
                        key="sun"
                        initial={{ scale: 0.6, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0.6, rotate: 90 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ImprovedSunIcon />
                    </motion.div>
                ) : (
                    // Maan animatie
                    <motion.div
                        key="moon"
                        initial={{ scale: 0.6, rotate: 90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0.6, rotate: -90 }}
                        transition={{ duration: 0.5 }}
                    >
                        <MoonIcon />
                    </motion.div>
                )}
            </div>

            {/* Achtergrond animatie */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-b"
                initial={false}
                animate={{
                    background: darkMode
                        ? "linear-gradient(to bottom, #f59e0b, #f97316)"
                        : "linear-gradient(to bottom, #1e40af, #3b82f6)"
                }}
                transition={{ duration: 0.5 }}
            />

            {/* Dag/nacht elementen */}
            {darkMode ? (
                // Dag elementen (zon-stralen)
                <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={`ray-${i}`}
                            className="absolute bg-yellow-300 rounded-full"
                            style={{
                                left: '50%',
                                top: '50%',
                                transformOrigin: 'center',
                                transform: `rotate(${i * 30}deg) translateY(-14px)`,
                                height: i % 2 === 0 ? '3px' : '2px',
                                width: i % 2 === 0 ? '5px' : '3px',
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 + i * 0.03 }}
                        />
                    ))}
                </motion.div>
            ) : (
                // Nacht elementen (sterren)
                <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={`star-${i}`}
                            className="absolute bg-white rounded-full w-1 h-1"
                            style={{
                                left: `${10 + i * 20}%`,
                                top: `${20 + (i % 3) * 20}%`,
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0.5, 1], scale: [0.8, 1.2, 0.8] }}
                            transition={{
                                duration: 2,
                                delay: i * 0.3,
                                repeat: Infinity,
                                repeatType: 'reverse',
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </button>
    )
}

// Verbeterde Zon SVG component met meer detail
const ImprovedSunIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* Centrale zon cirkel */}
        <circle cx="12" cy="12" r="5" fill="#FDB813" stroke="#FDB813" />

        {/* Lichte centrum spot */}
        <circle cx="12" cy="12" r="2.5" fill="#FFED8A" />

        {/* Zonnestralen */}
        <line x1="12" y1="2" x2="12" y2="4" stroke="#FDB813" strokeWidth="2" />
        <line x1="12" y1="20" x2="12" y2="22" stroke="#FDB813" strokeWidth="2" />
        <line x1="4" y1="12" x2="2" y2="12" stroke="#FDB813" strokeWidth="2" />
        <line x1="22" y1="12" x2="20" y2="12" stroke="#FDB813" strokeWidth="2" />

        {/* Diagonale stralen */}
        <line x1="6.34" y1="6.34" x2="4.93" y2="4.93" stroke="#FDB813" strokeWidth="1.5" />
        <line x1="19.07" y1="19.07" x2="17.66" y2="17.66" stroke="#FDB813" strokeWidth="1.5" />
        <line x1="6.34" y1="17.66" x2="4.93" y2="19.07" stroke="#FDB813" strokeWidth="1.5" />
        <line x1="19.07" y1="4.93" x2="17.66" y2="6.34" stroke="#FDB813" strokeWidth="1.5" />
    </svg>
)

// Maan SVG component
const MoonIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
    </svg>
)

export default DarkModeToggle