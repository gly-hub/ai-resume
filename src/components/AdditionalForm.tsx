import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  HStack,
  Text,
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { useResumeStore } from '../store/resumeStore'
import { Additional } from '../types'

export function AdditionalForm() {
  const additional = useResumeStore((state) => state.resume.additional)
  const updateAdditional = useResumeStore((state) => state.updateAdditional)

  const handleAddItem = (field: keyof Additional, value: string) => {
    if (!value.trim()) return
    updateAdditional({
      ...additional,
      [field]: [...additional[field], value.trim()],
    })
  }

  const handleDeleteItem = (field: keyof Additional, index: number) => {
    updateAdditional({
      ...additional,
      [field]: additional[field].filter((_, i) => i !== index),
    })
  }

  return (
    <VStack spacing={4} align="stretch" w="100%">
      <FormControl>
        <FormLabel>语言能力</FormLabel>
        <VStack align="stretch" spacing={2}>
          {additional.languages.map((item, index) => (
            <HStack key={index}>
              <Text flex={1}>{item}</Text>
              <IconButton
                aria-label="删除语言"
                icon={<DeleteIcon />}
                size="md"
                p={2}
                onClick={() => handleDeleteItem('languages', index)}
              />
            </HStack>
          ))}
          <HStack>
            <Input
              placeholder="添加语言能力，例如：英语（CET-6）"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddItem('languages', (e.target as HTMLInputElement).value)
                  ;(e.target as HTMLInputElement).value = ''
                }
              }}
            />
            <IconButton
              aria-label="添加语言"
              icon={<AddIcon />}
              onClick={(e) => {
                const input = (e.currentTarget as HTMLElement).parentElement?.querySelector('input')
                if (input) {
                  handleAddItem('languages', input.value)
                  input.value = ''
                }
              }}
            />
          </HStack>
        </VStack>
      </FormControl>

      <FormControl>
        <FormLabel>专业认证</FormLabel>
        <VStack align="stretch" spacing={2}>
          {additional.certifications.map((item, index) => (
            <HStack key={index}>
              <Text flex={1}>{item}</Text>
              <IconButton
                aria-label="删除认证"
                icon={<DeleteIcon />}
                size="md"
                p={2}
                onClick={() => handleDeleteItem('certifications', index)}
              />
            </HStack>
          ))}
          <HStack>
            <Input
              placeholder="添加专业认证"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddItem('certifications', (e.target as HTMLInputElement).value)
                  ;(e.target as HTMLInputElement).value = ''
                }
              }}
            />
            <IconButton
              aria-label="添加认证"
              icon={<AddIcon />}
              onClick={(e) => {
                const input = (e.currentTarget as HTMLElement).parentElement?.querySelector('input')
                if (input) {
                  handleAddItem('certifications', input.value)
                  input.value = ''
                }
              }}
            />
          </HStack>
        </VStack>
      </FormControl>

      <FormControl>
        <FormLabel>技术分享</FormLabel>
        <VStack align="stretch" spacing={2}>
          {additional.talks.map((item, index) => (
            <HStack key={index}>
              <Text flex={1}>{item}</Text>
              <IconButton
                aria-label="删除分享"
                icon={<DeleteIcon />}
                size="md"
                p={2}
                onClick={() => handleDeleteItem('talks', index)}
              />
            </HStack>
          ))}
          <HStack>
            <Input
              placeholder="添加技术分享经历"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddItem('talks', (e.target as HTMLInputElement).value)
                  ;(e.target as HTMLInputElement).value = ''
                }
              }}
            />
            <IconButton
              aria-label="添加分享"
              icon={<AddIcon />}
              onClick={(e) => {
                const input = (e.currentTarget as HTMLElement).parentElement?.querySelector('input')
                if (input) {
                  handleAddItem('talks', input.value)
                  input.value = ''
                }
              }}
            />
          </HStack>
        </VStack>
      </FormControl>

      <FormControl>
        <FormLabel>发表文章</FormLabel>
        <VStack align="stretch" spacing={2}>
          {additional.publications.map((item, index) => (
            <HStack key={index}>
              <Text flex={1}>{item}</Text>
              <IconButton
                aria-label="删除文章"
                icon={<DeleteIcon />}
                size="md"
                p={2}
                onClick={() => handleDeleteItem('publications', index)}
              />
            </HStack>
          ))}
          <HStack>
            <Input
              placeholder="添加发表的文章"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddItem('publications', (e.target as HTMLInputElement).value)
                  ;(e.target as HTMLInputElement).value = ''
                }
              }}
            />
            <IconButton
              aria-label="添加文章"
              icon={<AddIcon />}
              onClick={(e) => {
                const input = (e.currentTarget as HTMLElement).parentElement?.querySelector('input')
                if (input) {
                  handleAddItem('publications', input.value)
                  input.value = ''
                }
              }}
            />
          </HStack>
        </VStack>
      </FormControl>

      <FormControl>
        <FormLabel>开源贡献</FormLabel>
        <VStack align="stretch" spacing={2}>
          {additional.openSource.map((item, index) => (
            <HStack key={index}>
              <Text flex={1}>{item}</Text>
              <IconButton
                aria-label="删除开源项目"
                icon={<DeleteIcon />}
                size="md"
                p={2}
                onClick={() => handleDeleteItem('openSource', index)}
              />
            </HStack>
          ))}
          <HStack>
            <Input
              placeholder="添加开源项目贡献"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddItem('openSource', (e.target as HTMLInputElement).value)
                  ;(e.target as HTMLInputElement).value = ''
                }
              }}
            />
            <IconButton
              aria-label="添加开源项目"
              icon={<AddIcon />}
              onClick={(e) => {
                const input = (e.currentTarget as HTMLElement).parentElement?.querySelector('input')
                if (input) {
                  handleAddItem('openSource', input.value)
                  input.value = ''
                }
              }}
            />
          </HStack>
        </VStack>
      </FormControl>
    </VStack>
  )
} 