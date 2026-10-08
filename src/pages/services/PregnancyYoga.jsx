import { PageHero, ServiceSection, BulletList, RelatedLinks } from '../../components/common/ServiceLayout.jsx'

const trimesterPractices = [
  'First trimester yoga',
  'Second trimester yoga',
  'Third trimester yoga',
  'Pregnancy yoga for beginners',
  'Pregnancy yoga exercises',
  'Safe pregnancy movement',
  'Breathing and relaxation practices',
]

export default function PregnancyYoga() {
  return (
    <main>
      <PageHero eyebrow="Pregnancy Yoga" h1="Pregnancy Yoga & Prenatal Yoga">
        <p>
          Pregnancy brings continuous physical changes. Appropriate movement, breathing and relaxation
          practices can help expecting mothers stay connected with their changing bodies.
        </p>
      </PageHero>

      <ServiceSection heading="What Is Prenatal Yoga?" tint>
        <p>
          Prenatal yoga is a form of yoga adapted for pregnancy. Depending on the stage of pregnancy, certain
          poses, movements and levels of intensity may need to be modified.
        </p>
        <p>
          If you are considering starting a new exercise routine during pregnancy, consult your healthcare
          provider where appropriate.
        </p>
      </ServiceSection>

      <ServiceSection heading="Pregnancy Yoga for Different Trimesters">
        <BulletList items={trimesterPractices} columns={2} />
      </ServiceSection>

      <ServiceSection heading="Pregnancy Yoga Classes" tint>
        <p>
          Whether you&apos;re looking for prenatal yoga classes, pregnancy yoga classes near you or online
          pregnancy yoga classes, Garbhika can help you explore suitable support options.
        </p>
      </ServiceSection>

      <ServiceSection heading="Potential Benefits of Prenatal Yoga">
        <p>
          Pregnancy-appropriate yoga may support flexibility, body awareness, relaxation and mindful
          breathing. Individual suitability varies, and exercises should be adapted according to personal
          circumstances.
        </p>
        <RelatedLinks
          links={[
            { label: 'Pregnancy Journey', to: '/pregnancy-journey/' },
            { label: 'Pregnancy Nutrition', to: '/services/pregnancy-nutrition/' },
            { label: 'Mental Wellness', to: '/services/mental-wellness/' },
            { label: 'Book a Consultation', to: '/book-consultation/' },
          ]}
        />
      </ServiceSection>
    </main>
  )
}
