import {
  VStack,
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
import { Skill } from '../types'

export function SkillsForm() {
  const skills = useResumeStore((state) => state.resume.skills)
  const updateSkills = useResumeStore((state) => state.updateSkills)

  const handleAdd = () => {
    const newSkill: Skill = {
      id: uuidv4(),
      category: '',
      items: [],
    }
    updateSkills([...skills, newSkill])
  }

  const handleDelete = (id: string) => {
    updateSkills(skills.filter((skill) => skill.id !== id))
  }

  const handleChange = (id: string, field: keyof Skill, value: string) => {
    updateSkills(
      skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    )
  }

  const handleAddItem = (id: string, value: string) => {
    if (!value.trim()) return
    updateSkills(
      skills.map((skill) =>
        skill.id === id
          ? { ...skill, items: [...skill.items, value.trim()] }
          : skill
      )
    )
  }

  const handleDeleteItem = (id: string, index: number) => {
    updateSkills(
      skills.map((skill) =>
        skill.id === id
          ? { ...skill, items: skill.items.filter((_, i) => i !== index) }
          : skill
      )
    )
  }

  return (
    <VStack spacing={8} align="stretch" w="100%">
      {skills.map((skill) => (
        <Box
          key={skill.id}
          p={4}
          borderWidth={1}
          borderRadius="md"
          position="relative"
        >
          <IconButton
            aria-label="删除技能类别"
            icon={<DeleteIcon />}
            size="sm"
            position="absolute"
            right={2}
            top={2}
            onClick={() => handleDelete(skill.id)}
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
            <FormControl isRequired>
              <FormLabel>技能类别</FormLabel>
              <Input
                value={skill.category}
                onChange={(e) => handleChange(skill.id, 'category', e.target.value)}
                placeholder="技能类别，如：编程语言、框架等"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>技能列表</FormLabel>
              <VStack align="stretch" spacing={2}>
                {skill.items.map((item, index) => (
                  <HStack key={index}>
                    <Text flex={1}>{item}</Text>
                    <IconButton
                      aria-label="删除技能"
                      icon={<DeleteIcon />}
                      size="md"
                      p={2}
                      onClick={() => handleDeleteItem(skill.id, index)}
                    />
                  </HStack>
                ))}
                <HStack>
                  <Input
                    placeholder="添加技能"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddItem(skill.id, (e.target as HTMLInputElement).value)
                        ;(e.target as HTMLInputElement).value = ''
                      }
                    }}
                  />
                  <IconButton
                    aria-label="添加技能"
                    icon={<AddIcon />}
                    onClick={(e) => {
                      const input = (e.currentTarget as HTMLElement).parentElement?.querySelector('input')
                      if (input) {
                        handleAddItem(skill.id, input.value)
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
        添加技能类别
      </Button>
    </VStack>
  )
} 