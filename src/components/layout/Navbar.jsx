import { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useSelector } from 'react-redux'

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
  { to: '/join-as-expert', label: 'Become an Expert' },
]

const serif = "font-['Playfair_Display',serif]"

const pillBase = 'inline-flex items-center rounded-full px-[14px] py-[10px] text-sm no-underline transition-colors'
const pillOn = 'bg-[#efe5ee] text-[#0f0014]'
const pillOff = 'bg-transparent text-[#4d444c] hover:bg-[#efe5ee] hover:text-[#0f0014]'
const navClass = ({ isActive }) => `${pillBase} ${isActive ? pillOn : pillOff}`
const mobileLink = ({ isActive }) =>
  `block rounded-[14px] px-4 py-[14px] text-[15px] no-underline transition-colors ${isActive ? pillOn : 'text-[#4d444c] hover:bg-[#efe5ee] hover:text-[#0f0014]'}`

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const user = useSelector((state) => state.auth.user)
  const accountTo = user ? (['admin','superadmin'].includes(user.role) ? '/admin' : user.role==='expert'?'/expert':'/dashboard') : '/login'
  const accountLabel = user ? (['admin','superadmin'].includes(user.role) ? 'Admin dashboard' : 'My dashboard') : 'Log in'
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
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const servicesActive = location.pathname.startsWith('/services/')

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <nav
        aria-label="Primary navigation"
        className={`mx-auto max-w-[1280px] rounded-[22px] border border-[rgba(208,195,205,0.6)] bg-[rgba(255,247,253,0.86)] backdrop-blur-[18px] transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_14px_44px_rgba(51,13,59,0.14)]' : 'shadow-[0_10px_36px_rgba(51,13,59,0.09)]'
        }`}
      >
        <div className="flex h-[68px] items-center justify-between gap-4 pl-[18px] pr-[14px]">
          <Link to="/" className="flex items-center gap-3 no-underline" aria-label="Garbhika home">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0f0014] text-white">
              <span className="material-symbols-outlined !text-[21px]">spa</span>
            </span>
            <span className="flex flex-col gap-[3px] leading-none">
              <span className={`${serif} text-[23px] text-[#0f0014]`}>Garbhika</span>
              <span className="hidden text-[9px] font-bold uppercase tracking-[0.18em] text-[#4d444c] sm:block">Pregnancy wellness</span>
            </span>
          </Link>

          <div className="hidden items-center gap-[2px] xl:flex">
            <NavLink to="/about-us/" className={navClass}>
              About
            </NavLink>
            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setServicesOpen((open) => !open)}
                onMouseEnter={() => setServicesOpen(true)}
                className={`${pillBase} cursor-pointer gap-[2px] border-0 !py-[10px] !pl-[14px] !pr-[10px] ${servicesActive ? pillOn : pillOff}`}
                aria-haspopup="true"
                aria-expanded={servicesOpen}
              >
                Services
                <span className={`material-symbols-outlined !text-[18px] transition-transform ${servicesOpen ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    onMouseLeave={() => setServicesOpen(false)}
                    className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-[14px]"
                  >
                    <div className="overflow-hidden rounded-3xl border border-[rgba(208,195,205,0.7)] bg-[#fff7fd] shadow-[0_24px_70px_rgba(51,13,59,0.18)]">
                      <div className="flex items-center justify-between gap-4 border-b border-[#e9e0e8] bg-[#faf1fa] px-[22px] py-4">
                        <div>
                          <div className={`${serif} text-xl text-[#0f0014]`}>Pregnancy wellness services</div>
                          <div className="mt-[2px] text-[13px] text-[#4d444c]">Explore support designed around each stage.</div>
                        </div>
                        <Link to="/services/" className="inline-flex items-center gap-1 text-sm text-[#0f0014] no-underline">
                          View all <span className="material-symbols-outlined !text-base">arrow_forward</span>
                        </Link>
                      </div>
                      <div className="grid grid-cols-2 gap-1 p-[10px]">
                        {servicesMenu.map((item) => (
                          <Link key={item.title} to={item.to} className="flex gap-3 rounded-2xl p-3 no-underline transition-colors hover:bg-[#faf1fa]">
                            <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-[#efe5ee] text-[#0f0014]">
                              <span className="material-symbols-outlined !text-[21px]">{item.icon}</span>
                            </span>
                            <span className="flex flex-col gap-[2px]">
                              <span className={`${serif} text-base leading-[1.3] text-[#0f0014]`}>{item.title}</span>
                              <span className="text-xs text-[#4d444c]">{item.description}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {navLinks.slice(1).map((link) => (
              <NavLink key={link.to} to={link.to} className={navClass}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={accountTo}
              aria-label={accountLabel}
              title={accountLabel}
              className="grid h-10 w-10 place-items-center rounded-full text-[#4d444c] no-underline transition-colors hover:bg-[#efe5ee] hover:text-[#0f0014]"
            >
              <span className="material-symbols-outlined !text-[21px]">person</span>
            </Link>
            <Link
              to="/book-consultation/"
              className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-[#0f0014] px-5 py-3 text-sm font-medium text-white no-underline transition-colors hover:bg-[#330d3b] hover:text-white md:inline-flex"
            >
              Book consultation <span className="material-symbols-outlined !text-[17px]">arrow_forward</span>
            </Link>
            <button
              type="button"
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border-0 bg-[#efe5ee] text-[#0f0014] xl:hidden"
              aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              <span className="material-symbols-outlined !text-[24px]">{mobileOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-2 max-h-[calc(100vh-100px)] max-w-[1280px] overflow-y-auto rounded-3xl border border-[rgba(208,195,205,0.7)] bg-[#fff7fd] p-[14px] shadow-[0_24px_70px_rgba(51,13,59,0.2)] xl:hidden"
          >
            <div className="grid gap-[2px]">
              <NavLink to="/about-us/" className={mobileLink}>
                About Us
              </NavLink>
              <button
                type="button"
                onClick={() => setMobileServicesOpen((open) => !open)}
                className="flex w-full cursor-pointer items-center justify-between rounded-[14px] border-0 bg-transparent px-4 py-[14px] text-left text-[15px] text-[#4d444c] hover:bg-[#efe5ee]"
              >
                Services
                <span className={`material-symbols-outlined transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              <AnimatePresence>
                {mobileServicesOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-1 rounded-2xl bg-[#faf1fa] p-2">
                      {servicesMenu.map((item) => (
                        <Link key={item.title} to={item.to} className="flex items-center gap-3 rounded-xl p-3 text-sm text-[#4d444c] no-underline hover:bg-[#fff7fd] hover:text-[#0f0014]">
                          <span className="material-symbols-outlined !text-[19px] text-[#0f0014]">{item.icon}</span>
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {navLinks.slice(1).map((link) => (
                <NavLink key={link.to} to={link.to} className={mobileLink}>
                  {link.label}
                </NavLink>
              ))}
              <NavLink to="/contact-us/" className={mobileLink}>
                Contact Us
              </NavLink>
              <NavLink to={accountTo} className={mobileLink}>
                {accountLabel}
              </NavLink>
            </div>
            <Link
              to="/book-consultation/"
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#0f0014] px-6 py-[15px] text-white no-underline hover:text-white"
            >
              Book a Consultation <span className="material-symbols-outlined !text-[17px]">arrow_forward</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
