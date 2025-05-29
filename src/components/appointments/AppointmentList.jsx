import { Link } from 'react-router-dom'
import { format } from 'date-fns'

function AppointmentList({ appointments, showSearch = false }) {
  const getStatusBadge = (status) => {
    switch(status.toLowerCase()) {
      case 'scheduled':
        return <span className="badge badge-blue">Scheduled</span>
      case 'completed':
        return <span className="badge badge-green">Completed</span>
      case 'cancelled':
        return <span className="badge bg-neutral-100 text-neutral-800">Cancelled</span>
      case 'no_show':
        return <span className="badge badge-yellow">No Show</span>
      default:
        return null
    }
  }
  
  const getTypeIcon = (type) => {
    switch(type.toLowerCase()) {
      case 'check-up':
        return <div className="h-2 w-2 rounded-full bg-accent-500 mr-2"></div>
      case 'follow-up':
        return <div className="h-2 w-2 rounded-full bg-primary-500 mr-2"></div>
      case 'emergency':
        return <div className="h-2 w-2 rounded-full bg-error-500 mr-2"></div>
      case 'consultation':
        return <div className="h-2 w-2 rounded-full bg-secondary-500 mr-2"></div>
      default:
        return <div className="h-2 w-2 rounded-full bg-neutral-400 mr-2"></div>
    }
  }

  if (!appointments || appointments.length === 0) {
    return (
      <div className="py-8 text-center bg-neutral-50 rounded-md">
        <p className="text-neutral-500">No appointments found</p>
      </div>
    )
  }

  return (
    <div>
      {showSearch && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search appointments..."
            className="form-input"
          />
        </div>
      )}
      
      <div className="overflow-hidden border border-neutral-200 rounded-lg">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Patient
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="hover:bg-neutral-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <Link to={`/appointments/${appointment.id}`} className="font-medium text-primary-600 hover:text-primary-800">
                    {appointment.patientName}
                  </Link>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-700">
                  {format(new Date(appointment.date), 'MMM d, yyyy - h:mm a')}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    {getTypeIcon(appointment.type)}
                    <span className="text-sm text-neutral-700">{appointment.type}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {getStatusBadge(appointment.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AppointmentList