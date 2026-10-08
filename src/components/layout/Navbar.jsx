import { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const servicesMenu = [
  { icon: 'auto_awesome', title: 'Garbh Sanskar & Coaching', description: 'Mindful prenatal practices', to: '/services/garbh-sanskar/' },
  { icon: 'self_improvement', title: 'Pregnancy Yoga', description: 'Movement and breathwork', to: '/services/pregnancy-yoga/' },
  { icon: 'restaurant', title: 'Pregnancy Nutrition', description: 'Dietary support for every stage', to: '/services/pregnancy-nutrition/' },
  { icon: 'psychiatry', title: 'Psychological Support', description: 'Emotional and psychological care', to: '/services/psychological-support/' },
  { icon: 'spa', title: 'Mental Wellness', description: 'Mindfulness and stress support', to: '/services/mental-wellness/' },
  { icon: 'explore', title: 'Pregnancy Guidance', description: 'Structured stage-by-stage support', to: '/services/pregnancy-guidance/' },
]

const navLinks = [
  { to: '/about-us/', label: 'About' },
  { to: '/pregnancy-journey/', label: 'Journey' },
  { to: '/experts/', label: 'Experts' },
  { to: '/community/', label: 'Community' },
  { to: '/resources/', label: 'Resources' },
]

const navClass = ({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const menuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const close = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setServicesOpen(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const servicesActive = location.pathname.startsWith('/services/')

  return (
    <header className={`fixed inset-x-0 top-0 z-50 px-3 md:px-5 transition-all duration-300 ${scrolled ? 'pt-2' : 'pt-3 md:pt-4'}`}>
      <nav aria-label="Primary navigation" className={`mx-auto max-w-[1280px] rounded-[22px] border transition-all duration-300 ${scrolled ? 'bg-surface/95 border-outline-variant/70 shadow-[0_12px_40px_rgba(51,13,59,0.12)] backdrop-blur-xl' : 'bg-surface/80 border-surface-bright/80 shadow-[0_8px_30px_rgba(51,13,59,0.07)] backdrop-blur-lg'}`}>
        <div className={`flex items-center justify-between px-4 md:px-6 transition-all duration-300 ${scrolled ? 'h-16' : 'h-[72px]'}`}>
          <Link to="/" className="group flex items-center gap-3" aria-label="Garbhika home">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-on-primary shadow-sm transition-transform duration-300 group-hover:-rotate-6">
              <span className="material-symbols-outlined text-[21px]">spa</span>
            </span>
            <span className="leading-none">
              <span className="block font-headline-md text-[23px] text-primary">Garbhika</span>
              <span className="hidden font-label-caps text-[9px] uppercase tracking-[0.18em] text-on-surface-variant sm:block">Pregnancy wellness</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            <NavLink to="/about-us/" className={navClass}>About</NavLink>
            <div ref={menuRef} className="relative">
              <button type="button" onClick={() => setServicesOpen((open) => !open)} onMouseEnter={() => setServicesOpen(true)} className={`nav-link flex items-center gap-1 ${servicesActive ? 'nav-link-active' : ''}`} aria-haspopup="true" aria-expanded={servicesOpen}>
                Services
                <span className={`material-symbols-outlined text-[18px] transition-transform ${servicesOpen ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }} transition={{ duration: 0.18 }} onMouseLeave={() => setServicesOpen(false)} className="absolute left-1/2 top-full mt-4 w-[620px] -translate-x-1/2 overflow-hidden rounded-[24px] border border-outline-variant/70 bg-surface-bright shadow-[0_24px_70px_rgba(51,13,59,0.18)]">
                    <div className="flex items-center justify-between border-b border-surface-variant/70 bg-surface-container-low px-6 py-4">
                      <div>
                        <p className="font-headline-md text-[20px] text-primary">Pregnancy wellness services</p>
                        <p className="font-body-md text-sm text-on-surface-variant">Explore support designed around each stage.</p>
                      </div>
                      <Link to="/services/" className="inline-flex items-center gap-1 text-sm text-primary transition-all hover:gap-2">View all <span className="material-symbols-outlined text-base">arrow_forward</span></Link>
                    </div>
                    <div className="grid grid-cols-2 gap-2 p-3">
                      {servicesMenu.map((item) => (
                        <Link key={item.title} to={item.to} className="group flex gap-3 rounded-2xl p-3.5 transition-colors hover:bg-surface-container-low">
                          <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-surface-container-high text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary"><span className="material-symbols-outlined text-[21px]">{item.icon}</span></span>
                          <span><span className="block font-headline-md text-[16px] leading-snug text-primary">{item.title}</span><span className="mt-0.5 block font-body-md text-xs text-on-surface-variant">{item.description}</span></span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {navLinks.slice(1).map((link) => <NavLink key={link.to} to={link.to} className={navClass}>{link.label}</NavLink>)}
          </div>

          <div className="flex items-center gap-2">
            <Link to="/login" aria-label="Log in" className="hidden h-10 w-10 place-items-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary sm:grid"><span className="material-symbols-outlined text-[21px]">person</span></Link>
            <Link to="/book-consultation/" className="hidden items-center gap-2 rounded-full bg-primary px-5 py-3 font-body-md text-sm text-on-primary shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg md:inline-flex">Book consultation <span className="material-symbols-outlined text-base">arrow_forward</span></Link>
            <button type="button" className="grid h-11 w-11 place-items-center rounded-full bg-surface-container-high text-primary lg:hidden" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)}><span className="material-symbols-outlined text-[25px]">{mobileOpen ? 'close' : 'menu'}</span></button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mx-auto mt-2 max-h-[calc(100vh-100px)] max-w-[1280px] overflow-y-auto rounded-[24px] border border-outline-variant/70 bg-surface p-4 shadow-[0_24px_70px_rgba(51,13,59,0.2)] lg:hidden">
            <div className="grid gap-1">
              <NavLink to="/about-us/" className="mobile-nav-link">About Us</NavLink>
              <button type="button" onClick={() => setMobileServicesOpen((open) => !open)} className="mobile-nav-link flex w-full items-center justify-between text-left">Services <span className={`material-symbols-outlined transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}>expand_more</span></button>
              <AnimatePresence>
                {mobileServicesOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="grid gap-1 rounded-2xl bg-surface-container-low p-2 sm:grid-cols-2">
                      {servicesMenu.map((item) => <Link key={item.title} to={item.to} className="flex items-center gap-3 rounded-xl p-3 text-sm text-on-surface-variant hover:bg-surface-bright hover:text-primary"><span className="material-symbols-outlined text-[19px] text-primary">{item.icon}</span>{item.title}</Link>)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {navLinks.slice(1).map((link) => <NavLink key={link.to} to={link.to} className="mobile-nav-link">{link.label}</NavLink>)}
              <NavLink to="/contact-us/" className="mobile-nav-link">Contact Us</NavLink>
              <NavLink to="/login" className="mobile-nav-link">Log In</NavLink>
            </div>
            <Link to="/book-consultation/" className="mt-4 flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-body-md text-on-primary">Book a Consultation <span className="material-symbols-outlined text-base">arrow_forward</span></Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
