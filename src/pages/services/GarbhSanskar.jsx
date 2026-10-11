import { ServiceDetail, InlineLink } from '../../components/common/DesignKit.jsx'

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
    <ServiceDetail
      to="/services/garbh-sanskar/"
      eyebrow="Garbh Sanskar & Coaching"
      title="Garbh Sanskar for a Mindful Pregnancy Journey"
      lead="Garbh Sanskar is traditionally associated with practices intended to create a positive and mindful environment during pregnancy. At Garbhika, we provide structured guidance to help expecting mothers explore these practices as part of their overall pregnancy wellness journey."
      sections={[
        {
          heading: 'What Is Garbh Sanskar?',
          paragraphs: [
            'Garbh Sanskar refers to traditional prenatal practices associated with the physical, emotional and mental wellbeing of the mother and her developing baby. Depending on the approach, practices may include mindfulness, music, positive engagement, meditation and other activities intended to encourage a calm and positive pregnancy environment.',
          ],
        },
        { heading: 'Garbh Sanskar During Pregnancy', bullets: practiceAreas },
        {
          heading: 'Garbh Sanskar Classes',
          paragraphs: [
            'Garbhika offers structured guidance for expecting mothers interested in exploring Garbh Sanskar. It is positioned as one component of a broader pregnancy wellness journey and not as a replacement for medical care.',
          ],
        },
        {
          heading: 'Garbh Sanskar for Different Trimesters',
          paragraphs: [
            <>
              The <InlineLink to="/pregnancy-journey/">pregnancy journey</InlineLink> changes from one trimester to
              another. Garbh Sanskar activities can therefore be approached with consideration for the mother&apos;s
              stage and individual needs.
            </>,
          ],
          links: [
            { label: 'Pregnancy Journey', to: '/pregnancy-journey/' },
            { label: 'Resources', to: '/resources/' },
            { label: 'Book a Consultation', to: '/book-consultation/' },
          ],
        },
      ]}
    />
  )
}
