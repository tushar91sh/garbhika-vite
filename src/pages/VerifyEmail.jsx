import { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AuthShell from '../components/common/AuthShell.jsx'
import { DcField, PrimaryButton } from '../components/common/DesignKit.jsx'
import { verifyEmail, bypassEmail } from '../features/auth/authSlice.js'
import { post } from '../api/client.js'
const storageKey = 'garbhika_verification'
export default function VerifyEmail() {
  const location = useLocation(),
    navigate = useNavigate(),
    dispatch = useDispatch(),
    { status } = useSelector((s) => s.auth)
  const [info, setInfo] = useState(() => {
    let stored = null
    try {
      stored = JSON.parse(sessionStorage.getItem(storageKey) || 'null')
    } catch {}
    const source =
      location.state?.challenge &&
      location.state.challenge !== stored?.challenge
        ? location.state
        : stored || location.state
    if (!source?.challenge) return null
    return {
      ...source,
      resendAvailableAt:
        source.resendAvailableAt ||
        (source.resendAfterSeconds
          ? Date.now() + source.resendAfterSeconds * 1000
          : 0),
    }
  })
  const [code, setCode] = useState(''),
    [error, setError] = useState(''),
    [message, setMessage] = useState(''),
    [sending, setSending] = useState(false),
    [clock, setClock] = useState(Date.now())
  const wait = Math.max(
    0,
    Math.ceil(((info?.resendAvailableAt || 0) - clock) / 1000),
  )
  useEffect(() => {
    if (!info) return
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(info))
    } catch {}
  }, [info])
  useEffect(() => {
    const id = setInterval(() => setClock(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  async function complete(development = false) {
    setError('')
    setMessage('')
    if (!development && !/^\d{6}$/.test(code))
      return setError('Enter the six-digit code.')
    try {
      const data = await dispatch(
        development
          ? bypassEmail({ challenge: info.challenge })
          : verifyEmail({ challenge: info.challenge, code }),
      ).unwrap()
      try {
        sessionStorage.removeItem(storageKey)
      } catch {}
      navigate(data.user.profile?.completed ? '/dashboard' : '/onboarding', {
        replace: true,
      })
    } catch (e) {
      setError(e.message || 'Verification failed. Please try again.')
    }
  }
  async function resend() {
    setSending(true)
    setError('')
    setMessage('')
    try {
      const data = await post('/auth/verification/resend', {
        challenge: info.challenge,
      })
      setInfo((prev) => ({
        ...prev,
        ...data,
        deliveryFailed: false,
        resendAvailableAt: Date.now() + 60000,
      }))
      setCode('')
      setMessage(data.message)
      setClock(Date.now())
    } catch (e) {
      setError(e.message)
    } finally {
      setSending(false)
    }
  }
  return (
    <AuthShell
      hideTabs
      title="Verify your email"
      subtitle={
        info
          ? `Complete email verification for ${info.email} before continuing.`
          : 'Sign in to start email verification.'
      }
      switchText="Need to restart or use another email?"
      switchLabel="Back to sign in"
      switchTo="/login"
    >
      {info ? (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            complete()
          }}
          noValidate
          className="flex flex-col gap-5"
        >
          <div className="rounded-2xl bg-[#f7f0f8] p-4 text-sm leading-relaxed">
            <p>1. Get your six-digit code.</p>
            <p>2. Enter it below to verify your account.</p>
            <p>3. Personalize your Garbhika journey.</p>
          </div>
          {info.devBypassAvailable && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <strong>Development mode only</strong>
              <p className="mt-2">
                {info.developmentCode
                  ? 'Use the test code below, or skip this step while developing. No email was sent.'
                  : 'Generate a test code with Resend code, or skip verification while developing.'}
              </p>
              {info.developmentCode && (
                <p
                  className="mt-3 text-2xl font-bold tracking-[.25em]"
                  data-testid="development-code"
                >
                  {info.developmentCode}
                </p>
              )}
            </div>
          )}
          {info.deliveryFailed && (
            <p role="alert" className="text-sm text-red-700">
              Your account is saved, but the email could not be sent. Use Resend
              code to try again.
            </p>
          )}
          {error && (
            <p role="alert" className="text-sm text-red-700">
              {error}
            </p>
          )}
          {message && (
            <p role="status" className="text-sm">
              {message}
            </p>
          )}
          <DcField
            label="Email verification code"
            name="code"
            autoComplete="one-time-code"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            placeholder="6-digit code"
          />
          <p className="text-xs text-[#76677c]">
            Codes expire after 10 minutes. Maximum 5 attempts per code.
            Requesting a new code replaces the previous one.
          </p>
          <PrimaryButton
            type="submit"
            isLoading={status === 'loading'}
            disabled={sending}
          >
            Verify email & continue
          </PrimaryButton>
          <button
            type="button"
            disabled={wait > 0 || sending || status === 'loading'}
            onClick={resend}
            className="text-sm font-medium underline disabled:opacity-50"
          >
            {wait
              ? `Resend code in ${wait}s`
              : sending
                ? 'Sending code...'
                : 'Resend code'}
          </button>
          {info.devBypassAvailable && (
            <button
              type="button"
              disabled={sending || status === 'loading'}
              onClick={() => complete(true)}
              className="rounded-xl border border-amber-300 px-4 py-3 text-sm font-medium text-amber-900 disabled:opacity-50"
            >
              Skip OTP (development only)
            </button>
          )}
        </form>
      ) : (
        <Link to="/login" className="underline">
          Go to sign in
        </Link>
      )}
    </AuthShell>
  )
}
