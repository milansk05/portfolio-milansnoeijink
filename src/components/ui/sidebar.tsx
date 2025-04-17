import * as React from "react"
import { cn } from "@/components/utils"

export const SidebarContext = React.createContext<{
    isOpen: boolean;
    toggle: () => void;
    close: () => void;
} | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(false)

    const toggle = () => setIsOpen(!isOpen)
    const close = () => setIsOpen(false)

    // Sluit de sidebar als er op escape wordt gedrukt
    React.useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false)
        }

        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [])

    // Voorkom scrollen van de body wanneer sidebar open is
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    return <SidebarContext.Provider value={{ isOpen, toggle, close }}>{children}</SidebarContext.Provider>
}

export function SidebarTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const context = React.useContext(SidebarContext)
    if (!context) throw new Error("SidebarTrigger must be used within a SidebarProvider")

    return (
        <button
            className={cn("p-2 rounded-md bg-secondary text-secondary-foreground", className)}
            onClick={context.toggle}
            aria-label="Menu openen"
            {...props}
        >
            ☰
        </button>
    )
}

export function Sidebar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    const context = React.useContext(SidebarContext)
    if (!context) throw new Error("Sidebar must be used within a SidebarProvider")

    return (
        <>
            {/* Overlay achtergrond */}
            {context.isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
                    onClick={context.close}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar zelf */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 w-[80vw] max-w-xs bg-background shadow-xl z-50 transform transition-transform ease-in-out duration-300",
                    context.isOpen ? "translate-x-0" : "-translate-x-[105%]",
                    className
                )}
                {...props}
            >
                {props.children}
            </aside>
        </>
    )
}

export function SidebarContent({ children }: { children: React.ReactNode }) {
    const context = React.useContext(SidebarContext)
    if (!context) throw new Error("SidebarContent must be used within a SidebarProvider")

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b border-border">
                <h2 className="text-xl font-bold">Navigatie</h2>
                <button
                    onClick={context.close}
                    className="p-2 rounded-full hover:bg-secondary text-secondary-foreground transition-colors"
                    aria-label="Menu sluiten"
                >
                    ✕
                </button>
            </div>
            <div className="p-4 overflow-y-auto flex-grow">
                {children}
            </div>
        </div>
    )
}