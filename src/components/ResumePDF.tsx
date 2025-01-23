import { Box, Button, HStack, VStack } from '@chakra-ui/react'
import { useResumeStore } from '../store/resumeStore'
import { useRef } from 'react'
import { templates } from '../templates'

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

  const Template = templates[resume.template].component
  const templateConfig = templates[resume.template].defaultConfig

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
          <Template 
            resume={resume}
            colors={templateConfig.colors}
            fonts={templateConfig.fonts}
            spacing={templateConfig.spacing}
            layout={templateConfig.layout}
          />
        </Box>
      </Box>
    </VStack>
  )
} 