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
    
    // 复制内容
    const content = resumeRef.current.cloneNode(true) as HTMLElement
    content.style.width = '210mm'
    content.style.margin = '0 auto'
    content.style.backgroundColor = 'white'
    content.classList.add('resume-content')
    
    // 处理分页
    const sections = content.querySelectorAll('[data-section]')
    sections.forEach(section => {
      // 移除之前的分页控制
      section.classList.remove('page-break-inside-avoid')
      
      // 只对标题部分添加分页控制
      const header = section.closest('[data-page-section]')?.querySelector('[data-page-header]')
      if (header) {
        header.classList.add('page-break-inside-avoid')
      }
    })

    // 处理双栏布局
    const twoColumnLayout = content.querySelector('[data-two-column-layout]')
    if (twoColumnLayout) {
      // 确保左右两栏的高度相等
      const leftColumn = twoColumnLayout.querySelector('[data-left-column]')
      const rightColumn = twoColumnLayout.querySelector('[data-right-column]')
      if (leftColumn && rightColumn) {
        leftColumn.setAttribute('style', 'height: 100% !important; position: relative !important;')
        rightColumn.setAttribute('style', 'height: 100% !important; position: relative !important;')
      }
    }
    
    printWindow.document.write('</head><body>')
    
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
          /* 区块分页控制 */
          [data-page-section] {
            position: relative;
            margin-top: 1.5rem;
          }
          [data-page-section]:first-child {
            margin-top: 0;
          }
          /* 只对区块标题强制不分页 */
          .page-break-inside-avoid {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          /* 允许区块内容在合适的位置分页 */
          [data-section] {
            position: relative;
          }
          /* 双栏布局分页控制 */
          [data-two-column-layout] {
            display: flex !important;
            flex-direction: row !important;
            align-items: flex-start !important;
            min-height: 100% !important;
            column-gap: 2rem !important;
          }
          [data-left-column] {
            flex: 0 0 30% !important;
            min-height: 100% !important;
            position: relative !important;
            border-right: 1px solid #E2E8F0 !important;
            padding-right: 1.5rem !important;
          }
          [data-right-column] {
            flex: 0 0 70% !important;
            min-height: 100% !important;
            position: relative !important;
            padding-left: 0.5rem !important;
          }
          /* 优化分页时的间距 */
          @page {
            margin-top: 1.5rem;
          }
          @page :first {
            margin-top: 0;
          }
          /* 基础样式 */
          .resume-content {
            background-color: white !important;
            padding: 2rem;
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
        className="resume-content"
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
            colors={resume.templateConfig.colors}
            fonts={resume.templateConfig.fonts}
            fontSize={resume.templateConfig.fontSize}
            spacing={resume.templateConfig.spacing}
            layout={resume.templateConfig.layout}
            avatarSize={resume.templateConfig.avatarSize}
          />
        </Box>
      </Box>
    </VStack>
  )
} 