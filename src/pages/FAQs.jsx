import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eyebrow, PillLink, serif } from '../components/common/DesignKit.jsx'

const L = (to, children) => (
  <Link to={to} className="text-[#330d3b] underline hover:text-[#7a4f80]">
    {children}
  </Link>
)

const faqs = [
  {
    id: 'faq-1',
    question: 'What is Garbhika?',
    answer: (
      <>
        Garbhika is a pregnancy wellness and support platform providing access to {L('/services/', 'services')}
        , educational resources and community support across different aspects of the{' '}
        {L('/pregnancy-journey/', 'pregnancy journey')}.
      </>
    ),
  },
  {
    id: 'faq-2',
    question: 'What services does Garbhika offer?',
    answer: (
      <>
        Garbhika currently provides services including {L('/services/garbh-sanskar/', 'Garbh Sanskar')},{' '}
        {L('/services/pregnancy-yoga/', 'pregnancy yoga')}, {L('/services/pregnancy-nutrition/', 'pregnancy nutrition')}
        , {L('/services/psychological-support/', 'psychological support')}, {L('/services/mental-wellness/', 'mental wellness')} and{' '}
        {L('/services/pregnancy-guidance/', 'pregnancy guidance')}.
      </>
    ),
  },
  {
    id: 'faq-3',
    question: 'What is Garbh Sanskar?',
    answer: 'Garbh Sanskar refers to traditional prenatal practices associated with creating a positive and mindful pregnancy environment.',
  },
  {
    id: 'faq-4',
    question: 'Is prenatal yoga safe during pregnancy?',
    answer: 'The suitability of yoga during pregnancy varies by individual and stage of pregnancy. Speak with your healthcare provider and work with a qualified prenatal yoga professional when appropriate.',
  },
  {
    id: 'faq-5',
    question: 'What should I eat during pregnancy?',
    answer: 'Nutritional needs vary during pregnancy. A balanced diet generally includes a variety of nutrient-rich foods, but individual dietary requirements should be discussed with an appropriately qualified professional.',
  },
  {
    id: 'faq-6',
    question: 'How can I manage stress during pregnancy?',
    answer: 'Healthy approaches may include appropriate physical activity, rest, relaxation, mindfulness, social support and professional counselling where needed.',
  },
  {
    id: 'faq-7',
    question: 'Does Garbhika provide psychological support?',
    answer: 'Garbhika provides access to psychological support and counselling resources through appropriately qualified professionals.',
  },
  {
    id: 'faq-8',
    question: 'Can first-time mothers use Garbhika?',
    answer: 'Yes. Garbhika provides educational resources and support relevant to first-time mothers as well as those who have experienced pregnancy before.',
  },
  {
    id: 'faq-9',
    question: 'Does Garbhika replace medical care?',
    answer: "No. Garbhika's services and educational resources are intended to complement appropriate medical care, not replace diagnosis, treatment or advice from your healthcare provider.",
  },
  {
    id: 'faq-10',
    question: 'How can I get started?',
    answer: (
      <>
        Explore our {L('/services/', 'Services')}, {L('/pregnancy-journey/', 'Pregnancy Journey')} or{' '}
        {L('/book-consultation/', 'book a consultation')}.
      </>
    ),
  },
]

export default function FAQs() {
  const [open, setOpen] = useState(0)

  return (
    <main className="overflow-hidden">
      <section className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-x-[72px] gap-y-12 px-6 pb-24 pt-[clamp(48px,7vw,96px)]">
        <div className="flex flex-col gap-6 lg:sticky lg:top-[120px]">
          <Eyebrow>FAQs</Eyebrow>
          <h1 className={`${serif} m-0 text-[clamp(40px,5vw,60px)] font-medium leading-[1.06] tracking-[-0.03em] text-[#0f0014]`}>
            Frequently Asked Questions
          </h1>
          <p className="m-0 text-[18px] leading-[1.65] text-[#4d444c]">
            Answers to common questions about Garbhika&apos;s services, Garbh Sanskar, prenatal yoga, nutrition and
            how to get started.
          </p>
          <div className="flex flex-wrap gap-[10px]">
            <PillLink to="/services/">Services</PillLink>
            <PillLink to="/pregnancy-journey/">Pregnancy Journey</PillLink>
            <PillLink to="/book-consultation/" solid>
              Book a Consultation
            </PillLink>
          </div>
        </div>

        <div className="flex flex-col gap-[10px]">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div
                key={faq.id}
                className={`overflow-hidden rounded-[20px] border border-[rgba(208,195,205,0.6)] ${isOpen ? 'bg-white' : 'bg-[#faf1fa]'}`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-6 py-5 text-left"
                >
                  <h3 className={`${serif} m-0 text-[19px] font-medium leading-[1.35] text-[#0f0014]`}>{faq.question}</h3>
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-[#efe5ee] text-[#0f0014]">
                    <span className="material-symbols-outlined !text-xl">{isOpen ? 'remove' : 'add'}</span>
                  </span>
                </button>
                {isOpen && <p className="m-0 px-6 pb-[22px] text-base leading-[1.7] text-[#4d444c]">{faq.answer}</p>}
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
