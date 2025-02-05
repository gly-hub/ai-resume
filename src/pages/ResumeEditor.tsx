import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Textarea,
  VStack,
  useToast
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useResumeStore } from '../store/resumeStore'
import { Education, WorkExperience, Skill } from '../types'
interface ResumeForm {
  name: string
  title: string
  email: string
  phone: string
  summary: string
  education: Education[]
  experience: WorkExperience[]
  skills: Skill[]
}

export function ResumeEditor() {
  const navigate = useNavigate()
  const toast = useToast()
  const updateResume = useResumeStore((state) => state.updateResume)
  const { register, handleSubmit } = useForm<ResumeForm>()

  const onSubmit = (data: ResumeForm) => {
    updateResume(data)
    toast({
      title: '简历已保存',
      status: 'success',
      duration: 2000,
    })
    navigate('/preview')
  }

  return (
    <Container maxW="container.xl" py={8}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={6} align="stretch">
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <FormControl>
              <FormLabel>姓名</FormLabel>
              <Input {...register('name')} />
            </FormControl>
            <FormControl>
              <FormLabel>职位</FormLabel>
              <Input {...register('title')} />
            </FormControl>
          </Grid>

          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <FormControl>
              <FormLabel>邮箱</FormLabel>
              <Input {...register('email')} type="email" />
            </FormControl>
            <FormControl>
              <FormLabel>电话</FormLabel>
              <Input {...register('phone')} />
            </FormControl>
          </Grid>

          <FormControl>
            <FormLabel>个人简介</FormLabel>
            <Textarea {...register('summary')} rows={3} />
          </FormControl>

          <FormControl>
            <FormLabel>教育经历</FormLabel>
            <Textarea {...register('education')} rows={4} />
          </FormControl>

          <FormControl>
            <FormLabel>工作经验</FormLabel>
            <Textarea {...register('experience')} rows={6} />
          </FormControl>

          <FormControl>
            <FormLabel>技能特长</FormLabel>
            <Textarea {...register('skills')} rows={4} />
          </FormControl>

          <Box>
            <Button type="submit" colorScheme="blue" size="lg">
              预览简历
            </Button>
          </Box>
        </VStack>
      </form>
    </Container>
  )
} 