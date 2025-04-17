"use client"

import { Sidebar, SidebarContent, SidebarContext } from "@/components/ui/sidebar"
import Link from "next/link"
import { smoothScroll } from "@/utils/smoothScroll"
import { useState, useEffect, useContext } from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

export function AppSidebar() {
    const pathname = usePathname()
    const [mounted, setMounted] = useState(false)
    const sidebarContext = useContext(SidebarContext)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
        smoothScroll(e, targetId)
        // Sluit de sidebar wanneer er op een link wordt geklikt
        if (sidebarContext) {
            sidebarContext.close()
        }
    }

    return (
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
                            <NavItem href="/changelog" label="Changelog" />
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
        // Specifieke logica voor anchor links
        if (href.startsWith('#') && handleClick) {
            handleClick(e, href.substring(1))
        }

        // Sluit de sidebar voor alle links
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