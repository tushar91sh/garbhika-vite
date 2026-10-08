import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import FormField from '../components/forms/FormField.jsx'
import Button from '../components/common/Button.jsx'
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
    <div className="max-w-md mx-auto px-margin-mobile py-section-padding">
      <div className="text-center mb-10 space-y-3">
        <h1 className="font-headline-lg text-headline-lg text-primary">Begin Your Journey</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Create your free Garbhika account — no credit card required.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="bg-surface-container-low rounded-2xl p-8 space-y-6">
        <FormField
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Your name"
        />
        <FormField
          label="Email Address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="you@example.com"
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="At least 8 characters"
        />
        <Button type="submit" className="w-full" isLoading={status === 'loading'}>
          {status === 'loading' ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>

      <p className="text-center font-body-md text-body-md text-on-surface-variant mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-primary hover:opacity-70 transition-opacity">
          Log in
        </Link>
      </p>
    </div>
  )
}
