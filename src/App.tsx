import Navbar from "@/sections/Navbar"
import Hero from "@/sections/Hero"
import Capability from "@/sections/Capability"
import Architecture from "@/sections/Architecture"
import Products from "@/sections/Products"
import Applications from "@/sections/Applications"
import ProcessRoadmap from "@/sections/ProcessRoadmap"
import Ecosystem from "@/sections/Ecosystem"
import Cases from "@/sections/Cases"
import News from "@/sections/News"
import Faq from "@/sections/Faq"
import Cta from "@/sections/Cta"
import Footer from "@/components/layout/Footer"

export default function App() {
  return (
    <div className="relative min-h-screen bg-background">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cyan-500 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink-950"
      >
        跳转到主要内容
      </a>

      <Navbar />

      <main>
        <Hero />
        <Capability />
        <Architecture />
        <Products />
        <Applications />
        <ProcessRoadmap />
        <Ecosystem />
        <Cases />
        <News />
        <Faq />
        <Cta />
      </main>

      <Footer />
    </div>
  )
}
