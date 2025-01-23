import {
  SimpleGrid,
  Box,
  Image,
  Text,
  VStack,
  useRadio,
  useRadioGroup,
  UseRadioProps,
  Center
} from '@chakra-ui/react'
import { templates } from '../templates'
import { useResumeStore } from '../store/resumeStore'
import { TemplateType } from '../types'

function TemplateCard(props: UseRadioProps & { name: string; description: string; preview: string }) {
  const { name, description, preview, ...radioProps } = props
  const { getInputProps, getRadioProps } = useRadio(radioProps)
  const input = getInputProps()
  const radio = getRadioProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...radio}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        _checked={{
          borderColor: 'blue.500',
          borderWidth: '2px',
        }}
        p={3}
      >
        <VStack spacing={3}>
          <Image
            src={preview}
            alt={name}
            borderRadius="md"
          />
          <Text fontWeight="bold">{name}</Text>
          <Text fontSize="sm" color="gray.600" noOfLines={2}>
            {description}
          </Text>
        </VStack>
      </Box>
    </Box>
  )
}

export function TemplateSelector() {
  const updateTemplate = useResumeStore((state) => state.updateTemplate)
  const currentTemplate = useResumeStore((state) => state.resume.template)

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'template',
    defaultValue: currentTemplate,
    onChange: (value) => {
      const templateType = value as TemplateType
      const spacing = {
        section: Number(templates[templateType].defaultConfig.spacing.section.replace('rem', '')),
        item: Number(templates[templateType].defaultConfig.spacing.item.replace('rem', ''))
      }
      const sectionStyle: 'minimal' | 'line' | 'boxed' = 
        templates[templateType].defaultConfig.layout.sectionStyle === 'plain' ? 'minimal' : 
        templates[templateType].defaultConfig.layout.sectionStyle === 'line' ? 'line' : 'boxed'

      const templateConfig = {
        id: templateType,
        name: templates[templateType].name,
        description: templates[templateType].description,
        preview: templates[templateType].thumbnail,
        colors: {
          ...templates[templateType].defaultConfig.colors,
          background: '#FFFFFF'
        },
        fonts: templates[templateType].defaultConfig.fonts,
        spacing,
        layout: {
          ...templates[templateType].defaultConfig.layout,
          sectionStyle
        }
      }
      updateTemplate(templateType, templateConfig)
    },
  })

  return (
    <Center p={4}>
      <SimpleGrid columns={[1, 2, 4]} spacing={6} {...getRootProps()}>
        {Object.entries(templates).map(([id, template]) => (
          <TemplateCard
            key={id}
            {...getRadioProps({ value: id })}
            name={template.name}
            description={template.description}
            preview={template.thumbnail}
          />
        ))}
      </SimpleGrid>
    </Center>
  )
} 