import { TemplateConfig } from '../types'

export const templates: Record<string, TemplateConfig> = {
  professional: {
    id: 'professional',
    name: '专业模板',
    description: '简洁专业的设计风格，适合大多数求职场景',
    preview: '/templates/professional.png',
    colors: {
      primary: 'blue.600',
      secondary: 'gray.600',
      text: 'gray.800',
      background: 'white',
      accent: 'blue.50'
    },
    fonts: {
      heading: 'system-ui',
      body: 'system-ui'
    },
    spacing: {
      section: '1.5rem',
      item: '1rem'
    }
  },
  modern: {
    id: 'modern',
    name: '现代模板',
    description: '现代简约风格，突出重点内容',
    preview: '/templates/modern.png',
    colors: {
      primary: 'teal.500',
      secondary: 'gray.500',
      text: 'gray.900',
      background: 'white',
      accent: 'teal.50'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    spacing: {
      section: '2rem',
      item: '1.25rem'
    }
  },
  simple: {
    id: 'simple',
    name: '简约模板',
    description: '极简设计，突出内容本身',
    preview: '/templates/simple.png',
    colors: {
      primary: 'gray.700',
      secondary: 'gray.500',
      text: 'gray.800',
      background: 'white',
      accent: 'gray.50'
    },
    fonts: {
      heading: 'system-ui',
      body: 'system-ui'
    },
    spacing: {
      section: '1.5rem',
      item: '1rem'
    }
  },
  creative: {
    id: 'creative',
    name: '创意模板',
    description: '富有创意的设计风格，适合创意行业',
    preview: '/templates/creative.png',
    colors: {
      primary: 'purple.500',
      secondary: 'pink.400',
      text: 'gray.800',
      background: 'white',
      accent: 'purple.50'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Inter'
    },
    spacing: {
      section: '2rem',
      item: '1.5rem'
    }
  }
} 