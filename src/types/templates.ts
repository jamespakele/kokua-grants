export interface GrantTemplate {
  id: string
  title: string
  description: string
  category: string
  icon: string
  focusAreas: string[]
  sections: TemplateSection[]
  estimatedTime: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
}

export interface TemplateSection {
  id: string
  title: string
  description: string
  placeholder: string
  required: boolean
  maxLength?: number
  fieldType: 'text' | 'textarea' | 'number' | 'date' | 'select'
  options?: string[]
  helpText?: string
}

export const GRANT_TEMPLATES: GrantTemplate[] = [
  {
    id: 'environmental-conservation',
    title: 'Environmental Conservation',
    description: 'Perfect for conservation projects, environmental education, and sustainability initiatives.',
    category: 'Environment',
    icon: '🌱',
    focusAreas: ['Marine conservation', 'Native species protection', 'Environmental education', 'Habitat restoration'],
    estimatedTime: '2-3 hours',
    difficulty: 'Intermediate',
    sections: [
      {
        id: 'project-summary',
        title: 'Project Summary',
        description: 'Brief overview of your conservation project',
        placeholder: 'Provide a concise summary of your environmental conservation project, including the main objectives and expected impact...',
        required: true,
        maxLength: 500,
        fieldType: 'textarea',
        helpText: 'Keep this section engaging and focused on your project\'s environmental impact.'
      },
      {
        id: 'environmental-need',
        title: 'Environmental Need Statement',
        description: 'Describe the environmental issue your project addresses',
        placeholder: 'Describe the specific environmental challenge or need in your community that this project will address...',
        required: true,
        fieldType: 'textarea',
        helpText: 'Use data and evidence to support your case. Include local environmental concerns specific to Hawaii.'
      },
      {
        id: 'conservation-goals',
        title: 'Conservation Goals & Objectives',
        description: 'Specific, measurable goals for your project',
        placeholder: 'List 3-5 specific, measurable goals for your conservation project...',
        required: true,
        fieldType: 'textarea',
        helpText: 'Make goals SMART: Specific, Measurable, Achievable, Relevant, Time-bound.'
      },
      {
        id: 'project-activities',
        title: 'Project Activities & Methods',
        description: 'Detailed description of conservation activities',
        placeholder: 'Describe the specific conservation activities, methods, and approaches you will use...',
        required: true,
        fieldType: 'textarea'
      },
      {
        id: 'community-engagement',
        title: 'Community Engagement Plan',
        description: 'How you will involve the local community',
        placeholder: 'Explain how you will engage local communities in your conservation efforts...',
        required: true,
        fieldType: 'textarea',
        helpText: 'Community involvement is crucial for successful conservation projects in Hawaii.'
      },
      {
        id: 'project-timeline',
        title: 'Project Timeline',
        description: 'Timeline with key milestones',
        placeholder: 'Provide a detailed timeline with major milestones and deliverables...',
        required: true,
        fieldType: 'textarea'
      },
      {
        id: 'budget-amount',
        title: 'Total Project Budget',
        description: 'Total amount requested',
        placeholder: '25000',
        required: true,
        fieldType: 'number'
      },
      {
        id: 'sustainability-plan',
        title: 'Long-term Sustainability',
        description: 'How the project will continue beyond funding',
        placeholder: 'Describe how your conservation efforts will be sustained after the grant period...',
        required: true,
        fieldType: 'textarea',
        helpText: 'Funders want to see lasting impact beyond the grant period.'
      }
    ]
  },
  {
    id: 'community-development',
    title: 'Community Development',
    description: 'Ideal for community programs, social services, and local development projects.',
    category: 'Community',
    icon: '👥',
    focusAreas: ['Community building', 'Social services', 'Local development', 'Capacity building'],
    estimatedTime: '2-3 hours',
    difficulty: 'Beginner',
    sections: [
      {
        id: 'project-summary',
        title: 'Project Summary',
        description: 'Brief overview of your community development project',
        placeholder: 'Provide a concise summary of your community development project and its expected impact...',
        required: true,
        maxLength: 500,
        fieldType: 'textarea'
      },
      {
        id: 'community-need',
        title: 'Community Need Assessment',
        description: 'Describe the community need your project addresses',
        placeholder: 'Describe the specific community need or challenge that your project will address...',
        required: true,
        fieldType: 'textarea',
        helpText: 'Include demographic data and community input to support your assessment.'
      },
      {
        id: 'target-population',
        title: 'Target Population',
        description: 'Who will benefit from your project',
        placeholder: 'Describe the specific population that will benefit from your project...',
        required: true,
        fieldType: 'textarea'
      },
      {
        id: 'project-goals',
        title: 'Project Goals & Objectives',
        description: 'Specific, measurable goals for community impact',
        placeholder: 'List 3-5 specific, measurable goals for your community development project...',
        required: true,
        fieldType: 'textarea'
      },
      {
        id: 'program-activities',
        title: 'Program Activities & Services',
        description: 'Detailed description of programs and services',
        placeholder: 'Describe the specific programs, services, and activities you will provide...',
        required: true,
        fieldType: 'textarea'
      },
      {
        id: 'community-partnerships',
        title: 'Community Partnerships',
        description: 'Partner organizations and collaborations',
        placeholder: 'List the community organizations, agencies, or groups you will partner with...',
        required: false,
        fieldType: 'textarea',
        helpText: 'Partnerships strengthen community development projects.'
      },
      {
        id: 'project-timeline',
        title: 'Project Timeline',
        description: 'Timeline with key milestones',
        placeholder: 'Provide a detailed timeline with major milestones and deliverables...',
        required: true,
        fieldType: 'textarea'
      },
      {
        id: 'budget-amount',
        title: 'Total Project Budget',
        description: 'Total amount requested',
        placeholder: '20000',
        required: true,
        fieldType: 'number'
      },
      {
        id: 'impact-measurement',
        title: 'Impact Measurement Plan',
        description: 'How you will measure success',
        placeholder: 'Describe how you will measure and evaluate the impact of your community development project...',
        required: true,
        fieldType: 'textarea'
      }
    ]
  },
  {
    id: 'education-youth',
    title: 'Education & Youth Development',
    description: 'Great for educational programs, youth development, and scholarship initiatives.',
    category: 'Education',
    icon: '🎓',
    focusAreas: ['Youth development', 'Educational programs', 'Skills training', 'Mentorship'],
    estimatedTime: '3-4 hours',
    difficulty: 'Intermediate',
    sections: [
      {
        id: 'project-summary',
        title: 'Project Summary',
        description: 'Brief overview of your education/youth program',
        placeholder: 'Provide a concise summary of your educational or youth development program...',
        required: true,
        maxLength: 500,
        fieldType: 'textarea'
      },
      {
        id: 'educational-need',
        title: 'Educational Need Statement',
        description: 'Describe the educational gap your program addresses',
        placeholder: 'Describe the specific educational need or gap that your program will address...',
        required: true,
        fieldType: 'textarea',
        helpText: 'Include educational data and statistics to support your case.'
      },
      {
        id: 'target-students',
        title: 'Target Student Population',
        description: 'Demographics of students you will serve',
        placeholder: 'Describe the specific student population you will serve (age range, grade levels, demographics)...',
        required: true,
        fieldType: 'textarea'
      },
      {
        id: 'learning-objectives',
        title: 'Learning Objectives & Outcomes',
        description: 'Specific educational goals and expected outcomes',
        placeholder: 'List the specific learning objectives and expected educational outcomes...',
        required: true,
        fieldType: 'textarea',
        helpText: 'Make objectives measurable and aligned with educational standards.'
      },
      {
        id: 'curriculum-activities',
        title: 'Curriculum & Program Activities',
        description: 'Detailed description of educational activities',
        placeholder: 'Describe the curriculum, educational activities, and learning experiences you will provide...',
        required: true,
        fieldType: 'textarea'
      },
      {
        id: 'teaching-methods',
        title: 'Teaching Methods & Approach',
        description: 'Educational methodology and instructional approach',
        placeholder: 'Describe your teaching methods, instructional approach, and educational philosophy...',
        required: true,
        fieldType: 'textarea'
      },
      {
        id: 'staff-qualifications',
        title: 'Staff Qualifications',
        description: 'Qualifications of instructional staff',
        placeholder: 'Describe the qualifications and experience of your teaching and program staff...',
        required: true,
        fieldType: 'textarea',
        helpText: 'Include relevant credentials, experience, and training.'
      },
      {
        id: 'school-partnerships',
        title: 'School & Community Partnerships',
        description: 'Partnerships with schools and educational organizations',
        placeholder: 'List the schools, educational institutions, or community organizations you will partner with...',
        required: false,
        fieldType: 'textarea'
      },
      {
        id: 'project-timeline',
        title: 'Project Timeline',
        description: 'Timeline with key milestones',
        placeholder: 'Provide a detailed timeline with major milestones and deliverables...',
        required: true,
        fieldType: 'textarea'
      },
      {
        id: 'budget-amount',
        title: 'Total Project Budget',
        description: 'Total amount requested',
        placeholder: '30000',
        required: true,
        fieldType: 'number'
      },
      {
        id: 'assessment-evaluation',
        title: 'Student Assessment & Program Evaluation',
        description: 'How you will assess student progress and program effectiveness',
        placeholder: 'Describe how you will assess student learning and evaluate program effectiveness...',
        required: true,
        fieldType: 'textarea',
        helpText: 'Include both formative and summative assessment methods.'
      }
    ]
  }
]