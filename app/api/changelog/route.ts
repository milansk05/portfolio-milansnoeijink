import { NextResponse } from "next/server"

const GITHUB_OWNER = "milansk05"
const GITHUB_REPO = "portfolio-milansnoeijink"
const GITHUB_BRANCH = "main"
const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN

export async function GET() {
    try {
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits?sha=${GITHUB_BRANCH}`,
            {
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                    Accept: "application/vnd.github.v3+json",
                },
                next: { revalidate: 300 }, // Cache voor 5 min
            }
        )

        if (!response.ok) throw new Error("Failed to fetch commits")

        const commits = await response.json()
        return NextResponse.json(commits)
    } catch (error) {
        console.error("Error fetching commits:", error)
        return NextResponse.json({ error: "Failed to load changelog" }, { status: 500 })
    }
}