import { Box, Text, VStack, Heading, UnorderedList, ListItem, HStack } from '@chakra-ui/react'
import { FaGithub, FaGlobe, FaBlog } from 'react-icons/fa'
import { TemplateProps } from '../types/template'
import { ResumeSection, Education, Project, Skill, WorkExperience } from '../types'

export const renderLinks = (resume: TemplateProps['resume']) => {
  const { basicInfo } = resume
  const links = []

  if (basicInfo.website) {
    links.push(
      <HStack key="website" spacing={2}>
        <FaGlobe />
        <Text>{basicInfo.website}</Text>
      </HStack>
    )
  }

  if (basicInfo.github) {
    links.push(
      <HStack key="github" spacing={2}>
        <FaGithub />
        <Text>{basicInfo.github}</Text>
      </HStack>
    )
  }

  if (basicInfo.blog) {
    links.push(
      <HStack key="blog" spacing={2}>
        <FaBlog />
        <Text>{basicInfo.blog}</Text>
      </HStack>
    )
  }

  return links
}

export const renderSection = (section: ResumeSection, props: TemplateProps) => {
  const { resume, colors } = props
  if (!section.visible) return null

  const content = (() => {
    switch (section.type) {
      case 'education':
        return resume.education.length > 0 && (
          <VStack align="stretch" spacing={4} data-section="education">
            {resume.education.map((edu: Education, index: number) => (
              <Box key={edu.id || index}>
                <HStack justify="space-between" mb={2}>
                  <Text fontWeight="bold" fontSize="lg">{edu.school}</Text>
                  <Text color={colors.secondary}>{`${edu.startDate} - ${edu.endDate}`}</Text>
                </HStack>
                <Text fontSize="md" mb={1}>{edu.degree} · {edu.major}</Text>
                {edu.gpa && <Text color={colors.secondary}>GPA: {edu.gpa}</Text>}
                {edu.courses?.length > 0 && (
                  <Text color={colors.secondary}>主修课程：{edu.courses.join('、')}</Text>
                )}
                {edu.awards?.length > 0 && (
                  <Text color={colors.secondary}>获奖情况：{edu.awards.join('、')}</Text>
                )}
              </Box>
            ))}
          </VStack>
        )

      case 'experience':
        return resume.experience.length > 0 && (
          <VStack align="stretch" spacing={4} data-section="experience">
            {resume.experience.map((exp: WorkExperience, index: number) => (
              <Box key={exp.id || index}>
                <HStack justify="space-between" mb={2}>
                  <Text fontWeight="bold" fontSize="lg">{exp.company}</Text>
                  <Text color={colors.secondary}>{`${exp.startDate} - ${exp.endDate}`}</Text>
                </HStack>
                <Text fontSize="md" mb={2}>{exp.position}</Text>
                {exp.description?.length > 0 && (
                  <UnorderedList spacing={1}>
                    {exp.description.map((desc: string, i: number) => (
                      <ListItem key={i}>{desc}</ListItem>
                    ))}
                  </UnorderedList>
                )}
                {exp.technologies?.length > 0 && (
                  <Text mt={2} color={colors.secondary}>技术栈：{exp.technologies.join('、')}</Text>
                )}
              </Box>
            ))}
          </VStack>
        )

      case 'projects':
        return resume.projects.length > 0 && (
          <VStack align="stretch" spacing={4} data-section="projects">
            {resume.projects.map((proj: Project, index: number) => (
              <Box key={proj.id || index}>
                <HStack justify="space-between" mb={2}>
                  <Text fontWeight="bold" fontSize="lg">{proj.name}</Text>
                  <Text color={colors.secondary}>{`${proj.startDate} - ${proj.endDate}`}</Text>
                </HStack>
                <Text fontSize="md" mb={2}>{proj.role}</Text>
                {proj.description?.length > 0 && (
                  <UnorderedList spacing={1}>
                    {proj.description.map((desc: string, i: number) => (
                      <ListItem key={i}>{desc}</ListItem>
                    ))}
                  </UnorderedList>
                )}
                {proj.highlights?.length > 0 && (
                  <UnorderedList spacing={1} mt={2}>
                    {proj.highlights.map((highlight: string, i: number) => (
                      <ListItem key={i}>{highlight}</ListItem>
                    ))}
                  </UnorderedList>
                )}
                {proj.technologies?.length > 0 && (
                  <Text mt={2} color={colors.secondary}>技术栈：{proj.technologies.join('、')}</Text>
                )}
              </Box>
            ))}
          </VStack>
        )

      case 'skills':
        return resume.skills.length > 0 && (
          <VStack align="stretch" spacing={3} data-section="skills">
            {resume.skills.map((skill: Skill, index: number) => (
              <Box key={skill.id || index}>
                <Text fontWeight="bold" mb={1}>{skill.category}</Text>
                <Text color={colors.secondary}>{skill.items.join('、')}</Text>
              </Box>
            ))}
          </VStack>
        )

      case 'additional': {
        const { languages, certifications, talks, publications, openSource } = resume.additional
        return (languages?.length > 0 || certifications?.length > 0 || talks?.length > 0 || 
                publications?.length > 0 || openSource?.length > 0) && (
          <VStack align="stretch" spacing={3} data-section="additional">
            {languages?.length > 0 && (
              <Box>
                <Text fontWeight="bold" mb={1}>语言能力</Text>
                <Text color={colors.secondary}>{languages.join('、')}</Text>
              </Box>
            )}
            {certifications?.length > 0 && (
              <Box>
                <Text fontWeight="bold" mb={1}>专业认证</Text>
                <Text color={colors.secondary}>{certifications.join('、')}</Text>
              </Box>
            )}
            {talks?.length > 0 && (
              <Box>
                <Text fontWeight="bold" mb={1}>技术分享</Text>
                <Text color={colors.secondary}>{talks.join('、')}</Text>
              </Box>
            )}
            {publications?.length > 0 && (
              <Box>
                <Text fontWeight="bold" mb={1}>出版物</Text>
                <Text color={colors.secondary}>{publications.join('、')}</Text>
              </Box>
            )}
            {openSource?.length > 0 && (
              <Box>
                <Text fontWeight="bold" mb={1}>开源贡献</Text>
                <Text color={colors.secondary}>{openSource.join('、')}</Text>
              </Box>
            )}
          </VStack>
        )
      }
    }
  })()

  if (!content) return null

  return (
    <Box data-page-section>
      <Box data-page-header py={6}>
        <Heading as="h2" size="md" color={colors.primary} mb={3}>
          {section.name}
        </Heading>
        <Box borderBottom={`2px solid ${colors.primary}`} mb={4} />
      </Box>
      {content}
    </Box>
  )
} 