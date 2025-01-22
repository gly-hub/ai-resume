import { Box, Button, Container, HStack, Text, VStack, Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useResumeStore } from '../store/resumeStore'
import { useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export function ResumePreview() {
  const navigate = useNavigate()
  const resume = useResumeStore((state) => state.resume)
  const resumeRef = useRef<HTMLDivElement>(null)

  const downloadPDF = async () => {
    if (!resumeRef.current) return

    const scale = 2 // 提高清晰度
    const element = resumeRef.current
    
    const canvas = await html2canvas(element, {
      scale: scale,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    })

    const imgWidth = 210 // A4 宽度 (mm)
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    const pdf = new jsPDF('p', 'mm', 'a4')
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 1.0),
      'JPEG',
      0,
      0,
      imgWidth,
      imgHeight,
      undefined,
      'FAST'
    )

    pdf.save('resume.pdf')
  }

  return (
    <Container maxW="container.xl" py={8}>
      <HStack spacing={4} mb={4}>
        <Button onClick={() => navigate('/editor')}>返回编辑</Button>
        <Button colorScheme="blue" onClick={downloadPDF}>下载 PDF</Button>
      </HStack>
      
      <Box 
        ref={resumeRef} 
        bg="white" 
        p={12} 
        borderRadius="md" 
        boxShadow="lg"
        width="210mm"
        minHeight="297mm"
        mx="auto"
        sx={{
          '@media print': {
            boxShadow: 'none',
            borderRadius: 'none'
          }
        }}
      >
        <VStack spacing={8} align="stretch">
          <Box textAlign="center" mb={4}>
            <Heading as="h1" size="xl" mb={3} letterSpacing="wide">
              {resume.name}
            </Heading>
            <Text fontSize="md" color="gray.600" letterSpacing="wide">
              {[resume.title, resume.email, resume.phone].filter(Boolean).join(' | ')}
            </Text>
          </Box>

          {resume.summary && (
            <Box>
              <Heading as="h2" size="md" mb={3} color="blue.600" pb={2} borderBottom="2px" borderColor="gray.200">
                个人简介
              </Heading>
              <Text whiteSpace="pre-wrap" fontSize="md" lineHeight="tall">
                {resume.summary}
              </Text>
            </Box>
          )}

          {resume.education && (
            <Box>
              <Heading as="h2" size="md" mb={3} color="blue.600" pb={2} borderBottom="2px" borderColor="gray.200">
                教育经历
              </Heading>
              <Text whiteSpace="pre-wrap" fontSize="md" lineHeight="tall">
                {resume.education}
              </Text>
            </Box>
          )}

          {resume.experience && (
            <Box>
              <Heading as="h2" size="md" mb={3} color="blue.600" pb={2} borderBottom="2px" borderColor="gray.200">
                工作经验
              </Heading>
              <Text whiteSpace="pre-wrap" fontSize="md" lineHeight="tall">
                {resume.experience}
              </Text>
            </Box>
          )}

          {resume.skills && (
            <Box>
              <Heading as="h2" size="md" mb={3} color="blue.600" pb={2} borderBottom="2px" borderColor="gray.200">
                技能特长
              </Heading>
              <Text whiteSpace="pre-wrap" fontSize="md" lineHeight="tall">
                {resume.skills}
              </Text>
            </Box>
          )}
        </VStack>
      </Box>
    </Container>
  )
} 