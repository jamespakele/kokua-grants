import { useState, useRef } from 'react'
import { Upload, File, X, AlertCircle, CheckCircle } from 'lucide-react'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  onFileRemove?: () => void
  acceptedTypes?: string[]
  maxSizeInMB?: number
  uploadedFile?: File | null
  isUploading?: boolean
  error?: string | null
  className?: string
}

export default function FileUpload({
  onFileSelect,
  onFileRemove,
  acceptedTypes = ['.pdf', '.docx', '.doc'],
  maxSizeInMB = 10,
  uploadedFile,
  isUploading = false,
  error,
  className = ''
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0])
    }
  }

  const handleFileSelection = (file: File) => {
    // Check file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!acceptedTypes.includes(fileExtension)) {
      return
    }

    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024)
    if (fileSizeInMB > maxSizeInMB) {
      return
    }

    onFileSelect(file)
  }

  const openFileExplorer = () => {
    inputRef.current?.click()
  }

  const removeFile = () => {
    if (onFileRemove) {
      onFileRemove()
    }
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className={`w-full ${className}`}>
      <input
        ref={inputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleChange}
        className="hidden"
      />

      {!uploadedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-ocean-500 bg-ocean-50'
              : error
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center">
            <Upload className={`w-12 h-12 mb-4 ${
              error ? 'text-red-400' : 'text-gray-400'
            }`} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Upload your RFP document
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop your file here, or{' '}
              <button
                type="button"
                onClick={openFileExplorer}
                className="text-ocean-600 hover:text-ocean-700 font-medium"
              >
                browse
              </button>
            </p>
            <p className="text-sm text-gray-500">
              Supported formats: {acceptedTypes.join(', ')} • Max size: {maxSizeInMB}MB
            </p>
          </div>

          {error && (
            <div className="mt-4 flex items-center justify-center text-red-600">
              <AlertCircle className="w-4 h-4 mr-2" />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {isUploading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-ocean-600"></div>
                ) : (
                  <File className="w-6 h-6 text-ocean-600" />
                )}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {uploadedFile.name}
                </p>
                <p className="text-sm text-gray-500">
                  {formatFileSize(uploadedFile.size)}
                  {isUploading && ' • Uploading...'}
                </p>
              </div>
            </div>
            {!isUploading && (
              <button
                type="button"
                onClick={removeFile}
                className="ml-3 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {isUploading && (
            <div className="mt-3">
              <div className="bg-gray-200 rounded-full h-2">
                <div className="bg-ocean-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          )}

          {!isUploading && !error && (
            <div className="mt-2 flex items-center text-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              <span className="text-sm">File uploaded successfully</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}