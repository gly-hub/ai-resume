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
import { Project } from '../types'

export function ProjectForm() {
  const projects = useResumeStore((state) => state.resume.projects)
  const updateProjects = useResumeStore((state) => state.updateProjects)

  const handleAdd = () => {
    const newProject: Project = {
      id: uuidv4(),
      name: '',
      role: '',
      startDate: '',
      endDate: '',
      description: [],
      highlights: [],
      technologies: [],
    }
    updateProjects([...projects, newProject])
  }

  const handleDelete = (id: string) => {
    updateProjects(projects.filter((proj) => proj.id !== id))
  }

  const handleChange = (id: string, field: keyof Project, value: string) => {
    updateProjects(
      projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    )
  }

  const handleAddItem = (id: string, field: 'description' | 'highlights' | 'technologies', value: string) => {
    if (!value.trim()) return
    updateProjects(
      projects.map((proj) =>
        proj.id === id
          ? { ...proj, [field]: [...proj[field], value.trim()] }
          : proj
      )
    )
  }

  const handleDeleteItem = (id: string, field: 'description' | 'highlights' | 'technologies', index: number) => {
    updateProjects(
      projects.map((proj) =>
        proj.id === id
          ? { ...proj, [field]: proj[field].filter((_, i) => i !== index) }
          : proj
      )
    )
  }

  return (
    <VStack spacing={8} align="stretch" w="100%">
      {projects.map((proj) => (
        <Box
          key={proj.id}
          p={4}
          borderWidth={1}
          borderRadius="md"
          position="relative"
        >
          <IconButton
            aria-label="删除项目"
            icon={<DeleteIcon />}
            size="sm"
            position="absolute"
            right={2}
            top={2}
            onClick={() => handleDelete(proj.id)}
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
                <FormLabel>项目名称</FormLabel>
                <Input
                  value={proj.name}
                  onChange={(e) => handleChange(proj.id, 'name', e.target.value)}
                  placeholder="项目名称"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>担任角色</FormLabel>
                <Input
                  value={proj.role}
                  onChange={(e) => handleChange(proj.id, 'role', e.target.value)}
                  placeholder="担任角色"
                />
              </FormControl>
            </SimpleGrid>

            <SimpleGrid columns={2} spacing={4} w="100%">
              <FormControl isRequired>
                <FormLabel>开始时间</FormLabel>
                <Input
                  type="month"
                  value={proj.startDate}
                  onChange={(e) => handleChange(proj.id, 'startDate', e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>结束时间</FormLabel>
                <Input
                  type="month"
                  value={proj.endDate}
                  onChange={(e) => handleChange(proj.id, 'endDate', e.target.value)}
                />
              </FormControl>
            </SimpleGrid>

            <FormControl isRequired>
              <FormLabel>项目描述</FormLabel>
              <VStack align="stretch" spacing={2}>
                {proj.description.map((item, index) => (
                  <HStack key={index}>
                    <Text flex={1}>{item}</Text>
                    <IconButton
                      aria-label="删除描述"
                      icon={<DeleteIcon />}
                      size="md"
                      p={2}
                      onClick={() => handleDeleteItem(proj.id, 'description', index)}
                    />
                  </HStack>
                ))}
                <HStack>
                  <Input
                    placeholder="添加项目描述"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddItem(proj.id, 'description', (e.target as HTMLInputElement).value)
                        ;(e.target as HTMLInputElement).value = ''
                      }
                    }}
                  />
                  <IconButton
                    aria-label="添加描述"
                    icon={<AddIcon />}
                    onClick={(e) => {
                      const input = (e.currentTarget as HTMLElement).parentElement?.querySelector('input')
                      if (input) {
                        handleAddItem(proj.id, 'description', input.value)
                        input.value = ''
                      }
                    }}
                  />
                </HStack>
              </VStack>
            </FormControl>

            <FormControl>
              <FormLabel>项目亮点</FormLabel>
              <VStack align="stretch" spacing={2}>
                {proj.highlights.map((item, index) => (
                  <HStack key={index}>
                    <Text flex={1}>{item}</Text>
                    <IconButton
                      aria-label="删除亮点"
                      icon={<DeleteIcon />}
                      size="md"
                      p={2}
                      onClick={() => handleDeleteItem(proj.id, 'highlights', index)}
                    />
                  </HStack>
                ))}
                <HStack>
                  <Input
                    placeholder="添加项目亮点"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddItem(proj.id, 'highlights', (e.target as HTMLInputElement).value)
                        ;(e.target as HTMLInputElement).value = ''
                      }
                    }}
                  />
                  <IconButton
                    aria-label="添加亮点"
                    icon={<AddIcon />}
                    onClick={(e) => {
                      const input = (e.currentTarget as HTMLElement).parentElement?.querySelector('input')
                      if (input) {
                        handleAddItem(proj.id, 'highlights', input.value)
                        input.value = ''
                      }
                    }}
                  />
                </HStack>
              </VStack>
            </FormControl>

            <FormControl>
              <FormLabel>技术栈</FormLabel>
              <VStack align="stretch" spacing={2}>
                {proj.technologies.map((item, index) => (
                  <HStack key={index}>
                    <Text flex={1}>{item}</Text>
                    <IconButton
                      aria-label="删除技术"
                      icon={<DeleteIcon />}
                      size="md"
                      p={2}
                      onClick={() => handleDeleteItem(proj.id, 'technologies', index)}
                    />
                  </HStack>
                ))}
                <HStack>
                  <Input
                    placeholder="添加技术栈"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddItem(proj.id, 'technologies', (e.target as HTMLInputElement).value)
                        ;(e.target as HTMLInputElement).value = ''
                      }
                    }}
                  />
                  <IconButton
                    aria-label="添加技术"
                    icon={<AddIcon />}
                    onClick={(e) => {
                      const input = (e.currentTarget as HTMLElement).parentElement?.querySelector('input')
                      if (input) {
                        handleAddItem(proj.id, 'technologies', input.value)
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
        添加项目经验
      </Button>
    </VStack>
  )
} 