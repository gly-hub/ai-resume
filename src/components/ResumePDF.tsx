import { Box, Button, HStack, Text, VStack, Heading, Image, UnorderedList, ListItem } from '@chakra-ui/react'
import { useResumeStore } from '../store/resumeStore'
import { useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { ResumeSection } from '../types'

export function ResumePDF() {
  const resume = useResumeStore((state) => state.resume)
  const resumeRef = useRef<HTMLDivElement>(null)
  const { colors, fonts, spacing, layout } = resume.templateConfig

  const downloadPDF = async () => {
    if (!resumeRef.current) return
    
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    // 复制样式表
    const styles = document.getElementsByTagName('style')
    const links = document.getElementsByTagName('link')
    
    printWindow.document.write('<html><head><title>简历</title>')
    Array.from(styles).forEach(style => {
      printWindow.document.write(style.outerHTML)
    })
    Array.from(links).forEach(link => {
      if (link.rel === 'stylesheet') {
        printWindow.document.write(link.outerHTML)
      }
    })
    
    // 添加打印样式
    printWindow.document.write(`
      <style>
        @page {
          size: A4;
          margin: 0;
        }
        @media print {
          html, body {
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
            background-color: white !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .page-break-inside-avoid {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .resume-content {
            background-color: white !important;
          }
        }
        body {
          background-color: white;
        }
        .resume-content {
          background-color: white;
          width: 210mm;
          margin: 0 auto;
          min-height: 297mm;
        }
      </style>
    `)
    
    printWindow.document.write('</head><body>')
    
    // 复制内容
    const content = resumeRef.current.cloneNode(true) as HTMLElement
    content.style.width = '210mm'
    content.style.margin = '0 auto'
    content.style.backgroundColor = 'white'
    content.classList.add('resume-content')
    
    // 为所有需要避免分页的元素添加类名
    const elements = content.getElementsByClassName('chakra-stack')
    Array.from(elements).forEach(element => {
      element.classList.add('page-break-inside-avoid')
    })
    
    printWindow.document.body.appendChild(content)
    printWindow.document.write('</body></html>')
    printWindow.document.close()

    // 等待资源加载完成
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 打印并关闭窗口
    printWindow.print()
    printWindow.close()
  }

  const renderLinks = () => {
    const links = []
    if (resume.basicInfo.website) {
      links.push(
        <Text key="website">个人网站：{resume.basicInfo.website}</Text>
      )
    }
    if (resume.basicInfo.github) {
      links.push(
        <Text key="github">GitHub：{resume.basicInfo.github}</Text>
      )
    }
    if (resume.basicInfo.blog) {
      links.push(
        <Text key="blog">技术博客：{resume.basicInfo.blog}</Text>
      )
    }
    return links
  }

  const renderSection = (section: ResumeSection) => {
    if (!section.visible) return null

    const content = (() => {
      switch (section.type) {
        case 'education':
          return resume.education.length > 0 && (
            <VStack align="stretch" spacing={4}>
              {resume.education.map((edu, index) => (
                <Box key={edu.id || index}>
                  <HStack justify="space-between" mb={1}>
                    <Text fontWeight="bold">{edu.school}</Text>
                    <Text>{`${edu.startDate} - ${edu.endDate}`}</Text>
                  </HStack>
                  <Text>{edu.degree} · {edu.major}</Text>
                  {edu.gpa && <Text>GPA: {edu.gpa}</Text>}
                  {edu.courses?.length > 0 && (
                    <Text>主修课程：{edu.courses.join('、')}</Text>
                  )}
                  {edu.awards?.length > 0 && (
                    <Text>获奖情况：{edu.awards.join('、')}</Text>
                  )}
                </Box>
              ))}
            </VStack>
          )

        case 'experience':
          return resume.experience.length > 0 && (
            <VStack align="stretch" spacing={4}>
              {resume.experience.map((exp, index) => (
                <Box key={exp.id || index}>
                  <HStack justify="space-between" mb={1}>
                    <Text fontWeight="bold">{exp.company}</Text>
                    <Text>{`${exp.startDate} - ${exp.endDate}`}</Text>
                  </HStack>
                  <Text mb={2}>{exp.position}</Text>
                  {exp.description?.length > 0 && (
                    <UnorderedList>
                      {exp.description.map((desc, i) => (
                        <ListItem key={i}>{desc}</ListItem>
                      ))}
                    </UnorderedList>
                  )}
                  {exp.technologies?.length > 0 && (
                    <Text mt={1}>技术栈：{exp.technologies.join('、')}</Text>
                  )}
                </Box>
              ))}
            </VStack>
          )

        case 'projects':
          return resume.projects.length > 0 && (
            <VStack align="stretch" spacing={4}>
              {resume.projects.map((proj, index) => (
                <Box key={proj.id || index}>
                  <HStack justify="space-between" mb={1}>
                    <Text fontWeight="bold">{proj.name}</Text>
                    <Text>{`${proj.startDate} - ${proj.endDate}`}</Text>
                  </HStack>
                  <Text mb={2}>{proj.role}</Text>
                  {proj.description?.length > 0 && (
                    <UnorderedList>
                      {proj.description.map((desc, i) => (
                        <ListItem key={i}>{desc}</ListItem>
                      ))}
                    </UnorderedList>
                  )}
                  {proj.highlights?.length > 0 && (
                    <UnorderedList>
                      {proj.highlights.map((highlight, i) => (
                        <ListItem key={i}>{highlight}</ListItem>
                      ))}
                    </UnorderedList>
                  )}
                  {proj.technologies?.length > 0 && (
                    <Text mt={1}>技术栈：{proj.technologies.join('、')}</Text>
                  )}
                </Box>
              ))}
            </VStack>
          )

        case 'skills':
          return resume.skills.length > 0 && (
            <VStack align="stretch" spacing={3}>
              {resume.skills.map((skill, index) => (
                <Box key={skill.id || index}>
                  <Text fontWeight="bold" mb={1}>{skill.category}</Text>
                  <Text>{skill.items.join('、')}</Text>
                </Box>
              ))}
            </VStack>
          )

        case 'additional':
          const { languages, certifications, talks, publications, openSource } = resume.additional
          return (languages?.length > 0 || certifications?.length > 0 || talks?.length > 0 || 
                  publications?.length > 0 || openSource?.length > 0) && (
            <VStack align="stretch" spacing={3}>
              {languages?.length > 0 && (
                <Box>
                  <Text fontWeight="bold" mb={1}>语言能力</Text>
                  <Text>{languages.join('、')}</Text>
                </Box>
              )}
              {certifications?.length > 0 && (
                <Box>
                  <Text fontWeight="bold" mb={1}>专业认证</Text>
                  <Text>{certifications.join('、')}</Text>
                </Box>
              )}
              {talks?.length > 0 && (
                <Box>
                  <Text fontWeight="bold" mb={1}>技术分享</Text>
                  <Text>{talks.join('、')}</Text>
                </Box>
              )}
              {publications?.length > 0 && (
                <Box>
                  <Text fontWeight="bold" mb={1}>出版物</Text>
                  <Text>{publications.join('、')}</Text>
                </Box>
              )}
              {openSource?.length > 0 && (
                <Box>
                  <Text fontWeight="bold" mb={1}>开源贡献</Text>
                  <Text>{openSource.join('、')}</Text>
                </Box>
              )}
            </VStack>
          )
      }
    })()

    // 只在 content 存在且不为空时才渲染
    if (!content) return null

    return (
      <Box>
        <Heading as="h2" size="md" color={colors.primary} mb={3}>
          {section.name}
        </Heading>
        <Box borderBottom={`2px solid ${colors.primary}`} mb={4} />
        {content}
      </Box>
    )
  }

  const sortedSections = [...resume.sections].sort((a, b) => a.order - b.order)

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

  const getAvatarStyle = () => {
    const size = layout.headerStyle === 'split' ? '150px' : '100px'
    switch (layout.avatarStyle) {
      case 'square':
        return {
          borderRadius: '0',
          boxSize: size
        }
      case 'rounded':
        return {
          borderRadius: '1rem',
          boxSize: size
        }
      default:
        return {
          borderRadius: 'full',
          boxSize: size
        }
    }
  }

  const getContentStyle = () => {
    switch (layout.contentWidth) {
      case 'narrow':
        return {
          maxWidth: '160mm',
          margin: '0 auto'
        }
      case 'wide':
        return {
          maxWidth: '190mm',
          margin: '0 auto'
        }
      default:
        return {
          width: '100%'
        }
    }
  }

  return (
    <VStack spacing={4} align="stretch" h="100%">
      <HStack justifyContent="flex-end">
        <Button colorScheme="blue" onClick={downloadPDF}>
          下载 PDF
        </Button>
      </HStack>
      
      <Box 
        ref={resumeRef}
        data-pdf-content
        bg="white"
        width="210mm"
        margin="0 auto"
        className="page-break-inside-avoid resume-content"
        sx={{
          '@media print': {
            margin: 0,
            boxShadow: 'none',
            backgroundColor: 'white'
          }
        }}
      >
        <Box p={8} bg="white">
          {resume.template === 'twoColumn' ? (
            // Two-column layout
            <HStack align="flex-start" spacing={8}>
              {/* Left column - Only basic info */}
              <Box 
                width="30%" 
                className="page-break-inside-avoid"
                borderRight="1px solid"
                borderColor={colors.accent}
                pr={6}
              >
                <VStack spacing={6} align="stretch">
                  {/* Basic Info with Avatar */}
                  <Box className="page-break-inside-avoid">
                    <VStack align="center" spacing={4}>
                      {resume.basicInfo.avatar && (
                        <Box
                          position="relative"
                          p={1}
                        >
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
                      <VStack align="center" spacing={2}>
                        <Heading 
                          size="lg"
                          color={colors.primary}
                          fontFamily={fonts.heading}
                          fontWeight="bold"
                        >
                          {resume.basicInfo.name}
                        </Heading>
                        <Text
                          fontSize="lg"
                          color={colors.secondary}
                          fontFamily={fonts.body}
                          fontWeight="medium"
                        >
                          {resume.basicInfo.jobTitle}
                        </Text>
                      </VStack>
                    </VStack>
                  </Box>

                  {/* Contact Info */}
                  <Box>
                    <VStack align="stretch" spacing={3}>
                      <HStack spacing={3}>
                        <Box color={colors.accent} w="20px">
                          <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"/>
                            <circle cx="12" cy="9" r="2.5"/>
                          </svg>
                        </Box>
                        <Text color={colors.text} fontSize="sm">
                          {resume.basicInfo.location}
                        </Text>
                      </HStack>
                      <HStack spacing={3}>
                        <Box color={colors.accent} w="20px">
                          <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
                            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                          </svg>
                        </Box>
                        <Text color={colors.text} fontSize="sm">
                          {resume.basicInfo.email}
                        </Text>
                      </HStack>
                      <HStack spacing={3}>
                        <Box color={colors.accent} w="20px">
                          <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                          </svg>
                        </Box>
                        <Text color={colors.text} fontSize="sm">
                          {resume.basicInfo.phone}
                        </Text>
                      </HStack>
                      {resume.basicInfo.website && (
                        <HStack spacing={3}>
                          <Box color={colors.accent} w="20px">
                            <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                            </svg>
                          </Box>
                          <Text color={colors.text} fontSize="sm">
                            {resume.basicInfo.website}
                          </Text>
                        </HStack>
                      )}
                      {resume.basicInfo.github && (
                        <HStack spacing={3}>
                          <Box color={colors.accent} w="20px">
                            <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
                              <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
                            </svg>
                          </Box>
                          <Text color={colors.text} fontSize="sm">
                            {resume.basicInfo.github}
                          </Text>
                        </HStack>
                      )}
                      {resume.basicInfo.blog && (
                        <HStack spacing={3}>
                          <Box color={colors.accent} w="20px">
                            <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
                              <path d="M14.722 14.677L9.789 9.744 8.375 11.158 12.625 15.408 14.722 14.677zM9.789 14.678L14.722 9.745 16.125 11.158 11.875 15.408 9.789 14.678zM12 21L10.598 19.598 13.4 16.8 14.8 18.2 12 21zM12 3L13.402 4.402 10.6 7.2 9.2 5.8 12 3z"/>
                            </svg>
                          </Box>
                          <Text color={colors.text} fontSize="sm">
                            {resume.basicInfo.blog}
                          </Text>
                        </HStack>
                      )}
                    </VStack>
                  </Box>
                </VStack>
              </Box>

              {/* Right column - All other sections */}
              <Box width="70%" className="page-break-inside-avoid">
                <VStack spacing={spacing.section} align="stretch">
                  {sortedSections
                    .filter(section => section.visible)
                    .map(section => {
                      const sectionContent = renderSection(section)
                      return sectionContent ? (
                        <Box key={section.id} className="page-break-inside-avoid" {...getSectionStyle()}>
                          {sectionContent}
                        </Box>
                      ) : null
                    })}
                </VStack>
              </Box>
            </HStack>
          ) : (
            // Original single-column layout
            <VStack spacing={spacing.section} align="stretch" className="page-break-inside-avoid" {...getContentStyle()}>
              {/* Original layout code */}
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
                  <VStack align={layout.headerStyle === 'centered' ? 'center' : 'stretch'} flex={1}>
                    <Heading 
                      size="lg" 
                      mb={2}
                      color={colors.primary}
                      fontFamily={fonts.heading}
                    >
                      {resume.basicInfo.name}
                    </Heading>
                    <HStack spacing={4} wrap="wrap" mb={2} justify={layout.headerStyle === 'centered' ? 'center' : 'flex-start'}>
                      <Text 
                        color={colors.text}
                        fontFamily={fonts.body}
                      >
                        {resume.basicInfo.jobTitle}
                      </Text>
                      <Text color={colors.secondary}>·</Text>
                      <Text
                        color={colors.text}
                        fontFamily={fonts.body}
                      >
                        {resume.basicInfo.location}
                      </Text>
                    </HStack>
                    <HStack spacing={4} wrap="wrap" mb={2} justify={layout.headerStyle === 'centered' ? 'center' : 'flex-start'}>
                      <Text
                        color={colors.text}
                        fontFamily={fonts.body}
                      >
                        {resume.basicInfo.email}
                      </Text>
                      <Text color={colors.secondary}>·</Text>
                      <Text
                        color={colors.text}
                        fontFamily={fonts.body}
                      >
                        {resume.basicInfo.phone}
                      </Text>
                    </HStack>
                    <VStack spacing={1} align={layout.headerStyle === 'centered' ? 'center' : 'stretch'}>
                      {renderLinks()}
                    </VStack>
                  </VStack>
                </HStack>
              </Box>

              {sortedSections.map(section => {
                const sectionContent = renderSection(section)
                return sectionContent ? (
                  <Box key={section.id} className="page-break-inside-avoid" {...getSectionStyle()}>
                    {sectionContent}
                  </Box>
                ) : null
              })}
            </VStack>
          )}
        </Box>
      </Box>
    </VStack>
  )
} 