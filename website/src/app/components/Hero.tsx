"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const Hero = () => {
    return (
        <section className="text-center mb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold mb-4">Hallo, ik ben Milan</h2>
                <h1 className="text-5xl font-extrabold mb-2">Milan Snoeijink</h1>
                <p className="text-xl text-gray-700 mb-6">Software Developer bij Bit Academy Noorderpoort</p>
            </motion.div>
            <motion.div
                className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Link href="#contact" className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors">
                    Contact Opnemen
                </Link>
                <a href="https://www.linkedin.com/in/milan-snoeijink-797315292/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
                    LinkedIn Profiel
                </a>
                <a href="/cv.pdf" download="Milan_Snoeijink_CV" className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors">
                    Download CV
                </a>
            </motion.div>
        </section>
    )
}

export default Hero