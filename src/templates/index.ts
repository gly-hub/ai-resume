import { TemplateConfig } from '../types'
import { ResumeTemplate } from '../types/template'
import { singleColumnConfig } from './SingleColumnTemplate'
import { twoColumnConfig } from './TwoColumnTemplate'
import { TimelineTemplate } from './TimelineTemplate'

const professional: TemplateConfig = {
  id: 'professional',
  name: '专业简约',
  description: '清晰专业的布局,适合大多数求职场景',
  preview: '/templates/professional.png',
  fontSize: {
    heading: '24px',
    body: '14px',
    secondary: '12px'
  },
  avatarSize: '100px',
  colors: {
    primary: '#2D3748',
    secondary: '#718096',
    accent: '#3182CE',
    text: '#1A202C',
    background: '#FFFFFF'
  },
  spacing: {
    section: '6rem',
    item: '4rem'
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
  fontSize: {
    heading: '24px',
    body: '14px',
    secondary: '12px'
  },
  avatarSize: '100px',
  colors: {
    primary: '#1A365D',
    secondary: '#4A5568',
    accent: '#00A3C4',
    text: '#2D3748',
    background: '#FFFFFF'
  },
  spacing: {
    section: '8rem',
    item: '5rem'
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
  fontSize: {
    heading: '24px',
    body: '14px',
    secondary: '12px'
  },
  avatarSize: '100px',
  colors: {
    primary: '#000000',
    secondary: '#666666',
    accent: '#000000',
    text: '#333333',
    background: '#FFFFFF'
  },
  spacing: {
    section: '6rem',
    item: '3rem'
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
  fontSize: {
    heading: '24px',
    body: '14px',
    secondary: '12px'
  },
  avatarSize: '100px',
  colors: {
    primary: '#553C9A',
    secondary: '#805AD5',
    accent: '#B794F4',
    text: '#2D3748',
    background: '#FFFFFF'
  },
  spacing: {
    section: '7rem',
    item: '4rem'
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
  fontSize: {
    heading: '24px',
    body: '14px',
    secondary: '12px'
  },
  avatarSize: '100px',
  colors: {
    primary: '#2C5282',
    secondary: '#4A5568',
    accent: '#63B3ED',
    text: '#1A202C',
    background: '#FFFFFF'
  },
  spacing: {
    section: '5rem',
    item: '3rem'
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
  fontSize: {
    heading: '24px',
    body: '14px',
    secondary: '12px'
  },
  avatarSize: '100px',
  spacing: {
    section: '6rem',
    item: '4rem'
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
  fontSize: {
    heading: '24px',
    body: '14px',
    secondary: '12px'
  },
  avatarSize: '100px',
  colors: {
    primary: '#2B5876',
    secondary: '#4A5568',
    accent: '#4299E1',
    text: '#2D3748',
    background: '#FFFFFF'
  },
  spacing: {
    section: '4rem',
    item: '3rem'
  },
  layout: {
    headerStyle: 'left',
    sectionStyle: 'minimal',
    avatarStyle: 'circle',
    contentWidth: 'full'
  }
}

const timeline: TemplateConfig = {
  id: 'timeline',
  name: '时间轴',
  description: '清晰的时间轴布局',
  preview: '/templates/timeline.png',
  fontSize: {
    heading: '24px',
    body: '14px',
    secondary: '12px'
  },
  avatarSize: '100px',
  colors: {
    primary: '#2B6CB0',
    secondary: '#4299E1',
    accent: '#BEE3F8',
    text: '#2D3748',
    background: '#FFFFFF'
  },
  spacing: {
    section: '2rem',
    item: '1.5rem'
  },
  layout: {
    headerStyle: 'left',
    sectionStyle: 'minimal',
    avatarStyle: 'rounded',
    contentWidth: 'full'
  }
}

export const templates: Record<string, ResumeTemplate> = {
  professional: {
    name: professional.name,
    description: professional.description,
    preview: professional.preview,
    component: twoColumnConfig.component,
    defaultConfig: {
      id: professional.id,
      name: professional.name,
      description: professional.description,
      preview: professional.preview,
      colors: professional.colors,
      fontSize: {
        heading: '24px',
        body: '14px',
        secondary: '12px'
      },
      avatarSize: '100px',
      spacing: {
        section: `${Number(professional.spacing.section) * 0.25}rem`,
        item: `${Number(professional.spacing.item) * 0.25}rem`,
      },
      layout: professional.layout
    },
  },
  modern: {
    name: modern.name,
    description: modern.description,
    preview: modern.preview,
    component: singleColumnConfig.component,
    defaultConfig: {
      id: modern.id,
      name: modern.name,
      description: modern.description,
      preview: modern.preview,
      colors: modern.colors,
      fontSize: {
        heading: '24px',
        body: '14px',
        secondary: '12px'
      },
      avatarSize: '100px',
      spacing: {
        section: `${Number(modern.spacing.section) * 0.25}rem`,
        item: `${Number(modern.spacing.item) * 0.25}rem`
      },
      layout: {
        ...modern.layout,
        sectionStyle: modern.layout.sectionStyle as 'boxed' | 'line' | 'minimal'
      }
    },
  },
  minimal: {
    name: minimal.name,
    description: minimal.description,
    preview: minimal.preview,
    component: singleColumnConfig.component,
    defaultConfig: {
      id: minimal.id,
      name: minimal.name,
      description: minimal.description,
      preview: minimal.preview,
      colors: minimal.colors,
      fontSize: {
        heading: '24px',
        body: '14px',
        secondary: '12px'
      },
      avatarSize: '100px',
      spacing: {
        section: `${Number(minimal.spacing.section) * 0.25}rem`,
        item: `${Number(minimal.spacing.item) * 0.25}rem`
      },
      layout: {
        ...minimal.layout,
        sectionStyle: 'boxed' as const
      }
    },
  },
  creative: {
    name: creative.name,
    description: creative.description,
    preview: creative.preview,
    component: singleColumnConfig.component,
    defaultConfig: {
      id: creative.id,
      name: creative.name,
      description: creative.description,
      preview: creative.preview,
      colors: creative.colors,
      fontSize: {
        heading: '24px',
        body: '14px',
        secondary: '12px'
      },
      avatarSize: '100px',
      spacing: {
        section: `${Number(creative.spacing.section) * 0.25}rem`,
        item: `${Number(creative.spacing.item) * 0.25}rem`
      },
      layout: creative.layout
    },
  },
  compact: {
    name: compact.name,
    description: compact.description,
    preview: compact.preview,
    component: singleColumnConfig.component,
    defaultConfig: {
      id: compact.id,
      name: compact.name,
      description: compact.description,
      preview: compact.preview,
      colors: compact.colors,
      fontSize: {
        heading: '24px',
        body: '14px',
        secondary: '12px'
      },
      avatarSize: '100px',
      spacing: {
        section: `${Number(compact.spacing.section) * 0.25}rem`,
        item: `${Number(compact.spacing.item) * 0.25}rem`
      },
      layout: compact.layout
    },
  },
  elegant: {
    name: elegant.name,
    description: elegant.description,
    preview: elegant.preview,
    component: twoColumnConfig.component,
    defaultConfig: {
      id: elegant.id,
      name: elegant.name,
      description: elegant.description,
      preview: elegant.preview,
      colors: elegant.colors,
      fontSize: {
        heading: '24px',
        body: '14px',
        secondary: '12px'
      },
      avatarSize: '100px',
      spacing: {
        section: `${Number(elegant.spacing.section) * 0.25}rem`,
        item: `${Number(elegant.spacing.item) * 0.25}rem`
      },
      layout: elegant.layout
    },
  },
  twoColumn: {
    name: twoColumn.name,
    description: twoColumn.description,
    preview: twoColumn.preview,
    component: twoColumnConfig.component,
    defaultConfig: {
      id: twoColumn.id,
      name: twoColumn.name,
      description: twoColumn.description,
      preview: twoColumn.preview,
      colors: twoColumn.colors,
      fontSize: {
        heading: '24px',
        body: '14px',
        secondary: '12px'
      },
      avatarSize: '100px',
      spacing: {
        section: `${Number(twoColumn.spacing.section) * 0.25}rem`,
        item: `${Number(twoColumn.spacing.item) * 0.25}rem`
      },
      layout: twoColumn.layout
    },
  },
  timeline: {
    name: timeline.name,
    description: timeline.description,
    preview: timeline.preview,
    component: TimelineTemplate,
    defaultConfig: {
      id: timeline.id,
      name: timeline.name,
      description: timeline.description,
      preview: timeline.preview,
      colors: timeline.colors,
      fontSize: {
        heading: '24px',
        body: '14px',
        secondary: '12px'
      },
      avatarSize: '120px',
      spacing: {
        section: `${Number(timeline.spacing.section) * 0.25}rem`,
        item: `${Number(timeline.spacing.item) * 0.25}rem`
      },
      layout: {
        ...timeline.layout,
        sectionStyle: timeline.layout.sectionStyle as 'boxed' | 'line' | 'minimal'
      }
    },
  }
}

export * from './SingleColumnTemplate'
export * from './TwoColumnTemplate'

export type TemplateName = keyof typeof templates 