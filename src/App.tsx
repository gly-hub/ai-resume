import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Editor } from './pages/Editor'
import { Home } from './pages/Home'
import AIChat from './pages/AIChat'

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
          <Route path="/ai-chat" element={<AIChat />} />
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App
