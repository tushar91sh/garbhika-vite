import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { resourceCategories, resources } from '../data/resources.js'
import FadeIn from '../components/motion/FadeIn.jsx'
import { StaggerGrid, StaggerItem } from '../components/motion/StaggerGrid.jsx'
import { subscribeNewsletter, resetNewsletterStatus } from '../features/newsletter/newsletterSlice.js'
import { isValidEmail } from '../utils/validators.js'
import {
  SubpageHero,
  PillLink,
  PillLinkSm,
  serif,
  wrap,
  bandClass,
} from '../components/common/DesignKit.jsx'

const guideTopics = [
  'First trimester pregnancy',
  'Second trimester pregnancy',
  'Third trimester pregnancy',
  'Pregnancy stages',
  'Pregnancy timeline',
  'Pregnancy week-by-week information',
]

const topics = [
  {
    icon: 'restaurant',
    heading: 'Pregnancy Nutrition',
    body: 'Learn about pregnancy diet, healthy eating, foods to eat during pregnancy and nutritional considerations.',
    links: [{ label: 'Pregnancy Nutrition', to: '/services/pregnancy-nutrition/' }],
  },
  {
    icon: 'self_improvement',
    heading: 'Prenatal Yoga',
    body: 'Discover information about pregnancy yoga, prenatal yoga, pregnancy exercises and movement during pregnancy.',
    links: [{ label: 'Pregnancy Yoga', to: '/services/pregnancy-yoga/' }],
  },
  {
    icon: 'auto_awesome',
    heading: 'Garbh Sanskar',
    body: 'Learn about Garbh Sanskar, traditional prenatal practices, activities and related approaches to mindful pregnancy.',
    links: [{ label: 'Garbh Sanskar', to: '/services/garbh-sanskar/' }],
  },
  {
    icon: 'spa',
    heading: 'Mental & Emotional Wellbeing',
    body: 'Explore information about pregnancy stress, emotional changes, mindfulness, relaxation and mental wellbeing.',
    links: [
      { label: 'Psychological Support', to: '/services/psychological-support/' },
      { label: 'Mental Wellness', to: '/services/mental-wellness/' },
    ],
  },
]

const iconBadge = 'grid h-12 w-12 place-items-center rounded-[14px] bg-[#efe5ee] text-[#0f0014]'

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

  const loading = status === 'loading'

  return (
    <div>
      <SubpageHero eyebrow="Resources" title="Pregnancy Resources & Education">
        Pregnancy can bring many questions. Garbhika&apos;s resources provide educational information
        covering pregnancy wellness, nutrition, movement, emotional wellbeing and different stages of
        pregnancy.
      </SubpageHero>

      {/* Guides & topics */}
      <section className={bandClass}>
        <div className={`${wrap} py-[clamp(56px,8vw,96px)]`}>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-4">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-6 rounded-[26px] border border-[rgba(208,195,205,0.5)] bg-white p-[30px] [grid-column:1/-1]">
              <div className="flex flex-col items-start gap-[14px]">
                <span className={iconBadge}>
                  <span className="material-symbols-outlined">menu_book</span>
                </span>
                <h3 className={`${serif} m-0 text-[26px] font-medium text-[#0f0014]`}>Pregnancy Guides</h3>
                <PillLink to="/pregnancy-journey/">Pregnancy Journey</PillLink>
              </div>
              <ul className="m-0 flex list-none flex-wrap content-start gap-2 p-0">
                {guideTopics.map((g) => (
                  <li
                    key={g}
                    className="rounded-full border border-[rgba(208,195,205,0.55)] bg-[#faf1fa] px-4 py-[10px] text-sm text-[#1e1a20]"
                  >
                    {g}
                  </li>
                ))}
              </ul>
            </div>
            {topics.map((topic) => (
              <div
                key={topic.heading}
                className="flex flex-col gap-[14px] rounded-[26px] border border-[rgba(208,195,205,0.5)] bg-white p-[30px]"
              >
                <span className={iconBadge}>
                  <span className="material-symbols-outlined">{topic.icon}</span>
                </span>
                <h3 className={`${serif} m-0 text-[24px] font-medium text-[#0f0014]`}>{topic.heading}</h3>
                <p className="m-0 flex-1 text-[15px] leading-[1.65] text-[#4d444c]">{topic.body}</p>
                <div className="flex flex-wrap gap-2">
                  {topic.links.map((l) => (
                    <PillLinkSm key={l.to} to={l.to}>
                      {l.label}
                    </PillLinkSm>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured article */}
      <section className={`${wrap} pb-[72px] pt-24`}>
        <FadeIn
          as="article"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] overflow-hidden rounded-[32px] bg-[#0f0014]"
        >
          <img
            src={featured.image}
            alt={featured.title}
            className="block h-full min-h-[320px] w-full object-cover"
          />
          <div className="flex flex-col justify-center gap-[18px] p-[clamp(28px,5vw,56px)]">
            <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#e9b5ed]">
              Featured · {featured.category} · {featured.readTime}
            </span>
            <h2 className={`${serif} m-0 text-[clamp(28px,3.4vw,40px)] font-medium leading-[1.2] text-[#fff7fd]`}>
              {featured.title}
            </h2>
            <p className="m-0 text-[17px] leading-[1.65] text-[rgba(255,247,253,0.78)]">{featured.excerpt}</p>
            <span className="inline-flex items-center gap-[6px] text-[15px] font-medium text-[#fff7fd]">
              Read the full guide <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
            </span>
          </div>
        </FadeIn>
      </section>

      {/* Filters + resource grid */}
      <section className={`${wrap} pb-28`}>
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {resourceCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`cursor-pointer rounded-full border px-[18px] py-[10px] text-sm transition-colors ${
                  activeCategory === category
                    ? 'border-[#0f0014] bg-[#0f0014] text-white'
                    : 'border-[rgba(208,195,205,0.7)] bg-white text-[#4d444c] hover:border-[#0f0014] hover:text-[#0f0014]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <label className="flex flex-[0_1_300px] items-center gap-2 rounded-full border border-[rgba(208,195,205,0.7)] bg-white px-4">
            <span className="material-symbols-outlined !text-[20px] text-[#7f747d]">search</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search resources..."
              className="min-w-0 flex-1 border-0 bg-transparent py-3 text-[15px] text-[#1e1a20] outline-none"
            />
          </label>
        </div>

        {filtered.length === 0 ? (
          <p className="m-0 rounded-3xl bg-[#faf1fa] px-6 py-12 text-center text-base text-[#4d444c]">
            No resources match your search yet. Try a different keyword or category.
          </p>
        ) : (
          <StaggerGrid className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-5">
            {filtered.map((resource) => (
              <StaggerItem key={resource.id} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-[rgba(208,195,205,0.5)] bg-white transition-[box-shadow,transform] duration-[250ms] ease-in-out hover:-translate-y-[3px] hover:shadow-[0_22px_55px_rgba(51,13,59,0.12)]">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    loading="lazy"
                    className="block aspect-[16/10] w-full object-cover"
                  />
                  <div className="flex flex-1 flex-col gap-[10px] px-6 pb-[26px] pt-[22px]">
                    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#7a4f80]">
                      {resource.category} · {resource.readTime}
                    </span>
                    <h3 className={`${serif} m-0 text-[21px] font-medium leading-[1.3] text-[#0f0014]`}>
                      {resource.title}
                    </h3>
                    <p className="m-0 flex-1 text-[15px] leading-[1.6] text-[#4d444c]">{resource.excerpt}</p>
                    <span className="inline-flex items-center gap-[6px] text-sm font-medium text-[#0f0014]">
                      Read More <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
                    </span>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        )}
      </section>

      {/* Newsletter + continue learning */}
      <section className={`${wrap} pt-28`}>
        <FadeIn className="flex flex-wrap items-center justify-between gap-7 rounded-[32px] bg-[#e2ddf5] p-[clamp(32px,5vw,56px)]">
          <div className="flex-[1_1_320px]">
            <h2 className={`${serif} m-0 mb-2 text-[clamp(28px,3.4vw,38px)] font-medium text-[#0f0014]`}>
              Never Miss a New Guide
            </h2>
            <p className="m-0 text-base leading-[1.6] text-[#474558]">
              One thoughtful email a month with our newest resources, curated by our expert circle.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-[6px]">
            <div className="flex flex-wrap gap-2 rounded-full bg-[#fff7fd] p-[6px]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                className="min-w-0 flex-[1_1_200px] border-0 bg-transparent px-4 py-3 text-base outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-[#0f0014] px-[22px] py-[13px] text-[15px] text-white transition-colors hover:bg-[#330d3b] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading && (
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                    aria-hidden="true"
                  />
                )}
                Subscribe
              </button>
            </div>
            {emailError && <span className="pl-4 text-[13px] text-[#ba1a1a]">{emailError}</span>}
          </form>
        </FadeIn>

        <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-x-16 gap-y-5">
          <h2 className={`${serif} m-0 text-[clamp(28px,3.2vw,36px)] font-medium text-[#0f0014]`}>
            Continue Learning
          </h2>
          <div className="flex flex-col items-start gap-4">
            <p className="m-0 text-[17px] leading-[1.7] text-[#4d444c]">
              Our resources are intended to support education and awareness. They do not replace personalised
              medical advice or professional healthcare.
            </p>
            <PillLink to="/pregnancy-journey/">Pregnancy Journey</PillLink>
          </div>
        </div>
      </section>
    </div>
  )
}
