import { Box, Button, HStack, Text, VStack, Heading, Image } from '@chakra-ui/react'
import { useResumeStore } from '../store/resumeStore'
import { useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { ResumeSection } from '../types'

export function ResumePDF() {
  const resume = useResumeStore((state) => state.resume)
  const resumeRef = useRef<HTMLDivElement>(null)

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

    switch (section.type) {
      case 'education':
        return resume.education.length > 0 && (
          <Box key={section.id} sx={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <Heading 
              size="md" 
              mb={3} 
              color={colors.primary}
              fontFamily={fonts.heading}
              pb={2} 
              borderBottom="2px solid" 
              borderColor={colors.accent}
            >
              {section.name}
            </Heading>
            <VStack spacing={spacing.item} align="stretch">
              {resume.education.map((edu) => (
                <Box key={edu.id} sx={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <HStack justify="space-between" mb={1}>
                    <Text 
                      fontWeight="bold"
                      color={colors.text}
                      fontFamily={fonts.body}
                    >
                      {edu.school}
                    </Text>
                    <Text 
                      color={colors.secondary}
                      fontFamily={fonts.body}
                    >
                      {edu.startDate} - {edu.endDate}
                    </Text>
                  </HStack>
                  <HStack justify="space-between" mb={2}>
                    <Text
                      color={colors.text}
                      fontFamily={fonts.body}
                    >
                      {edu.major} · {edu.degree}
                    </Text>
                    {edu.gpa && (
                      <Text
                        color={colors.secondary}
                        fontFamily={fonts.body}
                      >
                        GPA: {edu.gpa}
                      </Text>
                    )}
                  </HStack>
                  {edu.courses && edu.courses.length > 0 && (
                    <Text 
                      fontSize="sm" 
                      color={colors.secondary}
                      fontFamily={fonts.body}
                    >
                      相关课程：{edu.courses.join('、')}
                    </Text>
                  )}
                  {edu.awards && edu.awards.length > 0 && (
                    <Text 
                      fontSize="sm" 
                      color={colors.secondary}
                      fontFamily={fonts.body}
                    >
                      获奖情况：{edu.awards.join('、')}
                    </Text>
                  )}
                </Box>
              ))}
            </VStack>
          </Box>
        )

      case 'experience':
        return resume.experience.length > 0 && (
          <Box key={section.id} sx={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <Heading 
              size="md" 
              mb={3} 
              color={colors.primary}
              fontFamily={fonts.heading}
              pb={2} 
              borderBottom="2px solid" 
              borderColor={colors.accent}
            >
              {section.name}
            </Heading>
            <VStack spacing={spacing.item} align="stretch">
              {resume.experience.map((exp) => (
                <Box key={exp.id} sx={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <HStack justify="space-between" mb={1}>
                    <Text 
                      fontWeight="bold"
                      color={colors.text}
                      fontFamily={fonts.body}
                    >
                      {exp.company}
                    </Text>
                    <Text 
                      color={colors.secondary}
                      fontFamily={fonts.body}
                    >
                      {exp.startDate} - {exp.endDate}
                    </Text>
                  </HStack>
                  <Text 
                    mb={2}
                    color={colors.text}
                    fontFamily={fonts.body}
                  >
                    {exp.position}
                  </Text>
                  <VStack spacing={1} align="stretch">
                    {exp.description.map((desc, index) => (
                      <Text 
                        key={`${exp.id}-desc-${index}`}
                        fontSize="sm"
                        color={colors.text}
                        fontFamily={fonts.body}
                      >
                        • {desc}
                      </Text>
                    ))}
                  </VStack>
                  {exp.technologies.length > 0 && (
                    <Text 
                      fontSize="sm" 
                      color={colors.secondary}
                      fontFamily={fonts.body}
                      mt={2}
                    >
                      技术栈：{exp.technologies.join('、')}
                    </Text>
                  )}
                </Box>
              ))}
            </VStack>
          </Box>
        )

      case 'projects':
        return resume.projects.length > 0 && (
          <Box key={section.id} sx={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <Heading 
              size="md" 
              mb={3} 
              color={colors.primary}
              fontFamily={fonts.heading}
              pb={2} 
              borderBottom="2px solid" 
              borderColor={colors.accent}
            >
              {section.name}
            </Heading>
            <VStack spacing={spacing.item} align="stretch">
              {resume.projects.map((proj) => (
                <Box key={proj.id} sx={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <HStack justify="space-between" mb={1}>
                    <Text 
                      fontWeight="bold"
                      color={colors.text}
                      fontFamily={fonts.body}
                    >
                      {proj.name}
                    </Text>
                    <Text 
                      color={colors.secondary}
                      fontFamily={fonts.body}
                    >
                      {proj.startDate} - {proj.endDate}
                    </Text>
                  </HStack>
                  <Text 
                    mb={1}
                    color={colors.text}
                    fontFamily={fonts.body}
                  >
                    {proj.role}
                  </Text>
                  <VStack spacing={1} align="stretch">
                    {proj.description.map((desc, index) => (
                      <Text 
                        key={`${proj.id}-desc-${index}`}
                        fontSize="sm"
                        color={colors.text}
                        fontFamily={fonts.body}
                      >
                        • {desc}
                      </Text>
                    ))}
                  </VStack>
                  <VStack spacing={1} align="stretch" mt={2}>
                    {proj.highlights.map((highlight, index) => (
                      <Text 
                        key={`${proj.id}-highlight-${index}`}
                        fontSize="sm"
                        color={colors.text}
                        fontFamily={fonts.body}
                      >
                        • {highlight}
                      </Text>
                    ))}
                  </VStack>
                  {proj.technologies.length > 0 && (
                    <Text 
                      fontSize="sm" 
                      color={colors.secondary}
                      fontFamily={fonts.body}
                      mt={2}
                    >
                      技术栈：{proj.technologies.join('、')}
                    </Text>
                  )}
                </Box>
              ))}
            </VStack>
          </Box>
        )

      case 'skills':
        return resume.skills.length > 0 && (
          <Box key={section.id} sx={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <Heading 
              size="md" 
              mb={3} 
              color={colors.primary}
              fontFamily={fonts.heading}
              pb={2} 
              borderBottom="2px solid" 
              borderColor={colors.accent}
            >
              {section.name}
            </Heading>
            <VStack spacing={spacing.item} align="stretch">
              {resume.skills.map((skill) => (
                <Box key={skill.id} sx={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <Text 
                    fontWeight="medium"
                    mb={1}
                    color={colors.text}
                    fontFamily={fonts.body}
                  >
                    {skill.category}
                  </Text>
                  <Text 
                    fontSize="sm"
                    color={colors.text}
                    fontFamily={fonts.body}
                  >
                    {skill.items.join(' · ')}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>
        )

      case 'additional':
        return (
          <Box key={section.id} sx={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <Heading 
              size="md" 
              mb={3} 
              color={colors.primary}
              fontFamily={fonts.heading}
              pb={2} 
              borderBottom="2px solid" 
              borderColor={colors.accent}
            >
              {section.name}
            </Heading>
            <VStack spacing={spacing.item} align="stretch">
              {resume.additional.languages.length > 0 && (
                <Box sx={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <Text 
                    fontWeight="medium"
                    mb={1}
                    color={colors.text}
                    fontFamily={fonts.body}
                  >
                    语言能力
                  </Text>
                  <Text 
                    fontSize="sm"
                    color={colors.text}
                    fontFamily={fonts.body}
                  >
                    {resume.additional.languages.join(' · ')}
                  </Text>
                </Box>
              )}
              {resume.additional.certifications.length > 0 && (
                <Box sx={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <Text 
                    fontWeight="medium"
                    mb={1}
                    color={colors.text}
                    fontFamily={fonts.body}
                  >
                    专业认证
                  </Text>
                  <Text 
                    fontSize="sm"
                    color={colors.text}
                    fontFamily={fonts.body}
                  >
                    {resume.additional.certifications.join(' · ')}
                  </Text>
                </Box>
              )}
              {resume.additional.talks.length > 0 && (
                <Box sx={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <Text 
                    fontWeight="medium"
                    mb={1}
                    color={colors.text}
                    fontFamily={fonts.body}
                  >
                    技术分享
                  </Text>
                  <Text 
                    fontSize="sm"
                    color={colors.text}
                    fontFamily={fonts.body}
                  >
                    {resume.additional.talks.join(' · ')}
                  </Text>
                </Box>
              )}
              {resume.additional.publications.length > 0 && (
                <Box sx={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <Text 
                    fontWeight="medium"
                    mb={1}
                    color={colors.text}
                    fontFamily={fonts.body}
                  >
                    发表文章
                  </Text>
                  <Text 
                    fontSize="sm"
                    color={colors.text}
                    fontFamily={fonts.body}
                  >
                    {resume.additional.publications.join(' · ')}
                  </Text>
                </Box>
              )}
              {resume.additional.openSource.length > 0 && (
                <Box sx={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <Text 
                    fontWeight="medium"
                    mb={1}
                    color={colors.text}
                    fontFamily={fonts.body}
                  >
                    开源贡献
                  </Text>
                  <Text 
                    fontSize="sm"
                    color={colors.text}
                    fontFamily={fonts.body}
                  >
                    {resume.additional.openSource.join(' · ')}
                  </Text>
                </Box>
              )}
            </VStack>
          </Box>
        )
    }
  }

  const { colors, fonts, spacing } = resume.templateConfig

  const sortedSections = [...resume.sections].sort((a, b) => a.order - b.order)

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
          <VStack spacing={spacing.section} align="stretch" className="page-break-inside-avoid">
            {/* 基本信息 */}
            <Box className="page-break-inside-avoid" bg="white">
              <HStack spacing={4} align="flex-start">
                {resume.basicInfo.avatar && (
                  <Image
                    src={resume.basicInfo.avatar}
                    alt="头像"
                    borderRadius="full"
                    boxSize="100px"
                    objectFit="cover"
                    border="2px solid"
                    borderColor={colors.accent}
                  />
                )}
                <VStack align="stretch" flex={1}>
                  <Heading 
                    size="lg" 
                    mb={2}
                    color={colors.primary}
                    fontFamily={fonts.heading}
                  >
                    {resume.basicInfo.name}
                  </Heading>
                  <HStack spacing={4} wrap="wrap" mb={2}>
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
                  <HStack spacing={4} wrap="wrap" mb={2}>
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
                  <VStack spacing={1} align="stretch">
                    {renderLinks()}
                  </VStack>
                </VStack>
              </HStack>
            </Box>

            {/* 其他部分按照排序渲染 */}
            {sortedSections.map(section => (
              <Box key={section.id} className="page-break-inside-avoid">
                {renderSection(section)}
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>
    </VStack>
  )
} 