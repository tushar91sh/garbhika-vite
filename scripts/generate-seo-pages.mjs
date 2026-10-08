import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { siteFaqs } from '../src/data/faqs.js'

const pages = {
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

const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const dist = resolve('dist')
const rawTemplate = await readFile(resolve(dist, 'index.html'), 'utf8')
const template = rawTemplate
  .replace(/\s*<meta\s+name=["']description["'][^>]*>/gi, '')
  .replace(/\s*<link\s+rel=["']canonical["'][^>]*>/gi, '')
  .replace(/\s*<meta\s+property=["']og:[^"']+["'][^>]*>/gi, '')

for (const [route, [title, description]] of Object.entries(pages)) {
  const canonical = `https://garbhika.com${route}`
  const schema = route === '/faqs/' ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: siteFaqs.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) })}</script>` : ''
  const tags = [
    `<meta name="description" content="${escape(description)}">`,
    `<link rel="canonical" href="${canonical}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:title" content="${escape(title)}">`,
    `<meta property="og:description" content="${escape(description)}">`,
    `<meta property="og:url" content="${canonical}">`,
    schema,
  ].filter(Boolean).join('\n    ')
  const html = template.replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`).replace('</head>', `    ${tags}\n  </head>`)
  const output = route === '/' ? resolve(dist, 'index.html') : resolve(dist, route.slice(1), 'index.html')
  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, html)
}

console.log(`Generated SEO entry files for ${Object.keys(pages).length} routes.`)
