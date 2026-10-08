import { Link } from 'react-router-dom'
import { PageHero, ServiceSection, BulletList, RelatedLinks } from '../../components/common/ServiceLayout.jsx'

export default function MentalWellness() {
  return (
    <main>
      <PageHero eyebrow="Mental Wellness" h1="Mental Wellness During Pregnancy">
        <p>
          Pregnancy can affect how you feel physically and emotionally. Looking after your mental wellbeing
          can be an important part of maintaining overall wellness during this changing period.
        </p>
      </PageHero>

      <ServiceSection heading="Supporting Mental Wellbeing During Pregnancy" tint>
        <p>
          Mental wellbeing can involve how you manage everyday changes, emotions, stress and uncertainty.
          Garbhika encourages expecting mothers to explore appropriate wellness practices while seeking
          professional support when needed.
        </p>
      </ServiceSection>

      <ServiceSection heading="Pregnancy Stress Management">
        <BulletList
          items={[
            'Mindfulness',
            'Relaxation',
            'Breathing practices',
            'Appropriate physical activity',
            'Rest and sleep routines',
            'Social and community support',
          ]}
          columns={2}
        />
        <p>
          <Link to="/services/psychological-support/" className="text-primary underline hover:opacity-70">
            Professional counselling when needed
          </Link>
        </p>
      </ServiceSection>

      <ServiceSection heading="Pregnancy Mindfulness" tint>
        <p>
          Mindfulness practices can help some people focus their attention on the present moment and develop
          greater awareness of their thoughts and feelings.
        </p>
      </ServiceSection>

      <ServiceSection heading="Pregnancy Self-Care">
        <p>
          Self-care during pregnancy can include making time for rest, movement, nutrition, social connection
          and emotional support.
        </p>
        <RelatedLinks
          links={[
            { label: 'Pregnancy Nutrition', to: '/services/pregnancy-nutrition/' },
            { label: 'Pregnancy Yoga', to: '/services/pregnancy-yoga/' },
            { label: 'Psychological Support', to: '/services/psychological-support/' },
            { label: 'Book a Consultation', to: '/book-consultation/' },
          ]}
        />
      </ServiceSection>
    </main>
  )
}
