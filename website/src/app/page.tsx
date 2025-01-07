import Header from "../components/Header"
import Hero from "../components/Hero"
import About from "../components/About"
import Expertise from "../components/Expertise"
import Skills from "../components/Skills"
import Certificates from "../components/Certificates"
import Portfolio from "../components/Portfolio"
import Contact from "../components/Contact"
import Footer from "../components/Footer"
import BackToTop from "../components/BackToTop"

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