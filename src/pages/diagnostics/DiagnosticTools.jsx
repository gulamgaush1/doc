import { Link } from 'react-router-dom'
import { 
  FaStethoscope, FaXRay, FaVial, FaHeartbeat, 
  FaBrain, FaDna, FaLungs, FaMicroscope
} from 'react-icons/fa'

function DiagnosticTools() {
  const diagnosticTools = [
    {
      id: 'symptom-analyzer',
      name: 'Symptom Analyzer',
      description: 'AI-powered symptom analysis to generate potential diagnoses and recommendations',
      icon: <FaStethoscope className="h-8 w-8 text-primary-500" />,
      color: 'primary',
      link: '/diagnostic-tools/symptom-analyzer'
    },
    {
      id: 'image-analysis',
      name: 'Medical Image Analysis',
      description: 'Upload and analyze medical images using machine learning algorithms',
      icon: <FaXRay className="h-8 w-8 text-secondary-500" />,
      color: 'secondary',
      link: '/diagnostic-tools/image-analysis'
    },
    {
      id: 'lab-results',
      name: 'Lab Results Interpreter',
      description: 'Analyze and interpret laboratory test results with AI assistance',
      icon: <FaVial className="h-8 w-8 text-accent-500" />,
      color: 'accent',
      link: '#'
    },
    {
      id: 'ecg-analysis',
      name: 'ECG Analysis',
      description: 'Upload ECG readings for automated analysis and interpretation',
      icon: <FaHeartbeat className="h-8 w-8 text-error-500" />,
      color: 'error',
      link: '#'
    },
    {
      id: 'neuro-assessment',
      name: 'Neurological Assessment',
      description: 'Tools to assist with neurological examinations and assessments',
      icon: <FaBrain className="h-8 w-8 text-purple-500" />,
      color: 'purple',
      link: '#'
    },
    {
      id: 'genetic-analysis',
      name: 'Genetic Analysis',
      description: 'Analyze genetic data to identify potential hereditary conditions',
      icon: <FaDna className="h-8 w-8 text-indigo-500" />,
      color: 'indigo',
      link: '#'
    },
    {
      id: 'respiratory-analysis',
      name: 'Respiratory Analysis',
      description: 'Tools for analyzing respiratory function and lung health',
      icon: <FaLungs className="h-8 w-8 text-blue-500" />,
      color: 'blue',
      link: '#'
    },
    {
      id: 'pathology',
      name: 'Pathology Assistant',
      description: 'AI-assisted analysis of pathology samples and reports',
      icon: <FaMicroscope className="h-8 w-8 text-green-500" />,
      color: 'green',
      link: '#'
    }
  ]

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">AI Diagnostic Tools</h1>
        <p className="text-neutral-600">Powerful diagnostic assistants powered by artificial intelligence</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diagnosticTools.map(tool => (
          <Link 
            key={tool.id}
            to={tool.link} 
            className={`bg-white rounded-lg overflow-hidden shadow-card hover:shadow-lg transition-shadow border border-neutral-200 ${tool.id === 'symptom-analyzer' || tool.id === 'image-analysis' ? '' : 'pointer-events-none opacity-60'}`}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                {tool.icon}
                <h2 className="ml-2 text-xl font-semibold">{tool.name}</h2>
              </div>
              <p className="text-neutral-600 mb-4">{tool.description}</p>
              
              {(tool.id === 'symptom-analyzer' || tool.id === 'image-analysis') ? (
                <button className={`px-3 py-1.5 rounded text-sm font-medium bg-${tool.color}-50 text-${tool.color}-700`}>
                  Open Tool
                </button>
              ) : (
                <span className="px-3 py-1.5 rounded text-sm font-medium bg-neutral-100 text-neutral-500">
                  Coming Soon
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DiagnosticTools