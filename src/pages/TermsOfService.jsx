import LegalShell from '../components/common/LegalShell.jsx'

const sections = [
  {
    heading: 'Acceptance of Terms',
    body: 'By accessing or using Garbhika, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.',
  },
  {
    heading: 'Not a Medical Provider',
    body: 'Garbhika provides holistic wellness coaching, community, and complementary support. We are not a substitute for licensed medical care. Always consult a qualified healthcare provider for medical decisions.',
  },
  {
    heading: 'Bookings & Memberships',
    body: 'Sessions booked through Garbhika are subject to expert availability. Membership plans renew automatically unless cancelled prior to the renewal date.',
  },
  {
    heading: 'Changes to These Terms',
    body: 'We may update these terms from time to time. Continued use of Garbhika after changes constitutes acceptance of the revised terms.',
  },
]

export default function TermsOfService() {
  return <LegalShell active="terms" title="Terms of Service" sections={sections} />
}
