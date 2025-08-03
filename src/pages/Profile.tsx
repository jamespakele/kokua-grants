import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Save, User, Building, DollarSign, FileText } from 'lucide-react'
import { useOrganization } from '../hooks/useOrganization'

interface ProfileFormData {
  name: string
  mission: string
  contact_email: string
  contact_phone?: string
  is_501c3: boolean
  tax_id?: string
  annual_revenue?: number
  annual_expenses?: number
}

export default function Profile() {
  const { organization, updateOrganization, loading } = useOrganization()
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<ProfileFormData>()

  useEffect(() => {
    if (organization) {
      reset({
        name: organization.name,
        mission: organization.mission,
        contact_email: organization.contact_email,
        contact_phone: organization.contact_phone || '',
        is_501c3: organization.is_501c3,
        tax_id: organization.tax_id || '',
        annual_revenue: organization.annual_revenue || undefined,
        annual_expenses: organization.annual_expenses || undefined
      })
    }
  }, [organization, reset])

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsSaving(true)
      setSaveMessage(null)

      // Filter out empty strings for optional fields
      const updateData = {
        ...data,
        contact_phone: data.contact_phone || undefined,
        tax_id: data.tax_id || undefined,
        annual_revenue: data.annual_revenue || undefined,
        annual_expenses: data.annual_expenses || undefined
      }

      await updateOrganization(updateData)
      setSaveMessage('Profile updated successfully! 🌺')
      
      // Clear the success message after 3 seconds
      setTimeout(() => setSaveMessage(null), 3000)
    } catch (error) {
      console.error('Failed to update profile:', error)
      setSaveMessage('Failed to update profile. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!organization) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No organization profile found.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-ocean-600 to-ocean-700 rounded-lg p-8 text-white">
        <div className="flex items-center">
          <Building className="w-8 h-8 mr-4" />
          <div>
            <h1 className="text-3xl font-bold">Organization Profile</h1>
            <p className="text-ocean-100 mt-2">
              Keep your information current to help us create better grant applications
            </p>
          </div>
        </div>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className={`p-4 rounded-lg ${
          saveMessage.includes('successfully') 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {saveMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <User className="w-5 h-5 text-ocean-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Organization Name *
              </label>
              <input
                {...register('name', { required: 'Organization name is required' })}
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="mission" className="block text-sm font-medium text-gray-700 mb-2">
                Mission Statement *
              </label>
              <textarea
                {...register('mission', { required: 'Mission statement is required' })}
                id="mission"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
              />
              {errors.mission && (
                <p className="mt-1 text-sm text-red-600">{errors.mission.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <FileText className="w-5 h-5 text-ocean-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email *
              </label>
              <input
                {...register('contact_email', { 
                  required: 'Contact email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                id="contact_email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
              />
              {errors.contact_email && (
                <p className="mt-1 text-sm text-red-600">{errors.contact_email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700 mb-2">
                Contact Phone
              </label>
              <input
                {...register('contact_phone')}
                type="tel"
                id="contact_phone"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
              />
            </div>
          </div>
        </div>

        {/* Legal & Financial Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <DollarSign className="w-5 h-5 text-ocean-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Legal & Financial Information</h2>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center mb-4">
                <input
                  {...register('is_501c3')}
                  type="checkbox"
                  id="is_501c3"
                  className="h-4 w-4 text-ocean-600 focus:ring-ocean-500 border-gray-300 rounded"
                />
                <label htmlFor="is_501c3" className="ml-2 block text-sm text-gray-700">
                  We are a 501(c)(3) tax-exempt organization
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="tax_id" className="block text-sm font-medium text-gray-700 mb-2">
                Tax ID / EIN
              </label>
              <input
                {...register('tax_id')}
                type="text"
                id="tax_id"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                placeholder="12-3456789"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="annual_revenue" className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Revenue
                </label>
                <input
                  {...register('annual_revenue', { valueAsNumber: true })}
                  type="number"
                  id="annual_revenue"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                  placeholder="50000"
                />
              </div>

              <div>
                <label htmlFor="annual_expenses" className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Expenses
                </label>
                <input
                  {...register('annual_expenses', { valueAsNumber: true })}
                  type="number"
                  id="annual_expenses"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                  placeholder="45000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving || !isDirty}
            className="inline-flex items-center px-6 py-3 bg-ocean-600 text-white rounded-lg text-sm font-medium hover:bg-ocean-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}