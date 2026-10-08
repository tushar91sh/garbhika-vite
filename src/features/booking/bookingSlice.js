import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { post } from '../../api/client.js'

// Functional-shell booking flow: no real backend yet, but the thunk mimics
// one (async delay + occasional structure for future API wiring) so the
// slice can be swapped for a real Express/Spring Boot endpoint later.
export const submitBooking = createAsyncThunk('booking/submitBooking', async (bookingPayload, { rejectWithValue }) => {
  try { return await post('/bookings', bookingPayload) } catch (error) { return rejectWithValue(error.message) }
})

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    isModalOpen: false,
    activeExpert: null,
    status: 'idle',
    history: [],
    error: null,
  },
  reducers: {
    openBookingModal: (state, action) => {
      state.isModalOpen = true
      state.activeExpert = action.payload
      state.status = 'idle'
      state.error = null
    },
    closeBookingModal: (state) => {
      state.isModalOpen = false
      state.activeExpert = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitBooking.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(submitBooking.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.history.push(action.payload)
      })
      .addCase(submitBooking.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || action.error.message
      })
  },
})

export const { openBookingModal, closeBookingModal } = bookingSlice.actions
export default bookingSlice.reducer
