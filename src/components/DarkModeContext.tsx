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
    const [darkMode, setDarkMode] = useState(false)
    const [isTransitioning, setIsTransitioning] = useState(false)

    useEffect(() => {
        const isDarkMode = localStorage.getItem("darkMode") === "true"
        setDarkMode(isDarkMode)
        document.documentElement.classList.toggle("dark", isDarkMode)
    }, [])

    const toggleDarkMode = () => {
        setIsTransitioning(true)
        const newDarkMode = !darkMode
        setDarkMode(newDarkMode)
        localStorage.setItem("darkMode", newDarkMode.toString())
        document.documentElement.classList.toggle("dark", newDarkMode)

        // Reset transition state after animation completes
        setTimeout(() => {
            setIsTransitioning(false)
        }, 1000)
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