import type React from "react"

export const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
        // Update URL without page reload
        window.history.pushState(null, "", `#${targetId}`)
    }
}