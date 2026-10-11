import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { services } from '../../data/services.js'

/**
 * Presentational building blocks for the refreshed page design
 * (About, Book a Consultation, Contact, Community, Experts).
 * UI only — no data fetching or business logic lives here.
 */

export const serif = "font-['Playfair_Display',serif]"

export const wrap = 'max-w-[1200px] mx-auto px-6'

export const h1Class = `${serif} m-0 font-medium text-[clamp(42px,6vw,68px)] leading-[1.06] tracking-[-0.03em] text-[#0f0014] [text-wrap:balance]`
export const h2Class = `${serif} m-0 font-medium text-[clamp(32px,4vw,46px)] leading-[1.15] tracking-[-0.02em] text-[#0f0014]`
export const h2SmallClass = `${serif} m-0 font-medium text-[clamp(30px,3.6vw,42px)] leading-[1.18] tracking-[-0.02em] text-[#0f0014]`
export const leadClass = 'm-0 text-[19px] leading-[1.65] text-[#4d444c] [text-wrap:pretty]'
export const fieldClass =
  'w-full px-4 py-[14px] rounded-[14px] border border-[#d0c3cd] bg-[#fff7fd] text-base font-normal text-[#1e1a20] outline-none focus:border-[#7a4f80] focus:shadow-[0_0_0_4px_rgba(122,79,128,0.15)]'

export function Eyebrow({ children }) {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#efe5ee] px-[14px] py-2 text-[12px] font-bold uppercase tracking-[0.14em] text-[#4d444c]">
      <span className="h-[6px] w-[6px] rounded-full bg-[#7a4f80]" />
      {children}
    </span>
  )
}

export function Glow({ center = false }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full bg-[rgba(233,181,237,0.3)] ${
        center
          ? 'left-1/2 top-[-40px] h-[320px] w-[520px] -translate-x-1/2 blur-[90px]'
          : 'right-[-120px] top-[-60px] h-[380px] w-[380px] blur-[80px]'
      }`}
    />
  )
}

export function PillLink({ to, children, solid = false, className = '' }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-[6px] rounded-full border px-[18px] py-[10px] text-sm no-underline transition-colors ${
        solid
          ? 'border-[#0f0014] bg-[#0f0014] text-white hover:bg-[#330d3b] hover:text-white'
          : 'border-[rgba(15,0,20,0.45)] bg-[#fff7fd] text-[#0f0014] hover:bg-[#0f0014] hover:text-white'
      } ${className}`}
    >
      {children}
      <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
    </Link>
  )
}

export function InlineLink({ to, children }) {
  return (
    <Link to={to} className="text-[#330d3b] underline hover:text-[#7a4f80]">
      {children}
    </Link>
  )
}

export function DcField({ label, name, error, textarea, rows = 4, className = '', ...props }) {
  const Field = textarea ? 'textarea' : 'input'
  return (
    <label htmlFor={name} className={`flex flex-col gap-[6px] text-[13px] font-semibold text-[#1e1a20] ${className}`}>
      {label}
      <Field
        id={name}
        name={name}
        rows={textarea ? rows : undefined}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`${fieldClass} ${textarea ? 'resize-y' : ''} ${error ? '!border-[#ba1a1a]' : ''}`}
        {...props}
      />
      {error && (
        <span id={`${name}-error`} className="font-normal text-[#ba1a1a]">
          {error}
        </span>
      )}
    </label>
  )
}

export function PrimaryButton({ children, isLoading, className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full border-0 bg-[#0f0014] px-7 py-4 text-base font-medium text-white transition-colors hover:bg-[#330d3b] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
      )}
      {children}
    </button>
  )
}

/** Accordion list — controlled locally, first item open by default. */
export function Faqs({ faqs }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="flex flex-col gap-[10px]">
      {faqs.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={f.id ?? i} className="overflow-hidden rounded-[20px] border border-[rgba(208,195,205,0.6)] bg-white">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-6 py-5 text-left"
            >
              <h3 className={`${serif} m-0 text-[19px] font-medium text-[#0f0014]`}>{f.question}</h3>
              <span className="material-symbols-outlined flex-none text-[#7a4f80]">{isOpen ? 'remove' : 'add'}</span>
            </button>
            {isOpen && <p className="m-0 px-6 pb-[22px] text-base leading-[1.7] text-[#4d444c]">{f.answer}</p>}
          </div>
        )
      })}
    </div>
  )
}

export function formatStat({ value, prefix = '', suffix = '' }) {
  const v = typeof value === 'number' ? value.toLocaleString('en-US') : value
  return `${prefix}${v}${suffix}`
}

/* ------------------------------------------------------------------ */
/* Additions for Services / Service detail / Success Stories / Resources */
/* ------------------------------------------------------------------ */

/** Icon shown for each service (presentational only), keyed by route path. */
export const serviceIcons = {
  '/services/garbh-sanskar/': 'auto_awesome',
  '/services/pregnancy-yoga/': 'self_improvement',
  '/services/pregnancy-nutrition/': 'restaurant',
  '/services/psychological-support/': 'psychiatry',
  '/services/mental-wellness/': 'spa',
  '/services/pregnancy-guidance/': 'explore',
}

export const bandClass = 'border-y border-[rgba(208,195,205,0.45)] bg-[#faf1fa]'
export const twoColGrid =
  'grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-x-16 gap-y-6'

/** Hero used by Services / Success Stories / Resources. */
export function SubpageHero({ eyebrow, title, children, leadMax = 'max-w-[680px]', bottom = 'pb-14' }) {
  return (
    <section className={`${wrap} relative pt-[clamp(48px,7vw,96px)] ${bottom}`}>
      <Glow />
      <div className="relative flex max-w-[860px] flex-col gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className={h1Class}>{title}</h1>
        <p className={`${leadClass} ${leadMax}`}>{children}</p>
      </div>
    </section>
  )
}

/** Solid dark pill link (primary CTA). */
export function SolidLink({ to, children, className = 'px-7 py-[17px] text-base' }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 rounded-full bg-[#0f0014] font-medium text-white no-underline transition-colors hover:bg-[#330d3b] hover:text-white ${className}`}
    >
      {children}
      <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
    </Link>
  )
}

/** Smaller outlined pill link (topic cards). */
export function PillLinkSm({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-[6px] rounded-full border border-[rgba(15,0,20,0.45)] px-4 py-[9px] text-[13px] text-[#0f0014] no-underline transition-colors hover:bg-[#0f0014] hover:text-white"
    >
      {children}
      <span className="material-symbols-outlined !text-[15px]">arrow_forward</span>
    </Link>
  )
}

const bulletMin = {
  220: 'grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))]',
  230: 'grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))]',
}

/** White check-list cards. */
export function BulletGrid({ items, min = 230 }) {
  return (
    <ul className={`m-0 grid list-none gap-[10px] p-0 ${bulletMin[min]}`}>
      {items.map((b) => (
        <li
          key={b}
          className="flex items-start gap-3 rounded-[18px] border border-[rgba(208,195,205,0.55)] bg-white px-[18px] py-4 text-base leading-[1.5] text-[#1e1a20]"
        >
          <span className="material-symbols-outlined icon-fill !text-[20px] text-[#7a4f80]">check_circle</span>
          {b}
        </li>
      ))}
    </ul>
  )
}

export function PillLinks({ links }) {
  return (
    <div className="flex flex-wrap gap-[10px] pt-1">
      {links.map((l) => (
        <PillLink key={l.to} to={l.to}>
          {l.label}
        </PillLink>
      ))}
    </div>
  )
}

/**
 * Service detail page layout: tab strip (real route links), two-column hero,
 * numbered alternating sections. Content is supplied by each page.
 * sections: [{ heading, paragraphs?: ReactNode[], bullets?: string[], links?: {label,to}[] }]
 */
export function ServiceDetail({ to, eyebrow, title, lead, sections }) {
  return (
    <div>
      <div className={`${wrap} pb-0 pt-7`}>
        <nav
          aria-label="Services"
          className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {services.map((s) => (
            <NavLink
              key={s.to}
              to={s.to}
              className={({ isActive }) =>
                `inline-flex flex-none items-center gap-2 whitespace-nowrap rounded-full border px-4 py-[10px] text-sm no-underline transition-colors ${
                  isActive
                    ? 'border-[#0f0014] bg-[#0f0014] text-white hover:text-white'
                    : 'border-[rgba(208,195,205,0.7)] bg-white text-[#4d444c] hover:text-[#0f0014]'
                }`
              }
            >
              <span className="material-symbols-outlined !text-[18px]">{serviceIcons[s.to]}</span>
              {s.heading}
            </NavLink>
          ))}
        </nav>
      </div>

      <section
        className={`${wrap} relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-10 pb-[clamp(48px,6vw,72px)] pt-[clamp(40px,6vw,80px)]`}
      >
        <Glow />
        <div className="relative flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#efe5ee] px-[14px] py-2 text-[12px] font-bold uppercase tracking-[0.14em] text-[#4d444c]">
            <span className="material-symbols-outlined !text-[16px] text-[#7a4f80]">{serviceIcons[to]}</span>
            {eyebrow}
          </span>
          <h1 className={`${serif} m-0 text-[clamp(40px,5.6vw,64px)] font-medium leading-[1.06] tracking-[-0.03em] text-[#0f0014] [text-wrap:balance]`}>
            {title}
          </h1>
        </div>
        <div className="relative flex flex-col items-start gap-6">
          <p className={leadClass}>{lead}</p>
        </div>
      </section>

      {sections.map((sec, i) => (
        <section
          key={sec.heading}
          className={`border-t border-[rgba(208,195,205,0.45)] ${i % 2 === 0 ? 'bg-[#faf1fa]' : 'bg-transparent'}`}
        >
          <div className={`${wrap} ${twoColGrid} py-[clamp(56px,8vw,96px)]`}>
            <div className="flex flex-col gap-[14px]">
              <span className={`${serif} text-[22px] italic text-[#a576aa]`}>{`0${i + 1}`}</span>
              <h2 className={`${h2SmallClass} [text-wrap:balance]`}>{sec.heading}</h2>
            </div>
            <div className="flex flex-col gap-5 text-[18px] leading-[1.7] text-[#4d444c] [text-wrap:pretty]">
              {(sec.paragraphs || []).map((para, k) => (
                <p key={k} className="m-0">
                  {para}
                </p>
              ))}
              {sec.bullets && <BulletGrid items={sec.bullets} />}
              {(sec.afterBullets || []).map((para, k) => (
                <p key={`after-${k}`} className="m-0">
                  {para}
                </p>
              ))}
              {sec.links && <PillLinks links={sec.links} />}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
