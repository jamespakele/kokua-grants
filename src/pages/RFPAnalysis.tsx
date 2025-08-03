import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText, Calendar, DollarSign, Target, CheckCircle, ArrowRight } from 'lucide-react'
import { useRFPAnalysis } from '../hooks/useRFPAnalysis'

export default function RFPAnalysis() {
  const navigate = useNavigate()
  const { analysis, isAnalyzing, error, analyzeRFP } = useRFPAnalysis()
  const [fileName, setFileName] = useState<string>('')

  useEffect(() => {
    // In a real app, you'd get the file from the previous step
    // For demo purposes, we'll simulate it
    const mockFile = new File([''], 'Hawaii_Environmental_Grant_RFP_2025.pdf', { type: 'application/pdf' })
    setFileName(mockFile.name)
    analyzeRFP(mockFile)
  }, [])

  const handleStartApplication = () => {
    // TODO: Navigate to application creation with RFP context
    console.log('Starting application with RFP analysis')
  }

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-ocean-600 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Your RFP</h2>
          <p className="text-gray-600 mb-4">
            Our AI is reading through the document and identifying key requirements, deadlines, and focus areas.
          </p>
          <div className="text-sm text-gray-500">
            This usually takes 30-60 seconds...
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Analysis Failed</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/applications/new?type=rfp')}
            className="bg-ocean-600 text-white px-6 py-2 rounded-lg hover:bg-ocean-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No analysis available.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/applications/new?type=rfp')}
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            <h1 className="text-xl font-semibold text-gray-900">RFP Analysis</h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600 mr-4" />
            <div>
              <h2 className="text-xl font-bold text-green-800">Analysis Complete!</h2>
              <p className="text-green-700 mt-1">
                We've successfully analyzed <span className="font-medium">{fileName}</span> and extracted key information to help you create a strong application.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Key Details */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 text-ocean-600 mr-2" />
                Important Dates
              </h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-600">Application Deadline:</span>
                  <p className="text-gray-900">{analysis.deadline}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                Funding Amount
              </h3>
              <p className="text-2xl font-bold text-green-600">{analysis.funding_amount}</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="w-5 h-5 text-purple-600 mr-2" />
                Focus Areas
              </h3>
              <div className="space-y-2">
                {analysis.focus_areas.map((area, index) => (
                  <span
                    key={index}
                    className="inline-block bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Requirements & Sections */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Requirements</h3>
              <div className="space-y-3">
                {analysis.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{requirement}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Application Sections</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {analysis.key_sections.map((section, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <FileText className="w-4 h-4 text-gray-500 mr-3" />
                    <span className="text-gray-700">{section}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-ocean-50 border border-ocean-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-ocean-800">Ready to Start Your Application?</h3>
                  <p className="text-ocean-700 mt-1">
                    We'll use this analysis to create a customized application template just for you.
                  </p>
                </div>
                <button
                  onClick={handleStartApplication}
                  className="bg-ocean-600 text-white px-6 py-3 rounded-lg hover:bg-ocean-700 transition-colors flex items-center"
                >
                  Start Application
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}