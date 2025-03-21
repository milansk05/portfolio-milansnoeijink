"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sun, Moon } from "lucide-react"
import { useDarkMode } from "./DarkModeContext"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

const Header = () => {
    const { darkMode, toggleDarkMode } = useDarkMode()
    const pathname = usePathname()

    return (
        <SidebarProvider>
            <header className="fixed top-0 left-0 right-0 z-50 bg-background shadow-sm transition-all duration-300">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-foreground">Milan Snoeijink</h1>

                    <nav className="hidden md:flex space-x-6">
                        {pathname !== "/changelog" ? (
                            <>
                                <NavLink href="/" text="Home" />
                                <NavLink href="#overmij" text="Over mij" />
                                <NavLink href="#expertise" text="Expertise" />
                                <NavLink href="#certificaten" text="Certificaten" />
                                <NavLink href="#portfolio" text="Portfolio" />
                                <NavLink href="#contact" text="Contact" />
                                <NavLink href="/changelog" text="Changelog" />
                            </>
                        ) : (
                            <NavLink href="/" text="⬅️ Terug naar Home" />
                        )}
                    </nav>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                            aria-label={darkMode ? "Schakel naar light mode" : "Schakel naar dark mode"}
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <Link
                            href="#contact"
                            className="hidden md:block bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-colors"
                        >
                            Contact opnemen
                        </Link>

                        <SidebarTrigger className="md:hidden p-2 rounded-md bg-secondary text-secondary-foreground" />

                        <AppSidebar />
                    </div>
                </div>
            </header>
        </SidebarProvider>
    )
}

const NavLink = ({ href, text }: { href: string; text: string }) => {
    return <Link href={href} className="text-foreground hover:text-primary">{text}</Link>
}

export default Header