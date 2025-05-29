// Base API URL - will need to be updated for production
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// AI API endpoints - placeholders for now
export const AI_SYMPTOM_ANALYZER_ENDPOINT = `${API_URL}/api/ai/analyze-symptoms`
export const AI_IMAGE_ANALYSIS_ENDPOINT = `${API_URL}/api/ai/analyze-image`

// Patient status options
export const PATIENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  CRITICAL: 'critical',
  RECOVERED: 'recovered',
}

// Appointment status options
export const APPOINTMENT_STATUS = {
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no_show',
}

// Mock data for testing
export const MOCK_SPECIALTIES = [
  'Cardiology',
  'Dermatology',
  'Endocrinology',
  'Gastroenterology',
  'Neurology',
  'Obstetrics',
  'Oncology',
  'Ophthalmology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry',
  'Radiology',
  'Urology'
]