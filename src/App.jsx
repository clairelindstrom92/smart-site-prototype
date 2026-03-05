import { useState, useCallback } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import VoiceControl from './components/VoiceControl.jsx'
import LayoutRenderer from './LayoutRenderer.jsx'
import { interpretCommand } from './ai/interpretCommand.js'

const DEFAULT_LAYOUT = ['hero', 'services']

export default function App() {
  const [layout, setLayout] = useState(DEFAULT_LAYOUT)
  const [theme, setTheme] = useState('dark')
  const [styleMode, setStyleMode] = useState('default')
  const [aiMessage, setAiMessage] = useState(null)
  const [isThinking, setIsThinking] = useState(false)
  const [error, setError] = useState(null)

  const handleCommand = useCallback(async (text) => {
    setIsThinking(true)
    setError(null)
    setAiMessage(null)

    try {
      const instruction = await interpretCommand(text)

      if (!instruction) {
        setAiMessage(`Could not understand: "${text}"`)
        setIsThinking(false)
        return
      }

      setAiMessage(`AI understood: "${text}"`)

      switch (instruction.action) {
        case 'add_component':
          setLayout((prev) =>
            prev.includes(instruction.component)
              ? prev
              : [...prev, instruction.component]
          )
          break
        case 'remove_component':
          setLayout((prev) => prev.filter((c) => c !== instruction.component))
          break
        case 'change_theme':
          setTheme(instruction.theme)
          break
        case 'change_style':
          setStyleMode(instruction.style)
          break
        case 'reset':
          setLayout(DEFAULT_LAYOUT)
          setTheme('dark')
          setStyleMode('default')
          break
        default:
          setAiMessage(`Unknown action: ${instruction.action}`)
      }
    } catch (err) {
      setError('Failed to process command. Please try again.')
      console.error(err)
    } finally {
      setIsThinking(false)
    }
  }, [])

  return (
    <div data-theme={theme} data-style={styleMode} className="app">
      <Navbar />
      <LayoutRenderer layout={layout} />
      <Footer />
      <VoiceControl
        onCommand={handleCommand}
        isThinking={isThinking}
        aiMessage={aiMessage}
        error={error}
      />
    </div>
  )
}
