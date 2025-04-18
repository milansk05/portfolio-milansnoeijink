"use client"

import { useState, useEffect } from "react"
import Modal from "./Modal"
import { motion } from "framer-motion"
import { Trophy, Lock } from "lucide-react"
import achievementManager from "./AchievementManager"

export interface Achievement {
    id: string
    title: string
    description: string
    icon: string
    unlocked: boolean
    progress?: {
        current: number
        total: number
    }
}

// Lijst van beschikbare achievements
const defaultAchievements: Achievement[] = [
    {
        id: "easter-egg",
        title: "Favourite vierpoot!",
        description: "Je hebt de geheime kat gevonden!",
        icon: "😸",
        unlocked: false,
    },
    {
        id: "page-not-found",
        title: "Hoe zijn we hier terechtgekomen?",
        description: "Vind de verborgen 404 pagina!",
        icon: "🧭",
        unlocked: false,
    },
    {
        id: "game-master",
        title: "Game Master",
        description: "Scoor 100 punten in de 404 minigame!",
        icon: "🎮",
        unlocked: false,
        progress: {
            current: 0,
            total: 100
        }
    },
    {
        id: "quote-collector",
        title: "Quote Verzamelaar",
        description: "Ontdek alle 404 quotes!",
        icon: "📜",
        unlocked: false,
        progress: {
            current: 0,
            total: 10
        }
    }
]

interface AchievementsModalProps {
    isOpen: boolean
    onClose: () => void
}

const AchievementsModal = ({ isOpen, onClose }: AchievementsModalProps) => {
    const [achievements, setAchievements] = useState<Achievement[]>([])
    const [mounted, setMounted] = useState(false)

    // Registreer de default achievements en haal de huidige status op
    useEffect(() => {
        setMounted(true)

        // Registreer alle beschikbare achievements
        defaultAchievements.forEach(achievement => {
            achievementManager.registerAchievement(achievement);
        });

        // Haal de huidige lijst op met status
        setAchievements(achievementManager.getAchievements());

        // Luister naar achievement updates
        const handleAchievementUnlock = () => {
            setAchievements(achievementManager.getAchievements());
        };

        achievementManager.addListener(handleAchievementUnlock);

        return () => {
            achievementManager.removeListener(handleAchievementUnlock);
        };
    }, []);

    if (!mounted) return null

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Achievements"
            image="/favicon.ico"
        >
            <div className="space-y-6">
                <div className="text-center mb-6">
                    <p className="text-muted-foreground">
                        Ontdek verborgen achievements door de website te verkennen!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                        <motion.div
                            key={achievement.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 rounded-lg border ${achievement.unlocked
                                ? "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800"
                                : "bg-card border-border"
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${achievement.unlocked
                                        ? "bg-amber-100 dark:bg-amber-900/30"
                                        : "bg-muted"
                                        }`}
                                >
                                    {achievement.unlocked ? (
                                        achievement.icon
                                    ) : (
                                        <Lock className="h-5 w-5 text-muted-foreground" />
                                    )}
                                </div>

                                <div className="flex-grow">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-lg text-accent-foreground">
                                            {achievement.title}
                                        </h3>
                                        {achievement.unlocked ? (
                                            <Trophy className="h-5 w-5 text-amber-500" />
                                        ) : (
                                            <Lock className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </div>

                                    <p className="text-accent-foreground/80 text-sm mt-1">
                                        {achievement.unlocked
                                            ? achievement.description
                                            : "????? (Nog niet ontgrendeld)"}
                                    </p>

                                    {/* Progress bar for achievements with progress - visible even when locked */}
                                    {achievement.progress && (achievement.id === "quote-collector" || achievement.id === "game-master") && (
                                        <div className="mt-2">
                                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                                <span>Voortgang:</span>
                                                <span>{achievement.progress.current} / {achievement.progress.total}</span>
                                            </div>
                                            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                                                    style={{ width: `${(achievement.progress.current / achievement.progress.total) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 p-4 rounded-lg bg-secondary/50 text-accent-foreground/80">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-amber-500" />
                        Voortgang: {achievements.filter(a => a.unlocked).length} / {achievements.length} ontgrendeld
                    </h4>
                    <p className="text-sm">
                        Er zijn meerdere achievements te ontgrendelen. Verken de website om ze
                        allemaal te vinden. Sommige achievements vereisen speciale acties of
                        het vinden van verborgen functies.
                    </p>
                </div>
            </div>
        </Modal>
    )
}

export default AchievementsModal