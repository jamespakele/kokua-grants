import type { RFPAnalysis } from '../types'

// Mock implementation - in production, this would integrate with OpenAI, Claude, or similar
export class AIService {
  static async parseRFPDocument(file: File): Promise<RFPAnalysis> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock analysis based on file name for demo purposes
    const fileName = file.name.toLowerCase()
    
    if (fileName.includes('environmental') || fileName.includes('conservation')) {
      return this.getMockEnvironmentalRFP()
    } else if (fileName.includes('education') || fileName.includes('youth')) {
      return this.getMockEducationRFP()
    } else {
      return this.getMockGeneralRFP()
    }
  }

  private static getMockEnvironmentalRFP(): RFPAnalysis {
    return {
      requirements: [
        'Must be a 501(c)(3) nonprofit organization',
        'Project must focus on environmental conservation in Hawaii',
        'Must demonstrate community impact and engagement',
        'Required to provide detailed budget breakdown',
        'Must include project timeline with milestones',
        'Need letters of support from community partners',
        'Must address sustainability of the project beyond funding period'
      ],
      deadline: 'March 15, 2025',
      funding_amount: '$25,000 - $75,000',
      focus_areas: [
        'Marine conservation',
        'Native species protection',
        'Environmental education',
        'Community engagement',
        'Habitat restoration'
      ],
      key_sections: [
        'Project Description',
        'Statement of Need',
        'Goals and Objectives',
        'Methodology and Approach',
        'Budget and Budget Narrative',
        'Evaluation Plan',
        'Organizational Capacity',
        'Sustainability Plan'
      ]
    }
  }

  private static getMockEducationRFP(): RFPAnalysis {
    return {
      requirements: [
        'Must serve K-12 students in Hawaii',
        'Focus on STEM education and career readiness',
        'Must demonstrate measurable learning outcomes',
        'Required to show partnership with local schools',
        'Need qualified instructional staff',
        'Must provide program evaluation metrics',
        'Required to serve underrepresented populations'
      ],
      deadline: 'April 30, 2025',
      funding_amount: '$15,000 - $50,000',
      focus_areas: [
        'STEM education',
        'Career readiness',
        'Youth development',
        'Educational equity',
        'Technology access'
      ],
      key_sections: [
        'Program Overview',
        'Statement of Need',
        'Target Population',
        'Program Goals and Objectives',
        'Curriculum and Activities',
        'Budget',
        'Evaluation and Assessment',
        'Staff Qualifications',
        'Community Partnerships'
      ]
    }
  }

  private static getMockGeneralRFP(): RFPAnalysis {
    return {
      requirements: [
        'Must be a registered nonprofit organization',
        'Project must serve Hawaii communities',
        'Demonstrate clear community need',
        'Provide detailed project plan and timeline',
        'Include comprehensive budget',
        'Show organizational capacity',
        'Must include evaluation plan'
      ],
      deadline: 'May 1, 2025',
      funding_amount: '$10,000 - $30,000',
      focus_areas: [
        'Community development',
        'Social services',
        'Capacity building',
        'Direct service delivery',
        'Program sustainability'
      ],
      key_sections: [
        'Executive Summary',
        'Statement of Need',
        'Project Description',
        'Goals and Objectives',
        'Methods',
        'Budget',
        'Evaluation',
        'Organization Information'
      ]
    }
  }

  // In production, this would upload to a cloud storage service
  static async uploadFile(file: File): Promise<string> {
    // Simulate file upload
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Return mock URL - in production this would be a real storage URL
    return `https://storage.supabase.co/kokua-grants/rfp-files/${Date.now()}-${file.name}`
  }

  // Helper function to extract text from PDF/DOCX files
  // In production, this would use libraries like pdf-parse or mammoth
  static async extractTextFromFile(file: File): Promise<string> {
    // Mock text extraction
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return `Extracted text from ${file.name}. This would contain the actual document content in a production environment.`
  }
}