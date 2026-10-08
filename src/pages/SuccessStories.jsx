import { Link } from 'react-router-dom'
import { PageHero, ServiceSection, BulletList, RelatedLinks } from '../components/common/ServiceLayout.jsx'
import { testimonialBank } from '../data/testimonials.js'
import { StaggerGrid, StaggerItem } from '../components/motion/StaggerGrid.jsx'

const storyThemes = [
  'Pregnancy journeys',
  'First-time motherhood',
  'Pregnancy wellness',
  'Garbh Sanskar experiences',
  'Prenatal yoga experiences',
  'Preparing for motherhood',
]

const allStories = [...testimonialBank.home, ...testimonialBank.journey, ...testimonialBank.support]

export default function SuccessStories() {
  return (
    <main>
      <PageHero eyebrow="Success Stories" h1="Pregnancy Journeys & Motherhood Stories">
        <p>
          Every pregnancy journey is unique. Through stories and experiences shared by our community,
          discover different perspectives on pregnancy, wellbeing and the transition into motherhood.
        </p>
      </PageHero>

      <ServiceSection heading="Real Experiences. Different Journeys." tint>
        <BulletList items={storyThemes} columns={2} />
        <p className="pt-2">
          Read more about the{' '}
          <Link to="/pregnancy-journey/" className="text-primary underline hover:opacity-70">
            pregnancy journey
          </Link>{' '}
          our mothers describe, or explore{' '}
          <Link to="/services/garbh-sanskar/" className="text-primary underline hover:opacity-70">
            Garbh Sanskar experiences
          </Link>{' '}
          shared by our community.
        </p>
      </ServiceSection>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-12">
        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {allStories.map((t) => (
            <StaggerItem
              key={t.id}
              className="bg-surface-container-low rounded-2xl p-8 flex flex-col justify-between h-full"
            >
              <p className="font-headline-md text-[18px] text-primary italic leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <cite className="font-body-md text-sm text-on-surface-variant not-italic">— {t.author}</cite>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      <ServiceSection heading="Be Part of the Garbhika Community" tint>
        <p>Have a pregnancy or motherhood experience you&apos;d like to share?</p>
        <RelatedLinks
          links={[
            { label: 'Garbhika Community', to: '/community/' },
            { label: 'Contact Us', to: '/contact-us/' },
          ]}
        />
      </ServiceSection>
    </main>
  )
}
