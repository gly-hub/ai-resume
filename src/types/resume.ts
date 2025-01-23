export interface TemplateConfig {
  id: string
  name: string
  description: string
  preview: string
  colors: {
    primary: string
    secondary: string
    text: string
    accent: string
    background: string
  }
  fonts: {
    heading: string
    body: string
  }
  spacing: {
    section: number
    item: number
  }
  layout: {
    headerStyle: 'centered' | 'left' | 'right' | 'split'
    sectionStyle: 'minimal' | 'line' | 'boxed'
    avatarStyle: 'circle' | 'square' | 'rounded'
    contentWidth: 'full' | 'narrow' | 'wide'
  }
} 