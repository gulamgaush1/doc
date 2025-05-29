import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Layouts
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'

// Components
import LoadingScreen from './components/common/LoadingScreen'
import ProtectedRoute from './components/auth/ProtectedRoute'

// Pages (lazy loaded)
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'))
const Patients = lazy(() => import('./pages/patients/Patients'))
const PatientDetails = lazy(() => import('./pages/patients/PatientDetails'))
const PatientCreate = lazy(() => import('./pages/patients/PatientCreate.jsx'))
const PatientEdit = lazy(() => import('./pages/patients/PatientEdit.jsx'))
const Appointments = lazy(() => import('./pages/appointments/Appointments.jsx'))
const AppointmentDetails = lazy(() => import('./pages/appointments/AppointmentDetails.jsx'))
const DiagnosticTools = lazy(() => import('./pages/diagnostics/DiagnosticTools'))
const SymptomAnalyzer = lazy(() => import('./pages/diagnostics/SymptomAnalyzer'))
const ImageAnalysis = lazy(() => import('./pages/diagnostics/ImageAnalysis'))
const Profile = lazy(() => import('./pages/profile/Profile'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  const { user, isLoading } = useAuth()
  
  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard\" replace />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard\" replace />} />
          <Route path="/forgot-password" element={!user ? <ForgotPassword /> : <Navigate to="/dashboard\" replace />} />
        </Route>
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/new" element={<PatientCreate />} />
          <Route path="/patients/:id" element={<PatientDetails />} />
          <Route path="/patients/:id/edit" element={<PatientEdit />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/appointments/:id" element={<AppointmentDetails />} />
          <Route path="/diagnostic-tools" element={<DiagnosticTools />} />
          <Route path="/diagnostic-tools/symptom-analyzer" element={<SymptomAnalyzer />} />
          <Route path="/diagnostic-tools/image-analysis" element={<ImageAnalysis />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        
        {/* Redirect root to dashboard or login */}
        <Route path="/" element={user ? <Navigate to="/dashboard\" replace /> : <Navigate to="/login" replace />} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App