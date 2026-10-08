import { Link } from 'react-router-dom'
import { PageHero, ServiceSection, ServiceCardsGrid, PrimaryCTA } from '../components/common/ServiceLayout.jsx'
import { servicesLanding } from '../data/services.js'

export default function Services() {
  return (
    <main>
      <PageHero eyebrow="Services" h1="Pregnancy Care & Wellness Services">
        <p>
          Garbhika brings together pregnancy care and wellness services designed to support different aspects
          of your pregnancy journey.
        </p>
      </PageHero>

      <ServiceSection heading="Our Services" tint>
        <ServiceCardsGrid cards={servicesLanding} />
      </ServiceSection>

      <ServiceSection heading="Find the Right Support for Your Journey">
        <p>
          Your needs can change throughout pregnancy. Explore the service relevant to your current stage or
          speak with our team to understand the available options. Explore your{' '}
          <Link to="/pregnancy-journey/" className="text-primary underline hover:opacity-70">
            pregnancy journey
          </Link>{' '}
          to see how our services map to each stage.
        </p>
        <PrimaryCTA to="/book-consultation/">Book a Consultation</PrimaryCTA>
      </ServiceSection>
    </main>
  )
}
