"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useDarkMode } from "./DarkModeContext"
import { smoothScroll } from "../utils/smoothScroll"

interface NavLinkProps {
    href: string;
    text: string;
    mobile?: boolean;
    closeMenu?: () => void;
}

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const { darkMode, toggleDarkMode } = useDarkMode()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
        document.body.style.overflow = isMenuOpen ? "auto" : "hidden"
    }

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        if (!isMenuOpen) document.body.style.overflow = "auto"
    }, [isMenuOpen])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
            ${isScrolled || isMenuOpen ? "bg-background shadow-sm" : "bg-background/90 backdrop-blur-sm"}`}
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
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={toggleMenu}
                ></div>
            )}

            <div
                className={`fixed top-0 right-0 h-full w-64 bg-background shadow-lg transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300 z-50`}
            >
                <div className="flex justify-between items-center p-4 border-b border-secondary bg-background">
                    <h1 className="text-xl font-bold text-foreground">Menu</h1>
                    <button onClick={toggleMenu} aria-label="Sluit menu">
                        <X size={24} className="text-foreground" />
                    </button>
                </div>
                <nav className="flex flex-col items-start space-y-4 py-6 px-4">
                    <NavLinks mobile={true} closeMenu={toggleMenu} />
                </nav>
            </div>
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

const NavLink: React.FC<NavLinkProps> = ({ href, text, mobile = false, closeMenu }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (href.startsWith("#")) {
            e.preventDefault()
            document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
            if (mobile && closeMenu) {
                closeMenu()
            }
        }
    }

    return (
        <Link
            href={href}
            className={`text-foreground hover:text-primary ${mobile ? "text-lg py-2 w-full text-left" : ""}`}
            onClick={handleClick}
        >
            {text}
        </Link>
    )
}

export default Header