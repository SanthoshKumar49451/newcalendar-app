import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (goalId) => {
  const res = await axios.get(`${BASE_URL}/tasks?goalId=${goalId}`)
  return res.data.data
})

export const addTask = createAsyncThunk('tasks/addTask', async ({ title, goalId }) => {
  const res = await axios.post(`${BASE_URL}/tasks`, { title, goalId })
  return res.data.data
})

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.data.push(action.payload)
      })
  },
})


export default taskSlice.reducer
