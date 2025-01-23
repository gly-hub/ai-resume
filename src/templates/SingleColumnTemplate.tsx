import { Box, VStack, HStack, Image, Heading, Text } from '@chakra-ui/react'
import { TemplateProps } from '../types/template'
import { renderLinks, renderSection } from './BaseTemplate'

export const SingleColumnTemplate: React.FC<TemplateProps> = (props) => {
  const { resume, colors, spacing, layout, fonts } = props

  const getAvatarStyle = () => {
    const size = '100px'
    switch (layout.avatarStyle) {
      case 'square':
        return { borderRadius: '0', boxSize: size }
      case 'rounded':
        return { borderRadius: '1rem', boxSize: size }
      default:
        return { borderRadius: 'full', boxSize: size }
    }
  }

  const getHeaderStyle = () => {
    switch (layout.headerStyle) {
      case 'centered':
        return {
          textAlign: 'center' as const,
          flexDirection: 'column' as const,
          alignItems: 'center'
        }
      case 'right':
        return {
          flexDirection: 'row-reverse' as const,
          justifyContent: 'space-between'
        }
      case 'split':
        return {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem'
        }
      default:
        return {
          flexDirection: 'row' as const,
          justifyContent: 'space-between'
        }
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

  const getContentStyle = () => {
    switch (layout.contentWidth) {
      case 'narrow':
        return { maxWidth: '160mm', margin: '0 auto' }
      case 'wide':
        return { maxWidth: '190mm', margin: '0 auto' }
      default:
        return { width: '100%' }
    }
  }

  return (
    <VStack spacing={spacing.section} align="stretch" {...getContentStyle()}>
      <Box className="page-break-inside-avoid" bg="white">
        <HStack spacing={4} align="flex-start" {...getHeaderStyle()}>
          {resume.basicInfo.avatar && (
            <Image
              src={resume.basicInfo.avatar}
              alt="头像"
              objectFit="cover"
              border="2px solid"
              borderColor={colors.accent}
              {...getAvatarStyle()}
            />
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
        </HStack>
      </Box>

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
  )
}

export const singleColumnConfig = {
  name: '单栏布局',
  component: SingleColumnTemplate,
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
      headerStyle: 'left',
      sectionStyle: 'plain',
      avatarStyle: 'circle',
      contentWidth: 'narrow'
    }
  },
  thumbnail: '/templates/singleColumn.png'
} 