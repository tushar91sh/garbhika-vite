import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../../features/auth/authSlice.js'
const Icon = ({ children }) => (
  <span aria-hidden="true" className="material-symbols-outlined !text-[22px]">
    {children}
  </span>
)
export default function DashboardShell({ kind, items, title, children }) {
  const admin = kind === 'admin',
    user = useSelector((s) => s.auth.user),
    dispatch = useDispatch(),
    navigate = useNavigate(),
    location = useLocation()
  const [open, setOpen] = useState(false),
    [busy, setBusy] = useState(false)
  const toggle = useRef(null),
    panel = useRef(null)
  useEffect(() => {
    setOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])
  useEffect(() => {
    if (!open) return
    const before = document.activeElement,
      previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusable = () =>
      [...panel.current.querySelectorAll('a,button')].filter((x) => !x.disabled)
    focusable()[0]?.focus()
    const key = (e) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'Tab') {
        const xs = focusable(),
          first = xs[0],
          last = xs[xs.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', key)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', key)
      before?.focus()
    }
  }, [open])
  async function logout() {
    setBusy(true)
    await dispatch(signOut())
    navigate(admin ? '/admin/login' : '/login', { replace: true })
  }
  const nav = (
    <>
      <Link
        className="flex items-center gap-3 border-b border-[#eadfea] px-6 py-7 no-underline text-[#330d3b]"
        to={admin ? '/admin' : '/dashboard'}
      >
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#330d3b] text-white">
          <Icon>spa</Icon>
        </span>
        <span>
          <strong className="block font-serif text-2xl">Garbhika</strong>
          <span className="text-[10px] font-semibold uppercase tracking-[.18em]">
            {admin ? 'Administration' : 'Member dashboard'}
          </span>
        </span>
      </Link>
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[.2em] text-[#8d7591]">
          {admin ? 'Workspace' : 'My Garbhika'}
        </p>
        <nav
          aria-label={
            admin
              ? 'Admin dashboard navigation'
              : 'Customer dashboard navigation'
          }
          className="flex flex-col gap-2"
        >
          {items.map((item) => (
            <NavLink
              key={item.key}
              to={item.to}
              onClick={() => setOpen(false)}
              end
              className={({ isActive }) =>
                `flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium no-underline ${isActive ? 'bg-[#330d3b] text-white shadow-sm' : 'text-[#65566b] hover:bg-[#f1e8f2]'}`
              }
            >
              <Icon>{item.icon}</Icon>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="border-t border-[#eadfea] p-4">
        <div className="mb-3 rounded-xl bg-[#f7f0f8] p-3">
          <p className="truncate text-sm font-semibold">{user?.name}</p>
          <p className="truncate text-xs text-[#76637c]">{user?.email}</p>
        </div>
        <button
          onClick={logout}
          disabled={busy}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#9b365d] hover:bg-[#fff0f4] disabled:opacity-50"
        >
          <Icon>logout</Icon>
          {busy ? 'Signing out...' : 'Log out'}
        </button>
      </div>
    </>
  )
  return (
    <div className="min-h-screen bg-[#f8f5fa] text-[#281b2e] font-body-md">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] flex-col border-r border-[#eadfea] bg-white lg:flex">
        {nav}
      </aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-[#210e2c]/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <aside
            id="dashboard-mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Dashboard menu"
            ref={panel}
            className="relative flex h-[100dvh] w-[min(310px,90vw)] flex-col bg-white shadow-xl"
          >
            <button
              aria-label="Close dashboard menu"
              className="absolute right-2 top-1 p-2"
              onClick={() => setOpen(false)}
            >
              <Icon>close</Icon>
            </button>
            {nav}
          </aside>
        </div>
      )}
      <div className="lg:pl-[264px]">
        <header className="sticky top-0 z-30 flex min-h-[80px] items-center justify-between gap-3 border-b border-[#eadfea] bg-white/95 px-5 backdrop-blur md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              ref={toggle}
              type="button"
              aria-label="Open dashboard menu"
              aria-expanded={open}
              aria-controls="dashboard-mobile-navigation"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f3ebf5] lg:hidden"
              onClick={() => setOpen(true)}
            >
              <Icon>menu</Icon>
            </button>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#8d7591]">
                {admin ? 'Admin workspace' : 'Member dashboard'}
              </p>
              <p className="text-sm font-semibold md:text-base">{title}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Link
              to="/"
              className="hidden text-xs font-medium text-[#75577f] underline sm:block"
            >
              Visit website
            </Link>
            <span
              aria-label={user?.name}
              className="grid h-10 w-10 place-items-center rounded-full bg-[#eaddf0] font-bold text-[#603568]"
            >
              {user?.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1600px] p-5 md:p-8 xl:p-10">
          {children}
        </main>
      </div>
    </div>
  )
}
