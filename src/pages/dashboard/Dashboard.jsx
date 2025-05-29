import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaUserInjured, FaCalendarCheck, FaChartLine, 
  FaExclamationTriangle, FaUserPlus, FaPlusCircle, 
  FaCalendarPlus, FaStethoscope
} from 'react-icons/fa'

// Components
import StatCard from '../../components/dashboard/StatCard'
import AppointmentList from '../../components/appointments/AppointmentList'
import PatientList from '../../components/patients/PatientList'

function Dashboard() {
  // Mock data - in a real app, this would come from API calls
  const [stats, setStats] = useState({
    totalPatients: 0,
    activePatients: 0,
    appointmentsToday: 0,
    criticalPatients: 0
  })
  
  const [recentPatients, setRecentPatients] = useState([])
  const [upcomingAppointments, setUpcomingAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call with setTimeout
    const timer = setTimeout(() => {
      setStats({
        totalPatients: 384,
        activePatients: 142,
        appointmentsToday: 8,
        criticalPatients: 3
      })
      
      setRecentPatients([
        { id: '1', name: 'Emma Johnson', age: 45, status: 'active', lastVisit: '2025-05-10' },
        { id: '2', name: 'Robert Smith', age: 62, status: 'critical', lastVisit: '2025-05-12' },
        { id: '3', name: 'Olivia Williams', age: 28, status: 'active', lastVisit: '2025-05-13' },
        { id: '4', name: 'James Brown', age: 53, status: 'recovered', lastVisit: '2025-05-08' },
      ])
      
      setUpcomingAppointments([
        { id: '1', patientName: 'Emma Johnson', date: '2025-05-15T10:30:00', type: 'Follow-up', status: 'scheduled' },
        { id: '2', patientName: 'Michael Davis', date: '2025-05-15T11:45:00', type: 'Consultation', status: 'scheduled' },
        { id: '3', patientName: 'Robert Smith', date: '2025-05-15T14:00:00', type: 'Emergency', status: 'scheduled' },
        { id: '4', patientName: 'Sophia Garcia', date: '2025-05-16T09:15:00', type: 'Check-up', status: 'scheduled' },
      ])
      
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Dashboard</h1>
        <p className="text-neutral-600">Welcome back to your medical dashboard</p>
      </div>
      
      {/* Quick action buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link to="/patients/new" className="flex items-center p-4 bg-white rounded-lg shadow-subtle hover:shadow-card transition-shadow border border-neutral-200">
          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
            <FaUserPlus className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-medium">New Patient</h3>
            <p className="text-sm text-neutral-500">Register patient</p>
          </div>
        </Link>
        
        <Link to="/appointments" className="flex items-center p-4 bg-white rounded-lg shadow-subtle hover:shadow-card transition-shadow border border-neutral-200">
          <div className="h-10 w-10 rounded-full bg-secondary-100 flex items-center justify-center mr-3">
            <FaCalendarPlus className="h-5 w-5 text-secondary-600" />
          </div>
          <div>
            <h3 className="font-medium">New Appointment</h3>
            <p className="text-sm text-neutral-500">Schedule a visit</p>
          </div>
        </Link>
        
        <Link to="/diagnostic-tools/symptom-analyzer" className="flex items-center p-4 bg-white rounded-lg shadow-subtle hover:shadow-card transition-shadow border border-neutral-200">
          <div className="h-10 w-10 rounded-full bg-accent-100 flex items-center justify-center mr-3">
            <FaStethoscope className="h-5 w-5 text-accent-600" />
          </div>
          <div>
            <h3 className="font-medium">Symptom Analysis</h3>
            <p className="text-sm text-neutral-500">AI diagnostics</p>
          </div>
        </Link>
        
        <Link to="/patients" className="flex items-center p-4 bg-white rounded-lg shadow-subtle hover:shadow-card transition-shadow border border-neutral-200">
          <div className="h-10 w-10 rounded-full bg-warning-100 flex items-center justify-center mr-3">
            <FaExclamationTriangle className="h-5 w-5 text-warning-600" />
          </div>
          <div>
            <h3 className="font-medium">Critical Patients</h3>
            <p className="text-sm text-neutral-500">View alerts</p>
          </div>
        </Link>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Patients" 
          value={stats.totalPatients} 
          icon={<FaUserInjured className="h-5 w-5 text-primary-600" />} 
          color="primary"
        />
        <StatCard 
          title="Active Patients" 
          value={stats.activePatients} 
          icon={<FaPlusCircle className="h-5 w-5 text-secondary-600" />} 
          color="secondary"
        />
        <StatCard 
          title="Appointments Today" 
          value={stats.appointmentsToday} 
          icon={<FaCalendarCheck className="h-5 w-5 text-accent-600" />} 
          color="accent"
        />
        <StatCard 
          title="Critical Patients" 
          value={stats.criticalPatients} 
          icon={<FaExclamationTriangle className="h-5 w-5 text-error-600" />} 
          color="error"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming appointments */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Today's Appointments</h2>
            <Link to="/appointments" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              View all
            </Link>
          </div>
          <AppointmentList appointments={upcomingAppointments} />
        </div>
        
        {/* Recent patients */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Patients</h2>
            <Link to="/patients" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              View all
            </Link>
          </div>
          <PatientList patients={recentPatients} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard