import { Link } from 'react-router-dom'
import { format } from 'date-fns'

function PatientList({ patients, showSearch = false }) {
  const getStatusBadge = (status) => {
    switch(status.toLowerCase()) {
      case 'active':
        return <span className="badge badge-green">Active</span>
      case 'inactive':
        return <span className="badge bg-neutral-100 text-neutral-800">Inactive</span>
      case 'critical':
        return <span className="badge badge-red">Critical</span>
      case 'recovered':
        return <span className="badge badge-blue">Recovered</span>
      default:
        return null
    }
  }

  if (!patients || patients.length === 0) {
    return (
      <div className="py-8 text-center bg-neutral-50 rounded-md">
        <p className="text-neutral-500">No patients found</p>
      </div>
    )
  }

  return (
    <div>
      {showSearch && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search patients..."
            className="form-input"
          />
        </div>
      )}
      
      <div className="overflow-hidden border border-neutral-200 rounded-lg">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Age
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Last Visit
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-neutral-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <Link to={`/patients/${patient.id}`} className="font-medium text-primary-600 hover:text-primary-800">
                    {patient.name}
                  </Link>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-700">
                  {patient.age}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {getStatusBadge(patient.status)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-700">
                  {format(new Date(patient.lastVisit), 'MMM d, yyyy')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PatientList