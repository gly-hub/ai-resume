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

export const ExperienceForm = () => {
  const experience = useResumeStore((state) => state.resume.experience)
  const addExperience = useResumeStore((state) => state.addExperience)
  const updateExperience = useResumeStore((state) => state.updateExperience)
  const deleteExperience = useResumeStore((state) => state.deleteExperience)

  // 为每个工作经历创建输入状态
  const [newInputs, setNewInputs] = useState<Record<string, { description: string; technology: string }>>({});

  const handleAdd = () => {
    const newExperience = {
      id: uuidv4(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: [],
      technologies: []
    }
    addExperience(newExperience)
    // 初始化新工作经历的输入状态
    setNewInputs(prev => ({
      ...prev,
      [newExperience.id]: { description: '', technology: '' }
    }));
  }

  const handleDelete = (id: string) => {
    deleteExperience(id)
    // 清理对应的输入状态
    setNewInputs(prev => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  }

  const handleChange = (id: string, field: string, value: string | string[]) => {
    const exp = experience.find((e) => e.id === id)
    if (exp) {
      updateExperience(id, { ...exp, [field]: value })
    }
  }

  // 初始化已有工作经历的输入状态
  useEffect(() => {
    const initialInputs: Record<string, { description: string; technology: string }> = {};
    experience.forEach(exp => {
      if (!newInputs[exp.id]) {
        initialInputs[exp.id] = { description: '', technology: '' };
      }
    });
    if (Object.keys(initialInputs).length > 0) {
      setNewInputs(prev => ({ ...prev, ...initialInputs }));
    }
  }, [experience]);

  return (
    <VStack spacing={8} align="stretch" w="100%">
      {experience?.map((exp) => (
        <Box
          key={exp.id}
          p={4}
          borderWidth={1}
          borderRadius="md"
          position="relative"
        >
          <IconButton
            aria-label="删除工作经验"
            icon={<DeleteIcon />}
            size="sm"
            position="absolute"
            right={2}
            top={2}
            onClick={() => handleDelete(exp.id)}
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
                <FormLabel>公司名称</FormLabel>
                <Input
                  value={exp.company}
                  onChange={(e) => handleChange(exp.id, 'company', e.target.value)}
                  placeholder="公司名称"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>职位</FormLabel>
                <Input
                  value={exp.position}
                  onChange={(e) => handleChange(exp.id, 'position', e.target.value)}
                  placeholder="职位名称"
                />
              </FormControl>
            </SimpleGrid>

            <SimpleGrid columns={2} spacing={4} w="100%">
              <FormControl isRequired>
                <FormLabel>开始时间</FormLabel>
                <Input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => handleChange(exp.id, 'startDate', e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>结束时间</FormLabel>
                <Input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => handleChange(exp.id, 'endDate', e.target.value)}
                />
              </FormControl>
            </SimpleGrid>

            <FormControl isRequired>
              <FormLabel>工作内容</FormLabel>
              <VStack align="stretch" spacing={2}>
                {exp.description?.map((item, index) => (
                  <HStack key={index}>
                    <Text flex={1}>{item}</Text>
                    <IconButton
                      aria-label="删除工作内容"
                      icon={<DeleteIcon />}
                      size="sm"
                      onClick={() => {
                        const newDescription = [...exp.description];
                        newDescription.splice(index, 1);
                        handleChange(exp.id, 'description', newDescription);
                      }}
                    />
                  </HStack>
                ))}
                <HStack>
                  <Input
                    placeholder="添加工作内容，建议以动词开头，包含具体的量化指标"
                    value={newInputs[exp.id]?.description || ''}
                    onChange={(e) => setNewInputs(prev => ({
                      ...prev,
                      [exp.id]: { ...prev[exp.id], description: e.target.value }
                    }))}
                  />
                  <IconButton
                    aria-label="添加工作内容"
                    icon={<AddIcon />}
                    onClick={() => {
                      const descValue = newInputs[exp.id]?.description.trim();
                      if (descValue) {
                        handleChange(exp.id, 'description', [...exp.description, descValue]);
                        setNewInputs(prev => ({
                          ...prev,
                          [exp.id]: { ...prev[exp.id], description: '' }
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
                {exp.technologies?.map((item, index) => (
                  <HStack key={index}>
                    <Text flex={1}>{item}</Text>
                    <IconButton
                      aria-label="删除技术栈"
                      icon={<DeleteIcon />}
                      size="sm"
                      onClick={() => {
                        const newTechnologies = [...exp.technologies];
                        newTechnologies.splice(index, 1);
                        handleChange(exp.id, 'technologies', newTechnologies);
                      }}
                    />
                  </HStack>
                ))}
                <HStack>
                  <Input
                    placeholder="添加技术栈"
                    value={newInputs[exp.id]?.technology || ''}
                    onChange={(e) => setNewInputs(prev => ({
                      ...prev,
                      [exp.id]: { ...prev[exp.id], technology: e.target.value }
                    }))}
                  />
                  <IconButton
                    aria-label="添加技术栈"
                    icon={<AddIcon />}
                    onClick={() => {
                      const techValue = newInputs[exp.id]?.technology.trim();
                      if (techValue) {
                        handleChange(exp.id, 'technologies', [...exp.technologies, techValue]);
                        setNewInputs(prev => ({
                          ...prev,
                          [exp.id]: { ...prev[exp.id], technology: '' }
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
        添加工作经验
      </Button>
    </VStack>
  )
} 