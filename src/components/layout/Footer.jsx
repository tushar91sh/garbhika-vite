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

  return (
    <footer className="bg-surface-container-low/90 w-full pt-20 md:pt-28 border-t border-outline-variant/40">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        {/* Newsletter band */}
        <div className="relative overflow-hidden bg-primary rounded-[32px] px-8 py-10 md:px-12 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8 mb-16 shadow-[0_28px_80px_rgba(15,0,20,0.18)]">
          <div className="text-center md:text-left">
            <h3 className="font-headline-md text-headline-md text-surface-bright mb-2">Join the Sanctuary Newsletter</h3>
            <p className="font-body-md text-body-md text-surface-bright/80 max-w-md">
              One thoughtful email a month — new resources, expert insights, and community highlights.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                className="w-full sm:w-64 rounded-full border border-surface-bright/30 bg-surface-bright/10 text-surface-bright placeholder:text-surface-bright/60 px-5 py-3.5 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-surface-bright/50"
              />
              {error && <p className="text-error-container text-sm mt-2 pl-2">{error}</p>}
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-surface-bright text-primary rounded-full px-6 py-3.5 font-body-md text-body-md shadow-sm hover:-translate-y-0.5 hover:shadow-lg transition-all disabled:opacity-60 whitespace-nowrap"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-x-8 gap-y-12 pb-14 text-left">
          <div className="col-span-2 space-y-4">
            <Link to="/" className="font-headline-md text-[30px] text-primary block w-fit">
              Garbhika
            </Link>
            <p className="font-body-md text-sm text-on-surface-variant max-w-xs">
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
                  className="w-10 h-10 rounded-full border border-outline-variant/60 bg-surface-bright flex items-center justify-center text-on-surface-variant hover:-translate-y-0.5 hover:bg-primary hover:text-on-primary transition-all duration-300"
                >
                  <span className="material-symbols-outlined text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.heading}>
              <h4 className="font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase mb-4">
                {column.heading}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.fallback || link.to}
                      className="group inline-flex items-center gap-1 font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors duration-300"
                    >
                      {link.label}<span className="material-symbols-outlined text-[13px] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">arrow_forward</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-surface-variant py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body-md text-body-md text-on-surface-variant text-sm text-center md:text-left max-w-2xl">
            © {new Date().getFullYear()} Garbhika. All rights reserved. Medical Disclaimer: Our support is
            complementary to clinical care and does not replace medical advice.
          </p>
          <div className="flex items-center gap-2 text-on-surface-variant text-sm">
            <span className="material-symbols-outlined text-base">verified</span>
            Trusted by 12,000+ mothers across India
          </div>
        </div>
      </div>
    </footer>
  )
}
