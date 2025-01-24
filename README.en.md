# OpenCurriculumVitae

English | [简体中文](./README.md)

A modern resume builder that helps you create professional resumes through AI dialogue. Built with [Cursor](https://cursor.sh/), leveraging AI-assisted programming for enhanced development efficiency.

## Core Features

### 🤖 AI Resume Advisor
- Generate resume content through natural dialogue
- AI-guided information collection
- Smart recognition of key achievements and skills
- Automatic generation of professional descriptions
- Content optimization based on job requirements

### 📝 Resume Editor
- Real-time preview
- Multiple resume templates
- Customizable layout and styling
- Organized content management
- One-click PDF export

### 🎨 Template System
- Professional minimalist style
- Two-column layout
- Timeline style
- More templates coming soon

## Tech Stack

- React + TypeScript
- Chakra UI - Modern UI component library
- OpenAI API - GPT model-driven resume generation
- Zustand - Lightweight state management
- React Router - Route management
- [Cursor](https://cursor.sh/) - AI-powered modern editor

## Development Environment

- Node.js >= 16
- pnpm >= 8
- [Cursor](https://cursor.sh/) (recommended)

## Quick Start

1. Clone the project
```bash
git clone https://github.com/yourusername/OpenCurriculumVitae.git
cd OpenCurriculumVitae
```

2. Install dependencies
```bash
pnpm install
```

3. Configure OpenAI API
- Set up your OpenAI API Key in the AI Assistant page
- Optional: Configure custom API endpoint

4. Start development server
```bash
pnpm dev
```

## User Guide

### 🚀 Local Setup

1. Ensure your development environment meets the requirements:
   - Node.js >= 16
   - pnpm >= 8
   - [Cursor](https://cursor.sh/) editor (recommended)

2. Clone and start the project
   ```bash
   # Clone the project
   git clone https://github.com/yourusername/OpenCurriculumVitae.git
   
   # Enter project directory
   cd OpenCurriculumVitae
   
   # Install dependencies
   pnpm install
   
   # Start development server
   pnpm dev
   ```

3. Visit `http://localhost:5173` in your browser

### 🔑 OpenAI API Configuration

1. Get OpenAI API Key
   - Visit [OpenAI Platform](https://platform.openai.com/)
   - Register/Login
   - Generate new key in API Keys page

2. Configure API Key
   - Go to AI Assistant page in the editor
   - Click settings icon
   - Enter your API Key
   - (Optional) Configure custom API endpoint

### 📝 Creating a Resume

1. Enter the Editor
   - Click "Create New Resume" on homepage
   - Or directly visit `/editor` path

2. Use AI Assistant
   - Switch to "AI Assistant" tab
   - Start dialogue with AI, describe your experience
   - AI will guide you to provide key information
   - System automatically identifies important achievements and skills

3. Generate Resume Content
   - Click "Generate Resume" after information collection
   - AI generates structured resume content
   - Content automatically fills into editor

4. Edit and Optimize
   - Review and edit content in various tabs
   - Adjust content order
   - Modify wording and expressions
   - Add or remove information

5. Choose Template
   - Switch to "Templates" tab
   - Preview different template effects
   - Select the most suitable template
   - Adjust template parameters (colors, fonts, etc.)

6. Export Resume
   - Preview final result
   - Click "Export PDF" button
   - Choose save location
   - Get generated PDF file

### 💡 Usage Tips

- Provide detailed descriptions of your experience when talking with AI
- Include specific numbers and achievements
- Tell AI your target position and industry
- Try different template styles
- Adjust content order appropriately
- Keep resume length to 1-2 pages

## Key Advantages

- 🎯 Precise Guidance: AI advisor collects information based on job requirements
- 📊 Data Quantification: Automatically converts experiences into measurable achievements
- 🔍 Deep Mining: Helps discover and highlight personal strengths
- ✨ Professional Expression: Uses industry-recognized terminology
- 🎨 Flexible Customization: Edit and adjust generated content anytime
- 🚀 Efficient Development: Enhanced development efficiency with Cursor editor

## Contributing

We welcome and appreciate all forms of contributions! Here's how you can participate:

### Submit Issues
- Report Bugs: Describe the problem, reproduction steps, and environment details
- Propose New Features: Describe feature requirements and use cases
- Improvement Suggestions: Ideas for optimizing existing features

### Submit Pull Requests
1. Fork this repository
2. Create new branch: `git checkout -b feature/your-feature-name`
3. Develop new feature or fix bug
4. Ensure code meets following standards:
   - Written in TypeScript
   - Follows project code style (ESLint + Prettier)
   - Add necessary comments and documentation
   - Write/update test cases
5. Commit code: `git commit -m 'feat: add some feature'`
   - Use [Conventional Commits](https://www.conventionalcommits.org/)
   - Common types: feat, fix, docs, style, refactor, test, chore
6. Push to your Fork: `git push origin feature/your-feature-name`
7. Create Pull Request to main branch of main repository

### Development Tips
- Use [Cursor](https://cursor.sh/) editor for AI-assisted programming
- Keep functionality modular and code concise
- Prefer TypeScript type system over runtime checks
- Follow React Hooks best practices
- Focus on code reuse and component abstraction

## License

MIT License

## Acknowledgments

- [Cursor](https://cursor.sh/) - AI-driven programming experience
- OpenAI - Powerful GPT model support
- All contributors for their enthusiastic participation 