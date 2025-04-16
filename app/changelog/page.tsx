"use client"

import { useEffect, useState } from "react"
import Header from "@/components/Header"
import PageTransition from "@/components/PageTransition"
import { Loader2 } from "lucide-react"

interface Commit {
    sha: string
    commit: {
        message: string
        author: { name: string, date: string }
    }
    html_url: string
}

const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("nl-NL", options)
}

const groupCommitsByDate = (commits: Commit[]) => {
    return commits.reduce((acc, commit) => {
        const date = formatDate(commit.commit.author.date)
        if (!acc[date]) acc[date] = []
        acc[date].push(commit)
        return acc
    }, {} as Record<string, Commit[]>)
}

const Changelog = () => {
    const [commits, setCommits] = useState<Commit[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchCommits = async () => {
            try {
                const response = await fetch("/api/changelog")
                if (!response.ok) throw new Error("Failed to fetch commits")
                const data = await response.json()
                setCommits(data.slice(0, 30))
            } catch (err) {
                console.error("Fout bij het ophalen van commits:", err)
                setError(true)
            }
            setLoading(false)
        }
        fetchCommits()
    }, [])

    const groupedCommits = groupCommitsByDate(commits)

    return (
        <>
            <Header />
            <PageTransition>
                <section className="container mx-auto px-4 py-10 max-w-3xl pt-24">
                    <h1 className="text-3xl font-bold mb-6 text-foreground">📜 Changelog</h1>
                    <p className="mb-6 text-muted-foreground">Bekijk de laatste (30) updates en wijzigingen in het project.</p>

                    {loading && (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                            <p className="mt-4 text-muted-foreground">Bezig met laden van de changelog...</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 rounded-lg text-center">
                            <p className="text-red-600 dark:text-red-400 mb-2">Kon de changelog niet laden.</p>
                            <p className="text-muted-foreground">Probeer het later opnieuw of neem contact op als het probleem aanhoudt.</p>
                        </div>
                    )}

                    {!loading && !error && Object.keys(groupedCommits).length === 0 && (
                        <p className="text-center py-12 text-muted-foreground">Geen commits gevonden.</p>
                    )}

                    <div className="space-y-6">
                        {Object.entries(groupedCommits).map(([date, commits]) => (
                            <div key={date} className="border border-secondary rounded-lg bg-card shadow-lg">
                                <h2 className="text-md font-semibold px-6 py-3 border-b border-secondary bg-muted text-accent-foreground">
                                    {date}
                                </h2>

                                <ul className="space-y-4 p-4">
                                    {commits.map((commit) => (
                                        <li key={commit.sha} className="flex items-start justify-between p-3 rounded-md hover:bg-muted transition">
                                            <div>
                                                <a
                                                    href={commit.html_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary font-medium hover:underline"
                                                >
                                                    {commit.commit.message}
                                                </a>
                                                <p className="text-xs text-muted-foreground">
                                                    Door <span className="font-semibold">{commit.commit.author.name}</span>
                                                </p>
                                            </div>
                                            <span className="text-xs bg-secondary text-secondary-foreground px-3 py-3 rounded-full font-mono">
                                                {commit.sha.slice(0, 7)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            </PageTransition>
        </>
    )
}

export default Changelog