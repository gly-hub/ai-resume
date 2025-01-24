export interface BasicInfo {
  name: string
  jobTitle: string
  email: string
  phone: string
  location: string
  website?: string
  github?: string
  blog?: string
  avatar?: string
}

export interface Education {
  id: string
  school: string
  degree: string
  major: string
  startDate: string
  endDate: string
  gpa: string
  courses: string[]
  awards: string[]
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string[]
  technologies: string[]
}

export interface Project {
  id: string
  name: string
  role: string
  startDate: string
  endDate: string
  description: string[]
  highlights: string[]
  technologies: string[]
}

export interface Skill {
  id: string
  category: string
  items: string[]
}

export interface Additional {
  languages: string[]
  certifications: string[]
  talks: string[]
  publications: string[]
  openSource: string[]
}

export type TemplateType = 'professional' | 'modern' | 'minimal' | 'creative' | 'compact' | 'elegant' | 'twoColumn'

export interface TemplateConfig {
  id: string
  name: string
  description: string
  preview: string
  colors: {
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
  }
  fonts: {
    heading: string
    body: string
  }
  fontSize?: {
    heading: string
    body: string
    secondary: string
  }
  avatarSize: string
  spacing: {
    section: number
    item: number
  }
  layout: {
    headerStyle: 'centered' | 'left' | 'right' | 'split'
    sectionStyle: 'boxed' | 'line' | 'minimal'
    avatarStyle: 'circle' | 'square' | 'rounded'
    contentWidth: 'full' | 'narrow' | 'wide'
  }
}

export interface ResumeSection {
  id: string
  name: string
  type: 'education' | 'experience' | 'projects' | 'skills' | 'additional'
  order: number
  visible: boolean
}

export interface Resume {
  basicInfo: BasicInfo
  education: Education[]
  experience: WorkExperience[]
  projects: Project[]
  skills: Skill[]
  additional: Additional
  sections: ResumeSection[]
  language: 'zh' | 'en'
  template: TemplateType
  templateConfig: TemplateConfig
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
} 