import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AuthShell, { PasswordField } from '../components/common/AuthShell.jsx'
import { DcField, PrimaryButton } from '../components/common/DesignKit.jsx'
import { signupUser } from '../features/auth/authSlice.js'
import { validateAuthForm } from '../utils/validators.js'

export default function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status } = useSelector((state) => state.auth)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateAuthForm({ ...form, isSignup: true })
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    try {
      const user = await dispatch(signupUser(form)).unwrap()
      toast.success(`Welcome to Garbhika, ${user.name}!`)
      navigate('/')
    } catch (message) {
      toast.error(typeof message === 'string' ? message : 'Sign up failed. Please try again.')
    }
  }

  return (
    <AuthShell
      mode="signup"
      title="Begin Your Journey"
      subtitle="Create your free Garbhika account — no credit card required."
      switchText="Already have an account?"
      switchLabel="Log in"
      switchTo="/login"
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <DcField
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Your name"
        />
        <DcField
          label="Email Address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="you@example.com"
        />
        <PasswordField value={form.password} onChange={handleChange} error={errors.password} placeholder="At least 8 characters" />
        <PrimaryButton type="submit" className="mt-1" isLoading={status === 'loading'}>
          {status === 'loading' ? 'Creating Account...' : 'Create Account'}
        </PrimaryButton>
      </form>
    </AuthShell>
  )
}
