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

const timeline: TemplateConfig = {
  id: 'timeline',
  name: '时间轴',
  description: '清晰的时间轴布局',
  preview: '/templates/timeline.png',
  colors: {
    primary: '#2B6CB0',
    secondary: '#4299E1',
    accent: '#BEE3F8',
    text: '#2D3748',
    background: '#FFFFFF'
  },
  fonts: {
    heading: 'system-ui',
    body: 'system-ui'
  },
  spacing: {
    section: 2,
    item: 1.5
  },
  layout: {
    headerStyle: 'left',
    sectionStyle: 'minimal',
    avatarStyle: 'rounded',
    contentWidth: 'full'
  }
}

const defaultFontSize = {
  heading: {
    title: '28px',
    section: '20px'
  },
  body: {
    normal: '16px',
    small: '14px'
  }
}

export const templates: Record<string, ResumeTemplate> = {
  professional: {
    name: professional.name,
    description: professional.description,
    component: twoColumnConfig.component,
    defaultConfig: {
      colors: professional.colors,
      fonts: professional.fonts,
      fontSize: defaultFontSize,
      spacing: {
        section: `${professional.spacing.section * 0.25}rem`,
        item: `${professional.spacing.item * 0.25}rem`
      },
      layout: {
        ...professional.layout,
        sectionStyle: professional.layout.sectionStyle as 'line' | 'boxed' | 'plain'
      }
    },
    thumbnail: professional.preview
  },
  modern: {
    name: modern.name,
    description: modern.description,
    component: singleColumnConfig.component,
    defaultConfig: {
      colors: modern.colors,
      fonts: modern.fonts,
      fontSize: defaultFontSize,
      spacing: {
        section: `${modern.spacing.section * 0.25}rem`,
        item: `${modern.spacing.item * 0.25}rem`
      },
      layout: {
        ...modern.layout,
        sectionStyle: modern.layout.sectionStyle as 'line' | 'boxed' | 'plain'
      }
    },
    thumbnail: modern.preview
  },
  minimal: {
    name: minimal.name,
    description: minimal.description,
    component: singleColumnConfig.component,
    defaultConfig: {
      colors: minimal.colors,
      fonts: minimal.fonts,
      fontSize: defaultFontSize,
      spacing: {
        section: `${minimal.spacing.section * 0.25}rem`,
        item: `${minimal.spacing.item * 0.25}rem`
      },
      layout: {
        ...minimal.layout,
        sectionStyle: 'plain' as const
      }
    },
    thumbnail: minimal.preview
  },
  creative: {
    name: creative.name,
    description: creative.description,
    component: singleColumnConfig.component,
    defaultConfig: {
      colors: creative.colors,
      fonts: creative.fonts,
      fontSize: defaultFontSize,
      spacing: {
        section: `${creative.spacing.section * 0.25}rem`,
        item: `${creative.spacing.item * 0.25}rem`
      },
      layout: {
        ...creative.layout,
        sectionStyle: creative.layout.sectionStyle as 'line' | 'boxed' | 'plain'
      }
    },
    thumbnail: creative.preview
  },
  compact: {
    name: compact.name,
    description: compact.description,
    component: twoColumnConfig.component,
    defaultConfig: {
      colors: compact.colors,
      fonts: compact.fonts,
      fontSize: defaultFontSize,
      spacing: {
        section: `${compact.spacing.section * 0.25}rem`,
        item: `${compact.spacing.item * 0.25}rem`
      },
      layout: {
        ...compact.layout,
        sectionStyle: compact.layout.sectionStyle as 'line' | 'boxed' | 'plain'
      }
    },
    thumbnail: compact.preview
  },
  elegant: {
    name: elegant.name,
    description: elegant.description,
    component: singleColumnConfig.component,
    defaultConfig: {
      colors: elegant.colors,
      fonts: elegant.fonts,
      fontSize: defaultFontSize,
      spacing: {
        section: `${elegant.spacing.section * 0.25}rem`,
        item: `${elegant.spacing.item * 0.25}rem`
      },
      layout: {
        ...elegant.layout,
        sectionStyle: 'plain' as const
      }
    },
    thumbnail: elegant.preview
  },
  twoColumn: {
    name: twoColumn.name,
    description: twoColumn.description,
    component: twoColumnConfig.component,
    defaultConfig: {
      colors: twoColumn.colors,
      fonts: twoColumn.fonts,
      fontSize: defaultFontSize,
      spacing: {
        section: `${twoColumn.spacing.section * 0.25}rem`,
        item: `${twoColumn.spacing.item * 0.25}rem`
      },
      layout: {
        ...twoColumn.layout,
        sectionStyle: 'plain' as const
      }
    },
    thumbnail: twoColumn.preview
  },
  timeline: {
    name: timeline.name,
    description: timeline.description,
    component: TimelineTemplate,
    defaultConfig: {
      colors: timeline.colors,
      fonts: timeline.fonts,
      fontSize: defaultFontSize,
      spacing: {
        section: `${timeline.spacing.section}rem`,
        item: `${timeline.spacing.item}rem`
      },
      layout: {
        ...timeline.layout,
        sectionStyle: timeline.layout.sectionStyle as 'line' | 'boxed' | 'plain'
      }
    },
    thumbnail: timeline.preview
  }
}

export * from './SingleColumnTemplate'
export * from './TwoColumnTemplate'

export type TemplateName = keyof typeof templates 