import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ProgramsEngagement from '@/components/ProgramsEngagement'
import ImpactSection from '@/components/ImpactSection'
import SupportSection from '@/components/SupportSection'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Fixed Header */}
      <Header />
      
      {/* Page Content with proper spacing from fixed header */}
      <div className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section id="hero" className="scroll-mt-20">
          <Hero />
        </section>

        {/* Programs & Engagement Section */}
        <section id="programs" className="scroll-mt-20">
          <ProgramsEngagement />
        </section>

        {/* Impact & Stories Section */}
        <section id="impact" className="scroll-mt-20">
          <ImpactSection />
        </section>

        {/* Support Section */}
        <section id="support" className="scroll-mt-20">
          <SupportSection />
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  )
}
