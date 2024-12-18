"use client"

import { motion } from "framer-motion"
import { Mail, User, Briefcase } from 'lucide-react'

const Contact = () => {
    return (
        <motion.section
            id="contact"
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow">
                <div className="sm:w-1/2 py-10 sm:py-16 px-8">
                    <h2 className="text-3xl font-semibold mb-6">Contacteer mij</h2>
                    <p className="text-lg mb-8">
                        Ik sta open voor samenwerkingen en nieuwe connecties.
                        <br />
                        Voel je vrij om me een mail te sturen.
                    </p>
                    <a
                        href="mailto:snoeijinkmilan@gmail.com"
                        className="bg-blue-600 text-white rounded-lg text-lg px-6 py-3 inline-block hover:bg-blue-700 transition-colors"
                    >
                        Email mij
                    </a>
                </div>
                <div className="sm:w-1/2 py-10 sm:py-16 px-8 bg-gray-100 rounded-r-lg">
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <User className="w-8 h-8 text-blue-600" />
                            <div>
                                <h3 className="font-bold text-lg">Open voor stage</h3>
                                <p>Ik ben op dit moment op zoek naar stage.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Briefcase className="w-8 h-8 text-blue-600" />
                            <div>
                                <h3 className="font-bold text-lg">Open voor projecten</h3>
                                <p>Ik sta altijd open voor leuke projecten.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Mail className="w-8 h-8 text-blue-600" />
                            <div>
                                <h3 className="font-bold text-lg">E-mail</h3>
                                <p>snoeijinkmilan@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}

export default Contact