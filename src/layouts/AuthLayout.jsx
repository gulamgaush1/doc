import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-primary-500 text-white flex items-center justify-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-primary-800">MedAI</span>
          </Link>
        </div>
        
        <div className="max-w-md mx-auto">
          <div className="bg-white shadow-card rounded-xl overflow-hidden animate-fade-in">
            <Outlet />
          </div>
          
          <div className="text-center mt-8 text-sm text-neutral-500">
            <p>© {new Date().getFullYear()} MedAI. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout