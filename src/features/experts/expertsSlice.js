import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../../api/client.js'

// Loads the expert catalogue from the Garbhika API while retaining the
// existing skeleton-loading UI.
export const fetchExperts = createAsyncThunk('experts/fetchExperts', async (_, { rejectWithValue }) => {
  try { return (await api('/experts')).experts } catch (error) { return rejectWithValue(error.message) }
})

const expertsSlice = createSlice({
  name: 'experts',
  initialState: {
    items: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchExperts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchExperts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || action.error.message
      })
  },
})

export default expertsSlice.reducer
