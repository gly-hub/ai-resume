import {
  VStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  IconButton,
  HStack,
  Text,
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { useResumeStore } from '../store/resumeStore'
import { v4 as uuidv4 } from 'uuid'
import { Education } from '../types'

export function EducationForm() {
  const education = useResumeStore((state) => state.resume.education)
  const updateEducation = useResumeStore((state) => state.updateEducation)

  const handleAdd = () => {
    const newEducation: Education = {
      id: uuidv4(),
      school: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      gpa: '',
      courses: [],
      awards: [],
    }
    updateEducation([...education, newEducation])
  }

  const handleDelete = (id: string) => {
    updateEducation(education.filter((edu) => edu.id !== id))
  }

  const handleChange = (id: string, field: keyof Education, value: string) => {
    updateEducation(
      education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    )
  }

  const handleAddItem = (id: string, field: 'courses' | 'awards', value: string) => {
    if (!value.trim()) return
    updateEducation(
      education.map((edu) =>
        edu.id === id
          ? { ...edu, [field]: [...edu[field], value.trim()] }
          : edu
      )
    )
  }

  const handleDeleteItem = (id: string, field: 'courses' | 'awards', index: number) => {
    updateEducation(
      education.map((edu) =>
        edu.id === id
          ? { ...edu, [field]: edu[field].filter((_, i) => i !== index) }
          : edu
      )
    )
  }

  return (
    <VStack spacing={8} align="stretch" w="100%">
      {education.map((edu) => (
        <Box
          key={edu.id}
          p={4}
          borderWidth={1}
          borderRadius="md"
          position="relative"
        >
          <IconButton
            aria-label="删除教育经历"
            icon={<DeleteIcon />}
            size="sm"
            position="absolute"
            right={2}
            top={2}
            onClick={() => handleDelete(edu.id)}
            sx={{
              '& > span': {
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }
            }}
          />

          <VStack spacing={4}>
            <SimpleGrid columns={2} spacing={4} w="100%">
              <FormControl isRequired>
                <FormLabel>学校</FormLabel>
                <Input
                  value={edu.school}
                  onChange={(e) => handleChange(edu.id, 'school', e.target.value)}
                  placeholder="学校名称"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>学位</FormLabel>
                <Input
                  value={edu.degree}
                  onChange={(e) => handleChange(edu.id, 'degree', e.target.value)}
                  placeholder="学位"
                />
              </FormControl>
            </SimpleGrid>

            <FormControl isRequired>
              <FormLabel>专业</FormLabel>
              <Input
                value={edu.major}
                onChange={(e) => handleChange(edu.id, 'major', e.target.value)}
                placeholder="专业"
              />
            </FormControl>

            <SimpleGrid columns={2} spacing={4} w="100%">
              <FormControl isRequired>
                <FormLabel>开始时间</FormLabel>
                <Input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => handleChange(edu.id, 'startDate', e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>结束时间</FormLabel>
                <Input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => handleChange(edu.id, 'endDate', e.target.value)}
                />
              </FormControl>
            </SimpleGrid>

            <FormControl>
              <FormLabel>GPA</FormLabel>
              <Input
                value={edu.gpa}
                onChange={(e) => handleChange(edu.id, 'gpa', e.target.value)}
                placeholder="GPA"
              />
            </FormControl>

            <FormControl>
              <FormLabel>主修课程</FormLabel>
              <VStack align="stretch" spacing={2}>
                {edu.courses.map((item, index) => (
                  <HStack key={index}>
                    <Text flex={1}>{item}</Text>
                    <IconButton
                      aria-label="删除课程"
                      icon={<DeleteIcon />}
                      size="md"
                      p={2}
                      onClick={() => handleDeleteItem(edu.id, 'courses', index)}
                    />
                  </HStack>
                ))}
                <HStack>
                  <Input
                    placeholder="添加主修课程"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddItem(edu.id, 'courses', (e.target as HTMLInputElement).value)
                        ;(e.target as HTMLInputElement).value = ''
                      }
                    }}
                  />
                  <IconButton
                    aria-label="添加课程"
                    icon={<AddIcon />}
                    onClick={(e) => {
                      const input = (e.currentTarget as HTMLElement).parentElement?.querySelector('input')
                      if (input) {
                        handleAddItem(edu.id, 'courses', input.value)
                        input.value = ''
                      }
                    }}
                  />
                </HStack>
              </VStack>
            </FormControl>

            <FormControl>
              <FormLabel>获奖情况</FormLabel>
              <VStack align="stretch" spacing={2}>
                {edu.awards.map((item, index) => (
                  <HStack key={index}>
                    <Text flex={1}>{item}</Text>
                    <IconButton
                      aria-label="删除获奖"
                      icon={<DeleteIcon />}
                      size="md"
                      p={2}
                      onClick={() => handleDeleteItem(edu.id, 'awards', index)}
                    />
                  </HStack>
                ))}
                <HStack>
                  <Input
                    placeholder="添加获奖情况"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddItem(edu.id, 'awards', (e.target as HTMLInputElement).value)
                        ;(e.target as HTMLInputElement).value = ''
                      }
                    }}
                  />
                  <IconButton
                    aria-label="添加获奖"
                    icon={<AddIcon />}
                    onClick={(e) => {
                      const input = (e.currentTarget as HTMLElement).parentElement?.querySelector('input')
                      if (input) {
                        handleAddItem(edu.id, 'awards', input.value)
                        input.value = ''
                      }
                    }}
                  />
                </HStack>
              </VStack>
            </FormControl>
          </VStack>
        </Box>
      ))}

      <Button
        leftIcon={<AddIcon />}
        onClick={handleAdd}
        colorScheme="blue"
        variant="ghost"
      >
        添加教育经历
      </Button>
    </VStack>
  )
} 