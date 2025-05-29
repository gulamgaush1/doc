function StatCard({ title, value, icon, color }) {
  // Define color classes based on the color prop
  const colorClasses = {
    primary: {
      bg: 'bg-primary-50',
      text: 'text-primary-700',
      ring: 'ring-primary-500/30',
    },
    secondary: {
      bg: 'bg-secondary-50',
      text: 'text-secondary-700',
      ring: 'ring-secondary-500/30',
    },
    accent: {
      bg: 'bg-accent-50',
      text: 'text-accent-700',
      ring: 'ring-accent-500/30',
    },
    error: {
      bg: 'bg-error-50',
      text: 'text-error-700',
      ring: 'ring-error-500/30',
    },
    warning: {
      bg: 'bg-warning-50',
      text: 'text-warning-700',
      ring: 'ring-warning-500/30',
    }
  }
  
  const classes = colorClasses[color] || colorClasses.primary
  
  return (
    <div className="bg-white rounded-lg shadow-card p-5 border border-neutral-100">
      <div className="flex items-center space-x-4">
        <div className={`p-2.5 rounded-full ${classes.bg}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-neutral-500">{title}</p>
          <p className="text-2xl font-bold text-neutral-800">{value.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

export default StatCard