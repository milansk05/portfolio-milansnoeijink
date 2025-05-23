"use client"

import { motion } from "framer-motion"
import type React from "react"

interface PageTransitionProps {
    children: React.ReactNode
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.div>
    )
}

export default PageTransition