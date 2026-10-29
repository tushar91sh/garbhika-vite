import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { syncSession } from '../features/auth/authSlice.js'
import { Card, Status, useData } from './ui.jsx'

export function ExpertBookingSetup({ logic }) {
  const resource = useData('/expert/profile/booking-readiness', 15000)
  const dispatch = useDispatch()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  async function refresh() {
    setBusy(true)
    setError('')
    try { await dispatch(syncSession()).unwrap(); resource.reload() }
    catch (e) { setError(e.message || 'Could not refresh your status. Please retry.') }
    finally { setBusy(false) }
  }
  function open(action) {
    if (action === 'refresh') { refresh(); return }
    if (action === 'services') {
      logic.setState({ _overlay: { kind: 'expertprofile', item: {} } })
      return
    }
    logic.go(action)
  }
  return <div className="care-root"><Card title="Approval & customer bookings">
    <Status resource={resource}>{data => <>
      <p role="status"><strong>{data.approved ? 'Your expert application is approved.' : 'Application status: ' + data.status.replaceAll('_', ' ')}</strong></p>
      <p>{data.listed
        ? 'Your profile is visible to customers. Customers can select your service, date and available time, then pay or use a membership credit. Available times depend on your calendar and existing bookings.'
        : data.approved
          ? 'Complete the remaining setup below to appear in the customer booking list.'
          : 'Complete your documents and submit the application. Services and booking tools unlock after admin approval.'}</p>
      <ol style={{ paddingLeft: 24, display: 'grid', gap: 12 }}>
        {data.checks.map(check => <li key={check.key}>
          <span>{check.done ? '✓ ' : '○ '}{check.label} — {check.done ? 'Complete' : 'Required'}</span>
          {!check.done && (data.approved || ['approval', 'credentials', 'account'].includes(check.key)) && <button
            type="button" style={{ marginLeft: 12 }} disabled={busy}
            onClick={() => open(check.action)}>{check.action === 'refresh' ? 'Refresh status' : check.action === 'calendar' ? 'Set availability' : check.action === 'services' ? 'Manage services & bookings' : 'Open verification'}</button>}
        </li>)}
      </ol>
      {data.approved && <p>Set your session title, service type, duration (15–120 minutes) and price (₹500–₹3,000). Add working days and times in IST, then enable instant bookings or time requests.</p>}
      {data.approved && <div className="care-actions">
        <button type="button" onClick={() => open('services')}>Manage services & bookings</button>
        <button type="button" onClick={() => open('calendar')}>Set availability</button>
        <Link to="/experts/">View customer expert directory</Link>
      </div>}
      <p>For a time request, review it under Requests and accept an available time or propose alternatives. Confirmed sessions appear in both dashboards.</p>
    </>}</Status>
    <button type="button" disabled={busy} onClick={refresh}>{busy ? 'Refreshing…' : 'Refresh approval & booking status'}</button>
    <p style={{ fontSize: 12 }}>Status updates automatically within about 15 seconds while this page is visible, and when you return to the browser tab.</p>
    {error && <p role="alert">{error}</p>}
  </Card></div>
}
