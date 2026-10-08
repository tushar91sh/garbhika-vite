import { Link } from 'react-router-dom'
import Button from '../components/common/Button.jsx'
import StatsBar from '../components/common/StatsBar.jsx'
import FadeIn from '../components/motion/FadeIn.jsx'
import { ServiceCardsGrid, BulletList, RelatedLinks } from '../components/common/ServiceLayout.jsx'
import { homeStats } from '../data/stats.js'
import { services } from '../data/services.js'

const orbitNodes = [
  { icon: 'psychology', label: 'Psychologist', position: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2' },
  { icon: 'restaurant', label: 'Nutrition', position: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2' },
  { icon: 'self_improvement', label: 'Yoga', position: 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2' },
  { icon: 'forum', label: 'Community', position: 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2' },
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
  'Holistic support across physical, emotional and lifestyle dimensions',
  'Expert-led guidance across relevant areas of pregnancy wellness',
  'Support throughout preparation, pregnancy and postpartum stages',
  'A supportive community for expecting mothers',
]

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center px-margin-mobile md:px-gutter pt-16 pb-24 max-w-container-max mx-auto relative overflow-hidden">
        <div className="pointer-events-none absolute left-[-10rem] top-12 h-96 w-96 rounded-full bg-primary-fixed-dim/25 blur-3xl" />
        <div className="pointer-events-none absolute right-[-8rem] top-72 h-80 w-80 rounded-full bg-secondary-container/60 blur-3xl" />
        <FadeIn className="text-center z-10 max-w-4xl mb-12" duration={0.8}>
          <span className="block font-label-caps text-label-caps text-on-surface-variant mb-6 tracking-widest uppercase">
            Welcome to Garbhika
          </span>
          <h1 className="font-display-lg text-[46px] sm:text-[58px] md:text-[72px] text-primary mb-8 leading-[1.05] tracking-[-0.035em]">
            A More Supported Pregnancy Journey Begins with Garbhika
          </h1>
          <div className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto space-y-4">
            <p>
              Pregnancy is a beautiful journey, but it can also bring new questions, physical changes and
              emotional challenges. Garbhika brings together{' '}
              <Link to="/services/pregnancy-guidance/" className="text-primary underline hover:opacity-70">
                pregnancy guidance
              </Link>
              , wellness support and expert-led{' '}
              <Link to="/services/" className="text-primary underline hover:opacity-70">
                services
              </Link>{' '}
              to help you navigate this journey with greater awareness and confidence.
            </p>
            <p>
              From{' '}
              <Link to="/services/garbh-sanskar/" className="text-primary underline hover:opacity-70">
                Garbh Sanskar
              </Link>{' '}
              and{' '}
              <Link to="/services/pregnancy-yoga/" className="text-primary underline hover:opacity-70">
                prenatal yoga
              </Link>{' '}
              to{' '}
              <Link to="/services/pregnancy-nutrition/" className="text-primary underline hover:opacity-70">
                pregnancy nutrition
              </Link>
              ,{' '}
              <Link to="/services/mental-wellness/" className="text-primary underline hover:opacity-70">
                mental wellness
              </Link>{' '}
              and emotional support, Garbhika provides a holistic approach to pregnancy wellbeing.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-consultation/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-on-primary px-8 py-4 font-body-md text-body-md shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
            >
              Start Your Garbhika Journey <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
            <Link
              to="/services/"
              className="inline-flex items-center justify-center rounded-full border border-primary/60 bg-surface-bright/80 text-primary px-8 py-4 font-body-md text-body-md shadow-sm hover:-translate-y-0.5 hover:bg-primary hover:text-on-primary hover:shadow-md transition-all duration-200"
            >
              Explore Our Services
            </Link>
          </div>
        </FadeIn>

        <FadeIn direction="none" delay={0.2} duration={0.9} className="w-full relative h-[420px] md:h-[560px] flex items-center justify-center">
          <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-[38%_62%_54%_46%/48%_42%_58%_52%] overflow-hidden z-20 shadow-[0_28px_80px_rgba(51,13,59,0.22)] border-[6px] border-surface-bright">
            <img
              alt="A serene South Asian mother-to-be gently holding her belly, bathed in warm natural light."
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwdyUTBDiWYVvsFNXIWQu_HT08E8GDVPhoqqwFzBqqlmDgLgrXNy8mwTkpGXBrjyFv0Z93Wy2ET_E0lcKuiMmbJLuizxygtf7qpT3Pw9VcKWytEsf1VGpOIsLBkg3Id2Bf7OU50jhF2pAxuDK4j4_IYWhMjDZ_FsXf063oHLPm-B1vCgUHiZ03BAxMs1RCz-_Y1sE5ENSN4pSAtyyxc8pQmG6lsbvxzJNhFoLqDtHiy1FCrTEb8w"
            />
          </div>
          <div className="absolute w-[320px] h-[320px] md:w-[600px] md:h-[600px] rounded-full border border-surface-variant animate-[spin_60s_linear_infinite] opacity-50 z-10">
            {orbitNodes.map((node) => (
              <div
                key={node.label}
                className={`absolute ${node.position} bg-surface-bright px-4 py-2 rounded-full shadow-sm text-sm font-medium flex items-center gap-2 border border-surface-variant whitespace-nowrap`}
              >
                <span className="material-symbols-outlined text-primary">{node.icon}</span> {node.label}
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* 2. Stages of support */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pb-section-padding">
        <FadeIn className="space-y-6">
          <h2 className="font-headline-lg text-headline-lg text-primary">Holistic Pregnancy Support for Every Stage</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Every pregnancy is different. Your needs can change from the time you begin preparing for pregnancy
            through each trimester and into the postpartum period.
          </p>
          <BulletList items={stagesOfSupport} columns={2} />
          <RelatedLinks title="" links={[{ label: 'Pregnancy Journey', to: '/pregnancy-journey/' }]} />
        </FadeIn>
      </section>

      {/* 3. Services grid */}
      <section className="bg-surface-container-low py-section-padding">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <FadeIn className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
            <h2 className="font-headline-lg text-headline-lg text-primary">Our Pregnancy Wellness Services</h2>
          </FadeIn>
          <ServiceCardsGrid cards={services} />
        </div>
      </section>

      {/* 4. Differentiators */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-padding">
        <FadeIn className="space-y-6">
          <h2 className="font-headline-lg text-headline-lg text-primary">Why Garbhika?</h2>
          <BulletList items={differentiators} columns={2} />
          <RelatedLinks
            title=""
            links={[
              { label: 'Community', to: '/community/' },
              { label: 'Our Experts', to: '/experts/' },
            ]}
          />
        </FadeIn>
      </section>

      {/* 5. Education teaser */}
      <section className="bg-surface-container-low py-section-padding">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <FadeIn className="space-y-6 max-w-2xl">
            <h2 className="font-headline-lg text-headline-lg text-primary">Learn More About Pregnancy</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              From first trimester symptoms and pregnancy diet to prenatal yoga, Garbh Sanskar and birth
              preparation, our{' '}
              <Link to="/resources/" className="text-primary underline hover:opacity-70">
                educational resources
              </Link>{' '}
              help you explore important pregnancy topics.
            </p>
            <RelatedLinks title="" links={[{ label: 'Resources', to: '/resources/' }]} />
          </FadeIn>
        </div>
      </section>

      {/* Stats (supplementary) */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-padding">
        <FadeIn>
          <StatsBar stats={homeStats} />
        </FadeIn>
      </section>

      {/* 6. Closing CTA */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pb-section-padding">
        <FadeIn className="bg-primary rounded-2xl px-8 py-16 md:px-16 text-center">
          <h2 className="font-headline-lg text-headline-lg text-surface-bright mb-4">Begin Your Garbhika Journey</h2>
          <p className="font-body-lg text-body-lg text-surface-bright/80 max-w-xl mx-auto mb-8">
            Whether you&apos;re preparing for pregnancy or already navigating your first, second or third
            trimester, Garbhika is designed to support your journey with education, expert guidance and
            wellbeing-focused services.
          </p>
          <Link to="/book-consultation/">
            <Button variant="secondary" className="!bg-surface-bright">
              Book a Consultation
            </Button>
          </Link>
        </FadeIn>
      </section>
    </>
  )
}
