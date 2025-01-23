import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export function Home() {
  const navigate = useNavigate()

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="center">
        <Heading as="h1" size="2xl" mb={4}>
          OpenResume
        </Heading>
        <Text fontSize="xl" textAlign="center">
          创建专业的简历，展现最好的自己
        </Text>
        <Box pt={6}>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => navigate('/editor')}
          >
            创建新简历
          </Button>
        </Box>
      </VStack>
    </Container>
  )
} 