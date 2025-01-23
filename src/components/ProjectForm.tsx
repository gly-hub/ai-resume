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

export const ProjectForm = () => {
  const projects = useResumeStore((state) => state.resume.projects)
  const addProject = useResumeStore((state) => state.addProject)
  const updateProject = useResumeStore((state) => state.updateProject)
  const deleteProject = useResumeStore((state) => state.deleteProject)

  const handleAdd = () => {
    const newProject = {
      id: uuidv4(),
      name: '',
      role: '',
      startDate: '',
      endDate: '',
      description: [],
      highlights: [],
      technologies: []
    }
    addProject(newProject)
  }

  const handleDelete = (id: string) => {
    deleteProject(id)
  }

  const handleChange = (id: string, field: string, value: string) => {
    const proj = projects.find((p) => p.id === id)
    if (proj) {
      updateProject(id, { ...proj, [field]: value })
    }
  }

  const handleArrayChange = (id: string, field: string, value: string) => {
    const proj = projects.find((p) => p.id === id)
    if (proj) {
      updateProject(id, {
        ...proj,
        [field]: value.split(/\r?\n/).filter(Boolean)
      })
    }
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
                      aria-label="删除项目描述"
                      icon={<DeleteIcon />}
                      size="md"
                      p={2}
                      onClick={() => handleArrayChange(proj.id, 'description', proj.description.filter((_, i) => i !== index).join('\n'))}
                    />
                  </HStack>
                ))}
                <HStack>
                  <Input
                    placeholder="添加项目描述，建议以动词开头，包含具体的量化指标"
                    value={proj.description.join('\n')}
                    onChange={(e) => handleArrayChange(proj.id, 'description', e.target.value)}
                    resize="vertical"
                    sx={{ whiteSpace: 'pre' }}
                  />
                </HStack>
              </VStack>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>项目亮点</FormLabel>
              <VStack align="stretch" spacing={2}>
                {proj.highlights.map((item, index) => (
                  <HStack key={index}>
                    <Text flex={1}>{item}</Text>
                    <IconButton
                      aria-label="删除项目亮点"
                      icon={<DeleteIcon />}
                      size="md"
                      p={2}
                      onClick={() => handleArrayChange(proj.id, 'highlights', proj.highlights.filter((_, i) => i !== index).join('\n'))}
                    />
                  </HStack>
                ))}
                <HStack>
                  <Input
                    placeholder="添加项目亮点，建议突出个人贡献和项目影响"
                    value={proj.highlights.join('\n')}
                    onChange={(e) => handleArrayChange(proj.id, 'highlights', e.target.value)}
                    resize="vertical"
                    sx={{ whiteSpace: 'pre' }}
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
                      aria-label="删除技术栈"
                      icon={<DeleteIcon />}
                      size="md"
                      p={2}
                      onClick={() => handleArrayChange(proj.id, 'technologies', proj.technologies.filter((_, i) => i !== index).join('\n'))}
                    />
                  </HStack>
                ))}
                <HStack>
                  <Input
                    placeholder="添加技术栈"
                    value={proj.technologies.join('\n')}
                    onChange={(e) => handleArrayChange(proj.id, 'technologies', e.target.value)}
                    resize="vertical"
                    sx={{ whiteSpace: 'pre' }}
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