import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const fetchGoals = createAsyncThunk('goals/fetchGoals', async () => {
  const res = await axios.get(`${BASE_URL}/goals`)
  return res.data.data
})

const goalSlice = createSlice({
  name: 'goals',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default goalSlice.reducer

