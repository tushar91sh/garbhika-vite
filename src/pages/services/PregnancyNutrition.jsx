import { ServiceDetail } from '../../components/common/DesignKit.jsx'

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
    <ServiceDetail
      to="/services/pregnancy-nutrition/"
      eyebrow="Pregnancy Nutrition"
      title="Pregnancy Nutrition & Diet Guidance"
      lead="Nutrition plays an important role throughout pregnancy. As nutritional needs can change during pregnancy, expecting mothers may benefit from appropriate guidance based on their individual circumstances."
      sections={[
        {
          heading: 'What a Balanced Pregnancy Diet Looks Like',
          paragraphs: [
            'A balanced pregnancy diet can include a variety of nutrient-rich foods, appropriate hydration and nutrients recommended by qualified healthcare professionals.',
          ],
        },
        { heading: 'Pregnancy Diet Guidance', bullets: guidanceTopics },
        {
          heading: 'Pregnancy Diet Chart & Meal Planning',
          paragraphs: [
            'A pregnancy diet chart should not be treated as a universal plan. Nutritional requirements differ between individuals. A qualified professional can help you understand suitable food choices and nutritional priorities based on your circumstances.',
          ],
        },
        {
          heading: 'Nutrition Throughout Pregnancy',
          paragraphs: ['Nutritional considerations can change across the first, second and third trimesters.'],
          links: [
            { label: 'Pregnancy Journey', to: '/pregnancy-journey/' },
            { label: 'Pregnancy Yoga', to: '/services/pregnancy-yoga/' },
            { label: 'Mental Wellness', to: '/services/mental-wellness/' },
            { label: 'Pregnancy Guidance', to: '/services/pregnancy-guidance/' },
            { label: 'Book a Consultation', to: '/book-consultation/' },
          ],
        },
      ]}
    />
  )
}
