import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AuthShell, { PasswordField } from '../components/common/AuthShell.jsx'
import { DcField, PrimaryButton } from '../components/common/DesignKit.jsx'
import { loginUser, loginAdmin } from '../features/auth/authSlice.js'
import { isValidEmail } from '../utils/validators.js'
import { homePathFor, safeNext } from '../components/routing/Guards.jsx'
export default function Login({ admin = false }) {
  const dispatch = useDispatch(),
    navigate = useNavigate(),
    [params] = useSearchParams(),
    { status } = useSelector((s) => s.auth)
  const [form, setForm] = useState({ email: '', username: '', password: '' }),
    [error, setError] = useState('')
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  async function submit(e) {
    e.preventDefault()
    setError('')
    if (
      !form.password ||
      (admin ? !form.username.trim() : !isValidEmail(form.email))
    )
      return setError(
        admin
          ? 'Enter your username and password.'
          : 'Enter a valid email and password.',
      )
    try {
      const data = await dispatch(
        (admin ? loginAdmin : loginUser)(form),
      ).unwrap()
      if (data.verificationRequired) {
        try {
          sessionStorage.setItem('garbhika_verification', JSON.stringify(data))
        } catch {}
        navigate('/verify-email', { state: data })
        return
      }
      const next = safeNext(params.get('next'))
      navigate(
        data.user.role === 'admin'
          ? '/admin'
          : !data.user.profile?.completed
            ? '/onboarding'
            : next && !next.startsWith('/admin')
              ? next
              : homePathFor(data.user),
        { replace: true },
      )
    } catch (e) {
      setError(e.message || 'Sign in failed.')
    }
  }
  return (
    <AuthShell
      mode="login"
      hideTabs={admin}
      title={admin ? 'Admin sign in' : 'Welcome Back'}
      subtitle={
        admin
          ? 'Sign in to manage Garbhika.'
          : 'Continue your Garbhika journey.'
      }
      switchText={admin ? 'Customer account?' : 'New to Garbhika?'}
      switchLabel={admin ? 'Customer login' : 'Create an account'}
      switchTo={admin ? '/login' : '/signup'}
    >
      <form onSubmit={submit} noValidate className="flex flex-col gap-4">
        {error && (
          <p role="alert" className="text-red-700">
            {error}
          </p>
        )}
        {admin ? (
          <DcField
            label="Admin username"
            name="username"
            autoComplete="username"
            value={form.username}
            onChange={change}
          />
        ) : (
          <DcField
            label="Email address"
            name="email"
            type="email"
            autoComplete="username"
            value={form.email}
            onChange={change}
          />
        )}
        <PasswordField
          autoComplete="current-password"
          value={form.password}
          onChange={change}
        />
        {!admin && (
          <Link to="/forgot-password" className="text-sm underline">
            Forgot password?
          </Link>
        )}
        <PrimaryButton type="submit" isLoading={status === 'loading'}>
          Sign in
        </PrimaryButton>
        {!admin && (
          <Link to="/admin/login" className="text-sm underline">
            Administrator sign in
          </Link>
        )}
      </form>
    </AuthShell>
  )
}
