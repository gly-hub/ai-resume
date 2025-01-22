import { Box, Grid } from '@chakra-ui/react'
import { Editor as EditorComponent } from '../components/Editor'
import { ResumePDF } from '../components/ResumePDF'

export function Editor() {
  return (
    <Grid 
      templateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} 
      gap={4} 
      h="100vh" 
      maxW="100vw"
      px={[2, 4]}
      py={[2, 4]}
    >
      <Box 
        overflowY="auto" 
        w="full"
        bg="white"
        borderRadius="lg"
        boxShadow="sm"
      >
        <EditorComponent />
      </Box>
      <Box 
        overflowY="auto" 
        bg="gray.50"
        w="full"
        borderRadius="lg"
        boxShadow="sm"
        position="relative"
      >
        <ResumePDF />
      </Box>
    </Grid>
  )
} 