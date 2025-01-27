import Header from "../src/components/Header"
import Hero from "../src/components/Hero"
import About from "../src/components/About"
import Expertise from "../src/components/Expertise"
import Skills from "../src/components/Skills"
import Certificates from "../src/components/Certificates"
import Portfolio from "../src/components/Portfolio"
import Contact from "../src/components/Contact"
import Footer from "../src/components/Footer"
import BackToTop from "../src/components/BackToTop"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 pt-20">
        <Hero />
        <About />
        <Expertise />
        <Skills />
        <Certificates />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}