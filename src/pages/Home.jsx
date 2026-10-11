import { Link } from 'react-router-dom'
import CountUp from '../components/motion/CountUp.jsx'
import { homeStats } from '../data/stats.js'
import { services } from '../data/services.js'
import { resources } from '../data/resources.js'
import { Eyebrow, InlineLink, PillLink, serif, h2Class } from '../components/common/DesignKit.jsx'

const serviceIcons = ['auto_awesome', 'self_improvement', 'restaurant', 'psychiatry', 'spa', 'explore']

const orbitNodes = [
  { icon: 'psychology', label: 'Psychologist', pos: 'top-[6%] left-1/2 -translate-x-1/2' },
  { icon: 'self_improvement', label: 'Yoga', pos: 'top-[44%] left-0' },
  { icon: 'forum', label: 'Community', pos: 'top-[56%] right-0' },
  { icon: 'restaurant', label: 'Nutrition', pos: 'bottom-[4%] left-1/2 -translate-x-1/2' },
]

const stagesOfSupport = [
  'Preconception care and pregnancy preparation',
  'First trimester pregnancy',
  'Second trimester pregnancy',
  'Third trimester pregnancy',
  'Birth preparation',
  'Postpartum recovery',
]

const differentiators = [
  { icon: 'all_inclusive', text: 'Holistic support across physical, emotional and lifestyle dimensions' },
  { icon: 'verified', text: 'Expert-led guidance across relevant areas of pregnancy wellness' },
  { icon: 'timeline', text: 'Support throughout preparation, pregnancy and postpartum stages' },
  { icon: 'diversity_3', text: 'A supportive community for expecting mothers' },
]

const sectionH2 = `${serif} m-0 text-[clamp(34px,4.4vw,48px)] font-medium leading-[1.15] tracking-[-0.02em] text-[#0f0014]`
const kicker = 'text-[12px] font-bold uppercase tracking-[0.14em] text-[#7a4f80]'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-14 px-6 pb-[72px] pt-[clamp(40px,7vw,88px)]">
        <div className="pointer-events-none absolute left-[-160px] top-10 h-[420px] w-[420px] rounded-full bg-[rgba(233,181,237,0.28)] blur-[80px]" />
        <div className="relative flex flex-col gap-7">
          <Eyebrow>Welcome to Garbhika</Eyebrow>
          <h1 className={`${serif} m-0 text-[clamp(44px,6vw,72px)] font-medium leading-[1.04] tracking-[-0.035em] text-[#0f0014] [text-wrap:balance]`}>
            A More Supported Pregnancy Journey Begins with <em className="italic text-[#7a4f80]">Garbhika</em>
          </h1>
          <div className="flex max-w-[560px] flex-col gap-[14px] text-[18px] leading-[1.65] text-[#4d444c] [text-wrap:pretty]">
            <p className="m-0">
              Pregnancy is a beautiful journey, but it can also bring new questions, physical changes and
              emotional challenges. Garbhika brings together{' '}
              <InlineLink to="/services/pregnancy-guidance/">pregnancy guidance</InlineLink>, wellness support
              and expert-led <InlineLink to="/services/">services</InlineLink> to help you navigate this
              journey with greater awareness and confidence.
            </p>
            <p className="m-0">
              From <InlineLink to="/services/garbh-sanskar/">Garbh Sanskar</InlineLink> and{' '}
              <InlineLink to="/services/pregnancy-yoga/">prenatal yoga</InlineLink> to{' '}
              <InlineLink to="/services/pregnancy-nutrition/">pregnancy nutrition</InlineLink>,{' '}
              <InlineLink to="/services/mental-wellness/">mental wellness</InlineLink> and emotional support,
              Garbhika provides a holistic approach to pregnancy wellbeing.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/book-consultation/"
              className="inline-flex items-center gap-2 rounded-full bg-[#0f0014] px-7 py-[17px] text-base font-medium text-white no-underline shadow-[0_12px_30px_rgba(15,0,20,0.2)] transition-colors hover:bg-[#330d3b] hover:text-white"
            >
              Start Your Garbhika Journey <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
            </Link>
            <Link
              to="/services/"
              className="inline-flex items-center rounded-full border border-[rgba(15,0,20,0.5)] bg-[rgba(255,247,253,0.8)] px-7 py-[17px] text-base font-medium text-[#0f0014] no-underline transition-colors hover:bg-[#0f0014] hover:text-white"
            >
              Explore Our Services
            </Link>
          </div>
        </div>

        <div className="relative grid min-h-[clamp(380px,48vw,540px)] place-items-center">
          <div className="absolute aspect-square w-[min(100%,520px)] rounded-full border border-dashed border-[#d0c3cd]" />
          <div className="absolute aspect-square w-[min(78%,400px)] rounded-full bg-[radial-gradient(circle,#efe5ee,transparent_70%)]" />
          <div className="relative aspect-[4/5] w-[min(70%,340px)] overflow-hidden rounded-[42%_58%_50%_50%/46%_40%_60%_54%] border-[6px] border-[#fff7fd] shadow-[0_28px_80px_rgba(51,13,59,0.22)]">
            <img
              alt="A serene South Asian mother-to-be gently holding her belly, bathed in warm natural light."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwdyUTBDiWYVvsFNXIWQu_HT08E8GDVPhoqqwFzBqqlmDgLgrXNy8mwTkpGXBrjyFv0Z93Wy2ET_E0lcKuiMmbJLuizxygtf7qpT3Pw9VcKWytEsf1VGpOIsLBkg3Id2Bf7OU50jhF2pAxuDK4j4_IYWhMjDZ_FsXf063oHLPm-B1vCgUHiZ03BAxMs1RCz-_Y1sE5ENSN4pSAtyyxc8pQmG6lsbvxzJNhFoLqDtHiy1FCrTEb8w"
              className="block h-full w-full object-cover"
            />
          </div>
          {orbitNodes.map((n) => (
            <div
              key={n.label}
              className={`absolute ${n.pos} flex items-center gap-2 whitespace-nowrap rounded-full border border-[#e9e0e8] bg-white px-4 py-[9px] text-sm font-medium shadow-[0_10px_30px_rgba(51,13,59,0.1)]`}
            >
              <span className="material-symbols-outlined !text-xl text-[#7a4f80]">{n.icon}</span>
              {n.label}
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-[1200px] px-6 pb-28">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] overflow-hidden rounded-[28px] border border-[rgba(208,195,205,0.6)] bg-white">
          {homeStats.map((s) => (
            <div key={s.label} className="flex flex-col gap-[6px] border-r border-[#f4ebf4] px-7 py-8">
              <CountUp value={s.value} suffix={s.suffix} prefix={s.prefix} className={`${serif} text-[44px] leading-none text-[#0f0014]`} />
              <span className="text-sm text-[#4d444c]">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Stages */}
      <section className="mx-auto max-w-[1200px] px-6 pb-[120px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[640px] flex-col gap-4">
            <span className={kicker}>Every stage</span>
            <h2 className={`${sectionH2} [text-wrap:balance]`}>Holistic Pregnancy Support for Every Stage</h2>
            <p className="m-0 text-[18px] leading-[1.65] text-[#4d444c]">
              Every pregnancy is different. Your needs can change from the time you begin preparing for pregnancy
              through each trimester and into the postpartum period.
            </p>
          </div>
          <PillLink to="/pregnancy-journey/">Pregnancy Journey</PillLink>
        </div>
        <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,170px),1fr))] gap-3 p-0">
          {stagesOfSupport.map((t, i) => (
            <li key={t} className="relative flex min-h-[180px] flex-col justify-between gap-7 rounded-[22px] border border-[rgba(208,195,205,0.5)] bg-[#faf1fa] p-[22px]">
              <span className={`${serif} text-[28px] italic text-[#a576aa]`}>{'0' + (i + 1)}</span>
              <span className="text-[15px] font-medium leading-[1.45] text-[#1e1a20]">{t}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Services */}
      <section className="rounded-t-[40px] bg-[#0f0014] py-[120px]">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 className={`${sectionH2} max-w-[620px] !text-[#fff7fd]`}>Our Pregnancy Wellness Services</h2>
            <Link
              to="/services/"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,247,253,0.35)] px-5 py-[11px] text-sm text-[#fff7fd] no-underline transition-colors hover:bg-[#fff7fd] hover:text-[#0f0014]"
            >
              All services <span className="material-symbols-outlined !text-base">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-4">
            {services.map((c, i) => (
              <Link
                key={c.to}
                to={c.to}
                className="flex flex-col gap-4 rounded-[26px] border border-[rgba(255,247,253,0.12)] bg-[rgba(255,247,253,0.05)] p-[30px] no-underline transition-all duration-[250ms] hover:-translate-y-1 hover:bg-[rgba(255,247,253,0.1)]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-[14px] bg-[#e9b5ed] text-[#0f0014]">
                  <span className="material-symbols-outlined">{serviceIcons[i]}</span>
                </span>
                <span className={`${serif} text-2xl leading-[1.25] text-[#fff7fd]`}>{c.heading}</span>
                <span className="flex-1 text-[15px] leading-[1.6] text-[rgba(255,247,253,0.72)]">{c.body}</span>
                <span className="inline-flex items-center gap-[6px] text-sm text-[#e9b5ed]">
                  Explore <span className="material-symbols-outlined !text-base">arrow_forward</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Garbhika */}
      <section className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-12 px-6 py-[120px]">
        <div className="flex flex-col gap-6">
          <span className={kicker}>Why us</span>
          <h2 className={sectionH2}>Why Garbhika?</h2>
          <figure className="m-0 mt-2 rounded-[26px] bg-[#e2ddf5] p-8">
            <blockquote className={`${serif} m-0 text-2xl italic leading-[1.4] text-[#0f0014]`}>
              “Garbhika gave me a village I didn’t know I was missing during my first pregnancy.”
            </blockquote>
            <figcaption className="mt-4 text-sm text-[#474558]">— Kavya R., First-time mother</figcaption>
          </figure>
          <div className="flex flex-wrap gap-[10px]">
            <PillLink to="/community/">Community</PillLink>
            <PillLink to="/experts/">Our Experts</PillLink>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-[14px]">
          {differentiators.map((d) => (
            <div key={d.text} className="flex flex-col gap-5 rounded-3xl border border-[rgba(208,195,205,0.55)] bg-white p-[26px]">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#efe5ee] text-[#0f0014]">
                <span className="material-symbols-outlined">{d.icon}</span>
              </span>
              <span className="text-base leading-[1.55] text-[#1e1a20]">{d.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Learn more */}
      <section className="border-y border-[rgba(208,195,205,0.4)] bg-[#faf1fa] py-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-[620px] flex-col gap-4">
              <h2 className={sectionH2}>Learn More About Pregnancy</h2>
              <p className="m-0 text-[18px] leading-[1.65] text-[#4d444c]">
                From first trimester symptoms and pregnancy diet to prenatal yoga, Garbh Sanskar and birth
                preparation, our <InlineLink to="/resources/">educational resources</InlineLink> help you explore
                important pregnancy topics.
              </p>
            </div>
            <PillLink to="/resources/">Resources</PillLink>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
            {resources.slice(0, 3).map((r) => (
              <Link
                key={r.id}
                to="/resources/"
                className="flex flex-col overflow-hidden rounded-3xl border border-[rgba(208,195,205,0.5)] bg-white no-underline transition-shadow hover:shadow-[0_22px_55px_rgba(51,13,59,0.12)]"
              >
                <img src={r.image} alt={r.title} loading="lazy" className="block aspect-[16/10] w-full object-cover" />
                <span className="flex flex-col gap-[10px] px-6 pb-[26px] pt-[22px]">
                  <span className={`text-[11px] font-bold uppercase tracking-[0.12em] text-[#7a4f80]`}>
                    {r.category} · {r.readTime}
                  </span>
                  <span className={`${serif} text-[21px] leading-[1.3] text-[#0f0014]`}>{r.title}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-[1200px] px-6 pt-28">
        <div className="relative overflow-hidden rounded-[36px] bg-[#330d3b] px-[clamp(28px,6vw,72px)] py-[clamp(48px,7vw,88px)] text-center shadow-[0_28px_80px_rgba(15,0,20,0.18)]">
          <div className="absolute right-[-120px] top-[-120px] h-[360px] w-[360px] rounded-full bg-[rgba(233,181,237,0.18)] blur-[40px]" />
          <h2 className={`${serif} relative m-0 mb-4 text-[clamp(34px,4.4vw,48px)] font-medium leading-[1.15] text-[#fff7fd]`}>
            Begin Your Garbhika Journey
          </h2>
          <p className="relative mx-auto mb-8 max-w-[580px] text-[18px] leading-[1.65] text-[rgba(255,247,253,0.82)]">
            Whether you&apos;re preparing for pregnancy or already navigating your first, second or third
            trimester, Garbhika is designed to support your journey with education, expert guidance and
            wellbeing-focused services.
          </p>
          <Link
            to="/book-consultation/"
            className="relative inline-flex items-center gap-2 rounded-full bg-[#fff7fd] px-7 py-[17px] text-base font-medium text-[#0f0014] no-underline transition-colors hover:bg-[#fed6ff] hover:text-[#0f0014]"
          >
            Book a Consultation <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </section>
    </>
  )
}
