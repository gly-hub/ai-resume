import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Textarea,
  VStack,
  useToast
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useResumeStore } from '../store/resumeStore'

interface ResumeForm {
  name: string
  title: string
  email: string
  phone: string
  summary: string
  education: string
  experience: string
  skills: string
}

export function ResumeForm() {
  const toast = useToast()
  const updateResume = useResumeStore((state) => state.updateResume)
  const resume = useResumeStore((state) => state.resume)
  const { register, handleSubmit } = useForm<ResumeForm>({
    defaultValues: resume
  })

  const onSubmit = (data: ResumeForm) => {
    updateResume(data)
    toast({
      title: '简历已保存',
      status: 'success',
      duration: 2000,
    })
  }

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={6} align="stretch">
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <FormControl>
            <FormLabel>姓名</FormLabel>
            <Input {...register('name')} onChange={(e) => {
              register('name').onChange(e)
              handleSubmit(onSubmit)()
            }} />
          </FormControl>
          <FormControl>
            <FormLabel>职位</FormLabel>
            <Input {...register('title')} onChange={(e) => {
              register('title').onChange(e)
              handleSubmit(onSubmit)()
            }} />
          </FormControl>
        </Grid>

        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <FormControl>
            <FormLabel>邮箱</FormLabel>
            <Input {...register('email')} type="email" onChange={(e) => {
              register('email').onChange(e)
              handleSubmit(onSubmit)()
            }} />
          </FormControl>
          <FormControl>
            <FormLabel>电话</FormLabel>
            <Input {...register('phone')} onChange={(e) => {
              register('phone').onChange(e)
              handleSubmit(onSubmit)()
            }} />
          </FormControl>
        </Grid>

        <FormControl>
          <FormLabel>个人简介</FormLabel>
          <Textarea {...register('summary')} rows={3} onChange={(e) => {
            register('summary').onChange(e)
            handleSubmit(onSubmit)()
          }} />
        </FormControl>

        <FormControl>
          <FormLabel>教育经历</FormLabel>
          <Textarea {...register('education')} rows={4} onChange={(e) => {
            register('education').onChange(e)
            handleSubmit(onSubmit)()
          }} />
        </FormControl>

        <FormControl>
          <FormLabel>工作经验</FormLabel>
          <Textarea {...register('experience')} rows={6} onChange={(e) => {
            register('experience').onChange(e)
            handleSubmit(onSubmit)()
          }} />
        </FormControl>

        <FormControl>
          <FormLabel>技能特长</FormLabel>
          <Textarea {...register('skills')} rows={4} onChange={(e) => {
            register('skills').onChange(e)
            handleSubmit(onSubmit)()
          }} />
        </FormControl>

        <Box>
          <Button type="submit" colorScheme="blue" size="lg">
            保存简历
          </Button>
        </Box>
      </VStack>
    </Box>
  )
} 