import { ServiceDetail } from '../../components/common/DesignKit.jsx'

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
    <ServiceDetail
      to="/services/pregnancy-yoga/"
      eyebrow="Pregnancy Yoga"
      title="Pregnancy Yoga & Prenatal Yoga"
      lead="Pregnancy brings continuous physical changes. Appropriate movement, breathing and relaxation practices can help expecting mothers stay connected with their changing bodies."
      sections={[
        {
          heading: 'What Is Prenatal Yoga?',
          paragraphs: [
            'Prenatal yoga is a form of yoga adapted for pregnancy. Depending on the stage of pregnancy, certain poses, movements and levels of intensity may need to be modified.',
            'If you are considering starting a new exercise routine during pregnancy, consult your healthcare provider where appropriate.',
          ],
        },
        { heading: 'Pregnancy Yoga for Different Trimesters', bullets: trimesterPractices },
        {
          heading: 'Pregnancy Yoga Classes',
          paragraphs: [
            "Whether you're looking for prenatal yoga classes, pregnancy yoga classes near you or online pregnancy yoga classes, Garbhika can help you explore suitable support options.",
          ],
        },
        {
          heading: 'Potential Benefits of Prenatal Yoga',
          paragraphs: [
            'Pregnancy-appropriate yoga may support flexibility, body awareness, relaxation and mindful breathing. Individual suitability varies, and exercises should be adapted according to personal circumstances.',
          ],
          links: [
            { label: 'Pregnancy Journey', to: '/pregnancy-journey/' },
            { label: 'Pregnancy Nutrition', to: '/services/pregnancy-nutrition/' },
            { label: 'Mental Wellness', to: '/services/mental-wellness/' },
            { label: 'Book a Consultation', to: '/book-consultation/' },
          ],
        },
      ]}
    />
  )
}
