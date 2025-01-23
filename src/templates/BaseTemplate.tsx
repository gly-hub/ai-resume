import { Box, Text, VStack, Heading, UnorderedList, ListItem, HStack } from '@chakra-ui/react'
import { TemplateProps } from '../types/template'
import { ResumeSection } from '../types'

export const renderLinks = (resume: TemplateProps['resume']) => {
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

export const renderSection = (section: ResumeSection, props: TemplateProps) => {
  const { resume, colors, spacing } = props
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

  if (!content) return null

  return (
    <Box>
      <Heading as="h2" size="md" color={colors.primary} mb={2}>
        {section.name}
      </Heading>
      <Box borderBottom={`2px solid ${colors.primary}`} mb={3} />
      {content}
    </Box>
  )
} 