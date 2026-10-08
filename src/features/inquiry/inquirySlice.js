import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { post } from '../../api/client.js'

// Shared thunk for both the Contact page inquiry form and any future
// chat/inquiry widgets — mirrors the "Inquiry/chat system" feature area
// from the wider Aviation-style product architecture (one slice per
// service), just applied to Garbhika's contact flow.
export const submitInquiry = createAsyncThunk('inquiry/submitInquiry', async (formPayload, { rejectWithValue }) => {
  try { return await post('/inquiries', formPayload) } catch (error) { return rejectWithValue(error.message) }
})

const inquirySlice = createSlice({
  name: 'inquiry',
  initialState: {
    status: 'idle',
    lastSubmission: null,
    error: null,
  },
  reducers: {
    resetInquiryStatus: (state) => {
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitInquiry.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(submitInquiry.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.lastSubmission = action.payload
      })
      .addCase(submitInquiry.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || action.error.message
      })
  },
})

export const { resetInquiryStatus } = inquirySlice.actions
export default inquirySlice.reducer
