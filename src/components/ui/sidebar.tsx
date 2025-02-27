import * as React from "react"
import { cn } from "@/components/utils"

const SidebarContext = React.createContext<{ isOpen: boolean; toggle: () => void } | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(false)

    const toggle = () => setIsOpen(!isOpen)

    return <SidebarContext.Provider value={{ isOpen, toggle }}>{children}</SidebarContext.Provider>
}

export function SidebarInset({ children }: { children: React.ReactNode }) {
    return <div className="flex">{children}</div>
}

export function SidebarTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const context = React.useContext(SidebarContext)
    if (!context) throw new Error("SidebarTrigger must be used within a SidebarProvider")

    return (
        <button className={cn("p-2 rounded-md bg-secondary text-secondary-foreground", className)} onClick={context.toggle} {...props}>
            ☰
        </button>
    )
}

export function Sidebar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    const context = React.useContext(SidebarContext)
    if (!context) throw new Error("Sidebar must be used within a SidebarProvider")

    return (
        <aside className={cn("fixed inset-y-0 left-0 w-64 bg-background shadow-lg transform transition-transform duration-300", context.isOpen ? "translate-x-0" : "-translate-x-full", className)} {...props}>
            {props.children}
        </aside>
    )
}

export function SidebarContent({ children }: { children: React.ReactNode }) {
    return <div className="p-4">{children}</div>
}