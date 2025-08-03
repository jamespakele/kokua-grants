import { useState } from 'react'
import { AIService } from '../services/aiService'
import type { RFPAnalysis } from '../types'

export function useRFPAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<RFPAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null)

  const analyzeRFP = async (file: File) => {
    try {
      setIsAnalyzing(true)
      setError(null)

      // First upload the file
      const fileUrl = await AIService.uploadFile(file)
      setUploadedFileUrl(fileUrl)

      // Then analyze the RFP
      const rfpAnalysis = await AIService.parseRFPDocument(file)
      setAnalysis(rfpAnalysis)

      return { analysis: rfpAnalysis, fileUrl }
    } catch (err) {
      console.error('RFP analysis failed:', err)
      setError(err instanceof Error ? err.message : 'Failed to analyze RFP')
      throw err
    } finally {
      setIsAnalyzing(false)
    }
  }

  const clearAnalysis = () => {
    setAnalysis(null)
    setError(null)
    setUploadedFileUrl(null)
  }

  return {
    isAnalyzing,
    analysis,
    error,
    uploadedFileUrl,
    analyzeRFP,
    clearAnalysis
  }
}