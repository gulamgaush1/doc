import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaEdit, FaPlusCircle, FaNotesMedical, FaCalendarPlus, FaFilePdf, FaHistory } from 'react-icons/fa'
import { format } from 'date-fns'

function PatientDetails() {
  const { id } = useParams()
  const [patient, setPatient] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Simulate API fetch
    const fetchPatient = async () => {
      try {
        // In a real app this would be an API call:
        // const response = await axios.get(`${API_URL}/api/patients/${id}`)
        // setPatient(response.data)
        
        // Mock data for this demo
        const mockPatient = {
          id,
          firstName: 'Robert',
          lastName: 'Smith',
          dateOfBirth: '1963-07-15',
          gender: 'male',
          email: 'robert.smith@example.com',
          phone: '(555) 123-4567',
          address: '123 Main Street',
          city: 'Springfield',
          state: 'IL',
          zip: '62704',
          emergencyContactName: 'Mary Smith',
          emergencyContactPhone: '(555) 987-6543',
          status: 'critical',
          bloodType: 'B+',
          allergies: 'Penicillin, Sulfa drugs',
          medicalConditions: 'Hypertension, Type 2 Diabetes',
          currentMedications: 'Lisinopril 10mg, Metformin 500mg',
          appointmentHistory: [
            { id: '101', date: '2025-05-12T10:30:00', type: 'Check-up', status: 'completed', notes: 'Blood pressure elevated, adjusted medication.' },
            { id: '95', date: '2025-04-28T14:15:00', type: 'Follow-up', status: 'completed', notes: 'Reviewed lab results. Glucose levels still high.' },
            { id: '82', date: '2025-04-02T09:00:00', type: 'Emergency', status: 'completed', notes: 'Patient experienced chest pain. ECG showed no acute changes.' },
            { id: '67', date: '2025-03-15T11:30:00', type: 'Consultation', status: 'completed', notes: 'Initial diagnosis of hypertension. Started on Lisinopril.' },
          ],
          medicalRecords: [
            { id: '1', date: '2025-05-12', type: 'Lab Result', title: 'Comprehensive Metabolic Panel', provider: 'City Lab' },
            { id: '2', date: '2025-05-12', type: 'Prescription', title: 'Lisinopril Renewal', provider: 'Dr. Williams' },
            { id: '3', date: '2025-04-28', type: 'Imaging', title: 'Chest X-Ray', provider: 'Central Imaging' },
            { id: '4', date: '2025-04-02', type: 'Referral', title: 'Cardiology Referral', provider: 'Dr. Johnson' },
          ],
          vitalHistory: [
            { date: '2025-05-12', bloodPressure: '145/90', heartRate: 88, temperature: 98.6, respiratoryRate: 16, weight: 92.5, height: 180 },
            { date: '2025-04-28', bloodPressure: '150/95', heartRate: 90, temperature: 98.8, respiratoryRate: 18, weight: 93.1, height: 180 },
            { date: '2025-04-02', bloodPressure: '160/100', heartRate: 96, temperature: 99.2, respiratoryRate: 20, weight: 94.2, height: 180 },
            { date: '2025-03-15', bloodPressure: '155/95', heartRate: 92, temperature: 98.7, respiratoryRate: 17, weight: 93.8, height: 180 },
          ]
        }
        
        setPatient(mockPatient)
      } catch (error) {
        console.error('Error fetching patient:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    setTimeout(() => fetchPatient(), 800) // Simulate network delay
  }, [id])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="bg-white rounded-lg shadow-card p-8 text-center">
        <h2 className="text-xl font-semibold text-neutral-800 mb-2">Patient Not Found</h2>
        <p className="text-neutral-600 mb-4">The requested patient record does not exist or you don't have permission to view it.</p>
        <Link to="/patients" className="btn btn-primary">
          Return to Patients
        </Link>
      </div>
    )
  }

  const age = new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()
  
  return (
    <div className="animate-fade-in">
      {/* Header with patient info and actions */}
      <div className="bg-white shadow-card rounded-lg mb-6 overflow-hidden">
        <div className="bg-primary-500 px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-16 w-16 rounded-full bg-white text-primary-500 flex items-center justify-center font-bold text-2xl">
                {`${patient.firstName[0]}${patient.lastName[0]}`}
              </div>
              <div className="ml-4 text-white">
                <h1 className="text-2xl font-bold mb-0">{patient.firstName} {patient.lastName}</h1>
                <div className="flex items-center space-x-4">
                  <p>{age} years • {patient.gender === 'male' ? 'Male' : 'Female'}</p>
                  <div className="flex items-center">
                    <span className={`inline-block h-2 w-2 rounded-full mr-2 ${
                      patient.status === 'active' ? 'bg-accent-300' : 
                      patient.status === 'critical' ? 'bg-error-300' : 
                      patient.status === 'recovered' ? 'bg-primary-300' : 'bg-neutral-300'
                    }`}></span>
                    <span className="capitalize">{patient.status}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Link to={`/patients/${id}/edit`} className="btn bg-white/10 text-white hover:bg-white/20 flex items-center">
                <FaEdit className="mr-1" /> Edit
              </Link>
              <Link to={`/appointments`} className="btn bg-white/10 text-white hover:bg-white/20 flex items-center">
                <FaCalendarPlus className="mr-1" /> New Appointment
              </Link>
            </div>
          </div>
        </div>
        
        {/* Quick info bar */}
        <div className="px-6 py-4 flex flex-wrap border-b border-neutral-200">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 pr-2">
            <p className="text-sm text-neutral-500 mb-1">Blood Type</p>
            <p className="font-medium">{patient.bloodType || 'Unknown'}</p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 pr-2">
            <p className="text-sm text-neutral-500 mb-1">Phone</p>
            <p className="font-medium">{patient.phone}</p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 pr-2">
            <p className="text-sm text-neutral-500 mb-1">Email</p>
            <p className="font-medium">{patient.email}</p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4">
            <p className="text-sm text-neutral-500 mb-1">Address</p>
            <p className="font-medium">{`${patient.address}, ${patient.city}, ${patient.state} ${patient.zip}`}</p>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="px-6 border-b border-neutral-200">
          <nav className="flex space-x-6 overflow-x-auto hide-scrollbar">
            <button 
              className={`py-4 px-1 border-b-2 font-medium text-sm focus:outline-none whitespace-nowrap ${
                activeTab === 'overview' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`py-4 px-1 border-b-2 font-medium text-sm focus:outline-none whitespace-nowrap ${
                activeTab === 'appointments' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
              onClick={() => setActiveTab('appointments')}
            >
              Appointment History
            </button>
            <button 
              className={`py-4 px-1 border-b-2 font-medium text-sm focus:outline-none whitespace-nowrap ${
                activeTab === 'records' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
              onClick={() => setActiveTab('records')}
            >
              Medical Records
            </button>
            <button 
              className={`py-4 px-1 border-b-2 font-medium text-sm focus:outline-none whitespace-nowrap ${
                activeTab === 'vitals' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
              onClick={() => setActiveTab('vitals')}
            >
              Vital History
            </button>
          </nav>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="bg-white shadow-card rounded-lg overflow-hidden">
        {activeTab === 'overview' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Medical Info */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Medical Information</h2>
                
                <div className="border rounded-lg divide-y divide-neutral-200">
                  <div className="px-4 py-3 flex">
                    <div className="w-2/5 font-medium text-neutral-700">Allergies</div>
                    <div className="w-3/5 text-neutral-900">{patient.allergies || 'None reported'}</div>
                  </div>
                  <div className="px-4 py-3 flex">
                    <div className="w-2/5 font-medium text-neutral-700">Medical Conditions</div>
                    <div className="w-3/5 text-neutral-900">{patient.medicalConditions || 'None reported'}</div>
                  </div>
                  <div className="px-4 py-3 flex">
                    <div className="w-2/5 font-medium text-neutral-700">Current Medications</div>
                    <div className="w-3/5 text-neutral-900">{patient.currentMedications || 'None'}</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-4">Emergency Contact</h2>
                  
                  <div className="border rounded-lg divide-y divide-neutral-200">
                    <div className="px-4 py-3 flex">
                      <div className="w-2/5 font-medium text-neutral-700">Name</div>
                      <div className="w-3/5 text-neutral-900">{patient.emergencyContactName || 'Not provided'}</div>
                    </div>
                    <div className="px-4 py-3 flex">
                      <div className="w-2/5 font-medium text-neutral-700">Phone</div>
                      <div className="w-3/5 text-neutral-900">{patient.emergencyContactPhone || 'Not provided'}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Recent Activity</h2>
                  <Link to="/appointments" className="text-sm text-primary-600 hover:text-primary-800">View All</Link>
                </div>
                
                <div className="space-y-4">
                  {patient.appointmentHistory.slice(0, 3).map(appointment => (
                    <div key={appointment.id} className="border border-neutral-200 rounded-lg p-4 hover:bg-neutral-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <FaNotesMedical className="text-primary-500 mr-2" />
                          <span className="font-medium">{appointment.type}</span>
                        </div>
                        <span className="text-sm text-neutral-500">
                          {format(new Date(appointment.date), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-700 line-clamp-2">{appointment.notes}</p>
                    </div>
                  ))}
                  
                  <Link 
                    to={`/diagnostic-tools/symptom-analyzer?patient=${id}`}
                    className="block border border-dashed border-neutral-300 rounded-lg p-4 hover:bg-neutral-50 transition-colors text-center"
                  >
                    <div className="flex items-center justify-center text-primary-600">
                      <FaPlusCircle className="mr-2" />
                      <span className="font-medium">Run AI Symptom Analysis</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'appointments' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Appointment History</h2>
              <button className="btn btn-outline flex items-center">
                <FaFilePdf className="mr-2" />
                Export History
              </button>
            </div>
            
            <div className="space-y-4">
              {patient.appointmentHistory.map(appointment => (
                <div key={appointment.id} className="border border-neutral-200 rounded-lg p-4 hover:bg-neutral-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <div className="flex items-center mb-2 sm:mb-0">
                      <FaNotesMedical className="text-primary-500 mr-2" />
                      <span className="font-medium">{appointment.type}</span>
                      <span className={`ml-2 badge ${
                        appointment.status === 'completed' ? 'badge-green' : 
                        appointment.status === 'cancelled' ? 'bg-neutral-100 text-neutral-800' : 
                        appointment.status === 'no_show' ? 'badge-yellow' : 'badge-blue'
                      }`}>
                        {appointment.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-sm text-neutral-500">
                      {format(new Date(appointment.date), 'MMMM d, yyyy')} at {format(new Date(appointment.date), 'h:mm a')}
                    </div>
                  </div>
                  <div className="mt-2">
                    <h3 className="text-sm font-medium text-neutral-700">Notes:</h3>
                    <p className="text-sm text-neutral-700 mt-1">{appointment.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'records' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Medical Records</h2>
              <div className="flex space-x-2">
                <button className="btn btn-outline flex items-center text-sm py-1 px-3">
                  <FaHistory className="mr-2" />
                  Request Records
                </button>
                <button className="btn btn-outline flex items-center text-sm py-1 px-3">
                  <FaPlusCircle className="mr-2" />
                  Add Record
                </button>
              </div>
            </div>
            
            <div className="overflow-hidden border border-neutral-200 rounded-lg">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Provider
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {patient.medicalRecords.map(record => (
                    <tr key={record.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                        {format(new Date(record.date), 'MMM d, yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {record.type === 'Lab Result' && (
                          <span className="badge badge-blue">{record.type}</span>
                        )}
                        {record.type === 'Prescription' && (
                          <span className="badge badge-green">{record.type}</span>
                        )}
                        {record.type === 'Imaging' && (
                          <span className="badge badge-yellow">{record.type}</span>
                        )}
                        {record.type === 'Referral' && (
                          <span className="badge bg-purple-100 text-purple-800">{record.type}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 font-medium">
                        {record.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                        {record.provider}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                        <button className="text-primary-600 hover:text-primary-800 font-medium">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'vitals' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Vital Signs History</h2>
              <button className="btn btn-outline flex items-center text-sm py-1 px-3">
                <FaPlusCircle className="mr-2" />
                Add New Entry
              </button>
            </div>
            
            <div className="overflow-hidden border border-neutral-200 rounded-lg">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Blood Pressure
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Heart Rate
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Temperature
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Resp. Rate
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Weight (kg)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {patient.vitalHistory.map((vital, index) => (
                    <tr key={index} className="hover:bg-neutral-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-700">
                        {format(new Date(vital.date), 'MMM d, yyyy')}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-700 font-medium">
                        {vital.bloodPressure}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-700">
                        {vital.heartRate} bpm
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-700">
                        {vital.temperature}°F
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-700">
                        {vital.respiratoryRate}/min
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-700">
                        {vital.weight} kg
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PatientDetails