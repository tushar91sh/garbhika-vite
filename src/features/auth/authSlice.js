import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get, post, TOKEN_KEY } from '../../api/client.js'

const USER_KEY = 'garbhika_user'

function loadStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || 'null')
  } catch {
    return null
  }
}

function saveSession(data) {
  try {
    localStorage.setItem(TOKEN_KEY, data.token)
    localStorage.setItem(USER_KEY, JSON.stringify(data.user))
  } catch {
    // Storage can be blocked (private mode); the session still works until the page reloads.
  }
  return data.user
}

function clearSession() {
  try {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  } catch {
    // Nothing to clear if storage is unavailable.
  }
}

const failWith = (rejectWithValue) => (error) => rejectWithValue(error.message)

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    return saveSession(await post('/auth/login', { email, password }))
  } catch (error) {
    return failWith(rejectWithValue)(error)
  }
})

export const signupUser = createAsyncThunk('auth/signupUser', async ({ name, email, password }, { rejectWithValue }) => {
  try {
    return saveSession(await post('/auth/register', { name, email, password }))
  } catch (error) {
    return failWith(rejectWithValue)(error)
  }
})

// Refreshes the stored user so a role change by an admin takes effect without logging in again.
export const fetchMe = createAsyncThunk('auth/fetchMe', async (_arg, { rejectWithValue }) => {
  try {
    const { user } = await get('/auth/me')
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    } catch {
      // Ignore storage errors; the in-memory user is still updated.
    }
    return user
  } catch (error) {
    return failWith(rejectWithValue)(error)
  }
})

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async ({ email }, { rejectWithValue }) => {
  try {
    return (await post('/auth/forgot-password', { email })).message
  } catch (error) {
    return failWith(rejectWithValue)(error)
  }
})

export const resetPassword = createAsyncThunk('auth/resetPassword', async ({ token, password }, { rejectWithValue }) => {
  try {
    return (await post('/auth/reset-password', { token, password })).message
  } catch (error) {
    return failWith(rejectWithValue)(error)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: loadStoredUser(),
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.status = 'idle'
      state.error = null
      clearSession()
    },
  },
  extraReducers: (builder) => {
    const pending = (state) => {
      state.status = 'loading'
      state.error = null
    }
    const failed = (state, action) => {
      state.status = 'failed'
      state.error = action.payload || action.error.message
    }
    builder
      .addCase(loginUser.pending, pending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(loginUser.rejected, failed)
      .addCase(signupUser.pending, pending)
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(signupUser.rejected, failed)
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(fetchMe.rejected, (state) => {
        // The token is no longer valid (deleted account, expired session): sign the user out.
        state.user = null
        clearSession()
      })
      .addCase(forgotPassword.pending, pending)
      .addCase(forgotPassword.fulfilled, (state) => {
        state.status = 'idle'
      })
      .addCase(forgotPassword.rejected, failed)
      .addCase(resetPassword.pending, pending)
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = 'idle'
      })
      .addCase(resetPassword.rejected, failed)
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
