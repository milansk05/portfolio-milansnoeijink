// Een eenvoudige Achievement Manager om achievements te beheren en bij te houden
import { type Achievement } from "./AchievementsModal";

class AchievementManager {
    private static instance: AchievementManager;
    private achievements: Record<string, Achievement> = {};
    private listeners: Array<(id: string, achievement: Achievement) => void> = [];

    private constructor() {
        // Private constructor voor singleton patroon
        this.loadAchievements();
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

    // Sla achievements op in localStorage
    private saveAchievements(): void {
        if (typeof window === 'undefined') return;

        try {
            localStorage.setItem('achievements', JSON.stringify(this.achievements));
        } catch (error) {
            console.error('Fout bij het opslaan van achievements:', error);
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
        // Als de achievement al bestaat, behoud dan de unlock status
        if (this.achievements[achievement.id]) {
            achievement.unlocked = this.achievements[achievement.id].unlocked;
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