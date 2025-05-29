import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { API_URL } from '../config/constants'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is already logged in on page load
  useEffect(() => {
    const token = localStorage.getItem('token')
    
    if (token) {
      const fetchUser = async () => {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          const response = await axios.get(`${API_URL}/api/auth/me`)
          setUser(response.data.user)
        } catch (error) {
          console.error('Error fetching user:', error)
          logout() // Clear invalid token
        } finally {
          setIsLoading(false)
        }
      }
      
      fetchUser()
    } else {
      setIsLoading(false)
    }
  }, [])

  // Login function
  const login = async (credentials) => {
    try {
      setIsLoading(true)
      const response = await axios.post(`${API_URL}/api/auth/login`, credentials)
      
      const { token, user } = response.data
      
      // Save token and set user
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(user)
      
      toast.success('Login successful!')
      return true
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.'
      toast.error(message)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Register function
  const register = async (userData) => {
    try {
      setIsLoading(true)
      const response = await axios.post(`${API_URL}/api/auth/register`, userData)
      
      toast.success('Registration successful! Please log in.')
      return true
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.'
      toast.error(message)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
    toast.info('You have been logged out')
  }

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}