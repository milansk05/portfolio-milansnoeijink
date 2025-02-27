"use client"

import { Sidebar, SidebarContent } from "@/components/ui/sidebar"

export function AppSidebar() {
    return (
        <Sidebar className="md:hidden">
            <SidebarContent>
                <p className="text-xl font-bold">Sidebar Navigatie</p>
                <ul className="mt-4 space-y-4">
                    <li><a href="/" className="text-foreground hover:text-primary">Home</a></li>
                    <li><a href="#overmij" className="text-foreground hover:text-primary">Over Mij</a></li>
                    <li><a href="#expertise" className="text-foreground hover:text-primary">Expertise</a></li>
                    <li><a href="#certificaten" className="text-foreground hover:text-primary">Certificaten</a></li>
                    <li><a href="#portfolio" className="text-foreground hover:text-primary">Portfolio</a></li>
                    <li><a href="#contact" className="text-foreground hover:text-primary">Contact</a></li>
                    <li><a href="/changelog" className="text-foreground hover:text-primary">Changelog</a></li>
                </ul>
            </SidebarContent>
        </Sidebar>
    )
}