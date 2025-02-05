import { Resume } from '../types'

export interface TemplateProps {
  id?: string
  name?: string
  description?: string
  preview?: string
  resume: Resume
  colors?: {
    primary: string
    secondary: string
    text: string
    accent: string
    background: string
  }
  fontSize: {
    heading: string
    body: string
    secondary: string
  }
  avatarSize: string
  spacing: {
    section: string
    item: string
  }
  layout: {
    headerStyle: 'centered' | 'left' | 'right' | 'split'
    sectionStyle: 'boxed' | 'line' | 'minimal'
    avatarStyle: 'circle' | 'square' | 'rounded'
    contentWidth: 'full' | 'narrow' | 'wide'
  }
}

export interface TemplateStyles {
  header: Record<string, any>
  section: Record<string, any>
  avatar: Record<string, any>
  content: Record<string, any>
}

export interface ResumeTemplate {
  name?: string
  description?: string
  preview?: string
  component: React.ComponentType<TemplateProps>
  defaultConfig: {
    id: TemplateProps['id']
    name: TemplateProps['name']
    description: TemplateProps['description']
    preview: TemplateProps['preview']
    colors?: TemplateProps['colors']
    fontSize: TemplateProps['fontSize']
    avatarSize: TemplateProps['avatarSize']
    spacing: {
      section: string
      item: string
    }
    layout: TemplateProps['layout']
  }
} 