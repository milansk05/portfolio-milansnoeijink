export type CertificateCategory = "frontend" | "backend" | "fullstack" | "functional" | "other"

export type Certificate = {
    href: string
    title: string
    date: string
    code: string
    category: CertificateCategory
}

export const categorizeAndSortCertificates = (certificates: Certificate[], sortType: string): Certificate[] => {
    let filteredCertificates = [...certificates]

    if (["frontend", "backend", "fullstack", "functional", "other"].includes(sortType)) {
        filteredCertificates = certificates.filter((cert) => cert.category === sortType)
    }

    return filteredCertificates.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
}