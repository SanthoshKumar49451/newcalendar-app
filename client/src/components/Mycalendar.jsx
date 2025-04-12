import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, addEvent, deleteEvent } from '../redux/eventSlice';
import { toast } from 'react-toastify';

const MyCalendar = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.data);
  const loading = useSelector((state) => state.events.loading); // Loading state

  const [showModal, setShowModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [newEvent, setNewEvent] = useState({
    title: "",
    category: "exercise",
    start: null,
    end: null,
    color: "#3b82f6",
  });

  useEffect(() => {
    dispatch(fetchEvents());

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const handleDateSelect = (selectInfo) => {
    setNewEvent({
      ...newEvent,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newEvent.title.trim()) return;

    dispatch(addEvent(newEvent)).then(() => {
      setShowModal(false);
      toast.success("Event added successfully!"); // Success toast
      dispatch(fetchEvents()); // Refresh events to reflect new event
    }).catch(() => {
      toast.error("Failed to add event. Please try again."); // Error toast
    });
  };

  const getResponsiveView = () => {
    if (windowWidth < 640) return "listWeek";
    if (windowWidth < 768) return "timeGridDay";
    return "timeGridWeek";
  };

  // Function to delete expired events
  const handleDeleteExpiredEvents = async () => {
    dispatch(deleteEvent());
    toast.info("Expired events deleted."); // Info toast
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Calendar</h2>
        
        {/* Button to manually trigger the deletion of expired events */}
        <button
          onClick={handleDeleteExpiredEvents}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Delete Expired Events
        </button>
      </div>
      
      <div className="relative">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          initialView={getResponsiveView()}  // Initial view based on screen width
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          selectable
          editable
          events={events}
          select={handleDateSelect}
          height="auto"
          eventColor="#3b82f6"
          eventTextColor="#fff"
          eventBorderColor="#3b82f6"
          dayMaxEvents={3}
          windowResize={true} // Ensure FullCalendar listens to window resize
        />

        {/* Loader */}
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center rounded-lg">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
      </div>

      {/* Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 text-white">
            <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
            <form onSubmit={handleSubmit}>
              <input
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="w-full mb-3 border px-3 py-2 rounded bg-gray-700 border-gray-600"
              />
              <select
                name="category"
                value={newEvent.category}
                onChange={handleInputChange}
                className="w-full mb-3 border px-3 py-2 rounded bg-gray-700 border-gray-600"
              >
                <option value="exercise">Exercise</option>
                <option value="eating">Eating</option>
                <option value="work">Work</option>
                <option value="relax">Relax</option>
                <option value="family">Family</option>
                <option value="social">Social</option>
              </select>
              <input
                name="start"
                type="datetime-local"
                value={newEvent.start}
                onChange={handleInputChange}
                className="w-full mb-3 border px-3 py-2 rounded bg-gray-700 border-gray-600 text-white"
              />
              <input
                name="end"
                type="datetime-local"
                value={newEvent.end}
                onChange={handleInputChange}
                className="w-full mb-3 border px-3 py-2 rounded bg-gray-700 border-gray-600 text-white"
              />
              <input
                name="color"
                type="color"
                value={newEvent.color}
                onChange={handleInputChange}
                className="mb-4 w-20 h-10"
              />
              <div className="flex justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;











