import { ServiceDetail, InlineLink } from '../../components/common/DesignKit.jsx'

const stressManagement = [
  'Mindfulness',
  'Relaxation',
  'Breathing practices',
  'Appropriate physical activity',
  'Rest and sleep routines',
  'Social and community support',
]

export default function MentalWellness() {
  return (
    <ServiceDetail
      to="/services/mental-wellness/"
      eyebrow="Mental Wellness"
      title="Mental Wellness During Pregnancy"
      lead="Pregnancy can affect how you feel physically and emotionally. Looking after your mental wellbeing can be an important part of maintaining overall wellness during this changing period."
      sections={[
        {
          heading: 'Supporting Mental Wellbeing During Pregnancy',
          paragraphs: [
            'Mental wellbeing can involve how you manage everyday changes, emotions, stress and uncertainty. Garbhika encourages expecting mothers to explore appropriate wellness practices while seeking professional support when needed.',
          ],
        },
        {
          heading: 'Pregnancy Stress Management',
          bullets: stressManagement,
          afterBullets: [
            <InlineLink key="counselling" to="/services/psychological-support/">
              Professional counselling when needed
            </InlineLink>,
          ],
        },
        {
          heading: 'Pregnancy Mindfulness',
          paragraphs: [
            'Mindfulness practices can help some people focus their attention on the present moment and develop greater awareness of their thoughts and feelings.',
          ],
        },
        {
          heading: 'Pregnancy Self-Care',
          paragraphs: [
            'Self-care during pregnancy can include making time for rest, movement, nutrition, social connection and emotional support.',
          ],
          links: [
            { label: 'Pregnancy Nutrition', to: '/services/pregnancy-nutrition/' },
            { label: 'Pregnancy Yoga', to: '/services/pregnancy-yoga/' },
            { label: 'Psychological Support', to: '/services/psychological-support/' },
            { label: 'Book a Consultation', to: '/book-consultation/' },
          ],
        },
      ]}
    />
  )
}
