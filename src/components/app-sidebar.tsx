"use client"

import { Sidebar, SidebarContent } from "@/components/ui/sidebar"
import Link from "next/link"
import { smoothScroll } from "@/utils/smoothScroll"

export function AppSidebar() {
    return (
        <Sidebar className="md:hidden">
            <SidebarContent>
                <p className="text-xl font-bold">Sidebar Navigatie</p>
                <ul className="mt-4 space-y-4">
                    <li><Link href="/" className="text-foreground hover:text-primary">Home</Link></li>
                    <li>
                        <a
                            href="#overmij"
                            className="text-foreground hover:text-primary"
                            onClick={(e) => smoothScroll(e, "overmij")}
                        >
                            Over Mij
                        </a>
                    </li>
                    <li>
                        <a
                            href="#expertise"
                            className="text-foreground hover:text-primary"
                            onClick={(e) => smoothScroll(e, "expertise")}
                        >
                            Expertise
                        </a>
                    </li>
                    <li>
                        <a
                            href="#certificaten"
                            className="text-foreground hover:text-primary"
                            onClick={(e) => smoothScroll(e, "certificaten")}
                        >
                            Certificaten
                        </a>
                    </li>
                    <li>
                        <a
                            href="#portfolio"
                            className="text-foreground hover:text-primary"
                            onClick={(e) => smoothScroll(e, "portfolio")}
                        >
                            Portfolio
                        </a>
                    </li>
                    <li>
                        <a
                            href="#contact"
                            className="text-foreground hover:text-primary"
                            onClick={(e) => smoothScroll(e, "contact")}
                        >
                            Contact
                        </a>
                    </li>
                    <li><Link href="/changelog" className="text-foreground hover:text-primary">Changelog</Link></li>
                </ul>
            </SidebarContent>
        </Sidebar>
    )
}