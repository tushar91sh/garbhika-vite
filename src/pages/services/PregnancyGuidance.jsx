import { Link } from 'react-router-dom'
import { PageHero, ServiceSection, BulletList, RelatedLinks } from '../../components/common/ServiceLayout.jsx'

const coverage = [
  'Pregnancy preparation',
  'First trimester',
  'Second trimester',
  'Third trimester',
  'Pregnancy nutrition',
  'Pregnancy wellness',
  'Birth preparation',
  'Postpartum recovery',
]

export default function PregnancyGuidance() {
  return (
    <main>
      <PageHero eyebrow="Pregnancy Guidance" h1="Pregnancy Guidance & Support">
        <p>
          Pregnancy can bring many questions, especially if you are experiencing it for the first time.
          Garbhika provides structured pregnancy guidance to help expecting mothers navigate different stages
          of their journey with greater awareness.
        </p>
      </PageHero>

      <ServiceSection heading="Guidance for Your Pregnancy Journey" tint>
        <BulletList items={coverage} columns={2} />
      </ServiceSection>

      <ServiceSection heading="Support for First-Time Mothers">
        <p>
          A first pregnancy can involve many unfamiliar experiences. Access to appropriate information and
          support can help first-time mothers better understand what to expect.
        </p>
      </ServiceSection>

      <ServiceSection heading="Personalised Pregnancy Guidance" tint>
        <p>
          Every pregnancy is different. Guidance should take into account individual circumstances rather
          than assuming that one approach works for everyone. Explore your{' '}
          <Link to="/pregnancy-journey/" className="text-primary underline hover:opacity-70">
            pregnancy journey
          </Link>{' '}
          for a stage-by-stage look at what support may help.
        </p>
        <RelatedLinks
          links={[
            { label: 'Pregnancy Journey', to: '/pregnancy-journey/' },
            { label: 'Garbh Sanskar', to: '/services/garbh-sanskar/' },
            { label: 'Pregnancy Yoga', to: '/services/pregnancy-yoga/' },
            { label: 'Pregnancy Nutrition', to: '/services/pregnancy-nutrition/' },
            { label: 'Psychological Support', to: '/services/psychological-support/' },
            { label: 'Mental Wellness', to: '/services/mental-wellness/' },
            { label: 'Book a Consultation', to: '/book-consultation/' },
          ]}
        />
      </ServiceSection>
    </main>
  )
}
