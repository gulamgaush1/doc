import { useState } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Icons
import { 
  FaHome, FaUsers, FaCalendarAlt, FaStethoscope, FaUserMd,
  FaBars, FaTimes, FaSignOutAlt, FaBell
} from 'react-icons/fa'

function DashboardLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  
  // Mock notifications
  const notifications = [
    { id: 1, text: 'New patient appointment at 3:00 PM', isNew: true },
    { id: 2, text: 'Lab results available for Emma Johnson', isNew: true },
    { id: 3, text: 'Reminder: Staff meeting tomorrow at 9:00 AM', isNew: false },
    { id: 4, text: 'System update scheduled for tonight', isNew: false }
  ]
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <FaHome /> },
    { path: '/patients', label: 'Patients', icon: <FaUsers /> },
    { path: '/appointments', label: 'Appointments', icon: <FaCalendarAlt /> },
    { path: '/diagnostic-tools', label: 'Diagnostic Tools', icon: <FaStethoscope /> },
    { path: '/profile', label: 'Profile', icon: <FaUserMd /> },
  ]
  
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Top header */}
      <header className="bg-white border-b border-neutral-200 z-30">
        <div className="px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)} 
                className="text-neutral-500 lg:hidden"
                aria-label="Toggle sidebar"
              >
                <FaBars className="h-5 w-5" />
              </button>
              <Link to="/" className="flex items-center ml-4 lg:ml-0">
                <div className="h-8 w-8 rounded-md bg-primary-500 text-white flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-primary-800">MedAI</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setNotificationsOpen(!notificationsOpen)} 
                  className="relative p-1 text-neutral-600 hover:text-neutral-900 focus:outline-none"
                >
                  <FaBell className="h-5 w-5" />
                  {notifications.some(n => n.isNew) && (
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-error-500"></span>
                  )}
                </button>
                
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-40 animate-fade-in">
                    <div className="px-4 py-2 border-b border-neutral-100">
                      <h3 className="text-sm font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className="px-4 py-3 hover:bg-neutral-50 border-b border-neutral-100 last:border-none">
                          <div className="flex items-start">
                            {notification.isNew && (
                              <span className="h-2 w-2 mt-1.5 mr-2 rounded-full bg-primary-500 flex-shrink-0"></span>
                            )}
                            <span className="text-sm text-neutral-700">{notification.text}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-neutral-100">
                      <button className="text-xs text-primary-600 hover:text-primary-800 font-medium">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* User menu */}
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary-500 text-white flex items-center justify-center">
                  {user?.name?.charAt(0) || 'D'}
                </div>
                <span className="ml-2 text-sm font-medium text-neutral-700 hidden sm:block">
                  Dr. {user?.name || 'User'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar for mobile */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            <div className="fixed inset-0 bg-neutral-800 bg-opacity-50\" onClick={() => setSidebarOpen(false)}></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <FaTimes className="h-5 w-5 text-white" />
                </button>
              </div>
              <div className="px-2 py-4 flex-1">
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`
                        group flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-primary-50 hover:text-primary-700
                        ${location.pathname === item.path ? 'bg-primary-50 text-primary-700' : 'text-neutral-700'}
                      `}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="px-2 py-4 border-t border-neutral-200">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-700 rounded-md hover:bg-red-50"
                >
                  <FaSignOutAlt className="mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col flex-grow border-r border-neutral-200 bg-white overflow-y-auto">
              <div className="flex-grow px-3 py-6">
                <nav className="flex-1 space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`
                        group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                        ${location.pathname === item.path 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-700'}
                      `}
                    >
                      <span className="mr-3 flex-shrink-0">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="px-3 py-4 border-t border-neutral-200">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-700 rounded-md hover:bg-red-50 transition-colors"
                >
                  <FaSignOutAlt className="mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout