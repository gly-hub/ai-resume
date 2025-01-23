import { Box, Container, HStack } from '@chakra-ui/react'
import { Logo } from './Logo'

export function Header() {
  return (
    <Box as="header" py={4} borderBottom="1px solid" borderColor="gray.100">
      <Container maxW="container.xl">
        <HStack spacing={4}>
          <Logo h="40px" />
        </HStack>
      </Container>
    </Box>
  )
} 