export interface Organization {
  id: string
  name: string
  mission: string
  contact_email: string
  contact_phone?: string
  tax_id?: string
  is_501c3: boolean
  annual_revenue?: number
  annual_expenses?: number
  created_at: string
  updated_at: string
  user_id: string
}

export interface GrantApplication {
  id: string
  title: string
  status: 'draft' | 'in_progress' | 'completed' | 'submitted'
  organization_id: string
  template_type?: string
  rfp_file_url?: string
  content: Record<string, any>
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  organization_id?: string
}

export interface RFPAnalysis {
  requirements: string[]
  deadline?: string
  funding_amount?: string
  focus_areas: string[]
  key_sections: string[]
}