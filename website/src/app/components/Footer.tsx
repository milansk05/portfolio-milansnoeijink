import Link from "next/link"
import { Github, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-white shadow mt-20">
            <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
                <div className="text-gray-600">© Milan Snoeijink</div>
                <nav className="flex space-x-6 mt-4 md:mt-0">
                    <a
                        href="https://github.com/milansk05"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <Github className="w-6 h-6 text-gray-600 hover:text-gray-900" />
                    </a>
                    <a
                        href="https://www.instagram.com/milan.sk18/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                    >
                        <Instagram className="w-6 h-6 text-gray-600 hover:text-gray-900" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/milan-snoeijink-797315292/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="w-6 h-6 text-gray-600 hover:text-gray-900" />
                    </a>
                </nav>
            </div>
        </footer>
    )
}

export default Footer