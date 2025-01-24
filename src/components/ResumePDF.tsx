import { Box, Button, HStack, VStack } from '@chakra-ui/react'
import { useResumeStore } from '../store/resumeStore'
import { useRef } from 'react'
import { templates } from '../templates'

export const ResumePDF: React.FC = () => {
  const resume = useResumeStore((state) => state.resume)
  console.log('ResumePDF rendering with fontSize:', resume.templateConfig.fontSize)

  const template = templates[resume.template]
  const TemplateComponent = template.component

  return (
    <Box 
      bg="white" 
      w="210mm" 
      minH="297mm"
      mx="auto"
      position="relative"
      data-template={resume.template}
    >
      <TemplateComponent
        resume={resume}
        colors={resume.templateConfig.colors}
        fonts={resume.templateConfig.fonts}
        fontSize={resume.templateConfig.fontSize}
        spacing={resume.templateConfig.spacing}
        layout={resume.templateConfig.layout}
      />
    </Box>
  )
} 