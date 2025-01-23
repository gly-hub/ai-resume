import { TemplateConfig } from '../types'

const professional: TemplateConfig = {
  id: 'professional',
  name: '专业简约',
  description: '清晰专业的布局,适合大多数求职场景',
  preview: '/templates/professional.png',
  colors: {
    primary: '#2D3748',
    secondary: '#718096',
    accent: '#3182CE',
    text: '#1A202C',
    background: '#FFFFFF'
  },
  fonts: {
    heading: "'AlibabaPuHuiTi', sans-serif",
    body: "'AlibabaPuHuiTi', sans-serif"
  },
  spacing: {
    section: 6,
    item: 4
  },
  layout: {
    headerStyle: 'left',
    sectionStyle: 'line',
    avatarStyle: 'circle',
    contentWidth: 'full'
  }
}

const modern: TemplateConfig = {
  id: 'modern',
  name: '现代简洁',
  description: '现代感十足的设计,突出重点内容',
  preview: '/templates/modern.png',
  colors: {
    primary: '#1A365D',
    secondary: '#4A5568',
    accent: '#00A3C4',
    text: '#2D3748',
    background: '#FFFFFF'
  },
  fonts: {
    heading: "'AlibabaPuHuiTi', sans-serif",
    body: "'AlibabaPuHuiTi', sans-serif"
  },
  spacing: {
    section: 8,
    item: 5
  },
  layout: {
    headerStyle: 'centered',
    sectionStyle: 'boxed',
    avatarStyle: 'circle',
    contentWidth: 'narrow'
  }
}

const minimal: TemplateConfig = {
  id: 'minimal',
  name: '极简风格',
  description: '极简主义设计,让内容更加突出',
  preview: '/templates/minimal.png',
  colors: {
    primary: '#000000',
    secondary: '#666666',
    accent: '#000000',
    text: '#333333',
    background: '#FFFFFF'
  },
  fonts: {
    heading: "'AlibabaPuHuiTi', sans-serif",
    body: "'AlibabaPuHuiTi', sans-serif"
  },
  spacing: {
    section: 6,
    item: 3
  },
  layout: {
    headerStyle: 'left',
    sectionStyle: 'minimal',
    avatarStyle: 'square',
    contentWidth: 'wide'
  }
}

const creative: TemplateConfig = {
  id: 'creative',
  name: '创意设计',
  description: '富有创意的布局,适合设计类职位',
  preview: '/templates/creative.png',
  colors: {
    primary: '#553C9A',
    secondary: '#805AD5',
    accent: '#B794F4',
    text: '#2D3748',
    background: '#FFFFFF'
  },
  fonts: {
    heading: "'AlibabaPuHuiTi', sans-serif",
    body: "'AlibabaPuHuiTi', sans-serif"
  },
  spacing: {
    section: 7,
    item: 4
  },
  layout: {
    headerStyle: 'split',
    sectionStyle: 'boxed',
    avatarStyle: 'rounded',
    contentWidth: 'full'
  }
}

const compact: TemplateConfig = {
  id: 'compact',
  name: '紧凑双栏',
  description: '双栏布局,适合信息内容较多的情况',
  preview: '/templates/compact.png',
  colors: {
    primary: '#2C5282',
    secondary: '#4A5568',
    accent: '#63B3ED',
    text: '#1A202C',
    background: '#FFFFFF'
  },
  fonts: {
    heading: "'AlibabaPuHuiTi', sans-serif",
    body: "'AlibabaPuHuiTi', sans-serif"
  },
  spacing: {
    section: 5,
    item: 3
  },
  layout: {
    headerStyle: 'centered',
    sectionStyle: 'line',
    avatarStyle: 'circle',
    contentWidth: 'full'
  }
}

const elegant: TemplateConfig = {
  id: 'elegant',
  name: '优雅简约',
  description: '优雅的版式设计,突出个人特色',
  preview: '/templates/elegant.png',
  colors: {
    primary: '#276749',
    secondary: '#4A5568',
    accent: '#48BB78',
    text: '#2D3748',
    background: '#FFFFFF'
  },
  fonts: {
    heading: "'AlibabaPuHuiTi', sans-serif",
    body: "'AlibabaPuHuiTi', sans-serif"
  },
  spacing: {
    section: 6,
    item: 4
  },
  layout: {
    headerStyle: 'right',
    sectionStyle: 'minimal',
    avatarStyle: 'rounded',
    contentWidth: 'narrow'
  }
}

const twoColumn: TemplateConfig = {
  id: 'twoColumn',
  name: '双栏布局',
  description: '左右分栏的经典布局,突出个人信息',
  preview: '/templates/twoColumn.png',
  colors: {
    primary: '#2B5876',
    secondary: '#4A5568',
    accent: '#4299E1',
    text: '#2D3748',
    background: '#FFFFFF'
  },
  fonts: {
    heading: "'AlibabaPuHuiTi', sans-serif",
    body: "'AlibabaPuHuiTi', sans-serif"
  },
  spacing: {
    section: 4,
    item: 3
  },
  layout: {
    headerStyle: 'left',
    sectionStyle: 'minimal',
    avatarStyle: 'circle',
    contentWidth: 'full'
  }
}

export const templates = {
  twoColumn,
  professional,
  modern,
  minimal,
  creative,
  compact,
  elegant
}

export type TemplateName = keyof typeof templates 