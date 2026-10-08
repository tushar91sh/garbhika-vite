import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { fetchCommunityData, joinCommunity } from '../features/community/communitySlice.js'
import VoiceBubble from '../components/cards/VoiceBubble.jsx'
import TestimonialCard from '../components/cards/TestimonialCard.jsx'
import Button from '../components/common/Button.jsx'
import { SkeletonLine } from '../components/common/SkeletonLoader.jsx'
import FAQAccordion from '../components/common/FAQAccordion.jsx'
import StatsBar from '../components/common/StatsBar.jsx'
import FadeIn from '../components/motion/FadeIn.jsx'
import { StaggerGrid, StaggerItem } from '../components/motion/StaggerGrid.jsx'
import { isValidEmail } from '../utils/validators.js'
import { communityStats } from '../data/stats.js'
import { upcomingEvents, communityGuidelines, communityFaqs } from '../data/communityExtras.js'
import { Link } from 'react-router-dom'
import { BulletList, RelatedLinks } from '../components/common/ServiceLayout.jsx'

const memberActivities = [
  'Share experiences',
  'Learn from others',
  'Discuss everyday pregnancy concerns',
  'Discover educational resources',
  'Participate in wellness sessions',
  'Build supportive connections',
]

export default function Community() {
  const dispatch = useDispatch()
  const { voices, groups, testimonials, status, joinStatus } = useSelector((state) => state.community)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  useEffect(() => {
    if (status === 'idle') dispatch(fetchCommunityData())
  }, [status, dispatch])

  const handleJoin = async (e) => {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address.')
      return
    }
    setEmailError('')
    try {
      await dispatch(joinCommunity(email)).unwrap()
      toast.success("Welcome to the sanctuary! Check your inbox for next steps.")
      setEmail('')
    } catch {
      toast.error('Could not join right now. Please try again.')
    }
  }

  const loading = status === 'loading' || status === 'idle'

  return (
    <main>
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-padding flex flex-col md:flex-row items-center gap-16">
        <FadeIn direction="right" className="w-full md:w-1/2 space-y-8">
          <h1 className="font-display-lg text-display-lg text-primary md:pr-12">
            A Supportive Pregnancy Community
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
            Pregnancy can feel different for everyone, but you don&apos;t have to navigate the journey without
            support.
          </p>
          <div className="max-w-lg space-y-2">
            <h2 className="font-headline-lg text-headline-lg text-primary">Connect With Other Expecting Mothers</h2>
            <BulletList items={memberActivities} columns={2} />
          </div>
          <form onSubmit={handleJoin} className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                className={`w-full rounded-full border bg-surface px-6 py-4 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                  emailError ? 'border-error' : 'border-surface-variant'
                }`}
              />
              {emailError && <p className="text-error text-sm mt-2 pl-2">{emailError}</p>}
            </div>
            <Button type="submit" className="!bg-surface-tint !text-white" isLoading={joinStatus === 'loading'}>
              Join the Community
            </Button>
          </form>
        </FadeIn>
        <FadeIn direction="left" delay={0.1} className="w-full md:w-1/2 relative h-[500px] rounded-2xl overflow-hidden shadow-sm">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            alt="Three modern South Asian women sharing a warm laugh over tea in a sunlit living room."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfy3N8kObKdi7EhbYwDU9UX9nTg5PZ54V9HvdKOlb3skLlWyzgATSN900qimI1ej6D6toyKIpfZlqTivKsowNDl96-B1pYfc4QTwTHWfJXrBwLUcN8pcGuW0YInsJTkjnRhyb9Aq_DHozDeL14qrgyMdRlK4YkH6beCF9uw5vNHe0qF80d7H_D9VP5A_QV1579GfbLoEMf8ISluULOT7fxNHfVHKZyiQnPsAMkUe2xkw8k1o4_rA"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-plum/40 to-transparent" />
        </FadeIn>
      </section>

      {/* Stats */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pb-section-padding">
        <FadeIn>
          <StatsBar stats={communityStats} />
        </FadeIn>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pb-section-padding">
        <FadeIn className="space-y-4 max-w-2xl">
          <h2 className="font-headline-lg text-headline-lg text-primary">Support for Different Stages</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Whether you&apos;re preparing for pregnancy, experiencing your first trimester or approaching
            birth, connecting with others can help you feel more informed and supported.
          </p>
        </FadeIn>
      </section>

      <section className="bg-surface-container-low py-section-padding">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <FadeIn className="text-center mb-16 space-y-4">
            <h2 className="font-headline-lg text-headline-lg text-primary">Voices of the Sanctuary</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Real conversations happening right now in our community.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {loading ? (
              <>
                <div className="md:col-span-4 bg-surface-bright p-8 rounded-2xl space-y-4">
                  <SkeletonLine className="h-10 w-10 rounded-full" />
                  <SkeletonLine className="h-5 w-full" />
                  <SkeletonLine className="h-5 w-4/5" />
                </div>
                <div className="md:col-span-8 skeleton rounded-2xl min-h-[400px]" />
              </>
            ) : (
              <>
                {voices[0] && (
                  <div className="md:col-span-4">
                    <VoiceBubble {...voices[0]} />
                  </div>
                )}
                {groups[0] && (
                  <div className="md:col-span-8 relative rounded-2xl overflow-hidden min-h-[400px]">
                    <img
                      className="absolute inset-0 w-full h-full object-cover"
                      alt={groups[0].name}
                      src={groups[0].image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-plum/60 via-transparent to-transparent flex items-end p-8">
                      <div className="text-white space-y-2">
                        <h3 className="font-headline-md text-headline-md">{groups[0].name}</h3>
                        <p className="font-body-md text-body-md opacity-90">{groups[0].schedule}</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="md:col-span-6 bg-surface-container p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 text-surface-tint shadow-sm">
                <span className="material-symbols-outlined">forum</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-3">Mother-to-Mother Conversations</h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Intimate, moderated spaces to share the raw, beautiful, and challenging moments of early
                motherhood without judgment.
              </p>
            </div>
            <div className="md:col-span-6 bg-lavender-soft p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 text-surface-tint shadow-sm">
                <span className="material-symbols-outlined">psychology</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-3">Expert-Led Sessions</h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Weekly Q&amp;As with lactation consultants, perinatal psychologists, and pediatricians
                available to our premium members.
              </p>
            </div>

            {!loading && voices.slice(1).map((voice) => (
              <div key={voice.id} className="md:col-span-4">
                <VoiceBubble {...voice} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-padding">
        <FadeIn className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
          <span className="block font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase">
            This Week
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary">Upcoming Group Sessions</h2>
        </FadeIn>
        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">
          {upcomingEvents.map((event) => (
            <StaggerItem
              key={event.id}
              className="flex items-center gap-5 bg-surface-container-low rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined">{event.icon}</span>
              </div>
              <div>
                <h3 className="font-headline-md text-[16px] text-primary">{event.title}</h3>
                <p className="font-body-md text-sm text-on-surface-variant">
                  {event.day} · {event.time}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* Guidelines */}
      <section className="bg-surface-container-low py-section-padding">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <FadeIn className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
            <h2 className="font-headline-lg text-headline-lg text-primary">A Space Built on Trust</h2>
          </FadeIn>
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {communityGuidelines.map((g) => (
              <StaggerItem key={g.id} className="text-center space-y-4 bg-surface-bright rounded-2xl p-8">
                <span className="material-symbols-outlined text-primary text-4xl">{g.icon}</span>
                <h3 className="font-headline-md text-[18px] text-primary">{g.title}</h3>
                <p className="font-body-md text-sm text-on-surface-variant">{g.description}</p>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {!loading && testimonials[0] && (
        <FadeIn>
          <TestimonialCard quote={testimonials[0].quote} author={testimonials[0].author} />
        </FadeIn>
      )}

      {/* FAQ */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pb-section-padding">
        <FadeIn className="bg-surface-container-low rounded-2xl p-8 md:p-16">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-10">Community FAQs</h2>
          <FAQAccordion faqs={communityFaqs} />
        </FadeIn>
      </section>

      {/* Closing */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pb-section-padding">
        <FadeIn className="space-y-6">
          <h2 className="font-headline-lg text-headline-lg text-primary">Learn, Connect &amp; Grow Together</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Garbhika combines community with access to{' '}
            <Link to="/resources/" className="text-primary underline hover:opacity-70">
              educational resources
            </Link>{' '}
            and professional support.
          </p>
          <RelatedLinks
            links={[
              { label: 'Pregnancy Journey', to: '/pregnancy-journey/' },
              { label: 'Resources', to: '/resources/' },
              { label: 'Services', to: '/services/' },
              { label: 'Contact Us', to: '/contact-us/' },
            ]}
          />
        </FadeIn>
      </section>
    </main>
  )
}
