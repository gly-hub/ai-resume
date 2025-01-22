import { create } from 'zustand'
import { Resume, ResumeSection, BasicInfo, Education, WorkExperience, Project, Skill, Additional, TemplateType, TemplateConfig } from '../types'
import { sampleResume } from './sampleResume'
import { templates } from '../templates'

interface ResumeStore {
  resume: Resume
  updateBasicInfo: (basicInfo: BasicInfo) => void
  addEducation: (education: Education) => void
  updateEducation: (id: string, education: Education) => void
  deleteEducation: (id: string) => void
  addExperience: (experience: WorkExperience) => void
  updateExperience: (id: string, experience: WorkExperience) => void
  deleteExperience: (id: string) => void
  addProject: (project: Project) => void
  updateProject: (id: string, project: Project) => void
  deleteProject: (id: string) => void
  updateSkills: (skills: Skill[]) => void
  updateAdditional: (additional: Additional) => void
  updateSection: (id: string, visible: boolean) => void
  updateSectionOrder: (sections: Resume['sections']) => void
  updateTemplate: (template: TemplateType, config: TemplateConfig) => void
  loadSample: () => void
}

const initialResume: Resume = {
  basicInfo: {
    name: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    github: '',
    blog: ''
  },
  education: [],
  experience: [],
  projects: [],
  skills: [],
  additional: {
    languages: [],
    certifications: [],
    talks: [],
    publications: [],
    openSource: []
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

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: initialResume,
  updateBasicInfo: (basicInfo) =>
    set((state) => ({ resume: { ...state.resume, basicInfo } })),
  addEducation: (education) =>
    set((state) => ({
      resume: { ...state.resume, education: [...state.resume.education, education] }
    })),
  updateEducation: (id, education) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.map((edu) =>
          edu.id === id ? education : edu
        )
      }
    })),
  deleteEducation: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.filter((edu) => edu.id !== id)
      }
    })),
  addExperience: (experience) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: [...state.resume.experience, experience]
      }
    })),
  updateExperience: (id, experience) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.map((exp) =>
          exp.id === id ? experience : exp
        )
      }
    })),
  deleteExperience: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.filter((exp) => exp.id !== id)
      }
    })),
  addProject: (project) =>
    set((state) => ({
      resume: { ...state.resume, projects: [...state.resume.projects, project] }
    })),
  updateProject: (id, project) =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: state.resume.projects.map((proj) =>
          proj.id === id ? project : proj
        )
      }
    })),
  deleteProject: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: state.resume.projects.filter((proj) => proj.id !== id)
      }
    })),
  updateSkills: (skills) =>
    set((state) => ({ resume: { ...state.resume, skills } })),
  updateAdditional: (additional) =>
    set((state) => ({ resume: { ...state.resume, additional } })),
  updateSection: (id, visible) =>
    set((state) => ({
      resume: {
        ...state.resume,
        sections: state.resume.sections.map((section) =>
          section.id === id ? { ...section, visible } : section
        )
      }
    })),
  updateSectionOrder: (sections) =>
    set((state) => ({
      resume: {
        ...state.resume,
        sections
      }
    })),
  updateTemplate: (template, config) =>
    set((state) => ({
      resume: {
        ...state.resume,
        template,
        templateConfig: config
      }
    })),
  loadSample: () =>
    set((state) => ({
      resume: {
        ...state.resume,
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
            gpa: '3.8',
            courses: ['计算机网络', '操作系统', '数据库系统', '分布式系统'],
            awards: ['优秀毕业生', '一等奖学金']
          }
        ],
        experience: [
          {
            id: '1',
            company: '字节跳动',
            position: '高级前端工程师',
            startDate: '2021-07',
            endDate: '至今',
            description: [
              '负责抖音电商核心业务的前端开发工作',
              '优化前端性能，提升页面加载速度和用户体验',
              '带领团队完成技术架构升级，提升开发效率'
            ],
            technologies: ['React', 'TypeScript', 'Next.js', 'Node.js']
          }
        ],
        projects: [
          {
            id: '1',
            name: '抖音电商直播间',
            role: '前端负责人',
            startDate: '2022-01',
            endDate: '2022-12',
            description: ['开发抖音电商直播间的前端系统，支持百万级并发访问'],
            highlights: [
              '使用 React 和 TypeScript 构建高性能的直播间前端系统',
              '实现了弹幕、商品展示、支付等核心功能',
              '优化直播间性能，提升用户体验'
            ],
            technologies: ['React', 'TypeScript', 'WebRTC', 'WebSocket']
          }
        ],
        skills: [
          {
            id: '1',
            category: '编程语言',
            items: ['JavaScript', 'TypeScript', 'Python', 'Java']
          },
          {
            id: '2',
            category: '前端框架',
            items: ['React', 'Vue', 'Next.js', 'Nuxt.js']
          },
          {
            id: '3',
            category: '开发工具',
            items: ['Git', 'Docker', 'Webpack', 'Vite']
          }
        ],
        additional: {
          languages: ['英语（流利）', '日语（N2）'],
          certifications: ['AWS Certified Developer', 'Google Cloud Professional'],
          talks: ['2023 前端技术大会分享：大规模前端应用架构实践'],
          publications: ['《深入浅出 React 技术栈》'],
          openSource: ['React Core Team Contributor', 'Next.js Contributor']
        }
      }
    }))
})) 