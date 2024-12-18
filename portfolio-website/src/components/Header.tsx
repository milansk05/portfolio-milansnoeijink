"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from 'lucide-react'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <header className="bg-white shadow mb-20 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Milan Snoeijink</h1>
                <nav className="hidden md:flex space-x-6">
                    <NavLinks />
                </nav>
                <Link href="#contact" className="hidden md:block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                    Contact opnemen
                </Link>
                <button onClick={toggleMenu} className="md:hidden text-gray-600">
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            {isMenuOpen && (
                <div className="md:hidden">
                    <nav className="flex flex-col items-center space-y-4 py-4">
                        <NavLinks />
                    </nav>
                </div>
            )}
        </header>
    )
}

const NavLinks = () => (
    <>
        <Link href="/" className="text-gray-600 hover:text-blue-600 hover:font-bold">Home</Link>
        <Link href="#overmij" className="text-gray-600 hover:text-blue-600 hover:font-bold">Over mij</Link>
        <Link href="#expertise" className="text-gray-600 hover:text-blue-600 hover:font-bold">Expertise</Link>
        <Link href="#certificaten" className="text-gray-600 hover:text-blue-600 hover:font-bold">Certificaten</Link>
        <Link href="#portfolio" className="text-gray-600 hover:text-blue-600 hover:font-bold">Portfolio</Link>
        <Link href="#contact" className="text-gray-600 hover:text-blue-600 hover:font-bold">Contact</Link>
    </>
)

export default Header