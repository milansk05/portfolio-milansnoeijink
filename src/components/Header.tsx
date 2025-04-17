"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { smoothScroll } from "@/utils/smoothScroll"
import DarkModeToggle from "./DarkModeToggle"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Home, User, Briefcase, FileText, LayoutGrid, Mail, Trophy, ChevronDown, MoreHorizontal } from "lucide-react"
import Image from "next/image"
import AchievementsModal from "./AchievementsModal"

const Header = () => {
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [showAchievements, setShowAchievements] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Effect voor scroll detectie
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [scrolled])

    // Hydration fix
    useEffect(() => {
        setMounted(true)
    }, [])

    // Handle dropdown close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    if (!mounted) return null

    return (
        <SidebarProvider>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
                    ? "py-2 bg-background shadow-md"
                    : "py-4 bg-background"
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center group">
                        <motion.div
                            className="w-10 h-10 mr-3 flex items-center justify-center"
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <Image
                                src="/favicon.ico"
                                alt="Logo"
                                width={40}
                                height={40}
                                className="w-full h-full rounded-full overflow-hidden"
                            />
                        </motion.div>
                        <h1 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-all duration-300">
                            Milan Snoeijink
                        </h1>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-1">
                        {pathname !== "/changelog" ? (
                            <>
                                <NavLink href="/" text="Home" icon={Home} />
                                <NavLink href="#overmij" text="Over mij" icon={User} />
                                <NavLink href="#expertise" text="Expertise" icon={Briefcase} />
                                <NavLink href="#certificaten" text="Certificaten" icon={FileText} />
                                <NavLink href="#portfolio" text="Portfolio" icon={LayoutGrid} />
                                <NavLink href="#contact" text="Contact" icon={Mail} />
                                
                                {/* Dropdown menu voor Overig */}
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="relative flex items-center px-3 py-2 rounded-lg text-foreground hover:text-primary transition-colors"
                                    >
                                        <MoreHorizontal className="w-4 h-4 mr-1.5" />
                                        <span>Overig</span>
                                        <ChevronDown
                                            className={`w-4 h-4 ml-1 transition-transform ${
                                                dropdownOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>
                                    
                                    <AnimatePresence>
                                        {dropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-card border border-border z-50"
                                            >
                                                <div className="py-1">
                                                    <Link 
                                                        href="/changelog"
                                                        className="flex items-center px-4 py-2 text-foreground hover:bg-secondary hover:text-primary transition-colors"
                                                        onClick={() => setDropdownOpen(false)}
                                                    >
                                                        <Code className="w-4 h-4 mr-2" />
                                                        <span>Changelog</span>
                                                    </Link>
                                                    <button
                                                        onClick={() => {
                                                            setShowAchievements(true);
                                                            setDropdownOpen(false);
                                                        }}
                                                        className="flex items-center w-full text-left px-4 py-2 text-foreground hover:bg-secondary hover:text-primary transition-colors"
                                                    >
                                                        <Trophy className="w-4 h-4 mr-2" />
                                                        <span>Achievements</span>
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </>
                        ) : (
                            <NavLink href="/" text="Terug naar Home" icon={Home} />
                        )}
                    </nav>

                    <div className="flex items-center space-x-3">
                        <DarkModeToggle />

                        <Link
                            href="#contact"
                            className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 rounded-full transition-all duration-300 hover:shadow-md"
                            onClick={(e) => smoothScroll(e, "contact")}
                        >
                            <Mail className="w-4 h-4" />
                            <span>Contact</span>
                        </Link>

                        <SidebarTrigger className="md:hidden flex items-center justify-center p-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors z-50" />

                        <AppSidebar />
                    </div>
                </div>
            </motion.header>

            {/* Achievements Modal */}
            <AchievementsModal isOpen={showAchievements} onClose={() => setShowAchievements(false)} />
        </SidebarProvider>
    )
}

interface NavLinkProps {
    href: string
    text: string
    icon: React.ComponentType<{ className?: string }>
}

const NavLink = ({ href, text, icon: Icon }: NavLinkProps) => {
    const isAnchorLink = href.startsWith('#')
    const [isHovered, setIsHovered] = useState(false)

    const linkContent = (
        <div
            className="relative flex items-center px-3 py-2 rounded-lg text-foreground hover:text-primary transition-colors"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Icon className={`w-4 h-4 mr-1.5 transition-transform duration-300 ${isHovered ? 'scale-125' : 'scale-100'}`} />
            <span>{text}</span>
            {isHovered && (
                <motion.div
                    className="absolute inset-0 bg-secondary/50 rounded-lg -z-10"
                    layoutId="navBackground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                />
            )}
        </div>
    )

    return isAnchorLink ? (
        <a
            href={href}
            onClick={(e) => smoothScroll(e, href.substring(1))}
        >
            {linkContent}
        </a>
    ) : (
        <Link href={href}>
            {linkContent}
        </Link>
    )
}

export default Header