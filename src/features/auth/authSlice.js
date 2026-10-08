import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { post } from '../../api/client.js'

function loadStoredUser() {
  try { return JSON.parse(localStorage.getItem('garbhika_user') || 'null') }
  catch { return null }
}
export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const data = await post('/auth/login', { email, password })
    localStorage.setItem('garbhika_token', data.token)
    localStorage.setItem('garbhika_user', JSON.stringify(data.user))
    return data.user
  } catch (error) { return rejectWithValue(error.message) }
})

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const data = await post('/auth/register', { name, email, password })
      localStorage.setItem('garbhika_token', data.token)
      localStorage.setItem('garbhika_user', JSON.stringify(data.user))
      return data.user
    } catch (error) { return rejectWithValue(error.message) }
  }
)

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
      localStorage.removeItem('garbhika_token')
      localStorage.removeItem('garbhika_user')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || action.error.message
      })
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || action.error.message
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
