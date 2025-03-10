"use client"

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)

        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 bg-blue-600 dark:bg-blue-800 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                    aria-label="Terug naar boven"
                >
                    <ArrowUp size={24} />
                </button>
            )}
        </>
    )
}

export default BackToTop