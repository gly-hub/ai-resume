import { Box, VStack, HStack, Grid, GridItem, Image, Heading, Text, Icon } from '@chakra-ui/react'
import { TemplateProps } from '../types/template'
import { FaGraduationCap, FaBriefcase, FaTools, FaMedal, FaUser } from 'react-icons/fa'
import { renderSection } from './BaseTemplate'
import { ResumeSection } from '../types'

export const TimelineTemplate: React.FC<TemplateProps> = (props) => {
  const { resume, colors, layout, fontSize } = props

  const getAvatarStyle = () => {
    const size = props.avatarSize || '120px'
    switch (layout.avatarStyle) {
      case 'square':
        return { borderRadius: '0', boxSize: size }
      case 'rounded':
        return { borderRadius: '1rem', boxSize: size }
      default:
        return { borderRadius: 'full', boxSize: size }
    }
  }

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'education':
        return FaGraduationCap
      case 'experience':
        return FaBriefcase
      case 'skills':
        return FaTools
      case 'additional':
        return FaMedal
      default:
        return FaUser
    }
  }

  return (
    <VStack spacing={8} align="stretch">
      {/* 顶部区域 */}
      <Box bg={colors?.primary} color="white" p={6} borderRadius="lg">
        <HStack justify="space-between" align="flex-start">
          <VStack align="flex-start" spacing={4}>
            <Heading 
              size="2xl" 
              fontSize={fontSize?.heading}
            >
              {resume.basicInfo.name}
            </Heading>
            <Text 
              fontSize={fontSize?.body}
            >  
              {resume.basicInfo.jobTitle}
            </Text>
          </VStack>
          {resume.basicInfo.avatar && (
            <Box>
              <Image
                src={resume.basicInfo.avatar}
                alt="头像"
                objectFit="cover"
                border="3px solid white"
                {...getAvatarStyle()}
              />
            </Box>
          )}
        </HStack>
      </Box>

      {/* 基本信息区 */}
      <Box p={6} bg={`${colors?.primary}10`} borderRadius="lg">
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem>
            <VStack align="stretch" spacing={3}>
              <HStack>
                <Text fontWeight="bold" width="80px" fontSize={fontSize?.body}>年龄：</Text>
                <Text fontSize={fontSize?.body}>25岁</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold" width="80px" fontSize={fontSize?.body}>籍贯：</Text>
                <Text fontSize={fontSize?.body}>{resume.basicInfo.location}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold" width="80px" fontSize={fontSize?.body}>电话：</Text>
                <Text fontSize={fontSize?.body}>{resume.basicInfo.phone}</Text>
              </HStack>
            </VStack>
          </GridItem>
          <GridItem>
            <VStack align="stretch" spacing={3}>
              <HStack>
                <Text fontWeight="bold" width="80px" fontSize={fontSize?.body}>性别：</Text>
                <Text fontSize={fontSize?.body}>男</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold" width="80px" fontSize={fontSize?.body}>邮箱：</Text>
                <Text fontSize={fontSize?.body}>{resume.basicInfo.email}</Text>
              </HStack>
            </VStack>
          </GridItem>
        </Grid>
      </Box>

      {/* 主体内容区 */}
      <VStack spacing={6} align="stretch">
        {resume.sections
          .filter((section: ResumeSection) => section.visible)
          .sort((a: ResumeSection, b: ResumeSection) => a.order - b.order)
          .map((section: ResumeSection) => (
            <Box key={section.id} position="relative">
              <HStack spacing={4} mb={4}>
                <Box
                  p={2}
                  bg={colors?.primary}
                  color="white"
                  borderRadius="md"
                >
                  <Icon as={getSectionIcon(section.type)} boxSize={5} />
                </Box>
                <Heading 
                  size="md" 
                  color={colors?.primary} 
                  fontSize={fontSize?.heading}
                >
                  {section.name}
                </Heading>
              </HStack>
              
              {/* 时间轴线 */}
              <Box
                position="absolute"
                left="18px"
                top="50px"
                bottom="0"
                width="2px"
                bg={`${colors?.primary}30`}
                zIndex={1}
              />

              {/* 内容区 */}
              <Box pl={12}>
                {renderSection(section, props, { hideTitle: true })}
              </Box>
            </Box>
          ))}
      </VStack>
    </VStack>
  )
} 