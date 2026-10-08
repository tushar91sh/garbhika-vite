import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { siteFaqs } from '../../data/faqs.js'

const siteUrl = 'https://garbhika.com'
const seo = {
  '/': ['Garbhika | Pregnancy Wellness & Support for Expecting Mothers', 'Garbhika brings together Garbh Sanskar, prenatal yoga, pregnancy nutrition and emotional wellbeing support for every stage of your pregnancy journey.'],
  '/about-us/': ['About Garbhika | Pregnancy Wellness & Support Platform', 'Learn how Garbhika supports expecting mothers with expert-led pregnancy services, educational resources and a community built around maternal wellbeing.'],
  '/services/': ['Pregnancy Care & Wellness Services | Garbhika', "Explore Garbhika's pregnancy services: Garbh Sanskar, prenatal yoga, nutrition, psychological support, mental wellness and structured pregnancy guidance."],
  '/services/garbh-sanskar/': ['Garbh Sanskar Classes & Coaching | Garbhika', 'Structured Garbh Sanskar guidance for expecting mothers: mindful practices, music, meditation and lifestyle support through every trimester.'],
  '/services/pregnancy-yoga/': ['Prenatal & Pregnancy Yoga Classes | Garbhika', 'Pregnancy-appropriate yoga, movement and breathing practices with qualified guidance for the first, second and third trimesters.'],
  '/services/pregnancy-nutrition/': ['Pregnancy Nutrition & Diet Guidance | Garbhika', 'Understand pregnancy nutrition, trimester-wise dietary needs and meal planning with guidance from qualified professionals.'],
  '/services/psychological-support/': ['Psychological Support & Pregnancy Counselling | Garbhika', 'Speak with qualified professionals about the emotional and psychological changes of pregnancy, from stress and anxiety to adjustment concerns.'],
  '/services/mental-wellness/': ['Mental Wellness During Pregnancy | Garbhika', 'Mindfulness, relaxation and stress-management support for emotional wellbeing throughout pregnancy, alongside professional care when it is needed.'],
  '/services/pregnancy-guidance/': ['Pregnancy Guidance & Support for Expecting Mothers | Garbhika', 'Structured pregnancy guidance from preparation through postpartum, with dedicated support for first-time mothers.'],
  '/experts/': ['Our Pregnancy Wellness Experts | Garbhika', 'Meet the nutritionists, prenatal yoga professionals, counsellors and Garbh Sanskar guides who support expecting mothers at Garbhika.'],
  '/pregnancy-journey/': ['Your Pregnancy Journey: Stages & Trimesters | Garbhika', 'A stage-by-stage guide to pregnancy: preconception, the first, second and third trimesters, birth preparation and postpartum recovery.'],
  '/community/': ['Pregnancy Community & Support Groups | Garbhika', 'Connect with other expecting mothers, share experiences and join wellness sessions in the Garbhika pregnancy community.'],
  '/resources/': ['Pregnancy Resources, Guides & Education | Garbhika', 'Educational pregnancy resources covering trimesters, nutrition, prenatal yoga, Garbh Sanskar and emotional wellbeing.'],
  '/success-stories/': ['Pregnancy & Motherhood Stories | Garbhika', 'Real experiences from the Garbhika community on pregnancy, wellness practices and the transition into motherhood.'],
  '/faqs/': ['Pregnancy FAQs | Garbhika', "Answers to common questions about Garbhika's pregnancy services, Garbh Sanskar, prenatal yoga, nutrition and how to get started."],
  '/contact-us/': ['Contact Garbhika | Pregnancy Support Enquiries', 'Get in touch with the Garbhika team about pregnancy wellness services, consultations, community access or partnership opportunities.'],
  '/book-consultation/': ['Book a Pregnancy Consultation | Garbhika', 'Book a consultation with Garbhika to find the pregnancy support, services and guidance that suit your stage and your needs.'],
}

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) { element = document.createElement('meta'); document.head.appendChild(element) }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
}

export default function Seo() {
  const { pathname } = useLocation()
  useEffect(() => {
    const normalized = pathname === '/' ? '/' : `${pathname.replace(/\/+$/, '')}/`
    const [title, description] = seo[normalized] || ['Garbhika', 'Pregnancy wellness, education and support from Garbhika.']
    const canonicalUrl = `${siteUrl}${normalized}`
    document.title = title
    upsertMeta('meta[name="description"]', { name: 'description', content: description })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical) }
    canonical.href = canonicalUrl
    const existing = document.getElementById('faq-page-schema')
    if (normalized === '/faqs/') {
      const script = existing || document.createElement('script')
      script.id = 'faq-page-schema'; script.type = 'application/ld+json'
      script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: siteFaqs.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) })
      if (!existing) document.head.appendChild(script)
    } else existing?.remove()
  }, [pathname])
  return null
}
