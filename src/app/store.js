import { configureStore } from '@reduxjs/toolkit'
import expertsReducer from '../features/experts/expertsSlice.js'
import bookingReducer from '../features/booking/bookingSlice.js'
import inquiryReducer from '../features/inquiry/inquirySlice.js'
import authReducer from '../features/auth/authSlice.js'
import communityReducer from '../features/community/communitySlice.js'
import newsletterReducer from '../features/newsletter/newsletterSlice.js'

export const store = configureStore({
  reducer: {
    experts: expertsReducer,
    booking: bookingReducer,
    inquiry: inquiryReducer,
    auth: authReducer,
    community: communityReducer,
    newsletter: newsletterReducer,
  },
})
