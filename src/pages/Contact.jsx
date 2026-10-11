import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { submitInquiry, resetInquiryStatus } from '../features/inquiry/inquirySlice.js'
import { validateContactForm } from '../utils/validators.js'
import { contactTeam, officeInfo, contactFaqs } from '../data/team.js'
import { Eyebrow, Glow, DcField, PrimaryButton, Faqs, serif, h1Class, h2SmallClass } from '../components/common/DesignKit.jsx'
import { Link } from 'react-router-dom'

const topicOptions = [
  'Service enquiries',
  'Consultation information',
  'Expert enquiries',
  'Community information',
  'Partnership opportunities',
  'General questions',
]

const related = [
  { label: 'Book a Consultation', to: '/book-consultation/' },
  { label: 'Services', to: '/services/' },
  { label: 'Pregnancy Journey', to: '/pregnancy-journey/' },
  { label: 'Resources', to: '/resources/' },
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

  const info = [
    { icon: 'mail', title: 'Email Us', lines: ['hello@garbhika.com'] },
    { icon: 'location_on', title: 'Our Office', lines: [officeInfo.address, officeInfo.phone] },
    { icon: 'schedule', title: 'Response Time', lines: [`${officeInfo.hours}. We respond within one business day.`] },
    {
      icon: 'emergency',
      title: 'Medical Emergencies',
      lines: [
        'Garbhika is not an emergency service. Please contact your doctor or local emergency services directly for urgent medical needs.',
      ],
      alert: true,
    },
  ]

  return (
    <main className="overflow-hidden">
      <section className="relative mx-auto max-w-[1200px] px-6 pb-14 pt-[clamp(48px,7vw,96px)]">
        <Glow />
        <div className="relative flex max-w-[860px] flex-col gap-6">
          <Eyebrow>Contact</Eyebrow>
          <h1 className={h1Class}>Connect With Garbhika</h1>
          <p className="m-0 max-w-[680px] text-[19px] leading-[1.65] text-[#4d444c] [text-wrap:pretty]">
            Have a question about our pregnancy wellness services, community or consultations? We&apos;re here to
            help you understand the support available through Garbhika.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-6 px-6 pb-24">
        <div className="rounded-[32px] border border-[rgba(208,195,205,0.6)] bg-white p-[clamp(24px,4vw,40px)] shadow-[0_20px_60px_rgba(51,13,59,0.06)]">
          <h2 className={`${serif} m-0 mb-2 text-[32px] font-medium text-[#0f0014]`}>Talk to Our Team</h2>
          <p className="m-0 mb-7 text-base leading-[1.65] text-[#4d444c]">
            Whether you&apos;re looking for pregnancy guidance, Garbh Sanskar, prenatal yoga, nutrition support or
            emotional wellbeing resources, our team can help direct you to the relevant service.
          </p>
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
              <DcField label="Your Name" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="Full name" />
              <DcField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="you@example.com" />
            </div>
            <div className="flex flex-col gap-2 text-[13px] font-semibold text-[#1e1a20]">
              How Can We Help?
              <div className="flex flex-wrap gap-2">
                {topicOptions.map((label) => {
                  const sel = form.topic === label
                  return (
                    <button
                      type="button"
                      key={label}
                      onClick={() => setForm((prev) => ({ ...prev, topic: label }))}
                      aria-pressed={sel}
                      className={`cursor-pointer rounded-full border px-[14px] py-[9px] text-[13px] font-medium transition-colors ${
                        sel
                          ? 'border-[#0f0014] bg-[#0f0014] text-white'
                          : 'border-[#d0c3cd] bg-[#fff7fd] text-[#4d444c] hover:border-[#7a4f80]'
                      }`}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>
            <DcField
              label="Message"
              name="message"
              textarea
              rows={5}
              value={form.message}
              onChange={handleChange}
              error={errors.message}
              placeholder="Tell us a bit about what you need..."
            />
            <PrimaryButton type="submit" className="self-start" isLoading={status === 'loading'}>
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </PrimaryButton>
          </form>
        </div>

        <div className="grid gap-3">
          {info.map((i) => (
            <div
              key={i.title}
              className={`flex gap-[18px] rounded-3xl border border-[rgba(208,195,205,0.5)] p-6 ${i.alert ? 'bg-[#ffdad6]' : 'bg-white'}`}
            >
              <span className={`grid h-11 w-11 flex-none place-items-center rounded-full bg-[#fff7fd] ${i.alert ? 'text-[#ba1a1a]' : 'text-[#0f0014]'}`}>
                <span className="material-symbols-outlined">{i.icon}</span>
              </span>
              <div className="flex flex-col gap-1">
                <h3 className={`${serif} m-0 text-xl font-medium text-[#0f0014]`}>{i.title}</h3>
                {i.lines.map((ln) => (
                  <p key={ln} className="m-0 text-[15px] leading-[1.6] text-[#4d444c]">
                    {ln}
                  </p>
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-wrap gap-2 pt-2">
            {related.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="inline-flex items-center gap-[6px] rounded-full border border-[rgba(15,0,20,0.45)] px-4 py-[9px] text-[13px] text-[#0f0014] no-underline transition-colors hover:bg-[#0f0014] hover:text-white"
              >
                {l.label} <span className="material-symbols-outlined !text-[15px]">arrow_forward</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(208,195,205,0.45)] bg-[#faf1fa]">
        <div className="mx-auto max-w-[1200px] px-6 py-24">
          <h2 className={`${h2SmallClass} mb-2`}>Talk to Someone Specific</h2>
          <p className="m-0 mb-9 text-[17px] text-[#4d444c]">Reach one of our team leads directly for anything specialized.</p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
            {contactTeam.map((m) => (
              <a
                key={m.id}
                href={`mailto:${m.email}`}
                className="flex items-center gap-[18px] rounded-3xl border border-[rgba(208,195,205,0.5)] bg-white p-5 no-underline transition-shadow hover:shadow-[0_18px_45px_rgba(51,13,59,0.1)]"
              >
                <img src={m.image} alt={m.name} loading="lazy" className="h-[72px] w-[72px] flex-none rounded-full object-cover" />
                <span className="flex min-w-0 flex-col gap-[3px]">
                  <span className={`${serif} text-xl text-[#0f0014]`}>{m.name}</span>
                  <span className="text-[13px] font-semibold text-[#7a4f80]">{m.role}</span>
                  <span className="overflow-hidden text-ellipsis text-sm text-[#4d444c]">{m.email}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[860px] px-6 pt-24">
        <h2 className={`${h2SmallClass} mb-7`}>Quick Answers</h2>
        <Faqs faqs={contactFaqs} />
      </section>
    </main>
  )
}
