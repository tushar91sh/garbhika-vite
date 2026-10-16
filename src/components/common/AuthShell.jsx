import { useState } from 'react'
import { Link } from 'react-router-dom'
import { fieldClass, serif } from './DesignKit.jsx'

/**
 * Split-card layout shared by Login and Signup. The Log In / Sign Up tabs
 * are real links so each mode keeps its own route (/login, /signup).
 */
export default function AuthShell({
  mode,
  title,
  subtitle,
  children,
  switchText,
  switchLabel,
  switchTo,
  hideTabs = false,
}) {
  const tab = (key, label, to) => {
    const on = mode === key
    return (
      <Link
        to={to}
        role="tab"
        aria-selected={on}
        className={`rounded-full px-5 py-[10px] text-sm font-medium no-underline transition-colors ${
          on
            ? 'bg-white text-[#0f0014] shadow-[0_2px_8px_rgba(51,13,59,0.1)]'
            : 'bg-transparent text-[#4d444c] hover:text-[#0f0014]'
        }`}
      >
        {label}
      </Link>
    )
  }

  return (
    <div className="min-h-[calc(100vh-96px)] px-6 pb-24 pt-6">
      <div className="mx-auto grid max-w-[1100px] grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] overflow-hidden rounded-[36px] border border-[rgba(208,195,205,0.6)] bg-white shadow-[0_30px_80px_rgba(51,13,59,0.1)]">
        <div className="relative hidden min-h-[360px] flex-col lg:flex justify-end overflow-hidden bg-[#330d3b] p-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border-[48px] border-white/5" />
          <div className="pointer-events-none absolute -left-20 bottom-20 h-64 w-64 rounded-full bg-[#a47aaa]/15 blur-2xl" />
          <div className="relative my-auto flex flex-col gap-6 py-8">
            <span
              aria-hidden="true"
              className="material-symbols-outlined !text-5xl text-[#e8cbed]"
            >
              spa
            </span>
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#d9bade]">
              Pregnancy wellness, personally
            </p>
            <h2
              className={`${serif} text-[clamp(30px,4vw,44px)] leading-tight text-white`}
            >
              Care that meets you
              <br />
              where you are.
            </h2>
            <p className="max-w-sm text-base leading-relaxed text-[#e3cde8]">
              A personal space for your pregnancy wellness journey, from
              preparation to postpartum.
            </p>
            <div className="mt-3 flex flex-col gap-3 text-sm text-[#f1dff5]">
              {[
                'Expert-led support',
                'Your choices, at your pace',
                'A journey shaped around you',
              ].map((x) => (
                <p key={x} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="material-symbols-outlined !text-lg"
                  >
                    check_circle
                  </span>
                  {x}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-7 p-[clamp(28px,5vw,56px)]">
          {!hideTabs && (
            <div
              role="tablist"
              className="flex w-fit rounded-full bg-[#f4ebf4] p-1"
            >
              {tab('login', 'Log In', '/login')}
              {tab('signup', 'Sign Up', '/signup')}
            </div>
          )}
          <div className="flex flex-col gap-[10px]">
            <h1
              className={`${serif} m-0 text-[clamp(34px,4vw,44px)] font-medium leading-[1.1] text-[#0f0014]`}
            >
              {title}
            </h1>
            <p className="m-0 text-base text-[#4d444c]">{subtitle}</p>
          </div>
          {children}
          <p className="m-0 text-sm text-[#4d444c]">
            {switchText}{' '}
            <Link
              to={switchTo}
              className="font-semibold text-[#330d3b] underline hover:text-[#7a4f80]"
            >
              {switchLabel}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export function PasswordField({
  label = 'Password',
  name = 'password',
  error,
  ...props
}) {
  const [show, setShow] = useState(false)
  return (
    <label
      htmlFor={name}
      className="flex flex-col gap-[6px] text-[13px] font-semibold text-[#1e1a20]"
    >
      {label}
      <span className="relative flex">
        <input
          id={name}
          aria-label={label}
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
          <span className="material-symbols-outlined !text-xl">
            {show ? 'visibility_off' : 'visibility'}
          </span>
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
