import { ChakraProvider, extendTheme, Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Editor } from './pages/Editor'
import { Home } from './pages/Home'
import { Header } from './components/Header'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
})

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </Router>
      <Box minH="100vh" bg="gray.50">
        <Header />
        <Editor />
      </Box>
    </ChakraProvider>
  )
}

export default App
