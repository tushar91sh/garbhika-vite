import { Link } from 'react-router-dom'
import { journeyPhases, fourthTrimesterCards } from '../data/journeyPhases.js'
import { journeyStats } from '../data/stats.js'
import { journeyChecklistItems, phaseTestimonials } from '../data/journeyExtras.js'
import StatsBar from '../components/common/StatsBar.jsx'
import FadeIn from '../components/motion/FadeIn.jsx'
import { StaggerGrid, StaggerItem } from '../components/motion/StaggerGrid.jsx'
import Button from '../components/common/Button.jsx'
import { ServiceSection, BulletList, RelatedLinks } from '../components/common/ServiceLayout.jsx'

const nodeColors = ['bg-primary', 'bg-primary-container', 'bg-surface-tint', 'bg-plum-deep']

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

export default function Journey() {
  return (
    <main className="pb-section-padding">
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pt-12 pb-section-padding">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <FadeIn direction="right" className="md:col-span-7 space-y-6">
            <span className="font-label-caps text-label-caps text-primary-container tracking-widest uppercase">
              The Pathway
            </span>
            <h1 className="font-display-lg text-display-lg text-primary tracking-tight">
              Your Pregnancy Journey: From Preparation to Postpartum
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              Pregnancy is a journey of continuous physical, emotional and lifestyle changes. Understanding
              the different stages can help you prepare for what may come next and identify areas where
              additional support may be useful.
            </p>
          </FadeIn>
          <FadeIn direction="left" delay={0.1} className="md:col-span-5 mt-12 md:mt-0 relative">
            <div className="aspect-[4/5] rounded-t-full rounded-b-full overflow-hidden bg-surface-container-high p-2">
              <img
                className="w-full h-full object-cover rounded-t-full rounded-b-full shadow-[0_20px_40px_rgba(75,36,82,0.08)]"
                alt="A serene South Asian woman looking thoughtfully out a large window bathed in soft morning light."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2yGcyPV3qMPftvJmmL-0kv7Yj__yDHKeYWKnxGyrED37KDy_hFhTwULxysE7o_KqZLW6yc82nC07dRE3BywAaty4-658DL5kLPtunfgp93nHsNqqNE0AUTi09o5qRWd5UODrH-XVghJshMvW2ids7_gzGgMG_N_DUqsVb3MG7PkXMYsWxmIl8bh73FlHEL5lh1Hjwn7dwV4AR1ZHjj6lf-K-mSQa7Mwi0wpJ9eYv1FjClncLV_Q"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pb-section-padding">
        <FadeIn>
          <StatsBar stats={journeyStats} />
        </FadeIn>
      </section>

      {/* Spec-required six-stage guide, with dedicated in-page anchors */}
      {stages.map((stage) => (
        <ServiceSection key={stage.id} id={stage.id} heading={stage.title}>
          <p>{stage.body}</p>
          <BulletList items={stage.items} columns={2} />
          {stage.links && <RelatedLinks links={stage.links} />}
        </ServiceSection>
      ))}

      <div className="relative bg-surface-container-low py-section-padding border-t border-surface-variant">
        <FadeIn className="max-w-container-max mx-auto px-margin-mobile md:px-gutter mb-4">
          <span className="block font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase">
            Our Approach at Each Stage
          </span>
        </FadeIn>
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent transform -translate-x-1/2" />
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter space-y-section-padding">
          {journeyPhases.map((stage, index) => {
            const reversed = index % 2 === 1
            const testimonial = phaseTestimonials[stage.id]
            return (
              <section
                key={stage.id}
                className="relative grid grid-cols-1 md:grid-cols-12 gap-gutter items-center"
              >
                <FadeIn
                  direction={reversed ? 'left' : 'right'}
                  className={`md:col-span-5 space-y-6 relative z-10 ${
                    reversed ? 'order-2 md:order-3' : 'order-2 md:order-1 md:text-right'
                  }`}
                >
                  <span className="font-label-caps text-label-caps text-primary-container">{stage.phase}</span>
                  <h2 className="font-headline-lg text-headline-lg text-primary">{stage.title}</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">{stage.description}</p>
                  <div
                    className={`bg-surface rounded-xl p-6 shadow-[0_8px_24px_rgba(75,36,82,0.04)] border border-surface-variant/50 mt-8 ${
                      reversed ? '' : 'inline-block text-left'
                    }`}
                  >
                    <h3 className="font-headline-md text-[20px] text-primary mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary-container">{stage.icon}</span>{' '}
                      Garbhika Support
                    </h3>
                    <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
                      {stage.support.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-base mt-1 text-surface-tint">check</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {testimonial && (
                    <blockquote
                      className={`font-body-md text-sm italic text-on-surface-variant border-l-2 border-primary-container pl-4 mt-6 ${
                        reversed ? '' : 'md:border-l-0 md:border-r-2 md:pl-0 md:pr-4'
                      }`}
                    >
                      "{testimonial.quote}"
                      <cite className="block not-italic text-xs mt-2 text-outline">— {testimonial.author}</cite>
                    </blockquote>
                  )}
                </FadeIn>

                <div className="hidden md:flex col-span-2 justify-center items-center relative z-20 order-2">
                  <div
                    className={`w-4 h-4 rounded-full ${nodeColors[index % nodeColors.length]} ring-8 ring-surface-bright shadow-sm`}
                  />
                </div>

                <FadeIn
                  direction={reversed ? 'right' : 'left'}
                  delay={0.1}
                  className={`md:col-span-5 ${reversed ? 'order-1' : 'order-1 md:order-3'}`}
                >
                  <div className="aspect-square rounded-xl overflow-hidden">
                    <img
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                      alt={stage.title}
                      src={stage.image}
                    />
                  </div>
                </FadeIn>
              </section>
            )
          })}

          <section className="relative grid grid-cols-1 md:grid-cols-12 gap-gutter items-center pt-12">
            <FadeIn className="md:col-span-12 text-center mb-12">
              <span className="material-symbols-outlined text-4xl text-primary/20 mb-4">favorite</span>
              <h2 className="font-display-lg text-display-lg text-primary">The Fourth Trimester</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mt-4">
                The journey doesn't end at birth; it transforms. Our postpartum care focuses intensely on the
                mother's healing, nourishment, and emotional grounding as she steps into this new paradigm.
              </p>
            </FadeIn>
            <StaggerGrid className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-base-unit">
              {fourthTrimesterCards.map((card) => {
                if (card.variant === 'image') {
                  return (
                    <StaggerItem
                      key={card.id}
                      className="bg-surface p-8 rounded-xl flex flex-col justify-between aspect-square relative overflow-hidden group"
                    >
                      <img
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                        alt={card.title}
                        src={card.image}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-plum/90 via-charcoal-plum/40 to-transparent" />
                      <span className="material-symbols-outlined text-3xl text-surface-bright relative z-10 mb-6">
                        {card.icon}
                      </span>
                      <div className="relative z-10 mt-auto">
                        <h4 className="font-headline-md text-[24px] text-surface-bright mb-2">{card.title}</h4>
                        <p className="font-body-md text-body-md text-surface-bright/80">{card.description}</p>
                      </div>
                    </StaggerItem>
                  )
                }
                const bg = card.variant === 'muted' ? 'bg-surface-container' : 'bg-surface-pink'
                return (
                  <StaggerItem
                    key={card.id}
                    className={`${bg} p-8 rounded-xl flex flex-col justify-between aspect-square group hover:bg-primary-fixed transition-colors duration-500`}
                  >
                    <span className="material-symbols-outlined text-3xl text-surface-tint mb-6">{card.icon}</span>
                    <div>
                      <h4 className="font-headline-md text-[24px] text-primary mb-2">{card.title}</h4>
                      <p className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary-container transition-colors">
                        {card.description}
                      </p>
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerGrid>
          </section>
        </div>
      </div>

      {/* Checklist CTA */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-padding">
        <FadeIn className="bg-surface-container-low rounded-2xl p-8 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
          <div className="space-y-6">
            <span className="font-label-caps text-label-caps text-primary-container tracking-widest uppercase">
              Free Download
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary">
              Your Complete Journey Companion Kit
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Every member gets instant access to our most-loved planning tools — no extra cost.
            </p>
            <Link to="/book-consultation/">
              <Button>Get the Companion Kit</Button>
            </Link>
          </div>
          <ul className="space-y-4">
            {journeyChecklistItems.map((item) => (
              <li key={item} className="flex items-start gap-3 bg-surface rounded-xl p-4 font-body-md text-body-md text-on-surface-variant">
                <span className="material-symbols-outlined text-primary mt-0.5">description</span>
                {item}
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-padding text-center">
        <FadeIn>
          <span className="material-symbols-outlined text-6xl text-primary-fixed-dim mb-6">format_quote</span>
          <blockquote className="font-display-lg text-[40px] md:text-display-lg italic text-primary max-w-4xl mx-auto leading-tight">
            "Motherhood is a profound transformation. We are here not just to guide, but to hold the space for
            your emergence."
          </blockquote>
        </FadeIn>
      </section>

      <ServiceSection heading="Support Throughout Your Journey" tint>
        <p>Garbhika offers services covering different aspects of pregnancy wellbeing.</p>
        <RelatedLinks
          links={[
            { label: 'Pregnancy Guidance', to: '/services/pregnancy-guidance/' },
            { label: 'Pregnancy Nutrition', to: '/services/pregnancy-nutrition/' },
            { label: 'Pregnancy Yoga', to: '/services/pregnancy-yoga/' },
            { label: 'Mental Wellness', to: '/services/mental-wellness/' },
            { label: 'Services', to: '/services/' },
          ]}
        />
      </ServiceSection>
    </main>
  )
}
