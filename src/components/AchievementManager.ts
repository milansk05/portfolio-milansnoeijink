// Een geavanceerde Achievement Manager om achievements te beheren en bij te houden
import { type Achievement } from "./AchievementsModal";

class AchievementManager {
    private static instance: AchievementManager;
    private achievements: Record<string, Achievement> = {};
    private listeners: Array<(id: string, achievement: Achievement) => void> = [];
    private seenQuotes: Set<string> = new Set();
    private highestGameScore: number = 0;

    private constructor() {
        // Private constructor voor singleton patroon
        this.loadAchievements();
        this.loadSeenQuotes();
        this.loadGameScore();
    }

    public static getInstance(): AchievementManager {
        if (!AchievementManager.instance) {
            AchievementManager.instance = new AchievementManager();
        }
        return AchievementManager.instance;
    }

    // Laad bestaande achievements uit localStorage
    private loadAchievements(): void {
        if (typeof window === 'undefined') return;

        try {
            const savedAchievements = localStorage.getItem('achievements');
            if (savedAchievements) {
                const parsed = JSON.parse(savedAchievements);
                Object.keys(parsed).forEach((id) => {
                    this.achievements[id] = parsed[id];
                });
            }
        } catch (error) {
            console.error('Fout bij het laden van achievements:', error);
        }
    }

    // Laad geziene quotes uit localStorage
    private loadSeenQuotes(): void {
        if (typeof window === 'undefined') return;

        try {
            const savedQuotes = localStorage.getItem('seenQuotes');
            if (savedQuotes) {
                const parsed = JSON.parse(savedQuotes);
                this.seenQuotes = new Set(parsed);

                // Update de voortgang van de quote-collector achievement
                if (this.achievements['quote-collector']) {
                    this.achievements['quote-collector'].progress = {
                        ...this.achievements['quote-collector'].progress,
                        current: this.seenQuotes.size,
                        // Ensure total is set if progress exists
                        total: this.achievements['quote-collector'].progress?.total || 10
                    };

                    // Check of alle quotes zijn gezien
                    if (this.seenQuotes.size >= 10) {
                        this.achievements['quote-collector'].unlocked = true;
                    }

                    this.saveAchievements();
                }
            }
        } catch (error) {
            console.error('Fout bij het laden van geziene quotes:', error);
        }
    }

    // Laad hoogste gamescore uit localStorage
    private loadGameScore(): void {
        if (typeof window === 'undefined') return;

        try {
            const savedScore = localStorage.getItem('404GameHighScore');
            if (savedScore) {
                this.highestGameScore = parseInt(savedScore);

                // Update de voortgang van de game-master achievement
                if (this.achievements['game-master']) {
                    this.achievements['game-master'].progress = {
                        ...this.achievements['game-master'].progress,
                        current: Math.min(this.highestGameScore, 100),
                        // Ensure total is set if progress exists
                        total: this.achievements['game-master'].progress?.total || 100
                    };

                    // Check of de score van 100 is behaald
                    if (this.highestGameScore >= 100) {
                        this.achievements['game-master'].unlocked = true;
                    }

                    this.saveAchievements();
                }
            }
        } catch (error) {
            console.error('Fout bij het laden van game score:', error);
        }
    }

    // Sla achievements op in localStorage
    private saveAchievements(): void {
        if (typeof window === 'undefined') return;

        try {
            localStorage.setItem('achievements', JSON.stringify(this.achievements));
        } catch (error) {
            console.error('Fout bij het opslaan van achievements:', error);
        }
    }

    // Sla geziene quotes op in localStorage
    private saveSeenQuotes(): void {
        if (typeof window === 'undefined') return;

        try {
            localStorage.setItem('seenQuotes', JSON.stringify([...this.seenQuotes]));
        } catch (error) {
            console.error('Fout bij het opslaan van geziene quotes:', error);
        }
    }

    // Haal alle achievements op
    public getAchievements(): Achievement[] {
        return Object.values(this.achievements);
    }

    // Controleer of een achievement is ontgrendeld
    public isUnlocked(id: string): boolean {
        return !!this.achievements[id]?.unlocked;
    }

    // Registreer een nieuwe achievement
    public registerAchievement(achievement: Achievement): void {
        // Als de achievement al bestaat, behoud dan de unlock status en progress
        if (this.achievements[achievement.id]) {
            achievement.unlocked = this.achievements[achievement.id].unlocked;

            // Behoud voortgang voor progressieve achievements
            if (achievement.progress && this.achievements[achievement.id].progress) {
                achievement.progress.current = this.achievements[achievement.id].progress?.current ?? 0;
            }
        }

        this.achievements[achievement.id] = achievement;
        this.saveAchievements();
    }

    // Ontgrendel een achievement
    public unlockAchievement(id: string): boolean {
        if (!this.achievements[id]) {
            console.warn(`Achievement ${id} bestaat niet`);
            return false;
        }

        if (this.achievements[id].unlocked) {
            return false; // Al ontgrendeld
        }

        this.achievements[id].unlocked = true;
        this.saveAchievements();

        // Notify listeners
        this.listeners.forEach(listener => {
            listener(id, this.achievements[id]);
        });

        return true;
    }

    // Update de game score en de bijbehorende achievement voortgang
    public updateGameScore(score: number): boolean {
        if (score <= this.highestGameScore) {
            return false; // Geen nieuwe highscore
        }

        // Update hoogste score
        this.highestGameScore = score;

        // Update de voortgang van de game-master achievement
        if (this.achievements['game-master']) {
            // Update progress
            if (this.achievements['game-master'].progress) {
                this.achievements['game-master'].progress.current = Math.min(score, 100);
            } else {
                this.achievements['game-master'].progress = {
                    current: Math.min(score, 100),
                    total: 100
                };
            }

            // Sla de bijgewerkte achievements op
            this.saveAchievements();

            // Notify listeners van de progress update
            this.listeners.forEach(listener => {
                listener('game-master', this.achievements['game-master']);
            });

            // Check of de score van 100 is behaald
            if (score >= 100) {
                return this.unlockAchievement('game-master');
            }
        }

        return false; // Achievement is nog niet unlocked
    }

    // Registreer een geziene quote en update de voortgang
    public addSeenQuote(quoteText: string): boolean {
        // Als de quote al gezien is, doe niets
        if (this.seenQuotes.has(quoteText)) {
            return false;
        }

        // Voeg de quote toe aan de geziene quotes
        this.seenQuotes.add(quoteText);
        this.saveSeenQuotes();

        // Update de voortgang van de quote-collector achievement
        if (this.achievements['quote-collector']) {
            // Update progress
            if (this.achievements['quote-collector'].progress) {
                this.achievements['quote-collector'].progress.current = this.seenQuotes.size;
            } else {
                this.achievements['quote-collector'].progress = {
                    current: this.seenQuotes.size,
                    total: 10
                };
            }

            // Sla de bijgewerkte achievements op
            this.saveAchievements();

            // Notify listeners van de progress update
            this.listeners.forEach(listener => {
                listener('quote-collector', this.achievements['quote-collector']);
            });

            // Check of alle quotes zijn gezien
            if (this.seenQuotes.size >= 10) {
                return this.unlockAchievement('quote-collector');
            }
        }

        return false; // Achievement is nog niet unlocked
    }

    // Check hoeveel quotes al gezien zijn
    public getSeenQuotesCount(): number {
        return this.seenQuotes.size;
    }

    // Krijg de hoogste gamescore
    public getHighestGameScore(): number {
        return this.highestGameScore;
    }

    // Voeg een listener toe voor achievement unlocks
    public addListener(callback: (id: string, achievement: Achievement) => void): void {
        this.listeners.push(callback);
    }

    // Verwijder een listener
    public removeListener(callback: (id: string, achievement: Achievement) => void): void {
        this.listeners = this.listeners.filter(listener => listener !== callback);
    }
}

export default AchievementManager.getInstance();