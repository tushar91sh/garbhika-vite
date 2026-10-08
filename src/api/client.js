const API_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

export async function api(path, options = {}) {
  const token = localStorage.getItem('garbhika_token')
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || 'Request failed. Please try again.')
  return data
}

export function post(path, body) {
  return api(path, { method: 'POST', body: JSON.stringify(body) })
}
