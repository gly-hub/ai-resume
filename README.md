# OpenCurriculumVitae

[English](./README.en.md) | 简体中文

一个现代化的简历生成工具，通过 AI 对话帮助你创建专业的简历。项目使用 [Cursor](https://cursor.sh/) 编写，充分利用 AI 辅助编程提升开发效率。

## 核心功能

### 🤖 AI 简历顾问
- 通过自然对话生成简历内容
- AI 顾问主动引导信息收集
- 智能识别关键成就和技能
- 自动生成专业的描述文案
- 根据岗位需求优化内容

### 📝 简历编辑器
- 实时预览编辑效果
- 支持多种简历模板
- 自定义排版和样式
- 分类管理简历内容
- 一键导出 PDF

### 🎨 模板系统
- 专业简约风格
- 双栏式布局
- 时间线风格
- 更多模板持续添加中

## 技术栈

- React + TypeScript
- Chakra UI - 现代化 UI 组件库
- OpenAI API - GPT 模型驱动的简历生成
- Zustand 状态管理 - 轻量级状态管理
- React Router - 路由管理
- [Cursor](https://cursor.sh/) - AI 驱动的现代编辑器

## 开发环境

- Node.js >= 16
- pnpm >= 8
- [Cursor](https://cursor.sh/) (推荐)

## 快速开始

1. 克隆项目
```bash
git clone https://github.com/yourusername/OpenCurriculumVitae.git
cd OpenCurriculumVitae
```

2. 安装依赖
```bash
pnpm install
```

3. 配置 OpenAI API
- 在 AI 助手页面配置你的 OpenAI API Key
- 可选：配置自定义 API 端点

4. 启动开发服务器
```bash
pnpm dev
```

## 使用指南

### 🚀 本地运行

1. 确保你的开发环境满足要求：
   - Node.js >= 16
   - pnpm >= 8
   - [Cursor](https://cursor.sh/) 编辑器（推荐）

2. 克隆并启动项目
   ```bash
   # 克隆项目
   git clone https://github.com/yourusername/OpenCurriculumVitae.git
   
   # 进入项目目录
   cd OpenCurriculumVitae
   
   # 安装依赖
   pnpm install
   
   # 启动开发服务器
   pnpm dev
   ```

3. 在浏览器中访问 `http://localhost:5173`

### 🔑 配置 OpenAI API

1. 获取 OpenAI API Key
   - 访问 [OpenAI Platform](https://platform.openai.com/)
   - 注册/登录账号
   - 在 API Keys 页面生成新的 key

2. 配置 API Key
   - 在编辑器的 AI 助手页面
   - 点击设置图标
   - 输入你的 API Key
   - （可选）配置自定义 API 端点

### 📝 创建简历

1. 进入编辑器
   - 点击首页的"创建新简历"按钮
   - 或直接访问 `/editor` 路径

2. 使用 AI 助手
   - 切换到 "AI 助手" 标签页
   - 开始与 AI 对话，描述你的经历
   - AI 会主动引导你提供关键信息
   - 系统会自动识别重要成就和技能

3. 生成简历内容
   - 完成信息收集后点击"生成简历"
   - AI 将生成结构化的简历内容
   - 内容会自动填充到编辑器中

4. 编辑和优化
   - 在各个标签页中查看和编辑内容
   - 调整内容的展示顺序
   - 修改措辞和表述
   - 添加或删除信息

5. 选择模板
   - 切换到"模板"标签页
   - 预览不同模板效果
   - 选择最适合的模板
   - 调整模板参数（颜色、字体等）

6. 导出简历
   - 预览最终效果
   - 点击"导出 PDF"按钮
   - 选择保存位置
   - 获取生成的 PDF 文件

### 💡 使用技巧

- 与 AI 对话时，尽可能详细描述你的经历
- 提供具体的数字和成果
- 告诉 AI 你期望的职位和行业
- 多尝试不同的模板样式
- 适当调整内容的展示顺序
- 保持简历篇幅在 1-2 页为宜

## 特色优势

- 🎯 精准引导：AI 顾问会根据职位需求，有针对性地收集信息
- 📊 数据量化：自动将经历转化为可量化的成果
- 🔍 深度挖掘：帮助发现和突出个人亮点
- ✨ 专业表达：使用行业认可的专业术语
- 🎨 灵活定制：随时编辑和调整生成的内容
- 🚀 高效开发：使用 Cursor 编辑器提升开发效率

## 贡献指南

我们非常欢迎并感谢所有形式的贡献！以下是参与项目的主要方式：

### 提交 Issue
- 报告 Bug：请详细描述问题、复现步骤和环境信息
- 提出新功能：描述功能需求和使用场景
- 改进建议：对现有功能的优化想法

### 提交 Pull Request
1. Fork 本仓库
2. 创建新分支：`git checkout -b feature/your-feature-name`
3. 开发新功能或修复 bug
4. 确保代码符合以下规范：
   - 使用 TypeScript 编写代码
   - 遵循项目的代码风格（ESLint + Prettier）
   - 添加必要的注释和文档
   - 编写/更新测试用例
5. 提交代码：`git commit -m 'feat: add some feature'`
   - 使用 [约定式提交](https://www.conventionalcommits.org/zh-hans/v1.0.0/)
   - 常用类型：feat, fix, docs, style, refactor, test, chore
6. 推送到你的 Fork：`git push origin feature/your-feature-name`
7. 创建 Pull Request 到主仓库的 main 分支

### 开发建议
- 使用 [Cursor](https://cursor.sh/) 编辑器开发，享受 AI 辅助编程
- 保持功能模块化和代码简洁
- 优先使用 TypeScript 类型系统而非运行时检查
- 遵循 React Hooks 的最佳实践
- 注重代码复用和组件抽象

## 开源协议

MIT License

## 致谢

- [Cursor](https://cursor.sh/) - AI 驱动的编程体验
- OpenAI - 强大的 GPT 模型支持
- 所有贡献者的热情参与