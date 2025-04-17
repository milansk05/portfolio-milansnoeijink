"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"

type DarkModeContextType = {
    darkMode: boolean
    toggleDarkMode: () => void
    isTransitioning: boolean
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined)

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true)
    const [isTransitioning, setIsTransitioning] = useState(false)

    useEffect(() => {
        const savedDarkMode = localStorage.getItem("darkMode")
        const isDarkMode = savedDarkMode !== null ? savedDarkMode === "true" : true

        setDarkMode(isDarkMode)
        document.documentElement.classList.toggle("dark", isDarkMode)
    }, [])

    const toggleDarkMode = () => {
        setIsTransitioning(true)
        const newDarkMode = !darkMode
        setDarkMode(newDarkMode)
        localStorage.setItem("darkMode", newDarkMode.toString())
        document.documentElement.classList.toggle("dark", newDarkMode)

        // Reduced from 1000ms to 400ms to match the other transition timing
        setTimeout(() => {
            setIsTransitioning(false)
        }, 400)
    }

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode, isTransitioning }}>
            {children}
        </DarkModeContext.Provider>
    )
}

export const useDarkMode = () => {
    const context = useContext(DarkModeContext)
    if (context === undefined) {
        throw new Error("useDarkMode must be used within a DarkModeProvider")
    }
    return context
}