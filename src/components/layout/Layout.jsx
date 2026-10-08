import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

export default function Layout({ children }) {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      // Defer to let the target route render before we try to scroll to it.
      const id = location.hash.replace('#', '')
      const timer = setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 80)
      return () => clearTimeout(timer)
    }
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [location.pathname, location.hash])

  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen flex flex-col font-body-md">
      <Navbar />
      <main className="flex-grow pt-24 w-full overflow-hidden">{children}</main>
      <Footer />
    </div>
  )
}
