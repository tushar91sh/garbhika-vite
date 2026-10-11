import LegalShell from '../components/common/LegalShell.jsx'

const sections = [
  {
    heading: 'Information We Collect',
    body: 'We collect information you provide directly — such as your name, email address, and messages sent through our contact and booking forms — along with basic usage data to help us improve the site.',
  },
  {
    heading: 'How We Use Information',
    body: 'We use your information to respond to inquiries, schedule sessions with experts, send you requested updates, and improve the Garbhika experience. We do not sell your personal information.',
  },
  {
    heading: 'Medical Disclaimer',
    body: 'Garbhika is complementary to clinical care and does not replace medical advice. Any health information shared through the platform is for support purposes only.',
  },
  { heading: 'Contact Us', body: 'Questions about this policy can be sent to', mail: true },
]

export default function PrivacyPolicy() {
  return (
    <LegalShell
      active="privacy"
      title="Privacy Policy"
      intro={'Garbhika ("we," "our," "us") respects your privacy. This policy explains what information we collect when you use our website and services, how we use it, and the choices you have.'}
      sections={sections}
    />
  )
}
