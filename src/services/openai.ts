import { Resume, Message } from '../types';
import { templates } from '../templates';

export interface OpenAIConfig {
  apiKey: string;
  apiEndpoint: string;
  model: string;
}

class OpenAIService {
  private config: OpenAIConfig | null = null;
  private readonly initialPrompt = {
    role: 'system',
    content: `你是一个专业的简历顾问，你的目标是通过对话帮助用户创建一份出色的简历。请遵循以下原则：

1. 主动引导：
   - 分步骤询问用户的基本信息、教育背景、工作经历、项目经验和技能
   - 当用户的描述不够具体时，追问细节
   - 帮助用户挖掘和突出其成就和贡献

2. 信息完善：
   - 引导用户提供具体的数字和成果（如：优化性能提升 50%，提高转化率 30% 等）
   - 帮助用户使用专业的词汇描述其经历
   - 建议用户补充可能遗漏的重要信息

3. 专业建议：
   - 根据用户的目标岗位提供针对性建议
   - 指出简历中可以改进的地方
   - 建议如何更好地展示个人优势

请以友好的口吻与用户交流，逐步收集信息。在用户回答后，适时给出改进建议。`
  };

  setConfig(config: OpenAIConfig) {
    this.config = config;
    localStorage.setItem('openai_config', JSON.stringify(config));
  }

  getConfig(): OpenAIConfig | null {
    if (this.config) return this.config;
    
    const stored = localStorage.getItem('openai_config');
    if (stored) {
      this.config = JSON.parse(stored);
      return this.config;
    }
    
    return null;
  }

  async sendMessage(messages: Message[]): Promise<Message> {
    if (!this.config) {
      throw new Error('OpenAI configuration not set');
    }

    try {
      const response = await fetch(`${this.config.apiEndpoint}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [this.initialPrompt, ...messages],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      return {
        role: 'assistant',
        content: data.choices[0].message.content,
      };
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  async generateResume(conversation: Message[]): Promise<Resume> {
    if (!this.config) {
      throw new Error('OpenAI configuration not set');
    }

    const systemPrompt = {
      role: 'system',
      content: `请根据对话内容，生成一份结构化的简历数据。注意：
1. 必须返回有效的 JSON 格式
2. 不要返回任何其他文字说明
3. 使用用户提供的真实信息
4. 对于未提供的字段使用空字符串或空数组
5. 确保生成的 JSON 符合以下结构，并且字段类型必须一致，不要添加任何其他字段：

{
  "basicInfo": {
    "name": string,
    "jobTitle": string,
    "email": string,
    "phone": string,
    "location": string,
    "website": string,
    "github": string,
    "blog": string
  },
  "education": [
    {
      "id": string,
      "school": string,
      "degree": string,
      "major": string,
      "startDate": string,
      "endDate": string,
      "gpa": string,
      "courses": string[],
      "awards": string[]
    }
  ],
  "experience": [
    {
      "id": string,
      "company": string,
      "position": string,
      "startDate": string,
      "endDate": string,
      "description": string[],
      "technologies": string[]
    }
  ],
  "projects": [
    {
      "id": string,
      "name": string,
      "role": string,
      "startDate": string,
      "endDate": string,
      "description": string[],
      "highlights": string[],
      "technologies": string[]
    }
  ],
  "skills": [
    {
      "id": string,
      "category": string,
      "items": string[]
    }
  ],
  "additional": {
    "languages": string[],
    "certifications": string[],
    "talks": string[],
    "publications": string[],
    "openSource": string[]
  },
  "sections": [
    { "id": "1", "name": "教育背景", "type": "education", "order": 1, "visible": true },
    { "id": "2", "name": "工作经验", "type": "experience", "order": 2, "visible": true },
    { "id": "3", "name": "项目经验", "type": "projects", "order": 3, "visible": true },
    { "id": "4", "name": "技能清单", "type": "skills", "order": 4, "visible": true },
    { "id": "5", "name": "其他信息", "type": "additional", "order": 5, "visible": true }
  ],
  "language": "zh",
  "template": "professional",
  "templateConfig": ${JSON.stringify(templates.professional.defaultConfig, null, 2)}
}`
    };

    try {
      const response = await fetch(`${this.config.apiEndpoint}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [systemPrompt, ...conversation],
          temperature: 0.7,
          response_format: { type: "json_object" }  // 强制返回 JSON 格式
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate resume');
      }

      const data = await response.json();
      const resumeData = JSON.parse(data.choices[0].message.content);
      return this.fixArrayFields(resumeData);
    } catch (error) {
      console.error('Error generating resume:', error);
      throw error;
    }
  }

  private fixArrayFields(data: Resume): Resume {
    // 处理 education 数组
    data.education = data.education.map(edu => ({
      ...edu,
      courses: this.ensureArray(edu.courses),
      awards: this.ensureArray(edu.awards)
    }));

    // 处理 experience 数组
    data.experience = data.experience.map(exp => ({
      ...exp,
      description: this.ensureArray(exp.description),
      technologies: this.ensureArray(exp.technologies)
    }));

    // 处理 projects 数组
    data.projects = data.projects.map(proj => ({
      ...proj,
      description: this.ensureArray(proj.description),
      highlights: this.ensureArray(proj.highlights),
      technologies: this.ensureArray(proj.technologies)
    }));

    // 处理 skills 数组
    data.skills = data.skills.map(skill => ({
      ...skill,
      items: this.ensureArray(skill.items)
    }));

    // 处理 additional 字段
    data.additional = {
      languages: this.ensureArray(data.additional.languages),
      certifications: this.ensureArray(data.additional.certifications),
      talks: this.ensureArray(data.additional.talks),
      publications: this.ensureArray(data.additional.publications),
      openSource: this.ensureArray(data.additional.openSource)
    };

    return data;
  }

  private ensureArray(value: string | string[] | undefined): string[] {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    
    // 检查是否包含 - 或 + 作为分隔符
    if (value.includes('-') || value.includes('+')) {
      return value.split(/[-+]/).map(item => item.trim()).filter(Boolean);
    }

     // 检查是否包含 ； 作为分隔符
     if (value.includes('；')) {
      return value.split(/[；]/).map(item => item.trim()).filter(Boolean);
    }
    
    // 否则使用常见分隔符
    return value.split(/[,，、]/).map(item => item.trim()).filter(Boolean);
  }
}

export const openAIService = new OpenAIService(); 