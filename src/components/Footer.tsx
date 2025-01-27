import Link from 'next/link'
import { Github, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-accent text-accent-foreground py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-center md:text-left mb-4 md:mb-0">
                        © {new Date().getFullYear()} Milan Snoeijink
                    </p>
                    <div className="flex space-x-4">
                        <Link href="https://github.com/milansk05" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <Github className="w-6 h-6 text-accent-foreground hover:text-primary transition-colors" />
                        </Link>
                        <Link href="https://www.instagram.com/milan.snoeijink/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <Instagram className="w-6 h-6 text-accent-foreground hover:text-primary transition-colors" />
                        </Link>
                        <Link href="https://www.linkedin.com/in/milan-snoeijink-797315292/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <Linkedin className="w-6 h-6 text-accent-foreground hover:text-primary transition-colors" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer