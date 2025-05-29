import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay, addDays } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { FaPlusCircle, FaCalendarAlt, FaListUl, FaFilter } from 'react-icons/fa'

function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [view, setView] = useState('calendar')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date())
  
  const locales = {
    'en-US': require('date-fns/locale/en-US')
  }
  
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })
  
  useEffect(() => {
    // Simulate API fetch with mock data
    const fetchAppointments = async () => {
      try {
        // In a real app this would be an API call:
        // const response = await axios.get(`${API_URL}/api/appointments`)
        
        // Mock data
        const mockAppointments = [
          { 
            id: '1', 
            title: 'Emma Johnson - Follow-up', 
            start: addDays(new Date(), -1).setHours(10, 30), 
            end: addDays(new Date(), -1).setHours(11, 0),
            patientId: '1',
            patientName: 'Emma Johnson',
            type: 'Follow-up',
            status: 'completed'
          },
          { 
            id: '2', 
            title: 'Michael Davis - Consultation', 
            start: new Date().setHours(11, 45), 
            end: new Date().setHours(12, 15),
            patientId: '5',
            patientName: 'Michael Davis',
            type: 'Consultation',
            status: 'scheduled'
          },
          { 
            id: '3', 
            title: 'Robert Smith - Emergency', 
            start: new Date().setHours(14, 0), 
            end: new Date().setHours(15, 0),
            patientId: '2',
            patientName: 'Robert Smith',
            type: 'Emergency',
            status: 'scheduled'
          },
          { 
            id: '4', 
            title: 'Sophia Garcia - Check-up', 
            start: addDays(new Date(), 1).setHours(9, 15), 
            end: addDays(new Date(), 1).setHours(10, 0),
            patientId: '8',
            patientName: 'Sophia Garcia',
            type: 'Check-up',
            status: 'scheduled'
          },
          { 
            id: '5', 
            title: 'William Davis - Follow-up', 
            start: addDays(new Date(), 2).setHours(13, 30), 
            end: addDays(new Date(), 2).setHours(14, 0),
            patientId: '6',
            patientName: 'William Davis',
            type: 'Follow-up',
            status: 'scheduled'
          },
          { 
            id: '6', 
            title: 'Olivia Williams - Consultation', 
            start: addDays(new Date(), 2).setHours(15, 45), 
            end: addDays(new Date(), 2).setHours(16, 30),
            patientId: '3',
            patientName: 'Olivia Williams',
            type: 'Consultation',
            status: 'scheduled'
          },
          { 
            id: '7', 
            title: 'Isabella Wilson - Check-up', 
            start: addDays(new Date(), 3).setHours(10, 0), 
            end: addDays(new Date(), 3).setHours(10, 45),
            patientId: '7',
            patientName: 'Isabella Wilson',
            type: 'Check-up',
            status: 'scheduled'
          }
        ]
        
        setAppointments(mockAppointments)
      } catch (error) {
        console.error('Error fetching appointments:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    setTimeout(fetchAppointments, 800) // Simulate API delay
  }, [])
  
  // Calendar event styling
  const eventStyleGetter = (event) => {
    let backgroundColor, borderColor
    
    switch(event.type.toLowerCase()) {
      case 'follow-up':
        backgroundColor = '#0891B2' // primary-500
        borderColor = '#0891B2'
        break
      case 'check-up':
        backgroundColor = '#22C55E' // accent-500
        borderColor = '#22C55E'
        break
      case 'emergency':
        backgroundColor = '#EF4444' // error-500
        borderColor = '#EF4444'
        break
      case 'consultation':
        backgroundColor = '#14B8A6' // secondary-500
        borderColor = '#14B8A6'
        break
      default:
        backgroundColor = '#64748B' // neutral-500
        borderColor = '#64748B'
    }
    
    const style = {
      backgroundColor,
      borderColor,
      color: '#FFFFFF',
      borderRadius: '4px',
      opacity: 1,
      display: 'block'
    }
    
    return { style }
  }
  
  // Filter appointments for list view based on selected date
  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.start)
    return (
      appointmentDate.getDate() === selectedDate.getDate() &&
      appointmentDate.getMonth() === selectedDate.getMonth() &&
      appointmentDate.getFullYear() === selectedDate.getFullYear()
    )
  })
  
  // Sort appointments by time
  filteredAppointments.sort((a, b) => new Date(a.start) - new Date(b.start))
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Appointments</h1>
          <p className="text-neutral-600">Manage your appointment schedule</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <button 
            onClick={() => setView('calendar')}
            className={`btn ${view === 'calendar' ? 'btn-primary' : 'btn-outline'} flex items-center text-sm`}
          >
            <FaCalendarAlt className="mr-2" />
            Calendar
          </button>
          <button 
            onClick={() => setView('list')}
            className={`btn ${view === 'list' ? 'btn-primary' : 'btn-outline'} flex items-center text-sm`}
          >
            <FaListUl className="mr-2" />
            List
          </button>
          <Link to="/appointments/new" className="btn btn-primary flex items-center">
            <FaPlusCircle className="mr-2" />
            New
          </Link>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-96 bg-white rounded-lg shadow-card">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-card overflow-hidden p-4 sm:p-6">
          {view === 'calendar' && (
            <div className="h-[600px]">
              <Calendar
                localizer={localizer}
                events={appointments}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                onSelectSlot={(slotInfo) => {
                  // Handle slot selection, e.g. open new appointment modal
                  console.log('Selected slot:', slotInfo)
                }}
                onSelectEvent={(event) => {
                  // Navigate to appointment details
                  window.location.href = `/appointments/${event.id}`
                }}
                selectable
                eventPropGetter={eventStyleGetter}
                onNavigate={date => setSelectedDate(date)}
                views={['month', 'week', 'day']}
                defaultView="week"
              />
            </div>
          )}
          
          {view === 'list' && (
            <div>
              <div className="flex flex-wrap items-center justify-between mb-4">
                <div className="flex items-center space-x-2 mb-4 sm:mb-0">
                  <button 
                    onClick={() => setSelectedDate(addDays(selectedDate, -1))}
                    className="btn btn-outline py-1 px-2"
                  >
                    &larr;
                  </button>
                  <h3 className="text-lg font-medium">
                    {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  </h3>
                  <button 
                    onClick={() => setSelectedDate(addDays(selectedDate, 1))}
                    className="btn btn-outline py-1 px-2"
                  >
                    &rarr;
                  </button>
                  <button 
                    onClick={() => setSelectedDate(new Date())}
                    className="btn btn-outline py-1 px-2 text-sm ml-2"
                  >
                    Today
                  </button>
                </div>
                <div className="flex items-center">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaFilter className="h-4 w-4 text-neutral-400" />
                    </div>
                    <select
                      className="form-input pl-10 py-1.5 text-sm pr-10"
                      defaultValue="all"
                    >
                      <option value="all">All Types</option>
                      <option value="follow-up">Follow-up</option>
                      <option value="check-up">Check-up</option>
                      <option value="emergency">Emergency</option>
                      <option value="consultation">Consultation</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {filteredAppointments.length === 0 ? (
                <div className="py-16 text-center border border-dashed border-neutral-300 rounded-lg">
                  <p className="text-neutral-500">No appointments scheduled for this day</p>
                  <button className="mt-2 btn btn-outline py-1 px-3 text-sm">
                    + Add Appointment
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredAppointments.map(appointment => (
                    <Link 
                      key={appointment.id} 
                      to={`/appointments/${appointment.id}`}
                      className="block border border-neutral-200 rounded-lg p-4 hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <div className="flex items-start mb-2 sm:mb-0">
                          <div className={`h-10 w-1 rounded mr-3 ${
                            appointment.type === 'Follow-up' ? 'bg-primary-500' : 
                            appointment.type === 'Check-up' ? 'bg-accent-500' : 
                            appointment.type === 'Emergency' ? 'bg-error-500' : 
                            'bg-secondary-500'
                          }`}></div>
                          <div>
                            <p className="font-medium text-neutral-800">{appointment.patientName}</p>
                            <div className="flex items-center mt-1">
                              <span className="text-sm mr-2">{appointment.type}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                appointment.status === 'scheduled' ? 'bg-primary-100 text-primary-800' : 
                                appointment.status === 'completed' ? 'bg-accent-100 text-accent-800' : 
                                appointment.status === 'cancelled' ? 'bg-neutral-100 text-neutral-800' : 
                                'bg-warning-100 text-warning-800'
                              }`}>
                                {appointment.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-neutral-500">
                          {format(new Date(appointment.start), 'h:mm a')} - {format(new Date(appointment.end), 'h:mm a')}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Appointments