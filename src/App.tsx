import { useEffect } from "react"
import Navbar from "@/sections/Navbar"
import Hero from "@/sections/Hero"
import Capability from "@/sections/Capability"
import Architecture from "@/sections/Architecture"
import Products from "@/sections/Products"
import Applications from "@/sections/Applications"
import Insights from "@/sections/Insights"
import ProcessRoadmap from "@/sections/ProcessRoadmap"
import Ecosystem from "@/sections/Ecosystem"
import Cases from "@/sections/Cases"
import News from "@/sections/News"
import Faq from "@/sections/Faq"
import LeadCapture from "@/sections/LeadCapture"
import Cta from "@/sections/Cta"
import Footer from "@/components/layout/Footer"
import WechatDock from "@/components/layout/WechatDock"
import { captureUtm, reportAttribution } from "@/lib/analytics"

export default function App() {
  // 记录公众号推文跳转来源，用于渠道归因
  useEffect(() => {
    captureUtm()
    reportAttribution()
  }, [])

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
        <Insights />
        <ProcessRoadmap />
        <Ecosystem />
        <Cases />
        <News />
        <Faq />
        <LeadCapture />
        <Cta />
      </main>

      <Footer />

      {/* 私域浮标：全站常驻的公众号 / 企业微信入口 */}
      <WechatDock />
    </div>
  )
}
