"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Achievement from './Achievement'

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
    const [showAchievement, setShowAchievement] = useState(false)

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

                // Toon achievement en easter egg tegelijkertijd
                setShowAchievement(true)
                setShowEasterEgg(true)

                // Speel beide geluiden na elkaar af
                playCombinedSounds();

                // Verberg de Easter egg na 8 seconden
                setTimeout(() => {
                    setShowEasterEgg(false)
                    setShowAchievement(false)

                    // Reset na een seconde om opnieuw te kunnen triggeren
                    setTimeout(() => {
                        setKonamiTriggered(false)
                    }, 1000)
                }, 8000) // 8 seconden
            }
        }

        // Event listener toevoegen
        window.addEventListener('keydown', handleKeyDown)

        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [keysPressed, konamiTriggered])

    // Functie om beide geluiden samen af te spelen
    const playCombinedSounds = () => {
        try {
            // Eerst het achievement geluid
            const achievementSound = new Audio('/sounds/achievement.mp3')
            achievementSound.volume = 0.5

            // Dan het meow geluid na een korte vertraging
            achievementSound.onended = () => {
                setTimeout(() => {
                    const meowSound = new Audio('/sounds/meow.mp3')
                    meowSound.volume = 0.5
                    meowSound.play().catch(err => console.log('Meow geluid afspelen mislukt:', err))
                }, 300) // korte pauze tussen de geluiden
            }

            // Start met het eerste geluid
            achievementSound.play().catch(err => {
                console.log('Achievement geluid afspelen mislukt:', err)

                // Als achievement geluid mislukt, probeer direct het meow geluid
                const meowSound = new Audio('/sounds/meow.mp3')
                meowSound.volume = 0.7
                meowSound.play().catch(err => console.log('Meow geluid afspelen mislukt:', err))
            })
        } catch (error) {
            console.log('Geluid afspelen mislukt', error)
        }
    }

    return (
        <>
            <AnimatePresence>
                {showEasterEgg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 flex items-center justify-center z-40 bg-black/80"
                        onClick={() => {
                            setShowEasterEgg(false)
                            setShowAchievement(false)
                        }}
                    >
                        <motion.div
                            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md text-center"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ type: "spring", bounce: 0.4, delay: 0.2 }}
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
                                Dit is mijn kat! De geheime bewaker van deze website.
                            </p>

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

            {/* Minecraft Achievement - op een hogere z-index zodat het bovenop de easter egg achtergrond komt */}
            {showEasterEgg && (
                <Achievement
                    title="Kat Ontdekker"
                    description="Je hebt de geheime kat gevonden!"
                    icon="😸"
                    show={showAchievement}
                    onClose={() => setShowAchievement(false)}
                />
            )}
        </>
    )
}

export default EasterEgg