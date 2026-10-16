import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { get, patch, post } from '../../api/client.js'
import { fetchMe, logout } from '../../features/auth/authSlice.js'
import {
  DcField,
  PrimaryButton,
  serif,
} from '../../components/common/DesignKit.jsx'
import { PasswordField } from '../../components/common/AuthShell.jsx'
import DashboardShell from '../../components/layout/DashboardShell.jsx'
import JourneyForm from '../../components/forms/JourneyForm.jsx'
import { validateNewPassword } from '../../utils/validators.js'

const statusStyles = {
  requested: 'bg-[#fff4d6] text-[#7a5a00]',
  confirmed: 'bg-[#e3f5e8] text-[#1b5e2b]',
  completed: 'bg-[#efe5ee] text-[#330d3b]',
  cancelled: 'bg-[#f6e1e1] text-[#8a1f1f]',
}

const card =
  'flex flex-col gap-4 rounded-3xl border border-[#e9e0e8] bg-white p-6'

export default function CustomerDashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const location = useLocation()
  const items = [
    { key: 'overview', label: 'Overview', icon: 'dashboard', to: '/dashboard' },
    {
      key: 'bookings',
      label: 'My Consultations',
      icon: 'calendar_month',
      to: '/dashboard/consultations',
    },
    {
      key: 'journey',
      label: 'My Journey & Services',
      icon: 'favorite',
      to: '/dashboard/journey',
    },
    {
      key: 'account',
      label: 'Account & Security',
      icon: 'manage_accounts',
      to: '/dashboard/account',
    },
  ]
  const current = items.find(
    (x) => x.to === location.pathname.replace(/\/$/, ''),
  )
  const tab = current?.key || 'overview'
  const setTab = (key) => navigate(items.find((x) => x.key === key).to)
  const [loadError, setLoadError] = useState('')
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirmId, setConfirmId] = useState(null)
  const [name, setName] = useState(user?.name || '')
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    password: '',
    confirm: '',
  })
  const [passwordErrors, setPasswordErrors] = useState({})

  const loadBookings = () => {
    setLoading(true)
    setLoadError('')
    get('/me/bookings')
      .then((data) => setBookings(data.bookings))
      .catch((error) => setLoadError(error.message))
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
    const errors = {
      ...validateNewPassword({
        password: passwords.password,
        confirm: passwords.confirm,
      }),
    }
    if (!passwords.currentPassword)
      errors.currentPassword = 'Enter your current password.'
    setPasswordErrors(errors)
    if (Object.keys(errors).length) return
    try {
      await post('/me/password', {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.password,
      })
      setPasswords({ currentPassword: '', password: '', confirm: '' })
      dispatch(logout())
      toast.success('Password updated. Please sign in again.')
      navigate('/login', { replace: true })
    } catch (error) {
      toast.error(error.message)
    }
  }

  if (user?.role === 'admin') return <Navigate to="/admin" replace />
  if (!current) return <Navigate to="/dashboard" replace />
  return (
    <DashboardShell kind="customer" items={items} title={current.label}>
      <div className="flex flex-col gap-7">
        <header className="rounded-[24px] bg-gradient-to-br from-[#43234e] to-[#805389] p-6 text-white md:p-9">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[.16em] text-[#e6cbe9]">
            Your personal wellness space
          </p>
          <h1 className="font-serif text-[clamp(28px,4vw,42px)]">
            Hello, {user?.name}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#f0def3]">
            Your journey, consultations and preferences - together in one calm
            space.
          </p>
          <Link
            to="/book-consultation/"
            className="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#43234e] no-underline"
          >
            Book a consultation
          </Link>
        </header>
        {tab === 'overview' && (
          <div className="grid gap-5 md:grid-cols-2">
            <div className={card}>
              <h2 className="font-serif text-2xl">Your journey</h2>
              <p>
                {user?.profile?.stage ||
                  'Personalize your journey to get started.'}
              </p>
              <p>Preferred language: {user?.profile?.language || 'Not set'}</p>
              <p>
                {user?.profile?.services?.join(', ') ||
                  'Choose the services you are interested in.'}
              </p>
              <button
                className="self-start underline"
                onClick={() => setTab('journey')}
              >
                Update my preferences
              </button>
            </div>
            <div className={card}>
              <h2 className="font-serif text-2xl">Your consultations</h2>
              {loading ? (
                <p>Loading...</p>
              ) : loadError ? (
                <p role="alert">{loadError}</p>
              ) : (
                <>
                  <p>
                    {bookings.filter((x) => x.status === 'requested').length}{' '}
                    requested ·{' '}
                    {bookings.filter((x) => x.status === 'confirmed').length}{' '}
                    confirmed ·{' '}
                    {bookings.filter((x) => x.status === 'completed').length}{' '}
                    completed
                  </p>
                  <button
                    className="self-start underline"
                    onClick={() => setTab('bookings')}
                  >
                    View consultations
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        {tab === 'journey' && (
          <section className={card}>
            <h2 className="font-serif text-2xl">My Journey & Services</h2>
            <JourneyForm />
          </section>
        )}
        {tab === 'bookings' && (
          <section className={card} aria-labelledby="bookings-heading">
            <h2
              id="bookings-heading"
              className={`${serif} m-0 text-[28px] font-medium text-[#0f0014]`}
            >
              My consultations
            </h2>
            {loading && (
              <p className="m-0 text-[#4d444c]">Loading your bookings…</p>
            )}
            {loadError && (
              <p role="alert">
                {loadError}{' '}
                <button className="underline" onClick={loadBookings}>
                  Retry
                </button>
              </p>
            )}
            {!loading && !loadError && bookings.length === 0 && (
              <p className="m-0 text-[#4d444c]">
                You have no consultations yet.{' '}
                <Link to="/book-consultation/" className="underline">
                  Book one now
                </Link>
                .
              </p>
            )}
            {!loading &&
              !loadError &&
              bookings.map((booking) => {
                const cancellable = ['requested', 'confirmed'].includes(
                  booking.status,
                )
                return (
                  <div
                    key={booking._id}
                    className="flex flex-wrap items-center justify-between gap-4 border-t border-[#f0e8ef] pt-4"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-[#0f0014]">
                        {booking.dateKey} at {booking.timeSlot}
                      </span>
                      <span className="text-sm text-[#4d444c]">
                        {booking.expertName || 'General consultation'}
                        {booking.interests?.length
                          ? ` · ${booking.interests.join(', ')}`
                          : ''}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[booking.status]}`}
                      >
                        {booking.status}
                      </span>
                      {cancellable && confirmId !== booking._id && (
                        <button
                          type="button"
                          onClick={() => setConfirmId(booking._id)}
                          className="text-sm text-[#8a1f1f] underline"
                        >
                          Cancel
                        </button>
                      )}
                      {cancellable && confirmId === booking._id && (
                        <span className="flex items-center gap-2 text-sm">
                          Cancel this booking?
                          <button
                            type="button"
                            onClick={() => cancelBooking(booking._id)}
                            className="rounded-full bg-[#8a1f1f] px-3 py-1 text-white"
                          >
                            Yes, cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmId(null)}
                            className="rounded-full border px-3 py-1"
                          >
                            No
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
          </section>
        )}

        {tab === 'account' && (
          <div className="grid gap-6 md:grid-cols-2">
            <form
              onSubmit={saveName}
              className={card}
              aria-labelledby="profile-heading"
            >
              <h2
                id="profile-heading"
                className={`${serif} m-0 text-[24px] font-medium text-[#0f0014]`}
              >
                Profile
              </h2>
              <DcField
                label="Full name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="text-sm text-[#4d444c]">Email: {user?.email}</div>
              <PrimaryButton type="submit" className="self-start">
                Save name
              </PrimaryButton>
            </form>

            <form
              onSubmit={changePassword}
              noValidate
              className={card}
              aria-labelledby="password-heading"
            >
              <h2
                id="password-heading"
                className={`${serif} m-0 text-[24px] font-medium text-[#0f0014]`}
              >
                Change password
              </h2>
              <PasswordField
                label="Current password"
                name="currentPassword"
                value={passwords.currentPassword}
                error={passwordErrors.currentPassword}
                onChange={(e) =>
                  setPasswords((p) => ({
                    ...p,
                    currentPassword: e.target.value,
                  }))
                }
              />
              <PasswordField
                label="New password"
                name="password"
                value={passwords.password}
                error={passwordErrors.password}
                onChange={(e) =>
                  setPasswords((p) => ({ ...p, password: e.target.value }))
                }
              />
              <PasswordField
                label="Confirm new password"
                name="confirm"
                value={passwords.confirm}
                error={passwordErrors.confirm}
                onChange={(e) =>
                  setPasswords((p) => ({ ...p, confirm: e.target.value }))
                }
              />
              <PrimaryButton type="submit" className="self-start">
                Update password
              </PrimaryButton>
            </form>
          </div>
        )}
      </div>
    </DashboardShell>
  )
}
