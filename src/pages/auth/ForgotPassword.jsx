import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { API_URL } from '../../config/constants'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setEmail(e.target.value)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      setError('Please enter your email address')
      return
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // For demo purposes, we'll just simulate a successful request
      // In a real app, you'd make an API call:
      // await axios.post(`${API_URL}/api/auth/forgot-password`, { email })
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSubmitted(true)
      toast.success('Password reset instructions sent to your email')
    } catch (err) {
      const message = err.response?.data?.message || 'Something went wrong. Please try again.'
      setError(message)
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="p-6 sm:p-8 text-center">
        <div className="rounded-full bg-primary-100 p-3 mx-auto w-fit mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">Check Your Email</h1>
        <p className="text-neutral-600 mb-6">
          We've sent password reset instructions to:<br />
          <span className="font-medium text-neutral-800">{email}</span>
        </p>
        <p className="text-sm text-neutral-500 mb-6">
          If you don't see the email, check your spam folder or make sure the email address is correct.
        </p>
        <div className="space-y-3">
          <Link to="/login" className="btn btn-primary w-full block">
            Return to Login
          </Link>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="btn btn-outline w-full"
          >
            Try Different Email
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 sm:p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-neutral-800">Reset Your Password</h1>
        <p className="text-neutral-600">Enter your email to receive reset instructions</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={`form-input ${error ? 'border-error-500 focus:ring-error-500' : ''}`}
            value={email}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {error && <p className="form-error">{error}</p>}
        </div>
        
        <div>
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
                Sending...
              </span>
            ) : 'Send Reset Link'}
          </button>
        </div>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-neutral-600">
          Remember your password?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword