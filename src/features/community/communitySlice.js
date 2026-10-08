import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, post } from '../../api/client.js'

export const fetchCommunityData = createAsyncThunk('community/fetchCommunityData', async (_, { rejectWithValue }) => {
  try { return await api('/community') } catch (error) { return rejectWithValue(error.message) }
})

export const joinCommunity = createAsyncThunk('community/joinCommunity', async (email, { rejectWithValue }) => {
  try { return await post('/community/join', { email }) } catch (error) { return rejectWithValue(error.message) }
})

const communitySlice = createSlice({
  name: 'community',
  initialState: {
    voices: [],
    groups: [],
    testimonials: [],
    status: 'idle',
    joinStatus: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunityData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCommunityData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.voices = action.payload.voices
        state.groups = action.payload.groups
        state.testimonials = action.payload.testimonials
      })
      .addCase(fetchCommunityData.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(joinCommunity.pending, (state) => {
        state.joinStatus = 'loading'
      })
      .addCase(joinCommunity.fulfilled, (state) => {
        state.joinStatus = 'succeeded'
      })
      .addCase(joinCommunity.rejected, (state) => {
        state.joinStatus = 'failed'
      })
  },
})

export default communitySlice.reducer
