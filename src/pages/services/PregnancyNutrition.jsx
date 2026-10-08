import { PageHero, ServiceSection, BulletList, RelatedLinks } from '../../components/common/ServiceLayout.jsx'

const guidanceTopics = [
  'Foods to eat during pregnancy',
  'Foods to avoid during pregnancy',
  'Pregnancy meal planning',
  'First trimester diet',
  'Second trimester diet',
  'Third trimester diet',
  'Pregnancy nutrition requirements',
  'Healthy diet during pregnancy',
  'Prenatal nutrition',
]

export default function PregnancyNutrition() {
  return (
    <main>
      <PageHero eyebrow="Pregnancy Nutrition" h1="Pregnancy Nutrition & Diet Guidance">
        <p>
          Nutrition plays an important role throughout pregnancy. As nutritional needs can change during
          pregnancy, expecting mothers may benefit from appropriate guidance based on their individual
          circumstances.
        </p>
      </PageHero>

      <ServiceSection heading="What a Balanced Pregnancy Diet Looks Like" tint>
        <p>
          A balanced pregnancy diet can include a variety of nutrient-rich foods, appropriate hydration and
          nutrients recommended by qualified healthcare professionals.
        </p>
      </ServiceSection>

      <ServiceSection heading="Pregnancy Diet Guidance">
        <BulletList items={guidanceTopics} columns={2} />
      </ServiceSection>

      <ServiceSection heading="Pregnancy Diet Chart & Meal Planning" tint>
        <p>
          A pregnancy diet chart should not be treated as a universal plan. Nutritional requirements differ
          between individuals. A qualified professional can help you understand suitable food choices and
          nutritional priorities based on your circumstances.
        </p>
      </ServiceSection>

      <ServiceSection heading="Nutrition Throughout Pregnancy">
        <p>Nutritional considerations can change across the first, second and third trimesters.</p>
        <RelatedLinks
          links={[
            { label: 'Pregnancy Journey', to: '/pregnancy-journey/' },
            { label: 'Pregnancy Yoga', to: '/services/pregnancy-yoga/' },
            { label: 'Mental Wellness', to: '/services/mental-wellness/' },
            { label: 'Pregnancy Guidance', to: '/services/pregnancy-guidance/' },
            { label: 'Book a Consultation', to: '/book-consultation/' },
          ]}
        />
      </ServiceSection>
    </main>
  )
}
