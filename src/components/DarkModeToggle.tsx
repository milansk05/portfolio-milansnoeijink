"use client"

import { Moon, Sun } from 'lucide-react'
import { useDarkMode } from '@/components/DarkModeContext'

const DarkModeToggle = () => {
    const { darkMode, toggleDarkMode } = useDarkMode()

    return (
        <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            aria-label={darkMode ? "Schakel lichte modus in" : "Schakel donkere modus in"}
        >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    )
}

export default DarkModeToggle