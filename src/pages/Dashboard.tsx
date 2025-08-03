import { Link } from 'react-router-dom'
import { Plus, FileText, Upload } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-ocean-600 to-ocean-700 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-4">Aloha! Welcome to Kokua Grants</h1>
        <p className="text-ocean-100 text-lg">
          Your friendly companion for creating strong grant applications. 
          Let's help your organization secure the funding it deserves.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Quick Start</h2>
            <Plus className="w-6 h-6 text-ocean-600" />
          </div>
          <p className="text-gray-600 mb-6">
            Ready to create your first grant application? Choose how you'd like to begin.
          </p>
          <div className="space-y-3">
            <Link
              to="/applications/new?type=rfp"
              className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-ocean-300 hover:bg-ocean-50 transition-colors"
            >
              <Upload className="w-5 h-5 text-ocean-600 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900">Upload an RFP</h3>
                <p className="text-sm text-gray-600">Have a specific grant opportunity? Upload the RFP and we'll help you respond.</p>
              </div>
            </Link>
            <Link
              to="/applications/new?type=template"
              className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-ocean-300 hover:bg-ocean-50 transition-colors"
            >
              <FileText className="w-5 h-5 text-ocean-600 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900">Use a Template</h3>
                <p className="text-sm text-gray-600">Start with a proven grant template that works for Hawaii organizations.</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Applications</h2>
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No applications yet</p>
            <p className="text-sm mt-2">Your grant applications will appear here once you create them.</p>
          </div>
        </div>
      </div>
    </div>
  )
}