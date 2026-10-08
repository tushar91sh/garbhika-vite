import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { post } from '../../api/client.js'

export const subscribeNewsletter = createAsyncThunk('newsletter/subscribe', async (email, { rejectWithValue }) => {
  try { return await post('/newsletter/subscribe', { email }) } catch (error) { return rejectWithValue(error.message) }
})

const newsletterSlice = createSlice({
  name: 'newsletter',
  initialState: { status: 'idle' },
  reducers: {
    resetNewsletterStatus: (state) => {
      state.status = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(subscribeNewsletter.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(subscribeNewsletter.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(subscribeNewsletter.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const { resetNewsletterStatus } = newsletterSlice.actions
export default newsletterSlice.reducer
