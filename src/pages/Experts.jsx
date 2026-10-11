import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchExperts } from '../features/experts/expertsSlice.js'
import { openBookingModal } from '../features/booking/bookingSlice.js'
import { founder } from '../data/experts.js'
import { expertsStats } from '../data/stats.js'
import { philosophyValues, expertCertifications } from '../data/values.js'
import { testimonialBank } from '../data/testimonials.js'
import CountUp from '../components/motion/CountUp.jsx'
import { Eyebrow, Glow, PillLink, serif, h1Class, h2Class } from '../components/common/DesignKit.jsx'

const expertiseCards = [
  { heading: 'Pregnancy Wellness', body: 'Guidance focused on supporting overall wellbeing throughout pregnancy.', to: '/services/' },
  { heading: 'Pregnancy Nutrition', body: 'Professionals who can provide guidance around nutritional needs and healthy eating during pregnancy.', to: '/services/pregnancy-nutrition/' },
  { heading: 'Prenatal Yoga', body: 'Qualified yoga professionals providing pregnancy-appropriate movement and relaxation guidance.', to: '/services/pregnancy-yoga/' },
  { heading: 'Psychological Support', body: 'Appropriately qualified mental-health professionals providing support around emotional and psychological wellbeing.', to: '/services/psychological-support/' },
  { heading: 'Garbh Sanskar', body: 'Guidance around traditional prenatal practices and mindful pregnancy activities.', to: '/services/garbh-sanskar/' },
]

export default function Experts() {
  const dispatch = useDispatch()
  const { items: experts, status } = useSelector((state) => state.experts)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchExperts())
  }, [status, dispatch])

  const loading = status === 'loading' || status === 'idle'
  const [garv, priya, rhea, meera, ananya, neha] = experts
  // Same six specialists as before, shown in the new card-grid order.
  const roster = [garv, ananya, rhea, meera, priya, neha].filter(Boolean)

  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="relative mx-auto max-w-[1200px] px-6 pb-14 pt-[clamp(48px,7vw,96px)] text-center">
        <Glow center />
        <div className="relative mx-auto flex max-w-[860px] flex-col items-center gap-6">
          <Eyebrow>Our Experts</Eyebrow>
          <h1 className={h1Class}>Meet the Garbhika Experts</h1>
          <p className="m-0 max-w-[700px] text-[19px] leading-[1.65] text-[#4d444c] [text-wrap:pretty]">
            Pregnancy can involve questions across nutrition, movement, emotional wellbeing, traditional
            practices and lifestyle. Garbhika brings together professionals and experts across relevant areas
            to provide appropriate guidance throughout the{' '}
            <Link to="/pregnancy-journey/" className="text-[#330d3b] underline hover:text-[#7a4f80]">
              pregnancy journey
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Certifications */}
      <section className="mx-auto max-w-[1200px] px-6 pb-[72px]">
        <div className="flex flex-wrap justify-center gap-[10px]">
          {expertCertifications.map((c) => (
            <span key={c.id} className="inline-flex items-center gap-2 rounded-full border border-[rgba(208,195,205,0.6)] bg-white px-4 py-[10px] text-sm text-[#1e1a20]">
              <span className="material-symbols-outlined icon-fill !text-[18px] text-[#7a4f80]">{c.icon}</span>
              {c.label}
            </span>
          ))}
        </div>
      </section>

      {/* Expert cards */}
      <section className="mx-auto max-w-[1200px] px-6 pb-28">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
          {loading
            ? [0, 1, 2, 3, 4, 5].map((n) => <div key={n} className="skeleton h-[460px] rounded-[28px]" />)
            : roster.map((e) => (
                <article
                  key={e.id}
                  className="flex flex-col overflow-hidden rounded-[28px] border border-[rgba(208,195,205,0.55)] bg-white shadow-[0_10px_35px_rgba(51,13,59,0.05)]"
                >
                  <div className="relative aspect-[4/4.4] overflow-hidden">
                    <img src={e.image} alt={`${e.name}, ${e.role}`} loading="lazy" className="block h-full w-full object-cover" />
                    {e.tag && (
                      <span className="absolute left-4 top-4 rounded-full bg-[rgba(255,247,253,0.92)] px-3 py-[6px] text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f0014]">
                        {e.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-[10px] px-6 pb-[26px] pt-6">
                    <h3 className={`${serif} m-0 text-2xl font-medium text-[#0f0014]`}>{e.name}</h3>
                    <p className="m-0 text-sm font-semibold text-[#7a4f80]">{e.role}</p>
                    <p className="m-0 flex-1 text-[15px] leading-[1.6] text-[#4d444c]">{e.bio || e.focus}</p>
                    <button
                      type="button"
                      onClick={() => dispatch(openBookingModal(e))}
                      className="mt-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-[rgba(15,0,20,0.45)] bg-[#fff7fd] px-5 py-[13px] text-sm font-medium text-[#0f0014] transition-colors hover:bg-[#0f0014] hover:text-white"
                    >
                      Book a session <span className="material-symbols-outlined !text-[16px]">calendar_month</span>
                    </button>
                  </div>
                </article>
              ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#0f0014] py-24">
        <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 px-6">
          {expertsStats.map((s) => (
            <div key={s.label} className="flex flex-col gap-2 border-l border-[rgba(255,247,253,0.2)] pl-5">
              <CountUp value={s.value} suffix={s.suffix} prefix={s.prefix} className={`${serif} text-5xl leading-none text-[#fff7fd]`} />
              <span className="text-sm text-[rgba(255,247,253,0.7)]">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Areas of expertise */}
      <section className="mx-auto max-w-[1200px] px-6 py-28">
        <h2 className={`${h2Class} mb-10`}>Our Areas of Expertise</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))] gap-[14px]">
          {expertiseCards.map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className="flex flex-col gap-3 rounded-[22px] border border-[rgba(208,195,205,0.5)] bg-[#faf1fa] p-6 no-underline transition-colors hover:bg-[#efe5ee]"
            >
              <span className={`${serif} text-[21px] leading-tight text-[#0f0014]`}>{a.heading}</span>
              <span className="flex-1 text-sm leading-[1.6] text-[#4d444c]">{a.body}</span>
              <span className="inline-flex items-center gap-[6px] text-sm font-medium text-[#0f0014]">
                Explore <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-y border-[rgba(208,195,205,0.45)] bg-[#faf1fa]">
        <div className="mx-auto max-w-[1200px] px-6 py-28">
          <h2 className={`${h2Class} mb-10`}>The Philosophy Behind Our Circle</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-4">
            {philosophyValues.map((v) => (
              <div key={v.id} className="flex gap-5 rounded-3xl border border-[rgba(208,195,205,0.5)] bg-white p-7">
                <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-[#e2ddf5] text-[#0f0014]">
                  <span className="material-symbols-outlined">{v.icon}</span>
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className={`${serif} m-0 text-[22px] font-medium text-[#0f0014]`}>{v.title}</h3>
                  <p className="m-0 text-[15px] leading-[1.65] text-[#4d444c]">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-[1200px] px-6 py-28">
        <h2 className={`${h2Class} mb-10`}>What Families Say</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
          {testimonialBank.experts.map((t) => (
            <figure key={t.id} className="m-0 flex flex-col justify-between gap-6 rounded-3xl border border-[rgba(208,195,205,0.5)] bg-white p-[30px]">
              <blockquote className={`${serif} m-0 text-[21px] italic leading-[1.45] text-[#0f0014]`}>“{t.quote}”</blockquote>
              <figcaption className="text-sm text-[#4d444c]">— {t.author}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Founder */}
      <section id="founder" className="mx-auto max-w-[1200px] scroll-mt-[100px] px-6 pb-28">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] overflow-hidden rounded-[36px] bg-[#330d3b]">
          <img alt={`${founder.name}, founder of Garbhika.`} src={founder.image} className="block h-full min-h-[380px] w-full object-cover" />
          <div className="flex flex-col justify-center gap-6 p-[clamp(32px,5vw,64px)]">
            <span className="material-symbols-outlined icon-fill !text-[44px] text-[#e9b5ed]">format_quote</span>
            <blockquote className={`${serif} m-0 text-[clamp(26px,3vw,36px)] italic leading-[1.3] text-[#fff7fd]`}>{founder.quote}</blockquote>
            <div>
              <h2 className={`${serif} m-0 text-[26px] font-medium text-[#fff7fd]`}>{founder.name}</h2>
              <p className="m-0 mt-1 text-[12px] font-bold uppercase tracking-[0.14em] text-[#e9b5ed]">{founder.role}</p>
            </div>
            <p className="m-0 text-base leading-[1.7] text-[rgba(255,247,253,0.8)]">{founder.bio}</p>
            <a
              href="mailto:hello@garbhika.com"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[#fff7fd] px-[26px] py-[15px] text-[15px] font-medium text-[#0f0014] no-underline transition-colors hover:bg-[#fed6ff] hover:text-[#0f0014]"
            >
              Meet the Founder <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="mx-auto flex max-w-[820px] flex-col items-center gap-5 px-6 pb-24 text-center">
        <h2 className={h2Class}>Professional &amp; Personalised Support</h2>
        <p className="m-0 text-[18px] leading-[1.65] text-[#4d444c]">
          Every pregnancy is different. Our experts consider individual circumstances when providing guidance and
          recommendations.
        </p>
        <div className="flex flex-wrap justify-center gap-[10px]">
          <PillLink to="/services/">Services</PillLink>
          <PillLink to="/book-consultation/" solid>
            Book a Consultation
          </PillLink>
        </div>
      </section>
    </main>
  )
}
