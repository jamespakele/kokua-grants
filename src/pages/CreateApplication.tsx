import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, FileText, Wand2 } from 'lucide-react'
import FileUpload from '../components/FileUpload'
import { useRFPAnalysis } from '../hooks/useRFPAnalysis'

export default function CreateApplication() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const applicationType = searchParams.get('type') // 'rfp' or 'template'
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const { isAnalyzing, analyzeRFP } = useRFPAnalysis()

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setUploadError(null)
    // TODO: Upload file to Supabase storage
    console.log('File selected:', file.name)
  }

  const handleFileRemove = () => {
    setSelectedFile(null)
    setUploadError(null)
  }

  const handleContinue = async () => {
    if (applicationType === 'rfp' && selectedFile) {
      try {
        await analyzeRFP(selectedFile)
        navigate('/applications/rfp-analysis')
      } catch (error) {
        setUploadError('Failed to analyze RFP. Please try again.')
      }
    } else if (applicationType === 'template') {
      navigate('/applications/template-selection')
    }
  }

  const renderRFPUpload = () => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mb-4">
          <Upload className="w-8 h-8 text-ocean-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Upload Your RFP Document
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload the Request for Proposals (RFP) document from the funder. 
          Our AI will analyze the requirements and help you create a tailored response.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <FileUpload
          onFileSelect={handleFileSelect}
          onFileRemove={handleFileRemove}
          uploadedFile={selectedFile}
          isUploading={isAnalyzing}
          error={uploadError}
        />
      </div>

      {selectedFile && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-ocean-50 border border-ocean-200 rounded-lg p-6">
            <div className="flex items-start">
              <Wand2 className="w-6 h-6 text-ocean-600 mt-1 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-ocean-800 mb-2">
                  What happens next?
                </h3>
                <ul className="text-ocean-700 space-y-1">
                  <li>• We'll analyze your RFP to identify key requirements</li>
                  <li>• Extract important dates, funding amounts, and focus areas</li>
                  <li>• Create a customized application outline just for you</li>
                  <li>• Pre-fill sections with your organization's information</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderTemplateSelection = () => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-sand-100 rounded-full flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-sand-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Choose a Grant Template
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Start with a proven template designed for Hawaii organizations. 
          We'll help you customize it with your specific information and goals.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Template options will go here */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-ocean-300 hover:shadow-sm transition-all cursor-pointer">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Environmental Conservation
            </h3>
            <p className="text-gray-600 text-sm">
              Perfect for conservation projects, environmental education, and sustainability initiatives.
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-ocean-300 hover:shadow-sm transition-all cursor-pointer">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Community Development
            </h3>
            <p className="text-gray-600 text-sm">
              Ideal for community programs, social services, and local development projects.
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-ocean-300 hover:shadow-sm transition-all cursor-pointer">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎓</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Education & Youth
            </h3>
            <p className="text-gray-600 text-sm">
              Great for educational programs, youth development, and scholarship initiatives.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Create Grant Application</h1>
            <div></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {applicationType === 'rfp' ? renderRFPUpload() : renderTemplateSelection()}

        {/* Continue Button */}
        {((applicationType === 'rfp' && selectedFile) || applicationType === 'template') && (
          <div className="max-w-2xl mx-auto pt-8">
            <button
              onClick={handleContinue}
              disabled={isAnalyzing}
              className="w-full bg-ocean-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-ocean-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isAnalyzing ? 'Analyzing...' : applicationType === 'rfp' ? 'Analyze RFP' : 'Choose Template'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}