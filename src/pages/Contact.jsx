import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import FormField from '../components/forms/FormField.jsx'
import Button from '../components/common/Button.jsx'
import FAQAccordion from '../components/common/FAQAccordion.jsx'
import FadeIn from '../components/motion/FadeIn.jsx'
import { StaggerGrid, StaggerItem } from '../components/motion/StaggerGrid.jsx'
import TeamContactCard from '../components/cards/TeamContactCard.jsx'
import { submitInquiry, resetInquiryStatus } from '../features/inquiry/inquirySlice.js'
import { validateContactForm } from '../utils/validators.js'
import { contactTeam, officeInfo, contactFaqs } from '../data/team.js'
import { BulletList, RelatedLinks } from '../components/common/ServiceLayout.jsx'

const topicOptions = [
  'Service enquiries',
  'Consultation information',
  'Expert enquiries',
  'Community information',
  'Partnership opportunities',
  'General questions',
]

const initialForm = { name: '', email: '', topic: topicOptions[0], message: '' }

export default function Contact() {
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.inquiry)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateContactForm(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    try {
      await dispatch(submitInquiry(form)).unwrap()
      toast.success("Thank you — we've received your message and will respond within one business day.")
      setForm(initialForm)
      dispatch(resetInquiryStatus())
    } catch {
      toast.error('Something went wrong sending your message. Please try again.')
    }
  }

  return (
    <div className="py-section-padding space-y-section-padding">
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter space-y-6">
        <FadeIn className="max-w-2xl space-y-4">
          <span className="block font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase">
            Contact
          </span>
          <h1 className="font-display-lg text-display-lg text-primary text-[40px] md:text-[48px] leading-tight">
            Connect With Garbhika
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Have a question about our pregnancy wellness services, community or consultations? We&apos;re here
            to help you understand the support available through Garbhika.
          </p>
        </FadeIn>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter space-y-4">
        <FadeIn className="max-w-2xl space-y-4">
          <h2 className="font-headline-lg text-headline-lg text-primary">Talk to Our Team</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Whether you&apos;re looking for pregnancy guidance, Garbh Sanskar, prenatal yoga, nutrition
            support or emotional wellbeing resources, our team can help direct you to the relevant service.
          </p>
        </FadeIn>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter space-y-4">
        <FadeIn className="max-w-2xl space-y-4">
          <h2 className="font-headline-lg text-headline-lg text-primary">How Can We Help?</h2>
          <BulletList items={topicOptions} columns={2} />
          <RelatedLinks
            links={[
              { label: 'Book a Consultation', to: '/book-consultation/' },
              { label: 'Services', to: '/services/' },
              { label: 'Pregnancy Journey', to: '/pregnancy-journey/' },
              { label: 'Resources', to: '/resources/' },
            ]}
          />
        </FadeIn>
      </section>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter space-y-section-padding">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-gutter">
        <FadeIn direction="right" className="md:col-span-3 bg-surface-container-low rounded-2xl p-8 space-y-6">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField label="Your Name" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="Full name" />
              <FormField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <label htmlFor="topic" className="block font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase">
                Topic
              </label>
              <select
                id="topic"
                name="topic"
                value={form.topic}
                onChange={handleChange}
                className="w-full rounded-xl border border-surface-variant bg-surface px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                {topicOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <FormField
              label="Message"
              name="message"
              textarea
              value={form.message}
              onChange={handleChange}
              error={errors.message}
              placeholder="Tell us a bit about what you need..."
            />
            <Button type="submit" className="w-full" isLoading={status === 'loading'}>
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </FadeIn>

        <FadeIn direction="left" delay={0.1} className="md:col-span-2 space-y-6">
          <div className="bg-surface-container-high rounded-2xl p-8 space-y-4">
            <span className="material-symbols-outlined text-primary text-3xl">mail</span>
            <h3 className="font-headline-md text-headline-md text-primary">Email Us</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">hello@garbhika.com</p>
          </div>
          <div className="bg-surface-container-high rounded-2xl p-8 space-y-4">
            <span className="material-symbols-outlined text-primary text-3xl">location_on</span>
            <h3 className="font-headline-md text-headline-md text-primary">Our Office</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">{officeInfo.address}</p>
            <p className="font-body-md text-sm text-on-surface-variant">{officeInfo.phone}</p>
          </div>
          <div className="bg-lavender-soft rounded-2xl p-8 space-y-4">
            <span className="material-symbols-outlined text-primary text-3xl">schedule</span>
            <h3 className="font-headline-md text-headline-md text-primary">Response Time</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">{officeInfo.hours}. We respond within one business day.</p>
          </div>
          <div className="bg-surface-container-high rounded-2xl p-8 space-y-4">
            <span className="material-symbols-outlined text-primary text-3xl">emergency</span>
            <h3 className="font-headline-md text-headline-md text-primary">Medical Emergencies</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Garbhika is not an emergency service. Please contact your doctor or local emergency services
              directly for urgent medical needs.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Team */}
      <section>
        <FadeIn className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <h2 className="font-headline-lg text-headline-lg text-primary">Talk to Someone Specific</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Reach one of our team leads directly for anything specialized.
          </p>
        </FadeIn>
        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-3 gap-gutter">
          {contactTeam.map((member) => (
            <StaggerItem key={member.id}>
              <TeamContactCard {...member} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* Mini FAQ */}
      <section className="bg-surface-container-low rounded-2xl p-8 md:p-16">
        <FadeIn>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-10">Quick Answers</h2>
          <FAQAccordion faqs={contactFaqs} />
        </FadeIn>
      </section>
      </div>
    </div>
  )
}
