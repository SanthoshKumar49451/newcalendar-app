
import React from 'react'
import MyCalendar from './components/Mycalendar'
import Goal from './components/Goal'


const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-black p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Responsive layout: side-by-side on large screens, stacked on small */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Goal Component */}
          <div className="lg:w-1/2">
           <Goal/>
          </div>
          
          {/* Calendar Component */}
          <div className="lg:w-1/2 mt-6 lg:mt-0">
          <MyCalendar/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

