// app/page.tsx
import Header from "../src/components/Header";
import Hero from "../src/components/Hero";
import About from "../src/components/About";
import Expertise from "../src/components/Expertise";
import Skills from "../src/components/Skills";
import Certificates from "../src/components/Certificates";
import Portfolio from "../src/components/Portfolio";
import Contact from "../src/components/Contact";
import Footer from "../src/components/Footer";
import BackToTop from "../src/components/BackToTop";
import Script from "next/script";
import PageTransition from "@/components/PageTransition";
import ThemeTransitionWrapper from "@/components/ThemeTransitionWrapper";
import CareerTimeline from "@/components/CareerTimeline";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Script
        id="schema-org-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Milan Snoeijink",
            url: "https://www.milansnoeijink.nl",
            jobTitle: "Software Developer",
            image: "https://www.milansnoeijink.nl/images/profielfoto.jpg",
            email: "snoeijinkmilan@gmail.com",
            telephone: "",
            sameAs: [
              "https://github.com/milansk05",
              "https://www.linkedin.com/in/milan-snoeijink-797315292/",
              "https://www.instagram.com/milan.sk19/",
            ],
            worksFor: {
              "@type": "Organization",
              name: "Bit Academy Noorderpoort",
            },
            alumniOf: {
              "@type": "Organization",
              name: "Bit Academy Noorderpoort",
            },
            knowsAbout: [
              "HTML",
              "CSS",
              "JavaScript",
              "TypeScript",
              "React",
              "Next.js",
              "PHP",
              "MySQL",
              "Tailwind CSS",
            ],
          }),
        }}
      />
      <ThemeTransitionWrapper>
        <Header />
        <PageTransition>
          <main
            id="main-content"
            className="container mx-auto px-4 pt-20"
            role="main"
          >
            <Hero />
            <About />
            <Expertise />
            <Skills />
            <CareerTimeline />
            <Certificates />
            <Portfolio />
            <Contact />
          </main>
        </PageTransition>
        <Footer />
      </ThemeTransitionWrapper>
      <BackToTop />
    </div>
  );
}