import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { PageHero, ServiceSection, RelatedLinks } from '../components/common/ServiceLayout.jsx'
import FormField from '../components/forms/FormField.jsx'
import Button from '../components/common/Button.jsx'
import { submitBooking } from '../features/booking/bookingSlice.js'
import { validateBookingForm } from '../utils/validators.js'

const interestOptions = [
  'Garbh Sanskar',
  'Pregnancy yoga',
  'Pregnancy nutrition',
  'Psychological support',
  'Mental wellness',
  'Pregnancy guidance',
  'Community support',
]

const initialForm = { name: '', email: '', preferredDate: '', notes: '' }

export default function BookConsultation() {
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.booking)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [interests, setInterests] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const toggleInterest = (label) => {
    setInterests((prev) => (prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateBookingForm(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    try {
      await dispatch(submitBooking({ ...form, interests })).unwrap()
      toast.success("Thank you — we've received your request and will confirm by email shortly.")
      setForm(initialForm)
      setInterests([])
    } catch {
      toast.error('Something went wrong sending your request. Please try again.')
    }
  }

  return (
    <main>
      <PageHero eyebrow="Book a Consultation" h1="Start Your Garbhika Journey">
        <p>
          Every pregnancy is different, and the support you need may change throughout your journey. Connect
          with Garbhika to explore the services and guidance relevant to your needs.
        </p>
      </PageHero>

      <ServiceSection heading="What Can We Help You With?" tint>
        <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase mb-2">
          Select all that apply
        </p>
        <div className="flex flex-wrap gap-3 max-w-3xl">
          {interestOptions.map((label) => (
            <button
              type="button"
              key={label}
              onClick={() => toggleInterest(label)}
              aria-pressed={interests.includes(label)}
              className={`px-4 py-2 rounded-full font-body-md text-sm border transition-colors duration-200 ${
                interests.includes(label)
                  ? 'bg-primary text-on-primary border-primary'
                  : 'bg-surface-bright text-on-surface-variant border-surface-variant hover:border-primary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </ServiceSection>

      <ServiceSection heading="A Personalised Approach">
        <p>
          Our team can help you understand the available support and connect you with the relevant
          professional or service.
        </p>
      </ServiceSection>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pb-section-padding">
        <div className="bg-surface-container-low rounded-2xl p-8 md:p-12 max-w-2xl">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                label="Your Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Full name"
              />
              <FormField
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="you@example.com"
              />
            </div>
            <FormField
              label="Preferred Date"
              name="preferredDate"
              type="date"
              value={form.preferredDate}
              onChange={handleChange}
              error={errors.preferredDate}
            />
            <FormField
              label="Anything you'd like to share (optional)"
              name="notes"
              textarea
              value={form.notes}
              onChange={handleChange}
              placeholder="A little context helps our team prepare."
            />
            <Button type="submit" className="w-full" isLoading={status === 'loading'}>
              {status === 'loading' ? 'Sending Request...' : 'Confirm Consultation Request'}
            </Button>
          </form>
        </div>
      </section>

      <ServiceSection heading="Ready to Begin?" tint>
        <p>Take the next step towards a more informed and supported pregnancy journey.</p>
        <RelatedLinks links={[{ label: 'Services', to: '/services/' }, { label: 'Contact Us', to: '/contact-us/' }]} />
      </ServiceSection>
    </main>
  )
}
