import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { download, get, patch } from '../../api/client.js'
import { fieldClass } from '../common/DesignKit.jsx'

export const formatDate = (value) => (value ? new Date(value).toLocaleString() : '—')

// Generic admin list: search, status filter, pagination, inline status/role changes and CSV export.
export default function AdminTable({ resource, columns, statusOptions, roleEditable = false, endpoint, exportable = true, searchable = true }) {
  const base = endpoint || `/admin/${resource}`
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')

  const query = useCallback(() => {
    const params = new URLSearchParams({ page: String(page), limit: '20' })
    if (search) params.set('q', search)
    if (status) params.set('status', status)
    return params.toString()
  }, [page, search, status])

  const load = useCallback(() => {
    setLoading(true)
    get(`${base}?${query()}`)
      .then((data) => {
        setRows(data.items)
        setPages(data.pages || 1)
        setTotal(data.total)
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false))
  }, [base, query])

  useEffect(() => {
    load()
  }, [load])

  const changeStatus = async (id, value) => {
    try {
      await patch(`/admin/${resource}/${id}/status`, { status: value })
      toast.success('Status updated.')
      load()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const changeRole = async (id, value) => {
    try {
      await patch(`/admin/users/${id}/role`, { role: value })
      toast.success('Role updated.')
      load()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const exportCsv = async () => {
    try {
      const params = new URLSearchParams()
      if (search) params.set('q', search)
      if (status) params.set('status', status)
      await download(`/admin/${resource}/export.csv?${params}`, `${resource}.csv`)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const applySearch = (e) => {
    e.preventDefault()
    setPage(1)
    setSearch(q.trim())
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        {searchable && (
          <form onSubmit={applySearch} className="flex flex-1 gap-2" role="search">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" aria-label="Search" className={`${fieldClass} !py-[10px] max-w-[320px]`} />
            <button type="submit" className="rounded-full bg-[#0f0014] px-5 text-sm text-white">Search</button>
          </form>
        )}
        {statusOptions && (
          <select
            aria-label="Filter by status"
            value={status}
            onChange={(e) => {
              setPage(1)
              setStatus(e.target.value)
            }}
            className={`${fieldClass} !w-auto !py-[10px]`}
          >
            <option value="">All statuses</option>
            {statusOptions.map((item) => (
              <option key={item} value={item}>{item.replace('_', ' ')}</option>
            ))}
          </select>
        )}
        {exportable && (
          <button type="button" onClick={exportCsv} className="rounded-full border border-[#0f0014] px-5 py-[10px] text-sm text-[#0f0014] hover:bg-[#efe5ee]">
            Export CSV
          </button>
        )}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#e9e0e8] bg-white">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead className="bg-[#faf1fa] text-[#4d444c]">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 font-semibold">{column.label}</th>
              ))}
              {(statusOptions || roleEditable) && <th className="px-4 py-3 font-semibold">Change</th>}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td className="px-4 py-6 text-[#4d444c]" colSpan={columns.length + 1}>Loading…</td></tr>
            )}
            {!loading && rows.length === 0 && (
              <tr><td className="px-4 py-6 text-[#4d444c]" colSpan={columns.length + 1}>No records found.</td></tr>
            )}
            {!loading && rows.map((row) => (
              <tr key={row.id} className="border-t border-[#f0e8ef] align-top">
                {columns.map((column) => (
                  <td key={column.key} className="max-w-[320px] px-4 py-3 text-[#1e1a20]">
                    {column.render ? column.render(row) : String(Array.isArray(row[column.key]) ? row[column.key].join(', ') : row[column.key] ?? '—')}
                  </td>
                ))}
                {statusOptions && (
                  <td className="px-4 py-3">
                    <select aria-label="Set status" value={row.status} onChange={(e) => changeStatus(row.id, e.target.value)} className={`${fieldClass} !w-auto !py-2 !text-sm`}>
                      {statusOptions.map((item) => (
                        <option key={item} value={item}>{item.replace('_', ' ')}</option>
                      ))}
                    </select>
                  </td>
                )}
                {roleEditable && (
                  <td className="px-4 py-3">
                    <select aria-label="Set role" value={row.role} onChange={(e) => changeRole(row.id, e.target.value)} className={`${fieldClass} !w-auto !py-2 !text-sm`}>
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-[#4d444c]">
        <span>{total} record{total === 1 ? '' : 's'}</span>
        <div className="flex items-center gap-3">
          <button type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="rounded-full border px-4 py-2 disabled:opacity-40">Previous</button>
          <span>Page {page} of {pages}</span>
          <button type="button" disabled={page >= pages} onClick={() => setPage((p) => p + 1)} className="rounded-full border px-4 py-2 disabled:opacity-40">Next</button>
        </div>
      </div>
    </div>
  )
}
