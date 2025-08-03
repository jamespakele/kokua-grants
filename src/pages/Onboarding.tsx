import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ChevronRight, ChevronLeft, Check, Save } from 'lucide-react'
import { useOrganization } from '../hooks/useOrganization'

interface OnboardingData {
  // Basic Info
  name: string
  mission: string
  
  // Contact Info
  contact_email: string
  contact_phone?: string
  
  // Legal & Financial
  is_501c3: boolean
  tax_id?: string
  annual_revenue?: number
  annual_expenses?: number
}

const steps = [
  { id: 1, title: 'Basic Information', description: 'Tell us about your organization' },
  { id: 2, title: 'Contact Details', description: 'How can funders reach you?' },
  { id: 3, title: 'Legal & Financial', description: 'Important details for grants' },
  { id: 4, title: 'Review', description: 'Confirm your information' }
]

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const { createOrganization } = useOrganization()
  const navigate = useNavigate()

  const { register, handleSubmit, watch, formState: { errors }, trigger, setValue } = useForm<OnboardingData>({
    defaultValues: {
      is_501c3: false
    }
  })

  const formData = watch()

  // Load saved draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('onboarding-draft')
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft)
        Object.keys(parsedDraft.data).forEach((key) => {
          setValue(key as keyof OnboardingData, parsedDraft.data[key])
        })
        setCurrentStep(parsedDraft.step || 1)
        setLastSaved(new Date(parsedDraft.timestamp))
      } catch (error) {
        console.error('Failed to load saved draft:', error)
      }
    }
  }, [setValue])

  // Autosave to localStorage whenever form data changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const draftData = {
        data: formData,
        step: currentStep,
        timestamp: new Date().toISOString()
      }
      localStorage.setItem('onboarding-draft', JSON.stringify(draftData))
      setLastSaved(new Date())
    }, 1000) // Save after 1 second of inactivity

    return () => clearTimeout(timeoutId)
  }, [formData, currentStep])

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep)
    const isValid = await trigger(fieldsToValidate)
    
    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getFieldsForStep = (step: number): (keyof OnboardingData)[] => {
    switch (step) {
      case 1:
        return ['name', 'mission']
      case 2:
        return ['contact_email']
      case 3:
        return ['is_501c3']
      default:
        return []
    }
  }

  const onSubmit = async (data: OnboardingData) => {
    try {
      setIsSubmitting(true)
      await createOrganization(data)
      
      // Clear the saved draft on successful submission
      localStorage.removeItem('onboarding-draft')
      
      navigate('/')
    } catch (error) {
      console.error('Failed to create organization:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Organization Name *
              </label>
              <input
                {...register('name', { required: 'Organization name is required' })}
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                placeholder="e.g., Hawaii Ocean Conservation Society"
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
                placeholder="Describe your organization's mission and the impact you're working to achieve..."
              />
              {errors.mission && (
                <p className="mt-1 text-sm text-red-600">{errors.mission.message}</p>
              )}
            </div>
          </>
        )

      case 2:
        return (
          <>
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
                placeholder="contact@yourorganization.org"
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
                placeholder="(808) 555-0123"
              />
            </div>
          </>
        )

      case 3:
        return (
          <>
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
              <p className="text-sm text-gray-600">
                This designation is important for many grant opportunities. If you're unsure, you can update this later.
              </p>
            </div>

            <div>
              <label htmlFor="tax_id" className="block text-sm font-medium text-gray-700 mb-2">
                Tax ID / EIN (Optional)
              </label>
              <input
                {...register('tax_id')}
                type="text"
                id="tax_id"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                placeholder="12-3456789"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="annual_revenue" className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Revenue (Optional)
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
                  Annual Expenses (Optional)
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
          </>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-ocean-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-ocean-800 mb-4">Review Your Information</h3>
              
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-600">Organization Name</dt>
                  <dd className="text-gray-900">{formData.name}</dd>
                </div>
                
                <div>
                  <dt className="text-sm font-medium text-gray-600">Mission</dt>
                  <dd className="text-gray-900">{formData.mission}</dd>
                </div>
                
                <div>
                  <dt className="text-sm font-medium text-gray-600">Contact Email</dt>
                  <dd className="text-gray-900">{formData.contact_email}</dd>
                </div>
                
                {formData.contact_phone && (
                  <div>
                    <dt className="text-sm font-medium text-gray-600">Contact Phone</dt>
                    <dd className="text-gray-900">{formData.contact_phone}</dd>
                  </div>
                )}
                
                <div>
                  <dt className="text-sm font-medium text-gray-600">501(c)(3) Status</dt>
                  <dd className="text-gray-900">{formData.is_501c3 ? 'Yes' : 'No'}</dd>
                </div>
              </dl>
            </div>
            
            <p className="text-sm text-gray-600">
              You can always update this information later from your profile page. 
              Click "Complete Setup" to start creating grant applications! 🌺
            </p>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 to-sand-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ocean-700 mb-2">Welcome to Kokua Grants!</h1>
          <p className="text-lg text-gray-600">
            Let's set up your organization profile so we can help you create amazing grant applications.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium ${
                  currentStep >= step.id 
                    ? 'bg-ocean-600 border-ocean-600 text-white' 
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    currentStep > step.id ? 'bg-ocean-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold text-gray-900">{steps[currentStep - 1].title}</h2>
            <p className="text-gray-600">{steps[currentStep - 1].description}</p>
            {lastSaved && (
              <div className="mt-2 flex items-center justify-center text-sm text-gray-500">
                <Save className="w-3 h-3 mr-1" />
                Draft saved {lastSaved.toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium ${
                  currentStep === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-50'
                } transition-colors`}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center px-6 py-2 bg-ocean-600 text-white rounded-lg text-sm font-medium hover:bg-ocean-700 transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-6 py-2 bg-ocean-600 text-white rounded-lg text-sm font-medium hover:bg-ocean-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Setting up...' : 'Complete Setup'}
                  <Check className="w-4 h-4 ml-2" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}