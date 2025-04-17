"use client"

import { useEffect } from 'react'
import { useDarkMode } from './DarkModeContext'

interface ThemeTransitionWrapperProps {
    children: React.ReactNode
}

const ThemeTransitionWrapper = ({ children }: ThemeTransitionWrapperProps) => {
    const { isTransitioning, darkMode } = useDarkMode()

    useEffect(() => {
        if (isTransitioning) {
            document.body.classList.add('theme-transitioning')

            const timeoutId = setTimeout(() => {
                document.body.classList.remove('theme-transitioning')
            }, 400)

            return () => clearTimeout(timeoutId)
        }
    }, [isTransitioning])

    return (
        <div className={`${darkMode ? 'theme-dark' : 'theme-light'}`}>
            {children}
        </div>
    )
}

export default ThemeTransitionWrapper