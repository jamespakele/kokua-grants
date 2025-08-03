import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, BarChart3, ArrowRight } from 'lucide-react'
import { GRANT_TEMPLATES } from '../types/templates'

export default function TemplateSelection() {
  const navigate = useNavigate()

  const handleTemplateSelect = (templateId: string) => {
    navigate(`/applications/create?template=${templateId}`)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800'
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'Advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/applications/new?type=template')}
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Choose Your Grant Template</h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Introduction */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Start with a Proven Template
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our templates are designed specifically for Hawaii nonprofits and have been successful 
            in securing funding. Choose the one that best matches your project type.
          </p>
        </div>

        {/* Template Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GRANT_TEMPLATES.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:border-ocean-300 hover:shadow-md transition-all cursor-pointer group"
              onClick={() => handleTemplateSelect(template.id)}
            >
              <div className="p-6">
                {/* Template Icon & Title */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-ocean-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-ocean-200 transition-colors">
                    <span className="text-3xl">{template.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {template.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {template.description}
                  </p>
                </div>

                {/* Template Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {template.estimatedTime}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                      {template.difficulty}
                    </span>
                  </div>

                  <div className="flex items-start">
                    <BarChart3 className="w-4 h-4 mr-2 mt-0.5 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      <div className="font-medium mb-1">Focus Areas:</div>
                      <div className="space-y-1">
                        {template.focusAreas.slice(0, 3).map((area, index) => (
                          <div key={index} className="text-xs">• {area}</div>
                        ))}
                        {template.focusAreas.length > 3 && (
                          <div className="text-xs text-gray-500">
                            +{template.focusAreas.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{template.sections.length} sections</span> to complete
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button className="w-full bg-ocean-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-ocean-700 transition-colors flex items-center justify-center group-hover:bg-ocean-700">
                    Use This Template
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Help */}
        <div className="mt-16 bg-sand-50 border border-sand-200 rounded-lg p-8 text-center">
          <h3 className="text-lg font-semibold text-sand-800 mb-3">
            Need Help Choosing?
          </h3>
          <p className="text-sand-700 mb-4">
            Not sure which template is right for your project? All templates can be customized 
            to fit your specific needs, and you can always switch sections around.
          </p>
          <p className="text-sm text-sand-600">
            <strong>Pro tip:</strong> Start with the template that's closest to your project type - 
            you can always modify it as you go!
          </p>
        </div>
      </div>
    </div>
  )
}