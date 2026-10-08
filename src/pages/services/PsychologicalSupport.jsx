import { PageHero, ServiceSection, RelatedLinks } from '../../components/common/ServiceLayout.jsx'
import { Link } from 'react-router-dom'

export default function PsychologicalSupport() {
  return (
    <main>
      <PageHero eyebrow="Psychological Support" h1="Psychological Support During Pregnancy">
        <p>
          Pregnancy can bring significant emotional and psychological changes. Feelings of uncertainty,
          stress, anxiety or adjustment can sometimes accompany the physical changes of pregnancy.
        </p>
      </PageHero>

      <ServiceSection heading="Emotional and Psychological Changes During Pregnancy" tint>
        <p>
          Hormonal changes, lifestyle adjustments, concerns about childbirth and changes in relationships or
          responsibilities can affect emotional wellbeing. Everyone experiences pregnancy differently.
        </p>
      </ServiceSection>

      <ServiceSection heading="Pregnancy Counselling">
        <p>
          Pregnancy counselling can provide a supportive environment where you can discuss emotional
          concerns, adjustment challenges and other issues related to your pregnancy. Where professional
          mental-health care is required, support should be provided by appropriately qualified professionals.
        </p>
      </ServiceSection>

      <ServiceSection heading="Emotional Support During Pregnancy" tint>
        <p>Having someone to talk to can be valuable during periods of uncertainty or emotional stress.</p>
      </ServiceSection>

      <ServiceSection heading="Explore Mental Wellness">
        <p>
          Psychological support can be complemented by appropriate wellness practices such as{' '}
          <Link to="/services/mental-wellness/" className="text-primary underline hover:opacity-70">
            mindfulness, relaxation and stress-management techniques
          </Link>
          .
        </p>
        <RelatedLinks
          links={[
            { label: 'Mental Wellness', to: '/services/mental-wellness/' },
            { label: 'Book a Consultation', to: '/book-consultation/' },
          ]}
        />
      </ServiceSection>
    </main>
  )
}
