import { Link } from 'react-router-dom'
import { PageHero, RelatedLinks } from '../components/common/ServiceLayout.jsx'
import FadeIn from '../components/motion/FadeIn.jsx'

const L = (to, children) => (
  <Link to={to} className="text-primary underline hover:opacity-70">
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
    answer:
      'Garbh Sanskar refers to traditional prenatal practices associated with creating a positive and mindful pregnancy environment.',
  },
  {
    id: 'faq-4',
    question: 'Is prenatal yoga safe during pregnancy?',
    answer:
      'The suitability of yoga during pregnancy varies by individual and stage of pregnancy. Speak with your healthcare provider and work with a qualified prenatal yoga professional when appropriate.',
  },
  {
    id: 'faq-5',
    question: 'What should I eat during pregnancy?',
    answer:
      'Nutritional needs vary during pregnancy. A balanced diet generally includes a variety of nutrient-rich foods, but individual dietary requirements should be discussed with an appropriately qualified professional.',
  },
  {
    id: 'faq-6',
    question: 'How can I manage stress during pregnancy?',
    answer:
      'Healthy approaches may include appropriate physical activity, rest, relaxation, mindfulness, social support and professional counselling where needed.',
  },
  {
    id: 'faq-7',
    question: 'Does Garbhika provide psychological support?',
    answer:
      'Garbhika provides access to psychological support and counselling resources through appropriately qualified professionals.',
  },
  {
    id: 'faq-8',
    question: 'Can first-time mothers use Garbhika?',
    answer:
      'Yes. Garbhika provides educational resources and support relevant to first-time mothers as well as those who have experienced pregnancy before.',
  },
  {
    id: 'faq-9',
    question: 'Does Garbhika replace medical care?',
    answer:
      "No. Garbhika's services and educational resources are intended to complement appropriate medical care, not replace diagnosis, treatment or advice from your healthcare provider.",
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
  return (
    <main>
      <PageHero eyebrow="FAQs" h1="Frequently Asked Questions">
        <p>Answers to common questions about Garbhika&apos;s services, Garbh Sanskar, prenatal yoga, nutrition and how to get started.</p>
      </PageHero>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pb-section-padding">
        <FadeIn className="bg-surface-container-low rounded-2xl p-8 md:p-16 divide-y divide-surface-variant">
          {faqs.map((faq) => (
            <details key={faq.id} className="py-6 group">
              <summary className="flex justify-between items-center gap-4 cursor-pointer list-none">
                <h3 className="font-headline-md text-[20px] text-primary m-0">{faq.question}</h3>
                <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-45 flex-shrink-0">
                  add
                </span>
              </summary>
              <p className="mt-4 font-body-md text-body-md text-on-surface-variant max-w-3xl">{faq.answer}</p>
            </details>
          ))}
        </FadeIn>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pb-section-padding">
        <RelatedLinks
          links={[
            { label: 'Services', to: '/services/' },
            { label: 'Pregnancy Journey', to: '/pregnancy-journey/' },
            { label: 'Book a Consultation', to: '/book-consultation/' },
          ]}
        />
      </section>
    </main>
  )
}
