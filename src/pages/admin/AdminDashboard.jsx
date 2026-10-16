import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { get } from '../../api/client.js'
import { signOut as signOutUser } from '../../features/auth/authSlice.js'
import DashboardShell from '../../components/layout/DashboardShell.jsx'
import { Eyebrow, serif } from '../../components/common/DesignKit.jsx'
import AdminTable, { formatDate } from '../../components/admin/AdminTable.jsx'

const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'inquiries', label: 'Enquiries' },
  { key: 'bookings', label: 'Bookings' },
  { key: 'users', label: 'Customers' },
  { key: 'subscribers', label: 'Newsletter' },
  { key: 'community', label: 'Community Signups' },
  { key: 'audit', label: 'Audit log' },
  { key: 'account', label: 'Account & Security' },
]

const tables = {
  inquiries: {
    statusOptions: ['new', 'in_progress', 'resolved'],
    columns: [
      {
        key: 'createdAt',
        label: 'Received',
        render: (r) => formatDate(r.createdAt),
      },
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'topic', label: 'Topic' },
      { key: 'message', label: 'Message' },
    ],
  },
  bookings: {
    statusOptions: ['requested', 'confirmed', 'completed', 'cancelled'],
    columns: [
      { key: 'dateKey', label: 'Date' },
      { key: 'timeSlot', label: 'Time' },
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'expertName', label: 'Expert' },
      { key: 'interests', label: 'Interests' },
    ],
  },
  users: {
    roleEditable: false,
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      {
        key: 'emailVerified',
        label: 'Verified',
        render: (r) => (r.emailVerified ? 'Yes' : 'No'),
      },
      {
        key: 'profile',
        label: 'Journey preferences',
        render: (r) => (
          <div className="min-w-[220px]">
            <p>
              {r.profile?.stage || 'Not completed'} ·{' '}
              {r.profile?.language || 'Language not set'}
            </p>
            <p>{r.profile?.services?.join(', ')}</p>
            {r.profile?.dueDate && <p>Due date: {r.profile.dueDate}</p>}
            {r.profile?.context && (
              <p className="whitespace-pre-wrap break-words">
                {r.profile.context}
              </p>
            )}
          </div>
        ),
      },
      {
        key: 'createdAt',
        label: 'Joined',
        render: (r) => formatDate(r.createdAt),
      },
    ],
  },
  subscribers: {
    columns: [
      { key: 'email', label: 'Email' },
      {
        key: 'active',
        label: 'Active',
        render: (r) => (r.active ? 'Yes' : 'No'),
      },
      {
        key: 'createdAt',
        label: 'Subscribed',
        render: (r) => formatDate(r.createdAt),
      },
    ],
  },
  community: {
    columns: [
      { key: 'email', label: 'Email' },
      {
        key: 'active',
        label: 'Active',
        render: (r) => (r.active ? 'Yes' : 'No'),
      },
      {
        key: 'createdAt',
        label: 'Joined',
        render: (r) => formatDate(r.createdAt),
      },
    ],
  },
  audit: {
    endpoint: '/admin/audit',
    exportable: false,
    searchable: false,
    columns: [
      {
        key: 'createdAt',
        label: 'When',
        render: (r) => formatDate(r.createdAt),
      },
      { key: 'actorEmail', label: 'By' },
      { key: 'action', label: 'Action' },
      { key: 'resource', label: 'Resource' },
      {
        key: 'details',
        label: 'Details',
        render: (r) =>
          r.details && Object.keys(r.details).length
            ? JSON.stringify(r.details)
            : '—',
      },
    ],
  },
}

function Overview() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    setError('')
    get('/admin/stats')
      .then(setStats)
      .catch((e) => setError(e.message))
  }, [attempt])
  if (error)
    return (
      <p role="alert">
        {error}{' '}
        <button className="underline" onClick={() => setAttempt((x) => x + 1)}>
          Retry
        </button>
      </p>
    )

  if (!stats) return <p className="m-0 text-[#4d444c]">Loading overview…</p>
  const cards = [
    ['Customers', stats.totals.users],
    ['New enquiries', stats.totals.newInquiries],
    ['Requested bookings', stats.totals.requestedBookings],
    ['Confirmed bookings', stats.totals.confirmedBookings],
    ['Newsletter subscribers', stats.totals.subscribers],
    ['Community signups', stats.totals.communityMembers],
  ]
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {cards.map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-[#e9e0e8] bg-white p-5"
          >
            <div className="text-sm text-[#4d444c]">{label}</div>
            <div className={`${serif} mt-2 text-[38px] text-[#0f0014]`}>
              {value}
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-[#e9e0e8] bg-white p-5">
          <h3 className={`${serif} m-0 mb-3 text-[22px] text-[#0f0014]`}>
            Latest enquiries
          </h3>
          {stats.recentInquiries.length === 0 && (
            <p className="m-0 text-[#4d444c]">None yet.</p>
          )}
          {stats.recentInquiries.map((item) => (
            <p
              key={item.id}
              className="m-0 border-t border-[#f0e8ef] py-2 text-sm text-[#1e1a20]"
            >
              {item.name} · {item.topic} ·{' '}
              <span className="text-[#4d444c]">{item.status}</span>
            </p>
          ))}
        </div>
        <div className="rounded-2xl border border-[#e9e0e8] bg-white p-5">
          <h3 className={`${serif} m-0 mb-3 text-[22px] text-[#0f0014]`}>
            Latest bookings
          </h3>
          {stats.recentBookings.length === 0 && (
            <p className="m-0 text-[#4d444c]">None yet.</p>
          )}
          {stats.recentBookings.map((item) => (
            <p
              key={item.id}
              className="m-0 border-t border-[#f0e8ef] py-2 text-sm text-[#1e1a20]"
            >
              {item.name} · {item.dateKey} {item.timeSlot} ·{' '}
              <span className="text-[#4d444c]">{item.status}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const location = useLocation()
  const paths = {
    overview: '/admin',
    inquiries: '/admin/enquiries',
    bookings: '/admin/bookings',
    users: '/admin/customers',
    subscribers: '/admin/newsletter',
    community: '/admin/community',
    audit: '/admin/audit',
    account: '/admin/account',
  }
  const icons = {
    overview: 'dashboard',
    inquiries: 'mail',
    bookings: 'calendar_month',
    users: 'group',
    subscribers: 'mark_email_read',
    community: 'forum',
    audit: 'history',
    account: 'admin_panel_settings',
  }
  const items = tabs.map((x) => ({
    ...x,
    to: paths[x.key],
    icon: icons[x.key],
  }))
  const current = items.find(
    (x) => x.to === location.pathname.replace(/\/$/, ''),
  )
  const tab = current?.key || 'overview'
  const config = tables[tab]

  const signOut = async () => {
    await dispatch(signOutUser())
    navigate('/admin/login', { replace: true })
  }

  if (!current) return <Navigate to="/admin" replace />
  return (
    <DashboardShell kind="admin" items={items} title={current.label}>
      <div className="flex flex-col gap-7">
        <header>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[.16em] text-[#8d7591]">
            Garbhika administration
          </p>
          <h1 className="font-serif text-[clamp(28px,4vw,40px)]">
            {tab === 'overview' ? 'Welcome back' : current.label}
          </h1>
          <p className="mt-2 text-sm text-[#76677c]">
            Manage your customers, consultation requests and support activity.
          </p>
        </header>
        {tab === 'overview' ? (
          <Overview />
        ) : tab === 'account' ? (
          <section className="rounded-2xl border bg-white p-6 space-y-4">
            <h2 className="font-serif text-2xl">Account & Security</h2>
            <p>Administrator: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>
              Administrator credentials are managed by the server operator.
              Contact them to change your username or password.
            </p>
            <button
              className="rounded-full bg-[#330d3b] px-5 py-3 text-white"
              onClick={signOut}
            >
              Sign out on all devices
            </button>
          </section>
        ) : (
          <AdminTable key={tab} resource={tab} {...config} />
        )}
      </div>
    </DashboardShell>
  )
}
