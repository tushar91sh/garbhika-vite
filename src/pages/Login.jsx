import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AuthShell, { PasswordField } from '../components/common/AuthShell.jsx'
import { DcField, PrimaryButton } from '../components/common/DesignKit.jsx'
import { loginUser } from '../features/auth/authSlice.js'
import { validateAuthForm } from '../utils/validators.js'
import { homePathFor, safeNext } from '../components/routing/Guards.jsx'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { status } = useSelector((state) => state.auth)
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateAuthForm({ ...form, isSignup: false })
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    try {
      const user = await dispatch(loginUser(form)).unwrap()
      toast.success(`Welcome back, ${user.name}.`)
      navigate(safeNext(params.get('next')) || homePathFor(user), { replace: true })
    } catch (message) {
      toast.error(typeof message === 'string' ? message : 'Login failed. Please try again.')
    }
  }

  return (
    <AuthShell
      mode="login"
      title="Welcome Back"
      subtitle="Log in to continue your journey with Garbhika."
      switchText="New to Garbhika?"
      switchLabel="Create an account"
      switchTo="/signup"
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <DcField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="you@example.com" />
        <PasswordField value={form.password} onChange={handleChange} error={errors.password} placeholder="••••••••" />
        <div className="-mt-1 text-right text-sm">
          <Link to="/forgot-password" className="font-semibold text-[#330d3b] underline hover:text-[#7a4f80]">
            Forgot password?
          </Link>
        </div>
        <PrimaryButton type="submit" className="mt-1" isLoading={status === 'loading'}>
          {status === 'loading' ? 'Logging In...' : 'Log In'}
        </PrimaryButton>
      </form>
    </AuthShell>
  )
}
