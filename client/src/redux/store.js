import { configureStore } from '@reduxjs/toolkit'
import goalReducer from './goalSlice.js'
import taskReducer from './taskSlice.js'
import eventReducer from './eventSlice.js'

const store = configureStore({
  reducer: {
    goals: goalReducer,
    tasks: taskReducer,
    events: eventReducer,
  },
})

export default store
