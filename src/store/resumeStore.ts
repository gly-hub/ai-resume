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
  updateResume: (resume: Partial<Resume>) => void
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
  templateConfig: {
    ...templates.professional.defaultConfig,
    fontSize: {
      heading: '24px',
      body: '14px',
      secondary: '12px'
    }
  }
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
  updateTemplate: (template, config) => {
    console.log('Updating template:', template, config)
    set((state) => {
      const newState = {
        resume: {
          ...state.resume,
          template,
          templateConfig: {
            ...state.resume.templateConfig,
            ...config
          }
        }
      }
      console.log('New state:', newState)
      return newState
    })
  },
  updateResume: (resumeData) =>
    set((state) => ({
      resume: {
        ...state.resume,
        ...resumeData
      }
    })),
  loadSample: () => set({ resume: sampleResume })
})) 