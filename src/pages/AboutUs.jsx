import { Link } from 'react-router-dom'
import { PageHero, ServiceSection, RelatedLinks, ClosingCTA } from '../components/common/ServiceLayout.jsx'

export default function AboutUs() {
  return (
    <main>
      <PageHero eyebrow="About Garbhika" h1="About Garbhika">
        <p>
          Garbhika is a pregnancy wellness and support platform created to help expecting mothers navigate
          pregnancy with greater awareness, guidance and confidence.
        </p>
        <p>
          Pregnancy is more than a physical journey. It can involve changes in nutrition, movement, emotions,
          routines and relationships. Garbhika brings these areas together through{' '}
          <Link to="/services/" className="text-primary underline hover:opacity-70">
            expert-led services
          </Link>
          , educational resources and community support.
        </p>
      </PageHero>

      <ServiceSection heading="Our Approach to Pregnancy Wellness" tint>
        <p>
          Our approach looks at pregnancy as a complete journey. Through{' '}
          <Link to="/services/garbh-sanskar/" className="text-primary underline hover:opacity-70">
            Garbh Sanskar
          </Link>
          ,{' '}
          <Link to="/services/pregnancy-yoga/" className="text-primary underline hover:opacity-70">
            prenatal yoga
          </Link>
          ,{' '}
          <Link to="/services/pregnancy-nutrition/" className="text-primary underline hover:opacity-70">
            pregnancy nutrition
          </Link>
          ,{' '}
          <Link to="/services/psychological-support/" className="text-primary underline hover:opacity-70">
            psychological support
          </Link>
          ,{' '}
          <Link to="/services/mental-wellness/" className="text-primary underline hover:opacity-70">
            mental wellness
          </Link>{' '}
          and{' '}
          <Link to="/services/pregnancy-guidance/" className="text-primary underline hover:opacity-70">
            pregnancy guidance
          </Link>
          , Garbhika aims to provide a supportive ecosystem around expecting mothers.
        </p>
        <p>Our services are intended to complement, not replace, appropriate medical care.</p>
      </ServiceSection>

      <ServiceSection heading="Our Mission">
        <p>
          Our mission is to make pregnancy support more accessible, understandable and connected. We want
          expecting mothers to have a place where they can discover educational resources, explore wellness
          services and connect with professionals and a supportive community.
        </p>
      </ServiceSection>

      <ServiceSection heading="Supporting Different Stages of Pregnancy" tint>
        <p>
          From preconception care and pregnancy preparation to the first, second and third trimesters, each
          stage can bring different questions and needs.
        </p>
        <RelatedLinks
          links={[
            { label: 'Pregnancy Journey', to: '/pregnancy-journey/' },
            { label: 'Our Experts', to: '/experts/' },
            { label: 'Community', to: '/community/' },
            { label: 'Services', to: '/services/' },
            { label: 'Book a Consultation', to: '/book-consultation/' },
          ]}
        />
      </ServiceSection>

      <ClosingCTA heading="Begin Your Garbhika Journey">
        Whether you&apos;re preparing for pregnancy or already navigating a trimester, our team can help you
        find the right support.
      </ClosingCTA>
    </main>
  )
}
