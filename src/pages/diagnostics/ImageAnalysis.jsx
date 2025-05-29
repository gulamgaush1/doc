import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaUpload, FaImage, FaCheck, FaTimes, FaFilePdf, FaShareAlt, FaSave } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { AI_IMAGE_ANALYSIS_ENDPOINT } from '../../config/constants'

function ImageAnalysis() {
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState(null)
  const [imageType, setImageType] = useState('xray')
  const [bodyPart, setBodyPart] = useState('chest')
  
  const imageTypes = [
    { id: 'xray', label: 'X-Ray' },
    { id: 'ct', label: 'CT Scan' },
    { id: 'mri', label: 'MRI' },
    { id: 'ultrasound', label: 'Ultrasound' },
    { id: 'dermatology', label: 'Dermatology' }
  ]
  
  const bodyParts = [
    { id: 'chest', label: 'Chest' },
    { id: 'brain', label: 'Brain' },
    { id: 'abdomen', label: 'Abdomen' },
    { id: 'musculoskeletal', label: 'Musculoskeletal' },
    { id: 'skin', label: 'Skin' }
  ]
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      
      // Check file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/dicom']
      if (!validTypes.includes(file.type)) {
        toast.error('Please select a valid image file (JPEG, PNG, GIF, DICOM)')
        return
      }
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB')
        return
      }
      
      setSelectedFile(file)
      
      // Create preview URL
      const reader = new FileReader()
      reader.onload = () => setPreviewUrl(reader.result)
      reader.readAsDataURL(file)
      
      // Clear previous results
      setResults(null)
    }
  }
  
  const handleDragOver = (e) => {
    e.preventDefault()
  }
  
  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      
      // Check file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/dicom']
      if (!validTypes.includes(file.type)) {
        toast.error('Please select a valid image file (JPEG, PNG, GIF, DICOM)')
        return
      }
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB')
        return
      }
      
      setSelectedFile(file)
      
      // Create preview URL
      const reader = new FileReader()
      reader.onload = () => setPreviewUrl(reader.result)
      reader.readAsDataURL(file)
      
      // Clear previous results
      setResults(null)
    }
  }
  
  const handleAnalyzeImage = async () => {
    if (!selectedFile) {
      toast.error('Please upload an image first')
      return
    }
    
    setIsAnalyzing(true)
    
    try {
      // In a real app, you would upload the file and send it to your AI service
      // const formData = new FormData()
      // formData.append('image', selectedFile)
      // formData.append('imageType', imageType)
      // formData.append('bodyPart', bodyPart)
      
      // const response = await axios.post(AI_IMAGE_ANALYSIS_ENDPOINT, formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // })
      // setResults(response.data)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Mock response data
      const mockResults = {
        findings: [
          {
            region: 'Right Upper Lobe',
            observation: 'Small nodular opacity',
            significance: 'Moderate',
            details: 'Approximately 1.2cm nodular opacity observed in the right upper lobe, with irregular margins'
          },
          {
            region: 'Left Lower Lobe',
            observation: 'Mild interstitial changes',
            significance: 'Low',
            details: 'Subtle reticular pattern observed, possibly representing minor inflammatory changes or early fibrotic changes'
          },
          {
            region: 'Hilar Regions',
            observation: 'No significant lymphadenopathy',
            significance: 'Normal',
            details: 'Hilar structures appear normal in size and density'
          }
        ],
        impression: 'Right upper lobe nodular opacity that requires further evaluation. Consider follow-up CT scan for better characterization. Mild interstitial changes in the left lower lobe, likely representing minor inflammatory changes.',
        recommendations: [
          'Follow-up chest CT scan recommended within 2 weeks',
          'Clinical correlation with patient symptoms and history',
          'Consider pulmonary function tests if patient reports respiratory symptoms',
          'Follow-up imaging in 3-6 months to assess for any changes'
        ],
        confidenceScore: 78,
        heatmapUrl: 'https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg', // Example heatmap image
        disclaimer: 'This analysis is provided by AI assistance and should be reviewed by a qualified healthcare professional. The results are not a definitive diagnosis and should be interpreted in the context of clinical findings.'
      }
      
      setResults(mockResults)
      toast.success('Image analysis complete')
    } catch (error) {
      console.error('Error analyzing image:', error)
      toast.error('Failed to analyze image. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }
  
  const resetAnalysis = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setResults(null)
    setImageType('xray')
    setBodyPart('chest')
  }
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex items-center">
        <button 
          onClick={() => navigate('/diagnostic-tools')}
          className="mr-2 p-1 rounded-full hover:bg-neutral-100"
        >
          <FaArrowLeft className="text-neutral-700" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Medical Image Analysis</h1>
          <p className="text-neutral-600">Upload medical images for AI-assisted interpretation</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload and Preview Section */}
        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          <div className="bg-secondary-50 px-6 py-4 border-b border-secondary-100">
            <h2 className="text-lg font-semibold text-secondary-800">
              {results ? 'Image Review' : 'Upload Medical Image'}
            </h2>
          </div>
          
          <div className="p-6">
            {!previewUrl ? (
              <div 
                className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <FaImage className="h-16 w-16 mx-auto text-neutral-400 mb-4" />
                <p className="text-neutral-800 font-medium mb-2">Drag and drop your medical image here</p>
                <p className="text-neutral-500 text-sm mb-4">or</p>
                <label className="btn btn-secondary cursor-pointer">
                  <FaUpload className="mr-2" />
                  Select Image File
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,.dcm"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="mt-4 text-xs text-neutral-500">
                  Supported formats: JPEG, PNG, GIF, DICOM • Max size: 5MB
                </p>
              </div>
            ) : (
              <div>
                <div className="relative">
                  <img 
                    src={previewUrl} 
                    alt="Medical image preview" 
                    className="w-full h-auto max-h-96 object-contain rounded-lg border border-neutral-200" 
                  />
                  
                  {!results && (
                    <button 
                      onClick={() => {
                        setSelectedFile(null)
                        setPreviewUrl(null)
                      }}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm text-neutral-700 hover:text-error-600"
                    >
                      <FaTimes className="h-4 w-4" />
                    </button>
                  )}
                </div>
                
                {!results && (
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Image Type</label>
                      <select
                        className="form-input"
                        value={imageType}
                        onChange={(e) => setImageType(e.target.value)}
                      >
                        {imageTypes.map(type => (
                          <option key={type.id} value={type.id}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="form-label">Body Region</label>
                      <select
                        className="form-input"
                        value={bodyPart}
                        onChange={(e) => setBodyPart(e.target.value)}
                      >
                        {bodyParts.map(part => (
                          <option key={part.id} value={part.id}>{part.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                
                {!results && (
                  <button
                    onClick={handleAnalyzeImage}
                    disabled={isAnalyzing}
                    className="mt-4 btn btn-secondary w-full flex items-center justify-center"
                  >
                    {isAnalyzing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                          <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing Image...
                      </>
                    ) : (
                      <>
                        <FaImage className="mr-2" />
                        Analyze Image
                      </>
                    )}
                  </button>
                )}
                
                {results && (
                  <div className="mt-4 flex justify-between">
                    <button onClick={resetAnalysis} className="btn btn-outline text-sm py-1">
                      Upload New Image
                    </button>
                    <div className="flex space-x-2">
                      <button className="btn btn-outline text-sm py-1 flex items-center">
                        <FaFilePdf className="mr-1" /> PDF
                      </button>
                      <button className="btn btn-secondary text-sm py-1 flex items-center">
                        <FaSave className="mr-1" /> Save to Records
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Results Section */}
        {results && (
          <div className="bg-white rounded-lg shadow-card overflow-hidden">
            <div className="bg-secondary-50 px-6 py-4 border-b border-secondary-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-secondary-800">Analysis Results</h2>
              <div className="flex items-center">
                <div className="text-sm font-medium text-secondary-800 mr-2">Confidence:</div>
                <div className="bg-white px-2 py-0.5 rounded-full text-sm font-medium">
                  {results.confidenceScore}%
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {results.findings.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-md font-medium text-neutral-800 mb-3">Key Findings</h3>
                  <div className="space-y-3">
                    {results.findings.map((finding, index) => (
                      <div key={index} className="p-3 border rounded-md">
                        <div className="flex justify-between items-start">
                          <div className="font-medium">{finding.region}</div>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            finding.significance === 'High' ? 'bg-error-100 text-error-800' :
                            finding.significance === 'Moderate' ? 'bg-warning-100 text-warning-800' :
                            finding.significance === 'Low' ? 'bg-primary-100 text-primary-800' :
                            'bg-accent-100 text-accent-800'
                          }`}>
                            {finding.significance}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{finding.observation}</p>
                        <p className="text-xs text-neutral-500 mt-1">{finding.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-md font-medium text-neutral-800 mb-3">Impression</h3>
                <div className="p-3 bg-neutral-50 border rounded-md text-sm">
                  {results.impression}
                </div>
              </div>
              
              {results.recommendations && (
                <div className="mb-6">
                  <h3 className="text-md font-medium text-neutral-800 mb-3">Recommendations</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm pl-2">
                    {results.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="p-3 border border-neutral-200 rounded-md text-xs text-neutral-500 italic">
                {results.disclaimer}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageAnalysis