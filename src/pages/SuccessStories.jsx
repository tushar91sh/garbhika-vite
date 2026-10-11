import { Link } from 'react-router-dom'
import { testimonialBank } from '../data/testimonials.js'
import {
  SubpageHero,
  InlineLink,
  BulletGrid,
  serif,
  wrap,
  twoColGrid,
  h2SmallClass,
} from '../components/common/DesignKit.jsx'

const storyThemes = [
  'Pregnancy journeys',
  'First-time motherhood',
  'Pregnancy wellness',
  'Garbh Sanskar experiences',
  'Prenatal yoga experiences',
  'Preparing for motherhood',
]

const allStories = [...testimonialBank.home, ...testimonialBank.journey, ...testimonialBank.support]

const storyBg = ['bg-white', 'bg-[#e2ddf5]', 'bg-[#faf1fa]']

const communityLinks = [
  { label: 'Garbhika Community', to: '/community/' },
  { label: 'Contact Us', to: '/contact-us/' },
]

export default function SuccessStories() {
  return (
    <div>
      <SubpageHero eyebrow="Success Stories" title="Pregnancy Journeys & Motherhood Stories">
        Every pregnancy journey is unique. Through stories and experiences shared by our community,
        discover different perspectives on pregnancy, wellbeing and the transition into motherhood.
      </SubpageHero>

      <section className="border-t border-[rgba(208,195,205,0.45)] bg-[#faf1fa]">
        <div className={`${wrap} ${twoColGrid} py-[clamp(56px,8vw,96px)]`}>
          <h2 className={h2SmallClass}>Real Experiences. Different Journeys.</h2>
          <div className="flex flex-col gap-5">
            <BulletGrid items={storyThemes} min={220} />
            <p className="m-0 text-[18px] leading-[1.7] text-[#4d444c]">
              Read more about the <InlineLink to="/pregnancy-journey/">pregnancy journey</InlineLink> our mothers
              describe, or explore <InlineLink to="/services/garbh-sanskar/">Garbh Sanskar experiences</InlineLink>{' '}
              shared by our community.
            </p>
          </div>
        </div>
      </section>

      <section className={`${wrap} py-24`}>
        <div className="[column-gap:16px] [columns:3_300px]">
          {allStories.map((t, i) => (
            <figure
              key={t.id}
              className={`m-0 mb-4 flex flex-col gap-5 rounded-[24px] border border-[rgba(208,195,205,0.5)] p-[30px] [break-inside:avoid] ${storyBg[i % 3]}`}
            >
              <span className="material-symbols-outlined icon-fill !text-[28px] text-[#a576aa]">format_quote</span>
              <blockquote className={`${serif} m-0 text-[21px] italic leading-[1.45] text-[#0f0014]`}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="text-sm text-[#4d444c]">— {t.author}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={`${wrap} pt-24`}>
        <div className="flex flex-wrap items-center justify-between gap-7 rounded-[32px] bg-[#330d3b] p-[clamp(32px,5vw,56px)]">
          <div className="flex-[1_1_320px]">
            <h2 className={`${serif} m-0 mb-2 text-[clamp(28px,3.4vw,40px)] font-medium text-[#fff7fd]`}>
              Be Part of the Garbhika Community
            </h2>
            <p className="m-0 text-[17px] text-[rgba(255,247,253,0.8)]">
              Have a pregnancy or motherhood experience you&apos;d like to share?
            </p>
          </div>
          <div className="flex flex-wrap gap-[10px]">
            {communityLinks.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                className={`inline-flex items-center gap-[6px] rounded-full px-[22px] py-[13px] text-[15px] no-underline transition-colors ${
                  i === 0
                    ? 'bg-[#fff7fd] text-[#0f0014] hover:bg-[#fed6ff] hover:text-[#0f0014]'
                    : 'border border-[rgba(255,247,253,0.4)] text-[#fff7fd] hover:bg-[rgba(255,247,253,0.1)] hover:text-[#fff7fd]'
                }`}
              >
                {link.label}
                <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
