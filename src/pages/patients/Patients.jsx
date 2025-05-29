import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaSearch, FaFilter } from 'react-icons/fa'

// Components
import PatientList from '../../components/patients/PatientList'

function Patients() {
  const [patients, setPatients] = useState([])
  const [filteredPatients, setFilteredPatients] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  
  // Fetch patients from API - using mock data for now
  useEffect(() => {
    // Simulate API call
    const fetchPatients = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await axios.get(`${API_URL}/api/patients`)
        // setPatients(response.data)
        
        // Mock data
        const mockPatients = [
          { id: '1', name: 'Emma Johnson', age: 45, gender: 'Female', status: 'active', lastVisit: '2025-05-10' },
          { id: '2', name: 'Robert Smith', age: 62, gender: 'Male', status: 'critical', lastVisit: '2025-05-12' },
          { id: '3', name: 'Olivia Williams', age: 28, gender: 'Female', status: 'active', lastVisit: '2025-05-13' },
          { id: '4', name: 'James Brown', age: 53, gender: 'Male', status: 'recovered', lastVisit: '2025-05-08' },
          { id: '5', name: 'Sophia Martinez', age: 31, gender: 'Female', status: 'inactive', lastVisit: '2025-04-22' },
          { id: '6', name: 'William Davis', age: 68, gender: 'Male', status: 'active', lastVisit: '2025-05-05' },
          { id: '7', name: 'Isabella Wilson', age: 35, gender: 'Female', status: 'active', lastVisit: '2025-05-11' },
          { id: '8', name: 'Michael Lee', age: 41, gender: 'Male', status: 'recovered', lastVisit: '2025-04-30' },
          { id: '9', name: 'Charlotte Garcia', age: 55, gender: 'Female', status: 'critical', lastVisit: '2025-05-09' },
          { id: '10', name: 'Benjamin Rodriguez', age: 27, gender: 'Male', status: 'active', lastVisit: '2025-05-07' },
        ]
        
        setPatients(mockPatients)
        setFilteredPatients(mockPatients)
        
      } catch (error) {
        console.error('Error fetching patients:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    setTimeout(fetchPatients, 800) // Add delay to simulate network request
  }, [])
  
  // Filter patients based on search and status
  useEffect(() => {
    let results = patients
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(patient => 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      results = results.filter(patient => patient.status === statusFilter)
    }
    
    setFilteredPatients(results)
  }, [searchTerm, statusFilter, patients])

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Patients</h1>
          <p className="text-neutral-600">Manage and view your patient records</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link 
            to="/patients/new"
            className="btn btn-primary flex items-center"
          >
            <FaPlus className="mr-2" />
            Add New Patient
          </Link>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-card p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-4 w-4 text-neutral-400" />
              </div>
              <input
                type="text"
                placeholder="Search patients by name..."
                className="form-input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="h-4 w-4 text-neutral-400" />
              </div>
              <select
                className="form-input pl-10"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="critical">Critical</option>
                <option value="recovered">Recovered</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Patient List */}
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="p-4">
            <PatientList patients={filteredPatients} />
            
            {filteredPatients.length > 0 && (
              <div className="pt-4 flex justify-between items-center border-t border-neutral-200 mt-4">
                <p className="text-sm text-neutral-500">
                  Showing {filteredPatients.length} of {patients.length} patients
                </p>
                <div className="flex space-x-2">
                  <button className="btn btn-outline py-1 px-3 text-sm">Previous</button>
                  <button className="btn btn-outline py-1 px-3 text-sm bg-primary-50 text-primary-700 border-primary-200">1</button>
                  <button className="btn btn-outline py-1 px-3 text-sm">Next</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Patients