import { Box, VStack, HStack, Image, Heading, Text } from '@chakra-ui/react'
import { TemplateProps } from '../types/template'
import { renderLinks, renderSection } from './BaseTemplate'

export const TwoColumnTemplate: React.FC<TemplateProps> = (props) => {
  const { resume, colors, spacing, layout, fonts } = props

  const getAvatarStyle = () => {
    const size = '150px'
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
    <HStack align="flex-start" spacing={8}>
      {/* Left column - Basic info */}
      <Box 
        width="30%" 
        className="page-break-inside-avoid"
        borderRight="1px solid"
        borderColor={colors.accent}
        pr={6}
      >
        <VStack spacing={6} align="stretch">
          <Box className="page-break-inside-avoid">
            <VStack align="center" spacing={4}>
              {resume.basicInfo.avatar && (
                <Box position="relative" p={1}>
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
              <VStack align={layout.headerStyle === 'centered' ? 'center' : 'stretch'} flex={1} spacing={2}>
                <Heading 
                  size="lg" 
                  color={colors.primary}
                  fontFamily={fonts.heading}
                >
                  {resume.basicInfo.name}
                </Heading>
                <HStack spacing={4} wrap="wrap" justify={layout.headerStyle === 'centered' ? 'center' : 'flex-start'}>
                  <Text color={colors.text} fontFamily={fonts.body}>
                    {resume.basicInfo.jobTitle}
                  </Text>
                  {resume.basicInfo.location && (
                    <>
                      <Text color={colors.secondary}>·</Text>
                      <Text color={colors.text} fontFamily={fonts.body}>
                        {resume.basicInfo.location}
                      </Text>
                    </>
                  )}
                </HStack>
                <HStack spacing={4} wrap="wrap" justify={layout.headerStyle === 'centered' ? 'center' : 'flex-start'}>
                  <Text color={colors.text} fontFamily={fonts.body}>
                    {resume.basicInfo.email}
                  </Text>
                  {resume.basicInfo.phone && (
                    <>
                      <Text color={colors.secondary}>·</Text>
                      <Text color={colors.text} fontFamily={fonts.body}>
                        {resume.basicInfo.phone}
                      </Text>
                    </>
                  )}
                </HStack>
                {renderLinks(resume)}
              </VStack>
            </VStack>
          </Box>
        </VStack>
      </Box>

      {/* Right column - All other sections */}
      <Box width="70%" className="page-break-inside-avoid">
        <VStack spacing={spacing.section} align="stretch">
          {resume.sections
            .filter(section => section.visible)
            .sort((a, b) => a.order - b.order)
            .map(section => {
              const sectionContent = renderSection(section, props)
              return sectionContent ? (
                <Box key={section.id} className="page-break-inside-avoid" {...getSectionStyle()}>
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