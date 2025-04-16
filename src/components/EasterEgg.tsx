"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// De Konami Code sequentie: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
]

const EasterEgg = () => {
    const [keysPressed, setKeysPressed] = useState<string[]>([])
    const [showEasterEgg, setShowEasterEgg] = useState(false)
    const [konamiTriggered, setKonamiTriggered] = useState(false)

    useEffect(() => {
        // Functie om toetsaanslagen te verwerken
        const handleKeyDown = (e: KeyboardEvent) => {
            // We gebruiken de code eigenschap voor consistentie
            const newKeysPressed = [...keysPressed, e.code]

            // Houd alleen de laatste 10 toetsen bij
            if (newKeysPressed.length > 10) {
                newKeysPressed.shift()
            }

            setKeysPressed(newKeysPressed)

            // Controleer of de Konami code is ingevoerd
            const isKonamiCode = newKeysPressed.length === 10 &&
                newKeysPressed.every((key, index) => key === KONAMI_CODE[index])

            if (isKonamiCode && !konamiTriggered) {
                setKonamiTriggered(true)
                setShowEasterEgg(true)

                // Speel een geluid af (optioneel)
                const audio = new Audio('/sounds/meow.mp3')
                audio.volume = 0.5
                audio.play().catch(() => {
                    // Negeer fouten als de browser audio afspelen blokkeert
                    console.log('Autoplay geblokkeerd of audio niet gevonden')
                })

                // Verberg de Easter egg na 5 seconden
                setTimeout(() => {
                    setShowEasterEgg(false)

                    // Reset na een seconde om opnieuw te kunnen triggeren
                    setTimeout(() => {
                        setKonamiTriggered(false)
                    }, 1000)
                }, 5000)
            }
        }

        // Event listener toevoegen
        window.addEventListener('keydown', handleKeyDown)

        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [keysPressed, konamiTriggered])

    return (
        <>
            <AnimatePresence>
                {showEasterEgg && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 flex items-center justify-center z-50 bg-black/80"
                        onClick={() => setShowEasterEgg(false)}
                    >
                        <motion.div
                            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md text-center"
                            initial={{ y: 50 }}
                            animate={{ y: 0 }}
                            transition={{ type: "spring", bounce: 0.4 }}
                        >
                            <div className="relative w-64 h-64 mx-auto mb-4 overflow-hidden rounded-lg">
                                <Image
                                    src="/images/cat.jpg"
                                    alt="Mijn kat"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    priority
                                />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Miauw! Je hebt me gevonden!</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Ik ben Milan&apos;s kat. Ik heb me verstopt in deze website 🐈
                            </p>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setShowEasterEgg(false)
                                }}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                            >
                                Terug naar de website
                            </button>

                            <motion.div
                                className="absolute top-2 right-2"
                                initial={{ rotate: 0 }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                                <span role="img" aria-label="sparkles" className="text-xl">✨</span>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default EasterEgg