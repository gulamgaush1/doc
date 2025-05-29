import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { FaUserMd, FaEnvelope, FaPhone, FaIdCard, FaHospital, FaSave } from 'react-icons/fa'
import { toast } from 'react-toastify'

function Profile() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '(555) 123-4567',
    licenseNumber: 'MD12345',
    specialty: 'Cardiology',
    hospital: 'City General Hospital'
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Profile updated successfully')
      setIsEditing(false)
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Profile Settings</h1>
        <p className="text-neutral-600">Manage your account information</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="h-20 w-20 rounded-full bg-primary-500 text-white flex items-center justify-center text-2xl font-bold">
              {formData.name.charAt(0)}
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold">{formData.name}</h2>
              <p className="text-neutral-600">{formData.specialty}</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUserMd className="text-neutral-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    className="form-input pl-10"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div>
                <label className="form-label">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-neutral-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    className="form-input pl-10"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div>
                <label className="form-label">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-neutral-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input pl-10"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div>
                <label className="form-label">License Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaIdCard className="text-neutral-400" />
                  </div>
                  <input
                    type="text"
                    name="licenseNumber"
                    className="form-input pl-10"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div>
                <label className="form-label">Specialty</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUserMd className="text-neutral-400" />
                  </div>
                  <input
                    type="text"
                    name="specialty"
                    className="form-input pl-10"
                    value={formData.specialty}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div>
                <label className="form-label">Hospital/Clinic</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaHospital className="text-neutral-400" />
                  </div>
                  <input
                    type="text"
                    name="hospital"
                    className="form-input pl-10"
                    value={formData.hospital}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              {isEditing ? (
                <div className="space-x-2">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setIsEditing(false)}
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary flex items-center"
                    disabled={isSaving}
                  >
                    {isSaving ? (
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
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile