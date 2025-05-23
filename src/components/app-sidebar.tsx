"use client"

import { Sidebar, SidebarContent, SidebarContext } from "@/components/ui/sidebar"
import Link from "next/link"
import { smoothScroll } from "@/utils/smoothScroll"
import { useState, useEffect, useContext } from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
    Trophy,
    MoreHorizontal,
    Code,
    ChevronDown,
    GitBranch,
    Home,
    User,
    Briefcase,
    FileText,
    LayoutGrid,
    Mail
} from "lucide-react"
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
        e.preventDefault() // Ensure the default behavior is prevented
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
                    <div className="pb-20"> {/* Added padding to ensure the bottom button doesn't overlap content */}
                        <motion.ul
                            className="space-y-5 pt-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                        >
                            {pathname !== "/changelog" ? (
                                <>
                                    <MobileNavLink
                                        href="/"
                                        label="Home"
                                        icon={Home}
                                    />
                                    <MobileNavLink
                                        href="#overmij"
                                        label="Over mij"
                                        icon={User}
                                        handleClick={handleSmoothScroll}
                                    />
                                    <MobileNavLink
                                        href="#expertise"
                                        label="Expertise"
                                        icon={Briefcase}
                                        handleClick={handleSmoothScroll}
                                    />
                                    <MobileNavLink
                                        href="#certificaten"
                                        label="Certificaten"
                                        icon={FileText}
                                        handleClick={handleSmoothScroll}
                                    />
                                    <MobileNavLink
                                        href="#portfolio"
                                        label="Portfolio"
                                        icon={LayoutGrid}
                                        handleClick={handleSmoothScroll}
                                    />
                                    <MobileNavLink
                                        href="#contact"
                                        label="Contact"
                                        icon={Mail}
                                        handleClick={handleSmoothScroll}
                                    />

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
                                                <a
                                                    href="https://github.com/users/milansk05/projects/4"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={() => {
                                                        if (sidebarContext) sidebarContext.close();
                                                    }}
                                                    className="flex items-center py-2 px-3 rounded-lg text-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
                                                >
                                                    <GitBranch className="mr-2 h-4 w-4" />
                                                    Roadmap Portfolio
                                                </a>
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
                                <MobileNavLink href="/" label="⬅️ Terug naar Home" icon={Home} />
                            )}
                        </motion.ul>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-background">
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

type MobileNavLinkProps = {
    href: string
    label: string
    icon: React.ComponentType<{ className?: string }>
    handleClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => void
}

function MobileNavLink({ href, label, icon: Icon, handleClick }: MobileNavLinkProps) {
    const sidebarContext = useContext(SidebarContext)
    const [isHovered, setIsHovered] = useState(false)

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        // Specific logic for anchor links
        if (href.startsWith('#') && handleClick) {
            handleClick(e, href.substring(1))
        } else if (!href.startsWith('#')) {
            // For non-anchor links, let the default behavior work
            // but still close the sidebar
            if (sidebarContext) {
                sidebarContext.close()
            }
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
                onClick={handleLinkClick}
                className="flex items-center py-2 px-3 rounded-lg text-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Icon className={`w-4 h-4 mr-2 transition-transform duration-300 ${isHovered ? 'scale-125' : 'scale-100'}`} />
                <span>{label}</span>
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
            </Link>
        </motion.li>
    )
}