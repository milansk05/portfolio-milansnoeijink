"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useDarkMode } from "./DarkModeContext"
import { smoothScroll } from "../utils/smoothScroll"

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const { darkMode, toggleDarkMode } = useDarkMode()

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-sm shadow-sm" : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-foreground">Milan Snoeijink</h1>
                <nav className="hidden md:flex space-x-6">
                    <NavLinks />
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
                        onClick={(e) => smoothScroll(e, "contact")}
                    >
                        Contact opnemen
                    </Link>
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-foreground"
                        aria-label={isMenuOpen ? "Sluit menu" : "Open menu"}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-background border-t border-secondary">
                    <nav className="flex flex-col items-center space-y-4 py-4">
                        <NavLinks mobile={true} closeMenu={() => setIsMenuOpen(false)} />
                    </nav>
                </div>
            )}
        </header>
    )
}

const NavLinks = ({ mobile = false, closeMenu = () => { } }) => (
    <>
        <NavLink href="/" text="Home" mobile={mobile} closeMenu={closeMenu} />
        <NavLink href="#overmij" text="Over mij" mobile={mobile} closeMenu={closeMenu} />
        <NavLink href="#expertise" text="Expertise" mobile={mobile} closeMenu={closeMenu} />
        <NavLink href="#certificaten" text="Certificaten" mobile={mobile} closeMenu={closeMenu} />
        <NavLink href="#portfolio" text="Portfolio" mobile={mobile} closeMenu={closeMenu} />
        <NavLink href="#contact" text="Contact" mobile={mobile} closeMenu={closeMenu} />
    </>
)

const NavLink = ({
    href,
    text,
    mobile,
    closeMenu,
}: { href: string; text: string; mobile?: boolean; closeMenu?: () => void }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (href.startsWith("#")) {
            smoothScroll(e, href.slice(1))
            if (mobile && closeMenu) {
                closeMenu()
            }
        }
    }

    return (
        <Link
            href={href}
            className={`text-foreground hover:text-primary ${mobile ? "text-lg py-2" : ""}`}
            onClick={handleClick}
        >
            {text}
        </Link>
    )
}

export default Header