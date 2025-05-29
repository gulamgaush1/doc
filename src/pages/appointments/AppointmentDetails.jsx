import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { format } from 'date-fns'

function AppointmentDetails() {
  const { id } = useParams()
  const [appointment, setAppointment] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch with mock data
    const fetchAppointment = async () => {
      try {
        // In a real app this would be an API call:
        // const response = await axios.get(`${API_URL}/api/appointments/${id}`)
        
        // Mock data
        const mockAppointment = {
          id,
          patientName: 'Emma Johnson',
          patientId: '1',
          type: 'Follow-up',
          status: 'scheduled',
          start: new Date().setHours(10, 30),
          end: new Date().setHours(11, 0),
          notes: 'Regular follow-up appointment for medication review',
          symptoms: 'None reported',
          vitals: {
            bloodPressure: '120/80',
            heartRate: '72',
            temperature: '98.6'
          }
        }
        
        setAppointment(mockAppointment)
      } catch (error) {
        console.error('Error fetching appointment:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    setTimeout(fetchAppointment, 800) // Simulate API delay
  }, [id])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!appointment) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">Appointment Not Found</h2>
        <p className="text-neutral-600 mb-4">The appointment you're looking for doesn't exist.</p>
        <Link to="/appointments" className="btn btn-primary">
          Back to Appointments
        </Link>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Appointment Details</h1>
          <p className="text-neutral-600">View and manage appointment information</p>
        </div>
        <div className="mt-4 sm:mt-0 space-x-2">
          <Link to="/appointments" className="btn btn-outline">
            Back
          </Link>
          <button className="btn btn-primary">
            Edit
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-neutral-500">Patient Name</label>
                <p className="mt-1">{appointment.patientName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-500">Appointment Type</label>
                <p className="mt-1">{appointment.type}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-500">Status</label>
                <span className={`inline-block mt-1 px-2 py-1 text-sm rounded-full ${
                  appointment.status === 'scheduled' ? 'bg-primary-100 text-primary-800' : 
                  appointment.status === 'completed' ? 'bg-accent-100 text-accent-800' : 
                  appointment.status === 'cancelled' ? 'bg-neutral-100 text-neutral-800' : 
                  'bg-warning-100 text-warning-800'
                }`}>
                  {appointment.status}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-500">Date & Time</label>
                <p className="mt-1">
                  {format(new Date(appointment.start), 'MMMM d, yyyy')}
                  <br />
                  {format(new Date(appointment.start), 'h:mm a')} - {format(new Date(appointment.end), 'h:mm a')}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Medical Information</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-neutral-500">Symptoms</label>
                <p className="mt-1">{appointment.symptoms}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-500">Vitals</label>
                <div className="mt-1 space-y-1">
                  <p>Blood Pressure: {appointment.vitals.bloodPressure}</p>
                  <p>Heart Rate: {appointment.vitals.heartRate} bpm</p>
                  <p>Temperature: {appointment.vitals.temperature}°F</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-500">Notes</label>
                <p className="mt-1">{appointment.notes}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentDetails