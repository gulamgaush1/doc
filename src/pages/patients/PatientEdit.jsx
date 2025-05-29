import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FaSave, FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'

function PatientEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    allergies: '',
    medicalConditions: '',
    currentMedications: '',
  })
  
  useEffect(() => {
    // Fetch patient data
    const fetchPatient = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await axios.get(`${API_URL}/api/patients/${id}`)
        // setFormData(response.data)
        
        // Mock data for demo
        setFormData({
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
          allergies: 'Penicillin, Sulfa drugs',
          medicalConditions: 'Hypertension, Type 2 Diabetes',
          currentMedications: 'Lisinopril 10mg, Metformin 500mg',
        })
      } catch (error) {
        console.error('Error fetching patient:', error)
        toast.error('Failed to load patient data')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchPatient()
  }, [id])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // In a real app, you would send the data to your API
      // await axios.put(`${API_URL}/api/patients/${id}`, formData)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Patient updated successfully')
      navigate(`/patients/${id}`)
    } catch (error) {
      toast.error('Failed to update patient. Please try again.')
      console.error('Error updating patient:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Edit Patient</h1>
          <p className="text-neutral-600">Update patient information</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <Link to={`/patients/${id}`} className="btn btn-outline flex items-center">
            <FaTimes className="mr-2" />
            Cancel
          </Link>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn btn-primary flex items-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <FaSave className="mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          {/* Personal Information Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-neutral-200">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="form-input"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="form-input"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  required
                  className="form-input"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="gender" className="form-label">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  required
                  className="form-input"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="form-input"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          
          {/* Address Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-neutral-200">Address Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="address" className="form-label">Street Address</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  className="form-input"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="city" className="form-label">City</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  className="form-input"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="state" className="form-label">State</label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    className="form-input"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="zip" className="form-label">ZIP Code</label>
                  <input
                    id="zip"
                    name="zip"
                    type="text"
                    className="form-input"
                    value={formData.zip}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Emergency Contact Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-neutral-200">Emergency Contact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="emergencyContactName" className="form-label">Contact Name</label>
                <input
                  id="emergencyContactName"
                  name="emergencyContactName"
                  type="text"
                  className="form-input"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="emergencyContactPhone" className="form-label">Contact Phone</label>
                <input
                  id="emergencyContactPhone"
                  name="emergencyContactPhone"
                  type="tel"
                  className="form-input"
                  value={formData.emergencyContactPhone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          
          {/* Medical Information Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-neutral-200">Medical Information</h2>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="allergies" className="form-label">Known Allergies</label>
                <textarea
                  id="allergies"
                  name="allergies"
                  rows="2"
                  className="form-input"
                  placeholder="List any allergies or write 'None known'"
                  value={formData.allergies}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="medicalConditions" className="form-label">Medical Conditions</label>
                <textarea
                  id="medicalConditions"
                  name="medicalConditions"
                  rows="2"
                  className="form-input"
                  placeholder="List any existing medical conditions"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="currentMedications" className="form-label">Current Medications</label>
                <textarea
                  id="currentMedications"
                  name="currentMedications"
                  rows="2"
                  className="form-input"
                  placeholder="List any current medications or write 'None'"
                  value={formData.currentMedications}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PatientEdit