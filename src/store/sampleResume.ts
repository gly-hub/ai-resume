import { Resume } from '../types'
import { templates } from '../templates'

export const sampleResume: Resume = {
  basicInfo: {
    name: '张三',
    jobTitle: '高级前端工程师',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    location: '上海',
    website: 'https://zhangsan.dev',
    github: 'https://github.com/zhangsan',
    blog: 'https://zhangsan.dev/blog'
  },
  education: [
    {
      id: '1',
      school: '上海交通大学',
      degree: '硕士',
      major: '计算机科学与技术',
      startDate: '2018-09',
      endDate: '2021-06',
      gpa: '3.8/4.0',
      courses: [
        '计算机网络',
        '操作系统',
        '数据结构与算法',
        '软件工程'
      ],
      awards: [
        '国家奖学金',
        '优秀毕业生'
      ]
    }
  ],
  experience: [
    {
      id: '1',
      company: '字节跳动',
      position: '高级前端工程师',
      startDate: '2021-07',
      endDate: '2024-03',
      description: [
        '负责抖音电商核心业务开发，实现直播间商品展示、购物车等功能',
        '优化页面性能，将首屏加载时间减少 50%，提升用户体验',
        '设计并实现组件库，提升团队开发效率 30%',
        '指导初级工程师，组织技术分享会'
      ],
      technologies: [
        'React',
        'TypeScript',
        'Next.js',
        'Chakra UI',
        'Redux'
      ]
    }
  ],
  projects: [
    {
      id: '1',
      name: '简历生成器',
      role: '项目负责人',
      startDate: '2024-01',
      endDate: '2024-03',
      description: [
        '一个帮助用户快速创建专业简历的在线工具'
      ],
      highlights: [
        '使用 React + TypeScript 开发，确保代码质量和可维护性',
        '实现简历内容的实时预览和 PDF 导出功能',
        '支持多种简历模板和主题切换',
        '使用 Chakra UI 构建响应式界面'
      ],
      technologies: [
        'React',
        'TypeScript',
        'Chakra UI',
        'Zustand',
        'React-to-PDF'
      ]
    }
  ],
  skills: [
    {
      id: '1',
      category: '编程语言',
      items: [
        'JavaScript/TypeScript',
        'Python',
        'Java',
        'HTML/CSS'
      ]
    },
    {
      id: '2',
      category: '前端框架/库',
      items: [
        'React',
        'Vue',
        'Next.js',
        'Chakra UI',
        'TailwindCSS'
      ]
    },
    {
      id: '3',
      category: '开发工具',
      items: [
        'Git',
        'VS Code',
        'Webpack',
        'Docker'
      ]
    }
  ],
  additional: {
    languages: [
      '英语（流利，TOEFL 105）',
      '日语（N2）'
    ],
    certifications: [
      'AWS Certified Developer',
      'Google Professional Cloud Developer'
    ],
    talks: [
      '2023 前端技术大会《现代前端开发实践》',
      '公司内部技术分享《React 性能优化》'
    ],
    publications: [
      '《深入理解 React 原理》- 掘金技术社区',
      '《前端工程化实践》- InfoQ'
    ],
    openSource: [
      '为 React 贡献 2 个 PR，修复文档和类型问题',
      '开源项目 awesome-frontend-tools 获得 1k+ star'
    ]
  },
  sections: [
    { id: '1', name: '教育背景', type: 'education', order: 1, visible: true },
    { id: '2', name: '工作经验', type: 'experience', order: 2, visible: true },
    { id: '3', name: '项目经验', type: 'projects', order: 3, visible: true },
    { id: '4', name: '技能清单', type: 'skills', order: 4, visible: true },
    { id: '5', name: '其他信息', type: 'additional', order: 5, visible: true }
  ],
  language: 'zh',
  template: 'professional',
  templateConfig: templates.professional
} 