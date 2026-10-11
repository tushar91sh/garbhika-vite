import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { fetchCommunityData, joinCommunity } from '../features/community/communitySlice.js'
import { isValidEmail } from '../utils/validators.js'
import { communityStats } from '../data/stats.js'
import { upcomingEvents, communityGuidelines, communityFaqs } from '../data/communityExtras.js'
import CountUp from '../components/motion/CountUp.jsx'
import { SkeletonLine } from '../components/common/SkeletonLoader.jsx'
import { Eyebrow, PillLink, Faqs, serif, h2Class, h2SmallClass } from '../components/common/DesignKit.jsx'

const memberActivities = [
  'Share experiences',
  'Learn from others',
  'Discuss everyday pregnancy concerns',
  'Discover educational resources',
  'Participate in wellness sessions',
  'Build supportive connections',
]

const closingLinks = [
  { label: 'Pregnancy Journey', to: '/pregnancy-journey/' },
  { label: 'Resources', to: '/resources/' },
  { label: 'Services', to: '/services/' },
  { label: 'Contact Us', to: '/contact-us/' },
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
      toast.success('Welcome to the sanctuary! Check your inbox for next steps.')
      setEmail('')
    } catch {
      toast.error('Could not join right now. Please try again.')
    }
  }

  const loading = status === 'loading' || status === 'idle'

  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-stretch gap-12 px-6 pb-[72px] pt-[clamp(40px,6vw,80px)]">
        <div className="flex flex-col justify-center gap-6">
          <Eyebrow>Community</Eyebrow>
          <h1 className={`${serif} m-0 text-[clamp(40px,5.6vw,64px)] font-medium leading-[1.06] tracking-[-0.03em] text-[#0f0014] [text-wrap:balance]`}>
            A Supportive Pregnancy Community
          </h1>
          <p className="m-0 max-w-[540px] text-[19px] leading-[1.65] text-[#4d444c]">
            Pregnancy can feel different for everyone, but you don&apos;t have to navigate the journey without support.
          </p>
          <form
            onSubmit={handleJoin}
            noValidate
            className="flex max-w-[520px] flex-wrap gap-[10px] rounded-full border border-[rgba(208,195,205,0.7)] bg-white p-2 shadow-[0_12px_30px_rgba(51,13,59,0.06)]"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
              className="min-w-0 flex-[1_1_200px] border-0 bg-transparent px-4 py-3 text-base text-[#1e1a20] outline-none"
            />
            <button
              type="submit"
              disabled={joinStatus === 'loading'}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-[#0f0014] px-6 py-[14px] text-[15px] font-medium text-white transition-colors hover:bg-[#330d3b] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {joinStatus === 'loading' && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
              )}
              Join the Community
            </button>
          </form>
          {emailError && <span className="-mt-3 pl-5 text-[13px] text-[#ba1a1a]">{emailError}</span>}
        </div>
        <div className="relative min-h-[440px] overflow-hidden rounded-[36px]">
          <img
            alt="Three modern South Asian women sharing a warm laugh over tea in a sunlit living room."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfy3N8kObKdi7EhbYwDU9UX9nTg5PZ54V9HvdKOlb3skLlWyzgATSN900qimI1ej6D6toyKIpfZlqTivKsowNDl96-B1pYfc4QTwTHWfJXrBwLUcN8pcGuW0YInsJTkjnRhyb9Aq_DHozDeL14qrgyMdRlK4YkH6beCF9uw5vNHe0qF80d7H_D9VP5A_QV1579GfbLoEMf8ISluULOT7fxNHfVHKZyiQnPsAMkUe2xkw8k1o4_rA"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,22,28,0.45),transparent_55%)]" />
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-[1200px] px-6 pb-24">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] overflow-hidden rounded-[28px] border border-[rgba(208,195,205,0.6)] bg-white">
          {communityStats.map((s) => (
            <div key={s.label} className="flex flex-col gap-[6px] border-r border-[#f4ebf4] px-[26px] py-[30px]">
              <CountUp value={s.value} suffix={s.suffix} prefix={s.prefix} className={`${serif} text-[42px] leading-none text-[#0f0014]`} />
              <span className="text-sm text-[#4d444c]">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Connect */}
      <section className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-12 px-6 pb-28">
        <div className="flex flex-col gap-[18px]">
          <h2 className={h2SmallClass}>Connect With Other Expecting Mothers</h2>
          <h3 className={`${serif} m-0 mt-3 text-2xl font-medium text-[#0f0014]`}>Support for Different Stages</h3>
          <p className="m-0 text-[17px] leading-[1.7] text-[#4d444c]">
            Whether you&apos;re preparing for pregnancy, experiencing your first trimester or approaching birth,
            connecting with others can help you feel more informed and supported.
          </p>
        </div>
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] content-start gap-[10px] p-0">
          {memberActivities.map((b) => (
            <li key={b} className="flex items-start gap-3 rounded-[18px] border border-[rgba(208,195,205,0.55)] bg-white px-[18px] py-4 text-base leading-[1.5] text-[#1e1a20]">
              <span className="material-symbols-outlined icon-fill !text-[20px] text-[#7a4f80]">check_circle</span>
              {b}
            </li>
          ))}
        </ul>
      </section>

      {/* Voices */}
      <section className="border-y border-[rgba(208,195,205,0.45)] bg-[#faf1fa]">
        <div className="mx-auto max-w-[1200px] px-6 py-28">
          <div className="mb-10 flex flex-col gap-3">
            <h2 className={h2Class}>Voices of the Sanctuary</h2>
            <p className="m-0 text-[17px] text-[#4d444c]">Real conversations happening right now in our community.</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-4">
            {loading ? (
              <>
                {[0, 1, 2].map((n) => (
                  <div key={n} className="space-y-4 rounded-3xl border border-[#efe5ee] bg-white p-7">
                    <SkeletonLine className="h-10 w-10 rounded-full" />
                    <SkeletonLine className="h-5 w-full" />
                    <SkeletonLine className="h-5 w-4/5" />
                  </div>
                ))}
                <div className="skeleton min-h-[280px] rounded-3xl" />
              </>
            ) : (
              <>
                {voices.map((v) => (
                  <div key={v.id} className="flex flex-col justify-between gap-6 rounded-3xl border border-[#efe5ee] bg-white p-7">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-[#e2ddf5] font-bold text-[#0f0014]">
                          {v.author.charAt(0)}
                        </span>
                        <span className="text-sm text-[#4d444c]">{v.author}</span>
                      </div>
                      <p className={`${serif} m-0 text-[22px] italic leading-[1.45] text-[#0f0014]`}>“{v.quote}”</p>
                    </div>
                    <div className="flex items-center gap-2 border-t border-[#efe5ee] pt-[18px] text-[12px] font-bold uppercase tracking-[0.08em] text-[#7a4f80]">
                      <span className="material-symbols-outlined icon-fill !text-[20px]">favorite</span>
                      {v.relating} Mothers relating
                    </div>
                  </div>
                ))}
                {groups.map((g) => (
                  <div key={g.id ?? g.name} className="relative flex min-h-[280px] items-end overflow-hidden rounded-3xl">
                    <img alt={g.name} src={g.image} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,22,28,0.85)] to-[rgba(26,22,28,0)]" />
                    <div className="relative p-[26px]">
                      <h3 className={`${serif} m-0 mb-[6px] text-[22px] font-medium text-[#fff7fd]`}>{g.name}</h3>
                      <p className="m-0 text-sm text-[rgba(255,247,253,0.85)]">{g.schedule}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
            <div className="flex flex-col gap-[14px] rounded-3xl bg-[#0f0014] p-7">
              <span className="grid h-12 w-12 place-items-center rounded-[14px] bg-[#e9b5ed] text-[#0f0014]">
                <span className="material-symbols-outlined">forum</span>
              </span>
              <h3 className={`${serif} m-0 text-[22px] font-medium text-[#fff7fd]`}>Mother-to-Mother Conversations</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-[rgba(255,247,253,0.75)]">
                Intimate, moderated spaces to share the raw, beautiful, and challenging moments of early
                motherhood without judgment.
              </p>
            </div>
            <div className="flex flex-col gap-[14px] rounded-3xl bg-[#e2ddf5] p-7">
              <span className="grid h-12 w-12 place-items-center rounded-[14px] bg-[#fff7fd] text-[#0f0014]">
                <span className="material-symbols-outlined">psychology</span>
              </span>
              <h3 className={`${serif} m-0 text-[22px] font-medium text-[#0f0014]`}>Expert-Led Sessions</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-[#474558]">
                Weekly Q&amp;As with lactation consultants, perinatal psychologists, and pediatricians available
                to our premium members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="mx-auto max-w-[1200px] px-6 py-28">
        <span className="mb-3 block text-[12px] font-bold uppercase tracking-[0.14em] text-[#7a4f80]">This Week</span>
        <h2 className={`${h2Class} mb-9`}>Upcoming Group Sessions</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-[14px]">
          {upcomingEvents.map((e) => (
            <div key={e.id} className="flex flex-col gap-5 rounded-[22px] border border-[rgba(208,195,205,0.55)] bg-white p-6">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#efe5ee] text-[#0f0014]">
                <span className="material-symbols-outlined">{e.icon}</span>
              </span>
              <div>
                <h3 className={`${serif} m-0 mb-2 text-[19px] font-medium leading-[1.3] text-[#0f0014]`}>{e.title}</h3>
                <p className="m-0 flex items-center gap-[6px] text-[13px] font-semibold text-[#7a4f80]">
                  <span className="material-symbols-outlined !text-[16px]">schedule</span>
                  {e.day} · {e.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="bg-[#0f0014] py-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 className={`${h2Class} mb-10 !text-[#fff7fd]`}>A Space Built on Trust</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4">
            {communityGuidelines.map((g) => (
              <div key={g.id} className="flex flex-col gap-[14px] rounded-3xl border border-[rgba(255,247,253,0.12)] bg-[rgba(255,247,253,0.05)] p-7">
                <span className="material-symbols-outlined !text-[30px] text-[#e9b5ed]">{g.icon}</span>
                <h3 className={`${serif} m-0 text-[22px] font-medium text-[#fff7fd]`}>{g.title}</h3>
                <p className="m-0 text-[15px] leading-[1.65] text-[rgba(255,247,253,0.75)]">{g.description}</p>
              </div>
            ))}
          </div>
          {!loading && testimonials[0] && (
            <figure className="mx-auto mt-16 max-w-[820px] text-center">
              <blockquote className={`${serif} m-0 text-[clamp(24px,3vw,34px)] italic leading-[1.4] text-[#fff7fd]`}>
                “{testimonials[0].quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm text-[rgba(255,247,253,0.65)]">— {testimonials[0].author}</figcaption>
            </figure>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[860px] px-6 py-28">
        <h2 className={`${h2Class} mb-8`}>Community FAQs</h2>
        <Faqs faqs={communityFaqs} />
      </section>

      {/* Closing */}
      <section className="border-y border-[rgba(208,195,205,0.45)] bg-[#faf1fa]">
        <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-x-16 gap-y-6 px-6 py-[clamp(56px,8vw,96px)]">
          <h2 className={h2SmallClass}>Learn, Connect &amp; Grow Together</h2>
          <div className="flex flex-col gap-5">
            <p className="m-0 text-[18px] leading-[1.7] text-[#4d444c]">
              Garbhika combines community with access to{' '}
              <Link to="/resources/" className="text-[#330d3b] underline hover:text-[#7a4f80]">
                educational resources
              </Link>{' '}
              and professional support.
            </p>
            <div className="flex flex-wrap gap-[10px]">
              {closingLinks.map((l) => (
                <PillLink key={l.to} to={l.to}>
                  {l.label}
                </PillLink>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
