import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { subscribeNewsletter, resetNewsletterStatus } from '../../features/newsletter/newsletterSlice.js'
import { isValidEmail } from '../../utils/validators.js'

const columns = [
  {
    heading: 'Explore',
    links: [
      { to: '/about-us/', label: 'About Us' },
      { to: '/services/', label: 'Services' },
      { to: '/pregnancy-journey/', label: 'Pregnancy Journey' },
      { to: '/community/', label: 'Community' },
      { to: '/experts/', label: 'Our Experts' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { to: '/resources/', label: 'Articles & Guides' },
      { to: '/success-stories/', label: 'Success Stories' },
      { to: '/faqs/', label: 'FAQs' },
      { to: '/book-consultation/', label: 'Book a Consultation' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { to: '/experts/#founder', label: 'Founder' },
      { to: '/contact-us/', label: 'Contact Us' },
      { to: '/join-as-expert', label: 'Become an Expert' },
      { to: '/login', label: 'Log In' },
      { to: '/signup', label: 'Sign Up' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { to: '/privacy-policy', label: 'Privacy Policy' },
      { to: '/terms-of-service', label: 'Terms of Service' },
    ],
  },
]

const socialLinks = [
  { icon: 'photo_camera', label: 'Instagram', href: 'https://instagram.com' },
  { icon: 'forum', label: 'Community Forum', href: '#' },
  { icon: 'mail', label: 'Email', href: 'mailto:hello@garbhika.com' },
]

export default function Footer() {
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.newsletter)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    try {
      await dispatch(subscribeNewsletter(email)).unwrap()
      toast.success('You’re on the list — welcome to the sanctuary newsletter.')
      setEmail('')
      dispatch(resetNewsletterStatus())
    } catch {
      toast.error('Could not subscribe right now. Please try again.')
    }
  }

  const serif = "font-['Playfair_Display',serif]"

  return (
    <footer className="w-full border-t border-[rgba(208,195,205,0.4)] bg-[#faf1fa] pt-24">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Newsletter band */}
        <div className="mb-16 flex flex-wrap items-center justify-between gap-8 rounded-[32px] bg-[#0f0014] p-[clamp(32px,5vw,56px)] shadow-[0_28px_80px_rgba(15,0,20,0.18)]">
          <div className="flex-[1_1_320px]">
            <h3 className={`${serif} m-0 mb-2 text-[32px] font-medium leading-[1.3] text-[#fff7fd]`}>Join the Sanctuary Newsletter</h3>
            <p className="m-0 max-w-[440px] text-base leading-[1.6] text-[rgba(255,247,253,0.8)]">
              One thoughtful email a month — new resources, expert insights, and community highlights.
            </p>
          </div>
          <form onSubmit={handleSubscribe} noValidate className="flex flex-[0_1_auto] flex-wrap gap-3">
            <div className="flex flex-col gap-[6px]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                className="w-[260px] max-w-full rounded-full border border-[rgba(255,247,253,0.3)] bg-[rgba(255,247,253,0.1)] px-5 py-[14px] text-base text-[#fff7fd] outline-none placeholder:text-[rgba(255,247,253,0.6)] focus:border-[rgba(255,247,253,0.6)]"
              />
              {error && <span className="pl-2 text-[13px] text-[#ffdad6]">{error}</span>}
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="cursor-pointer self-start whitespace-nowrap rounded-full border-0 bg-[#fff7fd] px-6 py-[14px] text-base font-medium text-[#0f0014] transition-colors hover:bg-[#fed6ff] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-x-8 gap-y-12 pb-14">
          <div className="flex min-w-0 flex-col gap-4 sm:col-span-2">
            <Link to="/" className={`${serif} w-fit text-[30px] text-[#0f0014] no-underline`}>
              Garbhika
            </Link>
            <p className="m-0 max-w-[320px] text-sm leading-[1.6] text-[#4d444c]">
              A sanctuary of holistic care for the modern South Asian mother — from the first thought of
              motherhood through the fourth trimester and beyond.
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[rgba(208,195,205,0.6)] bg-[#fff7fd] text-[#4d444c] no-underline transition-colors hover:bg-[#0f0014] hover:text-white"
                >
                  <span className="material-symbols-outlined !text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.heading}>
              <h4 className="m-0 mb-4 text-[12px] font-bold uppercase tracking-[0.12em] text-[#4d444c]">{column.heading}</h4>
              <ul className="m-0 grid list-none gap-3 p-0">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.fallback || link.to} className="text-sm text-[#4d444c] no-underline transition-colors hover:text-[#0f0014]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#e9e0e8] py-8">
          <p className="m-0 max-w-[680px] text-sm leading-[1.6] text-[#4d444c]">
            © {new Date().getFullYear()} Garbhika. All rights reserved. Medical Disclaimer: Our support is
            complementary to clinical care and does not replace medical advice.
          </p>
          <div className="flex items-center gap-2 text-sm text-[#4d444c]">
            <span className="material-symbols-outlined !text-lg">verified</span>
            Trusted by 12,000+ mothers across India
          </div>
        </div>
      </div>
    </footer>
  )
}
