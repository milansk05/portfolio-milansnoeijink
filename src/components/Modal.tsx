import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Maximize2, Minimize2 } from "lucide-react"
import Image from "next/image"
import type React from "react"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
    image?: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, image }) => {
    const [isMounted, setIsMounted] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        // Afhandeling van scrollen
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }

        // Afhandeling van escape toets
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }

        window.addEventListener('keydown', handleEsc)
        return () => {
            document.body.style.overflow = "unset"
            window.removeEventListener('keydown', handleEsc)
        }
    }, [isOpen, onClose])

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen)
    }

    if (!isMounted) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Achtergrond overlay met blur effect */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Modal container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 300
                        }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <motion.div
                            layout
                            className={`bg-card text-card-foreground rounded-lg shadow-2xl overflow-hidden w-full
                                ${isFullscreen
                                    ? "fixed inset-4 max-w-none max-h-none"
                                    : "max-w-2xl md:max-w-3xl max-h-[90vh]"
                                }
                                flex flex-col`}
                        >
                            {/* Header met titel en sluitknoppen */}
                            <div className="flex justify-between items-center p-4 md:p-6 border-b border-border bg-gradient-to-r from-card to-secondary/30">
                                <div className="flex items-center space-x-3">
                                    <div className="h-8 w-8 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
                                        {image ? (
                                            <Image
                                                src="/favicon.ico"
                                                alt="Favicon"
                                                width={32}
                                                height={32}
                                                className="object-cover"
                                            />
                                        ) : (
                                            <Image
                                                src="/favicon.ico"
                                                alt="Favicon"
                                                width={24}
                                                height={24}
                                            />
                                        )}
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold truncate">{title}</h2>
                                </div>

                                <div className="flex items-center space-x-2">
                                    {/* Volledig scherm schakelknop - Verborgen op mobiel */}
                                    <button
                                        onClick={toggleFullscreen}
                                        className="hidden md:flex text-muted-foreground hover:text-foreground transition-colors h-8 w-8 rounded-full items-center justify-center hover:bg-secondary"
                                        aria-label={isFullscreen ? "Minimize" : "Maximize"}
                                    >
                                        {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                                    </button>

                                    {/* Sluitknop */}
                                    <button
                                        onClick={onClose}
                                        className="text-muted-foreground hover:text-foreground transition-colors h-8 w-8 rounded-full flex items-center justify-center hover:bg-secondary"
                                        aria-label="Sluiten"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Inhoudsgebied met scrolling */}
                            <div className="flex-grow overflow-y-auto p-4 md:p-6 scrollbar-thin">
                                {children}
                            </div>

                            {/* Footer met actieknoppen - Verborgen op mobiel */}
                            <div className="hidden md:flex p-4 md:p-6 border-t border-border justify-between items-center">
                                <div className="text-xs text-muted-foreground">
                                    <kbd className="px-2 py-1 rounded bg-muted text-muted-foreground border border-border">ESC</kbd>
                                    <span className="ml-1">om te sluiten</span>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={toggleFullscreen}
                                        className="px-4 py-2 rounded-md bg-secondary/70 text-secondary-foreground hover:bg-secondary transition-colors"
                                    >
                                        {isFullscreen ? "Verkleinen" : "Volledig scherm"}
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                                    >
                                        Sluiten
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default Modal