import { Link } from 'react-router-dom'
import { Eyebrow, Glow, PillLink, InlineLink, serif, h1Class, h2SmallClass } from '../components/common/DesignKit.jsx'

const sections = [
  {
    heading: 'Our Approach to Pregnancy Wellness',
    paras: [
      <>
        Our approach looks at pregnancy as a complete journey. Through{' '}
        <InlineLink to="/services/garbh-sanskar/">Garbh Sanskar</InlineLink>,{' '}
        <InlineLink to="/services/pregnancy-yoga/">prenatal yoga</InlineLink>,{' '}
        <InlineLink to="/services/pregnancy-nutrition/">pregnancy nutrition</InlineLink>,{' '}
        <InlineLink to="/services/psychological-support/">psychological support</InlineLink>,{' '}
        <InlineLink to="/services/mental-wellness/">mental wellness</InlineLink> and{' '}
        <InlineLink to="/services/pregnancy-guidance/">pregnancy guidance</InlineLink>, Garbhika aims to
        provide a supportive ecosystem around expecting mothers.
      </>,
      'Our services are intended to complement, not replace, appropriate medical care.',
    ],
  },
  {
    heading: 'Our Mission',
    paras: [
      'Our mission is to make pregnancy support more accessible, understandable and connected. We want expecting mothers to have a place where they can discover educational resources, explore wellness services and connect with professionals and a supportive community.',
    ],
  },
  {
    heading: 'Supporting Different Stages of Pregnancy',
    paras: [
      'From preconception care and pregnancy preparation to the first, second and third trimesters, each stage can bring different questions and needs.',
    ],
    links: [
      { label: 'Pregnancy Journey', to: '/pregnancy-journey/' },
      { label: 'Our Experts', to: '/experts/' },
      { label: 'Community', to: '/community/' },
      { label: 'Services', to: '/services/' },
      { label: 'Book a Consultation', to: '/book-consultation/' },
    ],
  },
]

export default function AboutUs() {
  return (
    <main className="overflow-hidden">
      <section className="relative mx-auto max-w-[1200px] px-6 pb-[clamp(48px,6vw,80px)] pt-[clamp(48px,7vw,96px)]">
        <Glow />
        <div className="relative flex max-w-[860px] flex-col gap-6">
          <Eyebrow>About Garbhika</Eyebrow>
          <h1 className={h1Class}>About Garbhika</h1>
          <div className="flex max-w-[680px] flex-col gap-[14px] text-[19px] leading-[1.65] text-[#4d444c] [text-wrap:pretty]">
            <p className="m-0">
              Garbhika is a pregnancy wellness and support platform created to help expecting mothers navigate
              pregnancy with greater awareness, guidance and confidence.
            </p>
            <p className="m-0">
              Pregnancy is more than a physical journey. It can involve changes in nutrition, movement,
              emotions, routines and relationships. Garbhika brings these areas together through{' '}
              <InlineLink to="/services/">expert-led services</InlineLink>, educational resources and
              community support.
            </p>
          </div>
        </div>
      </section>

      {sections.map((sec, i) => (
        <section
          key={sec.heading}
          className={`scroll-mt-[100px] border-t border-[rgba(208,195,205,0.45)] ${i % 2 === 0 ? 'bg-[#faf1fa]' : 'bg-transparent'}`}
        >
          <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-x-16 gap-y-6 px-6 py-[clamp(56px,8vw,96px)]">
            <div className="flex flex-col gap-[14px]">
              <span className={`${serif} text-[22px] italic text-[#a576aa]`}>{String(i + 1).padStart(2, '0')}</span>
              <h2 className={`${h2SmallClass} [text-wrap:balance]`}>{sec.heading}</h2>
            </div>
            <div className="flex flex-col gap-5 text-[18px] leading-[1.7] text-[#4d444c] [text-wrap:pretty]">
              {sec.paras.map((p, idx) => (
                <p key={idx} className="m-0">
                  {p}
                </p>
              ))}
              {sec.links && (
                <div className="flex flex-wrap gap-[10px] pt-1">
                  {sec.links.map((l) => (
                    <PillLink key={l.to} to={l.to}>
                      {l.label}
                    </PillLink>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-[1200px] px-6 pt-24">
        <div className="relative overflow-hidden rounded-[36px] bg-[#330d3b] px-[clamp(28px,6vw,72px)] py-[clamp(48px,7vw,88px)] text-center">
          <div className="absolute right-[-120px] top-[-120px] h-[360px] w-[360px] rounded-full bg-[rgba(233,181,237,0.18)] blur-[40px]" />
          <h2 className={`${serif} relative m-0 mb-4 text-[clamp(34px,4.4vw,48px)] font-medium leading-[1.15] text-[#fff7fd]`}>
            Begin Your Garbhika Journey
          </h2>
          <p className="relative mx-auto mb-8 max-w-[560px] text-[18px] leading-[1.65] text-[rgba(255,247,253,0.82)]">
            Whether you&apos;re preparing for pregnancy or already navigating a trimester, our team can help you
            find the right support.
          </p>
          <Link
            to="/book-consultation/"
            className="relative inline-flex items-center gap-2 rounded-full bg-[#fff7fd] px-7 py-[17px] text-base font-medium text-[#0f0014] no-underline transition-colors hover:bg-[#fed6ff] hover:text-[#0f0014]"
          >
            Book a Consultation <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
