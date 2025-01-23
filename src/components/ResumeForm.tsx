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
  jobTitle: string
  email: string
  phone: string
  location: string
  website?: string
  github?: string
  blog?: string
}

export function ResumeForm() {
  const toast = useToast()
  const updateBasicInfo = useResumeStore((state) => state.updateBasicInfo)
  const resume = useResumeStore((state) => state.resume)
  const { register, handleSubmit } = useForm<ResumeForm>({
    defaultValues: resume.basicInfo
  })

  const onSubmit = (data: ResumeForm) => {
    updateBasicInfo(data)
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
            <Input {...register('jobTitle')} onChange={(e) => {
              register('jobTitle').onChange(e)
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
          <FormLabel>位置</FormLabel>
          <Textarea {...register('location')} rows={3} onChange={(e) => {
            register('location').onChange(e)
            handleSubmit(onSubmit)()
          }} />
        </FormControl>

        <FormControl>
          <FormLabel>网站</FormLabel>
          <Textarea {...register('website')} rows={3} onChange={(e) => {
            register('website').onChange(e)
            handleSubmit(onSubmit)()
          }} />
        </FormControl>

        <FormControl>
          <FormLabel>GitHub</FormLabel>
          <Textarea {...register('github')} rows={3} onChange={(e) => {
            register('github').onChange(e)
            handleSubmit(onSubmit)()
          }} />
        </FormControl>

        <FormControl>
          <FormLabel>博客</FormLabel>
          <Textarea {...register('blog')} rows={3} onChange={(e) => {
            register('blog').onChange(e)
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