import { Link } from 'react-router-dom'
import { journeyPhases, fourthTrimesterCards } from '../data/journeyPhases.js'
import { journeyStats } from '../data/stats.js'
import { journeyChecklistItems, phaseTestimonials } from '../data/journeyExtras.js'
import CountUp from '../components/motion/CountUp.jsx'
import { Eyebrow, PillLink, serif, h2SmallClass } from '../components/common/DesignKit.jsx'

const stages = [
  {
    id: 'preparing',
    title: 'Preparing for Pregnancy',
    body: 'Before pregnancy, some people choose to focus on preconception health, nutrition, lifestyle and overall wellbeing.',
    items: ['Preconception care', 'Preconception health', 'Pregnancy preparation', 'Pre-pregnancy nutrition', 'Healthy lifestyle habits'],
    links: null,
  },
  {
    id: 'first-trimester',
    title: 'First Trimester Pregnancy',
    body: 'The first trimester is the beginning of pregnancy and can involve significant physical and emotional changes.',
    items: ['First trimester symptoms', 'First trimester diet', 'First trimester nutrition', 'First trimester yoga', 'Pregnancy preparation', 'Emotional changes during pregnancy'],
    links: [
      { label: 'Pregnancy Nutrition', to: '/services/pregnancy-nutrition/' },
      { label: 'Pregnancy Yoga', to: '/services/pregnancy-yoga/' },
    ],
  },
  {
    id: 'second-trimester',
    title: 'Second Trimester Pregnancy',
    body: 'The second trimester can bring further changes as pregnancy progresses.',
    items: ['Second trimester symptoms', 'Second trimester diet', 'Second trimester nutrition', 'Second trimester yoga', 'Pregnancy wellness', 'Preparing for later stages'],
    links: null,
  },
  {
    id: 'third-trimester',
    title: 'Third Trimester Pregnancy',
    body: 'The third trimester is the final stage of pregnancy before birth and can involve additional physical and emotional changes.',
    items: ['Third trimester symptoms', 'Third trimester diet', 'Third trimester nutrition', 'Third trimester yoga', 'Third trimester pregnancy care', 'Birth preparation'],
    links: null,
  },
  {
    id: 'birth-preparation',
    title: 'Birth Preparation',
    body: 'Preparing for childbirth can involve learning about the birth process, discussing options with your healthcare team and preparing practically and emotionally.',
    items: ['Birth preparation', 'Preparing for childbirth', 'Labour preparation', 'Birth classes'],
    links: null,
  },
  {
    id: 'postpartum',
    title: 'Postpartum Recovery',
    body: 'The pregnancy journey continues after birth. Postpartum recovery can involve physical recovery, nutrition, emotional wellbeing and adapting to life with a newborn.',
    items: ['Postpartum recovery', 'Postpartum nutrition', 'Postpartum wellness', 'Post-pregnancy care', 'New mother support'],
    links: null,
  },
]

const supportLinks = [
  { label: 'Pregnancy Guidance', to: '/services/pregnancy-guidance/' },
  { label: 'Pregnancy Nutrition', to: '/services/pregnancy-nutrition/' },
  { label: 'Pregnancy Yoga', to: '/services/pregnancy-yoga/' },
  { label: 'Mental Wellness', to: '/services/mental-wellness/' },
  { label: 'Services', to: '/services/' },
]

const stageNum = (i) => '0' + (i + 1)

export default function Journey() {
  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-14 px-6 pb-[72px] pt-[clamp(40px,6vw,80px)]">
        <div className="flex flex-col gap-6">
          <Eyebrow>The Pathway</Eyebrow>
          <h1 className={`${serif} m-0 text-[clamp(40px,5.6vw,64px)] font-medium leading-[1.06] tracking-[-0.03em] text-[#0f0014] [text-wrap:balance]`}>
            Your Pregnancy Journey: From Preparation to Postpartum
          </h1>
          <p className="m-0 max-w-[560px] text-[19px] leading-[1.65] text-[#4d444c] [text-wrap:pretty]">
            Pregnancy is a journey of continuous physical, emotional and lifestyle changes. Understanding the
            different stages can help you prepare for what may come next and identify areas where additional
            support may be useful.
          </p>
        </div>
        <div className="aspect-[3/4] w-[min(100%,420px)] justify-self-center overflow-hidden rounded-full border-[6px] border-white shadow-[0_30px_60px_rgba(75,36,82,0.14)]">
          <img
            alt="A serene South Asian woman looking thoughtfully out a large window bathed in soft morning light."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2yGcyPV3qMPftvJmmL-0kv7Yj__yDHKeYWKnxGyrED37KDy_hFhTwULxysE7o_KqZLW6yc82nC07dRE3BywAaty4-658DL5kLPtunfgp93nHsNqqNE0AUTi09o5qRWd5UODrH-XVghJshMvW2ids7_gzGgMG_N_DUqsVb3MG7PkXMYsWxmIl8bh73FlHEL5lh1Hjwn7dwV4AR1ZHjj6lf-K-mSQa7Mwi0wpJ9eYv1FjClncLV_Q"
            className="block h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-[1200px] px-6 pb-24">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] overflow-hidden rounded-[28px] border border-[rgba(208,195,205,0.6)] bg-white">
          {journeyStats.map((s) => (
            <div key={s.label} className="flex flex-col gap-[6px] border-r border-[#f4ebf4] px-[26px] py-[30px]">
              <CountUp value={s.value} suffix={s.suffix} prefix={s.prefix} className={`${serif} text-[42px] leading-none text-[#0f0014]`} />
              <span className="text-sm text-[#4d444c]">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky stage nav */}
      <div className="sticky top-[92px] z-20 px-6">
        <nav
          aria-label="Stages"
          className="mx-auto flex max-w-[1200px] gap-[6px] overflow-x-auto rounded-full border border-[rgba(208,195,205,0.6)] bg-[rgba(255,247,253,0.9)] p-[6px] backdrop-blur-[14px] [scrollbar-width:none]"
        >
          {stages.map((st, i) => (
            <a
              key={st.id}
              href={`#${st.id}`}
              className="flex-none whitespace-nowrap rounded-full px-4 py-[9px] text-[13px] font-medium text-[#4d444c] no-underline transition-colors hover:bg-[#efe5ee] hover:text-[#0f0014]"
            >
              {stageNum(i)} · {st.title}
            </a>
          ))}
        </nav>
      </div>

      {/* Six-stage guide */}
      <section className="mx-auto flex max-w-[1200px] flex-col gap-4 px-6 pb-28 pt-12">
        {stages.map((st, i) => (
          <article
            key={st.id}
            id={st.id}
            className="grid scroll-mt-[170px] grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-x-12 gap-y-6 rounded-[28px] border border-[rgba(208,195,205,0.5)] bg-[#faf1fa] p-[clamp(28px,4vw,44px)]"
          >
            <div className="flex flex-col gap-[14px]">
              <span className={`${serif} text-[22px] italic text-[#a576aa]`}>{stageNum(i)}</span>
              <h2 className={`${serif} m-0 text-[clamp(28px,3.2vw,38px)] font-medium leading-[1.18] tracking-[-0.02em] text-[#0f0014]`}>{st.title}</h2>
              <p className="m-0 text-[17px] leading-[1.7] text-[#4d444c]">{st.body}</p>
              {st.links && (
                <div className="flex flex-wrap gap-[10px] pt-[6px]">
                  {st.links.map((l) => (
                    <PillLink key={l.to} to={l.to}>
                      {l.label}
                    </PillLink>
                  ))}
                </div>
              )}
            </div>
            <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] content-start gap-[10px] p-0">
              {st.items.map((b) => (
                <li key={b} className="flex items-start gap-[10px] rounded-2xl border border-[rgba(208,195,205,0.55)] bg-white px-4 py-[14px] text-[15px] leading-[1.45] text-[#1e1a20]">
                  <span className="material-symbols-outlined icon-fill !text-[19px] text-[#7a4f80]">check_circle</span>
                  {b}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      {/* Approach at each stage */}
      <section className="rounded-t-[40px] bg-[#0f0014] py-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <span className="mb-14 block text-center text-[12px] font-bold uppercase tracking-[0.16em] text-[#e9b5ed]">
            Our Approach at Each Stage
          </span>
          <div className="flex flex-col gap-24">
            {journeyPhases.map((ph, i) => {
              const testimonial = phaseTestimonials[ph.id]
              return (
                <section key={ph.id} className={`flex flex-wrap items-center gap-12 ${i % 2 ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="flex flex-[1_1_380px] flex-col gap-5">
                    <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#e9b5ed]">
                      {ph.phase} · {ph.subtitle}
                    </span>
                    <h2 className={`${serif} m-0 text-[clamp(32px,4vw,46px)] font-medium leading-[1.12] text-[#fff7fd]`}>{ph.title}</h2>
                    <p className="m-0 text-[17px] leading-[1.7] text-[rgba(255,247,253,0.75)]">{ph.description}</p>
                    <div className="rounded-[22px] border border-[rgba(255,247,253,0.12)] bg-[rgba(255,247,253,0.06)] p-6">
                      <h3 className="m-0 mb-[14px] flex items-center gap-2 text-[15px] font-semibold text-[#fff7fd]">
                        <span className="material-symbols-outlined text-[#e9b5ed]">{ph.icon}</span>Garbhika Support
                      </h3>
                      <ul className="m-0 grid list-none gap-[10px] p-0">
                        {ph.support.map((it) => (
                          <li key={it} className="flex gap-[10px] text-[15px] text-[rgba(255,247,253,0.85)]">
                            <span className="material-symbols-outlined !text-lg text-[#e9b5ed]">check</span>
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {testimonial && (
                      <blockquote className={`${serif} m-0 border-l-2 border-[#e9b5ed] pl-[18px] text-[19px] italic leading-[1.5] text-[#fff7fd]`}>
                        “{testimonial.quote}”
                        <cite className="mt-2 block font-['Inter',sans-serif] text-[13px] not-italic text-[rgba(255,247,253,0.6)]">— {testimonial.author}</cite>
                      </blockquote>
                    )}
                  </div>
                  <div className="aspect-[4/5] max-h-[560px] flex-[1_1_360px] overflow-hidden rounded-[32px]">
                    <img alt={ph.title} src={ph.image} loading="lazy" className="block h-full w-full object-cover" />
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </section>

      {/* Fourth trimester */}
      <section className="bg-[#0f0014] pb-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mx-auto mb-12 flex max-w-[680px] flex-col items-center gap-4 text-center">
            <span className="material-symbols-outlined icon-fill !text-[36px] text-[#e9b5ed]">favorite</span>
            <h2 className={`${serif} m-0 text-[clamp(34px,4.4vw,48px)] font-medium text-[#fff7fd]`}>The Fourth Trimester</h2>
            <p className="m-0 text-[17px] leading-[1.7] text-[rgba(255,247,253,0.75)]">
              The journey doesn&apos;t end at birth; it transforms. Our postpartum care focuses intensely on the
              mother&apos;s healing, nourishment, and emotional grounding as she steps into this new paradigm.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
            {fourthTrimesterCards.map((card) => {
              if (card.variant === 'image') {
                return (
                  <div key={card.id} className="relative flex min-h-[320px] flex-col justify-between gap-12 overflow-hidden rounded-[28px] p-8">
                    <img alt={card.title} src={card.image} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,22,28,0.85)] to-[rgba(26,22,28,0.1)]" />
                    <span className="material-symbols-outlined relative !text-[32px] text-[#fff7fd]">{card.icon}</span>
                    <div className="relative">
                      <h4 className={`${serif} m-0 mb-2 text-2xl font-medium text-[#fff7fd]`}>{card.title}</h4>
                      <p className="m-0 text-[15px] leading-[1.6] text-[rgba(255,247,253,0.88)]">{card.description}</p>
                    </div>
                  </div>
                )
              }
              const muted = card.variant === 'muted'
              return (
                <div key={card.id} className={`flex min-h-[320px] flex-col justify-between gap-12 rounded-[28px] p-8 ${muted ? 'bg-[#e2ddf5]' : 'bg-[#fff7fd]'}`}>
                  <span className="material-symbols-outlined !text-[32px] text-[#0f0014]">{card.icon}</span>
                  <div>
                    <h4 className={`${serif} m-0 mb-2 text-2xl font-medium text-[#0f0014]`}>{card.title}</h4>
                    <p className={`m-0 text-[15px] leading-[1.6] ${muted ? 'text-[#474558]' : 'text-[#4d444c]'}`}>{card.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Companion kit */}
      <section className="mx-auto max-w-[1200px] px-6 pt-28">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-10 rounded-[32px] border border-[rgba(208,195,205,0.5)] bg-[#faf1fa] p-[clamp(32px,5vw,56px)]">
          <div className="flex flex-col items-start gap-[18px]">
            <span className="rounded-full bg-[#e9b5ed] px-3 py-[6px] text-[11px] font-bold uppercase tracking-[0.14em] text-[#300a38]">Free Download</span>
            <h2 className={`${serif} m-0 text-[clamp(30px,3.6vw,40px)] font-medium leading-[1.18] text-[#0f0014]`}>Your Complete Journey Companion Kit</h2>
            <p className="m-0 text-[17px] leading-[1.65] text-[#4d444c]">
              Every member gets instant access to our most-loved planning tools — no extra cost.
            </p>
            <Link
              to="/book-consultation/"
              className="inline-flex items-center gap-2 rounded-full bg-[#0f0014] px-[26px] py-[15px] text-[15px] font-medium text-white no-underline transition-colors hover:bg-[#330d3b] hover:text-white"
            >
              Get the Companion Kit
            </Link>
          </div>
          <ul className="m-0 grid list-none gap-[10px] p-0">
            {journeyChecklistItems.map((k) => (
              <li key={k} className="flex items-center gap-[14px] rounded-2xl border border-[rgba(208,195,205,0.55)] bg-white px-[18px] py-4 text-[15px] leading-[1.45] text-[#1e1a20]">
                <span className="material-symbols-outlined text-[#7a4f80]">description</span>
                {k}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quote */}
      <section className="mx-auto max-w-[900px] px-6 py-28 text-center">
        <span className="material-symbols-outlined icon-fill !text-[44px] text-[#a576aa]">format_quote</span>
        <blockquote className={`${serif} m-0 mt-4 text-[clamp(26px,3.4vw,40px)] italic leading-[1.35] text-[#0f0014] [text-wrap:balance]`}>
          &quot;Motherhood is a profound transformation. We are here not just to guide, but to hold the space for
          your emergence.&quot;
        </blockquote>
      </section>

      {/* Support */}
      <section className="border-y border-[rgba(208,195,205,0.45)] bg-[#faf1fa]">
        <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-x-16 gap-y-6 px-6 py-[clamp(56px,8vw,96px)]">
          <h2 className={h2SmallClass}>Support Throughout Your Journey</h2>
          <div className="flex flex-col gap-5">
            <p className="m-0 text-[18px] leading-[1.7] text-[#4d444c]">Garbhika offers services covering different aspects of pregnancy wellbeing.</p>
            <div className="flex flex-wrap gap-[10px]">
              {supportLinks.map((l) => (
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
