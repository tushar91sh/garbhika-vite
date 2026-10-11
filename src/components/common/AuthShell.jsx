import { useState } from 'react'
import { Link } from 'react-router-dom'
import { fieldClass, serif } from './DesignKit.jsx'

/**
 * Split-card layout shared by Login and Signup. The Log In / Sign Up tabs
 * are real links so each mode keeps its own route (/login, /signup).
 */
export default function AuthShell({ mode, title, subtitle, children, switchText, switchLabel, switchTo }) {
  const tab = (key, label, to) => {
    const on = mode === key
    return (
      <Link
        to={to}
        role="tab"
        aria-selected={on}
        className={`rounded-full px-5 py-[10px] text-sm font-medium no-underline transition-colors ${
          on ? 'bg-white text-[#0f0014] shadow-[0_2px_8px_rgba(51,13,59,0.1)]' : 'bg-transparent text-[#4d444c] hover:text-[#0f0014]'
        }`}
      >
        {label}
      </Link>
    )
  }

  return (
    <div className="min-h-[calc(100vh-96px)] px-6 pb-24 pt-6">
      <div className="mx-auto grid max-w-[1100px] grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] overflow-hidden rounded-[36px] border border-[rgba(208,195,205,0.6)] bg-white shadow-[0_30px_80px_rgba(51,13,59,0.1)]">
        <div className="relative flex min-h-[360px] flex-col justify-end overflow-hidden bg-[#330d3b] p-10">
          <img
            alt="A serene South Asian mother-to-be gently holding her belly, bathed in warm natural light."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwdyUTBDiWYVvsFNXIWQu_HT08E8GDVPhoqqwFzBqqlmDgLgrXNy8mwTkpGXBrjyFv0Z93Wy2ET_E0lcKuiMmbJLuizxygtf7qpT3Pw9VcKWytEsf1VGpOIsLBkg3Id2Bf7OU50jhF2pAxuDK4j4_IYWhMjDZ_FsXf063oHLPm-B1vCgUHiZ03BAxMs1RCz-_Y1sE5ENSN4pSAtyyxc8pQmG6lsbvxzJNhFoLqDtHiy1FCrTEb8w"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.85]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,22,28,0.85),rgba(26,22,28,0.05)_60%)]" />
          <blockquote className={`${serif} relative m-0 text-[26px] italic leading-[1.4] text-[#fff7fd]`}>
            “Garbhika gave me a village I didn’t know I was missing during my first pregnancy.”
          </blockquote>
          <span className="relative mt-3 text-sm text-[rgba(255,247,253,0.75)]">— Kavya R., First-time mother</span>
        </div>

        <div className="flex flex-col justify-center gap-7 p-[clamp(28px,5vw,56px)]">
          <div role="tablist" className="flex w-fit rounded-full bg-[#f4ebf4] p-1">
            {tab('login', 'Log In', '/login')}
            {tab('signup', 'Sign Up', '/signup')}
          </div>
          <div className="flex flex-col gap-[10px]">
            <h1 className={`${serif} m-0 text-[clamp(34px,4vw,44px)] font-medium leading-[1.1] text-[#0f0014]`}>{title}</h1>
            <p className="m-0 text-base text-[#4d444c]">{subtitle}</p>
          </div>
          {children}
          <p className="m-0 text-sm text-[#4d444c]">
            {switchText}{' '}
            <Link to={switchTo} className="font-semibold text-[#330d3b] underline hover:text-[#7a4f80]">
              {switchLabel}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export function PasswordField({ label = 'Password', name = 'password', error, ...props }) {
  const [show, setShow] = useState(false)
  return (
    <label htmlFor={name} className="flex flex-col gap-[6px] text-[13px] font-semibold text-[#1e1a20]">
      {label}
      <span className="relative flex">
        <input
          id={name}
          name={name}
          type={show ? 'text' : 'password'}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`${fieldClass} !pr-12 ${error ? '!border-[#ba1a1a]' : ''}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute right-[6px] top-1/2 grid h-[38px] w-[38px] -translate-y-1/2 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-[#7f747d]"
        >
          <span className="material-symbols-outlined !text-xl">{show ? 'visibility_off' : 'visibility'}</span>
        </button>
      </span>
      {error && (
        <span id={`${name}-error`} className="font-normal text-[#ba1a1a]">
          {error}
        </span>
      )}
    </label>
  )
}
