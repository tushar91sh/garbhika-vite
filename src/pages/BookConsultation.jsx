import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { submitBooking } from '../features/booking/bookingSlice.js'
import { validateBookingForm } from '../utils/validators.js'
import { Eyebrow, DcField, PrimaryButton, PillLink, serif, h2SmallClass } from '../components/common/DesignKit.jsx'

const interestOptions = [
  ['Garbh Sanskar', 'auto_awesome'],
  ['Pregnancy yoga', 'self_improvement'],
  ['Pregnancy nutrition', 'restaurant'],
  ['Psychological support', 'psychiatry'],
  ['Mental wellness', 'spa'],
  ['Pregnancy guidance', 'explore'],
  ['Community support', 'forum'],
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
    <main className="overflow-hidden">
      <section className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-12 px-6 pb-24 pt-[clamp(40px,6vw,80px)]">
        <div className="flex flex-col gap-6">
          <Eyebrow>Book a Consultation</Eyebrow>
          <h1 className={`${serif} m-0 text-[clamp(40px,5.6vw,64px)] font-medium leading-[1.06] tracking-[-0.03em] text-[#0f0014]`}>
            Start Your Garbhika Journey
          </h1>
          <p className="m-0 text-[19px] leading-[1.65] text-[#4d444c] [text-wrap:pretty]">
            Every pregnancy is different, and the support you need may change throughout your journey. Connect
            with Garbhika to explore the services and guidance relevant to your needs.
          </p>
          <div className="mt-3 flex flex-col gap-3 rounded-[26px] border border-[rgba(208,195,205,0.5)] bg-[#faf1fa] p-7">
            <span className="material-symbols-outlined !text-[28px] text-[#7a4f80]">diversity_1</span>
            <h2 className={`${serif} m-0 text-[26px] font-medium text-[#0f0014]`}>A Personalised Approach</h2>
            <p className="m-0 text-base leading-[1.65] text-[#4d444c]">
              Our team can help you understand the available support and connect you with the relevant
              professional or service.
            </p>
          </div>
        </div>

        <div className="rounded-[32px] border border-[rgba(208,195,205,0.6)] bg-white p-[clamp(24px,4vw,40px)] shadow-[0_24px_70px_rgba(51,13,59,0.08)]">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div className="flex flex-col gap-[10px]">
              <h2 className={`${serif} m-0 text-[26px] font-medium text-[#0f0014]`}>What Can We Help You With?</h2>
              <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#7a4f80]">Select all that apply</p>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map(([label, icon]) => {
                  const sel = interests.includes(label)
                  return (
                    <button
                      type="button"
                      key={label}
                      onClick={() => toggleInterest(label)}
                      aria-pressed={sel}
                      className={`inline-flex cursor-pointer items-center gap-[6px] rounded-full border px-4 py-[10px] text-sm transition-colors ${
                        sel
                          ? 'border-[#0f0014] bg-[#0f0014] text-white'
                          : 'border-[#d0c3cd] bg-[#fff7fd] text-[#4d444c] hover:border-[#7a4f80]'
                      }`}
                    >
                      <span className="material-symbols-outlined !text-[16px]">{sel ? 'check' : icon}</span>
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="h-px bg-[#efe5ee]" />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
              <DcField label="Your Name" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="Full name" />
              <DcField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="you@example.com" />
            </div>
            <DcField label="Preferred Date" name="preferredDate" type="date" value={form.preferredDate} onChange={handleChange} error={errors.preferredDate} />
            <DcField
              label="Anything you'd like to share (optional)"
              name="notes"
              textarea
              rows={4}
              value={form.notes}
              onChange={handleChange}
              placeholder="A little context helps our team prepare."
            />
            <PrimaryButton type="submit" isLoading={status === 'loading'}>
              {status === 'loading' ? 'Sending Request...' : 'Confirm Consultation Request'}
            </PrimaryButton>
          </form>
        </div>
      </section>

      <section className="border-t border-[rgba(208,195,205,0.45)] bg-[#faf1fa]">
        <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-x-16 gap-y-6 px-6 py-[clamp(56px,8vw,96px)]">
          <h2 className={h2SmallClass}>Ready to Begin?</h2>
          <div className="flex flex-col gap-5">
            <p className="m-0 text-[18px] leading-[1.7] text-[#4d444c]">
              Take the next step towards a more informed and supported pregnancy journey.
            </p>
            <div className="flex flex-wrap gap-[10px]">
              <PillLink to="/services/">Services</PillLink>
              <PillLink to="/contact-us/">Contact Us</PillLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
