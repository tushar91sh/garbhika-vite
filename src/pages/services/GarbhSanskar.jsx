import { Link } from 'react-router-dom'
import { PageHero, ServiceSection, BulletList, RelatedLinks } from '../../components/common/ServiceLayout.jsx'

const practiceAreas = [
  'Garbh Sanskar activities',
  'Mindful practices',
  'Garbh Sanskar music',
  'Meditation and relaxation',
  'Positive engagement',
  'Pregnancy lifestyle guidance',
]

export default function GarbhSanskar() {
  return (
    <main>
      <PageHero eyebrow="Garbh Sanskar & Coaching" h1="Garbh Sanskar for a Mindful Pregnancy Journey">
        <p>
          Garbh Sanskar is traditionally associated with practices intended to create a positive and mindful
          environment during pregnancy. At Garbhika, we provide structured guidance to help expecting mothers
          explore these practices as part of their overall pregnancy wellness journey.
        </p>
      </PageHero>

      <ServiceSection heading="What Is Garbh Sanskar?" tint>
        <p>
          Garbh Sanskar refers to traditional prenatal practices associated with the physical, emotional and
          mental wellbeing of the mother and her developing baby. Depending on the approach, practices may
          include mindfulness, music, positive engagement, meditation and other activities intended to
          encourage a calm and positive pregnancy environment.
        </p>
      </ServiceSection>

      <ServiceSection heading="Garbh Sanskar During Pregnancy">
        <BulletList items={practiceAreas} columns={2} />
      </ServiceSection>

      <ServiceSection heading="Garbh Sanskar Classes" tint>
        <p>
          Garbhika offers structured guidance for expecting mothers interested in exploring Garbh Sanskar. It
          is positioned as one component of a broader pregnancy wellness journey and not as a replacement for
          medical care.
        </p>
      </ServiceSection>

      <ServiceSection heading="Garbh Sanskar for Different Trimesters">
        <p>
          The{' '}
          <Link to="/pregnancy-journey/" className="text-primary underline hover:opacity-70">
            pregnancy journey
          </Link>{' '}
          changes from one trimester to another. Garbh Sanskar activities can therefore be approached with
          consideration for the mother&apos;s stage and individual needs.
        </p>
        <RelatedLinks
          links={[
            { label: 'Pregnancy Journey', to: '/pregnancy-journey/' },
            { label: 'Resources', to: '/resources/' },
            { label: 'Book a Consultation', to: '/book-consultation/' },
          ]}
        />
      </ServiceSection>
    </main>
  )
}
