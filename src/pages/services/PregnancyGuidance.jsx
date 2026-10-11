import { ServiceDetail, InlineLink } from '../../components/common/DesignKit.jsx'

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
    <ServiceDetail
      to="/services/pregnancy-guidance/"
      eyebrow="Pregnancy Guidance"
      title="Pregnancy Guidance & Support"
      lead="Pregnancy can bring many questions, especially if you are experiencing it for the first time. Garbhika provides structured pregnancy guidance to help expecting mothers navigate different stages of their journey with greater awareness."
      sections={[
        { heading: 'Guidance for Your Pregnancy Journey', bullets: coverage },
        {
          heading: 'Support for First-Time Mothers',
          paragraphs: [
            'A first pregnancy can involve many unfamiliar experiences. Access to appropriate information and support can help first-time mothers better understand what to expect.',
          ],
        },
        {
          heading: 'Personalised Pregnancy Guidance',
          paragraphs: [
            <>
              Every pregnancy is different. Guidance should take into account individual circumstances rather than
              assuming that one approach works for everyone. Explore your{' '}
              <InlineLink to="/pregnancy-journey/">pregnancy journey</InlineLink> for a stage-by-stage look at what
              support may help.
            </>,
          ],
          links: [
            { label: 'Pregnancy Journey', to: '/pregnancy-journey/' },
            { label: 'Garbh Sanskar', to: '/services/garbh-sanskar/' },
            { label: 'Pregnancy Yoga', to: '/services/pregnancy-yoga/' },
            { label: 'Pregnancy Nutrition', to: '/services/pregnancy-nutrition/' },
            { label: 'Psychological Support', to: '/services/psychological-support/' },
            { label: 'Mental Wellness', to: '/services/mental-wellness/' },
            { label: 'Book a Consultation', to: '/book-consultation/' },
          ],
        },
      ]}
    />
  )
}
