import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { get, patch, post } from '../../api/client.js'
import { fetchMe, logout } from '../../features/auth/authSlice.js'
import { DcField, Eyebrow, PrimaryButton, serif } from '../../components/common/DesignKit.jsx'
import { PasswordField } from '../../components/common/AuthShell.jsx'
import { validateNewPassword } from '../../utils/validators.js'

const statusStyles = {
  requested: 'bg-[#fff4d6] text-[#7a5a00]',
  confirmed: 'bg-[#e3f5e8] text-[#1b5e2b]',
  completed: 'bg-[#efe5ee] text-[#330d3b]',
  cancelled: 'bg-[#f6e1e1] text-[#8a1f1f]',
}

const card = 'flex flex-col gap-4 rounded-3xl border border-[#e9e0e8] bg-white p-6'

export default function CustomerDashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirmId, setConfirmId] = useState(null)
  const [name, setName] = useState(user?.name || '')
  const [passwords, setPasswords] = useState({ currentPassword: '', password: '', confirm: '' })
  const [passwordErrors, setPasswordErrors] = useState({})

  const loadBookings = () => {
    setLoading(true)
    get('/me/bookings')
      .then((data) => setBookings(data.bookings))
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadBookings()
  }, [])

  const cancelBooking = async (id) => {
    try {
      await patch(`/me/bookings/${id}/cancel`)
      toast.success('Your consultation has been cancelled.')
      setConfirmId(null)
      loadBookings()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const saveName = async (e) => {
    e.preventDefault()
    try {
      await patch('/me', { name: name.trim() })
      dispatch(fetchMe())
      toast.success('Profile updated.')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const changePassword = async (e) => {
    e.preventDefault()
    const errors = { ...validateNewPassword({ password: passwords.password, confirm: passwords.confirm }) }
    if (!passwords.currentPassword) errors.currentPassword = 'Enter your current password.'
    setPasswordErrors(errors)
    if (Object.keys(errors).length) return
    try {
      await post('/me/password', { currentPassword: passwords.currentPassword, newPassword: passwords.password })
      setPasswords({ currentPassword: '', password: '', confirm: '' })
      toast.success('Password updated.')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const signOut = () => {
    dispatch(logout())
    navigate('/', { replace: true })
  }

  return (
    <main className="mx-auto flex max-w-[1100px] flex-col gap-10 px-6 pb-24 pt-[clamp(40px,6vw,80px)]">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-3">
          <Eyebrow>My Garbhika</Eyebrow>
          <h1 className={`${serif} m-0 text-[clamp(36px,5vw,52px)] font-medium text-[#0f0014]`}>Hello, {user?.name}</h1>
        </div>
        <div className="flex gap-3">
          <Link to="/book-consultation/" className="rounded-full bg-[#0f0014] px-5 py-3 text-sm text-white no-underline">Book a consultation</Link>
          <button type="button" onClick={signOut} className="rounded-full border border-[#0f0014] px-5 py-3 text-sm text-[#0f0014]">Log out</button>
        </div>
      </header>

      <section className={card} aria-labelledby="bookings-heading">
        <h2 id="bookings-heading" className={`${serif} m-0 text-[28px] font-medium text-[#0f0014]`}>My consultations</h2>
        {loading && <p className="m-0 text-[#4d444c]">Loading your bookings…</p>}
        {!loading && bookings.length === 0 && (
          <p className="m-0 text-[#4d444c]">You have no consultations yet. <Link to="/book-consultation/" className="underline">Book one now</Link>.</p>
        )}
        {!loading && bookings.map((booking) => {
          const cancellable = ['requested', 'confirmed'].includes(booking.status)
          return (
            <div key={booking._id} className="flex flex-wrap items-center justify-between gap-4 border-t border-[#f0e8ef] pt-4">
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-[#0f0014]">{booking.dateKey} at {booking.timeSlot}</span>
                <span className="text-sm text-[#4d444c]">{booking.expertName || 'General consultation'}{booking.interests?.length ? ` · ${booking.interests.join(', ')}` : ''}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[booking.status]}`}>{booking.status}</span>
                {cancellable && confirmId !== booking._id && (
                  <button type="button" onClick={() => setConfirmId(booking._id)} className="text-sm text-[#8a1f1f] underline">Cancel</button>
                )}
                {cancellable && confirmId === booking._id && (
                  <span className="flex items-center gap-2 text-sm">
                    Cancel this booking?
                    <button type="button" onClick={() => cancelBooking(booking._id)} className="rounded-full bg-[#8a1f1f] px-3 py-1 text-white">Yes, cancel</button>
                    <button type="button" onClick={() => setConfirmId(null)} className="rounded-full border px-3 py-1">No</button>
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <form onSubmit={saveName} className={card} aria-labelledby="profile-heading">
          <h2 id="profile-heading" className={`${serif} m-0 text-[24px] font-medium text-[#0f0014]`}>Profile</h2>
          <DcField label="Full name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          <div className="text-sm text-[#4d444c]">Email: {user?.email}</div>
          <PrimaryButton type="submit" className="self-start">Save name</PrimaryButton>
        </form>

        <form onSubmit={changePassword} noValidate className={card} aria-labelledby="password-heading">
          <h2 id="password-heading" className={`${serif} m-0 text-[24px] font-medium text-[#0f0014]`}>Change password</h2>
          <PasswordField label="Current password" name="currentPassword" value={passwords.currentPassword} error={passwordErrors.currentPassword} onChange={(e) => setPasswords((p) => ({ ...p, currentPassword: e.target.value }))} />
          <PasswordField label="New password" name="password" value={passwords.password} error={passwordErrors.password} onChange={(e) => setPasswords((p) => ({ ...p, password: e.target.value }))} />
          <PasswordField label="Confirm new password" name="confirm" value={passwords.confirm} error={passwordErrors.confirm} onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))} />
          <PrimaryButton type="submit" className="self-start">Update password</PrimaryButton>
        </form>
      </div>
    </main>
  )
}
