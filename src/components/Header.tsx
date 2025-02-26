"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useDarkMode } from "./DarkModeContext"

interface NavLinkProps {
    href: string
    text: string
    mobile?: boolean
    closeMenu?: () => void
    activeSection?: string
}

const sections = ["overmij", "expertise", "certificaten", "portfolio", "contact"]

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState("")
    const { darkMode, toggleDarkMode } = useDarkMode()
    const pathname = usePathname() // Haal de huidige pagina op

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        const observerOptions = { root: null, rootMargin: "-50% 0px -50% 0px", threshold: 0 }

        const observer = new IntersectionObserver((entries) => {
            const visibleSection = entries.find((entry) => entry.isIntersecting)?.target.id
            if (visibleSection) setActiveSection(visibleSection)
        }, observerOptions)

        sections.forEach((section) => {
            const element = document.getElementById(section)
            if (element) observer.observe(element)
        })

        return () => {
            sections.forEach((section) => {
                const element = document.getElementById(section)
                if (element) observer.unobserve(element)
            })
        }
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
            ${isScrolled || isMenuOpen ? "bg-background shadow-sm" : "bg-background/90 backdrop-blur-sm"}`}
        >
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-foreground">Milan Snoeijink</h1>

                {/* ✅ Verberg bepaalde links als we op de Changelog-pagina zijn */}
                <nav className="hidden md:flex space-x-6">
                    {pathname !== "/changelog" ? (
                        <NavLinks activeSection={activeSection} />
                    ) : (
                        <Link
                            href="/"
                            className="hidden md:block bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-colors"
                        >
                            ⬅️ Terug naar Home
                        </Link>
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

                    {pathname !== "/changelog" && (
                        <Link
                            href="#contact"
                            className="hidden md:block bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-colors"
                        >
                            Contact opnemen
                        </Link>
                    )}

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-foreground"
                        aria-label={isMenuOpen ? "Sluit menu" : "Open menu"}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {isMenuOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setIsMenuOpen(false)}></div>}

            <div
                className={`fixed top-0 right-0 h-full w-64 bg-background shadow-lg transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300 z-50`}
            >
                <div className="flex justify-between items-center p-4 border-b border-secondary bg-background">
                    <h1 className="text-xl font-bold text-foreground">Navigatie menu</h1>
                    <button onClick={() => setIsMenuOpen(false)} aria-label="Sluit menu">
                        <X size={24} className="text-foreground" />
                    </button>
                </div>

                <nav className="flex flex-col items-start space-y-4 py-6 px-4">
                    {pathname !== "/changelog" ? (
                        <NavLinks mobile={true} closeMenu={() => setIsMenuOpen(false)} activeSection={activeSection} />
                    ) : (
                        <Link
                            href="/"
                            className="text-foreground hover:text-primary text-lg py-2 w-full text-left"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            ⬅️ Terug naar Home
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    )
}

const NavLinks = ({ mobile = false, closeMenu = () => { }, activeSection = "" }) => (
    <>
        <NavLink href="/" text="Home" mobile={mobile} closeMenu={closeMenu} activeSection={activeSection} />
        <NavLink href="#overmij" text="Over mij" mobile={mobile} closeMenu={closeMenu} activeSection={activeSection} />
        <NavLink href="#expertise" text="Expertise" mobile={mobile} closeMenu={closeMenu} activeSection={activeSection} />
        <NavLink href="#certificaten" text="Certificaten" mobile={mobile} closeMenu={closeMenu} activeSection={activeSection} />
        <NavLink href="#portfolio" text="Portfolio" mobile={mobile} closeMenu={closeMenu} activeSection={activeSection} />
        <NavLink href="#contact" text="Contact" mobile={mobile} closeMenu={closeMenu} activeSection={activeSection} />
        <Link href="/changelog" className={`text-foreground hover:text-primary ${activeSection === "changelog" ? "font-semibold underline" : ""}`}>
            Changelog
        </Link>
    </>
)

const NavLink: React.FC<NavLinkProps> = ({ href, text, mobile = false, closeMenu, activeSection }) => {
    const isActive = href.startsWith("#") && activeSection === href.replace("#", "")

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (href.startsWith("#")) {
            e.preventDefault()
            document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
            if (mobile && closeMenu) closeMenu()
        }
    }

    return (
        <Link
            href={href}
            className={`text-foreground hover:text-primary ${isActive ? "font-semibold underline" : ""} ${mobile ? "text-lg py-2 w-full text-left" : ""}`}
            onClick={handleClick}
        >
            {text}
        </Link>
    )
}

export default Header