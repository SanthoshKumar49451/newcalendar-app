import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const res = await axios.get(`${BASE_URL}/events`)
  return res.data.data
})

export const addEvent = createAsyncThunk('events/addEvent', async (eventData) => {
  const res = await axios.post(`${BASE_URL}/events`, eventData)
  return res.data.data
})

export const deleteEvent = createAsyncThunk('events/deleteEvent', async () => {
  const res = await axios.delete(`${BASE_URL}/eventsdelete`)
  return res.data.data
})

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.data.push(action.payload)
      })
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default eventSlice.reducer


