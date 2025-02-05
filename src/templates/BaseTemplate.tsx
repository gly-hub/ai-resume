import { Box, Text, VStack, Heading, UnorderedList, ListItem, HStack } from '@chakra-ui/react'
import { FaGithub, FaGlobe, FaBlog } from 'react-icons/fa'
import { TemplateProps } from '../types/template'
import { ResumeSection, Education, Project, Skill, WorkExperience } from '../types'

export const renderLinks = (resume: TemplateProps['resume'], fontSize: TemplateProps['fontSize']) => {
  const { basicInfo } = resume
  const links = []

  if (basicInfo.website) {
    links.push(
      <HStack key="website" spacing={2}>
        <FaGlobe />
        <Text fontSize={fontSize?.body}>{basicInfo.website}</Text>
      </HStack>
    )
  }

  if (basicInfo.github) {
    links.push(
      <HStack key="github" spacing={2}>
        <FaGithub />
        <Text fontSize={fontSize?.body}>{basicInfo.github}</Text>
      </HStack>
    )
  }

  if (basicInfo.blog) {
    links.push(
      <HStack key="blog" spacing={2}>
        <FaBlog />
        <Text fontSize={fontSize?.body}>{basicInfo.blog}</Text>
      </HStack>
    )
  }

  return links
}

export const renderSection = (section: ResumeSection, props: TemplateProps, options?: { hideTitle?: boolean }) => {
  const { resume, colors, fontSize } = props
  console.log('Rendering section with fontSize:', fontSize)
  if (!section.visible) return null

  const content = (() => {
    switch (section.type) {
      case 'education':
        return resume.education.length > 0 && (
          <VStack align="stretch" spacing={4} data-section="education">
            {resume.education.map((edu: Education, index: number) => (
              <Box key={edu.id || index}>
                <HStack justify="space-between" mb={2}>
                  <Text fontWeight="bold" fontSize={fontSize?.heading}>{edu.school}</Text>
                  <Text color={colors?.secondary} fontSize={fontSize?.secondary}>{`${edu.startDate} - ${edu.endDate}`}</Text>
                </HStack>
                <Text fontSize={fontSize?.body} mb={1}>{edu.degree} · {edu.major}</Text>
                {edu.gpa && <Text color={colors?.secondary} fontSize={fontSize?.secondary}>GPA: {edu.gpa}</Text>}
                {edu.courses?.length > 0 && (
                  <Text color={colors?.secondary} fontSize={fontSize?.secondary}>主修课程：{edu.courses.join('、')}</Text>
                )}
                {edu.awards?.length > 0 && (
                  <Text color={colors?.secondary} fontSize={fontSize?.secondary}>获奖情况：{edu.awards.join('、')}</Text>
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
                  <Text fontWeight="bold" fontSize={fontSize?.heading}>{exp.company}</Text>
                  <Text color={colors?.secondary} fontSize={fontSize?.secondary}>{`${exp.startDate} - ${exp.endDate}`}</Text>
                </HStack>
                <Text fontSize={fontSize?.body} mb={2}>{exp.position}</Text>
                {exp.description?.length > 0 && (
                  <UnorderedList spacing={1}>
                    {exp.description.map((desc: string, i: number) => (
                      <ListItem key={i} fontSize={fontSize?.body}>{desc}</ListItem>
                    ))}
                  </UnorderedList>
                )}
                {exp.technologies?.length > 0 && (
                  <Text mt={2} color={colors?.secondary} fontSize={fontSize?.secondary}>技术栈：{exp.technologies.join('、')}</Text>
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
                  <Text fontWeight="bold" fontSize={fontSize?.heading}>{proj.name}</Text>
                  <Text color={colors?.secondary} fontSize={fontSize?.secondary}>{`${proj.startDate} - ${proj.endDate}`}</Text>
                </HStack>
                <Text fontSize={fontSize?.body} mb={2}>{proj.role}</Text>
                {proj.description?.length > 0 && (
                  <UnorderedList spacing={1}>
                    {proj.description.map((desc: string, i: number) => (
                      <ListItem key={i} fontSize={fontSize?.body}>{desc}</ListItem>
                    ))}
                  </UnorderedList>
                )}
                {proj.highlights?.length > 0 && (
                  <UnorderedList spacing={1} mt={2}>
                    {proj.highlights.map((highlight: string, i: number) => (
                      <ListItem key={i} fontSize={fontSize?.body}>{highlight}</ListItem>
                    ))}
                  </UnorderedList>
                )}
                {proj.technologies?.length > 0 && (
                  <Text mt={2} color={colors?.secondary} fontSize={fontSize?.secondary}>技术栈：{proj.technologies.join('、')}</Text>
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
                <Text fontWeight="bold" mb={1} fontSize={fontSize?.heading}>{skill.category}</Text>
                <Text color={colors?.secondary} fontSize={fontSize?.secondary}>{skill.items.join('、')}</Text>
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
                <Text fontWeight="bold" mb={1} fontSize={fontSize?.heading}>语言能力</Text>
                <Text color={colors?.secondary} fontSize={fontSize?.secondary}>{languages.join('、')}</Text>
              </Box>
            )}
            {certifications?.length > 0 && (
              <Box>
                <Text fontWeight="bold" mb={1} fontSize={fontSize?.heading}>专业认证</Text>
                <Text color={colors?.secondary} fontSize={fontSize?.secondary}>{certifications.join('、')}</Text>
              </Box>
            )}
            {talks?.length > 0 && (
              <Box>
                <Text fontWeight="bold" mb={1} fontSize={fontSize?.heading}>技术分享</Text>
                <Text color={colors?.secondary} fontSize={fontSize?.secondary}>{talks.join('、')}</Text>
              </Box>
            )}
            {publications?.length > 0 && (
              <Box>
                <Text fontWeight="bold" mb={1} fontSize={fontSize?.heading}>出版物</Text>
                <Text color={colors?.secondary} fontSize={fontSize?.secondary}>{publications.join('、')}</Text>
              </Box>
            )}
            {openSource?.length > 0 && (
              <Box>
                <Text fontWeight="bold" mb={1} fontSize={fontSize?.heading}>开源贡献</Text>
                <Text color={colors?.secondary} fontSize={fontSize?.secondary}>{openSource.join('、')}</Text>
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
      {!options?.hideTitle && (
        <Box 
          data-page-header 
          py={3} 
          className="page-break-inside-avoid"
        >
          <Heading as="h2" size="md" color={colors?.primary} fontSize={fontSize?.heading} mb={2}>
            {section.name}
          </Heading>
          <Box borderBottom={`2px solid ${colors?.primary}`} mb={3} />
        </Box>
      )}
      <Box>
        {content}
      </Box>
    </Box>
  )
} 