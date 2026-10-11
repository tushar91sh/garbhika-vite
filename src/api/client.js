const API_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')
export const TOKEN_KEY = 'garbhika_token'

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

function authHeader() {
  try {
    const token = localStorage.getItem(TOKEN_KEY)
    return token ? { Authorization: `Bearer ${token}` } : {}
  } catch {
    return {}
  }
}

// One place for every API call. A 401 on a signed-in session tells the app the session has ended.
export async function api(path, options = {}) {
  const { body, headers, ...rest } = options
  const response = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: { ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}), ...authHeader(), ...headers },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    if (response.status === 401 && authHeader().Authorization) window.dispatchEvent(new Event('garbhika:session-expired'))
    throw new ApiError(data.message || 'Request failed. Please try again.', response.status)
  }
  return data
}

export const get = (path) => api(path)
export const post = (path, body) => api(path, { method: 'POST', body })
export const patch = (path, body) => api(path, { method: 'PATCH', body })

// Downloads a protected file (CSV) with the admin token attached.
export async function download(path, filename) {
  const response = await fetch(`${API_URL}${path}`, { headers: authHeader() })
  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new ApiError(data.message || 'Download failed.', response.status)
  }
  const url = URL.createObjectURL(await response.blob())
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
