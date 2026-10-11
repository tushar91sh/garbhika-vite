import { Link } from 'react-router-dom'
import { servicesLanding } from '../data/services.js'
import {
  SubpageHero,
  SolidLink,
  InlineLink,
  serif,
  wrap,
  bandClass,
  twoColGrid,
  h2SmallClass,
  serviceIcons,
} from '../components/common/DesignKit.jsx'

export default function Services() {
  return (
    <div>
      <SubpageHero
        eyebrow="Services"
        title="Pregnancy Care & Wellness Services"
        leadMax="max-w-[640px]"
        bottom="pb-[clamp(48px,6vw,72px)]"
      >
        Garbhika brings together pregnancy care and wellness services designed to support different aspects
        of your pregnancy journey.
      </SubpageHero>

      <section className={bandClass}>
        <div className={`${wrap} py-[clamp(56px,8vw,96px)]`}>
          <h2 className={`${h2SmallClass} mb-10`}>Our Services</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-4">
            {servicesLanding.map((card, i) => (
              <Link
                key={card.to}
                to={card.to}
                className="flex flex-col gap-4 rounded-[26px] border border-[rgba(208,195,205,0.55)] bg-white p-[30px] no-underline shadow-[0_10px_35px_rgba(51,13,59,0.04)] transition-[transform,box-shadow] duration-[250ms] ease-in-out hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(51,13,59,0.12)]"
              >
                <span className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-[14px] bg-[#efe5ee] text-[#0f0014]">
                    <span className="material-symbols-outlined">{serviceIcons[card.to]}</span>
                  </span>
                  <span className={`${serif} text-[20px] italic text-[#a576aa]`}>{`0${i + 1}`}</span>
                </span>
                <h3 className={`${serif} m-0 text-[24px] font-normal leading-[1.25] text-[#0f0014]`}>{card.heading}</h3>
                <span className="flex-1 text-[15px] leading-[1.6] text-[#4d444c]">{card.body}</span>
                <span className="inline-flex items-center gap-[6px] text-sm font-medium text-[#0f0014]">
                  Explore <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`${wrap} ${twoColGrid} pt-[clamp(56px,8vw,96px)]`}>
        <h2 className={`${h2SmallClass} [text-wrap:balance]`}>Find the Right Support for Your Journey</h2>
        <div className="flex flex-col items-start gap-7">
          <p className="m-0 text-[18px] leading-[1.7] text-[#4d444c]">
            Your needs can change throughout pregnancy. Explore the service relevant to your current stage or
            speak with our team to understand the available options. Explore your{' '}
            <InlineLink to="/pregnancy-journey/">pregnancy journey</InlineLink> to see how our services map to
            each stage.
          </p>
          <SolidLink to="/book-consultation/">Book a Consultation</SolidLink>
        </div>
      </section>
    </div>
  )
}
