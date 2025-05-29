import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { MOCK_SPECIALTIES } from '../../config/constants'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialty: '',
    licenseNumber: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    if (!formData.specialty) {
      newErrors.specialty = 'Specialty is required'
    }
    
    if (!formData.licenseNumber) {
      newErrors.licenseNumber = 'License number is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return
    
    setIsSubmitting(true)
    
    try {
      const success = await register(formData)
      if (success) {
        navigate('/login', { state: { registered: true } })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6 sm:p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-neutral-800">Create Your Account</h1>
        <p className="text-neutral-600">Register to join our medical platform</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="form-label">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={`form-input ${errors.name ? 'border-error-500 focus:ring-error-500' : ''}`}
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={`form-input ${errors.email ? 'border-error-500 focus:ring-error-500' : ''}`}
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="specialty" className="form-label">Medical Specialty</label>
            <select
              id="specialty"
              name="specialty"
              required
              className={`form-input ${errors.specialty ? 'border-error-500 focus:ring-error-500' : ''}`}
              value={formData.specialty}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="">Select specialty</option>
              {MOCK_SPECIALTIES.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
            {errors.specialty && <p className="form-error">{errors.specialty}</p>}
          </div>
          
          <div>
            <label htmlFor="licenseNumber" className="form-label">Medical License Number</label>
            <input
              id="licenseNumber"
              name="licenseNumber"
              type="text"
              required
              className={`form-input ${errors.licenseNumber ? 'border-error-500 focus:ring-error-500' : ''}`}
              value={formData.licenseNumber}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.licenseNumber && <p className="form-error">{errors.licenseNumber}</p>}
          </div>
        </div>
        
        <div>
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className={`form-input ${errors.password ? 'border-error-500 focus:ring-error-500' : ''}`}
            value={formData.password}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.password && <p className="form-error">{errors.password}</p>}
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            className={`form-input ${errors.confirmPassword ? 'border-error-500 focus:ring-error-500' : ''}`}
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}
        </div>
        
        <div className="mt-2">
          <button
            type="submit"
            className="btn btn-primary w-full flex justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                  <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
            ) : 'Create Account'}
          </button>
        </div>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-neutral-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register