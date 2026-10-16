import { useNavigate } from 'react-router-dom'
import JourneyForm from '../components/forms/JourneyForm.jsx'
export default function Onboarding() {
  const navigate = useNavigate()
  return (
    <section className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-3 font-serif text-4xl">Personalize Your Journey</h1>
      <p className="mb-8">
        Tell us which support matters to you. You can update these preferences
        from your dashboard.
      </p>
      <JourneyForm onSaved={() => navigate('/dashboard', { replace: true })} />
    </section>
  )
}
