import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AuthShell from '../components/common/AuthShell.jsx'
import { DcField, PrimaryButton } from '../components/common/DesignKit.jsx'
import { forgotPassword } from '../features/auth/authSlice.js'
import { isValidEmail } from '../utils/validators.js'

export default function ForgotPassword() {
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.auth)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValidEmail(email)) return setError('Please enter a valid email address.')
    setError('')
    try {
      await dispatch(forgotPassword({ email })).unwrap()
      setSent(true)
    } catch (message) {
      toast.error(typeof message === 'string' ? message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <AuthShell
      mode="login"
      title="Reset your password"
      subtitle="Enter your email and we will send you a link to choose a new password."
      switchText="Remembered it?"
      switchLabel="Back to log in"
      switchTo="/login"
    >
      {sent ? (
        <p className="m-0 rounded-2xl bg-[#faf1fa] p-5 text-[#4d444c]">
          If an account exists for that email, a reset link is on its way. The link expires in 30 minutes. Check your spam folder if it does not arrive.
        </p>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <DcField label="Email Address" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={error} placeholder="you@example.com" />
          <PrimaryButton type="submit" isLoading={status === 'loading'}>
            {status === 'loading' ? 'Sending...' : 'Send reset link'}
          </PrimaryButton>
        </form>
      )}
    </AuthShell>
  )
}
