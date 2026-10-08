import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchExperts } from '../features/experts/expertsSlice.js'
import { openBookingModal } from '../features/booking/bookingSlice.js'
import { founder } from '../data/experts.js'
import { expertsStats } from '../data/stats.js'
import { philosophyValues, expertCertifications } from '../data/values.js'
import { testimonialBank } from '../data/testimonials.js'
import { SkeletonAvatarRow } from '../components/common/SkeletonLoader.jsx'
import Button from '../components/common/Button.jsx'
import StatsBar from '../components/common/StatsBar.jsx'
import FadeIn from '../components/motion/FadeIn.jsx'
import { StaggerGrid, StaggerItem } from '../components/motion/StaggerGrid.jsx'
import { ServiceCardsGrid, RelatedLinks } from '../components/common/ServiceLayout.jsx'

const expertiseCards = [
  {
    heading: 'Pregnancy Wellness',
    body: 'Guidance focused on supporting overall wellbeing throughout pregnancy.',
    to: '/services/',
  },
  {
    heading: 'Pregnancy Nutrition',
    body: 'Professionals who can provide guidance around nutritional needs and healthy eating during pregnancy.',
    to: '/services/pregnancy-nutrition/',
  },
  {
    heading: 'Prenatal Yoga',
    body: 'Qualified yoga professionals providing pregnancy-appropriate movement and relaxation guidance.',
    to: '/services/pregnancy-yoga/',
  },
  {
    heading: 'Psychological Support',
    body: 'Appropriately qualified mental-health professionals providing support around emotional and psychological wellbeing.',
    to: '/services/psychological-support/',
  },
  {
    heading: 'Garbh Sanskar',
    body: 'Guidance around traditional prenatal practices and mindful pregnancy activities.',
    to: '/services/garbh-sanskar/',
  },
]

export default function Experts() {
  const dispatch = useDispatch()
  const { items: experts, status } = useSelector((state) => state.experts)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchExperts())
  }, [status, dispatch])

  const loading = status === 'loading' || status === 'idle'
  const [garv, priya, rhea, meera, ananya, neha] = experts

  return (
    <main className="pb-section-padding">
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pt-12 md:pt-24 pb-16 text-center">
        <FadeIn>
          <h1 className="font-display-lg text-display-lg text-primary mb-6">Meet the Garbhika Experts</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Pregnancy can involve questions across nutrition, movement, emotional wellbeing, traditional
            practices and lifestyle. Garbhika brings together professionals and experts across relevant areas
            to provide appropriate guidance throughout the{' '}
            <Link to="/pregnancy-journey/" className="text-primary underline hover:opacity-70">
              pregnancy journey
            </Link>
            .
          </p>
        </FadeIn>
      </section>

      {/* Expertise cards */}
      <section className="bg-surface-container-low py-section-padding">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <FadeIn className="text-center mb-12 space-y-4">
            <h2 className="font-headline-lg text-headline-lg text-primary">Our Areas of Expertise</h2>
          </FadeIn>
          <ServiceCardsGrid cards={expertiseCards} />
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pb-section-padding">
        <FadeIn>
          <StatsBar stats={expertsStats} />
        </FadeIn>
      </section>

      {/* Certifications strip */}
      <section className="bg-surface-container-low py-8">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {expertCertifications.map((cert) => (
              <StaggerItem key={cert.id} className="flex items-center gap-2 justify-center text-center">
                <span className="material-symbols-outlined text-primary text-lg">{cert.icon}</span>
                <span className="font-body-md text-sm text-on-surface-variant">{cert.label}</span>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-base-unit md:gap-gutter">
            <div className="md:col-span-4 skeleton h-80 rounded-xl" />
            <div className="md:col-span-4 skeleton h-80 rounded-xl" />
            <div className="md:col-span-4 skeleton h-80 rounded-xl" />
            <div className="md:col-span-6 skeleton h-96 rounded-xl" />
            <div className="md:col-span-6 grid grid-rows-2 gap-base-unit md:gap-gutter">
              <SkeletonAvatarRow />
              <SkeletonAvatarRow />
            </div>
          </div>
        ) : (
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-12 gap-base-unit md:gap-gutter">
            <ExpertFeature expert={garv} span={4} onBook={() => dispatch(openBookingModal(garv))} />
            <ExpertFeature expert={ananya} span={4} onBook={() => dispatch(openBookingModal(ananya))} />
            <ExpertFeature expert={rhea} span={4} onBook={() => dispatch(openBookingModal(rhea))} />
            <ExpertFeature expert={meera} span={6} large onBook={() => dispatch(openBookingModal(meera))} />
            <div className="md:col-span-6 grid grid-rows-2 gap-base-unit md:gap-gutter">
              {[priya, neha].map(
                (expert) =>
                  expert && (
                    <StaggerItem key={expert.id}>
                      <button
                        onClick={() => dispatch(openBookingModal(expert))}
                        className="w-full text-left bg-surface-container-high rounded-xl p-6 flex items-center gap-6 group hover:bg-surface-variant transition-colors duration-300"
                      >
                        <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                          <img
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                            src={expert.image}
                            alt={expert.name}
                          />
                        </div>
                        <div>
                          <h3 className="font-headline-md text-headline-md text-primary mb-1">{expert.name}</h3>
                          <p className="font-label-caps text-label-caps text-secondary mb-2">{expert.role}</p>
                          <p className="font-body-md text-body-md text-on-surface-variant text-sm">{expert.focus}</p>
                        </div>
                      </button>
                    </StaggerItem>
                  )
              )}
            </div>
          </StaggerGrid>
        )}
      </section>

      {/* Philosophy */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-padding">
        <FadeIn className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <h2 className="font-headline-lg text-headline-lg text-primary">The Philosophy Behind Our Circle</h2>
        </FadeIn>
        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">
          {philosophyValues.map((value) => (
            <StaggerItem
              key={value.id}
              className="bg-surface-container-low rounded-2xl p-8 flex gap-5 items-start hover:shadow-md transition-shadow duration-300"
            >
              <span className="material-symbols-outlined text-primary text-3xl flex-shrink-0">{value.icon}</span>
              <div>
                <h3 className="font-headline-md text-[18px] text-primary mb-2">{value.title}</h3>
                <p className="font-body-md text-sm text-on-surface-variant">{value.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* Testimonials about experts */}
      <section className="bg-surface-container-low py-section-padding">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <FadeIn className="text-center mb-12 space-y-4">
            <h2 className="font-headline-lg text-headline-lg text-primary">What Families Say</h2>
          </FadeIn>
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {testimonialBank.experts.map((t) => (
              <StaggerItem
                key={t.id}
                className="bg-surface-bright rounded-2xl p-8 flex flex-col justify-between h-full"
              >
                <p className="font-headline-md text-[18px] text-primary italic leading-relaxed mb-6">"{t.quote}"</p>
                <cite className="font-body-md text-sm text-on-surface-variant not-italic">— {t.author}</cite>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section id="founder" className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-padding scroll-mt-24">
        <FadeIn className="bg-surface-container-low rounded-xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(75,36,82,0.05)] flex flex-col md:flex-row">
          <div className="md:w-1/2 relative h-96 md:h-auto">
            <img
              className="w-full h-full object-cover"
              alt={`${founder.name}, founder of Garbhika.`}
              src={founder.image}
            />
          </div>
          <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-surface-pink">
            <div className="mb-8">
              <span
                className="material-symbols-outlined text-primary-container text-4xl mb-4"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                format_quote
              </span>
              <blockquote className="font-display-lg text-display-lg text-primary italic leading-tight">
                {founder.quote}
              </blockquote>
            </div>
            <div className="mb-8">
              <h2 className="font-headline-lg text-headline-lg text-primary mb-2">{founder.name}</h2>
              <p className="font-label-caps text-label-caps text-secondary tracking-widest">{founder.role}</p>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">{founder.bio}</p>
            <a href="mailto:hello@garbhika.com">
              <Button className="flex items-center gap-2">
                Meet the Founder <span className="material-symbols-outlined">arrow_forward</span>
              </Button>
            </a>
          </div>
        </FadeIn>
      </section>

      {/* Closing */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-padding">
        <FadeIn className="space-y-6">
          <h2 className="font-headline-lg text-headline-lg text-primary">Professional &amp; Personalised Support</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Every pregnancy is different. Our experts consider individual circumstances when providing
            guidance and recommendations.
          </p>
          <RelatedLinks links={[{ label: 'Services', to: '/services/' }, { label: 'Book a Consultation', to: '/book-consultation/' }]} />
        </FadeIn>
      </section>
    </main>
  )
}

function ExpertFeature({ expert, span, large, onBook }) {
  if (!expert) return null
  const spanClass = span === 6 ? 'md:col-span-6' : 'md:col-span-4'

  if (large) {
    return (
      <StaggerItem className={spanClass}>
        <button onClick={onBook} className="w-full text-left bg-surface-container-low rounded-xl overflow-hidden relative group">
          <div className="h-96 w-full relative">
            <img
              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              src={expert.image}
              alt={`${expert.name}, ${expert.role}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 w-full text-surface-bright">
              <h3 className="font-headline-lg text-headline-lg mb-2">{expert.name}</h3>
              <p className="font-label-caps text-label-caps opacity-90 mb-3">{expert.role}</p>
              <p className="font-body-md text-body-md opacity-80 max-w-md">{expert.focus}</p>
            </div>
          </div>
        </button>
      </StaggerItem>
    )
  }

  return (
    <StaggerItem className={spanClass}>
      <button onClick={onBook} className="w-full text-left bg-surface-container-low rounded-xl overflow-hidden relative group">
        <div className="h-80 w-full relative">
          <img
            className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
            src={expert.image}
            alt={`${expert.name}, ${expert.role}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 w-full text-surface-bright">
            <h3 className="font-headline-md text-headline-md mb-1">{expert.name}</h3>
            <p className="font-label-caps text-label-caps opacity-90 mb-2">{expert.role}</p>
            <p className="font-body-md text-body-md opacity-80 text-sm">{expert.focus}</p>
          </div>
        </div>
      </button>
    </StaggerItem>
  )
}
