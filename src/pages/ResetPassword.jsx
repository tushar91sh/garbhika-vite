import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import AuthShell, { PasswordField } from '../components/common/AuthShell.jsx'
import { PrimaryButton } from '../components/common/DesignKit.jsx'
import { resetPassword } from '../features/auth/authSlice.js'
import { validateNewPassword } from '../utils/validators.js'

export default function ResetPassword() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const token = params.get('token') || ''
  const { status } = useSelector((state) => state.auth)
  const [form, setForm] = useState({ password: '', confirm: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateNewPassword(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return
    try {
      const message = await dispatch(resetPassword({ token, password: form.password })).unwrap()
      toast.success(message)
      navigate('/login', { replace: true })
    } catch (message) {
      toast.error(typeof message === 'string' ? message : 'This reset link is invalid or has expired.')
    }
  }

  if (!token) {
    return (
      <AuthShell mode="login" title="Link not valid" subtitle="This password reset link is incomplete." switchText="Need a new link?" switchLabel="Request one" switchTo="/forgot-password">
        <Link to="/forgot-password" className="text-[#330d3b] underline">Request a new reset link</Link>
      </AuthShell>
    )
  }

  return (
    <AuthShell mode="login" title="Choose a new password" subtitle="Use at least 8 characters." switchText="Changed your mind?" switchLabel="Back to log in" switchTo="/login">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <PasswordField label="New password" name="password" value={form.password} onChange={handleChange} error={errors.password} />
        <PasswordField label="Confirm new password" name="confirm" value={form.confirm} onChange={handleChange} error={errors.confirm} />
        <PrimaryButton type="submit" isLoading={status === 'loading'}>
          {status === 'loading' ? 'Saving...' : 'Save new password'}
        </PrimaryButton>
      </form>
    </AuthShell>
  )
}
