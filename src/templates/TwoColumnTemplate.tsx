import { Box, VStack, HStack, Image, Heading, Text } from '@chakra-ui/react'
import { TemplateProps } from '../types/template'
import { renderSection } from './BaseTemplate'
import { ResumeSection } from '../types'

export const TwoColumnTemplate: React.FC<TemplateProps> = (props) => {
  const { resume, colors, spacing, layout, fonts, fontSize } = props

  const getAvatarStyle = () => {
    const size = props.avatarSize || '150px'
    switch (layout.avatarStyle) {
      case 'square':
        return { borderRadius: '0', boxSize: size }
      case 'rounded':
        return { borderRadius: '1rem', boxSize: size }
      default:
        return { borderRadius: 'full', boxSize: size }
    }
  }

  const getSectionStyle = () => {
    switch (layout.sectionStyle) {
      case 'boxed':
        return {
          padding: '1rem',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }
      case 'line':
        return {
          borderBottom: `2px solid ${colors.accent}`
        }
      default:
        return {}
    }
  }

  return (
    <HStack align="flex-start" spacing={8} data-two-column-layout>
      {/* Left column - Basic info and Additional info */}
      <Box 
        width="30%" 
        borderRight="1px solid"
        borderColor={colors.accent}
        pr={6}
        data-left-column
      >
        <VStack spacing={6} align="stretch">
          {/* Basic Info */}
          <Box data-page-section>
            <VStack align="stretch" spacing={4}>
              {resume.basicInfo.avatar && (
                <Box position="relative" alignSelf="center" p={1}>
                  <Image
                    src={resume.basicInfo.avatar}
                    alt="头像"
                    objectFit="cover"
                    border="2px solid"
                    borderColor={colors.accent}
                    {...getAvatarStyle()}
                  />
                </Box>
              )}
              <VStack align="stretch" spacing={4}>
                <Box>
                  <Heading 
                    size="xl" 
                    color={colors.primary}
                    fontFamily={fonts.heading}
                    fontSize={fontSize?.heading}
                    mb={2}
                  >
                    {resume.basicInfo.name}
                  </Heading>
                  <Text color={colors.text} fontFamily={fonts.body} fontSize={fontSize?.body} mb={1}>
                    {resume.basicInfo.jobTitle}
                  </Text>
                </Box>

                <VStack align="stretch" spacing={2}>
                  {resume.basicInfo.location && (
                    <HStack spacing={2} align="flex-start">
                      <Text color={colors.secondary} fontSize={fontSize?.secondary}>📍</Text>
                      <Text color={colors.text} fontFamily={fonts.body} fontSize={fontSize?.body} wordBreak="break-word">
                        {resume.basicInfo.location}
                      </Text>
                    </HStack>
                  )}
                  <HStack spacing={2} align="flex-start">
                    <Text color={colors.secondary} fontSize={fontSize?.secondary}>📧</Text>
                    <Text color={colors.text} fontFamily={fonts.body} fontSize={fontSize?.body} wordBreak="break-word">
                      {resume.basicInfo.email}
                    </Text>
                  </HStack>
                  {resume.basicInfo.phone && (
                    <HStack spacing={2} align="flex-start">
                      <Text color={colors.secondary} fontSize={fontSize?.secondary}>📱</Text>
                      <Text color={colors.text} fontFamily={fonts.body} fontSize={fontSize?.body} wordBreak="break-word">
                        {resume.basicInfo.phone}
                      </Text>
                    </HStack>
                  )}
                </VStack>

                <VStack align="stretch" spacing={2}>
                  {resume.basicInfo.website && (
                    <HStack spacing={2} align="flex-start">
                      <Text color={colors.secondary} fontSize={fontSize?.secondary}>🌐</Text>
                      <Text color={colors.text} fontFamily={fonts.body} fontSize={fontSize?.body} wordBreak="break-word">
                        {resume.basicInfo.website}
                      </Text>
                    </HStack>
                  )}
                  {resume.basicInfo.github && (
                    <HStack spacing={2} align="flex-start">
                      <Text color={colors.secondary} fontSize={fontSize?.secondary}>🔗</Text>
                      <Text color={colors.text} fontFamily={fonts.body} fontSize={fontSize?.body} wordBreak="break-word">
                        {resume.basicInfo.github}
                      </Text>
                    </HStack>
                  )}
                  {resume.basicInfo.blog && (
                    <HStack spacing={2} align="flex-start">
                      <Text color={colors.secondary} fontSize={fontSize?.secondary}>📝</Text>
                      <Text color={colors.text} fontFamily={fonts.body} fontSize={fontSize?.body} wordBreak="break-word">
                        {resume.basicInfo.blog}
                      </Text>
                    </HStack>
                  )}
                </VStack>
              </VStack>
            </VStack>
          </Box>

          {/* Additional Info */}
          {resume.sections
            .filter((section: ResumeSection) => section.visible && section.type === 'additional')
            .map((section: ResumeSection) => {
              const sectionContent = renderSection(section, props)
              return sectionContent ? (
                <Box key={section.id} {...getSectionStyle()}>
                  {sectionContent}
                </Box>
              ) : null
            })}
        </VStack>
      </Box>

      {/* Right column - All other sections except additional */}
      <Box width="70%" data-right-column>
        <VStack spacing={spacing.section} align="stretch">
          {resume.sections
            .filter((section: ResumeSection) => section.visible && section.type !== 'additional')
            .sort((a: ResumeSection, b: ResumeSection) => a.order - b.order)
            .map((section: ResumeSection) => {
              const sectionContent = renderSection(section, props)
              return sectionContent ? (
                <Box key={section.id} {...getSectionStyle()}>
                  {sectionContent}
                </Box>
              ) : null
            })}
        </VStack>
      </Box>
    </HStack>
  )
}

export const twoColumnConfig = {
  name: '双栏布局',
  component: TwoColumnTemplate,
  defaultConfig: {
    colors: {
      primary: '#2B6CB0',
      secondary: '#718096',
      text: '#2D3748',
      accent: '#E2E8F0'
    },
    fonts: {
      heading: 'system-ui',
      body: 'system-ui'
    },
    spacing: {
      section: '1.5rem',
      item: '0.75rem'
    },
    layout: {
      headerStyle: 'centered',
      sectionStyle: 'plain',
      avatarStyle: 'circle',
      contentWidth: 'full'
    }
  },
  thumbnail: '/templates/twoColumn.png'
} 