"use client"

import { useEffect, useState } from "react"
import Header from "@/components/Header"
import PageTransition from "@/components/PageTransition"
import Footer from "@/components/Footer"
import ThemeTransitionWrapper from "@/components/ThemeTransitionWrapper"
import { motion } from "framer-motion"
import { Loader2, GitBranch, GitCommit, Link2, Calendar, ArrowLeft, Search, X, Filter } from "lucide-react"
import Link from "next/link"

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
    const [filteredCommits, setFilteredCommits] = useState<Commit[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [activeFilter, setActiveFilter] = useState<string | null>(null)

    useEffect(() => {
        const fetchCommits = async () => {
            try {
                const response = await fetch("/api/changelog")
                if (!response.ok) throw new Error("Failed to fetch commits")
                const data = await response.json()
                setCommits(data.slice(0, 30))
                setFilteredCommits(data.slice(0, 30))
            } catch (err) {
                console.error("Fout bij het ophalen van commits:", err)
                setError(true)
            }
            setLoading(false)
        }
        fetchCommits()
    }, [])

    useEffect(() => {
        // Filter logic based on search term and active filters
        let results = [...commits]

        if (searchTerm) {
            results = results.filter(commit =>
                commit.commit.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                commit.commit.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                commit.sha.includes(searchTerm.toLowerCase())
            )
        }

        if (activeFilter) {
            if (activeFilter === 'feature') {
                results = results.filter(commit =>
                    commit.commit.message.toLowerCase().includes('feature') ||
                    commit.commit.message.toLowerCase().includes('add') ||
                    commit.commit.message.toLowerCase().includes('nieuwe')
                )
            } else if (activeFilter === 'fix') {
                results = results.filter(commit =>
                    commit.commit.message.toLowerCase().includes('fix') ||
                    commit.commit.message.toLowerCase().includes('bug') ||
                    commit.commit.message.toLowerCase().includes('issue')
                )
            } else if (activeFilter === 'update') {
                results = results.filter(commit =>
                    commit.commit.message.toLowerCase().includes('update') ||
                    commit.commit.message.toLowerCase().includes('improve') ||
                    commit.commit.message.toLowerCase().includes('refactor')
                )
            }
        }

        setFilteredCommits(results)
    }, [searchTerm, activeFilter, commits])

    const groupedCommits = groupCommitsByDate(filteredCommits)
    const commitCount = filteredCommits.length
    const totalCommits = commits.length

    const getCommitTypeColor = (message: string) => {
        const lowerMsg = message.toLowerCase()
        if (lowerMsg.includes('feature') || lowerMsg.includes('add') || lowerMsg.includes('nieuwe')) {
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
        } else if (lowerMsg.includes('fix') || lowerMsg.includes('bug') || lowerMsg.includes('issue')) {
            return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300'
        } else if (lowerMsg.includes('update') || lowerMsg.includes('improve') || lowerMsg.includes('refactor')) {
            return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
        }
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
    }

    const getCommitTypeIcon = (message: string) => {
        const lowerMsg = message.toLowerCase()
        if (lowerMsg.includes('feature') || lowerMsg.includes('add') || lowerMsg.includes('nieuwe')) {
            return '✨'
        } else if (lowerMsg.includes('fix') || lowerMsg.includes('bug') || lowerMsg.includes('issue')) {
            return '🐛'
        } else if (lowerMsg.includes('update') || lowerMsg.includes('improve') || lowerMsg.includes('refactor')) {
            return '🔄'
        }
        return '📝'
    }

    const clearFiltersAndSearch = () => {
        setActiveFilter(null)
        setSearchTerm("")
    }

    return (
        <ThemeTransitionWrapper>
            <Header />
            <PageTransition>
                <main className="container mx-auto px-4 py-10 max-w-4xl pt-32 mb-20">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Link
                                    href="/"
                                    className="text-muted-foreground hover:text-primary flex items-center gap-1 text-sm"
                                >
                                    <ArrowLeft size={14} />
                                    <span>Terug naar home</span>
                                </Link>
                            </div>
                            <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
                                <GitBranch className="h-8 w-8 text-primary" />
                                Changelog
                            </h1>
                            <p className="mt-2 text-muted-foreground">
                                {!loading && !error && `Bekijk de laatste updates en wijzigingen (${commitCount} van ${totalCommits} commits).`}
                            </p>
                        </div>
                    </div>

                    {/* Search and filter bar */}
                    {!loading && !error && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-8 bg-card rounded-xl shadow-md p-4 border border-border"
                        >
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="relative flex-grow">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Zoek in commits..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-10 py-2 rounded-lg bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    {searchTerm && (
                                        <button
                                            onClick={() => setSearchTerm("")}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                                        </button>
                                    )}
                                </div>

                                <div className="flex gap-2 flex-wrap">
                                    <button
                                        onClick={() => setActiveFilter(activeFilter === 'feature' ? null : 'feature')}
                                        className={`px-3 py-2 rounded-lg text-sm flex items-center gap-1 ${activeFilter === 'feature'
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                            }`}
                                    >
                                        <span>✨ Features</span>
                                    </button>
                                    <button
                                        onClick={() => setActiveFilter(activeFilter === 'fix' ? null : 'fix')}
                                        className={`px-3 py-2 rounded-lg text-sm flex items-center gap-1 ${activeFilter === 'fix'
                                                ? 'bg-rose-500 text-white'
                                                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                            }`}
                                    >
                                        <span>🐛 Fixes</span>
                                    </button>
                                    <button
                                        onClick={() => setActiveFilter(activeFilter === 'update' ? null : 'update')}
                                        className={`px-3 py-2 rounded-lg text-sm flex items-center gap-1 ${activeFilter === 'update'
                                                ? 'bg-amber-500 text-white'
                                                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                            }`}
                                    >
                                        <span>🔄 Updates</span>
                                    </button>

                                    {(activeFilter || searchTerm) && (
                                        <button
                                            onClick={clearFiltersAndSearch}
                                            className="px-3 py-2 rounded-lg text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center gap-1"
                                        >
                                            <Filter className="h-4 w-4" />
                                            <span>Wis filters</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-20"
                        >
                            <div className="relative">
                                <Loader2 className="h-16 w-16 animate-spin text-primary" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <GitBranch className="h-6 w-6 text-primary/80" />
                                </div>
                            </div>
                            <p className="mt-6 text-lg text-muted-foreground">Bezig met laden van de changelog...</p>
                        </motion.div>
                    )}

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-8 rounded-xl text-center shadow-md"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">Kon de changelog niet laden</h2>
                            <p className="text-muted-foreground mb-6">Er is een probleem opgetreden bij het ophalen van de commit geschiedenis.</p>
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90"
                            >
                                Terug naar home
                            </Link>
                        </motion.div>
                    )}

                    {!loading && !error && Object.keys(groupedCommits).length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center justify-center text-center py-16 bg-card rounded-xl shadow-md border border-border"
                        >
                            <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
                                <GitBranch className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">Geen commits gevonden</h3>
                            <p className="text-muted-foreground max-w-md">
                                {searchTerm || activeFilter ?
                                    `Er zijn geen commits gevonden die voldoen aan je zoekcriteria. Probeer andere zoektermen of filters.` :
                                    `Er zijn nog geen commits beschikbaar in de repository.`
                                }
                            </p>
                            {(searchTerm || activeFilter) && (
                                <button
                                    onClick={clearFiltersAndSearch}
                                    className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    Wis filters
                                </button>
                            )}
                        </motion.div>
                    )}

                    {!loading && !error && Object.keys(groupedCommits).length > 0 && (
                        <div className="space-y-8">
                            {Object.entries(groupedCommits).map(([date, dateCommits], dateIndex) => (
                                <motion.div
                                    key={date}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: dateIndex * 0.1 }}
                                    className="rounded-xl overflow-hidden shadow-md bg-card border border-border"
                                >
                                    <div className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-background to-secondary/30 border-b border-border">
                                        <Calendar className="h-5 w-5 text-primary" />
                                        <h2 className="font-semibold text-accent-foreground">{date}</h2>
                                        <div className="ml-auto rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                                            {dateCommits.length} {dateCommits.length === 1 ? 'commit' : 'commits'}
                                        </div>
                                    </div>

                                    <ul className="divide-y divide-border">
                                        {dateCommits.map((commit, commitIndex) => (
                                            <motion.li
                                                key={commit.sha}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.1 + commitIndex * 0.05 }}
                                                className="group hover:bg-muted/50 transition-colors"
                                            >
                                                <div className="px-6 py-4">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex items-start gap-3">
                                                            <div className="flex-shrink-0 mt-1">
                                                                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary/70 text-xl">
                                                                    {getCommitTypeIcon(commit.commit.message)}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <a
                                                                    href={commit.html_url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-accent-foreground font-medium hover:text-primary hover:underline flex items-center gap-1 group"
                                                                >
                                                                    {commit.commit.message}
                                                                    <Link2 className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                </a>
                                                                <div className="flex items-center gap-3 mt-1.5">
                                                                    <span className="text-sm text-muted-foreground">
                                                                        <span className="font-medium">{commit.commit.author.name}</span>
                                                                    </span>
                                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${getCommitTypeColor(commit.commit.message)}`}>
                                                                        {commit.commit.message.toLowerCase().includes('feature') || commit.commit.message.toLowerCase().includes('add') ? 'Feature' :
                                                                            commit.commit.message.toLowerCase().includes('fix') || commit.commit.message.toLowerCase().includes('bug') ? 'Fix' :
                                                                                commit.commit.message.toLowerCase().includes('update') || commit.commit.message.toLowerCase().includes('improve') ? 'Update' : 'Change'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <a
                                                                href={commit.html_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-1.5 text-xs bg-secondary hover:bg-secondary/70 text-secondary-foreground px-3 py-1.5 rounded-full transition-colors"
                                                            >
                                                                <GitCommit className="h-3.5 w-3.5" />
                                                                <code>{commit.sha.slice(0, 7)}</code>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* GitHub link */}
                    {!loading && !error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-10 text-center"
                        >
                            <a
                                href="https://github.com/milansk05/portfolio-milansnoeijink"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                            >
                                <span>Bekijk het volledige project op GitHub</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                            </a>
                        </motion.div>
                    )}
                </main>
            </PageTransition>
            <Footer />
        </ThemeTransitionWrapper>
    )
}

export default Changelog