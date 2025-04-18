"use client"

import { Sidebar, SidebarContent, SidebarContext } from "@/components/ui/sidebar"
import Link from "next/link"
import { smoothScroll } from "@/utils/smoothScroll"
import { useState, useEffect, useContext } from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Trophy, MoreHorizontal, Code, ChevronDown } from "lucide-react"
import AchievementsModal from "./AchievementsModal"

export function AppSidebar() {
    const pathname = usePathname()
    const [mounted, setMounted] = useState(false)
    const sidebarContext = useContext(SidebarContext)
    const [showAchievements, setShowAchievements] = useState(false)
    const [otherMenuOpen, setOtherMenuOpen] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
        smoothScroll(e, targetId)
        // Close the sidebar when a link is clicked
        if (sidebarContext) {
            sidebarContext.close()
        }
    }

    const handleAchievementsClick = () => {
        if (sidebarContext) {
            sidebarContext.close()
        }
        setShowAchievements(true)
    }

    const toggleOtherMenu = () => {
        setOtherMenuOpen(!otherMenuOpen)
    }

    return (
        <>
            <Sidebar className="md:hidden">
                <SidebarContent>
                    <motion.ul
                        className="space-y-5 pt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                    >
                        {pathname !== "/changelog" ? (
                            <>
                                <NavItem href="/" label="Home" />
                                <NavItem href="#overmij" label="Over Mij" handleClick={handleSmoothScroll} />
                                <NavItem href="#expertise" label="Expertise" handleClick={handleSmoothScroll} />
                                <NavItem href="#certificaten" label="Certificaten" handleClick={handleSmoothScroll} />
                                <NavItem href="#portfolio" label="Portfolio" handleClick={handleSmoothScroll} />
                                <NavItem href="#contact" label="Contact" handleClick={handleSmoothScroll} />

                                {/* Overig dropdown menu */}
                                <motion.li
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <button
                                        onClick={toggleOtherMenu}
                                        className="flex items-center justify-between py-2 px-3 w-full text-left rounded-lg text-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
                                    >
                                        <div className="flex items-center">
                                            <MoreHorizontal className="mr-2 h-4 w-4" />
                                            <span>Overig</span>
                                        </div>
                                        <ChevronDown
                                            className={`h-4 w-4 ml-1 transition-transform ${otherMenuOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    {otherMenuOpen && (
                                        <div className="mt-2 ml-5 space-y-1 border-l-2 border-secondary pl-3">
                                            <Link
                                                href="/changelog"
                                                onClick={() => {
                                                    if (sidebarContext) sidebarContext.close();
                                                }}
                                                className="flex items-center py-2 px-3 rounded-lg text-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
                                            >
                                                <Code className="mr-2 h-4 w-4" />
                                                Changelog
                                            </Link>
                                            <button
                                                onClick={handleAchievementsClick}
                                                className="flex items-center py-2 px-3 w-full text-left rounded-lg text-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
                                            >
                                                <Trophy className="mr-2 h-4 w-4" />
                                                Achievements
                                            </button>
                                        </div>
                                    )}
                                </motion.li>
                            </>
                        ) : (
                            <NavItem href="/" label="⬅️ Terug naar Home" />
                        )}
                    </motion.ul>

                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border mt-6">
                        <Link
                            href="#contact"
                            onClick={(e) => handleSmoothScroll(e, "contact")}
                            className="bg-primary text-primary-foreground w-full py-3 rounded-lg flex justify-center items-center font-medium hover:bg-primary/90 transition-colors"
                        >
                            Contact opnemen
                        </Link>
                    </div>
                </SidebarContent>
            </Sidebar>

            {/* Achievements Modal */}
            <AchievementsModal isOpen={showAchievements} onClose={() => setShowAchievements(false)} />
        </>
    )
}

type NavItemProps = {
    href: string
    label: string
    handleClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => void
}

function NavItem({ href, label, handleClick }: NavItemProps) {
    const sidebarContext = useContext(SidebarContext)

    const handleClick2 = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        // Specific logic for anchor links
        if (href.startsWith('#') && handleClick) {
            handleClick(e, href.substring(1))
        }

        // Close the sidebar for all links
        if (sidebarContext) {
            sidebarContext.close()
        }
    }

    return (
        <motion.li
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Link
                href={href}
                onClick={handleClick2}
                className="flex items-center py-2 px-3 rounded-lg text-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
            >
                {label}
            </Link>
        </motion.li>
    )
}