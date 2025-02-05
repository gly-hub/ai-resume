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
import { useState, useEffect } from 'react'

export const ProjectForm = () => {
  const projects = useResumeStore((state) => state.resume.projects)
  const addProject = useResumeStore((state) => state.addProject)
  const updateProject = useResumeStore((state) => state.updateProject)
  const deleteProject = useResumeStore((state) => state.deleteProject)

  // 为每个项目创建输入状态
  const [newInputs, setNewInputs] = useState<Record<string, {
    description: string;
    highlight: string;
    technology: string;
  }>>({});

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
    // 初始化新项目的输入状态
    setNewInputs(prev => ({
      ...prev,
      [newProject.id]: { description: '', highlight: '', technology: '' }
    }));
  }

  const handleDelete = (id: string) => {
    deleteProject(id)
    // 清理对应的输入状态
    setNewInputs(prev => {
      const { [id]: removed, ...rest } = prev;
      return rest;
    });
  }

  const handleChange = (id: string, field: string, value: string | string[]) => {
    const proj = projects.find((p) => p.id === id)
    if (proj) {
      updateProject(id, { ...proj, [field]: value })
    }
  }

  // 初始化已有项目的输入状态
  useEffect(() => {
    const initialInputs: Record<string, { description: string; highlight: string; technology: string }> = {};
    projects.forEach(proj => {
      if (!newInputs[proj.id]) {
        initialInputs[proj.id] = { description: '', highlight: '', technology: '' };
      }
    });
    if (Object.keys(initialInputs).length > 0) {
      setNewInputs(prev => ({ ...prev, ...initialInputs }));
    }
  }, [projects]);

  return (
    <VStack spacing={8} align="stretch" w="100%">
      {projects?.map((proj) => (
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
                {proj.description?.map((item, index) => (
                  <HStack key={index}>
                    <Text flex={1}>{item}</Text>
                    <IconButton
                      aria-label="删除项目描述"
                      icon={<DeleteIcon />}
                      size="sm"
                      onClick={() => {
                        const newDescription = [...proj.description];
                        newDescription.splice(index, 1);
                        handleChange(proj.id, 'description', newDescription);
                      }}
                    />
                  </HStack>
                ))}
                <HStack>
                  <Input
                    placeholder="添加项目描述，建议以动词开头，包含具体的量化指标"
                    value={newInputs[proj.id]?.description || ''}
                    onChange={(e) => setNewInputs(prev => ({
                      ...prev,
                      [proj.id]: { ...prev[proj.id], description: e.target.value }
                    }))}
                  />
                  <IconButton
                    aria-label="添加项目描述"
                    icon={<AddIcon />}
                    onClick={() => {
                      const descValue = newInputs[proj.id]?.description.trim();
                      if (descValue) {
                        handleChange(proj.id, 'description', [...proj.description, descValue]);
                        setNewInputs(prev => ({
                          ...prev,
                          [proj.id]: { ...prev[proj.id], description: '' }
                        }));
                      }
                    }}
                  />
                </HStack>
              </VStack>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>项目亮点</FormLabel>
              <VStack align="stretch" spacing={2}>
                {proj.highlights?.map((item, index) => (
                  <HStack key={index}>
                    <Text flex={1}>{item}</Text>
                    <IconButton
                      aria-label="删除项目亮点"
                      icon={<DeleteIcon />}
                      size="sm"
                      onClick={() => {
                        const newHighlights = [...proj.highlights];
                        newHighlights.splice(index, 1);
                        handleChange(proj.id, 'highlights', newHighlights);
                      }}
                    />
                  </HStack>
                ))}
                <HStack>
                  <Input
                    placeholder="添加项目亮点，建议突出个人贡献和项目影响"
                    value={newInputs[proj.id]?.highlight || ''}
                    onChange={(e) => setNewInputs(prev => ({
                      ...prev,
                      [proj.id]: { ...prev[proj.id], highlight: e.target.value }
                    }))}
                  />
                  <IconButton
                    aria-label="添加项目亮点"
                    icon={<AddIcon />}
                    onClick={() => {
                      const highlightValue = newInputs[proj.id]?.highlight.trim();
                      if (highlightValue) {
                        handleChange(proj.id, 'highlights', [...proj.highlights, highlightValue]);
                        setNewInputs(prev => ({
                          ...prev,
                          [proj.id]: { ...prev[proj.id], highlight: '' }
                        }));
                      }
                    }}
                  />
                </HStack>
              </VStack>
            </FormControl>

            <FormControl>
              <FormLabel>技术栈</FormLabel>
              <VStack align="stretch" spacing={2}>
                {proj.technologies?.map((item, index) => (
                  <HStack key={index}>
                    <Text flex={1}>{item}</Text>
                    <IconButton
                      aria-label="删除技术栈"
                      icon={<DeleteIcon />}
                      size="sm"
                      onClick={() => {
                        const newTechnologies = [...proj.technologies];
                        newTechnologies.splice(index, 1);
                        handleChange(proj.id, 'technologies', newTechnologies);
                      }}
                    />
                  </HStack>
                ))}
                <HStack>
                  <Input
                    placeholder="添加技术栈"
                    value={newInputs[proj.id]?.technology || ''}
                    onChange={(e) => setNewInputs(prev => ({
                      ...prev,
                      [proj.id]: { ...prev[proj.id], technology: e.target.value }
                    }))}
                  />
                  <IconButton
                    aria-label="添加技术栈"
                    icon={<AddIcon />}
                    onClick={() => {
                      const techValue = newInputs[proj.id]?.technology.trim();
                      if (techValue) {
                        handleChange(proj.id, 'technologies', [...proj.technologies, techValue]);
                        setNewInputs(prev => ({
                          ...prev,
                          [proj.id]: { ...prev[proj.id], technology: '' }
                        }));
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