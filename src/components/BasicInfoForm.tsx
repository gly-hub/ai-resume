import {
  VStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Box,
  Image,
  IconButton,
  useToast,
  Text
} from '@chakra-ui/react'
import { useResumeStore } from '../store/resumeStore'
import { FaCamera, FaTrash } from 'react-icons/fa'

export function BasicInfoForm() {
  const basicInfo = useResumeStore((state) => state.resume.basicInfo)
  const updateBasicInfo = useResumeStore((state) => state.updateBasicInfo)
  const toast = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateBasicInfo({ ...basicInfo, [name]: value })
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      toast({
        title: '请选择图片文件',
        status: 'error',
        duration: 2000,
      })
      return
    }

    // 验证文件大小 (2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: '图片大小不能超过 2MB',
        status: 'error',
        duration: 2000,
      })
      return
    }

    try {
      // 转换为 base64
      const reader = new FileReader()
      reader.onloadend = () => {
        updateBasicInfo({ 
          ...basicInfo, 
          avatar: reader.result as string 
        })
      }
      reader.readAsDataURL(file)
    } catch (error) {
      toast({
        title: '图片上传失败',
        status: 'error',
        duration: 2000,
      })
    }
  }

  const removeAvatar = () => {
    updateBasicInfo({ 
      ...basicInfo, 
      avatar: undefined 
    })
  }

  return (
    <VStack spacing={4} align="stretch" p={4}>
      {/* 头像上传 */}
      <FormControl>
        <FormLabel>头像</FormLabel>
        <Box 
          position="relative" 
          width="120px" 
          height="120px"
          borderRadius="full"
          border="2px dashed"
          borderColor="gray.300"
          _hover={{
            borderColor: "blue.500",
            cursor: "pointer"
          }}
          onClick={() => document.getElementById('avatar-input')?.click()}
        >
          <Image
            src={basicInfo.avatar || '/default-avatar.png'}
            alt="头像"
            borderRadius="full"
            boxSize="120px"
            objectFit="cover"
            opacity={basicInfo.avatar ? 1 : 0.5}
          />
          {!basicInfo.avatar && (
            <VStack
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              spacing={1}
              color="gray.500"
            >
              <FaCamera size="24px" />
              <Text fontSize="xs">点击上传</Text>
            </VStack>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
            id="avatar-input"
          />
          {basicInfo.avatar && (
            <IconButton
              aria-label="删除头像"
              icon={<FaTrash />}
              position="absolute"
              bottom={1}
              right={1}
              size="sm"
              colorScheme="red"
              variant="solid"
              onClick={(e) => {
                e.stopPropagation()
                removeAvatar()
              }}
            />
          )}
        </Box>
      </FormControl>

      <SimpleGrid columns={[1, 1, 2]} spacing={4}>
        <FormControl isRequired>
          <FormLabel>姓名</FormLabel>
          <Input name="name" value={basicInfo.name} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>职位</FormLabel>
          <Input name="jobTitle" value={basicInfo.jobTitle} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>邮箱</FormLabel>
          <Input name="email" type="email" value={basicInfo.email} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>电话</FormLabel>
          <Input name="phone" value={basicInfo.phone} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>所在地</FormLabel>
          <Input name="location" value={basicInfo.location} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>个人网站</FormLabel>
          <Input name="website" value={basicInfo.website || ''} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>GitHub</FormLabel>
          <Input name="github" value={basicInfo.github || ''} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>技术博客</FormLabel>
          <Input name="blog" value={basicInfo.blog || ''} onChange={handleChange} />
        </FormControl>
      </SimpleGrid>
    </VStack>
  )
} 