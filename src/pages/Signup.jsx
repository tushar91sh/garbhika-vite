import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AuthShell, { PasswordField } from '../components/common/AuthShell.jsx'
import { DcField, PrimaryButton } from '../components/common/DesignKit.jsx'
import { signupUser } from '../features/auth/authSlice.js'
import { validateAuthForm } from '../utils/validators.js'
export default function Signup() {
  const dispatch = useDispatch(),
    navigate = useNavigate(),
    { status } = useSelector((s) => s.auth)
  const [form, setForm] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
      marketingOptIn: false,
    }),
    [errors, setErrors] = useState({}),
    [error, setError] = useState('')
  const change = (e) =>
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    })
  async function submit(e) {
    e.preventDefault()
    const errs = validateAuthForm({ ...form, isSignup: true })
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = 'Passwords do not match.'
    if (!form.acceptTerms)
      errs.acceptTerms = 'Accept the terms and privacy policy.'
    setErrors(errs)
    if (Object.keys(errs).length) return
    setError('')
    try {
      const data = await dispatch(signupUser(form)).unwrap()
      if (data.verificationRequired) {
        try {
          sessionStorage.setItem('garbhika_verification', JSON.stringify(data))
        } catch {}
        navigate('/verify-email', { state: data })
      } else navigate('/onboarding', { replace: true })
    } catch (e) {
      setError(e.message || 'Could not create your account.')
    }
  }
  return (
    <AuthShell
      mode="signup"
      title="Begin Your Journey"
      subtitle="Create your account, then personalize your support."
      switchText="Already have an account?"
      switchLabel="Log in"
      switchTo="/login"
    >
      <form onSubmit={submit} noValidate className="flex flex-col gap-4">
        {error && (
          <p role="alert" className="text-red-700">
            {error}
          </p>
        )}
        <DcField
          label="Full name"
          name="name"
          autoComplete="name"
          maxLength={80}
          value={form.name}
          onChange={change}
          error={errors.name}
        />
        <DcField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          value={form.email}
          onChange={change}
          error={errors.email}
        />
        <PasswordField
          value={form.password}
          autoComplete="new-password"
          onChange={change}
          error={errors.password}
        />
        <PasswordField
          label="Confirm password"
          name="confirmPassword"
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={change}
          error={errors.confirmPassword}
        />
        <label className="text-sm">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={form.acceptTerms}
            onChange={change}
          />{' '}
          I accept the{' '}
          <Link to="/terms-of-service" className="underline">
            terms
          </Link>{' '}
          and{' '}
          <Link to="/privacy-policy" className="underline">
            privacy policy
          </Link>
          .
        </label>
        {errors.acceptTerms && (
          <p role="alert" className="text-sm text-red-700">
            {errors.acceptTerms}
          </p>
        )}
        <label className="text-sm">
          <input
            type="checkbox"
            name="marketingOptIn"
            checked={form.marketingOptIn}
            onChange={change}
          />{' '}
          Send me optional tips and offers.
        </label>
        <PrimaryButton type="submit" isLoading={status === 'loading'}>
          Create account
        </PrimaryButton>
      </form>
    </AuthShell>
  )
}
