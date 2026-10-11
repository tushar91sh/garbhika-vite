import { Link } from 'react-router-dom'
import { serif } from './DesignKit.jsx'

/** Shared layout for Privacy Policy / Terms of Service. Tabs keep their own routes. */
export default function LegalShell({ active, title, intro, sections }) {
  const tab = (key, label, to) => {
    const on = active === key
    return (
      <Link
        to={to}
        role="tab"
        aria-selected={on}
        className={`rounded-full px-5 py-[10px] text-sm font-medium no-underline transition-colors ${
          on ? 'bg-white text-[#0f0014]' : 'bg-transparent text-[#4d444c] hover:text-[#0f0014]'
        }`}
      >
        {label}
      </Link>
    )
  }

  return (
    <div className="px-6 pb-24 pt-[clamp(34px,5vw,74px)]">
      <div className="mx-auto max-w-[760px]">
        <div role="tablist" className="mb-8 flex w-fit rounded-full bg-[#f4ebf4] p-1">
          {tab('privacy', 'Privacy Policy', '/privacy-policy')}
          {tab('terms', 'Terms of Service', '/terms-of-service')}
        </div>
        <h1 className={`${serif} m-0 text-[clamp(40px,5vw,56px)] font-medium leading-[1.08] tracking-[-0.02em] text-[#0f0014]`}>{title}</h1>
        <p className="mb-10 mt-3 text-sm text-[#7f747d]">Last updated: August 2026</p>
        {intro && <p className="m-0 mb-8 text-[18px] leading-[1.7] text-[#4d444c]">{intro}</p>}
        <div className="flex flex-col gap-3">
          {sections.map((s) => (
            <section key={s.heading} className="rounded-[22px] border border-[rgba(208,195,205,0.55)] bg-white p-7">
              <h2 className={`${serif} m-0 mb-[10px] text-2xl font-medium text-[#0f0014]`}>{s.heading}</h2>
              <p className="m-0 text-base leading-[1.7] text-[#4d444c]">
                {s.body}
                {s.mail && (
                  <>
                    {' '}
                    <a href="mailto:hello@garbhika.com" className="text-[#330d3b] underline hover:text-[#7a4f80]">
                      hello@garbhika.com
                    </a>
                    .
                  </>
                )}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
