import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaArrowLeft, FaPlus, FaTimes, FaStethoscope, FaPrint, FaFilePdf, FaShareAlt } from 'react-icons/fa'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AI_SYMPTOM_ANALYZER_ENDPOINT } from '../../config/constants'

function SymptomAnalyzer() {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const patientId = queryParams.get('patient')
  
  const [patient, setPatient] = useState(null)
  const [symptoms, setSymptoms] = useState([])
  const [newSymptom, setNewSymptom] = useState('')
  const [duration, setDuration] = useState('')
  const [severity, setSeverity] = useState('moderate')
  const [additionalNotes, setAdditionalNotes] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState(null)
  
  // Common symptoms for autocomplete
  const commonSymptoms = [
    'Fever', 'Cough', 'Shortness of breath', 'Fatigue', 'Headache',
    'Sore throat', 'Nausea', 'Vomiting', 'Diarrhea', 'Chest pain',
    'Abdominal pain', 'Back pain', 'Joint pain', 'Rash', 'Dizziness'
  ]
  
  useEffect(() => {
    // If patientId is provided, fetch patient data
    if (patientId) {
      // In a real app, this would be an API call
      // Simulate patient fetch with mock data
      setTimeout(() => {
        setPatient({
          id: patientId,
          name: patientId === '1' ? 'Emma Johnson' : 
                patientId === '2' ? 'Robert Smith' : 
                patientId === '3' ? 'Olivia Williams' : 'Patient',
          age: patientId === '1' ? 45 : 
                patientId === '2' ? 62 : 
                patientId === '3' ? 28 : 50,
          gender: patientId === '1' ? 'female' : 
                  patientId === '2' ? 'male' : 
                  patientId === '3' ? 'female' : 'unknown'
        })
      }, 500)
    }
  }, [patientId])
  
  const handleAddSymptom = (e) => {
    e.preventDefault()
    if (newSymptom.trim()) {
      setSymptoms([...symptoms, {
        name: newSymptom,
        duration,
        severity
      }])
      setNewSymptom('')
      setDuration('')
      setSeverity('moderate')
    }
  }
  
  const removeSymptom = (index) => {
    const newSymptoms = [...symptoms]
    newSymptoms.splice(index, 1)
    setSymptoms(newSymptoms)
  }
  
  const handleSymptomSelection = (symptom) => {
    setNewSymptom(symptom)
  }
  
  const handleAnalyzeSymptoms = async () => {
    if (symptoms.length === 0) {
      toast.error('Please add at least one symptom')
      return
    }
    
    setIsAnalyzing(true)
    
    try {
      // In a real app, you would make an API call to your backend
      // const response = await axios.post(AI_SYMPTOM_ANALYZER_ENDPOINT, {
      //   patientId: patient?.id,
      //   patientAge: patient?.age,
      //   patientGender: patient?.gender,
      //   symptoms,
      //   additionalNotes
      // })
      // setResults(response.data)
      
      // Simulate API response delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock AI analysis results
      setResults({
        possibleConditions: [
          {
            name: 'Viral Upper Respiratory Infection',
            probability: 'High',
            description: 'A viral infection affecting the upper respiratory tract, including the nose, throat, and bronchi.'
          },
          {
            name: 'Seasonal Allergies',
            probability: 'Medium',
            description: 'An immune system response triggered by exposure to certain allergens like pollen, dust, or pet dander.'
          },
          {
            name: 'Bacterial Sinusitis',
            probability: 'Low',
            description: 'An infection of the sinuses caused by bacteria, often following a viral upper respiratory infection.'
          }
        ],
        recommendations: [
          'Consider symptomatic treatment with over-the-counter medications for symptom relief',
          'Rest and adequate hydration are recommended',
          'If symptoms worsen or persist beyond 7-10 days, consider antibiotic therapy for possible bacterial infection',
          'Recommend COVID-19 testing to rule out COVID-19 infection'
        ],
        additionalTests: [
          'Complete Blood Count (CBC) to check for signs of infection',
          'Nasal swab for respiratory virus panel',
          'Sinus imaging if symptoms persist to evaluate for sinusitis'
        ],
        confidenceScore: 85,
        disclaimer: 'This analysis is based on AI interpretation of reported symptoms and should not replace clinical judgment. Always combine with comprehensive patient evaluation.'
      })
      
      toast.success('Symptom analysis complete')
    } catch (error) {
      console.error('Error analyzing symptoms:', error)
      toast.error('Failed to analyze symptoms. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }
  
  const resetAnalysis = () => {
    setResults(null)
    setSymptoms([])
    setAdditionalNotes('')
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/diagnostic-tools')}
            className="mr-2 p-1 rounded-full hover:bg-neutral-100"
          >
            <FaArrowLeft className="text-neutral-700" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-neutral-800">AI Symptom Analyzer</h1>
            <p className="text-neutral-600">Analyze patient symptoms for potential diagnoses</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className={`lg:col-span-${results ? 1 : 3}`}>
          <div className="bg-white rounded-lg shadow-card overflow-hidden">
            <div className="bg-primary-50 px-6 py-4 border-b border-primary-100">
              <div className="flex items-center">
                <FaStethoscope className="text-primary-600 mr-2" />
                <h2 className="text-lg font-semibold text-primary-800">
                  {results ? 'Analysis Summary' : 'Enter Symptoms'}
                </h2>
              </div>
            </div>
            
            <div className="p-6">
              {/* Patient information (if available) */}
              {patient && (
                <div className="mb-6 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                  <h3 className="text-sm font-medium text-neutral-700 mb-2">Patient Information</h3>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="font-medium text-neutral-500">Name:</span>
                      <span className="ml-2 text-neutral-800">{patient.name}</span>
                    </div>
                    <div>
                      <span className="font-medium text-neutral-500">Age:</span>
                      <span className="ml-2 text-neutral-800">{patient.age}</span>
                    </div>
                    <div>
                      <span className="font-medium text-neutral-500">Gender:</span>
                      <span className="ml-2 text-neutral-800 capitalize">{patient.gender}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {results ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-neutral-800 mb-2">Reported Symptoms</h3>
                    <div className="flex flex-wrap gap-2">
                      {symptoms.map((symptom, index) => (
                        <div key={index} className="px-3 py-1.5 bg-neutral-100 rounded-full text-sm text-neutral-800">
                          {symptom.name} - {symptom.severity} ({symptom.duration})
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-neutral-200 pt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-md font-medium text-neutral-800">AI Confidence Score</h3>
                      <div className="text-sm font-medium">{results.confidenceScore}%</div>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2.5 mt-2">
                      <div 
                        className="bg-primary-500 h-2.5 rounded-full" 
                        style={{ width: `${results.confidenceScore}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between space-x-2 pt-2">
                    <button onClick={resetAnalysis} className="btn btn-outline text-sm w-1/2">
                      New Analysis
                    </button>
                    <button className="btn btn-primary text-sm w-1/2 flex items-center justify-center">
                      <FaShareAlt className="mr-2" /> Share Results
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Symptom input form */}
                  <form onSubmit={handleAddSymptom} className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="symptom" className="form-label">Symptom</label>
                        <input
                          id="symptom"
                          type="text"
                          className="form-input"
                          placeholder="Enter symptom"
                          value={newSymptom}
                          onChange={(e) => setNewSymptom(e.target.value)}
                          list="symptom-suggestions"
                          required
                        />
                        <datalist id="symptom-suggestions">
                          {commonSymptoms.map((symptom, index) => (
                            <option key={index} value={symptom} />
                          ))}
                        </datalist>
                      </div>
                      <div>
                        <label htmlFor="duration" className="form-label">Duration</label>
                        <input
                          id="duration"
                          type="text"
                          className="form-input"
                          placeholder="e.g. 3 days, 1 week"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="severity" className="form-label">Severity</label>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => setSeverity('mild')}
                          className={`py-2 border rounded-md ${
                            severity === 'mild' 
                              ? 'bg-primary-50 border-primary-300 text-primary-700' 
                              : 'border-neutral-300 text-neutral-700'
                          }`}
                        >
                          Mild
                        </button>
                        <button
                          type="button"
                          onClick={() => setSeverity('moderate')}
                          className={`py-2 border rounded-md ${
                            severity === 'moderate' 
                              ? 'bg-primary-50 border-primary-300 text-primary-700' 
                              : 'border-neutral-300 text-neutral-700'
                          }`}
                        >
                          Moderate
                        </button>
                        <button
                          type="button"
                          onClick={() => setSeverity('severe')}
                          className={`py-2 border rounded-md ${
                            severity === 'severe' 
                              ? 'bg-primary-50 border-primary-300 text-primary-700' 
                              : 'border-neutral-300 text-neutral-700'
                          }`}
                        >
                          Severe
                        </button>
                      </div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary w-full flex items-center justify-center">
                      <FaPlus className="mr-2" /> Add Symptom
                    </button>
                  </form>
                  
                  {/* Symptom list */}
                  <div className="mb-6">
                    <h3 className="text-md font-medium text-neutral-800 mb-3">Added Symptoms</h3>
                    
                    {symptoms.length === 0 ? (
                      <div className="p-4 border border-dashed border-neutral-300 rounded-md text-center text-neutral-500">
                        No symptoms added yet. Add symptoms using the form above.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {symptoms.map((symptom, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-neutral-50 rounded-md border border-neutral-200">
                            <div>
                              <span className="font-medium">{symptom.name}</span>
                              <div className="text-sm text-neutral-500">
                                <span className="capitalize">{symptom.severity}</span> • {symptom.duration}
                              </div>
                            </div>
                            <button 
                              onClick={() => removeSymptom(index)}
                              className="text-neutral-400 hover:text-error-500"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Additional notes */}
                  <div className="mb-6">
                    <label htmlFor="additionalNotes" className="form-label">Additional Notes (Optional)</label>
                    <textarea
                      id="additionalNotes"
                      className="form-input"
                      placeholder="Add any additional context or relevant information..."
                      rows="3"
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                    ></textarea>
                  </div>
                  
                  <button 
                    onClick={handleAnalyzeSymptoms}
                    disabled={symptoms.length === 0 || isAnalyzing}
                    className="btn btn-primary w-full flex items-center justify-center"
                  >
                    {isAnalyzing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                          <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <FaStethoscope className="mr-2" />
                        Analyze Symptoms
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        {results && (
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-card overflow-hidden">
              <div className="bg-accent-50 px-6 py-4 border-b border-accent-100 flex justify-between items-center">
                <div className="flex items-center">
                  <FaStethoscope className="text-accent-600 mr-2" />
                  <h2 className="text-lg font-semibold text-accent-800">Diagnostic Results</h2>
                </div>
                <div className="flex space-x-2">
                  <button className="btn btn-outline text-sm py-1 flex items-center">
                    <FaPrint className="mr-1" /> Print
                  </button>
                  <button className="btn btn-outline text-sm py-1 flex items-center">
                    <FaFilePdf className="mr-1" /> PDF
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-neutral-800 mb-2 pb-2 border-b border-neutral-200">
                    Possible Conditions
                  </h3>
                  <div className="space-y-4">
                    {results.possibleConditions.map((condition, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-md font-semibold">{condition.name}</h4>
                          <span className={`text-sm px-2 py-0.5 rounded-full ${
                            condition.probability === 'High' ? 'bg-error-100 text-error-800' :
                            condition.probability === 'Medium' ? 'bg-warning-100 text-warning-800' :
                            'bg-neutral-100 text-neutral-800'
                          }`}>
                            {condition.probability} Probability
                          </span>
                        </div>
                        <p className="text-sm text-neutral-700">{condition.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-md font-medium text-neutral-800 mb-2 pb-2 border-b border-neutral-200">
                      Recommended Actions
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-neutral-700 pl-2">
                      {results.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-neutral-800 mb-2 pb-2 border-b border-neutral-200">
                      Suggested Tests
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-neutral-700 pl-2">
                      {results.additionalTests.map((test, index) => (
                        <li key={index}>{test}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 text-sm text-neutral-700">
                  <p className="font-medium mb-1">AI Analysis Disclaimer:</p>
                  <p>{results.disclaimer}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SymptomAnalyzer