"use client"

import { useState } from 'react'
import { Printer } from 'lucide-react'

const PrintCV = () => {
    const [isPrinting, setIsPrinting] = useState(false)

    const handlePrint = () => {
        setIsPrinting(true)

        // Korte vertraging om de status te updaten voordat het printdialoog verschijnt
        setTimeout(() => {
            window.print()

            // Reset status na printdialoog sluit (ongeveer)
            setTimeout(() => {
                setIsPrinting(false)
            }, 1000)
        }, 100)
    }

    return (
        <button
            onClick={handlePrint}
            disabled={isPrinting}
            className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-full hover:bg-secondary/80 transition-colors print:hidden"
            aria-label="Print CV"
        >
            <Printer size={16} />
            {isPrinting ? 'Printen...' : 'Print CV'}
        </button>
    )
}

export default PrintCV