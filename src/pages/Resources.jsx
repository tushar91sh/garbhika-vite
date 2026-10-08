import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { resourceCategories, resources } from '../data/resources.js'
import FadeIn from '../components/motion/FadeIn.jsx'
import { StaggerGrid, StaggerItem } from '../components/motion/StaggerGrid.jsx'
import { subscribeNewsletter, resetNewsletterStatus } from '../features/newsletter/newsletterSlice.js'
import { isValidEmail } from '../utils/validators.js'
import Button from '../components/common/Button.jsx'
import { ServiceSection, BulletList, RelatedLinks } from '../components/common/ServiceLayout.jsx'

const guideTopics = [
  'First trimester pregnancy',
  'Second trimester pregnancy',
  'Third trimester pregnancy',
  'Pregnancy stages',
  'Pregnancy timeline',
  'Pregnancy week-by-week information',
]

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.newsletter)

  const featured = resources[0]
  const rest = resources.slice(1)

  const filtered = useMemo(() => {
    return rest.filter((r) => {
      const matchesCategory = activeCategory === 'All' || r.category === activeCategory
      const matchesQuery =
        !query ||
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.excerpt.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query, rest])

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address.')
      return
    }
    setEmailError('')
    try {
      await dispatch(subscribeNewsletter(email)).unwrap()
      toast.success('You’re subscribed — new guides land in your inbox monthly.')
      setEmail('')
      dispatch(resetNewsletterStatus())
    } catch {
      toast.error('Could not subscribe right now. Please try again.')
    }
  }

  return (
    <div>
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pt-16 md:pt-24 pb-12">
        <FadeIn className="max-w-3xl space-y-6">
          <span className="block font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase">
            Resources
          </span>
          <h1 className="font-display-lg text-display-lg text-primary text-[40px] md:text-[56px] leading-tight">
            Pregnancy Resources &amp; Education
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Pregnancy can bring many questions. Garbhika&apos;s resources provide educational information
            covering pregnancy wellness, nutrition, movement, emotional wellbeing and different stages of
            pregnancy.
          </p>
        </FadeIn>
      </section>

      <ServiceSection heading="Pregnancy Guides" tint>
        <BulletList items={guideTopics} columns={2} />
        <RelatedLinks links={[{ label: 'Pregnancy Journey', to: '/pregnancy-journey/' }]} />
      </ServiceSection>

      <ServiceSection heading="Pregnancy Nutrition">
        <p>Learn about pregnancy diet, healthy eating, foods to eat during pregnancy and nutritional considerations.</p>
        <RelatedLinks links={[{ label: 'Pregnancy Nutrition', to: '/services/pregnancy-nutrition/' }]} />
      </ServiceSection>

      <ServiceSection heading="Prenatal Yoga" tint>
        <p>Discover information about pregnancy yoga, prenatal yoga, pregnancy exercises and movement during pregnancy.</p>
        <RelatedLinks links={[{ label: 'Pregnancy Yoga', to: '/services/pregnancy-yoga/' }]} />
      </ServiceSection>

      <ServiceSection heading="Garbh Sanskar">
        <p>Learn about Garbh Sanskar, traditional prenatal practices, activities and related approaches to mindful pregnancy.</p>
        <RelatedLinks links={[{ label: 'Garbh Sanskar', to: '/services/garbh-sanskar/' }]} />
      </ServiceSection>

      <ServiceSection heading="Mental & Emotional Wellbeing" tint>
        <p>Explore information about pregnancy stress, emotional changes, mindfulness, relaxation and mental wellbeing.</p>
        <RelatedLinks
          links={[
            { label: 'Psychological Support', to: '/services/psychological-support/' },
            { label: 'Mental Wellness', to: '/services/mental-wellness/' },
          ]}
        />
      </ServiceSection>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-padding space-y-section-padding">
      {/* Featured article */}
      <FadeIn className="bg-surface-container-low rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row">
        <div className="md:w-1/2 h-64 md:h-auto">
          <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
        </div>
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-4">
          <span className="font-label-caps text-label-caps text-primary-container tracking-widest uppercase">
            Featured · {featured.category} · {featured.readTime}
          </span>
          <h2 className="font-headline-lg text-[28px] md:text-headline-lg text-primary leading-snug">{featured.title}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">{featured.excerpt}</p>
          <span className="text-primary font-body-md text-body-md w-fit hover:opacity-70 transition-opacity">
            Read the full guide &rarr;
          </span>
        </div>
      </FadeIn>

      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {resourceCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full font-body-md text-sm transition-colors duration-200 ${
                activeCategory === category
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
            search
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resources..."
            className="w-full rounded-full border border-surface-variant bg-surface pl-10 pr-4 py-2.5 font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-on-surface-variant font-body-md py-16">
          No resources match your search yet. Try a different keyword or category.
        </p>
      ) : (
        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filtered.map((resource) => (
            <StaggerItem key={resource.id}>
              <article className="bg-surface-container-low rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                <div className="h-48 overflow-hidden">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow space-y-3">
                  <span className="font-label-caps text-label-caps text-primary-container tracking-widest uppercase">
                    {resource.category} · {resource.readTime}
                  </span>
                  <h3 className="font-headline-md text-[20px] text-primary leading-snug">{resource.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant flex-grow">{resource.excerpt}</p>
                  <span className="text-primary font-body-md text-sm hover:opacity-70 transition-opacity w-fit">
                    Read More &rarr;
                  </span>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      )}

      {/* Newsletter */}
      <FadeIn className="bg-primary rounded-2xl px-8 py-12 md:px-16 text-center space-y-6">
        <h2 className="font-headline-lg text-headline-lg text-surface-bright">Never Miss a New Guide</h2>
        <p className="font-body-md text-body-md text-surface-bright/80 max-w-lg mx-auto">
          One thoughtful email a month with our newest resources, curated by our expert circle.
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <div className="flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
              className="w-full rounded-full border border-surface-bright/30 bg-surface-bright/10 text-surface-bright placeholder:text-surface-bright/60 px-5 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-surface-bright/50"
            />
            {emailError && <p className="text-error-container text-sm mt-2">{emailError}</p>}
          </div>
          <Button type="submit" variant="secondary" className="!bg-surface-bright !text-primary" isLoading={status === 'loading'}>
            Subscribe
          </Button>
        </form>
      </FadeIn>
      </div>

      <ServiceSection heading="Continue Learning" tint>
        <p>
          Our resources are intended to support education and awareness. They do not replace personalised
          medical advice or professional healthcare.
        </p>
        <RelatedLinks links={[{ label: 'Pregnancy Journey', to: '/pregnancy-journey/' }]} />
      </ServiceSection>
    </div>
  )
}
