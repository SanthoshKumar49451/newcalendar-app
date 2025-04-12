const MyCalendar = () => {
    const dispatch = useDispatch()
    const events = useSelector((state) => state.events.data)
    const loading = useSelector((state) => state.events.loading)
  
    const [showModal, setShowModal] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  
    const [newEvent, setNewEvent] = useState({
      title: "",
      category: "exercise", // default category
      start: null,
      end: null,
      color: "#3b82f6",
    })
  
    useEffect(() => {
      dispatch(fetchEvents())
  
      const handleResize = () => setWindowWidth(window.innerWidth)
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }, [dispatch])
  
    const handleDateSelect = (selectInfo) => {
      setNewEvent({
        ...newEvent,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
      })
      setShowModal(true)
    }
  
    const handleInputChange = (e) => {
      const { name, value } = e.target
      setNewEvent((prev) => ({ ...prev, [name]: value }))
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      // Make sure we have a valid title and date
      if (!newEvent.title.trim() || !newEvent.start || !newEvent.end) return
  
      dispatch(addEvent(newEvent)).then(() => {
        setShowModal(false)
        dispatch(fetchEvents()) // refresh after add
      })
    }
  
    const getResponsiveView = () => {
      if (windowWidth < 640) return "listWeek"
      if (windowWidth < 768) return "timeGridDay"
      return "timeGridWeek"
    }
  
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg relative">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          initialView={getResponsiveView()}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          selectable
          events={events}
          select={handleDateSelect}
          height="auto"
          eventColor="#3b82f6"
          eventTextColor="#fff"
          eventBorderColor="#3b82f6"
          dayMaxEvents={3}
        />
  
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center rounded-lg">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
  
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
              <h2 className="text-lg font-bold mb-4 text-white">Add Event</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  placeholder="Event Title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded mb-4 bg-gray-700 text-white border-gray-600"
                />
                <select
                  name="category"
                  value={newEvent.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded mb-4 bg-gray-700 text-white border-gray-600"
                >
                  <option value="exercise">Exercise</option>
                  <option value="eating">Eating</option>
                  <option value="work">Work</option>
                  <option value="relax">Relax</option>
                  <option value="family">Family</option>
                  <option value="social">Social</option>
                </select>
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
    )
  }
  