import { Link } from 'react-router-dom'
import FadeIn from '../motion/FadeIn.jsx'

/**
 * Shared presentational building blocks for the content-spec pages
 * (Services landing + the six service-detail pages, About Us, FAQs,
 * Success Stories, Book a Consultation, etc). Kept separate from the
 * page-specific JSX so every page can hold exact copy/links from the
 * build spec while still sharing one consistent look with the rest of
 * the site (same fonts, colors, spacing as Home/Experts/Journey).
 */

export function PageHero({ eyebrow, h1: H1Text, children, className = '' }) {
  return (
    <section className={`relative max-w-container-max mx-auto px-margin-mobile md:px-gutter pt-14 md:pt-20 pb-16 md:pb-24 ${className}`}>
      <div className="pointer-events-none absolute right-[-8rem] top-[-4rem] h-72 w-72 rounded-full bg-primary-fixed-dim/20 blur-3xl" />
      <FadeIn className="premium-surface relative max-w-4xl rounded-[32px] px-6 py-10 md:px-12 md:py-14 space-y-6">
        {eyebrow && (
          <span className="inline-flex rounded-full bg-surface-container-high px-4 py-2 font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase">
            {eyebrow}
          </span>
        )}
        <h1 className="font-display-lg text-display-lg text-primary text-[40px] md:text-[60px] leading-[1.08] tracking-[-0.025em]">
          {H1Text}
        </h1>
        <div className="space-y-4 font-body-lg text-body-lg text-on-surface-variant max-w-2xl">{children}</div>
      </FadeIn>
    </section>
  )
}

export function ServiceSection({ id, heading, level = 'h2', eyebrow, tint, children }) {
  const Heading = level
  const headingClass =
    level === 'h1'
      ? 'font-display-lg text-display-lg text-primary text-[36px] md:text-[48px]'
      : level === 'h3'
        ? 'font-headline-md text-headline-md text-primary'
        : 'font-headline-lg text-headline-lg text-primary'

  return (
    <section id={id} className={`${tint ? 'bg-surface-container-low/80 border-y border-outline-variant/40' : ''} scroll-mt-28`}>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-16 md:py-24">
        <FadeIn className="space-y-7">
          {eyebrow && (
            <span className="block font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase">
              {eyebrow}
            </span>
          )}
          <div className="flex items-start gap-4">
            <span className="mt-2 hidden h-px w-10 bg-surface-tint sm:block" />
            <Heading className={`${headingClass} max-w-3xl tracking-[-0.02em]`}>{heading}</Heading>
          </div>
          <div className="space-y-4 font-body-lg text-body-lg text-on-surface-variant max-w-3xl">{children}</div>
        </FadeIn>
      </div>
    </section>
  )
}

export function BulletList({ items, columns = 1 }) {
  return (
    <ul
      className={`grid gap-3 mt-2 ${columns === 2 ? 'sm:grid-cols-2' : 'grid-cols-1'} max-w-3xl`}
    >
      {items.map((item) => (
        <li
          key={item}
          className="group flex items-start gap-3 bg-surface-bright rounded-2xl px-5 py-4 font-body-md text-body-md text-on-surface-variant border border-outline-variant/55 shadow-[0_6px_20px_rgba(51,13,59,0.035)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-fixed-dim hover:shadow-[0_12px_30px_rgba(51,13,59,0.08)]"
        >
          <span className="material-symbols-outlined text-primary text-lg mt-0.5 flex-shrink-0 transition-transform group-hover:scale-110">check_circle</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

export function RelatedLinks({ title = 'Explore related support', links }) {
  return (
    <div className="pt-2">
      {title && (
        <span className="block font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase mb-4">
          {title}
        </span>
      )}
      <div className="flex flex-wrap gap-3">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="inline-flex items-center gap-2 rounded-full border border-primary/60 bg-surface-bright text-primary px-5 py-2.5 font-body-md text-sm shadow-sm hover:-translate-y-0.5 hover:bg-primary hover:text-on-primary hover:shadow-md transition-all duration-200"
          >
            {link.label}
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function PrimaryCTA({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-on-primary px-8 py-4 font-body-md text-body-md shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
    >
      {children}
      <span className="material-symbols-outlined text-base">arrow_forward</span>
    </Link>
  )
}

export function ClosingCTA({ heading, children, ctaLabel = 'Book a Consultation', ctaTo = '/book-consultation/' }) {
  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-padding">
      <FadeIn className="relative overflow-hidden bg-primary rounded-[32px] px-8 py-16 md:px-16 md:py-20 text-center shadow-[0_28px_80px_rgba(15,0,20,0.18)]">
        <h2 className="font-headline-lg text-headline-lg text-surface-bright mb-4">{heading}</h2>
        <p className="font-body-lg text-body-lg text-surface-bright/80 max-w-xl mx-auto mb-8">{children}</p>
        <Link
          to={ctaTo}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-surface-bright text-primary px-8 py-4 font-body-md text-body-md hover:opacity-90 transition-all duration-200"
        >
          {ctaLabel}
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Link>
      </FadeIn>
    </section>
  )
}

/** Six-card services grid used identically on Home and the Services landing page. */
export function ServiceCardsGrid({ cards }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
      {cards.map((card) => (
        <div
          key={card.to}
          className="group relative overflow-hidden bg-surface-bright rounded-[24px] p-7 md:p-8 shadow-[0_10px_35px_rgba(51,13,59,0.05)] hover:shadow-[0_22px_55px_rgba(51,13,59,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col gap-4 h-full border border-outline-variant/50"
        >
          <h3 className="m-0">
            <Link to={card.to} className="font-headline-md text-[22px] text-primary hover:opacity-80">
              {card.heading}
            </Link>
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant flex-grow">{card.body}</p>
          <Link
            to={card.to}
            className="mt-2 flex items-center gap-2 text-primary font-body-md text-sm group-hover:gap-3 transition-all w-fit"
          >
            Explore <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      ))}
    </div>
  )
}
