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

export const EducationForm = () => {
  const education = useResumeStore((state) => state.resume.education)
  const addEducation = useResumeStore((state) => state.addEducation)
  const updateEducation = useResumeStore((state) => state.updateEducation)
  const deleteEducation = useResumeStore((state) => state.deleteEducation)

  // 为每个教育经历创建一个新的课程和获奖输入状态
  const [newInputs, setNewInputs] = useState<Record<string, { course: string; award: string }>>({});

  const handleAdd = () => {
    const newEducation = {
      id: uuidv4(),
      school: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      gpa: '',
      courses: [],
      awards: []
    }
    addEducation(newEducation);
    // 初始化新教育经历的输入状态
    setNewInputs(prev => ({
      ...prev,
      [newEducation.id]: { course: '', award: '' }
    }));
  }

  const handleDelete = (id: string) => {
    deleteEducation(id);
    // 清理对应的输入状态
    setNewInputs(prev => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  }

  const handleChange = (id: string, field: string, value: any) => {
    const edu = education.find((e) => e.id === id)
    if (edu) {
      updateEducation(id, { ...edu, [field]: value })
    }
  }

  // 初始化已有教育经历的输入状态
  useEffect(() => {
    const initialInputs: Record<string, { course: string; award: string }> = {};
    education.forEach(edu => {
      if (!newInputs[edu.id]) {
        initialInputs[edu.id] = { course: '', award: '' };
      }
    });
    if (Object.keys(initialInputs).length > 0) {
      setNewInputs(prev => ({ ...prev, ...initialInputs }));
    }
  }, [education]);

  return (
    <VStack spacing={8} align="stretch" w="100%">
      {education?.map((edu) => (
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
                {edu.courses?.map((item, index) => (
                  <HStack key={index}>
                    <Text flex={1}>{item}</Text>
                    <IconButton
                      aria-label="删除课程"
                      icon={<DeleteIcon />}
                      size="sm"
                      onClick={() => {
                        const newCourses = [...edu.courses];
                        newCourses.splice(index, 1);
                        handleChange(edu.id, 'courses', newCourses);
                      }}
                    />
                  </HStack>
                ))}
                <HStack>
                  <Input
                    placeholder="添加主修课程"
                    value={newInputs[edu.id]?.course || ''}
                    onChange={(e) => setNewInputs(prev => ({
                      ...prev,
                      [edu.id]: { ...prev[edu.id], course: e.target.value }
                    }))}
                  />
                  <IconButton
                    aria-label="添加课程"
                    icon={<AddIcon />}
                    onClick={() => {
                      const courseValue = newInputs[edu.id]?.course.trim();
                      if (courseValue) {
                        handleChange(edu.id, 'courses', [...edu.courses, courseValue]);
                        setNewInputs(prev => ({
                          ...prev,
                          [edu.id]: { ...prev[edu.id], course: '' }
                        }));
                      }
                    }}
                  />
                </HStack>
              </VStack>
            </FormControl>

            <FormControl>
              <FormLabel>获奖情况</FormLabel>
              <VStack align="stretch" spacing={2}>
                {edu.awards?.map((item, index) => (
                  <HStack key={index}>
                    <Text flex={1}>{item}</Text>
                    <IconButton
                      aria-label="删除获奖"
                      icon={<DeleteIcon />}
                      size="sm"
                      onClick={() => {
                        const newAwards = [...edu.awards];
                        newAwards.splice(index, 1);
                        handleChange(edu.id, 'awards', newAwards);
                      }}
                    />
                  </HStack>
                ))}
                <HStack>
                  <Input
                    placeholder="添加获奖情况"
                    value={newInputs[edu.id]?.award || ''}
                    onChange={(e) => setNewInputs(prev => ({
                      ...prev,
                      [edu.id]: { ...prev[edu.id], award: e.target.value }
                    }))}
                  />
                  <IconButton
                    aria-label="添加获奖"
                    icon={<AddIcon />}
                    onClick={() => {
                      const awardValue = newInputs[edu.id]?.award.trim();
                      if (awardValue) {
                        handleChange(edu.id, 'awards', [...edu.awards, awardValue]);
                        setNewInputs(prev => ({
                          ...prev,
                          [edu.id]: { ...prev[edu.id], award: '' }
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
        添加教育经历
      </Button>
    </VStack>
  )
} 