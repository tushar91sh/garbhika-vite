import { ServiceDetail, InlineLink } from '../../components/common/DesignKit.jsx'

export default function PsychologicalSupport() {
  return (
    <ServiceDetail
      to="/services/psychological-support/"
      eyebrow="Psychological Support"
      title="Psychological Support During Pregnancy"
      lead="Pregnancy can bring significant emotional and psychological changes. Feelings of uncertainty, stress, anxiety or adjustment can sometimes accompany the physical changes of pregnancy."
      sections={[
        {
          heading: 'Emotional and Psychological Changes During Pregnancy',
          paragraphs: [
            'Hormonal changes, lifestyle adjustments, concerns about childbirth and changes in relationships or responsibilities can affect emotional wellbeing. Everyone experiences pregnancy differently.',
          ],
        },
        {
          heading: 'Pregnancy Counselling',
          paragraphs: [
            'Pregnancy counselling can provide a supportive environment where you can discuss emotional concerns, adjustment challenges and other issues related to your pregnancy. Where professional mental-health care is required, support should be provided by appropriately qualified professionals.',
          ],
        },
        {
          heading: 'Emotional Support During Pregnancy',
          paragraphs: ['Having someone to talk to can be valuable during periods of uncertainty or emotional stress.'],
        },
        {
          heading: 'Explore Mental Wellness',
          paragraphs: [
            <>
              Psychological support can be complemented by appropriate wellness practices such as{' '}
              <InlineLink to="/services/mental-wellness/">
                mindfulness, relaxation and stress-management techniques
              </InlineLink>
              .
            </>,
          ],
          links: [
            { label: 'Mental Wellness', to: '/services/mental-wellness/' },
            { label: 'Book a Consultation', to: '/book-consultation/' },
          ],
        },
      ]}
    />
  )
}
