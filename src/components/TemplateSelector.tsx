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
  const { getInputProps, getRadioProps } = useRadio(props)
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
            src={props.preview}
            alt={props.name}
            borderRadius="md"
            fallbackSrc="https://via.placeholder.com/200x300?text=预览图"
          />
          <Text fontWeight="bold">{props.name}</Text>
          <Text fontSize="sm" color="gray.600" noOfLines={2}>
            {props.description}
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
      updateTemplate(value as TemplateType, templates[value])
    },
  })

  return (
    <Center p={4}>
      <SimpleGrid columns={[1, 2, 4]} spacing={6} {...getRootProps()}>
        {Object.values(templates).map((template) => (
          <TemplateCard
            key={template.id}
            name={template.name}
            description={template.description}
            preview={template.preview}
            {...getRadioProps({ value: template.id })}
          />
        ))}
      </SimpleGrid>
    </Center>
  )
} 