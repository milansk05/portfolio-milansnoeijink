"use client"

import { Sidebar, SidebarContent } from "@/components/ui/sidebar"
import Link from "next/link"

export function AppSidebar() {
    return (
        <Sidebar className="md:hidden">
            <SidebarContent>
                <p className="text-xl font-bold">Sidebar Navigatie</p>
                <ul className="mt-4 space-y-4">
                    <li><Link href="/" className="text-foreground hover:text-primary">Home</Link></li>
                    <li><Link href="#overmij" className="text-foreground hover:text-primary">Over Mij</Link></li>
                    <li><Link href="#expertise" className="text-foreground hover:text-primary">Expertise</Link></li>
                    <li><Link href="#certificaten" className="text-foreground hover:text-primary">Certificaten</Link></li>
                    <li><Link href="#portfolio" className="text-foreground hover:text-primary">Portfolio</Link></li>
                    <li><Link href="#contact" className="text-foreground hover:text-primary">Contact</Link></li>
                    <li><Link href="/changelog" className="text-foreground hover:text-primary">Changelog</Link></li>
                </ul>
            </SidebarContent>
        </Sidebar>
    )
}