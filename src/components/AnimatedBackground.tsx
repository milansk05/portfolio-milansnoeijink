"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useDarkMode } from './DarkModeContext'

const AnimatedBackground = () => {
    const { darkMode } = useDarkMode()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
            {darkMode ? (
                // Nachthemel elementen voor donkere modus
                <>
                    {/* Twinkelende sterren */}
                    {Array.from({ length: 50 }).map((_, i) => (
                        <motion.div
                            key={`star-${i}`}
                            className="absolute rounded-full bg-white"
                            style={{
                                width: Math.random() * 3 + 1 + 'px',
                                height: Math.random() * 3 + 1 + 'px',
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                opacity: Math.random() * 0.5 + 0.3
                            }}
                            animate={{
                                opacity: [0.4, 0.8, 0.4],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                            }}
                        />
                    ))}

                    {/* Incidentele vallende sterren */}
                    {Array.from({ length: 3 }).map((_, i) => (
                        <motion.div
                            key={`shooting-star-${i}`}
                            className="absolute bg-gradient-to-r from-transparent to-white h-px"
                            style={{
                                width: '100px',
                                left: `${Math.random() * 80 + 10}%`,
                                top: `${Math.random() * 50}%`,
                                opacity: 0,
                                rotate: `${Math.random() * 20 - 10}deg`
                            }}
                            animate={{
                                opacity: [0, 1, 0],
                                left: [null, `-10%`],
                                top: [null, `${Math.random() * 50 + 5}%`],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                repeatDelay: Math.random() * 20 + 10,
                            }}
                        />
                    ))}

                    {/* Subtiele donkerblauwe gradiënt voor nachtlucht effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 to-transparent pointer-events-none" />
                </>
            ) : (
                // Light mode effects
                <>
                    {/* Subtiele zonnestralen in de hoeken */}
                    <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-radial from-yellow-200/30 to-transparent rounded-full pointer-events-none" />

                    {/* Zwevende deeltjes */}
                    {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                            key={`particle-${i}`}
                            className="absolute rounded-full bg-blue-300/20"
                            style={{
                                width: Math.random() * 8 + 4 + 'px',
                                height: Math.random() * 8 + 4 + 'px',
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                x: [0, Math.random() * 20 - 10, 0],
                                opacity: [0.1, 0.3, 0.1],
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                            }}
                        />
                    ))}

                    {/* Zeer subtiele lichte gradiënt */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-50/10 to-transparent pointer-events-none" />
                </>
            )}
        </div>
    )
}

export default AnimatedBackground