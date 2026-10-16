import { useDispatch, useSelector } from 'react-redux'
import { fetchMe } from '../../features/auth/authSlice.js'
import { Link, Navigate, useLocation, useSearchParams } from 'react-router-dom'

// Where a signed-in user belongs after login.
export function homePathFor(user) {
  return user?.role === 'admin' ? '/admin' : '/dashboard'
}

// Only same-site paths are accepted from ?next=, so the login page cannot be used to redirect users elsewhere.
export function safeNext(value) {
  return typeof value === 'string' &&
    value.startsWith('/') &&
    !value.startsWith('//') &&
    !value.includes('\\') &&
    !/[\x00-\x1f]/.test(value)
    ? value
    : null
}

function SessionCheck() {
  const dispatch = useDispatch(),
    error = useSelector((s) => s.auth.error)
  return (
    <div className="p-12 text-center" role="status">
      {error || 'Checking your session...'}
      {error && (
        <button className="ml-4 underline" onClick={() => dispatch(fetchMe())}>
          Retry
        </button>
      )}
    </div>
  )
}
export function RequireAuth({ children }) {
  const user = useSelector((state) => state.auth.user)
  const checked = useSelector((state) => state.auth.checked)
  const location = useLocation()
  if (!checked) return <SessionCheck />
  if (!user)
    return (
      <Navigate
        to={`/login?next=${encodeURIComponent(location.pathname)}`}
        replace
      />
    )
  return children
}

export function RequireAdmin({ children }) {
  const user = useSelector((state) => state.auth.user)
  const checked = useSelector((state) => state.auth.checked)
  const location = useLocation()
  if (!checked) return <SessionCheck />
  if (!user)
    return (
      <Navigate
        to={`/admin/login?next=${encodeURIComponent(location.pathname)}`}
        replace
      />
    )
  if (user.role !== 'admin') {
    return (
      <main className="mx-auto flex max-w-[640px] flex-col gap-4 px-6 py-24 text-center">
        <h1 className="m-0 font-serif text-[36px] font-medium text-[#0f0014]">
          Administrator access required
        </h1>
        <p className="m-0 text-[#4d444c]">
          This area is only for Garbhika administrators. Your account does not
          have access.
        </p>
        <Link
          to="/dashboard"
          className="mx-auto mt-2 rounded-full bg-[#0f0014] px-6 py-3 text-white no-underline"
        >
          Go to my dashboard
        </Link>
      </main>
    )
  }
  return children
}

// Login and signup pages: signed-in users are sent to their own dashboard instead.
export function GuestOnly({ children }) {
  const user = useSelector((state) => state.auth.user)
  const checked = useSelector((state) => state.auth.checked)
  const [params] = useSearchParams()
  if (!checked) return <SessionCheck />
  if (user)
    return (
      <Navigate
        to={safeNext(params.get('next')) || homePathFor(user)}
        replace
      />
    )
  return children
}
