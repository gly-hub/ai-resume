import { Resume } from './resume'

export interface TemplateProps {
  resume: Resume
  colors: {
    primary: string
    secondary: string
    text: string
    accent: string
  }
  fonts: {
    heading: string
    body: string
  }
  fontSize: {
    heading: {
      title: string
      section: string
    }
    body: {
      normal: string
      small: string
    }
  }
  spacing: {
    section: string
    item: string
  }
  layout: {
    headerStyle: 'centered' | 'left' | 'right' | 'split'
    sectionStyle: 'plain' | 'boxed' | 'line'
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
  name: string
  description: string
  component: React.ComponentType<TemplateProps>
  defaultConfig: {
    colors: TemplateProps['colors']
    fonts: TemplateProps['fonts']
    spacing: TemplateProps['spacing']
    layout: TemplateProps['layout']
  }
  thumbnail: string
} 