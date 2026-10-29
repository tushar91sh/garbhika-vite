import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get, post, setSessionToken } from '../../api/client.js'
const USER_KEY = 'garbhika_user'
function stored() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || 'null')
  } catch {
    return null
  }
}
function save(data) {
  if (data.token) {
    setSessionToken(data.token)
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(data.user))
    } catch {}
  }
  return data
}
function clear() {
  setSessionToken(null)
  try {
    localStorage.removeItem(USER_KEY)
  } catch {}
}
const authRequest = (name, path) =>
  createAsyncThunk(name, async (body, { rejectWithValue }) => {
    try {
      return save(await post(path, body))
    } catch (e) {
      return rejectWithValue({ message: e.message, status: e.status })
    }
  })
export const loginUser = authRequest('auth/login', '/auth/login')
export const loginAdmin = authRequest('auth/admin', '/auth/admin/login')
export const signupUser = authRequest('auth/signup', '/auth/register')
export const bypassEmail = authRequest(
  'auth/devBypass',
  '/auth/verification/development-bypass',
)
export const verifyEmail = authRequest(
  'auth/verify',
  '/auth/verification/confirm',
)
export const fetchMe = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue }) => {
    try {
      const data = await get('/auth/me')
      try {
        localStorage.setItem(USER_KEY, JSON.stringify(data.user))
      } catch {}
      return data.user
    } catch (e) {
      return rejectWithValue({ message: e.message, status: e.status })
    }
  },
)
export const signOut = createAsyncThunk('auth/signOut', async () => {
  try {
    await post('/auth/logout', {})
  } catch {}
  clear()
})
export const forgotPassword = createAsyncThunk(
  'auth/forgot',
  async (body, { rejectWithValue }) => {
    try {
      return (await post('/auth/forgot-password', body)).message
    } catch (e) {
      return rejectWithValue(e.message)
    }
  },
)
export const resetPassword = createAsyncThunk(
  'auth/reset',
  async (body, { rejectWithValue }) => {
    try {
      return (await post('/auth/reset-password', body)).message
    } catch (e) {
      return rejectWithValue(e.message)
    }
  },
)
// Background refresh must not set checked=false: that unmounts the dashboard
// and discards unsaved form input whenever an administrator changes a status.
export const syncSession = createAsyncThunk('auth/syncSession', async (_, { rejectWithValue }) => {
  try {
    const data = await get('/auth/me')
    try { localStorage.setItem(USER_KEY, JSON.stringify(data.user)) } catch {}
    return data.user
  } catch (e) { return rejectWithValue({ message: e.message, status: e.status }) }
}, { condition: (_, { getState }) => !!getState().auth.user && !getState().auth.syncing })
const initialUser = stored()
const slice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUser,
    checked: !initialUser,
    syncing: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null
      state.checked = true
      state.status = 'idle'
      clear()
    },
  },
  extraReducers(builder) {
    for (const thunk of [
      loginUser,
      loginAdmin,
      signupUser,
      verifyEmail,
      bypassEmail,
    ])
      builder
        .addCase(thunk.pending, (state) => {
          state.status = 'loading'
          state.error = null
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state.status = 'idle'
          if (action.payload.user) {
            state.user = action.payload.user
            state.checked = true
          }
        })
        .addCase(thunk.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.payload?.message || action.error.message
        })
    builder
      .addCase(fetchMe.pending, (state) => {
        state.checked = false
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload
        state.checked = true
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.checked = true
        if (action.payload?.status === 401) {
          state.user = null
          clear()
        } else {
          state.error =
            'Cannot verify your session. Check your connection and retry.'
          state.checked = false
        }
      })
    builder
      .addCase(syncSession.pending, state => { state.syncing = true })
      .addCase(syncSession.fulfilled, (state, action) => {
        state.syncing = false
        if (state.user) state.user = action.payload
      })
      .addCase(syncSession.rejected, (state, action) => {
        state.syncing = false
        if (action.payload?.status === 401) { state.user = null; clear() }
      })
    builder.addCase(signOut.fulfilled, (state) => {
      state.user = null
      state.checked = true
      state.status = 'idle'
    })
    for (const thunk of [forgotPassword, resetPassword])
      builder
        .addCase(thunk.pending, (state) => {
          state.status = 'loading'
        })
        .addCase(thunk.fulfilled, (state) => {
          state.status = 'idle'
        })
        .addCase(thunk.rejected, (state) => {
          state.status = 'failed'
        })
  },
})
export const { logout } = slice.actions
export default slice.reducer
