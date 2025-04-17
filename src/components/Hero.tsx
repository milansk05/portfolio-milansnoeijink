"use client"

import { motion } from "framer-motion"
import { Download, ArrowRight } from "lucide-react"
import PrintCV from "./PrintCV"
import { smoothScroll } from "@/utils/smoothScroll"

const Hero = () => {
    return (
        <section className="text-center mb-20 pt-32">
            <div className="max-w-3xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-6"
                >
                    <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-foreground leading-tight">
                        Hallo, ik ben<br></br>{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                            Milan Snoeijink
                        </span>
                    </h1>

                    <p className="text-xl text-secondary-foreground">
                        Student Software Developer bij Bit Academy Noorderpoort
                    </p>
                </motion.div>

                <motion.div
                    className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <a
                        href="#contact"
                        onClick={(e) => smoothScroll(e, "contact")}
                        className="group flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all w-full sm:w-auto justify-center"
                    >
                        Contact opnemen
                        <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        >
                            <ArrowRight size={18} />
                        </motion.div>
                    </a>

                    <a
                        href="/files/CV Milan Snoeijink Software Developer.pdf"
                        download="Milan_Snoeijink_CV"
                        className="flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-full hover:bg-secondary/80 transition-colors w-full sm:w-auto justify-center"
                    >
                        <Download size={18} />
                        Download CV
                    </a>

                    <PrintCV />
                </motion.div>
            </div>
        </section>
    )
}

export default Hero