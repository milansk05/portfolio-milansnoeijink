// The issue is in the handleBlockClick function
// The problem is that when you call setScore with a function, TypeScript doesn't know what type the prevScore parameter should be
// Let's fix this by properly typing the setScore prop in the GameArea component

"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, Search, Award, Gamepad2, RotateCcw } from "lucide-react"
import ThemeTransitionWrapper from "@/components/ThemeTransitionWrapper"
import Achievement from "@/components/Achievement"
import achievementManager from "@/components/AchievementManager"

// Lijst met alle mogelijke error quotes
const ERROR_QUOTES = [
    "Houston, we have a problem.",
    "Deze pagina is naar de digitale hemel.",
    "Oeps, we kunnen niet vinden wat je zoekt!",
    "Deze pagina heeft vakantie genomen.",
    "404: Pagina niet gevonden, maar je hebt wel mij gevonden!",
    "Deze pagina is verdwaald in de digitale woestijn.",
    "Hmmm, hier is niets te zien.",
    "Deze link is gebroken, net als mijn beloftes om minder koffie te drinken.",
    "Technisch gezien ben je verdwaald.",
    "Deze pagina bestaat alleen in een parallel universum.",
];

export default function NotFound() {
    const [mounted, setMounted] = useState(false)
    const [showGame, setShowGame] = useState(false)
    const [gameScore, setGameScore] = useState(0)
    const [gameHighScore, setGameHighScore] = useState(0)
    const [gameTime, setGameTime] = useState(30)
    const [gameActive, setGameActive] = useState(false)
    const [showAchievement, setShowAchievement] = useState(false)
    const [currentAchievementType, setCurrentAchievementType] = useState<string>("page-not-found")

    // Refs voor geavanceerde timer implementatie
    const startTimeRef = useRef<number | null>(null)
    const frameIdRef = useRef<number | null>(null)
    const achievementUnlocked = useRef(false)

    // Store the random quote in a ref so it doesn't change on re-renders
    const errorQuoteRef = useRef<string>("")

    useEffect(() => {
        setMounted(true)

        // Choose a random quote only once when the component mounts
        const randomIndex = Math.floor(Math.random() * ERROR_QUOTES.length);
        const selectedQuote = ERROR_QUOTES[randomIndex];
        errorQuoteRef.current = selectedQuote;

        // Registreer dat we deze quote hebben gezien
        const wasNewQuote = achievementManager.addSeenQuote(selectedQuote);

        // Haal highscore op uit localStorage als die bestaat
        const savedHighScore = localStorage.getItem('404GameHighScore')
        if (savedHighScore) {
            setGameHighScore(parseInt(savedHighScore))
        }

        // Unlock de 404 achievement als deze nog niet was ontgrendeld
        if (!achievementUnlocked.current) {
            const wasPageNotFoundUnlocked = achievementManager.unlockAchievement("page-not-found");
            achievementUnlocked.current = true;

            // Toon achievement notificatie - eerst voor nieuwe quote achievement als die ontgrendeld is
            if (wasNewQuote) {
                setCurrentAchievementType("quote-collector");
                displayAchievement("quote-collector");

                // Dan na vertraging voor de page-not-found achievement als die ook nieuw is
                if (wasPageNotFoundUnlocked) {
                    setTimeout(() => {
                        setCurrentAchievementType("page-not-found");
                        displayAchievement("page-not-found");
                    }, 7000); // Toon na 7 seconden (als de eerste achievement notificatie voorbij is)
                }
            }
            // Anders toon gewoon de page-not-found achievement indien nieuw
            else if (wasPageNotFoundUnlocked) {
                setCurrentAchievementType("page-not-found");
                displayAchievement("page-not-found");
            }
        }

        // Cleanup bij unmount
        return () => {
            if (frameIdRef.current !== null) {
                cancelAnimationFrame(frameIdRef.current);
                frameIdRef.current = null;
            }
        };
    }, [])

    // Functie om een achievement notification te tonen
    const displayAchievement = (achievementType: string) => {
        // Maak het geluidsobject alvast aan
        const achievementSound = new Audio('/sounds/achievement.mp3');
        achievementSound.volume = 0.5;
        achievementSound.preload = 'auto';

        // Toon achievement na een korte vertraging
        const timer = setTimeout(() => {
            setCurrentAchievementType(achievementType); // Set the current achievement type
            setShowAchievement(true);

            // Probeer het geluid af te spelen - dit zal waarschijnlijk alleen werken als de gebruiker
            // al een interactie heeft gehad met de pagina
            achievementSound.play().catch(() => {
                // Als auto-play mislukt, voegen we een effecthandler toe aan de body die
                // het geluid probeert af te spelen bij de volgende gebruikersinteractie
                const playOnInteraction = () => {
                    achievementSound.play().catch(() => { });
                    document.body.removeEventListener('click', playOnInteraction);
                    document.body.removeEventListener('keydown', playOnInteraction);
                };

                document.body.addEventListener('click', playOnInteraction);
                document.body.addEventListener('keydown', playOnInteraction);

                // Schoon de event listeners op na een redelijke tijd
                setTimeout(() => {
                    document.body.removeEventListener('click', playOnInteraction);
                    document.body.removeEventListener('keydown', playOnInteraction);
                }, 10000);
            });

            // Verberg achievement na 6 seconden
            setTimeout(() => {
                setShowAchievement(false);
            }, 6000);
        }, 800);

        return timer;
    };

    // Verbeterde timer implementatie met requestAnimationFrame
    useEffect(() => {
        const handleGameTimer = () => {
            if (gameActive && startTimeRef.current !== null) {
                // Bereken verlopen tijd sinds start
                const elapsedTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
                const newTimeRemaining = Math.max(0, 30 - elapsedTime);

                // Update timer state wanneer het verandert
                if (newTimeRemaining !== gameTime) {
                    setGameTime(newTimeRemaining);
                }

                // Game over check
                if (newTimeRemaining === 0 && gameActive) {
                    setGameActive(false);

                    // Update highscore als nodig
                    if (gameScore > gameHighScore) {
                        setGameHighScore(gameScore);
                        localStorage.setItem('404GameHighScore', gameScore.toString());

                        // Update de voortgang in de achievements manager
                        const wasUnlocked = achievementManager.updateGameScore(gameScore);

                        // Als Game Master achievement is ontgrendeld, toon notificatie
                        if (wasUnlocked) {
                            setCurrentAchievementType("game-master");
                            setShowAchievement(true);

                            // Probeer het achievement geluid af te spelen
                            const achievementSound = new Audio('/sounds/achievement.mp3');
                            achievementSound.volume = 0.5;
                            achievementSound.play().catch(() => {
                                // Als auto-play mislukt, probeer bij volgende gebruikersinteractie
                                const playOnInteraction = () => {
                                    achievementSound.play().catch(() => { });
                                    document.body.removeEventListener('click', playOnInteraction);
                                    document.body.removeEventListener('keydown', playOnInteraction);
                                };

                                document.body.addEventListener('click', playOnInteraction);
                                document.body.addEventListener('keydown', playOnInteraction);

                                // Schoon event listeners op na een tijd
                                setTimeout(() => {
                                    document.body.removeEventListener('click', playOnInteraction);
                                    document.body.removeEventListener('keydown', playOnInteraction);
                                }, 10000);
                            });

                            // Verberg achievement na 6 seconden
                            setTimeout(() => {
                                setShowAchievement(false);
                            }, 6000);
                        }
                    } else {
                        // Zelfs als er geen nieuwe highscore is, nog steeds de voortgang bijwerken
                        // (dit logt de hoogste score, zelfs als het niet de huidige is)
                        achievementManager.updateGameScore(gameHighScore);
                    }

                    return;
                }

                // Schedule next frame
                frameIdRef.current = requestAnimationFrame(handleGameTimer);
            }
        };

        if (gameActive) {
            // Start timer als het spel actief wordt
            if (startTimeRef.current === null) {
                startTimeRef.current = Date.now();
            }

            frameIdRef.current = requestAnimationFrame(handleGameTimer);
        } else {
            // Cleanup als spel stopt
            if (frameIdRef.current !== null) {
                cancelAnimationFrame(frameIdRef.current);
                frameIdRef.current = null;
            }
        }

        // Cleanup effect
        return () => {
            if (frameIdRef.current !== null) {
                cancelAnimationFrame(frameIdRef.current);
                frameIdRef.current = null;
            }
        };
    }, [gameActive, gameScore, gameHighScore, gameTime]);

    const startGame = () => {
        setGameScore(0)
        setGameTime(30)
        startTimeRef.current = Date.now() // Reset starttijd
        setGameActive(true)
    }

    const resetGame = () => {
        setGameActive(false)
        setGameScore(0)
        setGameTime(30)
        startTimeRef.current = null // Reset starttijd
        // Stop animatieframe als die actief is
        if (frameIdRef.current !== null) {
            cancelAnimationFrame(frameIdRef.current)
            frameIdRef.current = null
        }
    }

    if (!mounted) return null

    return (
        <ThemeTransitionWrapper>
            <main className="container mx-auto px-4 flex flex-col min-h-[80vh] items-center justify-center pt-32 pb-10">
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-6"
                    >
                        <div className="relative inline-block">
                            <motion.div
                                initial={{ opacity: 1 }}
                                animate={{ opacity: [1, 0.5, 1] }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}
                                className="absolute -inset-20 bg-gradient-radial from-primary/20 to-transparent blur-2xl rounded-full"
                            />
                            <h1 className="text-[10rem] font-extrabold tracking-tighter leading-none">
                                <span className="text-primary">4</span>
                                <motion.span
                                    animate={{
                                        rotate: [0, 5, 0, -5, 0],
                                        scale: [1, 1.1, 1, 1.1, 1]
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }}
                                    className="inline-block"
                                >
                                    0
                                </motion.span>
                                <span className="text-primary">4</span>
                            </h1>
                        </div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-xl md:text-2xl font-bold mb-4 text-foreground"
                    >
                        {errorQuoteRef.current}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-muted-foreground mb-8"
                    >
                        De pagina die je zoekt bestaat niet of is verplaatst. Geen zorgen, je kunt terugkeren naar de homepagina
                        of proberen iets anders te vinden.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="flex flex-wrap gap-4 justify-center"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 shadow-md shadow-primary/20 transition-all"
                        >
                            <Home size={18} />
                            <span>Terug naar home</span>
                        </Link>

                        <button
                            onClick={() => setShowGame(!showGame)}
                            className="inline-flex items-center gap-2 bg-primary/20 text-primary px-6 py-3 rounded-full hover:bg-primary/30 transition-all"
                        >
                            <Gamepad2 size={18} />
                            <span>{showGame ? "Verberg minigame" : "Speel een minigame"}</span>
                        </button>
                    </motion.div>
                </div>

                {/* Mini-game sectie */}
                {showGame && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 w-full max-w-lg"
                    >
                        <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
                            <div className="text-center mb-4">
                                <h3 className="text-xl font-bold text-accent-foreground">
                                    {gameActive ? "Vang de 404 blokjes!" : "404 Blokjes Vangen"}
                                </h3>
                                <p className="text-muted-foreground mt-1">
                                    {gameActive
                                        ? "Klik zo snel mogelijk op de blokjes!"
                                        : "Start het spel en vang zoveel mogelijk 404 blokjes in 30 seconden."}
                                </p>
                                {!gameActive && (
                                    <p className="text-xs text-muted-foreground mt-2">
                                        <span className="font-bold text-primary">4</span> = 4 punten |
                                        <span className="font-bold text-primary ml-1">0</span> = 0 punten
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
                                    <span className="text-primary font-bold">{gameScore}</span>
                                    <span className="text-xs text-muted-foreground">Score</span>
                                </div>

                                <div className="flex items-center gap-2 bg-secondary/80 px-4 py-2 rounded-lg">
                                    <span className="font-mono font-bold">{gameTime}</span>
                                    <span className="text-xs text-muted-foreground">Seconden</span>
                                </div>

                                <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
                                    <Award size={16} className="text-primary" />
                                    <span className="font-bold">{gameHighScore}</span>
                                </div>
                            </div>

                            {gameActive ? (
                                <GameArea setScore={(score: number | ((prevScore: number) => number)) => setGameScore(score)} />
                            ) : (
                                <div className="bg-secondary/30 rounded-lg h-64 flex flex-col items-center justify-center">
                                    {gameTime === 30 ? (
                                        <>
                                            <Gamepad2 size={48} className="text-muted-foreground mb-4" />
                                            <p className="text-muted-foreground mb-4">Klik op start om te beginnen!</p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-center mb-4">
                                                <h3 className="text-2xl font-bold text-accent-foreground">Game Over!</h3>
                                                <p className="text-primary text-xl font-bold">Score: {gameScore}</p>
                                                {gameScore >= gameHighScore && gameScore > 0 && (
                                                    <p className="text-green-500 font-medium mt-2">Nieuwe highscore!</p>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}

                            <div className="mt-4 flex justify-center gap-4">
                                {!gameActive && (
                                    <button
                                        onClick={startGame}
                                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 transition-all"
                                    >
                                        {gameTime < 30 ? "Opnieuw spelen" : "Start spel"}
                                    </button>
                                )}

                                {gameActive && (
                                    <button
                                        onClick={resetGame}
                                        className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-full hover:bg-secondary/80 transition-all"
                                    >
                                        <RotateCcw size={18} />
                                        <span>Reset</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Decoratieve elementen */}
                <div className="mt-16 relative w-full max-w-3xl">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link
                            href="/#portfolio"
                            className="flex flex-col items-center p-6 rounded-lg bg-card shadow-md hover:shadow-lg transition-shadow border border-border hover:border-primary/20"
                        >
                            <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                                <Search size={24} className="text-primary" />
                            </div>
                            <h3 className="font-semibold text-accent-foreground mb-2">Bekijk mijn portfolio</h3>
                            <p className="text-center text-sm text-muted-foreground">
                                Ontdek de projecten waar ik aan gewerkt heb
                            </p>
                        </Link>

                        <Link
                            href="/#certificaten"
                            className="flex flex-col items-center p-6 rounded-lg bg-card shadow-md hover:shadow-lg transition-shadow border border-border hover:border-primary/20"
                        >
                            <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
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
                                    className="text-primary"
                                >
                                    <path d="M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z" />
                                    <path d="M8 12h8" />
                                    <path d="M12 16V8" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-accent-foreground mb-2">Certificaten</h3>
                            <p className="text-center text-sm text-muted-foreground">
                                Bekijk mijn certificaten en diploma&apos;s
                            </p>
                        </Link>

                        <Link
                            href="/#contact"
                            className="flex flex-col items-center p-6 rounded-lg bg-card shadow-md hover:shadow-lg transition-shadow border border-border hover:border-primary/20"
                        >
                            <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
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
                                    className="text-primary"
                                >
                                    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                                    <path d="M12 4v16" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-accent-foreground mb-2">Contact opnemen</h3>
                            <p className="text-center text-sm text-muted-foreground">
                                Heb je een vraag of wil je samenwerken?
                            </p>
                        </Link>
                    </div>
                </div>
            </main>

            {/* Achievement Notification - dynamisch op basis van type */}
            {currentAchievementType === "game-master" ? (
                <Achievement
                    title="Game Master"
                    description="Scoor 100 punten in de 404 minigame!"
                    icon="🎮"
                    show={showAchievement}
                    onClose={() => setShowAchievement(false)}
                />
            ) : currentAchievementType === "quote-collector" ? (
                <Achievement
                    title="Quote Verzamelaar"
                    description={`Ontdek alle 404 quotes! (${achievementManager.getSeenQuotesCount()}/10)`}
                    icon="📜"
                    show={showAchievement}
                    onClose={() => setShowAchievement(false)}
                />
            ) : (
                <Achievement
                    title="Hoe zijn we hier terechtgekomen?"
                    description="Vind de verborgen 404 pagina!"
                    icon="🧭"
                    show={showAchievement}
                    onClose={() => setShowAchievement(false)}
                />
            )}

        </ThemeTransitionWrapper>
    )
}

// Define the props type for GameArea
interface GameAreaProps {
    setScore: (score: number | ((prevScore: number) => number)) => void;
}

// Game Area Component geoptimaliseerd met React.memo en useCallback
const GameArea = React.memo(({ setScore }: GameAreaProps) => {
    const [blocks, setBlocks] = useState<{ id: number; x: number; y: number; size: number; value: number }[]>([])
    const gameAreaRef = useRef<HTMLDivElement>(null)
    const blockIdCounter = useRef(0)
    const blockTimersRef = useRef<Record<number, NodeJS.Timeout>>({})

    useEffect(() => {
        const addBlock = () => {
            if (gameAreaRef.current) {
                const areaWidth = gameAreaRef.current.offsetWidth
                const areaHeight = gameAreaRef.current.offsetHeight

                // Random size tussen 30 en 60px
                const size = Math.floor(Math.random() * 30) + 30

                // Random positie, rekening houdend met de grootte van het blok
                const x = Math.floor(Math.random() * (areaWidth - size))
                const y = Math.floor(Math.random() * (areaHeight - size))

                // Random waarde: 4, 0, of 4 (404)
                const value = [4, 0, 4][Math.floor(Math.random() * 3)]

                const id = blockIdCounter.current++
                const newBlock = { id, x, y, size, value }

                setBlocks(prev => [...prev, newBlock])

                // Verwijder het blok na 2 seconden
                blockTimersRef.current[id] = setTimeout(() => {
                    setBlocks(prev => prev.filter(block => block.id !== id))
                    delete blockTimersRef.current[id]
                }, 2000)
            }
        }

        // Voeg elke 0.6 seconden een nieuw blok toe
        const interval = setInterval(addBlock, 600)

        return () => {
            clearInterval(interval)
            // Schoon alle blok-timers op
            Object.values(blockTimersRef.current).forEach(timer => clearTimeout(timer))
            blockTimersRef.current = {}
        }
    }, [])

    // Gebruik useCallback om te voorkomen dat de functie bij elke render opnieuw wordt gemaakt
    const handleBlockClick = useCallback((id: number, value: number) => {
        // Verwijder het geklikte blok
        setBlocks(prev => prev.filter(block => block.id !== id))

        // Schoon de timer voor dit blok op
        if (blockTimersRef.current[id]) {
            clearTimeout(blockTimersRef.current[id])
            delete blockTimersRef.current[id]
        }

        // Voeg de waarde toe aan de score - gebruik functionele update
        setScore(prevScore => prevScore + value)
    }, [setScore])

    return (
        <div
            ref={gameAreaRef}
            className="relative bg-secondary/30 rounded-lg h-64 overflow-hidden"
        >
            {blocks.map(block => (
                <motion.div
                    key={block.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute cursor-pointer bg-gradient-to-br from-primary to-blue-700 text-white font-bold rounded-md flex items-center justify-center shadow-md hover:shadow-lg user-select-none"
                    style={{
                        left: `${block.x}px`,
                        top: `${block.y}px`,
                        width: `${block.size}px`,
                        height: `${block.size}px`,
                        fontSize: `${block.size / 2}px`
                    }}
                    onClick={() => handleBlockClick(block.id, block.value)}
                >
                    {block.value}
                </motion.div>
            ))}
        </div>
    )
})

// Add display name
GameArea.displayName = 'GameArea';