import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { get } from '../../api/client.js'
import { logout } from '../../features/auth/authSlice.js'
import { Eyebrow, serif } from '../../components/common/DesignKit.jsx'
import AdminTable, { formatDate } from '../../components/admin/AdminTable.jsx'

const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'inquiries', label: 'Enquiries' },
  { key: 'bookings', label: 'Bookings' },
  { key: 'users', label: 'Users' },
  { key: 'subscribers', label: 'Newsletter' },
  { key: 'community', label: 'Community' },
  { key: 'audit', label: 'Audit log' },
]

const tables = {
  inquiries: {
    statusOptions: ['new', 'in_progress', 'resolved'],
    columns: [
      { key: 'createdAt', label: 'Received', render: (r) => formatDate(r.createdAt) },
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
    roleEditable: true,
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
      { key: 'createdAt', label: 'Joined', render: (r) => formatDate(r.createdAt) },
    ],
  },
  subscribers: {
    columns: [
      { key: 'email', label: 'Email' },
      { key: 'active', label: 'Active', render: (r) => (r.active ? 'Yes' : 'No') },
      { key: 'createdAt', label: 'Subscribed', render: (r) => formatDate(r.createdAt) },
    ],
  },
  community: {
    columns: [
      { key: 'email', label: 'Email' },
      { key: 'active', label: 'Active', render: (r) => (r.active ? 'Yes' : 'No') },
      { key: 'createdAt', label: 'Joined', render: (r) => formatDate(r.createdAt) },
    ],
  },
  audit: {
    endpoint: '/admin/audit',
    exportable: false,
    searchable: false,
    columns: [
      { key: 'createdAt', label: 'When', render: (r) => formatDate(r.createdAt) },
      { key: 'actorEmail', label: 'By' },
      { key: 'action', label: 'Action' },
      { key: 'resource', label: 'Resource' },
      { key: 'details', label: 'Details', render: (r) => (r.details && Object.keys(r.details).length ? JSON.stringify(r.details) : '—') },
    ],
  },
}

function Overview() {
  const [stats, setStats] = useState(null)
  useEffect(() => {
    get('/admin/stats').then(setStats).catch((error) => toast.error(error.message))
  }, [])

  if (!stats) return <p className="m-0 text-[#4d444c]">Loading overview…</p>
  const cards = [
    ['Customers', stats.totals.users],
    ['New enquiries', stats.totals.newInquiries],
    ['Requested bookings', stats.totals.requestedBookings],
    ['Confirmed bookings', stats.totals.confirmedBookings],
    ['Newsletter subscribers', stats.totals.subscribers],
    ['Community members', stats.totals.communityMembers],
  ]
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-[#e9e0e8] bg-white p-5">
            <div className="text-sm text-[#4d444c]">{label}</div>
            <div className={`${serif} mt-2 text-[38px] text-[#0f0014]`}>{value}</div>
          </div>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-[#e9e0e8] bg-white p-5">
          <h3 className={`${serif} m-0 mb-3 text-[22px] text-[#0f0014]`}>Latest enquiries</h3>
          {stats.recentInquiries.length === 0 && <p className="m-0 text-[#4d444c]">None yet.</p>}
          {stats.recentInquiries.map((item) => (
            <p key={item.id} className="m-0 border-t border-[#f0e8ef] py-2 text-sm text-[#1e1a20]">{item.name} · {item.topic} · <span className="text-[#4d444c]">{item.status}</span></p>
          ))}
        </div>
        <div className="rounded-2xl border border-[#e9e0e8] bg-white p-5">
          <h3 className={`${serif} m-0 mb-3 text-[22px] text-[#0f0014]`}>Latest bookings</h3>
          {stats.recentBookings.length === 0 && <p className="m-0 text-[#4d444c]">None yet.</p>}
          {stats.recentBookings.map((item) => (
            <p key={item.id} className="m-0 border-t border-[#f0e8ef] py-2 text-sm text-[#1e1a20]">{item.name} · {item.dateKey} {item.timeSlot} · <span className="text-[#4d444c]">{item.status}</span></p>
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
  const [tab, setTab] = useState('overview')
  const config = tables[tab]

  const signOut = () => {
    dispatch(logout())
    navigate('/', { replace: true })
  }

  return (
    <main className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 pb-24 pt-[clamp(40px,6vw,72px)]">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Eyebrow>Administration</Eyebrow>
          <h1 className={`${serif} m-0 text-[clamp(34px,4.5vw,46px)] font-medium text-[#0f0014]`}>Admin dashboard</h1>
          <p className="m-0 text-sm text-[#4d444c]">Signed in as {user?.email}</p>
        </div>
        <div className="flex gap-3">
          <Link to="/dashboard" className="rounded-full border border-[#0f0014] px-5 py-3 text-sm text-[#0f0014] no-underline">Customer view</Link>
          <button type="button" onClick={signOut} className="rounded-full bg-[#0f0014] px-5 py-3 text-sm text-white">Log out</button>
        </div>
      </header>

      <nav aria-label="Admin sections" className="flex flex-wrap gap-2">
        {tabs.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setTab(item.key)}
            aria-current={tab === item.key ? 'page' : undefined}
            className={`rounded-full px-4 py-2 text-sm ${tab === item.key ? 'bg-[#0f0014] text-white' : 'bg-[#f4ebf4] text-[#0f0014]'}`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {tab === 'overview' ? (
        <Overview />
      ) : (
        <AdminTable key={tab} resource={tab} {...config} />
      )}
    </main>
  )
}
